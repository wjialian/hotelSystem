Ext.namespace("Neo");
Ext.namespace("Neo.basicSetting");

Neo.basicSetting.TempSetting = Ext.extend(Ext.Panel,{
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
					,title:'业务统计'
					,items:[
						{
							xtype:'accordionview'
							,id:'accordionview-business'
						}
					]
				}
			]
			});
			Neo.basicSetting.TempSetting.superclass.initComponent.apply(this,arguments);
		}
		,onRender:function(){
			Neo.basicSetting.TempSetting.superclass.onRender.apply(this,arguments);
		}
		
});
Ext.reg('tempsetting',Neo.basicSetting.TempSetting);