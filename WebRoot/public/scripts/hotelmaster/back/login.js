Login = function(){	
	var dialog, form;		
	return{		
			Init:function(){
			
			var logoPanel = new Ext.Panel({
				baseCls: 'x-plain',				
				bodyStyle: 'background:#f9f9f9 url(public/images/feya_logo.gif) no-repeat center center;',		        
				region: 'center'			
				});						
				
			var formPanel = new Ext.form.FormPanel({
					baseCls: 'x-plain',		        
					baseParams: {		        	
						module: 'login'		        
						},		        
					bodyStyle: 'background:#f9f9f9 none; color:#222; padding:5px 35px;',		        
					defaults: {		        	
						width: 200		        
						},		       
					defaultType: 'textfield',
					frame: false,		        
					height: 70,		        
					items: [{		            
						fieldLabel: 'Email Address',		            
						name: 'userID',		            
						value: 'admin'		        
						},{
						fieldLabel: 'Password',	
						inputType: 'password',
						name: 'userPass',
						value: 'admin'		       
						}],		       
						labelWidth:120,		        
						region: 'south',		        
						url: 'login/userLogin.htm?action=userLogin'		    
					});				   
			dialog = new Ext.Window({
						buttons: [{	
							handler: function(){
								form.submit({
								waitTitle:'Connecting',
								waitMsg:'Please Wait...',
								reset:true,	
								success:function(){ 
			                        	Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
											if (btn == 'ok'){
									                    window.location.href = 'home.htm';
							                }
									    });
			                        },
								failure:function(form, action){ 
		                            if(action.failureType == 'server'){ 
		                                obj = Ext.util.JSON.decode(action.response.responseText); 
		                                Ext.Msg.alert('Login Failed!', obj.errors.reason); 
		                            }else{ 
		                                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText + "abcd"); 
		                            } 
		                           // login.getForm().reset(); 
		                           //var redirect = 'home.htm'; 
		                           //location.href = redirect;
		                            window.location= "home.htm";
                        		},
								scope:Login						
								});		        	
							},		        	
							scope: Login,		            
							text: 'Login'		        
						}],		        
						buttonAlign: 'right',
						closable: false,		       
						draggable: true,		        
						height: 250,		        
						id: 'login-win',		        
						layout: 'border',		        
						minHeight: 250,		        
						minWidth: 530,		        
						plain: false,		       
						resizable: true,		        
						items: [		        	
							logoPanel,		        	
							formPanel		        
							],				
						title: 'Login',
						width: 530		    
					});						
			form = formPanel.getForm();	
			dialog.show();		
			},				
			Success: function(f,a){           
				// Ext.MessageBox.alert('Confirm', a.result.info);            
					if(a && a.result){				
						dialog.destroy(true);				
						// set the cookie                
						//set_cookie('key', a.result.key, '', '/feyaSoft/', '', '' );
						//set_cookie('memberName', a.result.name, '', '/feyaSoft/', '', '' );
						//set_cookie('memberName', a.result.info, '', '/feyaSoft/', '', '' );
						//set_cookie('memberType', a.result.type, '', '/feyaSoft/', '', '' );				
						// redirect the window				
						window.location = "/home.htm";			
					}		
			},
			Failure:function(f,a){
				window.location = "/home.htm";
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