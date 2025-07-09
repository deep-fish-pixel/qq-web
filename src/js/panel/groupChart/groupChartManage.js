WebChat.Ext.Panel.ChartPanelManage.extend('WebChat.Ext.Panel.GroupChartManage',
{
	minWidth:595
},
{
	init:function(context, container, settings)
	{
		this._super("init", context, container,settings);
		this.flag = Math.random()*100000;
	},
	onInit:function(context, container, settings)
	{
		this._super("onInit", context, container, settings);
	},
	initTabPanel:function()
	{
		
		this.tabPanel = new WebChat.Ext.Panel.ChartFriendTabPanel(Sharp('<div class="chart_frame_tab_panel noselect" border="0" cellpadding="0" cellspacing="0"></div>'), this, 5, {parentdragable:true,selectedZIndex:5001});
		
		random = Math.round(Math.random()*100);
		this.taskInfo.name="XXX"+random;
		this.taskInfo.pic="./css/pic/Data/Misc/normal_group_40.png";
		var self = this, isInit = true;
		var tabData = this.tabData = {tabName:"XXX"+random, tabPic:"./css/pic/Data/Misc/normal_group_40.png", tabSelectedPic:"./css/pic/Data/Misc/normal_group_40.png",tabSelectedClass:"tab_content_select", titleName:"XXX"+random, createTabFunc:function(parent, tabName, tabPic, titleName,data, index)
		{
			var tabLi = Sharp('<div class="tab_content'+(data.tabSelectedClass?" "+data.tabSelectedClass:"")+'" '+(titleName?' title="'+titleName+'"':'')+' dragable="true"><div class="tab_content_inner" parentdragable="true""><div class="tab_pic_div" parentdragable="true"><img class="tab_pic" src="'+ tabPic +'" parentdragable="true"/></div>'
					+'<div class="tab_name" parentdragable="true" unselectable="on">'+(tabName?tabName:'')+'</div><div class="tab_delete"></div></div></div>').addTo(parent);
			tabLi.find(".tab_delete").click(this.container.callback("deleteChartPanel",data));
			var tabInner = tabLi.find(".tab_content_inner");
			if(isInit)self.tabInner= tabInner;
			tabInner.mouseover(function()
			{
				if(!tabLi.match(".tab_content_select"))
				{
					tabInner.addClass("tab_content_inner_hover");
				}
			})
			.mouseout(function()
			{
				tabInner.removeClass("tab_content_inner_hover");
			});
			return tabLi;
		},
		selectedTabFunc:function(data,unit, index)
		{
			if(index==0 && unit.container.container)
			{
				unit.container.container.tabContentSelected(index);
			}
			else
			{
				if(unit.parentPanel)unit.parentPanel.tabContentSelected(index);
			}
			unit.context.style("opacity",1);
		}}
		
		this.tabPanel.add(tabData.tabName,tabData.tabPic,tabData.tabSelectedPic,tabData.titleName,tabData.createTabFunc, tabData.selectedTabFunc, tabData);
		isInit = false;
		this.resizeTabsWidth();
		var chartContent = this.contentData = new WebChat.Ext.Panel.ChartTabContentGroupPanel(Sharp('<div class="chart_frame_inner_tab noselect"></div>'), this.tabPanel, {tabIndex:this.tabPanel.units.length-1});
		chartContent.show();
		var tabsData = this.tabPanel.getTabsData();
		tabsData[tabsData.length-1].unit = chartContent;
		
	}
});




