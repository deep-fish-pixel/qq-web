// JavaScript Document
WebChat.Base.Component.extend('WebChat.Ext.Component.ListComponent',
{
    init:function(context, container, columns, pageSize, drawDataFunc, options)
    {
        this._super("init", context, container);
		this.columns = columns;
		this.data=[];
		this.pageNo=1;
		this.pageSize = pageSize>0?pageSize:0;
		this.drawDataFunc = drawDataFunc || this.defaultDrawData;
		this.selectedClass = "item_selected";
		this.selectedIndex = -1;
		this.items=[];
		this.options = options;
    },
    onInit:function(context, container)
    {
		this.content = Sharp('<ul class="component_content list_component_content" ></ul>').addTo(this.content);
	},
	addData:function(data)
    {
		this.data = data;
		this.refresh();
	},
	appendData:function(data)
    {
		this.data.concat(data);
	},
	nextPaze:function()
    {
		
	},
	lastPaze:function()
    {
		
	},
	setPaze:function()
    {
		
	},
	defaultDrawData:function(itemSharp, data, index, pageSize)
    {
		//var itemTdSharp = Sharp('<td class="list_item_td"></td>').addTo(this.content);
	},
	refresh:function()
    {
		for(var i=(this.pageNo-1)*this.pageSize,l=(this.pageSize>0?this.pageSize:this.data.length),size=this.data.length,pageSize=this.pageSize; i<l&&i<size;i++)
		{
			var itemSharp = Sharp('<li class="list_item_tr"></li>').addTo(this.content);
			this.drawDataFunc(itemSharp, this.data[i], i, pageSize, this.data);
			itemSharp.click(this.callback("_setSelected", itemSharp,  this.data[i], i));
			if(this.options && this.options.itemDoubleClick)itemSharp.addEvent("dblclick",this.callback("_itemDoubleClick", itemSharp,  this.data[i], i));
			this.items.push({element:itemSharp,data:this.data[i],index:i,items:this.items});
		}
	},
	getItems:function(selectedClass)
    {
		return this.items;
	},
	getSelected:function()
    {
		if(this.selectedIndex == -1)return {index:this.selectedIndex,items:this.items};
		return this.items[this.selectedIndex];
	},
	selected: function(index)
    {
		if(index>=0 && index<this.items.length)
		{
			this.items[index].element.fire("click");	
		}
	},
	prev: function()
    {
		if(this.selectedIndex - 1<0 || this.items.length==0 || this.selectedIndex-1  >= this.items.length)return;
		this.removeSelected();
		this.selectedIndex--;
		this.items[this.selectedIndex].element.fire("click");	
	},
	next: function(holdLast)
    {
		if(this.selectedIndex + 1 < 0 || this.items.length==0 || this.selectedIndex +1 >= this.items.length)return;
		this.removeSelected();
		this.selectedIndex++;
		this.items[this.selectedIndex].element.fire("click");	
	},
	setSelectedClass:function(selectedClass)
    {
		this.selectedClass = selectedClass;
	},
	setPreSelectedFunc:function(func)
    {
		this.preSelectedFunc = func;
	},
	setSelectedFunc:function(func)
    {
		this.selectedFunc = func;
	},
	setRemoveSelectedFunc:function(func)
    {
		this.remvoeSelectedFunc = func;
	},
	setDoubleClickFunc:function(func)
    {
		this.doubleClickFunc = func;
	},
	_setSelected:function(item, data, index,evt)
    {
		if(this.preSelectedFunc)this.preSelectedFunc(item, data, index,evt);
		this.removeSelected();
		item.addClass(this.selectedClass);
		this.selectedIndex = index;
		if(this.selectedFunc)this.selectedFunc(item, data, index,evt);
	},
	_itemDoubleClick:function(item, data, index,evt)
    {
		if(this.doubleClickFunc)this.doubleClickFunc(item, data, index,evt);
	},
	removeSelected:function(clearIndex)
    {
		if(this.selectedIndex>=0)
		{
			var item = this.getSelected().element;
			item.removeClass(this.selectedClass);
			if(this.remvoeSelectedFunc)this.remvoeSelectedFunc(item, this.data[this.selectedIndex], this.selectedIndex);
			if(clearIndex)this.selectedIndex = -1;
		}
	}
});