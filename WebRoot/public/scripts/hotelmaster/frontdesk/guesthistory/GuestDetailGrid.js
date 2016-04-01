Ext.namespace("Neo.frontdesk");
Neo.frontdesk.GuestDetailGrid = Ext.extend(Ext.grid.GridPanel,{
	initComponent: function(){
			var cm = new Ext.grid.ColumnModel([
	            {id:'name',header: "姓名", width: 20, sortable: true, dataIndex: 'gtName'}
	            ,{header: "性别", width: 10, sortable: true, dataIndex: 'gtGender'}
	            ,{header: "有效证件类型", width: 22, sortable: true, dataIndex: 'gtCardCatalog'}
	            ,{header: "有效证件号", width: 30, sortable: true, dataIndex: 'gtCardId'}
	            ,{header: "国籍", width: 15, sortable: true, dataIndex: 'gtCountry'}
	            ,{header: "客人类型", width: 20, sortable: true, dataIndex: 'gtType'}
	            ,{header: "邮编", width: 20, sortable: true, dataIndex: 'gtZip'}
	            ,{header: "电话号码", width: 20, sortable: true, dataIndex: 'gtTelphone'}
	            ,{header: "手机号码", width: 20, sortable: true, dataIndex: 'gtMobile'}
	            ,{header: "Email地址", width: 30, sortable: true, dataIndex: 'gtEmail'}
	            ,{header: "家庭住址", width: 40, sortable: true, dataIndex: 'gtAddress'}
	            ,{header: "工作地址", width: 40, sortable: true, dataIndex: 'gtCompany'}
       		 ]);
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
	   		var ds = new Ext.data.Store({
							url: 'guestctrl.htm?action=queryGuestInfo'
						    ,reader: reader/*new Ext.data.JsonReader({
						    	totalProperty: "totalSize"
				       		    ,root: "data"
								,fields:[
									,'checkinOrderId'
									,'checkinOrderTime'		
									,'checkinOrderExpenses'
									,'checkinOrderResult'	            
									]
			})*/
		});
		Ext.apply(this,{
			title:'客人详细信息'
			//,layout:'fit'
			,border:false
			,store: ds
		    ,cm: cm
		    ,loadMask: true
		    ,viewConfig: {
		           forceFit:true
		           ,getRowClass : function(r, idx, rowParams, ds){
									if((idx%2)==1){
									  return "x-orange-class";
								  }else{
									  return "x-yellow-class";
								  }
						  }  
		        }
		    ,iconCls:'icon-grid'
		 });
		 this.bbar = new Ext.PagingToolbar({ 
         pageSize:2
         ,store: ds
         ,displayInfo:true
         ,displayMsg:'Displaying documents {0} - {1} of {2}'
         ,emptyMsg:'<strong>No data to display</strong>'
         ,items:[
                '-', {
                pressed: true,
                enableToggle:true,
                text: '显示客户的详细信息',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(){
                	if(this.guestId=='undefined'){
					Ext.ux.Toast.msg('提示', '请选择想要查询的用户列'); 
						return;
					}
					else{
					    ds.load({params:{start:0, limit:4,value:this.guestId}});
						return;
						}
					}.createDelegate(this)
          }]
    	});
		Neo.frontdesk.GuestDetailGrid.superclass.initComponent.apply(this,arguments);
		this.guestId = 'undefined';
	}
	,setGuestId:function(guestId){
		this.guestId = guestId;
		//console.log(this.guestId);
	}
});
Ext.grid.guestdata= [
    ['2','espera','男','身份证','21314121213','中国', '会员','312100','123146123','4154121','espera@yahoo.com','江西省南昌市下水道','下水道']
];
Ext.reg('guestdetailgrid',Neo.frontdesk.GuestDetailGrid);