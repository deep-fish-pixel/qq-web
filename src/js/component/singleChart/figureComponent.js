WebChat.Base.Component.extend('WebChat.Ext.Component.FigureComponent',
{
    init:function(context, container, data)
    {
        this._super("init", context, container, data);
    },
    onInit:function(context, container, data)
    {
		this.content = Sharp('<div class="figure_component_content"></div>').addTo(context);
		this.content.add('<div class="figure_pic_outer"><img class="figure_pic" src="'+ data.pic +'"/></div>');
		
	}
});