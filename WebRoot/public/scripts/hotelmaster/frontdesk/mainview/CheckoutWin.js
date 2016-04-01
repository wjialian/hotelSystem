Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.CheckoutWin=Ext.extend(Ext.Window,{
	title:'结帐'
	,width:400
    ,height:250
    ,layout:'fit'
    ,draggable:false
    //,hideBorders:true
    ,modal:true
    ,frame:true
    ,resizable:false
    ,tools:[
				{
					id:'print'
					,scope:this
					,handler: function(event, toolEl, panel){
					// refresh logic
						//this.roomDataView.refresh();
						Ext.ux.Toast.msg('提示','打印功能制作中');
					}
				}
			]
	,initComponent: function(){
		Ext.apply(this,{
			buttons:[
				{
					text:'结账'
					,id:'bmCheckoutBtn'
				}
				,{
					text:'取消'
					,id:'bmCancelBtn'
				}
			]
			,items:[
				{
					xtype:'form'
					,id:'checkoutForm'
					,items:[
						{
							xtype: 'fieldset'
							,border:false
							//,bodyStyle:'padding:5px 5px 0'
							,autoHeight:true	//nessasary
							,title: '结账信息'
							,items:[
								{
									layout:'column'
									,labelWidth: 70
									,border:false
									,items:[
										{
											columnWidth:.5
											,border:false
											,layout: 'form'
											,items:[
												{
													xtype:'textfield'
													,fieldLabel: '登记单号'
													,name: 'bmOrderId'
													,id:'bmOrderId'
													,anchor:'95%'
													,allowBlank: false
													,disabled:true
												}
												,{
													xtype:'combo'
													,fieldLabel: '付款方式'
													,name: 'bmPaymentModel'
													,id:'bmPaymentModel'
													,anchor:'95%' 	//nessasary
													,allowBlank: false
													,displayField:'bmPaymentModel'
													,mode:'local'
													,editable:false
													,triggerAction: 'all'
													,value:'现金'
													,store:new Ext.data.SimpleStore({
														fields:['bmPaymentModel']
														,data:[
															['现金'],['信用卡'],['支票']
															,['其他']
														]
													})
												}
												,{
													fieldLabel:'预付押金'
													,xtype:'textfield'
													,name:'bmPaidMoney'
													,id:'bmPaidMoney'
													,vtype:'money'
													,allowBlank:false
													,anchor:'95%' //nessasary
													,maxLength:'12'
													,value:'0'
													,maxLengthText:'数值超出正常值,请检查后重新输入'
												}
												,{
													fieldLabel:'续收金额'
													,xtype:'textfield'
													,name:'bmReceivMoeny'
													,id:'bmReceivMoeny'
													,vtype:'money'
													,allowBlank:false
													,anchor:'95%' //nessasary
													,maxLength:'12'
													,value:'0'
													,maxLengthText:'数值超出正常值,请检查后重新输入'
												}
											]
										}
										,{
											columnWidth:.5
											,border:false
											,layout: 'form'
											,items:[
												{
													xtype:'combo'
													,fieldLabel: '结账类型'
													,name: 'bmType'
													,id:'bmType'
													,anchor:'95%' 	//nessasary
													,allowBlank: false
													,displayField:'bmType'
													,mode:'local'
													,editable:false
													,triggerAction: 'all'
													,value:'结单'
													,store:new Ext.data.SimpleStore({
														fields:['bmType']
														,data:[
															['结单'],['挂单'],['跑单']
															,['其他']
														]
													})
												}
												,{
													fieldLabel:'离店应收'
													,xtype:'textfield'
													,vtype:'money'
													,name:'bmTotalRate'
													,id:'bmTotalRate'
													,value:'0'
													,anchor:'95%' //nessasary
													,maxLength:'12'
													,maxLengthText:'数值超出正常值,请检查后重新输入'
												}
												,{
													fieldLabel:'剩余金额'
													,xtype:'textfield'
													,name:'bmRemain'
													,id:'bmRemain'
													,vtype:'money'
													,allowBlank:false
													,anchor:'95%' //nessasary
													,maxLength:'12'
													,value:'0'
													,maxLengthText:'数值超出正常值,请检查后重新输入'
												}
												,{
													fieldLabel:'营业员'
													,xtype:'textfield'
													,name:'bmOperator'
													,id:'bmOperator'
													,allowBlank:false
													,anchor:'95%' //nessasary
													,value:'admin'	//待读取
													,disabled:true
												}
											]
										}
									]
								}
								,{
									layout:'column'
									,labelWidth: 70
									,border:false
									,items:[
										{
											border:false
											,columnWidth:1
											,layout:'form'
											,items:[
												{
													fieldLabel:'结账说明'
													,xtype:'textfield'
													,name:'bmRemark'
													,id:'bmRemark'
													,allowBlank:true
													,anchor:'98%' //nessasary
												}
											]
											
										}
									]
								}
							]
						}
					]
				}
			]
		});
		Neo.frontdesk.CheckoutWin.superclass.initComponent.apply(this,arguments);
		this.cioOrderId=Ext.getCmp('cioOrderId');
		this.bmOrderId=Ext.getCmp('bmOrderId');
		this.cioPaidMoney=Ext.getCmp('cioPaidMoney');
		this.bmPaidMoney=Ext.getCmp('bmPaidMoney');
		this.cioOperator=Ext.getCmp('cioOperator');
		this.bmOperator=Ext.getCmp('bmOperator');
		this.cioGuestCardId = Ext.getCmp('cioGuestCardId');
		this.cioGuestName = Ext.getCmp('cioGuestName');
		//
		this.bmRemain=Ext.getCmp('bmRemain');
		this.cioTotalRate=Ext.getCmp('cioTotalRate');
		this.bmTotalRate=Ext.getCmp('bmTotalRate');
		//
		this.bmReceivMoeny=Ext.getCmp('bmReceivMoeny');
		this.cioId=Ext.getCmp('cioId');
		this.checkoutForm=Ext.getCmp('checkoutForm');
		this.checkinForm=Ext.getCmp('checkinForm');
		this.bmCheckoutBtn=Ext.getCmp('bmCheckoutBtn');
		this.bmCheckoutBtn.on({'click':this.onBmCheckoutBtn
			,scope:this});
		this.bmCancelBtn=Ext.getCmp('bmCancelBtn');
		this.bmCancelBtn.on({'click':this.onBmCancelBtn
			,scope:this});
		this.roomDataView=Ext.getCmp('roomDataView');
		this.checkoutBtn=Ext.getCmp('checkoutBtn');
	}
	,onRender:function() {
		Neo.frontdesk.CheckoutWin.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.CheckoutWin.superclass.afterRender.apply(this,arguments);
		this.initFieldValue();
	}
	,initFieldValue:function(){
		this.bmOrderId.setValue(this.cioOrderId.getValue());
		this.bmPaidMoney.setValue(this.cioPaidMoney.getValue());
		//this.bmOperator.setValue(this.cioOperator.getValue());
		this.bmTotalRate.setValue(this.cioTotalRate.getValue());
	}
	,onBmCheckoutBtn:function(){
		this.checkoutForm.getForm().submit({
			url:'checkout.htm?action=checkout'
			,params:{cioId:this.cioId.getValue(),bmOperator:this.bmOperator.getValue()
				,bmOrderId:this.bmOrderId.getValue(),cioGuestName:this.cioGuestName.getValue()
				,cioGuestCardId:this.cioGuestCardId.getValue()}
			,method:'POST'
			,scope:this
			,success:function(){
				Ext.Msg.alert('提示', '结账成功'
						,this.updateRmView.createDelegate(this,[],true));
			}
			,failure:function(form,action){
				if(action.failureType == 'server'){ 
               		obj = Ext.util.JSON.decode(action.response.responseText); 
                	Ext.Msg.alert('错误:', obj.errors.reason); 
                }
                if(action.failureType == 'client'){
                	Ext.ux.Toast.msg('提示','结账信息不正确，请核对后重新操作');
				}
			}
		});
	}
	,onBmCancelBtn:function(){
		this.close();
	}
	,formItemsDisable:function(){
		this.checkoutForm.items.itemAt(0).items.itemAt(0).
		items.itemAt(0).items.each(function(item){
			item.disable();
		});
		this.checkoutForm.items.itemAt(0).items.itemAt(0).
		items.itemAt(1).items.each(function(item){
			item.disable();
		});
		this.checkoutForm.items.itemAt(0).items.itemAt(1).
		items.itemAt(0).items.each(function(item){
			item.disable();
		});
	}
	//
	,updateRmView:function(){
		this.roomDataView.store.reload();
		this.bmCheckoutBtn.disable();
		this.formItemsDisable();
		this.checkoutBtn.disable();
		//console.log(this.checkinForm);
		//new window without the dom id checkinForm 
		this.checkinForm.infoState='afterCheckout';
	}
});

Ext.reg('checkoutwin',Neo.frontdesk.CheckoutWin);