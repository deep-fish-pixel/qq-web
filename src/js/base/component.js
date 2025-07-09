WebChat.Base.Unit.extend('WebChat.Base.Component',
{
    init:function(context, container, option)
    {
		this.unitType =3//组件
        this._super("init", context, container);
		this.option = option;
    }
});