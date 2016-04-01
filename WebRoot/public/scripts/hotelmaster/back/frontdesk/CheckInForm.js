Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");
Neo.frontdesk.CheckInForm = function(){
	Neo.frontdesk.CheckInForm.superclass.constructor.call(this);
}
Neo.frontdesk.CheckInForm = Ext.extend(Ext.FormPanel,{
	title:'登记信息'
	,bodyStyle:'padding:5px 5px 0'
	//,labelAlign: 'top'
	,width: 300
	//,border:false
    ,frame:true
	//,autoscroll:true
	//,defaultType: 'textfield'
	//,width:300
	,initComponent: function(){
		var Rooms=Ext.data.Record.create([
				'rmArea'
				,{name:'rmAvailable',type:'boolean'}
				,'rmFloor','rmId'
				,{name:'rmPrctPrice',type:'float'}
				,{name:'rmState',type:'int'}
				,'rmTelphone'
				,'rmCatalog'
				,'roomInfoStateAsColor'
				,'rmPicture'
		]);
		Ext.apply(this,{
			buttons:[
				{
					id:'checkinBtn'
					,disabled:true
					,text:'登记'
				}
				,{
					id:'cancelBtn'
					,disabled:true
					,text:'取消'
				}
			]
			,items:[
				{
					xtype: 'fieldset'
					//,bodyStyle:'padding:5px 5px 0'
					,autoHeight:true	//nessasary
					,collapsible: true
					,title: 'CheckInInfo'
					,items:[
						{
							layout:'column'
							,labelAlign: 'top'
							,labelWidth: 70
							,items:[
								{
									columnWidth:.8
									,border:false
									,layout: 'form'
									,items: [
										{
											xtype:'xdatetime'
											,timeWidth:70
											,id:'inDateTime'
											,fieldLabel: '登记时间'
											,value:new Date().format('m/d/y')
											,name: 'inDateTime'
											,anchor:'95%' 	//nessasary
											,allowBlank: false
										}
									]
								}
								,{
									columnWidth:.2
									,border:false
									,layout: 'form'
									,items:[
										{
											xtype:'textfield'
											,fieldLabel: '天数'
											,name: 'daysNumber'
											,value:'1'
											,maxLength:'3'
											,maxLengthText:'数值超出正常值,请检查后重新输入数'
											,vtype:'numeric'
											,anchor:'95%'
										}
									]
								}
							]
						}
						,{
							layout:'column'
							,labelAlign: 'top'
							,labelWidth: 70
							,items:[
								{
									columnWidth:.8
									,border:false
									,layout: 'form'
									,items: [
										{
											xtype:'xdatetime'
											,timeWidth:70
											,fieldLabel: '预计离店'
											,value:new Date().add(Date.DAY,1).format('m/d/y')
											,id:'preOutDateTime'
											,name: 'preOutDateTime'
											,anchor:'95%' 	//nessasary
											,allowBlank: false
										}
									]
								}
							]
						}
						,{
							layout:'column'
							,labelAlign: 'left'
							,items:[
								{
									columnWidth:.7
									,border:false
									,layout: 'form'
									,labelWidth: 60
									,items: [
										{
											xtype:'combo'
											,fieldLabel: '客人类型'
											,name: 'guestType'
											,id:'guestType'
											,anchor:'95%' 	//nessasary
											,allowBlank: false
											,displayField:'guestType'
											,mode:'local'
											,editable:false
											,triggerAction: 'all'
											,store:new Ext.data.SimpleStore({
												fields:['guestType']
												,data:[
													['普通客人'],['会员'],['贵宾']
													,['协议单位']
												]
											})
										}
									]
								}
								,{
									columnWidth:.3
									,border:false
									,layout: 'form'
									,labelWidth: 30
									,items:[
										{
											xtype:'textfield'
											,fieldLabel: '人数'
											,name: 'manNumber'
											,anchor:'95%'
											,vtype:'numeric'
											,value:'2'
											,maxLength:'4'
											,maxLengthText:'数值超出正常值,请检查后重新输入'
											,allowBlank: false
										}
									]
								}
							]
						}
					]
				}
				,{
					xtype: 'fieldset'
					,autoHeight:true
					,collapsible: true
					,title:'GuestInfo'
					,items:[
						{
							layout:'column'
							,items:[
								{
									columnWidth:.55
									,layout:'form'
									,labelWidth: 40
									,border:false
									,items:[
										{
											fieldLabel: '姓名'
							                ,xtype:'textfield'
							                ,name: 'guestName'
							                ,id: 'guestName'
							                ,allowBlank: false
							                ,anchor:'95%'
										}
									]
								}
								,{
									columnWidth:.45
									,layout:'form'
									,labelWidth: 60
									,border:false
									,items:[
										{
											fieldLabel:'性别'
											,xtype:'combo'
											,name:'guestGender'
											,id:'guestGender'
											,allowBlank:false
											,anchor:'95%' //nessasary
											,displayField:'guestGender'
											,mode:'local'
											,editable:false
											,triggerAction: 'all'
											,store:new Ext.data.SimpleStore({
												fields:['guestGender']
												,data:[
													['男'],['女'],['保密']
												]
											})
										}
									]
								}
							]
						}
						,{
							layout:'column'
							,items:[
								{
									columnWidth:.55
									,layout:'form'
									,labelWidth: 40
									,border:false
									,items:[
										{
											fieldLabel:'证件号'
											,xtype:'textfield'
											,name:'guestCardId'
											,allowBlank:false
											,anchor:'95%' //nessasary
											//,vtype:'chinaCardId'
										}
									]
								}
								,{
									columnWidth:.45
									,layout:'form'
									,labelWidth: 60
									,border:false
									,items:[
										{
											fieldLabel: '证件类型'
							                ,xtype:'combo'
							                ,name: 'cardCatalog'
							                ,id:'cardCatalog'
							                ,allowBlank: false
							                ,anchor:'95%'
							                ,displayField:'cardCatalog'
											,mode:'local'
											,triggerAction: 'all' //需加
											,editable:false
											,store:new Ext.data.SimpleStore({
												fields:['cardCatalog']
												,data:[
													['身份证'],['学生证'],['军官证']
													,['警官证'],['士兵证'],['驾照']
													,['护照'],['户口薄'],['其他']
												]
											})
										}
									]
								}
							]
						}
                   	]
				}
				,{//2
					xtype: 'fieldset'
					,autoHeight:true
					,collapsible: true
					,title:'费用信息'
					,items:[
						{
							id:'roomsSlected'
							,title:'已选择房间'
							,xtype:'grid'
							,anchor:'100%'
							,frame:true
							,height:150
							,scrollOffset:5
							,store:new Ext.data.SimpleStore({
							fields:[
								,'rmId'
								,{name:'rmPrctPrice',type:'float'}
								,{name:'rmState',type:'int'}
								,'rmCatalog'
								,'rmPrctDiscount'		//Room的预设折扣
								,'rmSetPrctDiscount'	//Room的实际折扣
								,'rmSetPrctPrice'		//Room的实际价格
								]
							})
							,columns:[
								{id:'rooms',header:'房间',width:50,sortable:true,dataIndex:'rmId'}
								,{header:'类型',width:50,sortable:true,dataIndex:'rmCatalog'}
								,{header:'预设价',width:60,sortable:true,dataIndex:'rmPrctPrice'}
								,{header:'折扣',width:50,sortable:true,dataIndex:'rmSetPrctDiscount'}
								,{header:'实际价',width:60,sortable:true,dataIndex:'rmSetPrctPrice'}
							]
						}
						,{
							layout:'column'
							,frame:true
							,items:[
								{
									columnWidth:.50
									,layout:'form'
									,labelWidth: 53
									,border:false
									,items:[
										{
											fieldLabel:'加床费'
											,xtype:'textfield'
											,vtype:'money'
											,name:'bedRate'
											,id:'bedRate'
											,value:'0'
											,anchor:'95%' //nessasary
											,maxLength:'10'
											,maxLengthText:'数值超出正常值,请检查后重新输入'
										}
										,{
											fieldLabel:'总费用'
											,xtype:'textfield'
											,name:'totalRate'
											,id:'totalRate'
											,vtype:'money'
											,value:'0'
											,allowBlank:false
											,anchor:'95%' //nessasary
											,maxLength:'12'
											,maxLengthText:'数值超出正常值,请检查后重新输入'
										}
									]
								}
								,{
									columnWidth:.50
									,layout:'form'
									,labelWidth: 53
									,border:false
									,items:[
										{
											fieldLabel:'付款方式'
											,xtype:'combo'
											,name:'paymentModel'
											,id:'paymentModel'
											,allowBlank:false
											,anchor:'95%' //nessasary
											,displayField:'paymentModel'
											,mode:'local'
											,editable:false
											,triggerAction: 'all'
											,store:new Ext.data.SimpleStore({
												fields:['paymentModel']
												,data:[
													['现金'],['信用卡'],['支票']
													,['其他']
													//,['签单帐户'],['免费'],['贵宾卡']
													//,['会员储值卡']
												]
											})
										}
										,{
											fieldLabel:'预付金'
											,xtype:'textfield'
											,name:'paidMoney'
											,vtype:'money'
											,allowBlank:false
											,anchor:'95%' //nessasary
											,maxLength:'12'
											,value:'0'
											,maxLengthText:'数值超出正常值,请检查后重新输入'
										}
									]
									
								}
							]
						}
                   	]
				}
			]
		});
		Neo.frontdesk.CheckInForm.superclass.initComponent.apply(this,arguments);
		this.roomDetailTemplate=new Ext.XTemplate(
			 '<div class="ux-room-details">'
			 	,'<tpl for=".">'
			 		,'<div class="ux-room-details-id">'
			 		,'<p><b>房号:</b>{rmId}</p></div>'
			 		,'<div class="ux-room-details-type">'
			 		,'<p><b>房间类型:</b>{rmCatalog}</p></div>'
			 	,'</tpl>'
			 ,'</div>'
		);
	    this.roomsGrid = Ext.getCmp('roomsSlected');
	    this.checkinBtn=Ext.getCmp('checkinBtn');
	    this.cancelBtn=Ext.getCmp('cancelBtn');
	    
	    
	    this.bedRate=Ext.getCmp('bedRate');
	    
		this.paymentModel=Ext.getCmp('paymentModel');
	    this.cardCatalog=Ext.getCmp('cardCatalog');
	    this.guestType=Ext.getCmp('guestType');
	    this.guestGender=Ext.getCmp('guestGender');
	    this.totalRate=Ext.getCmp('totalRate');
	    
	    this.paymentModel.setValue('现金');
	    this.cardCatalog.setValue('身份证');
	    this.guestType.setValue('普通客人');
	    this.guestGender.setValue('男');
	    this.roomsGrid.on({'rowcontextmenu':this.onRowContextMenu
	    			,scope:this});
	    this.roomsgGridMenu=new Ext.menu.Menu({
	    	id:'roomsGridMenu'
	    	,items:[
	    		{
	    			text:'取消'
	    			,id:'cancelRoomBtn'
	    		}
	    	]
	    });
	    this.roomsGrid.on({'dblclick':this.onGridDblClick
	    		,scope:this});
	    this.checkinBtn.on({'click':this.onCheckinBtnClick
	    		,scope:this});
	    this.cancelRoomBtn=Ext.getCmp('cancelRoomBtn');		
	    this.cancelRoomBtn.on({'click':this.onRoomCancelClick
	    		,scope:this});
	    this.on({'actionfailed':this.onActionFailed
	    		,scope:this});
	}
	,onRender:function() {
		Neo.frontdesk.CheckInForm.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.CheckInForm.superclass.afterRender.apply(this,arguments);
	}
	,beforeDestroy: function(){
		Ext.FormPanel.superclass.beforeDestroy.call(this);
	}
	
	,addRoomInfo:function(selRoomRecord){	//增加房间到Grid
		var data=selRoomRecord.data;
		if(this.roomsGrid.store.indexOf(selRoomRecord)<0){
			selRoomRecord.set('rmSetPrctDiscount',selRoomRecord.get('rmPrctDiscount'));
			this.roomsGrid.store.add(selRoomRecord);
			selRoomRecord.set('rmSetPrctPrice',selRoomRecord.get('rmPrctPrice'));
			var tr=parseFloat(this.totalRate.getValue());
			var sr=parseFloat(selRoomRecord.data.rmPrctPrice);
			this.totalRate.setValue(tr+sr);
		}
		this.checkinBtn.enable();
		this.cancelBtn.enable();
	}
	,deleteSelectedGridRaw:function(){		//移除已选择房间
		console.log('deleteSelectedGridRaw');
		var record=this.getGridSelectRecord();
		if(!record||!record.id||!record.get('rmId')){
			return;
		}else{
			this.roomsGrid.store.remove(record);
		}
		var tr=parseFloat(this.totalRate.getValue());
		var sr=parseFloat(record.data.rmSetPrctPrice);
		this.totalRate.setValue(tr-sr);
		if(this.roomsGrid.store.getCount()<1){
			this.cancelBtn.disable();
			this.checkinBtn.disable();
		}
		
	}
	,getGridSelectRecord:function(){
		var sm=this.roomsGrid.getSelectionModel();
		var record;
		try{
			record=sm.getSelected();
		}
		catch(e){
			try{
				record=sm.selection.record();
			}
			catch(ex){}
		}
		return record;
	}
	,onActionFailed:function(form,action){
		console.log('actionfailed',action);
	}
	,onCheckinBtnClick:function(){	//登记入住
		var rds=[];
		for(var i=0;i<this.roomsGrid.store.getCount();i++){
			rds.push(this.roomsGrid.store.getAt(i).data);
		}
		var rdsjson=Ext.util.JSON.encode(rds);
		console.log(rdsjson);
		this.getForm().submit({
			url:'checkin.htm?action=checkin'
			,params:{roomDataes:rdsjson}
			,method:'POST'
			,success:function(){
			}
			,failure:function(){
			}
		})
	}
	,onGridDblClick:function(){
		this.deleteSelectedGridRaw();
	}
	,onRowContextMenu:function(grid,rowIndex,e){
			e.stopEvent();
			this.roomsGrid.getSelectionModel().selectRow(rowIndex);
			var coords=e.getXY();
			this.roomsgGridMenu.showAt([coords[0],coords[1]]);
	}
	,onRoomCancelClick:function(){
		this.deleteSelectedGridRaw();
	}
});
Ext.reg('checkinform',Neo.frontdesk.CheckInForm)
