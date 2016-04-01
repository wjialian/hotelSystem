Ext.BLANK_IMAGE_URL = 'public/scripts/extjs/resources/images/default/s.gif';
Ext.onReady(function(){
	Ext.QuickTips.init(); 
	Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
	this.shortBogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.';
    var tools = [{
        id:'gear',
        handler: function(){
            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
        }
    },{
        id:'close',
        handler: function(e, target, panel){
            panel.ownerCt.remove(panel, true);
        }
    }];
    
    var menu2 = new Ext.menu.Menu({
        id: 'mainMenu2',
        items: [
			{
                text: '用户基本设置',
                iconCls: 'calendar'
               
            },{
                text: '客房设置'
            },{
                text: '客房类型设置'
            }
        ]
    });
    var panelMenu2 = {
		xtype: 'menupanel',
        title: '基本设置',
        collapsible:true,
        menu: new Ext.menu.Menu({
	        id: 'mainMenu2',
	        items: [
				{
	                text: '用户基本设置',
	                iconCls: 'calendar'
	               
	            },{
	                text: '客房设置'
	            },{
	                text: '客房类型设置'
	            }
	        ]
	    }),
        iconCls:'nav',
		fillHeight: true
    };
    
    var viewport = new Ext.Viewport({
        layout:'border',
        items:[
        {
        	 region:'center'
            ,margins:'30 5 5 0'
            ,id:'center-panel'
			,xtype:'accordionview'
        }
        ]
    });
})