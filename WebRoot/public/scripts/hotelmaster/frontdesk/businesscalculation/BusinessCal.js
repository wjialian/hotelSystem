Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.BusinessCal = Ext.extend(Ext.Panel,{
	title:'业务统计'
	,frame:true
	,layout:'border'
	,region:'center'
	,initComponent: function(){
		this.charturl = 'public/swf/charts/Pie3D.swf';
		var getTools = function(){
	    return [{id:'gear', handler:function(e,t,p){ p.refreshMedia();},qtip: {text:'Refresh the Chart'}  },
	             {id:'print', handler:function(e,t,p){ p.print();},qtip: {text:'Print the Chart'}  }
	           ];};
	
		var chartEvents = {
		           //'mousemove':function(){console.log(['mousemove',arguments])}
		        };
		Ext.apply (this,{
			items:
			[{
					region:'center'
					,xtype:'flash'
		}]
		});
		Neo.frontdesk.BusinessCal.superclass.initComponent.apply(this,arguments);
	}
	,onRender:function(){
			Neo.frontdesk.BusinessCal.superclass.onRender.apply(this,arguments);
	}
	//,afterRender:function(){};
});
Ext.reg('businesscal',Neo.frontdesk.BusinessCal);