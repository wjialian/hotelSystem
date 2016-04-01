Ext.namespace("Neo");
Ext.namespace("Neo.basicsetting");
Neo.basicsetting.WestPanel=Ext.extend(Ext.Panel,{
	id:'westPanel'
	,width:200
	,layout:'accordion'
	,border:false
	,layoutConfig:{
        // layout-specific configs go here
        titleCollapse: false,
        animate: true,
        activeOnTop: true
    }
	,initComponent: function(){
		Ext.apply(this,{
			items:[
				{
					text:'基础资料'
				}
				,{
					text:'用户管理'
				}
				,{
					text:'软件设置'
				}
			]
		});
		Neo.basicsetting.WestPanel.superclass.initComponent.apply(this,arguments);
	}
	,onRender:function() {
		Neo.basicsetting.WestPanel.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.basicsetting.WestPanel.superclass.afterRender.apply(this,arguments);
	}
});
Ext.reg('westPanel',Neo.basicsetting.WestPanel)