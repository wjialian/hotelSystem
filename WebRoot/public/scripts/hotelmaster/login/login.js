Ext.SSL_SECURE_URL='public/scripts/extjs/resources/images/default/s.gif';
Ext.BLANK_IMAGE_URL = 'public/scripts/extjs/resources/images/default/s.gif';

Login = function(){
 	var win,
 	form,
 	//submitUrl = 'userLogin.htm?action=userLogin';
	submitUrl='j_acegi_security_check';
 	return{
	 	Init:function(){
	 		Ext.QuickTips.init();
	 		var logoPanel = new Ext.Panel({
		 		baseCls: 'x-plain',
		 		id: 'login-logo',
		 		region: 'center'
	 		});
		 	var formPanel = new Ext.form.FormPanel({
		 		baseCls: 'x-plain',
		 		baseParams: {
		 			module: 'login'
		 		},
		 		defaults: {width: 200},
		 		defaultType: 'textfield',
		 		frame: false,
		 		height: 70,
		 		id: 'login-form',
		 		items: [{
			 		fieldLabel: '用户名',
			 		name: 'j_username',
			 		value: 'admin'
		 		},{
					fieldLabel: '密码',
			 		inputType: 'password',
			 		name: 'j_password',
			 		value: 'admin'
		 		}],
		 		labelWidth:120,
		 		region: 'south',
		 		url: submitUrl
		 	});
	
		 	win = new Ext.Window({
			 	buttons: [{
				 	handler: function(){
				 	form.submit({
					 	waitMsg:'登陆中,请稍等...'
					 	,reset:true
					 	,params:{ajax:true}
						,method:'POST'
					 	,success:Login.Success
					 	,scope:Login
				 	});
				 	},
				 	scope: Login,
				 	text: '登录'
			 	}],
			 	keys: {
		        	key: [13], // enter key
			        fn: function(){
				 	form.submit({
					 	waitMsg:'登录中,请稍等...',
					 	reset:true,
					 	success:Login.Success,
					 	scope:Login
				 	});
				 	},
			        scope:this
		      	},
			 	buttonAlign: 'right',
				closable: false,
			 	draggable: false,
				height: 250,
			 	id: 'login-win',
			 	layout: 'border',
			 	minHeight: 250,
			 	minWidth: 530,
			 	plain: false,
			 	resizable: false,
			 	items: [
				 	logoPanel,
				 	formPanel
			 	],
			 	title: '用户登录',
			 	width: 530
		 	});
	 		form = formPanel.getForm();
			win.show();
	 	},
	 	Success: function(f,a){
		 	if(a && a.result){
			 	win.destroy(true);
				 // get the path
			 	var path = window.location.pathname;
			 	path = path.substring(0, path.lastIndexOf('/') + 1);
			 	path += "frontdesk.htm";	
				 /*// set the cookie
			 	set_cookie('sessionId', a.result.sessionId, '', path, '', '' );
				 set_cookie('memberName', a.result.name, '', path, '', '' );
			 	set_cookie('memberGroup', a.result.group, '', path, '', '' );*/
				//window.location = 'frontdesk.htm';
				// redirect the window
			 	window.location = path;
			}
	 	}
	};
}();

Ext.BasicForm.prototype.afterAction=function(action, success){
	this.activeAction = null;
	var o = action.options;
 	if(o.waitMsg){
	 	Ext.MessageBox.updateProgress(1);
	 	Ext.MessageBox.hide();
 	}
 	if(success){
 		if(o.reset){
 			this.reset();
 		}
 		Ext.callback(o.success, o.scope, [this, action]);
 		this.fireEvent('actioncompleted', this, action);
 	}else{
 		Ext.callback(o.failure, o.scope, [this, action]);
 		this.fireEvent('actionfailed', this, action);
 	}
}
Ext.onReady(Login.Init, Login, true);