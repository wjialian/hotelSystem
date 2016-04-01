Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.Mainview = function(){
	Neo.frontdesk.Mainview.superclass.constructor.call(this);
}

Neo.frontdesk.Mainview = Ext.extend(Ext.Panel,{
		/*Default*/
		title:'MainView'
		,layout:'border'
		//,border:true
		//,height:400
		,initComponent: function(){
			//var roomView = new Neo.frontdesk.RoomView();
			/*var checkInForm=new Neo.frontdesk.CheckInForm({
				//autoscroll:true
			});*/
			var guestDetailForm=new Neo.frontdesk.GuestDetailForm();
			Ext.apply (this,{
				tbar:[
					'-'
					,{
						text:'登记'
						,iconCls:'icon-checkin'
						,minWidth:'50'
					}
					,'-'
					,{
						text:'预定'
						,iconCls:'icon-reserv'
					}
					,'-'
				]
				//layout:'border'
				,items:[
					{
						xtype:'roomview'
					}		
					,{
						region:'east'
						,title:'入住登记'
						,width:380
						,collapsible:true
						,margins:'0 0 0 5'
						,layout:'fit'
						,items:[
							{
								xtype:'tabpanel'
								,border:false
								,activeTab:0
								,tabPosition:'bottom'
								,layoutOnTabChange:true
								,defaults:{autoScroll: true}  
								,items:[
									{xtype:'checkinform'},
									{xtype:'guestdetailform'}
								]
							}
						]
					}	
				]
			});
			Neo.frontdesk.Mainview.superclass.initComponent.apply(this,arguments);
			this.roomView=this.items.itemAt(0);
			this.checkInForm=this.items.itemAt(1).items.itemAt(0).items.itemAt(0);
			this.guestDetailForm=this.items.itemAt(1).items.itemAt(0).items.itemAt(1);
			
			this.roomView.on({'dblclickroom':this.onDblClickRoom
				,scope:this});
		}
		,onRender:function(){
			Neo.frontdesk.Mainview.superclass.onRender.apply(this,arguments);
		}
		,onDblClickRoom: function(selRoomRecord){
			this.checkInForm.addRoomInfo(selRoomRecord);
		}
		
});
Ext.reg('mainview',Neo.frontdesk.Mainview);