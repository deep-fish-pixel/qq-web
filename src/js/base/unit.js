Sharp.Class.extend('WebChat.Base.Unit',
{
	init:function(context, container)
	{
		this.context = context;
		this.container = container;
		this.units=[];
		this.unitType =0;
		this.content = this.context;
		if(this.container)this.register();
	},
	register:function()
	{
		if(this.container)this.container.registerUnit(this);
		return true;
	},
	remove:function()
	{
        if(this.container)this.container.removeUnit(this);
        else this.context.remove();
        return true;
	},
	registerUnit:function(unit)
	{
		if(this.context)this.content.add(unit.context);
		this.units.push(unit);
		return true;
	},
	removeUnit:function(unit)
	{
		var flag = false;
		if(!unit)return flag;
		for(var i=0,l=this.units.length; i<l; i++)
		{
			if(this.units[i] == unit)
			{
				this.units.splice(i,1);
				flag = true;
				break;
			}
		}
		unit.context.remove();
		return flag;
	},
	getUnitsByClass:function(clazz)
	{
		var units =[];
		for(var i=0,l=this.units.length; i<l; i++)
		{
			if(this.units[i].instanceOf(clazz))
			{
				units.push(this.units[i]);
			}
		}
		return units;
	},
	hide:function()
	{
		this.context.hide();
	},
	show:function()
	{
		this.context.show();
	},
	refresh:function()
	{
		
	},
	notify:function()
	{
		
	},
	resize:function()
	{
		
	},
	getUnits:function()
	{
		return this.units;
	},
	getContainer:function()
	{
		return this.container;
	}
});