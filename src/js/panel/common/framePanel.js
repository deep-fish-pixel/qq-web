WebChat.Base.Panel.extend('WebChat.Ext.panel.FramePanel',
{
    init:function(context, container, option)
    {
		this._super("init", context, container);
		var defaultOption = 
			{
				width:200,
				height:200,
				dragable:false
			};
		this.option = Sharp.extend(defaultOption, option);
    },
    onInit:function(context, container)
    {
		if(this.option.dragable)this.context.attr("dragable", "true");
		this.background = Sharp('<div class="frame_background"></div>').addTo(this.context);
        this.content = Sharp('<div class="frame_component_content" '+(this.option.dragable?'parentdragable="true"':'')+'></div>').addTo(context);
		this.initBackground();
		this.resite();
		var self = this;
		/*this.context.prop("drag",function(pos)
		{
			//self.resite(pos.x, pos.y);
			return pos;
		});*/
		this.initContent();
    },
    resite:function(x, y)
    {
		var frameSize = Sharp.getFrameSize();
		var left = (frameSize.width-this.option.width)/2;
		var top = (frameSize.height-this.option.height)/2;
		var x = x||left;
		var y = y||top;
		this.context.left(left).top(top).height(this.option.height).width(this.option.width);
		this.background.left(-x).top(-y);
    },
	initBackground:function()
    {
		var background = this.background, target = this.context;
        this.initMenuBackgroundWidth = background.style("width") || background.prop("offsetWidth");
        this.initMenuBackgroundLeft = background.style("left") || background.prop("offsetLeft");
        this.initMenuBackgroundHeight = background.style("height") || background.prop("offsetHeight");
        this.initMenuBackgroundTop = background.style("top") || background.prop("offsetTop");
        var position = target.getAbsPos();
        var borderLeftWidth = target.style("border-left-width"),borderTopWidth = target.style("border-top-width");
		var sys = Sharp.getSystem();
		background.style("left", -position.x - borderLeftWidth);
        background.style("top", -position.y - borderTopWidth);
		
		var frameSize = Sharp.getFrameSize();
		background.style("width", frameSize.width);
		background.style("height", frameSize.height);
      
    },
	initContent:function()
    {
		
      
    }
	
});