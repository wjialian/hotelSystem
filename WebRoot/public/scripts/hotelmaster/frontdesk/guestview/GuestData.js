Ext.namespace("Neo.frontdesk");
/*Neo.frontdesk.RoomDataView = function(){
	Neo.frontdesk.RoomDataView.superclass.constructor.call(this);
}*/
	Neo.frontdesk.GuestData = Ext.extend(Ext.grid.GridPanel,{
		initComponent:function() {
		var reader = new Ext.data.JsonReader({
		    	totalProperty: "totalSize"
       		    ,root: "data"
       		    ,fields:[
       		     {name: 'gtId'}
		       	,{name: 'gtName'}
		       	,{name: 'gtGender'}
		       	,{name: 'gtCardCatalog'}
		       	,{name: 'gtCardId'}
		       	,{name: 'gtCountry'}
		       	,{name: 'gtType'}
		       	,{name: 'gtZip'}
		       	,{name: 'gtTelphone'}
		       	,{name: 'gtMobile'}
		       	,{name: 'gtEmail'}
		       	,{name: 'gtAddress'}
		       	,{name: 'gtCompany'}
		       	,{name: 'gtCreateTime'}
		    ]});
		    	
		var findStore = new Ext.data.GroupingStore({
			 url: 'guestctrl.htm?action=findGuest'
    	     //proxy:  new Ext.data.HttpProxy({url:'frontdesk.htm?action=listAllGuests'})
		    ,reader: reader
		    ,sortInfo:{field: 'gtName', direction: "ASC"}
		    ,groupField:'gtType'
 });
			
		 var allStore = new Ext.data.GroupingStore({
		     url: 'guestctrl.htm?action=listAllGuests'
    	     //proxy:  new Ext.data.HttpProxy({url:'frontdesk.htm?action=listAllGuests'})
		    ,reader: reader
		    ,sortInfo:{field: 'gtName', direction: "ASC"}
		    ,groupField:'gtType'
 });
 		var sm = new Ext.grid.CheckboxSelectionModel();
 		var ds = allStore;
	        Ext.apply(this,{
	        	    title: '客人信息'
					//,autoHeight:true
	        	    ,tbar:[
				    '-'
					,{
						 text:'显示全部客户'
						,id:'showAllGuestBtn'
						,iconCls:'icon-reserv'
						,handler:function(){
						  ds = allStore;
						  this.reconfigure(ds,this.colModel);
						  ds.load({params:{start:0, limit:8}});
						}.createDelegate(this)
					}
					,'-'
					,{
						 text:'删除选中客户'
						,id:'delGuestBtn'
						,iconCls:'icon-checkin'
						,minWidth:'50'
						,handler:function(){
							console.log('   inside "Delete Contacts" with arguments = ',arguments);
				
				            //get the store associated with the grid:
				            store = this.getStore();
				
				            //returns array of record objects for selected rows (all info for row)
				            var selections = this.selModel.getSelections(); 
				            console.log('grid=',this);
				            console.log('selections=',selections);	
				            var rds=[];
				            var n = selections.length;
				            for(var i = 0; i < n; i++){    
								rds.push(selections[i].data);
				                store.remove(selections[i]);
				            }//end for
				            console.log(rds);
				            var rdsjson=Ext.util.JSON.encode(rds);  //encode json data
				            this.deleteSelectedRows(rdsjson);  //call function to delete selected rows
				        }.createDelegate(this)//end handler
					}
					,'-'
					]
					,collapsible: true
			        ,store:ds
			        ,sm: sm
			        ,loadMask:true
			        ,cm: new Ext.grid.ColumnModel([
			            sm,
				             {id:'name',header: "姓名", width: 30, sortable: true, dataIndex: 'gtName'}
				            ,{header: "性别", width: 15, sortable: true, dataIndex: 'gtGender'}
				            ,{header: "有效证件类型", width: 28, sortable: true, dataIndex: 'gtCardCatalog'}
				            ,{header: "有效证件号", width: 45, sortable: true, dataIndex: 'gtCardId'}
				            ,{header: "国籍", width: 20,align: 'center', sortable: true, dataIndex: 'gtCountry'}
				            ,{header: "客人类型", width: 22, align: 'center',sortable: true, dataIndex: 'gtType'}
				            ,{header: "家庭住址", width: 50,align: 'center', sortable: true, dataIndex: 'gtAddress'}
				            //,{header: "工作单位", width: 20, sortable: true, dataIndex: 'gtCompany'}
				            ,{header: "删除操作",width:20,align: 'center',renderer: function() {
										    return '<div class="controlBtn">' +
										    		'<img src="public/images/icons/delete.png" width="16" height="16" class="control_del">' +
										    		'</div>';
										}}
			        	      ])
					 ,view: new Ext.grid.GroupingView({
					             forceFit:true
					            ,groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
								,getRowClass : function(r, idx, rowParams, ds){
											if((idx%2)==1){
											  return "x-orange-class";
										    }else{
											  return "x-yellow-class";
											}
							     }
							    , emptyText: '没有找到任何数据'
					       })
					,autoExpandColumn:'gtName'
					,plugins:[new Ext.ux.grid.Search({
			            mode:'local'
			            ,iconCls:false
			            //,extend:true
			            //,localStore:allStore
			            //,searchStore:findStore
			            ,dateFormat:'m/d/Y'
			            ,minLength:2
			//          ,align:'right'
			        })]
	      });
		 this.bbar = new Ext.PagingToolbar({ 
         pageSize:8, 
         store: this.getStore(), 
         displayInfo:true, 
         displayMsg:'Displaying documents {0} - {1} of {2}', 
         emptyMsg:'<strong>No data to display</strong>'
    	}); 
        //ds.load({params:{start:0, limit:2}});
        Neo.frontdesk.GuestData.superclass.initComponent.apply(this,arguments);
        this.on({'rowclick':this.onGetSelectionModel,scope:this});
        this.on('click', function(e){        
        	var controlBtn = e.getTarget('.controlBtn');                
        	if (controlBtn) {   
			        	var t = e.getTarget();            
			        	var v = this.view;            
			        	var rowIdx = v.findRowIndex(t);            
			        	var record = this.getStore().getAt(rowIdx);                        
			        	var control = t.className.split('_')[1];            
			        	switch (control) {                
			        	case 'otherAction':                    
			        		console.log('otherAction this record - ' + record.id);     
			        		//到时候再说
			        		break;                
			        	case 'del':  
			        	 Ext.MessageBox.confirm('提示','是否要删除该项客户信息?',function(btn) {
							if (btn == 'yes') {
			        		console.log('del this record - ' + record.id);
			        		
			        		if(ds!=this.getStore())
			        		{
			        			ds = findStore;
			        		}//判断是否是查找store
			        		else{
			        			ds = allStore;
			        		}
			        		Ext.Ajax.request({
							   url: 'guestctrl.htm?action=dealGuestDelRequest',
							   success: function(){
							   		console.log("success");
							   		Ext.getCmp('getailform-guestview').setBlankValue();
							   		ds.reload({params:{start:0, limit:8}});
							   },
							   failure: function(){
							   	console.log("failure");
							   	Ext.Msg.alert("错误","更新数据库失败,请重新操作.");
							   },
							   headers: {
							       'my-header': 'gtId'
							   },
							   params:{gtId:record.get('gtId')}
							});
							ds.remove(record);
			        		return;            
			        	} 
					}.createDelegate(this))
					break;
			    }   
        	}}, this); 
	    this.addEvents({'onClickGridRow':true});
       } // end of function initComponent
	   ,onGetSelectionModel:function(){
	   		var sm = this.getSelectionModel();
	   		var record=null;
			try{
				record=sm.getSelected();
				if(record==null){
					return;
				}
			}
			catch(e){
				try{
					record=sm.selection.record();
				}
				catch(ex){}
			}
			this.fireEvent('onClickGridRow',record);
			//Ext.ux.Toast.msg('Event: action', 'You have clicked: row, action: rowclick'); 
	   }//end of function onGetSelectModel
	   ,onStoreReload:function(){
	   		var ds = this.getStore();
	   		ds.reload({params:{start:0, limit:8}});
	   }
	   ,deleteSelectedRows:function(rds){
	   		console.log(rds);
	   		var ds = this.getStore();
	   		Ext.Ajax.request({
				   url: 'guestctrl.htm?action=dealGuestDelSelectedRequest',
				   success: function(){
				   		console.log("success");
				   		ds.reload({params:{start:0, limit:8}});
				   },
				   failure: function(action){
				   	if(action.failureType == 'server'){ 
	               		obj = Ext.util.JSON.decode(action.response.responseText); 
	                	Ext.Msg.alert('错误:', obj.errors.reason); 
	                }
				   	console.log("failure");
				   },
				   headers: {
				       'my-header': 'gtId'
				   },
				   params:{json:rds}
			});
	   }
});


Ext.reg('guestdata',Neo.frontdesk.GuestData);