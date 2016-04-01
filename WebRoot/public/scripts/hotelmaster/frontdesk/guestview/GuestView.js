Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.Guestview = function(){
	Neo.frontdesk.Guestview.superclass.constructor.call(this);
}
Neo.frontdesk.Guestview = Ext.extend(Ext.Panel,{
		/*Default*/
		//title:'客户管理'
		layout:'border'
		//,border:true
		//,height:690
		//,autoHeight:true
		,initComponent: function(){
			Ext.apply (this,{
				items:[
					{
						region:'center'
						,xtype:'guestgrid'
					}
					,{
						xtype:'guestdetailform'
						,id:'getailform-guestview'
						,region:'east'
						,collapsible:true
						,width:380
						,margins:'0 0 0 5'
					}
					/*,{
						region:'east'
						,title:'客户详细信息'
						,width:380
						,collapsible:true
						,margins:'0 0 0 5'
						,layout:'fit'
						,items:[
							{
								xtype:'guestdetailform'
								/*xtype:'tabpanel'
								,border:false
								,activeTab:0
								,tabPosition:'bottom'
								,layoutOnTabChange:true
								,defaults:{autoScroll: true}  
								,items:[
									{xtype:'guestdetailform'}
								]*/
							/*}
						]
					}	*/
				]
			});
			
			Neo.frontdesk.Guestview.superclass.initComponent.apply(this,arguments);
			
			this.guestDetail = this.items.itemAt(1);
			this.guestDetail.showBtn();
			this.guestDetail.on({'onReloadData':this.onShowAllGuest,scope:this});
			this.guestGrid = this.items.itemAt(0);
			this.guestGrid.on({'onClickGridRow':this.onRecordFromGrid,scope:this});
			this.guestData = this.items.itemAt(0).items.itemAt(0);
			//this.showAllGuestBtn = this.getTopToolbar().items;//('showAllGuestBtn');
			//this.btn = this.showAllGuestBtn.get('showAllGuestBtn');//.on({'click':this.onShowAllGuest,scope:this});
		}
		,onRender:function(){
			Neo.frontdesk.Guestview.superclass.onRender.apply(this,arguments);
		}
		,onRecordFromGrid:function(record){
			this.guestDetail.refreshGuestDetail(record);
			this.guestDetail.enableModifyBtn();
		}
		,onShowAllGuest:function(){
			this.guestData.onStoreReload();
		}
});
Ext.reg('guestview',Neo.frontdesk.Guestview);