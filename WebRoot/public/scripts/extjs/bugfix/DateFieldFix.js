// private
Date.createParser = function(format) {
  var funcName = "parse" + Date.parseFunctions.count++;
  var regexNum = Date.parseRegexes.length;
  var currentGroup = 1;
  Date.parseFunctions[format] = funcName;

  var code = "Date." + funcName + " = function(input){\n"
      + "var y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, ms = -1, o, z, u, v;\n"
      + "input = String(input);var d = new Date();\n"
      + "y = d.getFullYear();\n"
      + "m = d.getMonth();\n"
      + "d = d.getDate();\n"
      + "var results = input.match(Date.parseRegexes[" + regexNum + "]);\n"
      + "if (results && results.length > 0) {";
  var regex = "";

  var special = false;
  var ch = '';
  for (var i = 0; i < format.length; ++i) {
      ch = format.charAt(i);
      if (!special && ch == "\\") {
          special = true;
      }
      else if (special) {
          special = false;
          regex += String.escape(ch);
      }
      else {
          var obj = Date.formatCodeToRegex(ch, currentGroup);
          currentGroup += obj.g;
          regex += obj.s;
          if (obj.g && obj.c) {
              code += obj.c;
          }
      }
  }

  code += "if (u){\n"
      + "v = new Date(u * 1000);\n" // give top priority to UNIX time
      + "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0 && ms >= 0){\n"
      + "v = new Date(y, m, d, h, i, s, ms);\n"
      + "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0){\n"
      + "v = new Date(y, m, d, h, i, s);\n"
      + "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0){\n"
      + "v = new Date(y, m, d, h, i);\n"
      + "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0){\n"
      + "v = new Date(y, m, d, h);\n"
      + "}else if (y >= 0 && m >= 0 && d > 0){\n"
      + "v = new Date(y, m, d);\n"
      + "}else if (y >= 0 && m >= 0){\n"
      + "v = new Date(y, m);\n"
      + "}else if (y >= 0){\n"
      + "v = new Date(y);\n"
      + "}\n}\nreturn (v && (z || o))?" // favour UTC offset over GMT offset
      +     " (Ext.type(z) == 'number' ? v.add(Date.SECOND, (v.getTimezoneOffset() * 60) + z) :" // reset to UTC, then add offset
      +         " v.add(Date.HOUR, (v.getGMTOffset() / 100) + (o / -100))) : v;\n" // reset to GMT, then add offset
      + "}";

  Date.parseRegexes[regexNum] = new RegExp("^" + regex + "$", "i");
  eval(code);
};

// private
Ext.apply(Date.parseCodes, {
    j: {
        g:1,
        c:"d = parseInt(results[{0}], 10);\n",
        s:"(\\d{1,2})" // day of month without leading zeroes (1 - 31)
    },
    M: function() {
        for (var a = [], i = 0; i < 12; a.push(Date.getShortMonthName(i)), ++i); // get localised short month names
        return Ext.applyIf({
            s:"(" + a.join("|") + ")"
        }, Date.formatCodeToRegex("F"));
    },
    n: {
        g:1,
        c:"m = parseInt(results[{0}], 10) - 1;\n",
        s:"(\\d{1,2})" // month number without leading zeros (1 - 12)
    },
    o: function() {
        return Date.formatCodeToRegex("Y");
    },
    g: function() {
        return Date.formatCodeToRegex("G");
    },
    h: function() {
        return Date.formatCodeToRegex("H");
    },
    P: {
      g:1,
      c:[
          "o = results[{0}];",
          "var sn = o.substring(0,1);", // get + / - sign
          "var hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60);", // get hours (performs minutes-to-hour conversion also, just in case)
          "var mn = o.substring(4,6) % 60;", // get minutes
          "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
      ].join("\n"),
      s: "([+\-]\\d{2}:\\d{2})" // GMT offset in hrs and mins (with colon separator)
    }
});

// private
Date.formatCodeToRegex = function(character, currentGroup) {
    // Note: currentGroup - position in regex result array (see notes for Date.parseCodes above)
    var p = Date.parseCodes[character];

    if (p) {
      p = Ext.type(p) == 'function'? p() : p;
      Date.parseCodes[character] = p; // reassign function result to prevent repeated execution      
    }

    return p? Ext.applyIf({
      c: p.c? String.format(p.c, currentGroup || "{0}") : p.c
    }, p) : {
        g:0,
        c:null,
        s:Ext.escapeRe(character) // treat unrecognised characters as literals
    }
};