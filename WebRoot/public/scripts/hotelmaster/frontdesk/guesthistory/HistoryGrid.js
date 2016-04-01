Ext.namespace("Neo.frontdesk");

//var roomDataView =
Neo.frontdesk.HistoryGrid = Ext.extend(Ext.Panel,{
    region:'center'
	//,title:'客u25143 信u24687 '
	,autoscroll:true
	//,autoHeight:true
	,layout:'fit' 
	,initComponent: function(){
		var ds = new Ext.data.Store({
			            reader: new Ext.data.ArrayReader({}, [
					        {name: 'company'}
					       ,{name: 'price', type: 'float'}
					       ,{name: 'change', type: 'float'}
					       ,{name: 'pctChange', type: 'float'}
					       ,{name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
					       ,{name: 'industry'}
					       ,{name: 'desc'}
					    ])
			            ,data: Ext.grid.dummyData
		 });
		Ext.apply(this,{
			items:
				new Ext.grid.GridPanel({
			        store: ds
			        ,cm: new Ext.grid.ColumnModel([
				        new Ext.grid.RowExpander({
						     tpl : new Ext.Template(
						          '<p><b>Company:</b> {company}</p><br>',
						          '<p><b>Summary:</b> {desc}</p>'
						      )
						  })
			         ,{id:'company',header: "Company", width: 40, sortable: true, dataIndex: 'company'}
			         ,{header: "Price", width: 20, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'}
			         ,{header: "Change", width: 20, sortable: true, dataIndex: 'change'}
			         ,{header: "% Change", width: 20, sortable: true, dataIndex: 'pctChange'}
			         ,{header: "Last Updated", width: 20, sortable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
			        ])
			        ,viewConfig: {
			            forceFit:true
			        }
			        ,tbar:[
			          'Search: ', ' ',
			           new Ext.app.SearchField({
			               store: ds,
			               width:320
			           })
			     	]
			        ,bbar: new Ext.PagingToolbar({
			             pageSize: 10
			            ,store: ds
			            ,displayInfo: true
			            ,displayMsg: 'Displaying topics {0} - {1} of {2}'
			            ,emptyMsg: "No topics to display"
			        })
			        ,plugins: new Ext.grid.RowExpander({
				     tpl : new Ext.Template(
				       	   '<p><b>Company:</b> {company}</p><br>'
				       	   ,'<p><b>Summary:</b> {desc}</p>'
				     	 )
				 	 })
				 	 
			        ,collapsible: true
			        ,animCollapse: false
			        ,title: 'Expander Rows, Collapse and Force Fit'
			        ,iconCls: 'icon-grid'
			    }) ///end
		});
		Neo.frontdesk.HistoryGrid.superclass.initComponent.apply(this,arguments);
		
	}
	,onRecordFromData:function(record){
		this.fireEvent('onClickGridRow',record);
		alert(record.get('industry'));
	}
	,onRender:function(){
		Neo.frontdesk.HistoryGrid.superclass.onRender.apply(this,arguments);
		//这u-28212 写ender后u30340 代u30721 
	}
	,afterRender:function(){
		Neo.frontdesk.HistoryGrid.superclass.afterRender.apply(this,arguments);
		
	}
});
Ext.grid.dummyData = [
    ['3m Co',71.72,0.02,0.03,'9/1 12:00am', 'Manufacturing','summery'],
    ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am', 'Manufacturing','summery'],
    ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am', 'Manufacturing','summery'],
    ['American Express Company',52.55,0.01,0.02,'9/1 12:00am', 'Finance','summery'],
    ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am', 'Services','summery'],
    ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am', 'Services','summery'],
    ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am', 'Manufacturing','summery'],
    ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am', 'Services','summery'],
    ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am', 'Finance','summery'],
    ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am', 'Manufacturing','summery'],
    ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am', 'Manufacturing','summery'],
    ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am', 'Manufacturing','summery'],
    ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am', 'Automotive','summery'],
    ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am', 'Computer','summery'],
    ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am', 'Manufacturing','summary']
 /*   ,['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am', 'Computer','summary'],
    ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am', 'Computer','summary'],
    ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am', 'Medical','summary'],
    ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am', 'Finance','summary'],
    ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am', 'Food','summary'],
    ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am', 'Medical','summary'],
    ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am', 'Computer','summary'],
    ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am', 'Services', 'Medical','summary'],
    ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am', 'Food','summary'],
    ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am', 'Retail','summary'],
    ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am', 'Manufacturing','summary'],
    ['United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am', 'Computer','summary'],
    ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00am', 'Services','summary'],
    ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am', 'Retail','summary'],
    ['Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81,'9/1 12:00am', 'Services','summary']*/
];

Ext.reg('historygrid',Neo.frontdesk.HistoryGrid);