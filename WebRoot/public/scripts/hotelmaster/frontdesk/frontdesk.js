Ext.BLANK_IMAGE_URL = 'public/scripts/extjs/resources/images/default/s.gif';

Ext.onReady(function(){
	Ext.QuickTips.init(); 
	Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
	//Ext.form.Field.prototype.msgTarget = 'side';
	//左侧主菜单

	var mainMenu = new Neo.frontdesk.MainMenuTree({	
			collapsible:true
			,split:true
			,margins:'5 0 5 5'
			,cmargins:'5 5 5 5'
	});
	//房间状态视图
	//var mainView= new Neo.frontdesk.Mainview();
	//var roomview = new Neo.frontdesk.RoomView();
	//var checkInForm=new Neo.frontdesk.CheckInForm();
	//TabPanel和主Tab页(房态和快捷登记)
	/*var tabviewer = new Ext.TabPanel({
				
				//,defaults:{autoHeight:true}//Fucky
				//,autoscroll:true //Fucky
				
		
	});*/
	//测试
	/*tabviewer.add(new Neo.frontdesk.Mainview({
			title:'MainView'
			,items:[
				{
					width:300
					,title:'11'
					,border: true
					,region: 'west'
					,xtype:'panel'
				}
			]
	}));*/
	//整体视图
	
	
	var Templatetab = Ext.extend(Ext.Panel, {
	    closable: true
	    //,autoScroll:true
	    ,initComponent : function(){
	        Templatetab.superclass.initComponent.call(this);
	    }
	});
	

	var maintab = function(){
		maintab.superclass.constructor.call(this,{
			title:'Tab'
			,id:'tabViewer'
			,border: false
			,activeTab:0
			,tabPosition:'top'
			,plugins: new Ext.ux.TabCloseMenu()
			,layoutOnTabChange:true
			,items:[
				{
				xtype:'mainview'
				,id:'mainView'
	   			}
			]    
    	});
	};
    Ext.extend(maintab,Ext.TabPanel,{
    	loadClass : function(node,name){  //(name,cls)
			var title = node.attributes.text;
			var id = node.attributes.id;
			//console.log(id);
			var tab = Ext.getCmp(id);
			if(tab)
				{
					this.setActiveTab(tab);
				}
			else{ 
				/*var p = this.add(new Templatetab({
			      id: id
			      ,title : title
			      ,border:true
			      //,items : [{
			      ,xtype : view //xtype ：'roomview' + id
			      // }]
			     }));*/
				if(id=='menu-reservcenter'){
					var p=this.add(new Neo.frontdesk.ReservCenter({
						title:'预定中心'
						,id:'panel-reservcenter'
						,closable:true
						})
					);
				}
				if(title=='客人信息'){
					var p=this.add(new Neo.frontdesk.Guestview({
						id:id
						,title:title
						,closable: true
						}));
					}
				if(title=='顾客需求'){
					var p=this.add(new Neo.frontdesk.Historyview({
						id:id
						,title:title
						,closable: true
					}));
				}
				if(id=='menu-businesscal'){
					var p=this.add(new Neo.frontdesk.BusinessCal({
						title:'业务统计'
						,id:'panel-businesscal'
						,closable:true
						})
					);
				}
				this.setActiveTab(p);
			}
		}
    });
    setTimeout(function(){
	    Ext.get('loading').fadeOut({remove:true});    
	    Ext.get('loading-mask').fadeOut({remove:true});
	}, 550);
	var viewport=new Ext.Viewport({
		layout:'border'
		,items:[
			{
				region:'north'
				,xtype:'mainheader'
			}
			,mainMenu
			,{
				//title:'View'
				region:'center'
				,border:true
				,items:[new maintab()]
				,layout:'fit' //important
				,margins: '5 5 5 0'
				,cmargins: '5 5 5 5'
			}
		]
	});
	var leftmenu = viewport.items.itemAt(1);
	var centermain = viewport.items.itemAt(2).items.itemAt(0);
	var name = "test";
	leftmenu.on('click',function(node, e){
		//if(node.isLeaf()){
            e.stopEvent();
		    centermain.loadClass(node,name);//取叶子节点属性
		//}
	});

});