WebChat.Base.Component.extend('WebChat.Ext.Component.ButtonComponent',
{
    init:function(context, container, data)
    {
        this._super("init", context, container, data);
    },
    onInit:function(context, container, data)
    {
		if(data.floatRight)context.addClass("button_float_right");
		var elementStr = '<div class="button_text_context"><div class="button_text">'+data.name+'</div>'
			+(data.array?'<div class="down_array_context"><div class="down_array_content"><img class="down_array" src="'+data.array+'"></div></div>':'')
			+'</div>';
		var element = Sharp(elementStr).addTo(this.content);
		
		if(data.arrayClick)
		{
			var self = this;
			var arrayElement = element.children(".down_array_context");
			if(data.arrayClick)arrayElement.click(function(evt)
			{
				self.arrayClick(element, data, arrayElement)
				if (window.event) {
					evt.cancelBubble = true;
				} else {
					evt.stopPropagation();
				}
				return false;
			});
			if(data.click)element.click(this.callback("click", element, data));
		}
		else
		{
			if(data.click)element.click(this.callback("click", element, data));
		}
	},
	arrayClick:function(element, data, arrayElement,evt)
    {
        if(data.arrayClick)data.arrayClick(element, data, arrayElement);
		if(evt)
		{
			if(evt.preventDefault)evt.preventDefault();
			else if(evt.returnValue)evt.returnValue = false;
		}
    },
	click:function(element, data)
    {
        if(data.click)data.click(element, data);
    }
});

