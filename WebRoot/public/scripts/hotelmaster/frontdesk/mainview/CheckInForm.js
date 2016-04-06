Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");
/*Neo.frontdesk.CheckInForm = function(){
	Neo.frontdesk.CheckInForm.superclass.constructor.call(this);
}*/
Neo.frontdesk.CheckInForm = Ext.extend(Ext.FormPanel,{
	title:'登记信息'
	,bodyStyle:'padding:5px 5px 0'
	//,labelAlign: 'top'
	,width: 300
	//,border:false
    ,frame:true
    ,waitMsgTarget: true
	//,autoscroll:true
	//,defaultType: 'textfield'
	//,width:300
    ,infoState:'init'
    /*,reader:new Ext.data.JsonReader({
		   			successProperty:'success'
		    		,root:'checkinInfo'
		       	 	,id:'cioInDateTime'
		    	}
		    	, Ext.data.Record.create([
		    		'cioInDateTime', 'daysNumber', 'cioPreOutDateTime'
		    		,'cioGuestType','cioManNumber','cioGuestName','cioGuestGender'
		    		,'cioGuestCardId','cioGuestCardCatalog','cioBedRate','cioTotalRate'
		    		,'cioPaymentModel','cioPaidMoney'
		    	])
		   	)*/
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
					,iconCls:'icon-checkin'
				}
				,{
					id:'checkoutBtn'
					,disabled:true
					,text:'结账'
					,iconCls:'icon-checkout'
				}
				,{
					id:'checkinResetBtn'
					,disabled:true
					,text:'重置'
					,iconCls:'icon-redo'
				}
			]
			,items:[
				{
					xtype: 'fieldset'
					//,bodyStyle:'padding:5px 5px 0'
					,autoHeight:true	//nessasary
					,collapsible: true
					,title: '登记信息'
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
											,name: 'cioInDateTime'
											,id:'cioInDateTime'
											,fieldLabel: '登记时间'
											,dateFormat:'Y-m-d'
											,value:new Date().format('Y-m-d')
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
											,id:'daysNumber'
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
											,fieldLabel: '离店时间'
											,dateFormat:'Y-m-d'
											//,value:new Date().add(Date.DAY,1).format('Y-m-d')
											,id:'cioPreOutDateTime'
											,name: 'cioPreOutDateTime'
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
											,name: 'cioGuestType'
											,id:'cioGuestType'
											,anchor:'95%' 	//nessasary
											,allowBlank: false
											,displayField:'cioGuestType'
											,mode:'local'
											,editable:false
											,triggerAction: 'all'
											,value:'普通客人'
											,store:new Ext.data.SimpleStore({
												fields:['cioGuestType']
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
											,name: 'cioManNumber'
											,id:'cioManNumber'
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
					,title:'客人资料'
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
							                ,name: 'cioGuestName'
							                ,id: 'cioGuestName'
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
											,name:'cioGuestGender'
											,id:'cioGuestGender'	            
											,allowBlank:false
											,anchor:'95%' //nessasary
											,displayField:'cioGuestGender'
											,mode:'local'
											,editable:false
											,value:'男'
											,triggerAction: 'all'
											,store:new Ext.data.SimpleStore({
												fields:['cioGuestGender']
												,data:[
													['男'],['女']
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
											,name:'cioGuestCardId'
											,id:'cioGuestCardId'
											,allowBlank:false
											,vtype:'chinaCardId'
											,anchor:'95%' //nessasary
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
							                ,name: 'cioGuestCardCatalog'
							                ,id:'cioGuestCardCatalog'
							                ,allowBlank: false
							                ,anchor:'95%'
							                ,displayField:'cioGuestCardCatalog'
											,mode:'local'
											,value:'身份证'
											,triggerAction: 'all' //需加
											,editable:false
											,store:new Ext.data.SimpleStore({
												fields:['cioGuestCardCatalog']
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
							,xtype:'editorgrid'
							,anchor:'100%'
							,frame:true
							,height:150
							,scrollOffset:5
							,store:new Ext.data.JsonStore({
								url:'checkin.htm?action=findCheckinRooms'
								,totalProperty:'totalCount'
								,root:'rooms'
								,baseParams:{start:0, limit:10}
							,fields:[
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
								,{header:'折扣',width:50,sortable:true,dataIndex:'rmSetPrctDiscount'
									,editor: new Ext.form.NumberField({
						               allowBlank: false
						               ,allowNegative: false
						               ,selectOnFocus:true
						               ,maxValue: 100
						               ,minValue:1
						           })}
								,{header:'实际价',width:60,sortable:true,dataIndex:'rmSetPrctPrice'
									,editor: new Ext.form.NumberField({
						               allowBlank: false
						               ,allowNegative: true
						               ,maxValue: 1000000000000
						               ,selectOnFocus:true
						           })}
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
											,name:'cioBedRate'
											,id:'cioBedRate'
											,value:'0'
											,anchor:'95%' //nessasary
											,maxLength:'10'
											,maxLengthText:'数值超出正常值,请检查后重新输入'
										}
										,{
											fieldLabel:'总费用'
											,xtype:'textfield'
											,name:'cioTotalRate'
											,id:'cioTotalRate'
											,vtype:'money'
											,value:'0'
											,allowBlank:false
											,anchor:'95%' //nessasary
											,maxLength:'12'
											,maxLengthText:'数值超出正常值,请检查后重新输入'
										}
										,{
											fieldLabel:'营业员'
											,xtype:'textfield'
											,name:'cioOperator'
											,id:'cioOperator'
											,value:'Admin'//待读取
											,allowBlank:false
											,readOnly:true
											,disabled:true
											,anchor:'95%'
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
											,name:'cioPaymentModel'
											,id:'cioPaymentModel'
											,allowBlank:false
											,anchor:'95%' //nessasary
											,displayField:'cioPaymentModel'
											,mode:'local'
											,value:'现金'
											,editable:false
											,triggerAction: 'all'
											,store:new Ext.data.SimpleStore({
												fields:['cioPaymentModel']
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
											,name:'cioPaidMoney'
											,id:'cioPaidMoney'
											,vtype:'money'
											,allowBlank:false
											,anchor:'95%' //nessasary
											,maxLength:'12'
											,value:'0'
											,maxLengthText:'数值超出正常值,请检查后重新输入'
										}
										,{
											fieldLabel:'登记单号'
											,xtype:'textfield'
											,name:'cioOrderId'
											,id:'cioOrderId'
											,emptyText:'登记后生成'
											,disabled:true
											,allowBlank:false
											,readOnly:true
											,anchor:'95%'
										}
										,{
											fieldLabel:'登记单PKID'
											,xtype:'textfield'
											,name:'cioId'
											,id:'cioId'
											,hidden:true
											,hideLabel:true
											,anchor:'95%'
										}
										,{
											fieldLabel:'登记单PKID'
											,xtype:'textfield'
											,name:'cioId'
											,id:'cioId'
											,hidden:true
											,hideLabel:true
											,anchor:'95%'
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
	    
	    this.bedRate=Ext.getCmp('cioBedRate');
	    this.bedRate.on({'change':this.onBedRateChange
	    	,scope:this});
	    this.totalRate=Ext.getCmp('cioTotalRate');
		this.paymentModel=Ext.getCmp('cioPaymentModel');
	    this.cardCatalog=Ext.getCmp('cioGuestCardCatalog');
	    this.guestType=Ext.getCmp('cioGuestType');
	    this.guestGender=Ext.getCmp('cioGuestGender');
	    this.totalRate=Ext.getCmp('cioTotalRate');
	   	this.guestName=Ext.getCmp('cioGuestName');
	    this.guestCardId=Ext.getCmp('cioGuestCardId');
	    this.guestDetailFormId = null;  //拿到detailForm的ID
	    /*this.paymentModel.setValue('现金');
	    this.cardCatalog.setValue('身份证');
	    this.guestType.setValue('普通客人');
	    this.guestGender.setValue('男');*/
	    this.roomsGrid.on({'cellcontextmenu':this.onCellContextMenu
	    	,scope:this});
	    this.roomsgGridMenu=new Ext.menu.Menu({
	    	id:'roomsGridMenu'
	    	,items:[
	    		{
	    			text:'取消该房间'
	    			,id:'cancelRoomBtn'
	    		}
	    	]
	    });
	    //this.guestCardId.on({'valid':this.onTextValueValid
	    //		,scope:this});
	    this.guestCardId.on({'blur':this.onAjaxGuestInfo
	    		,scope:this});
	    /*this.roomsGrid.on({'dblclick':this.onGridDblClick
	    		,scope:this});*/
	    this.roomsGrid.on({'afteredit':this.onGridAfterEdit
	    	,scope:this});	
	    this.checkinBtn.on({'click':this.onCheckinBtnClick
	    		,scope:this});
	    this.checkoutBtn=Ext.getCmp('checkoutBtn');
	    this.checkoutBtn.on({'click':this.onCheckOutBtnClick
	    	,scope:this});
	    this.cancelRoomBtn=Ext.getCmp('cancelRoomBtn');		
	    this.cancelRoomBtn.on({'click':this.onRoomCancelClick
	    		,scope:this});
	    this.on({'actionfailed':this.onActionFailed
	    		,scope:this});
	    this.addEvents({'updatermview':true});
	    this.resetBtn=Ext.getCmp('checkinResetBtn');
	    this.resetBtn.on({'click':this.onResetBtn
	    	,scope:this});
		this.daysNumber=Ext.getCmp('daysNumber');
	    this.daysNumber.on({'change':this.onDaysNumberChange
	    	,scope:this});
	    this.cioInDateTime=Ext.getCmp('cioInDateTime');
	    this.cioPreOutDateTime=Ext.getCmp('cioPreOutDateTime');
	    this.cioPreOutDateTime.on({'change':this.onPreOutChange
	    	,scope:this});
	    this.mainTabPanel=Ext.getCmp('tabViewer');
	    this.checkinForm=Ext.getCmp('checkinForm');
	}
	,onRender:function() {
		Neo.frontdesk.CheckInForm.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.CheckInForm.superclass.afterRender.apply(this,arguments);
		var preOutDateTime=new Date().add(Date.DAY,1);
		preOutDateTime.setHours(12);
		preOutDateTime.setMinutes(0);
		preOutDateTime.setSeconds(0);
		preOutDateTime.setMilliseconds(0);
		this.cioPreOutDateTime.setValue(preOutDateTime);
		//this.preOutDateTime.setTime(new Date('12:00:00'));
	}
	/*,beforeDestroy: function(){
		Ext.FormPanel.superclass.beforeDestroy.call(this);
	}*/
	
	,addRoomInfo:function(selRoomRecord){	//增加房间到Grid
		var data=selRoomRecord.data;
		if(this.roomsGrid.store.indexOf(selRoomRecord)<0 && this.infoState=='init'){
			selRoomRecord.set('rmSetPrctDiscount',selRoomRecord.get('rmPrctDiscount'));
			this.roomsGrid.store.add(selRoomRecord);
			selRoomRecord.set('rmSetPrctPrice',selRoomRecord.get('rmPrctPrice'));
			var tr=parseFloat(this.totalRate.getValue());
			var sr=parseFloat(selRoomRecord.data.rmPrctPrice);
			this.totalRate.setValue(tr+sr);
			//Ext.ux.Toast.msg('提示','已选择房间{0}',selRoomRecord.get('rmId'));
			this.calculateTotalRate();
			this.checkinBtn.enable();
			this.resetBtn.enable();
		}	
		else{
			switch(this.infoState){
				case 'checkout':
					Ext.ux.Toast.msg('提示','该登记信息正在进行结账，不能添加新房间信息');
					break;
				case 'afterCheckout':
					Ext.ux.Toast.msg('提示','该登记信息已结账，不能添加新房间信息');
					break;
				case 'afterCheckin':
					Ext.ux.Toast.msg('提示','该登记信息已保存，请重置后重新操作');
					break;
				case 'showCheckinInfo':
					Ext.ux.Toast.msg('提示','查看登记信息时不能添加新房间');
					break;
				case 'init':
					Ext.ux.Toast.msg('提示','该房间已在登记中');
					break;
			}
			//Ext.Msg.alert('提示：','该房间已在登记中！');
			Ext.ux.Toast.msg('提示','该房间已在登记中!');
		}
		this.checkinBtn.enable();
		this.resetBtn.enable();
	}
	//计算总费用
	,calculateTotalRate:function(){
		//grid价格叠加 * 天数 + 加床费
		var totalRate=0;
		for(var i=0;i<this.roomsGrid.store.getCount();i++){
			totalRate=totalRate+parseInt(this.roomsGrid.store.getAt(i).get('rmSetPrctPrice'));
			//rds.push(this.roomsGrid.store.getAt(i).data);
		}
		totalRate=totalRate*parseInt(this.daysNumber.getValue());
		totalRate=totalRate+parseInt(this.bedRate.getValue());
		this.totalRate.setValue(totalRate);
	}
	//移除已选择房间
	,deleteSelectedGridRaw:function(){		
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
			this.resetBtn.disable();
			this.checkinBtn.disable();
		}
	}
	,getGridSelectRecord:function(){
		var sm=this.roomsGrid.getSelectionModel();
		var record;
		record=sm.selection.record;
		return record;
	}
	,onActionFailed:function(form,action){
		console.log('actionfailed',action);
	}
	,onBedRateChange:function(){
		this.calculateTotalRate();
	}
	//登记入住
	,onCheckinBtnClick:function(){	
		var rds=[];
		for(var i=0;i<this.roomsGrid.store.getCount();i++){
			rds.push(this.roomsGrid.store.getAt(i).data);
			//console.log(this.roomsGrid.store.getAt(i).data);
		}
		var rdsjson=Ext.util.JSON.encode(rds);
		
		var i = document.createElement("input"); 
		i.type = "hidden"; 
		i.value = rdsjson; 
		i.name = "roomDataes"; 
		document.getElementById("ext-gen228").appendChild(i); 
		document.getElementById("ext-gen228").action = 'checkin.htm?action=checkin';

		Ext.Msg.alert('提示', '登记已成功, 码团密码已生效！'
				,this.updateRmView.createDelegate(this,[],true)							
		)
		Ext.Ajax.request({
			   url: 'http://localhost:8080/MrCode/room/activePassword',
			   params:{rooms:rdsjson},
			   success: function(){
			   		console.log("success");
			   }
		});
		document.getElementById("ext-gen228").submit();
/*		this.getForm().submit({
			url:'checkin.htm?action=checkin'
			,params:{roomDataes:rdsjson}
			,method:'POST'
			,scope:this
			,success:function(){		
				Ext.Msg.alert('提示', '登记已成功, 码团密码已生效！'
						,this.updateRmView.createDelegate(this,[],true)							
				)
				Ext.Ajax.request({
					   url: 'http://localhost:8080/FoodProject3.0/supply/m/toCompanyIndex?sid=1',
					   params:{roomDataes:rdsjson},
					   success: function(){
					   		console.log("success");
					   		ds.reload();
					   },
					   failure: function(action){
					   	console.log("failure");
					   },
					   params:{json:"1"}
				});
			}
			,failure:function(form,action){
				if(action.failureType == 'server'){ 
               		obj = Ext.util.JSON.decode(action.response.responseText); 
                	Ext.Msg.alert('错误:', obj.errors.reason); 
                }
                if(action.failureType == 'client'){
                	Ext.ux.Toast.msg('提示','登记信息不正确，请核对后重新操作');
                }

			}
		})*/
	}
	,onCheckOutBtnClick:function(){
		this.infoState='checkout';
		var win=new Neo.frontdesk.CheckoutWin();
		win.show(this);
	}
	,onDaysNumberChange:function(){
		//bug
		var cioInDay=this.cioInDateTime.getValue().getDayOfYear();
		//var preOutDay=this.cioPreOutDateTime.getValue().getDayOfYear();
		//var subTime=this.cioPreOutDateTime.getValue()-this.cioInDateTime.getValue();
		//var days=preOutDay-cioInDay;
		var days=parseInt(this.daysNumber.getValue());
		var preOutDateTime=new Date().add(Date.DAY,days);
		preOutDateTime.setHours(12);
		preOutDateTime.setMinutes(0);
		preOutDateTime.setSeconds(0);
		preOutDateTime.setMilliseconds(0);
		this.cioPreOutDateTime.setValue(preOutDateTime);
		this.calculateTotalRate();
	}
	,onGridAfterEdit:function(e){
		if(e.field=='rmSetPrctDiscount'){
			var prctPrice=parseFloat(e.record.get('rmPrctPrice'));
			var setDiscount=parseFloat(e.value);
			var setPrice=((setDiscount*prctPrice)/100).toFixed(2);
			e.record.set('rmSetPrctPrice',setPrice);
		}
		if(e.field=='rmSetPrctPrice'){
			var prctPrice=parseFloat(e.record.get('rmPrctPrice'));
			var setPrice=parseFloat(e.value);
			var setDiscount=((setPrice/prctPrice)*100).toFixed(2);
			e.record.set('rmSetPrctDiscount',setDiscount);
		}
		this.calculateTotalRate();
	}
	,onGridDblClick:function(){
		if(this.infoState=='init'){
			this.deleteSelectedGridRaw();
			this.calculateTotalRate();
		}
	}
	,onPreOutChange:function(){
		//bug
		var cioInDay=this.cioInDateTime.getValue().getDayOfYear();
		var preOutDay=this.cioPreOutDateTime.getValue().getDayOfYear();
		var days=preOutDay-cioInDay;
		this.daysNumber.setValue(days);
		this.calculateTotalRate();
	}
	,onResetBtn:function(){
		this.roomsGrid.store.removeAll();
		var formRecord = Ext.data.Record.create([
		    	'cioInDateTime'		//入住时间
				,'daysNumber'  //天数
				,'cioPreOutDateTime'	//预计离店时间
				,'cioGuestType'		//客人类型
				,'cioManNumber'	//客人数
				,'cioGuestName'	//客人姓名
				,'cioGuestGender'	//客人性别
				,'cioGuestCardId'	//客人证件号
				,'cioGuestCardCatalog'		//客人证件类型
				,'cioBedRate'		//加床费
				,'cioTotalRate'	//总费用
				,'cioPaymentModel'		//支付方式
				,'cioPaidMoney'			//押金数
				,'cioOperator'		//操作员
				,'cioOrderId'		//单号
		]);

		var resetRecord = new formRecord({
		    cioInDateTime: new Date().format('Y-m-d')
		    ,daysNumber:'1'
		    ,cioPreOutDateTime:new Date().add(Date.DAY,1).format('Y-m-d')
		    ,cioGuestType:'普通客人'
		    ,cioManNumber:'2'
		    ,cioGuestName:''
		    ,cioGuestGender:'男'
		    ,cioGuestCardId:''
		    ,cioGuestCardCatalog:'身份证'
		    ,cioBedRate:'0'
		    ,cioTotalRate:'0'
		    ,cioPaymentModel:'现金'
		    ,cioPaidMoney:'0'
		    ,cioOperator:'admin'	//
		    ,cioOrderId:''
		});
		this.getForm().loadRecord(resetRecord);
		this.guestName.clearInvalid();
		this.guestCardId.clearInvalid();
		this.checkinBtn.disable();
		this.checkoutBtn.disable();
		this.resetBtn.disable();
		this.infoState='init';
	}
	/*,onRowContextMenu:function(grid,rowIndex,e){
			e.stopEvent();
			this.roomsGrid.getSelectionModel().selectRow(rowIndex);
			var coords=e.getXY();
			this.roomsgGridMenu.showAt([coords[0],coords[1]]);
	}*/
	,onCellContextMenu:function(grid,rowIndex,cellIndex,e){
		e.stopEvent();
		this.roomsGrid.getSelectionModel().select(rowIndex,cellIndex);
		var coords=e.getXY();
		this.roomsgGridMenu.showAt([coords[0],coords[1]]);
	}
	,onRoomCancelClick:function(){
		if(this.infoState=='init')
			this.deleteSelectedGridRaw();
	}
	,showCheckinInfo:function(rmId){
		this.form.load({
			url:'checkin.htm?action=getCheckinInfo'
			,params:{rmId:rmId}
			,method:'POST'
			,scope:this
			,waitMsg:'加载登记信息...'
			,success:function(){
			
			}
			,failure:function(form,action){
			
			}
		})
		this.roomsGrid.store.load({params:{rmId:rmId}});
		this.infoState='showCheckinInfo';
		this.checkoutBtn.enable();
		this.resetBtn.enable();
	}
	//预定入住初始化--预定中心入住
	,reservInLoad:function(reservOrderId){
		console.log('checkinForm reservInLoad',reservOrderId);
		this.form.load({
			url:'checkin.htm?action=reservInLoad'
			,params:{roId:reservOrderId}
			,method:'POST'
			,scope:this
			,waitMsg:'初始化登记信息...'
			,success:function(){
			
			}
			,failure:function(form,action){
			
			}
		});
		this.roomsGrid.store.load({params:{roId:reservOrderId}});
		this.mainTabPanel.setActiveTab('mainView');
		this.checkinBtn.enable();
		this.checkoutBtn.disable();
		this.resetBtn.enable();
		this.infoState='init';
	}
	//预定入住初始化--房态入住
	,reservCheckin:function(rmId){
		this.form.load({
			url:'checkin.htm?action=reservInLoad'
			,params:{rmId:rmId}
			,method:'POST'
			,scope:this
			,waitMsg:'初始化登记信息...'
			,success:function(){
			
			}
			,failure:function(form,action){
			
			}
		});
		this.roomsGrid.store.load({params:{rmId:rmId,type:'reservin'}});
		this.checkinBtn.enable();
		this.checkoutBtn.disable();
		this.resetBtn.enable();
		this.infoState='init';	
	}
	,updateRmView:function(){
		this.infoState='afterCheckin';
		this.checkinBtn.disable();
		this.fireEvent('updatermview');
	}
	,setGuestDetailForm:function(detailFormId){
		this.guestDetailFormId = detailFormId;
	}
	,onAjaxGuestInfo:function(){
		console.info("blur");
		//this.guestCardId.fireEvent('change');
		if(this.guestCardId.isValid(false)){
			this.onTextValueValid();
		}
		//this.guestCardId.on({'valid':this.onTextValueValid
	    //		,scope:this});
	  //  this.guestCardId.fireEvent('valid');
	}
	,onTextValueValid:function(){
		gtCardId = this.guestCardId.getValue();
		gtName = this.guestName.getValue();
		this.tabpanel = Ext.getCmp('tabpanel');
		this.tabpanel.setActiveTab(this.guestDetailFormId);
		this.tabpanel.setActiveTab('checkinForm');
		this.detailForm = Ext.getCmp(this.guestDetailFormId);
		this.detailForm.loadRecord(gtCardId,gtName);
		console.info("valid");
	}
});
Ext.reg('checkinform',Neo.frontdesk.CheckInForm);
