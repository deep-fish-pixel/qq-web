WebChat.Base.Component.extend('WebChat.Ext.Component.PictureListComponent',
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
			var temp = data[i];
			var style = "";
			if(temp.width||temp.height)
			{
				if(temp.width)style+="width:"+temp.width+"px;";
				if(temp.height)style+="height:"+temp.height+"px;";
			}
			
			var elementStr = '<div class="pic_text_outer'+(temp.floatRight?' pic_float_right':'')+'" '+ (temp.title?'title="'+temp.title+'">':'>')
			+(temp.pic?'<div class="pic_context"><div class="pic_content"><img class="pic" '+(style?'style="'+style+'"':"")+' src="'+temp.pic+'"></div></div>':'')
			+(temp["class"]?'<div class="pic_context"><div class="pic_content '+temp["class"]+'"></div></div>':'')
			+(temp.name?'<div class="pic_name_content"><div class="name">'+temp.name+'</div></div>':'')
			+(temp.array?'<div class="down_array_context"><div class="down_array_content"><img class="down_array" src="'+temp.array+'"></div></div>':'')
			+'</div>';
			var element = Sharp(elementStr).addTo(context);
			this.Elements.push(element);
			if(temp.arrayClick)
			{
				var arrayElement = element.children(".down_array_context");
				if(temp.arrayClick)arrayElement.click(this.callback("arrayClick", element, temp, arrayElement));
				if(temp.click)element.click(this.callback("click", element, temp));
				
			}
			else
			{
				if(temp.click)element.click(this.callback("click", element, temp));
			}
			temp.fireElement=element;
		}
	},
	arrayClick:function(element, data, arrayElement)
    {
        if(data.arrayClick)data.arrayClick(element, data, arrayElement);
    },
	click:function(element, data)
    {
		//if(data)data.fireElement=element;
        if(data.click)data.click(element, data);
    }
});