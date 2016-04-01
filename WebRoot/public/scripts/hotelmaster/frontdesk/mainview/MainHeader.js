Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");
Neo.frontdesk.MainHeader = function(){
	Neo.frontdesk.MainHeader.superclass.constructor.call(this);
}
Neo.frontdesk.MainHeader = Ext.extend(Ext.Panel,{
	id:'headerPanel'
	,height:120
	,layout:'column'
	,border:false
	,initComponent: function(){
		Ext.apply(this,{
			items:[
				{
					columnWidth:.55
					,border:false
					,layout:'fit'
					,items:[
						{
							xtype:'panel'
							,id:'logo-header'
							,border:false
							,html:'<img src="public/images/header.png">'
						}
					]
				}
				,{
					columnWidth:.45
					,border:false
					,layout:'fit'
					,items:[
						{
							xtype:'panel'
							,id:'control-header'
							,border:false
							,tbar:[
								{
									text:'欢迎您   '+'Admin酒店' //[编辑个人资料]
								}
								,{
									text:'系统后台'
									,iconCls:'icon-system'
									,handler:function(){
										var path = window.location.pathname;
									 	path = path.substring(0, path.lastIndexOf('/') + 1);
									 	path += "basicsetting.htm";	
										window.location = path;
									}
								}
								/*,{
									text:'实时消息'
									,iconCls:'icon-group'
									,handler:function(){
										var path = window.location.pathname;
									 	path = path.substring(0, path.lastIndexOf('/') + 1);
									 	path += "business.htm";	
										window.location = path;
									}
								}*/
								,'->'
								,{
									text:'注销'
									,iconCls:'icon-logout'
									,handler:function(){
										Ext.Msg.show({
										   title:'注销系统',
										   msg: '提示:注销系统前请注意保存数据,确定要注销吗?',
										   buttons: Ext.Msg.YESNO,
										   fn: function(btn){
										   		if(btn=='yes'){
											   		Ext.Ajax.request({
														url:'userLogout.htm'
														,method:'POST'
														,success: function(){
															 	var path = window.location.pathname;
															 	path = path.substring(0, path.lastIndexOf('/') + 1);
															 	path += "userLogin.htm";
															 	window.location = path;
														}
														,params:{ajax:true}
													});
										   		}
										   },
										   animEl: 'elId',
										   icon: Ext.MessageBox.QUESTION
										});
									}
								}
							]
						}
					]
				}
			]
		});
		Neo.frontdesk.MainHeader.superclass.initComponent.apply(this,arguments);
	}
	,onRender:function() {
		Neo.frontdesk.MainHeader.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.MainHeader.superclass.afterRender.apply(this,arguments);
	}
	,beforeDestroy: function(){
		Ext.Panel.superclass.beforeDestroy.call(this);
	}
		
});
Ext.reg('mainheader',Neo.frontdesk.MainHeader)