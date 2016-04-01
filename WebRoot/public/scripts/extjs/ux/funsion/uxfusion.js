/*
 * @class Ext.ux.Chart.Fusion
 * Version:  Rc1
 * Author: Doug Hendricks. doug[always-At]theactivegroup.com
 * Copyright 2007-2008, Active Group, Inc.  All rights reserved.
 *
 ************************************************************************************
 *   This file is distributed on an AS IS BASIS WITHOUT ANY WARRANTY;
 *   without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE.
 ************************************************************************************

 License: ux.Chart.Fusion is licensed under the terms of
 the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 that the code/component(s) do NOT become part of another Open Source or Commercially
 licensed development library or toolkit without explicit permission.

 Donations are welcomed: http://donate.theactivegroup.com

 License details: http://www.gnu.org/licenses/lgpl.html

 Version:  Rc1

 Component Config Options:

   chartUrl    : the URL of the desired Fusion_Chart_Object.swf
   dataXML     : String  XML stream containing chart layour config and data series.
   dataUrl     : the URL of a remote dataXML resource


   fusionCfg  : {  //optional
            id    : String   id of <object> tag
            style : Obj  optional DomHelper style object
            params: {

                flashVars : {
                    chartWidth  : defaults to SWF Object geometry
                    chartHeight : defaults to SWF Object geometry
                    debugMode   : Fusion debug mode (0,1)
                    DOMId       : DOM Id of SWF object (defaults to assigned macro '@id')
                    registerWithJS: Fusion specific (0,1)
                    lang        : default 'EN',
                    dataXML     : An XML string representing the chart canvas config and data series
                    dataUrl     : A Url to load an XML resource (dataXML)
                }
            }
        }

 This class inherits from (thus requires) the ux.Media(uxmedia.js) and ux.Media.Flash (uxflash.js) classes

*/
(function(){
    Ext.namespace("Ext.ux.Chart");

    var chart = Ext.ux.Chart;
    var Media = Ext.ux.Media;

    var fusionAdapter = Ext.extend( Media.Flash , {
       requiredVersion : 8,
       chartURL        : null,
       dataXML         : '<chart></chart>',
       dataURL         : null,
       autoLoad        : null,
       autoScroll      : false,
       mediaCfg        : {url      : null,
                          id       : null,
                          start    : true,
                          controls : true,
                          height  : null,
                          width   : null,
                          autoSize : true, //Fusion required after reflow
                          renderOnResize:true, //Fusion required after reflow
                          scripting : 'always',
                          cls     :'x-media x-media-swf x-chart-fusion',
                          params  : {
                              wmode     :'transparent',
                              scale     :'exactfit',
                              scale       : null,
                              salign      : null
                               }
        },
       initMedia   : function(){

           this.addEvents('chartload','chartrender');

           if(this.autoLoad){
                this.on('render', this.doAutoLoad, this);
           }

           fusionAdapter.superclass.initMedia.call(this);
       }

       //called just prior to rendering the media
       ,onBeforeMedia: function(){

         /* assemble a valid mediaCfg for use with Fusion defined Chart SWF variables */
          var mc = this.mediaCfg;
          var fc = this.fusionCfg || {};
          var fp = fc.params || {};
          var fv = fp[this.varsName]||{};

          Ext.apply(mc , fc, {
              url  : this.chartURL || null

          });

          Ext.apply(mc.params, fp , {
              wmode       : 'transparent',
              scale       : 'exactfit',
              salign      : null
           });

          mc.params[this.varsName] ||
               (mc.params[this.varsName] ={ });

          Ext.apply(mc.params[this.varsName], fp[this.varsName]||{}, {
              chartWidth  :  '@width' ,
              chartHeight :  '@height',
              debugMode   : 0,
              DOMId       : '@id',
            registerWithJS: 1,
         allowScriptAccess: "@scripting" ,
              lang        : 'EN',
              dataXML     : this.dataXML || null,
              dataURL     : this.dataURL || null
          });

          var url= (url=mc.params[this.varsName]['dataURL'])?encodeURI(url):null;

          fusionAdapter.superclass.onBeforeMedia.call(this);
      }

      ,setDataXML  : function(xml, immediate){
           var o;
           this.dataXML = xml;
           if((o = this.getInterface()) && immediate){
               o.SetVariable("_root.dataURL","");
               //Set the flag
               o.SetVariable("_root.isNewData","1");
                //Set the actual data
               o.SetVariable("_root.newData",xml);
               //Go to the required frame
               o.TGotoLabel("/", "JavaScriptHandler");
           }

        }

      ,setDataURL  : function(url,immediate){
          var o;
          var vars = this.mediaCfg.params[this.varsName]||{};
          this.dataXML = null;
          this.dataURL = url;
          if((o = this.getInterface()) && immediate){

              //FusionCharts Free has no support for dynamic loading of URLs
              o.setDataURL? o.setDataURL(url) : this.load(url);
          }

       }
        /**
        * Loads this Fusion Chart immediately with XML content returned from an XHR call.
        * @param {Object/String/Function} config A config object containing any of the following options:
       <pre><code>
        panel.load({
           url: "your-url.php",
           params: {param1: "foo", param2: "bar"}, // or a URL encoded string
           callback: yourFunction,
           scope: yourObject, // optional scope for the callback
           nocache: false,
           timeout: 30,
           connectionClass : null, //optional ConnectionClass (Ext.data.Connection or descendant) to use for the request.
       });
       </code></pre>
        * The only required property is url. The optional property nocache is shorthand for disableCaching
        *
        * @return {Ext.ux.Chart.Fusion} this
        */

       ,load   :function(url, params, callback){

           var method , cfg, callerScope,timeout,disableCaching ;
           if(typeof url == "object"){ // must be config object
               cfg = url;
               url = cfg.url;
               params = params || cfg.params;
               callback = callback || cfg.callback;
               callerScope = cfg.scope;
               method = cfg.method || 'GET';

               disableCaching = cfg.disableCaching || false;
               timeout = cfg.timeout || 30;
           }

           if(typeof url == "function"){
               url = url.call(this);
           }

           method = method || (params ? "POST" : "GET");
           if(method == "GET"){
               if(disableCaching){
                   var append = "_dc=" + (new Date().getTime());
                   if(url.indexOf("?") !== -1){
                       url += "&" + append;
                   }else{
                       url += "?" + append;
                   }
                }
           }

           var o = Ext.apply(cfg ||{}, {
               url : url,
               params: (typeof params == "function" && callerScope) ? params.createDelegate(callerScope) : params,
               success: function(response){this.setDataXML(response.responseText,true);},
               failure: function(response){this.setDataXML('Failure',true);},
               scope: this,
               callback: callback,
               timeout: (timeout*1000),
               argument: {
                "options"   : cfg,
                "url"       : url,
                "form"      : null,
                "callback"  : callback,
                "scope"     : callerScope || window,
                "params"    : params
               }
           });

           new (o.connectionClass || Ext.data.Connection)().request(o);

           return this;

       }
       // autoLoad for Chart (XML) series on render.
      ,doAutoLoad : function(){
           this.load(
               typeof this.autoLoad == 'object' ?
                   this.autoLoad : {url: this.autoLoad});
       }
       ,print  : function() {
           var i; if(i=this.getInterface())i.print();
       }
       ,_HchartOnRender   :  function(){

             this.fireEvent('chartrender', this, this.getInterface());


       }
       ,_HchartOnLoad   :  function(){

            this.fireEvent('chartload', this, this.getInterface());

       }
       ,loadMask : false


    });
    /* Class method callbacks */

    fusionAdapter.chartOnLoad = function(DOMId){
        var c = Ext.get(DOMId);
        if(c && (c = c.owner)){ c._HchartOnLoad.call( c); }
    };

    fusionAdapter.chartOnRender = function(DOMId){
            var c = Ext.get(DOMId);
            if(c && (c = c.owner)){ c._HchartOnRender.call( c);}

    };

    window.FC_Rendered = window.FC_Rendered ? window.FC_Rendered.createInterceptor(fusionAdapter.chartOnRender):fusionAdapter.chartOnRender;
    window.FC_Loaded   = window.FC_Loaded   ? window.FC_Loaded.createInterceptor(fusionAdapter.chartOnLoad):fusionAdapter.chartOnLoad;

    chart.Fusion = Ext.extend(Ext.ux.FlashComponent, { ctype : 'Ext.ux.Chart.Fusion' });
    Ext.apply(chart.Fusion.prototype, fusionAdapter.prototype);
    Ext.reg('fusion', chart.Fusion);

    chart.Fusion.Panel = Ext.extend(Ext.ux.FlashPanel, {ctype : 'Ext.ux.Chart.Fusion.Panel'});
    Ext.apply(chart.Fusion.Panel.prototype, fusionAdapter.prototype);
    Ext.reg('fusionpanel', (Ext.ux.FusionPanel = chart.Fusion.Panel));

    Ext.ux.FusionWindow = chart.Fusion.Window = Ext.extend(Ext.ux.FlashWindow, {ctype : "Ext.ux.FusionWindow"});
    Ext.apply(chart.Fusion.Window.prototype, fusionAdapter.prototype);
})();