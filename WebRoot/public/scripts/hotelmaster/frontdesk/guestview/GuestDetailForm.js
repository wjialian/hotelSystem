Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");
Neo.frontdesk.GuestDetailForm = function(){
	Neo.frontdesk.GuestDetailForm.superclass.constructor.call(this);
	
}
Neo.frontdesk.GuestDetailForm = Ext.extend(Ext.FormPanel,{
	title: '客人详细信息'
    ,frame:true
    ,border:false
    ,labelWidth: 70
	,initComponent: function(){
			function timeFormat(val){
					var date = val.split(' ');
					return date[0];
			}
			
		var ds = new Ext.data.Store({
							url: 'guestctrl.htm?action=dealGuestHistoryQueryRequest'
						    ,reader: new Ext.data.JsonReader({
						    	totalProperty: "totalSize"
				       		    ,root: "data"
								,fields:[
									,'balancementId'
									,'balancementTime'		
									,'balancementExpenses'
									,'balancementResult'	            
									]
			})
		});
		Ext.apply(this,{
			buttons:[
				{
					id:'addBtn'
					,hidden:false
					,text:'添加'
					,iconCls:'icon-checkin'
				}
				,{
					id:'modifyBtn'
					,hidden:true
					,disabled:true
					,iconCls:'icon-edit'
					,text:'修改'
				}
				,{
					id:'cancelBtn'
					,hidden:false
					,iconCls:'icon-redo'
					,text:'重置'
				}
				,{
					id:'checkBtn'
					,hidden:false
					,iconCls:'icon-save'
					,text:'保存数据'
				}
			]
			,items:[
		       {
					xtype: 'fieldset'
					,autoHeight:true
					,collapsible: true
					,title:'客人详细信息'
					,items:[
						{
							layout:'column'
							,items:[
								{
								   xtype:'textfield'
								   ,name: 'gtId'
								   ,id: 'guestId' + this.id						              
								   ,hidden:true
								}
								,{
									columnWidth:.50
									,layout:'form'
									,labelWidth: 40
									,border:false
									,items:[
									   {
											fieldLabel: '姓名'
							                ,xtype:'textfield'
							                ,name: 'gtName'
							                ,id: 'guestName' + this.id
							                ,allowBlank: false
							                ,anchor:'95%'
										}
										,{
											fieldLabel:'证件号'
											,xtype:'numberfield'
											,name:'gtCardId'
											//,emptyText:'此项为必填项'
											,vtype:'chinaCardId'
											,id:'guestCardId' + this.id
											,allowBlank:false
											,anchor:'95%' //nessasary
											//,vtype:'chinaCardId'
										},
										{
											fieldLabel:'国籍'
											,xtype:'textfield'
											,name:'gtCountry'
											,id:'guestCountry' + this.id
											,allowBlank:false
											,anchor:'95%' //nessasary
											//,vtype:'chinaCardId'
										}
									]
								}
								,{
									columnWidth:.48
									,layout:'form'
									,labelWidth: 60
									,border:false
									,items:[
										{
											fieldLabel:'性别'
											,xtype:'combo'
											,name:'gtGender'
											,id:'guestGender' + this.id
											,allowBlank:false
											//,emptyText:'此项为必填项'
											,anchor:'95%' //nessasary
											,displayField:'gtGender'
											,mode:'local'
											,editable:false
											,triggerAction: 'all'
											,store:new Ext.data.SimpleStore({
												fields:['gtGender']
												,data:[
													['男'],['女'],['保密']
												]
											})
										}
										,{
											fieldLabel: '证件类型'
							                ,xtype:'combo'
							                ,name: 'gtCardCatalog'
							                //,emptyText:'此项为必填项'
							                ,id:'cardCatalog' + this.id
							                ,allowBlank: false
							                ,anchor:'95%'
							                ,displayField:'gtCardCatalog'
											,mode:'local'
											,triggerAction: 'all' //需加
											,editable:false
											,store:new Ext.data.SimpleStore({
												fields:['gtCardCatalog']
												,data:[
													['身份证'],['学生证'],['军官证']
													,['警官证'],['士兵证'],['驾照']
													,['护照'],['户口薄'],['其他']
												]
											})
										}
										,{
											fieldLabel: '客人类型'
							                ,xtype:'combo'
							                ,name: 'gtType'
							                ,id:'guestType' + this.id
							                ,allowBlank: false
							               // ,emptyText:'此项为必填项'
							                ,anchor:'95%'
							                ,displayField:'gtType'
											,mode:'local'
											,triggerAction: 'all' //需加
											,editable:false
											,store:new Ext.data.SimpleStore({
												fields:['gtType']
												,data:[
													['普通客人'],['会员'],['贵宾']
													,['协议单位']
												]
											})
										}
									]
								}
							]
						}
					,{ //邮编,电话
							layout:'column'
							,items:[
								{
									columnWidth:.45
									,layout:'form'
									,labelWidth: 60
									,border:false
									,items:[
										{
											fieldLabel:'邮编'
											,xtype:'numberfield'
											,name:'gtZip'
											,id:'guestZip' + this.id
											,anchor:'95%' //nessasary
											//,vtype:'chinaCardId'
										}
									]
								}
								,{
									columnWidth:.54
									,layout:'form'
									,labelWidth: 60
									,border:false
									,items:[
										{
											fieldLabel: '电话号码'
							                ,xtype:'numberfield'
							                ,name: 'gtTelphone'
							                ,id:'guestTelphone' + this.id
							                ,anchor:'95%'
										}
									]
								}
							]
						}	
						,{ //手机号码，Email
							layout:'column'
							,items:[
								{
									columnWidth:.45
									,layout:'form'
									,labelWidth: 60
									,border:false
									,items:[
										{
											fieldLabel:'手机号码'
											,xtype:'numberfield'
											,name:'gtMobile'
											,id:'guestMobile' + this.id
											,anchor:'95%' //nessasary
											//,vtype:'chinaCardId'
										}
									]
								}
								,{
									columnWidth:.54
									,layout:'form'
									,labelWidth: 60
									,border:false
									,items:[
										{
											fieldLabel: 'Email'
							                ,xtype:'textfield'
							                ,name: 'gtEmail'
							                ,id:'guestEmail' + this.id
							                ,vtype:'email'
							                ,anchor:'95%'
										}
									]
								}
							]
						}
						,{ //家庭住址
								    columnWidth:.41
									,border:false
									,layout: 'form'
									,labelWidth: 60
									,items:[
										{
											xtype:'textfield'
											,fieldLabel: '家庭住址'
											,name: 'gtAddress'
											,id:'guestAddr' + this.id
											,anchor:'95%'
										}
									]
						}
					,{ //工作地址
									columnWidth:.41
									,border:false
									,layout: 'form'
									,labelWidth: 60
									,items:[
										{
											xtype:'textfield'
											,fieldLabel: '工作单位'
											,name: 'gtCompany'
											,id:'guestCompany' + this.id
											,anchor:'95%'
										}
									]
					  }
                   ]
				}
				,{//2
					xtype: 'fieldset'
					,autoHeight:true
					,collapsible: true
					,title:'客史资料'
					,items:[
						{
							id:'guestHistory' + this.id
							,title:'请选择要查询的用户'
							,xtype:'grid'
							,anchor:'100%'
							,frame:true
							,height:220
							,scrollOffset:5
							,store:ds
							,loadMask:true
							,columns:[
								{id:'payment',header:'交易单号',width:120,sortable:true,dataIndex:'balancementId'}
								,{header:'交易时间',width:80,sortable:true,renderer:timeFormat,dataIndex:'balancementTime'}
								,{header:'交易金额',width:80,sortable:true,dataIndex:'balancementExpenses'}
								,{header:'交易结果',width:80,sortable:true,dataIndex:'balancementResult'}
							]
							,viewConfig: {
						        forceFit: true
						        ,emptyText: "<p align='center'><font size='5'>该客户没有住宿的历史记录</font></p>"
						    	}
							,bbar:new Ext.PagingToolbar({ 
						          pageSize:2
						         ,store: ds
						         ,items:[
						                '-', {
						                pressed: true,
						                enableToggle:true,
						                text: '查询客史记录',
						                //cls: 'x-btn-text-icon details',
						                toggleHandler: function(){
						                	if(this.guestId.getValue()==''){
						                		Ext.ux.Toast.msg('提示', '请选择想要查询的用户列'); 
						                		return;
						                	}
						                	else{
						                		ds.load({params:{start:0, limit:4,gtId:this.guestId.getValue()}});
						                		ds.on({'load':function(){
						                			Ext.getCmp('guestHistory' + this.id).setTitle('客人姓名:'+this.guestName.getValue());}
						                			,scope:this})
						                		return;
						                	}
						                }.createDelegate(this)
						          }]
						    })
						}
                   	]
				}
			]
		});
		Neo.frontdesk.GuestDetailForm.superclass.initComponent.apply(this,arguments);
		 this.guestId = Ext.getCmp('guestId' + this.id);
		 this.guestName = Ext.getCmp('guestName' + this.id);
		 this.guestGender = Ext.getCmp('guestGender' + this.id);
		 this.guestCardId = Ext.getCmp('guestCardId' + this.id);
		 this.guestCardCatalog = Ext.getCmp('cardCatalog' + this.id);
		 this.guestCountry = Ext.getCmp('guestCountry' + this.id);
		 this.guestType = Ext.getCmp('guestType' + this.id);
		 this.guestAddr = Ext.getCmp('guestAddr' + this.id);
		 this.guestTelphone = Ext.getCmp('guestTelphone' + this.id);
		 this.guestMobile = Ext.getCmp('guestMobile' + this.id);
		 this.guestZip = Ext.getCmp('guestZip' + this.id);
		 this.guestEmail = Ext.getCmp('guestEmail' + this.id);
		 this.guestCompany = Ext.getCmp('guestCompany' + this.id);
		 this.disableCmp();  //init
		 /*******************/
		 this.modifyBtn = Ext.getCmp('modifyBtn');
		 this.addBtn = Ext.getCmp('addBtn');
		 this.checkBtn = Ext.getCmp('checkBtn');
		 this.cancelBtn = Ext.getCmp('cancelBtn');
		 this.checkBtn.disable();
		 this.cancelBtn.disable();
		 this.action = 0;
		 this.modifyBtn.on({'click':this.onModifyBtnClick,scope:this});
		 this.addBtn.on({'click':this.onAddBtnClick,scope:this});
		 this.checkBtn.on({'click':this.onCheckClick,scope:this});
		 this.cancelBtn.on({'click':this.onCancelClick,scope:this});
		 this.on({
			'actioncomplete':function(form, action){
				if (action.failureType == 'client'){
					Ext.ux.Toast.msg('提示','登记信息不正确，请核对后重新操作');
				}
				}
			});
		 /********************************/
		 this.addEvents({'onReloadData':true});
	}
	,onRender:function() {
			Neo.frontdesk.GuestDetailForm.superclass.onRender.apply(this,arguments);
	}
	,beforeDestroy: function(){
		Ext.FormPanel.superclass.beforeDestroy.call(this);
	}
	,showBtn:function(){
		//this.addBtn.hidden = false;
		this.modifyBtn.hidden = false;
		this.checkBtn.hidden = false;
		//this.cancelBtn.hidden = false;
	}
	,loadRecord:function(gtCardId,gtName){
		//console.dir(this.form);
		this.setBlankValue();
		//this.getForm().trackResetOnLoad=false;
		this.form.load({
			 url:'guestctrl.htm?action=findGuestByGtCardId'
			,waitMsg:'Loading'
			,params:{gtCardId:gtCardId}
			,method:'POST'
			,success:function(form,action){
				obj = Ext.util.JSON.decode(action.response.responseText);
				//Ext.Msg.alert('id:', obj.data.gtName);
				Ext.ux.Toast.msg('提示', "已查询到客户"+obj.data.gtName+"的详细信息"); 
			}
			,failure:function(form,action){
				if(action.failureType == 'load'){ 
	               		obj = Ext.util.JSON.decode(action.response.responseText); 
	                	Ext.ux.Toast.msg('提示', obj.reason+"<br>请进入客人详细页面添加该客户</br>");
	                	this.onAddBtnClick();
	                	this.guestName.setValue(gtName);
	                	this.guestCardId.setValue(gtCardId);
				}
			}.createDelegate(this) });
	}
	,refreshGuestDetail:function(record){
		 /**************************************************/
		 //combobox显示不正常，Telphone和zip显示不出数据 
		console.log(record);
		if(this.action ==1)
		{
			return;
		} else{
			 this.guestId.setValue(record.get('gtId'));
			 this.guestName.setValue(record.get('gtName'));
			 this.guestGender.setValue(record.get('gtGender'));
			 this.guestCardId.setValue(record.get('gtCardId'));
			 this.guestCardCatalog.setValue(record.get('gtCardCatalog'));
			 this.guestCountry.setValue(record.get('gtCountry'));
			 this.guestType.setValue(record.get('gtType')); 
			 this.guestZip.setValue(record.get('gtZip'));
			 this.guestTelphone.setValue(record.get('gtTelphone'));
			 this.guestMobile.setValue(record.get('gtMobile'));
			 this.guestEmail.setValue(record.get('gtEmail'));
			 this.guestAddr.setValue(record.get('gtAddress'));
			 this.guestCompany.setValue(record.get('gtCompany'));
			 this.guestCreateTime = record.get('gtCreateTime');
			 //添加创建时间textfield
		}
	}
	,setBlankValue:function(){
		 this.guestId.setValue();
		 this.guestName.setValue();
		 this.guestGender.setValue('男');
		 this.guestCardId.setValue();
		 this.guestCardCatalog.setValue('身份证');
		 this.guestCountry.setValue();
		 this.guestType.setValue('普通客人'); 
		 this.guestZip.setValue();
		 this.guestTelphone.setValue();
		 this.guestMobile.setValue();
		 this.guestEmail.setValue();
		 this.guestAddr.setValue();
		 this.guestCompany.setValue();
	}
	,disableCmp:function(){
		this.guestName.disable();
		this.guestGender.disable();
		this.guestCardId.disable();
		this.guestCardCatalog.disable();
		this.guestCountry.disable();
		this.guestType.disable();
		this.guestZip.disable();
		this.guestTelphone.disable();
		this.guestMobile.disable();
		this.guestEmail.disable();
		this.guestAddr.disable();
		this.guestCompany.disable();
	}
	,enableCmp:function(){
		this.guestName.enable();
		this.guestGender.enable();
		this.guestCardId.enable();
		this.guestCardCatalog.enable();
		this.guestCountry.enable();
		this.guestType.enable();
		this.guestZip.enable();
		this.guestTelphone.enable();
		this.guestMobile.enable();
		this.guestEmail.enable();
		this.guestAddr.enable();
		this.guestCompany.enable();
	}
	,onModifyBtnClick:function(){
		this.addBtn.disable();
		this.checkBtn.setText('确定修改');
		this.modifyBtn.disable();
		this.cancelBtn.enable();
		this.checkBtn.enable();
		this.enableCmp();
		this.action = 2;
	}
	,onAddBtnClick:function(){
		//do something
		this.setBlankValue();
		this.enableCmp();
		this.addBtn.disable();
		this.modifyBtn.disable();
		this.cancelBtn.enable();
		this.checkBtn.enable();
		this.action = 1;
	}
	,enableModifyBtn:function(){
		if(this.action ==1)
		{
			return;
		} else{
			this.modifyBtn.enable();
		}
	}
	,onCancelClick:function(){
		this.action = 0;
		this.disableCmp();
		this.setBlankValue();
		this.addBtn.enable();
		this.modifyBtn.disable();
		this.cancelBtn.disable();
		this.checkBtn.disable();
	}
	,onCheckClick:function(){
		this.checkBtn.setText('保存数据');;
		var modify = null;
		if(this.action ==1)
		{
			var records = {gtName:this.guestName.getValue()
						,gtGender:this.guestGender.getValue()
						,gtCardId : this.guestCardId.getValue()
						,gtCardCatalog : this.guestCardCatalog.getValue()
						,gtCountry : this.guestCountry.getValue()
						,gtType : this.guestType.getValue()
						,gtZip : this.guestZip.getValue()
						,gtTelphone : this.guestTelphone.getValue()
						,gtMobile : this.guestMobile.getValue()
						,gtEmail : this.guestEmail.getValue()
						,gtAddress : this.guestAddr.getValue()
						,gtCompany : this.guestCompany.getValue()};
			modify = '0';
			console.log(records)
			
		}
		else{
		    var records = {gtId:this.guestId.getValue()
		    			,gtName:this.guestName.getValue()
						,gtGender:this.guestGender.getValue()
						,gtCardId : this.guestCardId.getValue()
						,gtCardCatalog : this.guestCardCatalog.getValue()
						,gtCountry : this.guestCountry.getValue()
						,gtType : this.guestType.getValue()
						,gtZip : this.guestZip.getValue()
						,gtTelphone : this.guestTelphone.getValue()
						,gtMobile : this.guestMobile.getValue()
						,gtEmail : this.guestEmail.getValue()
						,gtAddress : this.guestAddr.getValue()
						,gtCompany : this.guestCompany.getValue()
						,gtCreateTime : this.guestCreateTime };
		    modify = '1';
			console.log(records);
		}
		
		
		var jsonData = Ext.util.JSON.encode(records);
		console.log(jsonData);

		this.getForm().submit({
			url:'guestctrl.htm?action=dealGuestFromRequest'
			,params:{json:jsonData,update:modify}
			,method:'POST'
			,success:function(){
				this.fireEvent('onReloadData');
				Ext.ux.Toast.msg('提示', '客人信息更新成功'); 
			}.createDelegate(this)
			,failure:function(form,action){
				console.log(action.failureType);
				if(action.failureType == 'client'){
                	Ext.ux.Toast.msg('提示','登记信息不正确，请核对后重新操作');
                }
				//alert("Err when post data to guestControll");
			}
			,waitMsg:'保存数据中...'
		})
		this.disableCmp();
		this.setBlankValue();
		this.addBtn.enable();
		this.modifyBtn.disable();
		this.cancelBtn.disable();
		this.checkBtn.disable();
	}
});
Ext.reg('guestdetailform',Neo.frontdesk.GuestDetailForm)