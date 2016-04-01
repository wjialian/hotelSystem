Ext.namespace("Neo.frontdesk");
Neo.frontdesk.HistoryData = Ext.extend(Ext.grid.GridPanel,{
			        initComponent: function(){
			        	
			        	Ext.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field){
							   return v + (record.data.blancementMoney);
};
			        	function change(val){
					        if(val == '跑单'){
					            return '<span style="color:red;">' + '失败' + '</span>';
					        }else{
					            return '<span style="color:green;">' + '成功' + '</span>';
					        }
					    };
					    
					    function timeFormat(val){
					    	var date = val.split(' ');
					    	return date[0];
					    }
					    
					   Ext.util.Format.cnMoney = function(v){
								v = (Math.round((v-0)*100))/100;
								v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
								return ('￥' + v).replace(/\./, '.');
						};
					    
						
						var reader =new Ext.data.JsonReader({
								totalProperty: "totalSize"
       		    			   ,root: "data"
       		    			   ,fields:[
       		    			    {name: 'ghGuestId'}
						       ,{name: 'ghGuestName'}
						       ,{name: 'ghGuestCardId'}
						       ,{name: 'ghCioOrderId'}
						       ,{name: 'ghPrctOutDateTime'}
						       ,{name: 'ghCioState'}
						       ,{name: 'ghPaidMoney',type:'float'}
						       ,{name: 'ghRemark'}
					    		]});
						
			        	var ds = new Ext.data.GroupingStore({
			        		 url: 'guesthistoryctrl.htm?action=listAllHistoryInformation'
			            	,reader: reader
				            ,sortInfo:{field: 'ghCioOrderId', direction: "ASC"}
			    			,groupField:'ghGuestName'
			});
				 		var expander = new Ext.grid.RowExpander({
						     tpl : new Ext.Template(
						          '<p><b>客人姓名:</b> {ghGuestName}</p><br>',
						          '<p><b>备注:</b> {ghRemark}</p>'
						      )
			});
			        	Ext.apply(this,{
				        	collapsible: true
				        	,tbar:[
						    '-'
							,{
								 text:'显示全部客史档案'
								,id:'showAllGuestHistoryBtn'
								,iconCls:'icon-reserv'
								,handler:function(){
									ds.load({params:{start:0, limit:8}});
									Ext.ux.Toast.msg("提示","双击选中的记录可以查看该客户更详细客史的信息");
								}
							}]
					        ,animCollapse: false
					        ,iconCls: 'icon-grid'
					        ,store: ds
					        ,loadMask:true
					        ,cm: new Ext.grid.ColumnModel([
								expander
					         ,{id:'guestName',header: "姓名", width: 40, sortable: true, dataIndex: 'ghGuestName'}
					         //,summaryType: 'count', hideable: false
				             //,summaryRenderer: function(v, params, data){
				             //         return ('(总共' + v +'次交易)');}}
					         ,{header: "交易单号", width: 20, sortable: true, dataIndex: 'ghCioOrderId'}
					         //,{header: "交易状态", width: 20, sortable: true, dataIndex: 'blancementType'}
					         ,{header: "交易时间", width: 20, sortable: true, renderer:timeFormat, dataIndex: 'ghPrctOutDateTime'}
					         ,{header: "交易结果", width: 20, sortable: true, renderer:change,dataIndex: 'ghCioState'}
					         ,{header: "交易金额", width: 20, sortable: true,dataIndex: 'ghPaidMoney',
					         renderer: function(v, params, record){
					         	return  Ext.util.Format.cnMoney(record.data.ghPaidMoney);}
					         }
					         //,summaryType:'totalCost'
               				 //,summaryRenderer: Ext.util.Format.cnMoney}
					        ])
					        ,view: new Ext.grid.GroupingView({
					             forceFit:true
					            //,groupTextTpl: '{text} (总共有{[values.rs.length]}次交易)'
								,getRowClass : function(r, idx, rowParams, ds){
											if((idx%2)==1){
											  return "x-orange-class";
										    }else{
											  return "x-yellow-class";
											}
							     }
					        })//new Ext.grid.GroupSummary(),
					        ,plugins: [expander/*,new Ext.ux.grid.Search({
					             mode:'local'
					            ,iconCls:false
					            ,dateFormat:'m/d/Y'
					            ,minLength:2
					        })*/]
			        	});
				        this.bbar = new Ext.PagingToolbar({
				             pageSize: 10
				            ,store: ds
				            ,displayInfo: true
				            ,displayMsg: '显示记录 {0} - {1} 总共有 {2}条'
				            ,emptyMsg: "没有查询到任何数据"
				        });
				     Neo.frontdesk.HistoryData.superclass.initComponent.apply(this,arguments);
			        //listen event below init function
			        this.on({"dblclick":this.dblclick});
			        this.on({"click":this.onSetGuestId});
			        }
			        ,onSetGuestId:function(){
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
			        	this.guestDetailGrid = Ext.getCmp('guestdetailgrid-historyview');
			        	this.paymentDetailGrid = Ext.getCmp('paymentdetailgrid-historyview');
			        	this.guestDetailGrid.setGuestId(record.get('ghGuestId'));
			        	this.paymentDetailGrid.setCioOrderId(record.get('ghCioOrderId'));
			        	this.paymentDetailGrid.setGuestId(record.get('ghGuestId'));
			        	console.log(record.get('ghCioOrderId'));
			        }
			        ,dblclick :function(){
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
			        	this.showWinForm(record);
			        }
			        ,dataReload:function(){
			        	this.getStore().reload({params:{start:0, limit:8}});
			        }
			        ,showWinForm:function(record){
			        	var form = new Ext.FormPanel({
					        labelAlign: 'top',
					        frame:true,
					        bodyStyle:'padding:5px 5px 0',
					        width: 600,
					        items: [
					           	{
					            layout:'column',
					            items:[{
					                columnWidth:.5,
					                layout: 'form',
					                items: [{
					                    xtype:'textfield'
					                    ,fieldLabel: '客户姓名'
					                    ,disabled:true
					                    ,name: 'guestName'
					                    ,id:'ghGuestNameFrom'
					                    ,anchor:'95%'
					                }
					                ,{
					                    xtype:'textfield'
					                    ,fieldLabel: '交易单号'
					                    ,disabled:true
					                    ,name: 'ghCioOrderId'
					                    ,id:'ghCioOrderIdForm'
					                    ,anchor:'95%'
					                }]
					            },{
					                columnWidth:.5,
					                layout: 'form',
					                items: [{
					                    xtype:'combo'
					                    ,fieldLabel: '结账类型'
					                    ,name: 'blancementType'
					                    ,disabled:true
					                    ,anchor:'95%'
					                    ,id:'HDblancementType'
					                    ,allowBlank:false
										,displayField:'blancementType'
										,mode:'local'
										,editable:false
										,triggerAction: 'all'
										,store:new Ext.data.SimpleStore({
											fields:['blancementType']
											,data:[
												['结单'],['挂单'],['跑单']
															,['其他']
											]
										})
					                },{
					                    xtype:'xdatetime'
					                    ,fieldLabel: '结账日期'
					                    //,timeFormat:'H:i:s:u'
					                    //,dateFormat:'Y-m-d'
					                    //,value:new Date().format('Y-m-d')
					                    ,disabled:true
					                    ,timeFormat:"H:i:s"
						                ,timeConfig: {
						                     altFormats:"H:i:s"
						                    ,allowBlank:true    
						                }
						                ,dateFormat:'Y-m-d'
						                ,dateConfig: {
						                     altFormats:'Y-m-d|Y-n-d'
						                    ,allowBlank:true    
						                }
					                    ,name: 'ghPrctOutDateTime'
					                    ,anchor:'95%'
					                    ,id:'ghPrctOutDateTimeForm'
					                    ,timeWidth:100
					                    ,allowBlank:false
					                }]
					            }]
					        },{
					            xtype:'htmleditor'
					            ,id:'ghRemark'
					            ,fieldLabel:'备注内容'
					            ,height:200
					            ,anchor:'98%'
					        }]
					    });
					    //init formpanel
					    this.guestName = Ext.getCmp("ghGuestNameFrom");
					    this.blancementID = Ext.getCmp("ghCioOrderIdForm");
					    this.blancementType = Ext.getCmp("HDblancementType");
					    this.blancementDate = Ext.getCmp("ghPrctOutDateTimeForm");
					    this.remark = Ext.getCmp("ghRemark");
					    //console.log(guestName);
					    
					    var dateTime = record.get('ghPrctOutDateTime').split('.');
					    this.guestName.setValue(record.get('ghGuestName'));
					    this.blancementID.setValue(record.get('ghCioOrderId'));
					    this.blancementType.setValue(record.get('ghCioState'));
					    this.blancementDate.setValue(dateTime[0]);
					    this.remark.setValue(record.get('ghRemark'));
					    this.winForm = new Ext.Window({
						  	title: '客史详细信息'
						  	,id:'win-form'
							,modal: true
							,layout:'fit'
							,plain: true
			                ,width:600
			                ,draggable:false
			                ,height:500
						    ,items: form
						    ,buttons: [{
			                    text:'保存'
			                    ,id:'saveBtn'
			                    ,handler:function(){
			                    	Ext.getCmp('saveBtn').disable();
			                    	Ext.Ajax.request({
									   url: 'guesthistoryctrl.htm?action=updateHistoryInfo',
									   success: function(){
									   		console.log("success");
									   		Ext.ux.Toast.msg("提示","信息修改成功！");
									   		this.winForm.hide();
									   		this.dataReload();
									   }.createDelegate(this),
									   failure: function(form,action){
									   	console.log("failure");
									   	obj = Ext.util.JSON.decode(action.response.responseText); 
									   	Ext.ux.Toast.msg("提示",obj.reason+"请重新操作.");
									   }.createDelegate(this),
									   params:{ghGuestId:record.get('ghGuestId'),ghRemark:this.remark.getValue()}
									});
			                    }.createDelegate(this)
			                },{
			                    text: '关闭'
			                    ,handler: function(){
			                       //winForm.hide();
			                       this.winForm.hide();
			                    }.createDelegate(this)
                				}]
						   });
						this.winForm.show(this);
			        }
});

Ext.reg('historydata',Neo.frontdesk.HistoryData);