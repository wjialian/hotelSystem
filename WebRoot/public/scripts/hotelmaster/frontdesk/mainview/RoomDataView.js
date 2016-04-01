Ext.namespace("Neo.frontdesk");
/*Neo.frontdesk.RoomDataView = function(){
	Neo.frontdesk.RoomDataView.superclass.constructor.call(this);
}*/
Neo.frontdesk.RoomDataView = Ext.extend(Ext.DataView,{
	initComponent: function(){
		Ext.apply (this,{
			tpl:new Ext.XTemplate(
							   '<tpl for=".">', 
									'<div class="ux-status-view-wrap">',
										/*'<div class="ux-status-view-room">',
											'<p class="ux-status-view-roomtype">{rmCatalog}</p></div>',*/
											'<div  class="ux-status-view-roompic"><img  ext:qtip="类型:{rmCatalog} 价格:{rmPrctPrice} 折扣:{rmPrctDiscount}" src={rmPicture}></div>',
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
				,totalProperty: "totalSize"
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
		});
		Neo.frontdesk.RoomDataView.superclass.initComponent.apply(this,arguments);
		this.roomViewMenu=new Ext.menu.Menu({
	    	id:'roomViewMenu'
	    	,items:[
	    		{
	    			text:'登记该房间'
	    			,id:'rmCheckinBtn'
	    			,iconCls:'icon-checkin'
	    		}
	    		,{
	    			text:'查看登记信息'
	    			,id:'checkinInfoBtn'
	    			,iconCls:'icon-checkininfo'
	    		}
	    		,{
	    			text:'查看预定信息'
	    			,id:'checkRvInfoBtn'
	    			,iconCls:'icon-checkrvinfo'
	    		}
	    		,{
	    			text:'预定入住'
	    			,id:'rvCheckinBtn'
	    			,iconCls:'icon-reservin'
	    		}
	    		,{
	    			text:'更改房间状态'
	    			,iconCls:'icon-switch'
	    			,menu:{
	    				items:[
	    					{
	    						text:'置为空闲房'
	    						,cls:'no-icon-menu'
	    						,id:'setVacancy'
	    					}
	    					/*,{
	    						text:'置为预定房'
	    						,cls:'no-icon-menu'
	    						,id:'setReserv'
	    					}
	    					,{
	    						text:'置为已租房'
	    						,cls:'no-icon-menu'
	    						,id:'setCheckin'
	    					}
	    					,{
	    						text:'置为结帐房'
	    						,cls:'no-icon-menu'
	    						,id:'setCheckOut'
	    					}*/
	    					,{
	    						text:'置为清洁房'
	    						,cls:'no-icon-menu'
	    						,id:'setClean'
	    					}
	    					,{
	    						text:'置为锁房'
	    						,cls:'no-icon-menu'
	    						,id:'setBlock'
	    					}
	    				]
	    			}
	    		}
	    	]
	    });
	    this.rmCheckinBtn=Ext.getCmp('rmCheckinBtn');
	    this.rmCheckinBtn.on({'click':this.onRoomDblClick
	    		,scope:this});
	    this.checkinInfoBtn=Ext.getCmp('checkinInfoBtn');
	    this.checkinInfoBtn.on({'click':this.showCheckinInfo
	    	,scope:this});
	    this.rvCheckinBtn=Ext.getCmp('rvCheckinBtn');
	    this.rvCheckinBtn.on({'click':this.onRvCheckinBtnClick
	    	,scope:this});
	    this.setVacancy=Ext.getCmp('setVacancy');
	    this.setVacancy.on({'click':this.onSetVacancyClick
	    		,scope:this});
	    /*this.setReserv=Ext.getCmp('setReserv');
	    this.setReserv.on({'click':this.onSetReservClick
	    	,scope:this});
	    this.setCheckin=Ext.getCmp('setCheckin');
	    this.setCheckin.on({'click':this.onSetCheckinClick
	    	,scope:this});
	    this.setCheckOut=Ext.getCmp('setCheckOut');
	    this.setCheckOut.on({'click':this.onSetCheckOutClick
	    	,scope:this});*/
	    this.setClean=Ext.getCmp('setClean');
	    this.setClean.on({'click':this.onSetCleanClick
	    	,scope:this});
	    this.setBlock=Ext.getCmp('setBlock');
	    this.setBlock.on({'click':this.onSetBlockClick
	    	,scope:this});
	    this.checkRvInfoBtn=Ext.getCmp('checkRvInfoBtn');
	    this.checkRvInfoBtn.on({'click':this.onCheckRvInfoBtnClick
	    	,scope:this});
	    this.checkinForm=Ext.getCmp('checkinForm');
	    
		this.on({'dblclick':this.onRoomDblClick
				,scope:this});
		this.on({'loadexception':this.onRoomLoadException
				,scope:this});
		this.store.on({'load':this.onRoomDataLoad //可以在dataload时对dataview进行select(0),选中操作
				,scope:this
				,buffer:100});
		this.addEvents({'dblclickroom':true,'showcheckininfo':true},{'reservCheckin':true});
		/*this.on({'contextmenu':this.onContextMenu //需要在父节点进行
			,scope:this});*/
	}
	,onRender:function(){
			Neo.frontdesk.RoomDataView.superclass.onRender.apply(this,arguments);
	}
	,afterRender:function(){
		Neo.frontdesk.RoomDataView.superclass.afterRender.apply(this,arguments);
	}
	/*,onContextMenu:function(dview,index,node,e){
		console.log('onContextMenu');
		e.stopEvent();
		this.select(node,false,false);
		//var coords=e.getXY();
		//this.roomViewMenu.showAt([coords[0],coords[1]]);
	}*/
	,onCheckRvInfoBtnClick:function(){
		//this.infoState='checkout';
		var win=new Neo.frontdesk.ReservInfoWin();
		win.show(this);
	}
	,onRoomDblClick: function(){
			var selNode=this.getSelectedNodes();
			if(selNode && selNode.length>0){
				selNode=selNode[0];
				var selRecord=this.getRecord(selNode);
			}
			if(selRecord.get('rmState')=='0'){
				this.fireEvent('dblclickroom',selRecord);//触发事件传递给父结点处理
			}else if(selRecord.get('rmState')=='1'){
				Ext.Msg.show({
					title:'强制登记'
					,msg: '该房已被预定，建议使用预定入住功能登记，确认要进行强制登记吗？'
					,buttons: Ext.Msg.YESNO
					,fn:this.addRoom.createDelegate(this,[],true)
					,animEl: 'elId'
					,icon: Ext.MessageBox.QUESTION
				});
			}else{
				Ext.ux.Toast.msg('提示','该房间暂时不能登记，请检查更新房间状态!');
			}
			
	}
	,addRoom:function(btn){
		if(btn=='yes'){
			var selNode=this.getSelectedNodes();
			if(selNode && selNode.length>0){
				selNode=selNode[0];
				var selRecord=this.getRecord(selNode);
			}
			this.fireEvent('dblclickroom',selRecord);//触发事件传递给父结点处理
			var boundEl=Ext.get(selNode);
			//boundEl.dom.lastChild.style='color:#6E7544';
			console.log(boundEl.dom.lastChild.firstChild);
			//boundEl.dom.lastChild.firstChild.nodeValue='登记中...';
			/*selRecord.set('roomInfoStateAsColor','#6E7544');
			selRecord.set('rmId','登记中...');*/
		}
	}
	,onRoomLoadException: function(){
		
	}
	,onRoomDataLoad: function(){
		
	}
	,onRvCheckinBtnClick:function(){
		var selNode=this.getSelectedNodes();
		if(selNode && selNode.length>0){
			selNode=selNode[0];
			var selRecord=this.getRecord(selNode);
		}
		this.checkinForm=Ext.getCmp('checkinForm');
		this.checkinForm.reservCheckin(selRecord.get('rmId'));
		//this.fireEvent('reservCheckin',selRecord.get('rmId'));
	}
	,onSetBlockClick:function(){
		this.updateRoom('5','#E80033');
	}
	,onSetCheckinClick:function(){
		this.updateRoom('2','#FFE000');
	}
	,onSetCheckOutClick:function(){
		this.updateRoom('3','#E40090');
	}
	,onSetCleanClick:function(){
		this.updateRoom('4','#00AF4D');
	}
	,onSetReservClick:function(){
		this.updateRoom('1','#FF7D00');
	}
	,onSetVacancyClick:function(){
	    this.updateRoom('0','#008CD2');
	}
	//查看登记信息
	,showCheckinInfo:function(){
		var selNode=this.getSelectedNodes();
		if(selNode && selNode.length>0){
			selNode=selNode[0];
			var selRecord=this.getRecord(selNode);
		}
		this.fireEvent('showcheckininfo',selRecord.get('rmId'));
	}
	,updateRoom:function(stateIndex,color){
		//预定房置空房要使预定失效，待处理*
		var selNode=this.getSelectedNodes();
		if(selNode && selNode.length>0){
			selNode=selNode[0];
			var selRecord=this.getRecord(selNode);
	    }
	    selRecord.set('rmState',stateIndex);
	    selRecord.set('roomInfoStateAsColor',color);
	    rmRecordJSON=Ext.util.JSON.encode(selRecord.data);
		Ext.Ajax.request({
			url:'frontdesk.htm?action=updateRoom'
			,params:{rmRecord:rmRecordJSON}
			,method:'POST'
			,success: function(){
				Ext.ux.Toast.msg('提示','房态更改成功!');
			}
			,failure: function(){
				Ext.ux.Toast.msg('提示','房态修改失败，请重新尝试!');
				this.store.reload();
			}
		});
	}
});
Ext.reg('roomdataview',Neo.frontdesk.RoomDataView);