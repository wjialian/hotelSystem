Ext.namespace("Neo");
Ext.namespace("Neo.basicSetting");
Neo.basicSetting.MainHeader = function(){
	Neo.basicSetting.MainHeader.superclass.constructor.call(this);
}
Neo.basicSetting.MainHeader = Ext.extend(Ext.Panel,{
	id:'headerPanel'
	,autoHeight:true
	,layout:'column'
	,border:false
	,initComponent: function(){
		Ext.apply(this,{
			items:[	{
					columnWidth:.99
					,border:false
					,layout:'fit'
					,items:[
						{
							xtype:'panel'
							,id:'control-header'
							,border:false
							,tbar:[
								'->',{
									text:'返回前台页面'
									,iconCls:'icon-system'
									,handler:function(){
										var path = window.location.pathname;
									 	path = path.substring(0, path.lastIndexOf('/') + 1);
									 	path += "frontdesk.htm";	
										window.location = path;
									}
								}
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
		Neo.basicSetting.MainHeader.superclass.initComponent.apply(this,arguments);
	}
	,onRender:function() {
		Neo.basicSetting.MainHeader.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.basicSetting.MainHeader.superclass.afterRender.apply(this,arguments);
	}
	,beforeDestroy: function(){
		Ext.Panel.superclass.beforeDestroy.call(this);
	}
		
});
Ext.reg('basicheader',Neo.basicSetting.MainHeader)