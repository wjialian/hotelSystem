Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.ReservSummary = Ext.extend(Ext.Panel,{
	title:'可用预定'
	,frame:true
	,layout:'border'
	,initComponent: function(){
		Ext.apply(this,{
			items:[
				{
					id:'availableItem'
					,title:'可用房间'
					,xtype:'grid'
					,region:'center'
					,anchor:'99%'
					,frame:true
					,height:240
					,tbar:[
       					'从: ',' '
       					,new Ext.form.DateField({
       						format:'Y-m-d'
       						,id:'availFromDate'
							,value:new Date().format('Y-m-d')
       					})
       					,'到: ',' '
       					,new Ext.form.DateField({
       						format:'Y-m-d'
       						,id:'availToDate'
       						,value:new Date().add(Date.DAY,1).format('Y-m-d')
       					})
       					,'房间类型: ',' '
       					,{
       						xtype:'combo'
							//,labelWidth: 50
							,id:'reservRoomCatalog'
							,anchor:'50%' 	//nessasary
							,allowBlank: false
							,displayField:'roomCatalog'
							,width:100
							,mode:'local'
							,editable:false
							,value:'全部'
							,triggerAction: 'all'
							,store:new Ext.data.SimpleStore({
							fields:['roomCatalog']
								,data:[
									['标准间'],['单人间'],['三人间']
									,['豪华套间'],['全部']
								]
							})
       					}
       					,'->'
       					,{
       						text:'查询'
       						,handler:this.findAvailRoom
       						,scope:this
       						,iconCls:'icon-find'
       					}
       				]
					//,scrollOffset:5
					/*,store:new Ext.data.SimpleStore({
						fields:[
							,'rmId'
							,'rmCatalog'
							,'rmArea'
							,'rmFloor'
							,{name:'rmPrctPrice',type:'float'}
							,{name:'rmPrctDiscount',type:'float'}
						]
						,data:[
							['8106','标准','260']
							,['8206','单人','200']
							]
					})*/
       				,store:new Ext.data.JsonStore({
       					url:'reserv.htm?action=findAvailRooms'
       					,root:'rooms'
       					,id:'room'
       					,totalProperty:'totalCount'
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
						{id:'room',header:'房间',width:70,sortable:true,dataIndex:'rmId'}
						,{header:'类型',width:70,sortable:true,dataIndex:'rmCatalog'}
						,{header:'楼层',width:70,sortable:true,dataIndex:'rmFloor'}
						,{header:'区域',width:70,sortable:true,dataIndex:'rmArea'}
						,{header:'预设价',width:95,sortable:true,dataIndex:'rmPrctPrice'}
						,{header:'预设折扣',width:100,sortable:true,dataIndex:'rmPrctDiscount'}
					]
				}
					/*region:'center'
					,title:'可用房间'
					,layout:'column'
					,autoScroll:true
					,labelWidth: 60
					,items:[
						/*{
							columnWidth:.4
							,border:false
							,layout:'form'
							//,labelWidth: 50
							,items:[
								{
									xtype:'datefield'
									,fieldLabel: '从'
									,name: 'fromDate'
									,id:'fromDate'
									,anchor:'95%' 	//nessasary
									,allowBlank: false
									,format:'m/d/Y'
									,value:new Date().format('m/d/y')
								}
								,{
									xtype:'datefield'
									,fieldLabel: '到'
									,name: 'toDate'
									,id:'toDate'
									,anchor:'95%' 	//nessasary
									,allowBlank: false
									,format:'m/d/Y'
									,value:new Date().format('m/d/y')
								}
								,{
									xtype:'combo'
									,fieldLabel: '房间类型'
									//,labelWidth: 50
									,name: 'roomCatalog'
									,id:'reservRoomCatalog'
									,anchor:'95%' 	//nessasary
									,allowBlank: false
									,displayField:'roomCatalog'
									,mode:'local'
									,editable:false
									,triggerAction: 'all'
									,store:new Ext.data.SimpleStore({
										fields:['roomCatalog']
										,data:[
											['标准间'],['单人间'],['三人间']
											,['豪华套间'],['全部']
										]
									})
								}
							]
						}
						,{
							columnWidth:.6
							,border:false
							,layout:'form'
							,items:[
								{
									id:'availableItem'
									,title:'可用房间列表'
									,xtype:'grid'
									,anchor:'99%'
									,frame:true
									,height:240
									//,scrollOffset:5
									,store:new Ext.data.SimpleStore({
										fields:[
											,'rmId'
											,'rmCatalog'
											,{name:'rmPrctPrice',type:'float'}
										]
										,data:[
											['8106','标准','260']
											,['8206','单人','200']
										]
									})
									,columns:[
										{id:'rooms',header:'房间',width:70,sortable:true}
										,{header:'类型',width:70,sortable:true}
										,{header:'预设价',width:95,sortable:true}
									]
								}
							]
						}*/
					//]
				//}
				,
				{
					region:'east'
					,xtype:'fusionpanel'
					,id:'summaryChart'
					,title:'单日预定状态图'
					,collapsible : true
					,floating:false
					,autoScroll:true
					,width:300
					,chartURL : 'public/swf/charts/Pie3D.swf'
       				,dataURL  : 'public/swf/charts/Column3D1.xml'
       				,fusionCfg: { id: 'charting1'}
       				,tbar:[
       					'日期: ',' '
       					,new Ext.form.DateField({
       						format:'Y-m-d'
							,value:new Date().format('Y-m-d')
       					})
       				]
       				,listeners: {
		                'show': function() { console.log( 'SHOW' ) },
		                'chartload': function() { console.log( 'LOAD' ) },
		                'chartrender': function() { console.log( 'RENDER' ) }
		            }
				}
			]
		});
		Neo.frontdesk.ReservSummary.superclass.initComponent.apply(this,arguments);
		this.availFromDate=Ext.getCmp('availFromDate');
		this.availToDate=Ext.getCmp('availToDate');
		this.availItemGrid=Ext.getCmp('availableItem');
		this.availItemStore=this.availItemGrid.store;
		this.availItemGrid.on({'dblclick':this.onGridDblClick
		 	,scope:this});
		this.addEvents({'dbclickavailroom':true});
	}
	,onRender:function(){
		Neo.frontdesk.ReservSummary.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.ReservSummary.superclass.afterRender.apply(this,arguments);
	}
	,onGridDblClick:function(){
		var record=this.getGridSelectRecord();
		this.fireEvent('dbclickavailroom',record);
	}
	,findAvailRoom:function(){
		if(this.reservRoomCatalog==undefined){
			this.reservRoomCatalog=Ext.getCmp('reservRoomCatalog');
		}
		console.log(this.reservRoomCatalog);
		console.log(this.availFromDate.getValue());
		this.availItemStore.baseParams={from:this.availFromDate.getValue().format('Y-m-d')
		,to:this.availToDate.getValue()
		,catalog:this.reservRoomCatalog.value}
		this.availItemStore.load({params:{start:0, limit:10}});
		console.log('findAvailRoom click');
	}
	,getGridSelectRecord:function(){
		var sm=this.availItemGrid.getSelectionModel();
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
	,updateAvailRooms:function(){
		this.availItemStore.reload();
	}
});
Ext.reg('reservsummary',Neo.frontdesk.ReservSummary);