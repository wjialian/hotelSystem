Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

//var roomDataView =
Neo.frontdesk.RoomView = Ext.extend(Ext.Panel,{
	region:'center'
	,title:'房间'
	,autoscroll:true
	,tools:[
				{
					id:'refresh'
					,handler: function(event, toolEl, panel){
					// refresh logic
					}
				}
			]
	,initComponent: function(){
		
		/*var myData = [
		    ['337','标准'],
		    ['336','单人']
	    ];
	    var roomStore = new Ext.data.SimpleStore({
	      	fields: [
	     		{name: 'roomInfoId'},
	           	{name: 'roomInfoType'}
	        ]
	    });*/
		/*var roomDataStore =new Ext.data.JsonStore({
							url:'frontdesk.htm?action=listAllRooms'
							,root: 'rooms'
							,autoLoad:true
							,fields:[
								'roomInfoArea'
								,{name:'roomInfoAvLable',type:'boolean'}
								,{name:'roomInfoDiscount',type:'float'}
								,'roomInfoFloor','roomInfoId'
								,{name:'roomInfoPrctPrice',type:'float'}
								,{name:'roomInfoState',type:'int'}
								,'roomInfoStateAsString'
								,'roomInfoTelphone'
								,'roomInfoType'
							]
							,listeners:{
								'load':{
									fn:function(){
										//this.roomDataView.select(0); //roomDataView
									//	this.roomdata.select(0);
									}
									,scope:this
									,buffer:100
								}
							}
						});*/
		/*var roomDataView=new Ext.DataView({
						tpl:new Ext.XTemplate(
							   '<tpl for=".">', 
									'<div class="ux-status-view-wrap">',
										'<div class="ux-status-view-room">',
											'<p class="ux-status-view-roomtype">{roomInfoType}</p></div>',
										'<div class="ux-status-view-roomid">{roomInfoId}</div>',
								'</div></tpl>'
						)
						,autoHeight:true
						,itemSelector:"div.ux-status-view-wrap"
						,overClass:'x-view-over'
						,store:roomDataStore
						,listeners:{
							'selectionchange': {fn:this.showDetails, scope:this, buffer:100},
							'dblclick'       : {fn:this.doCallback, scope:this},
							'loadexception'  : {fn:this.onLoadException, scope:this}
						}
		});*/
		//var roomDataView=new Neo.frontdesk.RoomDataView();
		
		Ext.apply(this,{
			items:{
				xtype:'roomdataview'
			}
		});
		//Neo.frontdesk.RoomView.superclass.initComponent.call(this);
		Neo.frontdesk.RoomView.superclass.initComponent.apply(this,arguments);
		
		this.roomDataView=this.items.itemAt(0);
		this.roomDataView.on({'dblclickroom':this.onDblClickRoom
			,scope:this});
		this.addEvents({'dblclickroom':true});
		//console.log(this.roomDataView.events['dblclickroom']);
	}
	,onRender:function(){
		Neo.frontdesk.RoomView.superclass.onRender.apply(this,arguments);
		//这里写Render后的代码
	}
	,afterRender:function(){
		Neo.frontdesk.RoomView.superclass.afterRender.apply(this,arguments);
		
	}
	,onDblClickRoom:function(selRoomRecord){
		this.fireEvent('dblclickroom',selRoomRecord);
	}
});
Ext.reg('roomview',Neo.frontdesk.RoomView)