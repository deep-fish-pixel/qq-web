WebChat.Base.Component.extend('WebChat.Ext.Component.ButtonListComponent',
{
    init:function(context, container, data)
    {
        this._super("init", context, container, data);
    },
    onInit:function(context, container, data)
    {
		this.data = data;
		this.Elements = [];
		for(var i=0, l=data.length; i<l; i++)
		{
			new WebChat.Ext.Component.ButtonComponent(Sharp('<div class="button_component"></div>'),this, data[i]);
		}
	}
});