Ext.BLANK_IMAGE_URL = 'public/scripts/extjs/resources/images/default/s.gif';
Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
	//左侧主菜单
	var mainMenu = new Neo.frontdesk.MainMenuTree({	
			collapsible:true
			,split:true
			,margins:'5 0 5 5'
			,cmargins:'5 5 5 5'
	}); 
	//房间状态视图
	//var mainView= new Neo.frontdesk.Mainview();
	//var roomview = new Neo.frontdesk.RoomView();
	//var checkInForm=new Neo.frontdesk.CheckInForm();
	//TabPanel和主Tab页(房态和快捷登记)
	/*var tabviewer = new Ext.TabPanel({
				
				//,defaults:{autoHeight:true}//Fucky
				//,autoscroll:true //Fucky
				
		
	});*/
	//测试
	/*tabviewer.add(new Neo.frontdesk.Mainview({
			title:'MainView'
			,items:[
				{
					width:300
					,title:'11'
					,border: true
					,region: 'west'
					,xtype:'panel'
				}
			]
	}));*/
	//整体视图
	
	var viewport=new Ext.Viewport({
		layout:'border'
		,items:[
			{
				id:'headerPanel'
				,xtype:'panel'
				,region:'north'
				,height:65
				
			}
			,mainMenu
			,{
				//title:'View'
				region:'center'
				,border:true
				,items:[
					{
						xtype:'tabpanel'
						,title:'Tab'
						,id:'tabViewer'
						,border: false
						,activeTab:0
						,tabPosition:'top'
						,layoutOnTabChange:true
						,items:[
							{
								xtype:'mainview'
							}
						]
					}
				]
				,layout:'fit' //important
				,margins: '5 5 5 0'
				,cmargins: '5 5 5 5'
			}
		]
	});

});