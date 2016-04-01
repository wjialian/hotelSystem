Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.ReservInfo = Ext.extend(Ext.FormPanel,{
	autoScroll:true
	,frame:true
	,buttonAlign:'right'
	,infoState:'init'
	,itemsChanged:false
	,reservOrderId:''	//保存record里的预定单PKID
	,roCreateTime:''	//保存record里的预定单创建时间
	,tools:[
				{
					id:'print'
					,handler: function(event, toolEl, panel){
						// refresh logic
					}
					,qtip:'打印'
				}
				/*,{
					id:'gear' //调整
					,handler: function(event, toolEl, panel){
					// refresh logic
					}
				}*/
	]
	,initComponent: function(){
		Ext.apply (this,{
			buttons:[
				{
					text:'入住'
					,iconCls:'icon-checkin'
					,id:'reservInBtn'
					,disabled:true
				}
				,{
					text:'预定'
					,iconCls:'icon-save'
					,id:'saveReservBtn'
					,disabled:true
				}
				,{
					text:'重置'
					,iconCls:'icon-redo'
					,id:'resetBtn'
					,disabled:true
				}
				,{
					text:'修改'
					,iconCls:'icon-edit'
					,id:'alertReservBtn'
					,disabled:true
				}
			]
			,items:[
				{
					layout:'column'
					,labelWidth: 55
					,items:[
						{
							columnWidth:.65
							,border:false
							,items:[
								{
									layout:'column'
									,items:[
										{
											columnWidth:.33
										  	,border:false
										  	,layout:'form'
										  	,items:[
										  		{
													xtype:'combo'
													,fieldLabel: '预定方式'
													,name: 'roReservModel'
													,id:'roReservModel'
													,anchor:'95%' 	//nessasary
													,allowBlank: false
													,displayField:'roReservModel'
													,mode:'local'
													,editable:false
													,triggerAction: 'all'
													,value:'电话预定'
													,store:new Ext.data.SimpleStore({
														fields:['roReservModel']
														,data:[
															['电话预定'],['总台面约'],['网上预定']
															,['领导安排'],['其他']
														]
													})
												}
												,{
													xtype:'timefield'
													,id:'roEarliestTime'
													,fieldLabel: '最早到店'
													,name: 'roEarliestTime'
													,format:'H:i:s'
													,anchor:'95%'
												}
												,{
													xtype:'textfield'
													,fieldLabel:'姓名'
													,name:'roGuestName'
													,id:'roGuestName'
													,anchor:'95%'
													,emptyText:'此项为必填项'
													,allowBlank: false
												}
												,{
													fieldLabel:'证件号'
													,xtype:'textfield'
													,name:'roGuestCardId'
													,vtype:'chinaCardId'
													,anchor:'95%' //nessasary
												}
												,{
										  			xtype:'textfield'
													,fieldLabel:'传真'
													,name:'roFax'
													,anchor:'95%'
										  		}
												,{
										  			xtype:'textfield'
													,fieldLabel:'预定金'
													,name:'roPaidMoney'
													,value:'0'
													,anchor:'95%'
										  		}
										 	]
										}
										,{
											columnWidth:.33
										  	,border:false
										  	,layout:'form'
										  	,items:[
										  		{
													xtype:'datefield'
													,id:'roInDate'
													,fieldLabel: '预到日期'
													,format:'Y-m-d'
													,name: 'roInDate'
													,value:new Date().format('Y-m-d')
													,anchor:'95%' 	//nessasary
													,allowBlank: false
												}
												,{
													xtype:'timefield'
													,id:'roLatestTime'
													,fieldLabel: '最晚到店'
													,name: 'roLatestTime'
													,format:'H:i:s'
													,anchor:'95%'
												}
												,{
													fieldLabel:'性别'
													,xtype:'combo'
													,name:'roGuestGender'
													,id:'roGuestGender'	            
													,allowBlank:false
													,anchor:'95%' //nessasary
													,displayField:'guestGender'
													,mode:'local'
													,editable:false
													,triggerAction: 'all'
													,value:'男'
													,store:new Ext.data.SimpleStore({
														fields:['guestGender']
														,data:[
															['男'],['女']
														]
													})
												}
												,{
													xtype:'textfield'
													,fieldLabel:'联系电话'
													,id:'roTelphone'
													,name:'roTelphone'
													,anchor:'95%'
													,emptyText:'此项为必填项'
													,allowBlank: false
												}
												,{
													fieldLabel:'总费用'
													,xtype:'textfield'
													,name:'roTotalRate'
													,id:'roTotalRate'
													,vtype:'money'
													,value:'0'
													,allowBlank:false
													,anchor:'95%' //nessasary
													,maxLength:'12'
													,maxLengthText:'数值超出正常值,请检查后重新输入'
												}
												,{
													fieldLabel:'预定单号'
													,xtype:'textfield'
													,name:'roOrderId'
													,id:'roOrderId'
													,emptyText:'预定后产生'
													,disabled:true
													,allowBlank:false
													,readOnly:true
													,anchor:'95%'
												}
										  	]
										}
										,{
											columnWidth:.33
										  	,border:false
										  	,layout:'form'
										  	,items:[
										  		{
													xtype:'datefield'
													,id:'roOutDate'
													,format:'Y-m-d'
													,fieldLabel: '预离时间'
													,value:new Date().add(Date.DAY,1).format('Y-m-d')
													,name: 'roOutDate'
													,anchor:'95%' 
													,allowBlank: false
												}
												,{
													xtype:'combo'
													,fieldLabel: '预定状态'
													,name: 'roReservState'
													,id:'roReservState'
													,anchor:'95%' 	//nessasary
													,allowBlank: false
													,displayField:'roReservState'
													,mode:'local'
													,editable:false
													,triggerAction: 'all'
													,value:'预定中'
													,store:new Ext.data.SimpleStore({
														fields:['roReservState']
														,data:[
															['预定中'],['已确认'],['已光临']
															,['已失效']
														]
													})
												}
												,{
													fieldLabel: '证件类型'
									                ,xtype:'combo'
									                ,name: 'roGuestCardCatalog'
									                ,id:'roGuestCardCatalog'
									                ,anchor:'95%'
									                ,displayField:'roGuestCardCatalog'
													,mode:'local'
													,triggerAction: 'all' //需加
													,editable:false
													,value:'身份证'
													,store:new Ext.data.SimpleStore({
														fields:['roGuestCardCatalog']
														,data:[
															['身份证'],['学生证'],['军官证']
															,['警官证'],['士兵证'],['驾照']
															,['护照'],['户口薄'],['其他']
														]
													})
												}
												,{
													xtype:'textfield'
													,fieldLabel:'Email'
													,name:'roEmail'
													,anchor:'95%'
													,vtype:'email'
												}
												,{
													xtype:'combo'
													,fieldLabel: '预付方式'
													,name: 'roPaymentModel'
													,id:'roPaymentModel'
													,anchor:'95%' 	//nessasary
													,allowBlank: false
													,displayField:'roPaymentModel'
													,mode:'local'
													,editable:false
													,triggerAction: 'all'
													,value:'现金'
													,store:new Ext.data.SimpleStore({
														fields:['roPaymentModel']
														,data:[
															['现金'],['支付卡'],['支票']
															,['其他']
														]
													})
												}
												,{
													fieldLabel:'营业员'
													,xtype:'textfield'
													,name:'roOperator'
													,id:'roOperator'
													,value:'Admin'//待读取
													,allowBlank:false
													,readOnly:true
													,disabled:true
													,anchor:'95%'
												},{
													fieldLabel:'登记单PKID'
													,xtype:'textfield'
													,name:'roId'
													,id:'roId'
													,hidden:true
													,hideLabel:true
													,anchor:'95%'
												}
										  	]
										}
									]
								}
								,{
									layout:'column'
									,items:[
										{
											columnWidth:1
										  	,border:false
										  	,layout:'form'
										  	,items:[
										  		{
										  			xtype:'textfield'
													,fieldLabel:'备注'
													//,grow:true
													,name:'roRemark'
													//,width:200
													,anchor:'97%'//'97% 75%'
										  		}
										  	]
										}
									]
								}
							]
							
						}
						,{
							columnWidth:.35
							,border:false
							//,layout:'form'
							,items:[
								{
									id:'reservItemGrid'
									,title:'所定房间'
									,xtype:'grid'
									,anchor:'100%'
									,frame:true
									,height:180
									//,autoHeight:true
									,scrollOffset:5
									,store:new Ext.data.JsonStore({
										url:'reserv.htm?action=findReservRooms'
										,totalProperty:'totalCount'
										,root:'rooms'
										,baseParams:{start:0, limit:10}
										,fields:[
											'rmId'
											,'rmCatalog'
											,'rmArea'
											,'rmFloor'
											,{name:'rmPrctPrice',type:'float'}
											,{name:'rmPrctDiscount',type:'float'}
										]
									})
									,columns:[
										{id:'rooms',header:'房间',width:50,sortable:true,dataIndex:'rmId'}
										,{header:'类型',width:50,sortable:true,dataIndex:'rmCatalog'}
										,{header:'预设单价',width:70,sortable:true,dataIndex:'rmPrctPrice'}
										,{header:'预设折扣',width:70,sortable:true,dataIndex:'rmPrctDiscount'}
									]
								}
							]
						}
					]
				}
			]
		});
		Neo.frontdesk.ReservInfo.superclass.initComponent.apply(this,arguments);
		this.reservItemGrid=Ext.getCmp('reservItemGrid');
		this.reservItemGrid.on({'dblclick':this.onGridDblClick
			,scope:this});
		this.reservItemGrid.on({'rowcontextmenu':this.onRowContextMenu
	    			,scope:this});
	    this.reservItemGridMenu=new Ext.menu.Menu({
	    	id:'roomsGridMenu'
	    	,items:[
	    		{
	    			text:'取消'
	    			,id:'cancelRoomBtn'
	    		}
	    	]
	    });
	    this.checkinForm=Ext.getCmp('checkinForm');
	    this.cancelRoomBtn=Ext.getCmp('cancelRoomBtn');		
	    this.cancelRoomBtn.on({'click':this.onRoomCancelClick
	    	,scope:this});
		this.reservInBtn=Ext.getCmp('reservInBtn');
		this.reservInBtn.on({'click':this.onReservInBtnClick
			,scope:this});	
		this.saveReservBtn=Ext.getCmp('saveReservBtn');
		this.resetBtn=Ext.getCmp('resetBtn');
	    this.resetBtn.on({'click':this.onResetBtnClick
	    	,scope:this});
		this.alertReservBtn=Ext.getCmp('alertReservBtn');
		this.alertReservBtn.on({'click':this.onAlertReservBtnClick
			,scope:this});
		this.saveReservBtn.on({'click':this.onSaveReservBtnClick
			,scope:this});
		this.roTelphone=Ext.getCmp('roTelphone');
		this.roGuestName=Ext.getCmp('roGuestName');
		this.roOrderId=Ext.getCmp('roOrderId');
		this.roOperator=Ext.getCmp('roOperator');
		this.addEvents({'updateItem':true});
		this.addEvents({'reservIn':true});
	}
	,onRender:function(){
			Neo.frontdesk.ReservInfo.superclass.onRender.apply(this,arguments);
	}
	//,afterRender:function(){};
	,addReservItem:function(selRecord){
		var data=selRecord.data;
		if(this.reservItemGrid.store.indexOf(selRecord)<0){
			this.reservItemGrid.store.add(selRecord);
			
			Ext.ux.Toast.msg('提示','已选择房间{0}',selRecord.get('rmId'));
		}else{
			//Ext.Msg.alert('提示：','该房间已在登记中！');
			Ext.ux.Toast.msg('提示','该房间已在预定中!');
		}
		this.saveReservBtn.enable();
		this.resetBtn.enable();
	}
	,afterChangeDeal:function(field,newValue,oldValue){
		this.itemsChanged=true;
		this.saveReservBtn.enable();
	}
	//移除已选择房间
	,deleteSelectedGridRaw:function(){		
		var record=this.getGridSelectRecord();
		if(!record||!record.id||!record.get('rmId')){
			return;
		}else{
			this.reservItemGrid.store.remove(record);
		}
		if(this.reservItemGrid.store.getCount()<1){
			this.saveReservBtn.disable();
			this.resetBtn.disable();
		}
		
	}
	,getGridSelectRecord:function(){
		var sm=this.reservItemGrid.getSelectionModel();
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
	//监听所有子项的change事件以判断信息有无修改
	,listenFormItemsChange:function(condition){
		this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0)
			.items.each(function(item){
			if(condition){
				item.on({'change':this.afterChangeDeal
					,scope:this});
					
			}else{
				item.un({'change':this.afterChangeDeal
					,scope:this});
			}
		},this);
		this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1)
			.items.each(function(item){
			if(condition){	
				item.on({'change':this.afterChangeDeal
					,scope:this});
			}else{
				item.un({'change':this.afterChangeDeal
					,scope:this});
			}
		},this);
		this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2)
			.items.each(function(item){
			if(condition){
				item.on({'change':this.afterChangeDeal
					,scope:this});
			}else{
				item.un({'change':this.afterChangeDeal
					,scope:this});
			}
		},this);
		this.items.itemAt(0).items.itemAt(0).items.itemAt(1)	//备注栏
			.items.itemAt(0).items.each(function(item){
			if(condition){
				item.on({'change':this.afterChangeDeal
					,scope:this});
			}else{
				item.un({'change':this.afterChangeDeal
					,scope:this});
			}
		},this);
		if(condition){
			this.reservItemGrid.store.on({'add':this.afterChangeDeal
				,scope:this});
			this.reservItemGrid.store.on({'remove':this.afterChangeDeal
				,scope:this});	
		}else{
			this.reservItemGrid.store.un({'add':this.afterChangeDeal
				,scope:this});
			this.reservItemGrid.store.un({'remove':this.afterChangeDeal
				,scope:this});	
		}
	}
	,loadReservInfo:function(record){
		this.getForm().loadRecord(record);
		this.reservOrderId=record.get("roId");
		this.roCreateTime=record.get("roCreateTime");
		this.reservItemGrid.store.load({params:{roId:this.reservOrderId}});
	}
	//修改
	,onAlertReservBtnClick:function(){
		this.infoState='alertReserv';
		this.saveReservBtn.setText('保存');
		
		this.alertReservBtn.enable();
		this.saveReservBtn.disable();
		this.resetBtn.enable();
		this.reservInBtn.enable();
		
		this.setFormItemsDisable(false);
		this.itemsChanged=false;
		this.listenFormItemsChange(true);
	}
	,onGridDblClick:function(){
		this.deleteSelectedGridRaw();
	}
	//重置
	,onResetBtnClick:function(){
		this.reservItemGrid.store.removeAll();
		var formRecord = Ext.data.Record.create([
		    	'roGuestName'		//客人姓名
				,'roGuestGender'  //客人性别
				,'roGuestCardCatalog'	//证件类型
				,'roGuestCardId'		//证件号
				,'roReservModel'	//预定方式
				,{name:'roPaidMoney',type:'float'}	//预付金
				,'roPaymentModel'	//支付方式
				,'roReservState'	//预定状态
				,'roInDateTime'		//预住时间
				,'roPreOutDateTime'		//预离时间
				,'roEarliestTime'	//最早到店
				,'roLatestTime'		//最晚到店
				,'roOperator'		//操作员
				,'roOrderId'		//单号
				,'roId'			//主键
				,'roRemark'		//备注
				,'roEmail'		//Email
				,'roFax'		//传真
				,'roTelphone'	//电话
				,'roTotalRate'	//总费用
		]);

		var resetRecord = new formRecord({
		    roGuestName: ''
		    ,roGuestGender:'男'
		    ,roGuestCardCatalog:'身份证'
		    ,roGuestCardId:''
		    ,roReservModel:'电话预定'
		    ,roPaidMoney:'0'
		    ,roPaymentModel:'现金'
		    ,roReservState:'预定中'
		    ,roInDateTime:new Date().format('Y-m-d')
		    ,roPreOutDateTime:new Date().add(Date.DAY,1).format('Y-m-d')
		    ,roEarliestTime:''
		    ,roLatestTime:''
		    ,roRemark:''
		    ,roEmail:''
		    ,roFax:''
		    ,roTelphone:''
		    ,roTotalRate:'0'
		    ,roOperator:'Admin'
		    ,roOrderId:'预定后生成'
		});
		this.roOrderId.disable();
		this.roOperator.disable();
		this.getForm().loadRecord(resetRecord);
		this.roGuestName.clearInvalid();
		this.roTelphone.clearInvalid();
		this.saveReservBtn.setText('预定');
		this.reservInBtn.disable();
		this.saveReservBtn.disable();
		this.resetBtn.disable();
		this.alertReservBtn.disable();
		this.setFormItemsDisable(false);
		this.infoState='init';
	}
	//预定入住
	,onReservInBtnClick:function(){
		this.checkinForm.reservInLoad(this.reservOrderId);
		//this.fireEvent('reservIn',this.reservOrderId);
	}
	,onRowContextMenu:function(grid,rowIndex,e){
		e.stopEvent();
		this.reservItemGrid.getSelectionModel().selectRow(rowIndex);
		var coords=e.getXY();
		this.reservItemGridMenu.showAt([coords[0],coords[1]]);
	}
	,onRoomCancelClick:function(){
		this.deleteSelectedGridRaw();
	}
	//新增修改预定
	,onSaveReservBtnClick:function(){
		//this.infoState='alertReserv';
		//this.itemsChanged=false;
		var rds=[];
		for(var i=0;i<this.reservItemGrid.store.getCount();i++){
			rds.push(this.reservItemGrid.store.getAt(i).data);
		}
		var rdsjson=Ext.util.JSON.encode(rds);
		//新增预定
		if(this.infoState=='init'){
			this.getForm().submit({
				url:'reserv.htm?action=createReserv'
				,params:{roomDataes:rdsjson}
				,method:'POST'
				,scope:this
				,success:function(){
					Ext.Msg.alert('提示', '预定信息添加成功'
							,this.updateAvailItem.createDelegate(this,[],true)
					)
				}
				,failure:function(form,action){
					if(action.failureType == 'server'){ 
	               		obj = Ext.util.JSON.decode(action.response.responseText); 
	                	Ext.Msg.alert('错误:', obj.errors.reason); 
	                }
	                if(action.failureType == 'client'){
	                	Ext.ux.Toast.msg('提示','预定信息不正确，请核对后重新操作');
	                }
	                /*else{ 
	                    Ext.Msg.alert('警告!', '无法连接到服务器: ' + action.response.responseText ); 
	                }*/
				}
			});
		}
		//修改预定
		if(this.infoState=='alertReserv'&&this.itemsChanged){
			this.getForm().submit({
				url:'reserv.htm?action=updateReserv'
				,params:{roomDataes:rdsjson,roId:this.reservOrderId,roCreateTime:this.roCreateTime}
				,method:'POST'
				,scope:this
				,success:function(){
					Ext.Msg.alert('提示', '预定信息修改成功'
							,this.updateAvailItem.createDelegate(this,[],true)
					)
				}
				,failure:function(form,action){
					if(action.failureType == 'server'){ 
	               		obj = Ext.util.JSON.decode(action.response.responseText); 
	                	Ext.Msg.alert('错误:', obj.errors.reason); 
	                }
	                if(action.failureType == 'client'){
	                	Ext.ux.Toast.msg('提示','预定信息不正确，请核对后重新操作');
	                }
	                /*else{ 
	                    Ext.Msg.alert('警告!', '无法连接到服务器: ' + action.response.responseText ); 
	                }*/
				}
			});	
		}
	}
	//设置Form里的所有子项的不可用与可用 true不可用
	,setFormItemsDisable:function(condition){
		this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0)
			.items.each(function(item){
			if(condition){
				item.disable();
			}else{
				item.enable();
			}
		});
		this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1)
			.items.each(function(item){
			if(condition){
				item.disable();
			}else{
				if(item.fieldLabel=='预定单号' || item.fieldLabel=='营业员'){
					item.disable();
				}else{
					item.enable();
				}
			}
		});
		this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2)
			.items.each(function(item){
			if(condition){
				item.disable();
			}else{
				if(item.fieldLabel=='预定单号' || item.fieldLabel=='营业员'){
					item.disable();
				}else{
					item.enable();
				}
			}
		});
		this.items.itemAt(0).items.itemAt(0).items.itemAt(1)	//备注栏
			.items.itemAt(0).items.each(function(item){
			if(condition){
				item.disable();
			}else{
				item.enable();
			}
		});
		if(condition){
			this.reservItemGrid.disable();
		}else{
			this.reservItemGrid.enable();
		}
	}
	,updateAvailItem:function(){
		//操作成功后更新
		//this.onResetBtnClick();
		this.infoState='finishedReserv';
		//this.getForm().disable();
		//this.setDisabled(true);
		this.setFormItemsDisable(true);
		this.alertReservBtn.enable();
		this.saveReservBtn.disable();
		this.resetBtn.enable();
		this.reservInBtn.enable();
		this.fireEvent('updateItem');
	}
});
Ext.reg('reservinfo',Neo.frontdesk.ReservInfo);