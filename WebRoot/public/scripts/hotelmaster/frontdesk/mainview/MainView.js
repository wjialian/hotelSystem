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
				/*tbar:[
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
				]*/
				//layout:'border'
				items:[
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
								,id:'tabpanel'
								,border:false
								,activeTab:0
								,tabPosition:'bottom'
								,layoutOnTabChange:true
								,defaults:{autoScroll: true}  
								,items:[
									{xtype:'checkinform'
									 ,id:'checkinForm'},
									{xtype:'guestdetailform'
									 ,id:'detailForm'+this.id
									 }
								]
							}
						]
					}	
				]
			});
			Neo.frontdesk.Mainview.superclass.initComponent.apply(this,arguments);
			this.roomView=this.items.itemAt(0);
			this.roomView.filtStandRm=Ext.getCmp('filtStandRm');
			this.roomView.filtSingleRm=Ext.getCmp('filtSingleRm');
			this.roomView.filtThreeRm=Ext.getCmp('filtThreeRm');
			this.roomView.filtDeluxRm=Ext.getCmp('filtDeluxRm');
			this.roomView.filtFirst=Ext.getCmp('filtFirst');
			this.roomView.filtSecond=Ext.getCmp('filtSecond');
			this.roomView.filtThird=Ext.getCmp('filtThird');
			this.roomView.filtFourth=Ext.getCmp('filtFourth');

			this.checkInForm=this.items.itemAt(1).items.itemAt(0).items.itemAt(0);
			this.guestDetailForm=this.items.itemAt(1).items.itemAt(0).items.itemAt(1);
			this.roomView.on({'dblclickroom':this.onDblClickRoom
				,scope:this});
			this.roomView.on({'showcheckininfo':this.onShowCheckinInfo
				,scope:this});
			/*this.roomView.on({'reservCheckin':this.onReservCheckin
				,scope:this});*/
			this.checkInForm.on({'updateRmView':this.onUpdateRmView
				,scope:this});
			this.checkInForm.setGuestDetailForm('detailForm'+this.id);
		}
		,loadMask:function(){
			this.loadMask = new Ext.LoadMask(this,({msg:'loading',msgCls:'x-mask-loading'}));
			this.loadMask.show();
		}
		,hideMask:function(){
			this.loadMask.hide();
		}
		,onRender:function(){
			//this.getEl.mask.call(this,'loading');
			Neo.frontdesk.Mainview.superclass.onRender.apply(this,arguments);
		}
		,onDblClickRoom: function(selRoomRecord){
			this.checkInForm.addRoomInfo(selRoomRecord);
		}
		,onReservCheckin:function(rmId){
			console.log(this.checkInForm);
			this.checkInForm.reservCheckin(rmId);
		}
		,onShowCheckinInfo:function(rmId){
			this.checkInForm.showCheckinInfo(rmId);
		}
		,onUpdateRmView:function(){
			this.roomView.updateRmView();
		}
		
});
Ext.reg('mainview',Neo.frontdesk.Mainview);