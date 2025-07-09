WebChat.Base.Panel.extend('WebChat.Ext.Panel.TabContentPanel',
{
	init:function(context, container, tabIndex)
	{
		this._super("init", context, container);
		this.tabIndex = tabIndex;
	},
	onInit:function(context, container)
	{
		this.content = Sharp('<div class="panel_content tab_content_panel"></div>').addTo(context);
	},
	addData:function(data)
	{
		this.data = data;
	},
	up:function()
	{
		
	},
	down:function()
	{
		
	},
	enter:function()
	{
		
	}
	
});