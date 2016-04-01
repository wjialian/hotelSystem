Ext.namespace("Neo.basicSetting");

  Neo.basicSetting.OperatorData = Ext.extend(Ext.grid.EditorGridPanel,{
		initComponent:function() {  
     	 var Plant = Ext.data.Record.create([
     	    {name: 'isNew'}
           ,{name: 'opUserName'}
           ,{name: 'opPassword'}
           ,{name: 'opPrivilege'}
           ,{name: 'opAddress'}
           ,{name: 'opName'}
           ,{name: 'opTelephone'}   
           ,{name: 'opMobile'}
           ,{name: 'opZip'}
           ,{name: 'opCreateTime'}
        ]);
        function privilege(val){
		  	switch(val){
		  	case 0:
		  		val = '普通权限';
		  		break;
		  	case 255:
		  		val = '管理员权限';
		  		break;
		  	}
		  	return val;
		  }
        
        var sm = new Ext.grid.CheckboxSelectionModel();
 		   var reader = new Ext.data.JsonReader({
		    	root: 'operators'
				,autoLoad:true
				,fields:[
				 'isNew'
				,'opUserName'
				,'opPassword'
				,'opPrivilege','opAddress'
				,'opName'
				,'opTelephone'
				,'opMobile'
				,'opZip'
				,'opCreateTime'
			]});
 		   
          var ds = new Ext.data.Store({
				url:'basicsetting.htm?action=showAllOperator'
				,reader: reader
				  
    }); //end of store
        var fm = Ext.form;
        
        function timeFormat(val){
			var date = val.split(' ');
			return date[0];
		};
			
        var cm = new Ext.grid.ColumnModel([
        	sm
        ,{
           id:'opUserName',
           header: "操作员用户名",
           dataIndex: 'opUserName',
           width: 100,
           editor: new fm.TextField({
               allowBlank: false
           })
        },{
           header: "密码",
           dataIndex: 'opPassword',
           width: 100,
           align: 'center',
           editor: new fm.TextField({
               allowBlank: false
           })
        },{
           header: "权限",
           dataIndex: 'opPrivilege',
           width: 100,
           align: 'center',
           renderer:privilege,
           editor: new Ext.form.ComboBox({
	                typeAhead: true,
	                allowBlank: false,
	                triggerAction: 'all',
	                displayField:'opPrivilege'
					,mode:'local'
					,triggerAction: 'all' //需加
					,editable:false
					,store:new Ext.data.SimpleStore({
							fields:['opPrivilege']
							,data:[
								['普通权限'],['管理员权限']
							]
					})
            })
        },{
           header: "地址",
           dataIndex: 'opAddress',
           width: 200,
           align: 'center',
           editor: new fm.TextField({
               allowBlank: true
           })
        },{
           header: "姓名",
           dataIndex: 'opName',
           width: 80,
           align: 'center',
           editor: new fm.TextField({
               allowBlank: true
           })
        },{
           header: "电话",
           dataIndex: 'opTelephone',
           width: 100,
           align: 'center',
           editor: new fm.NumberField({
               allowBlank: true,
               allowNegative: false,
               maxValue: 100000
           })
       },{
           header: "手机",
           dataIndex: 'opMobile',
           width: 100,
           align: 'center',
           editor: new fm.NumberField({
               allowBlank: true,
               allowNegative: false,
               maxValue: 100000
           })
        },{
           header: "邮编",
           dataIndex: 'opZip',
           width: 80,
           align: 'center',
           editor: new fm.NumberField({
               allowBlank: true,
               allowNegative: false,
               maxValue: 100000
           })
        },{
           header: "创建时间",
           renderer:timeFormat,
           dataIndex: 'opCreateTime',
           width: 100,
           align: 'center'
         }
     ]);//end of cm
	        Ext.apply(this,{
				border:false
			    ,loadMask:true
	        	,tbar: [{
		            text: '添加操作员'
		            ,iconCls:'icon-edit'
		            ,handler : function(){
		                	var p = new Plant({
		                		  isNew: '1'
		                		,'opUserName' : 'user'
								,'opPassword': ''
								,'opAddress': ''
								,'opName':''
								,'opPrivilege': 0
								,'opTelephone': 0
								,'opMobile':0
								,'opZip':0
								,'opCreateTime' : '系统将自动生成'
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
							   url: 'basicsetting.htm?action=dealOperatorAddRequest',
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
							   url: 'basicsetting.htm?action=dealOperatorUpdateRequest',
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
						 text:'删除选中的操作员'
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
	                text: "重新加载数据"
	                ,iconCls:'icon-redo'
	                ,handler: function()
	                {
	                	ds.reload();
	                }.createDelegate(this)
	            }]
	        	,cm: cm
	        	,sm: sm
	        	,autoExpandColumn:'opUserName'
        		,frame:true
	        	,store:ds
	        	,loadMask:true
        		,clicksToEdit:1
	        	//,title:'客房设置'
	        });
	        Neo.basicSetting.OperatorData.superclass.initComponent.apply(this,arguments);
	        ds.load();
		}
		,onRender:function(){
			Neo.basicSetting.OperatorData.superclass.onRender.apply(this,arguments);
		}
		,deleteSelectedRows:function(rds){
			console.log(rds);
	   		var ds = this.getStore();
	   		Ext.Ajax.request({
				   url: 'basicsetting.htm?action=dealOperatorDelRequest',
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

Ext.reg('operatordata',Neo.basicSetting.OperatorData);