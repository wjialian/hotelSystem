Ext.BLANK_IMAGE_URL = 'public/scripts/extjs/resources/images/default/s.gif';
Ext.onReady(function(){
	Ext.QuickTips.init(); 
	Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
	this.shortBogusMarkup = '';
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
        items:[{
            region:'west',
            id:'west-panel',
            title:'后台管理',
            split:true,
            width: 200,
            minSize: 175,
            maxSize: 400,
            collapsible: true,
            //collapsed : true,
            margins:'30 0 5 5',
            cmargins:'30 5 5 5',
            layout:'accordion',
            layoutConfig:{
                animate:true
            },
            items: [{
                    xtype: 'menupanel',
			        title: '系统基本设置',
			        collapsible:true,
			        menu: new Ext.menu.Menu({
				        id: 'mainMenu2',
				        items: [
							{
				                text: '客房设置'
				                ,handler:function(){
				                	this.tabpanel = Ext.getCmp('center-tab');
				                	var tab = Ext.getCmp('room-tab');
									if(tab){
											this.tabpanel.setActiveTab(tab);
										}
								    else {
						                	var p = this.tabpanel.add(new Neo.basicSetting.RoomSetting({
											title:'客房设置'
											,id:'room-tab'
											,closable:true
											})
										);
									  this.tabpanel.setActiveTab(p);
								    }
				                }
				            },{
				                text: '用户基本设置',
				                iconCls: 'calendar'
				               ,handler:function(){
				                	this.tabpanel = Ext.getCmp('center-tab');
				                	var tab = Ext.getCmp('operator-tab');
									if(tab){
											this.tabpanel.setActiveTab(tab);
										}
								    else {
						                	var p = this.tabpanel.add(new Neo.basicSetting.OperatorData({
											title:'用户设置'
											,id:'operator-tab'
											,closable:true
											})
										);
									  this.tabpanel.setActiveTab(p);
								    }
				                }
				               
				            }
				        ]
				    }),
			        iconCls:'nav',
					fillHeight: true}
            /*{
                title:'Navigation',
                autoScroll:true,
                border:false,
                iconCls:'nav'
                ,items:[panelMenu2]
                
            },{
                title:'Settings',
                html: this.shortBogusMarkup,
                border:false,
                autoScroll:true,
                iconCls:'settings'
            }*/]
        },{
				region:'north'
				,xtype:'basicheader'
			},{
			xtype:'tabpanel'
			,margins:'30 5 5 0'
			,id:'center-tab'
			,region:'center'
			,border:false
			,activeItem:0
			,items:[{		
				 title:'客房设置'
				,xtype:'roomsetting'//调用RoomSetting.js
				,id:'room-tab'
				,closable:false
			}]
		}]
        /*{
        	 region:'center'
            ,margins:'30 5 5 0'
            ,id:'center-panel'
			,xtype:'accordionview'
        }]*/
    });
})