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
		,minSize: 175
		,maxSize: 400
		,width: 160
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
					//,cls:''
					,expanded:true
				})
			);
			this.menuReserv=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'预定管理'//查看修改删除
					//,cls:''
					,expanded:false
				})
			);
			this.menuGroup=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'团队'//协议单位(团队)预定登记
					//,cls:''
					,expanded:false
				})
			);
			this.menuGuestInfo=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'客人信息'//查看删除修改
					//,cls:''
					,expanded:false
				})
			);
			this.menuProtocol=this.menuMain.appendChild(
				new Ext.tree.TreeNode({
					text:'协议'	//协议单位和个人VIP
					//,cls:''
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