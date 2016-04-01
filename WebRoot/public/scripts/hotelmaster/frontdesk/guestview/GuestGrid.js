Ext.namespace("Neo.frontdesk");

//var roomDataView =
Neo.frontdesk.GuestGrid = Ext.extend(Ext.Panel,{
	//,title:'客户信息'
	autoscroll:true
	//,autoHeight:true
	,layout:'fit'
	,initComponent: function(){
		
		Ext.apply(this,{
			items:{
				xtype:'guestdata'
			}
		});
		Neo.frontdesk.GuestGrid.superclass.initComponent.apply(this,arguments);
		this.guestData = this.items.itemAt(0);
		this.guestData.on({'onClickGridRow':this.onRecordFromData,scope:this});
		this.addEvents({'onClickGridRow':true});
		
	}
	,onRecordFromData:function(record){
		this.fireEvent('onClickGridRow',record);
	}
	,onRender:function(){
		Neo.frontdesk.GuestGrid.superclass.onRender.apply(this,arguments);
		//这里写Render后的代码
	}
	,afterRender:function(){
		Neo.frontdesk.GuestGrid.superclass.afterRender.apply(this,arguments);
		
	}
});
Ext.reg('guestgrid',Neo.frontdesk.GuestGrid);