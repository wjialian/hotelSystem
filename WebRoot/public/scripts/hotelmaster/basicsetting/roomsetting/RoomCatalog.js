Ext.namespace("Neo.basicSetting");

  Neo.basicSetting.RoomCatalog = Ext.extend(Ext.grid.EditorGridPanel,{
		initComponent:function() {  
     	 var Plant = Ext.data.Record.create([
            {name: 'rcId'}
           ,{name: 'rcName'}
           ,{name: 'rcBedNumber'}
           ,{name: 'rcPrePrice'}
           ,{name: 'rcPreDiscount'}
           ,{name: 'rcHourBasePrice'}   
           ,{name: 'rcPerHourPrice'}
        ]);
        var sm = new Ext.grid.CheckboxSelectionModel();
 		   var reader = new Ext.data.JsonReader({
		    	root: 'rooms'
				,autoLoad:true
				,fields:[
				'rcId'
				,{name:'rcName'}
				,'rcBedNumber','rcPrePrice'
				,'rcPreDiscount'
				,'rcHourBasePrice'
				,'rcPerHourPrice'
			]});
 		   
          var ds = new Ext.data.Store({
				url:'basicsetting.htm?action=showAllRoomCatalog'
				,reader: reader
				  
    }); //end of store
        var fm = Ext.form;
        var cm = new Ext.grid.ColumnModel([
        	sm
        ,{
           id:'rcName',
           header: "房间类别代号",
           dataIndex: 'rcName',
           width: 220,
           align: 'center',
           editor: new fm.TextField({
               allowBlank: false
           })
        },{
           header: "房间类别名称",
           dataIndex: 'rcBedNumber',
           width: 200,
           align: 'center',
           editor: new fm.TextField({
               allowBlank: false
           })
        },{
           header: "正常价格",
           dataIndex: 'rcPrePrice',
           width: 160,
           align: 'right',
           renderer: function(v, params, record){
					  return  Ext.util.Format.cnMoney(record.data.rcPrePrice);},
           editor: new fm.NumberField({
               allowBlank: false,
               allowNegative: false,
               maxValue: 100000
           })
        },{
           header: "码团价格",
           dataIndex: 'rcPreDiscount',
           width: 160,
           align: 'right',
           renderer: function(v, params, record){
					  return  Ext.util.Format.cnMoney(record.data.rcPreDiscount);},
           editor: new fm.NumberField({
               allowBlank: false,
               allowNegative: false,
               maxValue: 100000
           })
        },{
           header: "计时最低价",
           dataIndex: 'rcHourBasePrice',
           width: 160,
           align: 'right',
           renderer: function(v, params, record){
					  return  Ext.util.Format.cnMoney(record.data.rcHourBasePrice);},
           editor: new fm.NumberField({
               allowBlank: false,
               allowNegative: false,
               maxValue: 100000
           })
        },{
           header: "计时每小时价",
           dataIndex: 'rcPerHourPrice',
           width: 160,
           align: 'center',
          renderer: function(v, params, record){
					  return  Ext.util.Format.cnMoney(record.data.rcPerHourPrice);},
           editor: new fm.NumberField({
               allowBlank: false,
               allowNegative: false,
               maxValue: 100000
           })
        }
     ]);//end of cm
	        Ext.apply(this,{
				border:false
			    ,loadMask:true
	        	,tbar: [{
		            text: '添加客型'
		            ,iconCls:'icon-edit'
		            ,handler : function(){
		                	var p = new Plant({
		                		'rcId' : '0'
					           ,'rcName' : '000'
					           ,'rcBedNumber': '标准间'
					           ,'rcPrePrice' : 0
					           ,'rcPreDiscount' : 0
					           ,'rcHourBasePrice' : 0
					           ,'rcPerHourPrice': 0
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
					      console.log(rs.get('rcId'));  //very cool using this way
					      
					      if(rs.get('rcId')=='0'){
							record = rs;
							console.log(record.data);
							this.jsonData = Ext.util.JSON.encode(record.data);
					      	Ext.Ajax.request({
							   url: 'basicsetting.htm?action=dealRoomCatalogAddRequest',
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
							   url: 'basicsetting.htm?action=dealRoomCatalogUpdateRequest',
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
						 text:'删除选中客型'
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
						      console.log(rs.get('rcId'));  //very cool using this way
						      
						      if(rs.get('rcId')=='0'){
								record = rs;
								console.log(record.data);
								this.jsonData = Ext.util.JSON.encode(record.data);
						      	Ext.Ajax.request({
								   url: 'http://localhost:8080/MrCode/room/updateRoomTypeInfo',
								   success: function(){
								   		console.log("success");
								   		Ext.Msg.alert("成功","已成功将房间类型信息发送至码团.");
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
								   url: 'http://localhost:8080/MrCode/room/updateRoomTypeInfo',
								   success: function(){
								   		console.log("success");
								   		Ext.Msg.alert("成功","已成功将房间类型信息发送至码团.");
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
	        	//,autoExpandColumn:'rcName'
        		,frame:true
	        	,store:ds
	        	,loadMask:true
        		,clicksToEdit:1
	        	//,title:'客房设置'
	        });
	        Neo.basicSetting.RoomCatalog.superclass.initComponent.apply(this,arguments);
	        ds.load();
		}
		,onRender:function(){
			Neo.basicSetting.RoomCatalog.superclass.onRender.apply(this,arguments);
		}
		,deleteSelectedRows:function(rds){
			console.log(rds);
	   		var ds = this.getStore();
	   		Ext.Ajax.request({
				   url: 'basicsetting.htm?action=dealRoomCatalogDelRequest',
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

Ext.reg('roomcatalog',Neo.basicSetting.RoomCatalog);