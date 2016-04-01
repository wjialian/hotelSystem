Ext.namespace("Neo");
Ext.namespace("Neo.basicSetting");

Neo.basicSetting.RoomSetting = Ext.extend(Ext.Panel,{
		/*Default*/
		//title:'客户管理'
		layout:'border'
		//,height:690
		//,border:true
		//,autoHeight:true
		,initComponent: function(){
			Ext.apply (this,{
				items:[
				{
					region:'center'
					,layout:'fit'
					,title:'客房类型设置'
					,items:[
					{
						xtype:'roomcatalog'//调用roomcatalog.js
						,id:'roomcatalog-setting'
					
					}
					]
				},
				{
					region:'north'
					,height:380
					,layout:'fit'
		       		,split:true
		       		,items:[
						{
							xtype:'room'//调用room.js
							,id:'room-setting'
						}
					]
				}
			]
			});
			Neo.basicSetting.RoomSetting.superclass.initComponent.apply(this,arguments);
		}
		,onRender:function(){
			Neo.basicSetting.RoomSetting.superclass.onRender.apply(this,arguments);
		}
		
});
Ext.reg('roomsetting',Neo.basicSetting.RoomSetting);