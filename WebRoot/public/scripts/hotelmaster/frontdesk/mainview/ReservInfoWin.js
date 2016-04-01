Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.ReservInfoWin=Ext.extend(Ext.Window,{
	title:'预定信息'
	,width:560
    ,height:365
    ,layout:'fit'
    //,border:false
    ,draggable:false
    ,modal:true
    ,frame:true
    ,resizable:false
	,initComponent: function(){
		Ext.apply(this,{
			items:[
				{
					xtype:'form'
					,id:'i_reservInfoForm'
					,items:[
						{
							layout:'column'
							,border:false
							,labelWidth: 55
							,anchor:'95%'
							,items:[
								{
									columnWidth:.33
								  	,border:false
								  	,layout:'form'
								  	,items:[
										{
											xtype:'combo'
											,fieldLabel: '预定方式'
											,name: 'i_roReservModel'
											,id:'i_roReservModel'
											,anchor:'95%' 	//nessasary
											,allowBlank: false
											,displayField:'i_roReservModel'
											,mode:'local'
											,editable:false
											,triggerAction: 'all'
											,readOnly:true
											,value:'电话预定'
											,store:new Ext.data.SimpleStore({
												fields:['i_roReservModel']
												,data:[
													['电话预定'],['总台面约'],['网上预定']
													,['领导安排'],['其他']
												]
											})
										}
										,{
											xtype:'timefield'
											,id:'i_roEarliestTime'
											,fieldLabel: '最早到店'
											,name: 'i_roEarliestTime'
											,format:'H:i:s'
											,anchor:'95%'
										}
										,{
											xtype:'textfield'
											,fieldLabel:'姓名'
											,name:'i_roGuestName'
											,id:'i_roGuestName'
											,anchor:'95%'
											,emptyText:'此项为必填项'
											,allowBlank: false
										}
										,{
											fieldLabel:'证件号'
											,xtype:'textfield'
											,name:'i_roGuestCardId'
											,vtype:'chinaCardId'
											,anchor:'95%' //nessasary
										}
										,{
										 	xtype:'textfield'
											,fieldLabel:'传真'
											,name:'i_roFax'
											,anchor:'95%'
										}
										,{
										  	xtype:'textfield'
											,fieldLabel:'预定金'
											,name:'i_roPaidMoney'
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
											,id:'i_roInDate'
											,fieldLabel: '预到日期'
											,format:'Y-m-d'
											,name: 'i_roInDate'
											,value:new Date().format('Y-m-d')
											,anchor:'95%' 	//nessasary
											,allowBlank: false
										}
										,{
											xtype:'timefield'
											,id:'i_roLatestTime'
											,fieldLabel: '最晚到店'
											,name: 'i_roLatestTime'
											,format:'H:i:s'
											,anchor:'95%'
										}
										,{
											fieldLabel:'性别'
											,xtype:'combo'
											,name:'i_roGuestGender'
											,id:'i_roGuestGender'	            
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
											,id:'i_roTelphone'
											,name:'i_roTelphone'
											,anchor:'95%'
											,emptyText:'此项为必填项'
											,allowBlank: false
										}
										,{
											fieldLabel:'总费用'
											,xtype:'textfield'
											,name:'i_roTotalRate'
											,id:'i_roTotalRate'
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
											,name:'cioOrderId'
											,id:'cioOrderId'
											,emptyText:'预定后产生'
											,disabled:true
											,allowBlank:false
											,readOnly:true
											,anchor:'95%'
										}
									]
								}
								,{
									columnWidth:.34
									,border:false
								  	,layout:'form'
								  	,items:[
										{
											xtype:'datefield'
											,id:'i_roOutDate'
											,format:'Y-m-d'
											,fieldLabel: '预离时间'
											,value:new Date().add(Date.DAY,1).format('Y-m-d')
											,name: 'i_roOutDate'
											,anchor:'95%' 
											,allowBlank: false
										}
										,{
											xtype:'combo'
											,fieldLabel: '预定状态'
											,name: 'i_roReservState'
											,id:'i_roReservState'
											,anchor:'95%' 	//nessasary
											,allowBlank: false
											,displayField:'i_roReservState'
											,mode:'local'
											,editable:false
											,triggerAction: 'all'
											,value:'预定中'
											,store:new Ext.data.SimpleStore({
												fields:['i_roReservState']
												,data:[
													['预定中'],['已确认'],['已光临']
													,['已失效']
												]
											})
										}
										,{
											fieldLabel: '证件类型'
									        ,xtype:'combo'
									        ,name: 'i_roGuestCardCatalog'
									        ,id:'i_roGuestCardCatalog'
									        ,anchor:'95%'
									        ,displayField:'i_roGuestCardCatalog'
											,mode:'local'
											,triggerAction: 'all' //需加
											,editable:false
											,value:'身份证'
											,store:new Ext.data.SimpleStore({
												fields:['i_roGuestCardCatalog']
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
											,name:'i_roEmail'
											,anchor:'95%'
											,vtype:'email'
										}
										,{
											xtype:'combo'
											,fieldLabel: '预付方式'
											,name: 'i_roPaymentModel'
											,id:'i_roPaymentModel'
											,anchor:'95%' 	//nessasary
											,allowBlank: false
											,displayField:'i_roPaymentModel'
											,mode:'local'
											,editable:false
											,triggerAction: 'all'
											,value:'现金'
											,store:new Ext.data.SimpleStore({
												fields:['i_roPaymentModel']
												,data:[
													['现金'],['支付卡'],['支票']
													,['其他']
												]
											})
										}
										,{
											fieldLabel:'营业员'
											,xtype:'textfield'
											,name:'i_roOperator'
											,id:'i_roOperator'
											,value:'Admin'//待读取
											,allowBlank:false
											,readOnly:true
											,disabled:true
											,anchor:'95%'
										},{
											fieldLabel:'登记单PKID'
											,xtype:'textfield'
											,name:'i_roId'
											,id:'i_roId'
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
							,labelWidth: 55
							,border:false
							,items:[
								{
									border:false
									,columnWidth:1
									,layout:'form'
									,items:[
										{
											fieldLabel:'备注'
											,xtype:'textfield'
											,name:'i_roRemark'
											,id:'i_roRemark'
											,allowBlank:true
											,anchor:'92%' //nessasary
										}
									]
											
								}
							]
						}
						,{
							id:'i_reservItemGrid'
							,title:'所定房间'
							,xtype:'grid'
							,anchor:'100%'
							,frame:true
							,height:145
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
		});
		Neo.frontdesk.ReservInfoWin.superclass.initComponent.apply(this,arguments);
		this.roomDataView=Ext.getCmp('roomDataView');
		this.reservInfoForm=Ext.getCmp('i_reservInfoForm');
		this.reservItemGrid=Ext.getCmp('i_reservItemGrid');
		this.reservOrderId=Ext.getCmp('i_roId');
	}
	,onRender:function() {
		Neo.frontdesk.ReservInfoWin.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.ReservInfoWin.superclass.afterRender.apply(this,arguments);
		this.roomDataView=Ext.getCmp('roomDataView');
		var selNode=this.roomDataView.getSelectedNodes();
			if(selNode && selNode.length>0){
				selNode=selNode[0];
				var selRecord=this.roomDataView.getRecord(selNode);
		}
		var rmId=selRecord.get('rmId');
		this.showReservInfo(rmId);
	}
	,showReservInfo:function(rmId){
		this.reservInfoForm.form.load({
			url:'reserv.htm?action=getReservInfo'
			,params:{rmId:rmId}
			,method:'POST'
			,scope:this
			,waitMsg:'加载预定信息...'
			,success:function(){
			
			}
			,failure:function(form,action){
			
			}
		})
		this.reservItemGrid.store.load({params:{rmId:rmId}});
	}
});

Ext.reg('reservinfowin',Neo.frontdesk.ReservInfoWin);