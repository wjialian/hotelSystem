Ext.namespace("Neo.business");

Neo.business.Accordion = Ext.extend(Ext.Panel,{
    /*,layoutConfig: {
        // layout-specific configs go here
        animate: true,
    }
    ,autoscroll:true*/
	initComponent: function(){
		this.shortBogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.';
	    var tools = [
	    	{
	    	id:'gear'
	    	,handler:function(e,t,p){ 
	    		p.refreshMedia();
	    	},qtip: {text:'Refresh the Chart'}
	    },{
	    	id:'print'
	        ,handler:function(e,t,p){ 
	        	p.print();
	        },qtip: {text:'Print the Chart'}
	    } ,{
	        id:'close',
	        handler: function(e, target, panel){
	            panel.ownerCt.remove(panel, true);
	        }
	    }
	    ];
		Ext.apply(this,{
		  items: [{ 
		            xtype:'portal',
		            items:[{
	                columnWidth:.33,
	                style:'padding:10px 0 10px 10px',
	                items:[{
	                    title: 'Panel 1',
	                    tools: tools,
	                    html: this.shortBogusMarkup
	                },{
	                    title: 'Another Panel 1',
	                    tools: tools,
	                    html: this.shortBogusMarkup
	                }]
	            },{
	                columnWidth:.33,
	                style:'padding:10px 0 10px 10px',
	                items:[{
	                    title: 'Panel 2',
	                    tools: tools,
	                    html: this.shortBogusMarkup
	                },{
	                    title: 'Another Panel 2',
	                    tools: tools,
	                    html: this.shortBogusMarkup
	                }]
	            },{
	                columnWidth:.33,
	                //style:'padding:10px 0 10px 10px',
	                items:[{
	                	 title : '2009年季度旅客住宿统计图'
	                    ,tools: tools
	                    ,tbar:[
       					'日期: ',' '
       					,new Ext.form.DateField({
       						format:'Y'+'年'
							,value:new Date().format('Y-m-d')
							,listeners:{
								'change':function(){alert('changed');}
							}
       					})
       				]
	                    ,style:'padding:10px 0 10px 10px'
	                    ,height:302
	                    ,xtype:'flash'
	                    ,dataURL  : 'public/swf/charts/Column3D.xml'
	                },{
	                    title : '2008年年度旅客住宿统计图'
	                    ,tools: tools
	                    ,style:'padding:10px 0 10px 10px'
	                    ,height:302
	                    ,xtype:'flash'
	                    ,dataURL  : 'public/swf/charts/Column3D.xml'
	                }]
            	}]
            }]
		});
		Neo.business.Accordion.superclass.initComponent.apply(this,arguments);
		
	}
	,onRender:function(){
		Neo.business.Accordion.superclass.onRender.apply(this,arguments);
		//这u-28212 写ender后u30340 代u30721 
	}
	,afterRender:function(){
		Neo.business.Accordion.superclass.afterRender.apply(this,arguments);
		
	}
});

Ext.reg('accordionview',Neo.business.Accordion);