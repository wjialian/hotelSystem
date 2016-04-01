Ext.namespace("Neo.frontdesk");
/*Neo.frontdesk.RoomDataView = function(){
	Neo.frontdesk.RoomDataView.superclass.constructor.call(this);
}*/
Neo.frontdesk.RoomDataView = Ext.extend(Ext.DataView,{
	tpl:new Ext.XTemplate(
							   '<tpl for=".">', 
									'<div class="ux-status-view-wrap">',
										/*'<div class="ux-status-view-room">',
											'<p class="ux-status-view-roomtype">{rmCatalog}</p></div>',*/
											'<div class="ux-status-view-roompic"><img src={rmPicture}></div>',
										'<div class="ux-status-view-roomid" style="color:{roomInfoStateAsColor}">{rmId}</div>',
								'</div></tpl>'
	)
	,autoHeight:true
	,itemSelector:'div.ux-status-view-wrap'
	//,loadingText:'loading'
	,singleSelect:true //初始化时自动触发selectsection时间，为BUG
	,overClass:'x-view-over'
	,store:new Ext.data.JsonStore({
			url:'frontdesk.htm?action=listAllRooms'
			,root: 'rooms'
			,autoLoad:true
			,fields:[
				'rmArea'
				,{name:'rmAvailable',type:'boolean'}
				,'rmFloor','rmId'
				,{name:'rmPrctPrice',type:'float'}
				,{name:'rmState',type:'int'}
				,'rmTelphone'
				,'rmCatalog'
				,'roomInfoStateAsColor'
				,'rmPicture'
				,'rmPrctDiscount'
			]
	})
	,initComponent: function(){
		Ext.apply (this,{
		});
		Neo.frontdesk.RoomDataView.superclass.initComponent.apply(this,arguments);

		this.on({'dblclick':this.onRoomDblClick
				,scope:this});
		this.on({'loadexception':this.onRoomLoadException
				,scope:this});
		this.store.on({'load':this.onRoomDataLoad //可以在dataload时对dataview进行select(0),选中操作
				,scope:this
				,buffer:100});
		this.addEvents({'dblclickroom':true});
	}
	,onRender:function(){
			Neo.frontdesk.RoomDataView.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.RoomDataView.superclass.afterRender.apply(this,arguments);
	}
	,onRoomDblClick: function(){
			var selNode=this.getSelectedNodes();
			if(selNode && selNode.length>0){
				selNode=selNode[0];
				var selRecord=this.getRecord(selNode);
			}
			this.fireEvent('dblclickroom',selRecord);//触发事件传递给父结点处理
	}
	,onRoomLoadException: function(){
		
	}
	,onRoomDataLoad: function(){
		
	}
});
Ext.reg('roomdataview',Neo.frontdesk.RoomDataView);