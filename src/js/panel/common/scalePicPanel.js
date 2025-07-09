WebChat.Ext.panel.FramePanel.extend('WebChat.Ext.Panel.ScalePicPanel',
{
	resite:function(img)
    {
		var imgSharp = Sharp(img).parent()
		imgSharp.resiteByParent(imgSharp.parent());
    }
},
{
    init:function(context, container, option)
    {
		option.dragable= true;
		option.minWidth = option.minWidth||0;
		option.minHeight = option.minHeight||0;
		option.naturalWidth = option.width||10;
		option.naturalHeight = option.height||10;
		if(option.width<option.minWidth)option.width = option.minWidth;
		if(option.height<option.minHeight)option.height = option.minHeight;
		this._super("init", context, container,option);
    },
	onInit:function(context, container)
    {
		this._super("onInit", context, container);
		var self = this;
		this.lastClickTime = new Date()-100000;
		this.context.addEvent("mousedown",function()
		{
			var time = new Date();
			if(time - self.lastClickTime<300)
			{
				self.remove();
			}
			self.lastClickTime = time;
		});
    },
	initContent:function()
	{
		this.imgParent = Sharp('<div class="img_parent"><img src="'+this.option.pic+'" parentdragable="true" onload="if(window.parent.WebChat)window.parent.WebChat.Ext.Panel.ScalePicPanel.resite(this);"></img></div>').addTo(this.content);
		this.imgDelete = Sharp('<div class="img_delete"></div>').addTo(this.content);
		this.imgDelete.click(this.callback("remove"));
		this.img = this.imgParent.children();
		this.imgParent.resiteByParent(this.content);
	}
	
	
});