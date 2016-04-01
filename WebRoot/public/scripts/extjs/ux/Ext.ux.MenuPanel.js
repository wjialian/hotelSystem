/*
* Version 1.0
*
 * Ext.ux.MenuPanel
 *
 * @author   Dott. Ing.  Marco Bellocchi
 * @date      20. April 2008
 * @license Ext.ux.MenuPanel.js is licensed under the terms of the Open Source
 * LGPL 3.0 license. 
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html

You can pass a cfg  with the same property of a normal Panel, plus
-menu: the Ext.Menu to render inside the panel->mandatory
-fillHeight: boolean, set to true if the menu need to fill all the heght of the panel->optional
Example:

cfg = {
        xtype: 'menupanel',//lazy rendering
        title: 'My MenuPanel',
        collapsible:true,
        menu: myMenuInstance,
        fillHeight: true
}
*/

Ext.ux.MenuPanel = function(config){
	
	this.fillHeight = false;
	
    Ext.ux.MenuPanel.superclass.constructor.call(this, config);
    if ((typeof this.menu == 'undefined') || this.menu == null) 
        throw 'you need to specify an instance of Menu in your cfg object';
    this.menu.shadow = false;//We don't need shadow, do we?Besides, without this IE6 complain so...
}

Ext.extend(Ext.ux.MenuPanel, Ext.Panel, {
    initComponent: function(){
        Ext.ux.MenuPanel.superclass.initComponent.call(this);
        if (typeof this.menu.getEl != "function") {
            this.menu = new Ext.menu.Menu(this.menu)
        }
    },    
    
    afterRender: function(){
        Ext.ux.MenuPanel.superclass.afterRender.call(this);
        var el = this.menu.getEl();
        el.getShim();
        el.hideShim();
        this.body.appendChild(el);
        el.clearPositioning('auto');
        el.setWidth('100%');
		if(this.fillHeight === true)
			 el.setHeight('100%');
        el.applyStyles({
            border: '0px'
        });
        el.show();
    },
    
    getMenu: function(){
        return this.menu;
    },
    
    //private
    beforeDestroy: function(){
        Ext.ux.MenuPanel.superclass.beforeDestroy.call(this);
        this.menu.destroy();
    }
});
Ext.reg('menupanel', Ext.ux.MenuPanel);//Used for lazy rendering  