Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");
Neo.frontdesk.GuestDetailForm = function(){
	Neo.frontdesk.GuestDetailForm.superclass.constructor.call(this);
	
}
Neo.frontdesk.GuestDetailForm = Ext.extend(Ext.FormPanel,{
	title: '客人详细信息'
    //,bodyStyle:'padding:5px 5px 0'
    ,frame:true
    ,border:false
    ,labelWidth: 70
    //,width: 350
	,initComponent: function(){
		Ext.apply(this,{
			items:[
				{
                	xtype: 'fieldset'
                    ,defaults: {width: 210}
           			,defaultType: 'textfield'
           			,autoHeight:true
                    ,title: '客人信息'
                    ,items:[
                    	{
                        	fieldLabel: '登记时间'
                            ,name: 'intime'
                            ,allowBlank: false	
                        }
                        ,{
                            fieldLabel: '预计离店'
                            ,name: 'outtime'
                            ,allowBlank: false
                        }
                    ]
				}
			]
		});
		Neo.frontdesk.GuestDetailForm.superclass.initComponent.apply(this,arguments);
	}
	,onRender:function() {
			Neo.frontdesk.GuestDetailForm.superclass.onRender.apply(this,arguments);
	}
	,beforeDestroy: function(){
		Ext.FormPanel.superclass.beforeDestroy.call(this);
	}
});
Ext.reg('guestdetailform',Neo.frontdesk.GuestDetailForm)