// JavaScript Document
WebChat.Ext.Panel.TabPanel.extend('WebChat.Ext.Panel.GroupContentTabPanel',
{
	init:function(context, container, pageSize, settings)
	{
		settings.noSetWidth = true;
		this._super("init", context, container, pageSize, settings);
		
	},
	onInit:function(context, container,pageSize, settings)
	{
		this.settings  = settings;
		
        this.tabParent = Sharp('<div class="panel_content_tabs" '+(settings.parentdragable?'parentdragable="true"':'')+'></div>').addTo(this.content);
		this.content = settings.content;
		
	},
	tabClick:function(tabElement, event)
	{
		var index = Sharp.isNumber(tabElement)?tabElement:tabElement.index;
		var data = this.tabsData[index];
		if(data.element.match(".tab_content_focus"))
		{
			data.clickNum++;
			data.isFirstShow = false;
			if(data.selectedTabFunc)data.selectedTabFunc(data, this.units[this.tabIndex]);
			return;
		}
		var unit = this.units[this.tabIndex];
		if(unit)unit.hide();
		data = this.tabsData[this.tabIndex];
		if(data.clickNum == undefined)data.clickNum = 0;
		
		data.element.removeClass("tab_content_focus");
		data.element.find(".tab_pic").attr("src", data.tabPic);
		
		this.tabIndex = index;
		unit = this.units[this.tabIndex];
		if(unit)unit.show();
		data = this.tabsData[this.tabIndex];
		if(data.clickNum == undefined)data.clickNum = 0;
		data.clickNum++;
		data.isFirstShow = true;
		data.element.addClass("tab_content_focus");
		data.element.find(".tab_pic").attr("src", data.tabSelectedPic);
		if(!this.mainTabPanel)this.mainTabPanel = this.context;
		if(!this.tabPanelContent)this.tabPanelContent = this.context.children();
		if(!this.groupClazzTable)this.groupClazzTable =  this.units[0].context.children();
		//var ie = Sharp.getSystem().ie;
		//var height = this.container.context.height()-(ie?240:200);
		//this.tabPanelContent.height(height);
		//this.mainTabPanel.height(height);
		//this.friendClazzTable.height(height-(ie?0:38)).width(this.container.context.width());
		//this.groupClazzTable.height(height-(ie?0:38)).width(this.container.context.width());
		if(data.selectedTabFunc)data.selectedTabFunc(data, unit);
	}
});