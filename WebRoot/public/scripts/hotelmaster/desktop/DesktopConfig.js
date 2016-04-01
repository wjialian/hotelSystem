/*
 * qWikiOffice Desktop 0.7.1
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * 
 * http://www.qwikioffice.com/license
 *
 * NOTE:
 * This code is based on code from the original Ext JS desktop demo.
 * I have made many modifications/additions.
 *
 * The Ext JS licensing can be viewed here:
 *
 * Ext JS Library 2.0 Beta 2
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 *
 */

QoDesk = new Ext.app.App({
	
	init :function(){
		Ext.QuickTips.init();
	},

	// get modules to initialize (make available to your desktop)
	getModules : function(){
		return [
			/* The next line is being replaced with the modules list
			 * by os.php */
			<<modules>>
		];
	},
	
	// config for the start menu
    getStartConfig : function(){
    	var pref = new QoDesk.Preferences();
		pref.app = this;
		
        return {
        	/* iconCls: 'user',
            title: get_cookie('memberName'), */
            toolItems: [
            	pref.launcher
            ,{
				text:'Logout',
				iconCls:'logout',
				handler:function(){ window.location = "logout.php"; },
				scope:this
			}],
			toolPanelWidth: 115
        };
    },
    
    // get desktop configuration
    getDesktopConfig : function(){
    	/* The next line is being replaced with the config
		 * by os.php */
		var o = <<config>>;	
			
		if(o.success){
			this.initDesktopConfig(o.config);
		}else{
			// error
		}
		
    	/* can also call server for saved config
    	 *
		Ext.Ajax.request({
			success: function(o){
				var decoded = Ext.decode(o.responseText);
				
				if(decoded.success){
					this.initDesktopConfig(decoded.config);
				}else{
					// error
				}
			},
			failure: function(){
				// error
			},
			scope: this,
			url: 'source/core/DesktopConfig.php'
		}); */
		
		/* can also hard code the config as shown here
		 *
		this.initDesktopConfig({
			'autorun' : [
				'docs-win'
			],
			'contextmenu': [
				'qo-preferences'
    		],
    		'quickstart': [
    			'demo-grid',
				'demo-tabs',
				'demo-acc',
				'demo-layout'
			],
			'shortcuts': [
				'demo-grid',
				'demo-tabs',
				'demo-acc'
			],
			'startmenu': [
				'docs-win',
				'demo-grid',
				'demo-tabs',
				'demo-acc',
				'demo-layout',
				'demo-menu'
			],
			'styles': {
				'backgroundcolor': 'f9f9f9',
				'theme': {
					'id': 2,
					'description': 'Vista Black',
					'path': 'resources/themes/xtheme-vistablack/css/xtheme-vistablack.css'
				},
				'transparency': false,
				'wallpaper': {
					'id': 1,
					'description': 'qWikiOffice',
					'path': 'resources/wallpapers/qwikioffice.jpg'
				},
				'wallpaperposition': 'center'
			}
		}); */
    }
});