Ext.namespace("Neo.frontdesk");
Neo.frontdesk.PaymentDetailGrid = Ext.extend(Ext.grid.GridPanel,{
	initComponent: function(){
	    function timeFormat(val){
				var date = val.split(' ');
				return date[0];
		}
					    
		Ext.util.Format.cnMoney = function(v){
			v = (Math.round((v-0)*100))/100;
			v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
			return ('￥' + v).replace(/\./, '.');
		};
		
		function isReserv(val){
			if(val==""){
				return '无预定号';
			} else {
				return val;
			}
		}
		
		var cm = new Ext.grid.ColumnModel([
	            {id:'name',header: "姓名", width: 20, sortable: true, dataIndex: 'cioGuestName'}
	            ,{header: "住宿类别", width: 15, sortable: true, dataIndex: 'cioGuestCatalog'}
	            ,{header: "团队名称", width: 15, sortable: true, dataIndex: 'cioGroupName'}
	            ,{header: "住宿人数", width: 12, sortable: true, dataIndex: 'cioManNumber;'}
	            ,{header: "住宿事由", width: 25, sortable: true, dataIndex: 'cioCause'}
	            ,{header: "入住时间", width: 18, sortable: true, renderer:timeFormat,dataIndex: 'cioInDateTime'}
	            ,{header: "预计离开时间", width: 18, sortable: true, renderer:timeFormat,dataIndex: 'cioPreOutDateTime'}
	            ,{header: "实际离开时间", width: 18, sortable: true, renderer:timeFormat,dataIndex: 'cioPrctOutDateTime'}
	            ,{header: "支付类型", width: 15, sortable: true, dataIndex: 'cioPaymentModel'}
	            ,{header: "预定号", width: 30, sortable: true, renderer:isReserv,dataIndex: 'cioIsReservId'}
	            ,{header: "登记单号", width: 15, sortable: true, dataIndex: 'cioOrderId'}
	            ,{header: "总费用", width: 12, sortable: true, dataIndex: 'cioTotalRate'
	            ,renderer: function(v, params, record){
					         	return  Ext.util.Format.cnMoney(record.data.cioTotalRate);}}
	            ,{header: "操作员", width: 12, sortable: true, dataIndex: 'cioOperator'}
       		 ]);
		    var reader = new Ext.data.JsonReader({
				totalProperty: "totalSize"
				,root: "data"
				,fields:[
			     {name: 'cioId'}
		       	,{name: 'cioGuestName'}
		       	,{name: 'cioManNumber'}
		       	,{name: 'cioGuestCatalog'}
		       	,{name: 'cioGroupName'}
		       	,{name: 'cioCause'}
		       	,{name: 'cioInDateTime'}
		       	,{name: 'cioPreOutDateTime'}
		       	,{name: 'cioPrctOutDateTime'}
		       	,{name: 'cioPaymentModel'}
		       	,{name: 'cioIsReservId'}
		        ,{name: 'cioOrderId'}
		        ,{name: 'cioTotalRate',type: 'float'}
		        ,{name: 'cioOperator'}
		   	]});
	   var ds = new Ext.data.Store({
				url: 'guesthistoryctrl.htm?action=queryCheckinOrderInfo'
			    ,reader: reader
});
		Ext.apply(this,{
			title:'交易详细信息'
			//,layout:'fit'
			,border:false
			,store: ds
			,loadMask: true
		    ,cm: cm
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
                pressed: true
                ,enableToggle:true
                ,text: '显示该交易的详细信息'
                ,cls: 'x-btn-text-icon details'
                ,toggleHandler: function(){
                    if(this.ghCioOrderId=='undefined'){
						Ext.ux.Toast.msg('提示', '请选择想要查询的用户列'); 
							return;
						}
						else{
							ds.removeAll();
						    ds.load({params:{start:0,limit:8,showAllAction:0,ghCioOrderId:this.ghCioOrderId}});
							return;
							}
					}.createDelegate(this)
          		}
          		,'-'
			    ,{
                pressed: true
                ,enableToggle:true
                ,text: '显示该客户所有的交易信息'
                ,cls: 'x-btn-text-icon details'
                ,toggleHandler: function(){
      				 if(this.gtId=='undefined'){
						Ext.ux.Toast.msg('提示', '请选择想要查询的用户列'); 
							return;
						}
						else{
							ds.removeAll();
						    ds.load({params:{start:0,limit:4,showAllAction:1,gtId:this.gtId}});
							return;
							}
					}.createDelegate(this)
                }
          ]
    	});
		Neo.frontdesk.PaymentDetailGrid.superclass.initComponent.apply(this,arguments);
		this.ghCioOrderId = 'undefined';
	}
	,setCioOrderId:function(ghCioOrderId){
		this.ghCioOrderId = ghCioOrderId;
		//console.log(this.ghCioOrderId);
	}
	,setGuestId:function(guestId){
		this.gtId = guestId;
		//console.log(this.gtId);
	}
});

Ext.reg('paymentdetailgrid',Neo.frontdesk.PaymentDetailGrid);