Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.ReservManage = Ext.extend(Ext.grid.GridPanel,{
	title:'管理预定'
	//,layout:'fit'
	,border:false
	//,stateful:false
	//,url:'' 
	,frame:true
	,initComponent: function(){
		this.rowActions = new Ext.ux.grid.RowActions({ 
									actions:[
										{ 
											iconCls:'icon-edit'
											,qtip:'修改' 
										},{ 
											iconCls:'icon-delete' 
											,qtip:'删除' 
										}
									] 
									,widthIntercept:Ext.isSafari ? 4 : 2 
									,id:'actions' 
							});
		this.rowActions.on('action', this.onRowAction, this); 
		Ext.apply (this,{
			store:new Ext.data.JsonStore({
				url:'reserv.htm?action=findAvailReservOrders'
				,totalProperty:'totalCount'
				,root:'reservOrders'
				,fields:[
					'roGuestName'		//客人姓名
					,'roGuestGender'  //客人性别
					,'roGuestCardCatalog'	//证件类型
					,'roGuestCardId'		//证件号
					,'roReservModel'	//预定方式
					,{name:'roPaidMoney',type:'float'}	//预付金
					,'roPaymentModel'	//支付方式
					,'roReservState'	//预定状态
					,'roInDate'		//预住时间
					,'roOutDate'		//预离时间
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
					,'roCreateTime'//创建时间
				]
			})
			,columns:[
				{header:'客人姓名',width:80,dataIndex:'roGuestName'}
				,{header:'预定方式',width:80,dataIndex:'roReservModel'}
				,{header:'预定状态',width:80,dataIndex:'roReservState'}
				,{header:'预付金',width:80,dataIndex:'roPaidMoney'}
				,{header:'预住日期',width:90,dataIndex:'roInDate'}
				,{header:'预离日期',width:90,dataIndex:'roOutDate'}
				,{header:'备注',width:70,dataIndex:'roRemark'}
				,this.rowActions
			]
			,plugins:[new Ext.ux.grid.Search({ 
				//iconCls:'icon-zoom'
				 mode:'local'
				,iconCls:false
				//,readonlyIndexes:['note'] 
				//,disableIndexes:['pctChange'] 
				,minLength:2
				,mode:'local'
				})
				, this.rowActions
			]
		});
		this.bbar = new Ext.PagingToolbar({ 
			store:this.store 
			,displayInfo:true 
			,pageSize:10 
		});
		Neo.frontdesk.ReservManage.superclass.initComponent.apply(this,arguments);
		this.reservInfo=Ext.getCmp('reservInfo');
		this.on({'dblclick':this.onGridDblClick
			,scope:this});
		this.addEvents({'loadReservInfo':true});
		this.addEvents({'alertReservInfo':true});
		this.addEvents({'deleteReservInfo':true});
	}
	,onRender:function(){
		Neo.frontdesk.ReservManage.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.ReservManage.superclass.afterRender.apply(this,arguments);
		this.store.load({params:{start:0, limit:10}});
	}
	,deleteRecord:function(record){
		//var reservJson=Ext.util.JSON.encode(record.data);
		var reservId=record.get('roId');
		//发往服务端删除消息
		Ext.Ajax.request({
			url:'reserv.htm?action=deleteReserv'
			,method:'POST'
			,success: function(){
				Ext.ux.Toast.msg('提示','预定信息已删除')
			}
			,params:{roId:reservId}
		});
		this.store.remove(record);
	}
	,getGridSelectRecord:function(){
		var sm=this.getSelectionModel();
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
	,onGridDblClick:function(){
		var record=this.getGridSelectRecord();
		this.fireEvent('loadReservInfo',record);
	}
	,onRowAction:function(grid, record, action, row, col) {
		console.log(action);
		switch(action) { 
			case 'icon-delete':
			console.log('delete');
			Ext.Msg.show({
					title:'提示'
					,msg: '确定要删除该预定吗'
					,buttons: Ext.Msg.YESNO
					,fn:function(btn){
						if(btn=='yes'){
							this.deleteRecord(record);
							this.fireEvent('deleteReservInfo');
						}
					}.createDelegate(this,[],true)
					//this.deleteRecord.createDelegate(this,[],true)
					,animEl: 'elId'
					,icon: Ext.MessageBox.INFO
			});
		break; 
		case 'icon-edit': 
			this.onGridDblClick();
			this.fireEvent('alertReservInfo');
			//this.reservInfo.onAlertReservBtnClick();
			//this.recordForm.show(record, grid.getView().getCell(row, col)); 
		break; 
		}
	}
	,updateAvailItem:function(){
		this.store.reload();
	}
});
Ext.reg('reservmanage',Neo.frontdesk.ReservManage);