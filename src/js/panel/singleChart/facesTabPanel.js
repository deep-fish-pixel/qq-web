// JavaScript Document
WebChat.Ext.Panel.TabPanel.extend('WebChat.Ext.Panel.FacesTabPanel',
{
	init:function(context, container, pageSize, settings)
	{
		this._super("init", context, container, pageSize, settings);
		
	},
	onInit:function(context, container)
	{
		var settings = this.settings;
		this.content = Sharp('<table class="panel_content tab_panel_content" border="0" cellpadding="0" cellspacing="0" '+(settings.parentdragable?'parentdragable="true"':'')+'><tr class="panel_content_tr_second" '+(settings.parentdragable?'parentdragable="true"':'')+'><td></td></tr><tr class="panel_content_tr_first" '+(settings.parentdragable?'parentdragable="true"':'')+'><td class="panel_content_tr_first_td" '+(settings.parentdragable?'parentdragable="true"':'')+'></td></tr></table>').addTo(context);
		
        this.tabParent = Sharp('<div class="panel_content_tabs" '+(settings.parentdragable?'parentdragable="true"':'')+'></div>').addTo(this.content.find(".panel_content_tr_first td"));
		
		this.content = this.tabContents = Sharp('<div class="panel_content_tab_contents" '+(settings.parentdragable?'parentdragable="true"':'')+'></div>').addTo(this.content.find(".panel_content_tr_second td"));
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
		
		if(data.selectedTabFunc)data.selectedTabFunc(data, unit);
	}
});