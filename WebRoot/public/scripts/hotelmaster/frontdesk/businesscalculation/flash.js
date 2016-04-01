Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.flash = Ext.extend(Ext.ux.FusionPanel,{
		initComponent: function(){
		var getTools = function(){
	    return [{id:'gear', handler:function(e,t,p){ p.refreshMedia();},qtip: {text:'Refresh the Chart'}  },
	             {id:'print', handler:function(e,t,p){ p.print();},qtip: {text:'Print the Chart'}  }
	           ];};
	
		var chartEvents = {
		           //'mousemove':function(){console.log(['mousemove',arguments])}
		        };
		var pie3D = 'public/swf/charts/Pie3D.swf';
		var Column3D = 'public/swf/charts/Column3D.swf';
		Ext.apply (this,{
			title       : '2009年月度旅客住宿统计图',
	        collapsible : true,
	        floating:false,
	        fusionCfg   :{ id   : 'chart1'
	                      ,listeners: chartEvents
	                   },
	        autoScroll : true,
	        id       : 'chartpanel',
	        chartURL :  Column3D,
	       // dataURL  : 'businessctrl.htm?action=calculateAccommodationByQuarter&year='+'2008',  //params
	        dataURL : 'public/swf/charts/Column3D.xml',
	       // params:{ year:'2008'},
	        listeners :{
	            show  : function(p){if(p.floating)p.setPosition(p.x||10,p.y||10);}
	            //,chartload : function(p,obj){console.log('chart '+obj.id+' loaded.')},
	            //,chartrender : function(p,obj){console.log('chart '+obj.id+' rendered.')}
	        },
	        tools:getTools()
		});
		Neo.frontdesk.flash.superclass.initComponent.apply(this,arguments);
	}
	,onRender:function(){
			Neo.frontdesk.flash.superclass.onRender.apply(this,arguments);
	}
	//,afterRender:function(){};
});
Ext.reg('flash',Neo.frontdesk.flash);