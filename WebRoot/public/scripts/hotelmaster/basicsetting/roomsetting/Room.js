Ext.namespace("Neo.basicSetting");

  Neo.basicSetting.Room = Ext.extend(Ext.grid.EditorGridPanel,{
		initComponent:function() {  
			
		  Ext.util.Format.cnMoney = function(v){
								v = (Math.round((v-0)*100))/100;
								v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
								return ('￥' + v).replace(/\./, '.');
		};	
		 function picRender(v){
			if(!v)
				return "";
			else {
				switch(v){
		  	case 'public/images/rooms/single.gif':
		  		val = '单人间';
		  		return String.format("<div class='ux-status-view-roompic'>{1}</br><img src='{0}'></div>",v,val);
		  	case 'public/images/rooms/standardroom.gif':
		  		val = '标准间';
		  		return String.format("<div class='ux-status-view-roompic'>{1}</br><img src='{0}'></div>",v,val);
		  	case '单人间':
		  		val = 'public/images/rooms/single.gif';
		  		return String.format("<div class='ux-status-view-roompic'>{0}</br><img src='{1}'></div>",v,val);
		  	case '标准间':
		  		val = 'public/images/rooms/standardroom.gif';
		  		return String.format("<div class='ux-status-view-roompic'>{0}</br><img src='{1}'></div>",v,val);
		  	}
		 }};
		
		  function state(val){
		  	switch(val){
		  	case 0:
		  		val = '空闲';
		  		break;
		  	case 1:
		  		val = '预定';
		  		break;
		  	case 2:
		  		val = '租用';
		  		break;
		  	case 3:
		  		val = '结帐';
		  		break;
		  	case 4:
		  		val = '清洁';
		  		break;
		  	case 5:
		  		val = '锁房';
		  		break;
		  	}
		  	return val;
		  }
		  var Plant = Ext.data.Record.create([
		    {name: 'isNew'}
           ,{name: 'rmId'}
           ,{name: 'rmArea'}
           ,{name: 'rmFloor'}
           ,{name: 'rmCatalog'}
           ,{name: 'rmState'}
           ,{name: 'rmPrctPrice'}   
           ,{name: 'rmPrctDiscount'}
           ,{name: 'rmTelphone'}
           ,{name: 'rmPicture'}
           ,{name: 'rmAvailable', type: 'bool'}  
        ]);
		    
           var checkColumn = new Ext.grid.CheckColumn({
			       header: "是否可用?",
			       dataIndex: 'rmAvailable',
			       width: 65
 		   });
 		   var sm = new Ext.grid.CheckboxSelectionModel();
 		   var reader = new Ext.data.JsonReader({//后台取出数据 JOSN
 		   		totalProperty: "totalSize"//后台取出数据 JOSN
		    	,root: 'rooms'
				,autoLoad:true
				,fields:[
				'isNew'
				,'rmArea'
				,{name:'rmAvailable',type:'boolean'}
				,'rmFloor','rmId'
				,{name:'rmPrctPrice',type:'float'}
				,{name:'rmState',type:'int'}
				,'rmTelphone'
				,'rmCatalog'
				,'roomInfoStateAsColor'
				,'rmPicture'
				,'rmPrctDiscount'
			]});
 		   
          var ds = new Ext.data.Store({//数据源，取数据
				url:'basicsetting.htm?action=listAllRooms'
				,reader: reader
				  
    }); //end of store
        var fm = Ext.form;
        var cm = new Ext.grid.ColumnModel([
        	sm
        ,{
           id:'rmId',
           header: "房间号",
           dataIndex: 'rmId',
           width: 100,
           align: 'center',
           editor: new fm.TextField({
               allowBlank: false
           })
        },{
           header: "区域",
           dataIndex: 'rmArea',
           width: 100,
           align: 'center',
           editor: new fm.TextField({
               allowBlank: false
           })
        },{
           header: "楼层",
           dataIndex: 'rmFloor',
           width: 70,
           align: 'center',
           editor: new fm.NumberField({
               allowBlank: false,
               allowNegative: false,
               maxValue: 100000
           })
        },{
           header: "房间类别",　　//异步加载房间类型
           dataIndex: 'rmCatalog',
           width: 130,
           align: 'center',
           editor: new Ext.form.ComboBox({
           	    name:'rmCatalog'
               ,triggerAction: 'all'
               ,mode:'remote'
               ,editable: false
               ,lazyRender: true
               ,displayField:'rmCatalog'
               //,forceSelection: true
               ,store:new Ext.data.JsonStore({
                           id:'catalog'
                           ,root:'rows'
                           ,url:'basicsetting.htm?action=showAllRoomCatalogName'
                           ,fields:[
                              {name: 'rmCatalog'}
                            ]
                   })
            })
        },{
           header: "房间状态",
           dataIndex: 'rmState',
           width: 130,
           renderer:state,
           align: 'center',
           editor: new Ext.form.ComboBox({
	               typeAhead: true,
	               triggerAction: 'all',
	               transform:'rmState',
	               lazyRender:true
	               //,listClass: 'x-combo-list-small'
            	})
        },{
           header: "实际价格",
           dataIndex: 'rmPrctPrice',
           width: 70,
           align: 'center',
           renderer: function(v, params, record){
					  return  Ext.util.Format.cnMoney(record.data.rmPrctPrice);},
           editor: new fm.NumberField({
               allowBlank: false,
               allowNegative: false,
               maxValue: 100000
           })
        },{
           header: "实际折扣",
           dataIndex: 'rmPrctDiscount',
           width: 70,
           align: 'center',
           renderer: function(v, params, record){
					  return  Ext.util.Format.cnMoney(record.data.rmPrctDiscount);},
           editor: new fm.NumberField({
               allowBlank: false,
               allowNegative: false,
               maxValue: 100000
           })
        },{
           header: "分机电话",
           dataIndex: 'rmTelphone',
           width: 70,
           align: 'center',
           editor: new fm.NumberField({
               allowBlank: false,
               allowNegative: false
           })
        },{
           header: "房间图片",
           dataIndex: 'rmPicture',
           width: 95,
           align: 'center',
           renderer:picRender,
           editor: new Ext.form.ComboBox({
	              displayField:'roompic'
				  ,mode:'local'
				  ,triggerAction: 'all' //需加
				  ,editable:false
				  ,store:new Ext.data.SimpleStore({
				  fields:['roompic']
						,data:[
							['标准间'],['单人间']
							]
				})})
        },
        checkColumn
     ]);//end of cm
     
	        Ext.apply(this,{
	        	//title:'客房'
				//,layout:'fit'
			    border:false
			    ,loadMask:true
	        	,tbar: [{
		            text: '添加客房'
		            ,iconCls:'icon-edit'
		            ,handler : function(){
		                	var p = new Plant({
		                     isNew: '1'
		                    ,rmId: '10000'
		                    ,rmArea: '0'
		                    ,rmFloor: '0'
		                    ,rmCatalog: '标准间'
		                    ,rmState: '空闲'
		                    ,rmPrctPrice: 0
		                    ,rmPrctDiscount: 0
		                    ,rmTelphone: 0
		                    ,rmPicture: 'public/images/rooms/standardroom.gif'
		                    ,rmAvailable: true
		                });
		                this.stopEditing();
		                ds.insert(0, p);
		                this.startEditing(0, 0);
		            }.createDelegate(this)
		        },'-',{
	                text: "保存数据"
	                ,iconCls:'icon-save'
	                ,handler: function()
	                {
	                	var record;
	                 	var grid = this.getStore();
	                 	grid.each(function(rs){  
					      console.log(rs.get('isNew'));  //very cool using this way
					      
					      if(rs.get('isNew')=='1'){
							record = rs;
							console.log(record.data);
							this.jsonData = Ext.util.JSON.encode(record.data);
					      	Ext.Ajax.request({
							   url: 'basicsetting.htm?action=dealRoomAddRequest',
							  
							   success: function(){
							   		console.log("success");
							   		ds.reload();
							   },
							   failure: function(){
							   	console.log("failure");
							   	Ext.Msg.alert("错误","更新数据库失败,请重新操作.");
							   }
							   ,params:{json:this.jsonData} 
							   ,waitMsg:'保存数据中...'
							});
					      } else if(rs.dirty){
					         console.log("dirty data,so it is should be update");
					         record = rs;
							 this.jsonData = Ext.util.JSON.encode(record.data);
					      	　Ext.Ajax.request({
							   url: 'basicsetting.htm?action=dealRoomUpdateRequest',
							   success: function(){
							   		console.log("success");
							   		ds.reload();
							   },
							   failure: function(){
							   	console.log("failure");
							   	Ext.Msg.alert("错误","更新数据库失败,请重新操作.");
							   }
							   ,params:{json:this.jsonData}  
							   ,waitMsg:'保存数据中...'
							});
					      } else {
					      	console.log("do nothing");
					      }
					});  
					grid.commitChanges();  
	                }.createDelegate(this)
	            },'-'
					,{
						 text:'删除选中客房'
						,id:'delGuestBtn'
						,iconCls:'icon-delete'
						,minWidth:'50'
						,handler:function(){
				
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
					},'-',{
	                text: "刷新数据"
	                ,iconCls:'icon-redo'
	                ,handler: function()
	                {
	                	ds.reload();
	                }.createDelegate(this)
	            },'-',{
	                text: "发送最新数据至码团"
		                ,iconCls:'icon-checkout'
		                ,handler: function()
		                {
		                	var record;
		                 	var grid = this.getStore();
		                 	grid.each(function(rs){  
						      console.log(rs.get('isNew'));  //very cool using this way
						      
						      if(rs.get('isNew')=='1'){
								record = rs;
								console.log(record.data);
								this.jsonData = Ext.util.JSON.encode(record.data);
						      	Ext.Ajax.request({
								   url: 'http://localhost:8080/MrCode/room/updateRoomInfo',
								   success: function(){
								   		console.log("success");
								   		//ds.reload();
								   		Ext.Msg.alert("成功","已成功将房间信息发送至码团.");
								   },
								   failure: function(){
								   	console.log("failure");
								   	Ext.Msg.alert("错误","更新数据库失败,请重新操作.");
								   }
								   ,params:{json:this.jsonData} 
								   ,waitMsg:'保存数据中...'
								});
						      } else if(rs.dirty){
						         console.log("dirty data,so it is should be update");
						         record = rs;
								 this.jsonData = Ext.util.JSON.encode(record.data);
						      	　Ext.Ajax.request({
						      		url: 'http://localhost:8080/MrCode/room/updateRoomInfo',
								   //url: 'basicsetting.htm?action=dealRoomUpdateRequest',
								   success: function(){
								   		console.log("success");
								   		//ds.reload();
								   		Ext.Msg.alert("成功","已成功将房间信息发送至码团.");
								   },
								   failure: function(){
								   	console.log("failure");
								   	Ext.Msg.alert("错误","更新数据库失败,请重新操作.");
								   }
								   ,params:{json:this.jsonData}  
								   ,waitMsg:'保存数据中...'
								});
						      } else {
						      	console.log("do nothing");
						      }
						});  
						grid.commitChanges();  
		                }.createDelegate(this)
		            }]
	        	,cm: cm
	        	,sm: sm
	        	,autoExpandColumn:'rmId'
        		,frame:true
        		,plugins:checkColumn
	        	,store:ds
	        	,loadMask:true
        		,clicksToEdit:1
        		,viewConfig: {
		            forceFit:true,
		            enableRowBody:true,
		            showPreview:false,
		            /*getRowClass : function(record, rowIndex, p, store){
		                if(this.showPreview){
		                    p.body = '<div><img src='+record.data.rmPicture+'></div>';
		                    return 'x-grid3-row-expanded';
		                }
		                return 'x-grid3-row-collapsed';
		            }*/
	      	  },
	        	//,title:'客房设置'
	        });
	        /*this.bbar = new Ext.PagingToolbar({ 
		         pageSize:5, 
		         store: this.getStore(), 
		         displayInfo:true, 
		         displayMsg:'Displaying documents {0} - {1} of {2}', 
		         emptyMsg:'<strong>No data to display</strong>'
	    	}); */
	        Neo.basicSetting.Room.superclass.initComponent.apply(this,arguments);
	        ds.load();
		}
		,onRender:function(){
			Neo.basicSetting.Room.superclass.onRender.apply(this,arguments);
		}
		,deleteSelectedRows:function(rds){
			console.log(rds);
	   		var ds = this.getStore();
	   		Ext.Ajax.request({
				   url: 'basicsetting.htm?action=dealRoomDelRequest',
				   success: function(){
				   		console.log("success");
				   		ds.reload();
				   },
				   failure: function(action){
				   	if(action.failureType == 'server'){ 
	               		obj = Ext.util.JSON.decode(action.response.responseText); 
	                	Ext.Msg.alert('错误:', obj.errors.reason); 
	                }
				   	console.log("failure");
				   },
				   params:{json:rds}
			});
		}

});
Ext.grid.CheckColumn = function(config){
    Ext.apply(this, config);
    if(!this.id){
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};

Ext.grid.CheckColumn.prototype ={
    init : function(grid){
        this.grid = grid;
        this.grid.on('render', function(){
            var view = this.grid.getView();
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);
    },

    onMouseDown : function(e, t){
        if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
            e.stopEvent();
            var index = this.grid.getView().findRowIndex(t);
            var record = this.grid.store.getAt(index);
            record.set(this.dataIndex, !record.data[this.dataIndex]);
            console.log(record.get('isNew'));
        }
    },

    renderer : function(v, p, record){
        p.css += ' x-grid3-check-col-td'; 
        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
    }
};

Ext.reg('room',Neo.basicSetting.Room);