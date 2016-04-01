Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.Historyview = function(){
	Neo.frontdesk.Historyview.superclass.constructor.call(this);
}

Neo.frontdesk.Historyview = Ext.extend(Ext.Panel,{
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
					,xtype:'panel'
					//,collapsible:false
					,margins:'5 0 0 0'
					,layout:'fit'
					,items:[
						{
							xtype:'tabpanel'
							,border:false
							,activeTab:0
							,tabPosition:'top'
							//,autoHeight:true
							,layoutOnTabChange:true
							//,defaults:{autoScroll: true}
							,items:[
								{
									xtype:'guestdetailgrid'
									,id:'guestdetailgrid-historyview'
								}
								,{
									xtype:'paymentdetailgrid'
									,id:'paymentdetailgrid-historyview'
								}
							]
						}
					]
				},
				{
					xtype:'historydata'
					,region:'north'
					,height:400
					,collapsible:true
					,collapseFirst: false
					,minSize: 30
		       		,maxSize: 225
		       		,split:true
				}
			]
			});
			Neo.frontdesk.Historyview.superclass.initComponent.apply(this,arguments);
		}
		,onRender:function(){
			Neo.frontdesk.Historyview.superclass.onRender.apply(this,arguments);
		}
		,showBtn:function(){
			//this.guestDetail = this.items.itemAt(1).items.itemAt(0);
			//this.guestDetail.showBtn();
		}
		
});
Ext.reg('historyview',Neo.frontdesk.Historyview);