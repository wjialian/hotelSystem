Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");
/*Neo.frontdesk.MainMenuTree = function(){
	Neo.frontdesk.MainMenuTree.superclass.constructor.call(this);
}*/
Neo.frontdesk.MainMenuTree = Ext.extend(Ext.tree.TreePanel,{
		/*Default*/
		id:'mainMenu'
		,title:'主菜单'
		,region:'west'
		,minSize: 100
		,maxSize: 300
		,width: 150
		,border:true
		,rootVisible: false
		,lines: false
		//,layout: 'fit'
		,autoScroll: true
		,root: new Ext.tree.TreeNode('MainMenu')
		,collapseFirst: false
		,initComponent: function(){
			Ext.apply (this,{   
				
			});
			Neo.frontdesk.MainMenuTree.superclass.initComponent.apply(this,arguments);
			this.menuMain=this.root.appendChild(
				new Ext.tree.TreeNode({
					text:'酒店管理系统'
					,iconCls:'icon-hotel'
					//,cls:''
					,expanded:true
				})
			);
			this.menuReserv=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'预定管理'//查看修改删除
					,id:'menu-reserv'
					,iconCls:'icon-manage'
					,expanded:false
				})
			);
			this.menuReservCenter=this.menuReserv.appendChild(
				new Ext.tree.TreeNode({
					text:'预定中心'
					,id:'menu-reservcenter'
					,iconCls:'icon-center'
					,expanded:false
				})
			);
			/*this.menuGroup=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'团队'//协议单位(团队)预定登记
					,iconCls:'icon-group'
					,expanded:false
				})
			);*/
			this.menuGuestInfo=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'客人信息'//查看删除修改
					,id:'menu-guestinfo'
					,iconCls:'icon-guestinfo'
					,expanded:false
				})
			);
			/*this.menuBusiness=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'业务统计'	//协议单位和个人VIP
					,id:'menu-businesscal'
					,iconCls:'icon-statchart'
					,expanded:false
				})
			);*/
			this.menuGuestHistory=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'顾客需求'	//顾客需求
					,expanded:false
				})
			);
			
		}
		,onRender:function(){
			/*this.collapsible=true;
			this.split=true
			this.margins='5 0 5 5'
			this.cmargins= '5 5 5 5'*/
			Neo.frontdesk.MainMenuTree.superclass.onRender.apply(this,arguments);
		}
		/*,afterRender:function(){
		
		}*/
});
Ext.reg('mainmenutree',Neo.frontdesk.MainMenuTree);