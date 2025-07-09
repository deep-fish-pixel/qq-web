WebChat.Ext.Panel.TabPanel.extend('WebChat.Ext.Panel.ChartFriendTabPanel',
{
	init:function(context, container, pageSize, settings)
	{
		this._super("init", context, container, pageSize, settings);
		this.tabOption = 
		{
			maxWidth:150,
			minWidth:80,
			tabParentSub:115
		}
	},
	onInit:function(context, container, pageSize, settings)
	{
		this._super("onInit",context, container, pageSize, settings);
	},
	tabClick:function(index, event)
	{
		this._super("tabClick",index, event);
		
	},
	resizeTabOption:function(option)
	{
		this.tabOption = Sharp.extend(this.tabOption, option);
	},
	getTabWidth:function()
	{
		
		var totalWidth = this.context.width()-this.tabOption.tabParentSub;
		var tabsNumber = this.tabsData.length;
		var average = totalWidth/(tabsNumber?tabsNumber:1);
		var width;
		if(average>=this.tabOption.maxWidth)
		{
			width = this.tabOption.maxWidth;
		}
		else if(average<this.tabOption.maxWidth && average>this.tabOption.minWidth)
		{
			width = average;
		}
		else if(average<=this.tabOption.minWidth)
		{
			width = this.tabOption.minWidth;
		}
		return width-2;
	},
	registerUnit:function(unit)
	{
		this._super("registerUnit", unit);
		if(unit.instanceOf(WebChat.Ext.Panel.TabContentPanel))
		{
			unit.hide();
		}
		return true;
	},
	addExternalTabContent:function(unit)
	{
		this.registerUnit(unit);
	},
	hideOrShowTabParent:function()
	{
		if(this.tabsData.length == 1)
		{
			 this.tabParent.hide();
		}
		else if(this.tabsData.length > 1)
		{
			 this.tabParent.show();
			 
		}
	},
	add:function(tabName, tabPic, tabSelectedPic, titleName, createTabFunc, selectedTabFunc, params, tabIndex)
	{
		//this.tabParent.show();
		var success = this._super("add",tabName, tabPic, tabSelectedPic, titleName, createTabFunc, selectedTabFunc, params, tabIndex);
		
		this.hideOrShowTabParent();
		return success;
	},
	deleteExternalTabContent:function(unit)
	{
		var tabIndex = -1;
		if(unit)
		{
			var self = this;
			Sharp.iter(this.units, function(temp,index)
			{
				if(temp == unit)
				{
					self.tabsData[index].element.remove();
					self.tabsData.splice(index, 1);
					tabIndex = index;
					return false;
				}
			});
			this.removeUnit(unit);
			
		}
		else
		{
			tabIndex = 0;
			this.tabsData[0].element.remove();
			this.tabsData.splice(0, 1);
			this.removeUnit(unit);
		}
		if(tabIndex!=-1 && tabIndex == this.tabIndex)
		{
			this.tabSelected(tabIndex);
		}
		if(this.tabsData.length <=1)this.tabIndex=0;
		this.hideOrShowTabParent();
	},
	sepetateExternalTabContent:function(unit, container,event,dragObject)
	{
		if(unit.instanceOf(WebChat.Ext.Panel.ChartTabContentPanel))
		{
			var unitPanels = unit.getContainer().getUnits();
			var mainPanel = unit.getContainer().getContainer();
			var nextMainPanel = unitPanels[1];
			
			if(nextMainPanel)
			{
				nextMainPanel.context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
				var mainPos = mainPanel.context.getAbsPos();
				nextMainPanel.context.top(mainPos.y).left(mainPos.x).style("opacity",1);
				var isFirst = true;
				while(1<unitPanels.length)
				{
					this.tabsData[1].element.remove();
					if(isFirst)
					{
						mainPanel.container.content.add(this.tabsData[1].unit.context);
						
					}
					else
					{
						nextMainPanel.addChartPanel(this.tabsData[1].unit);
					}
					this.tabsData.splice(1, 1);
					this.units.splice(1, 1);
					
					if(isFirst)
					{
						
						nextMainPanel.width = mainPanel.context.width();
						nextMainPanel.height = mainPanel.context.height();
						nextMainPanel.recoverFromSepetateStat(true);
						nextMainPanel.showHeaderOperate();
						if(mainPanel.isMax())
						{
							nextMainPanel.saveNormalStatus(mainPanel.getNormalStatus());
							nextMainPanel.maxOperate(false,true,true);
							mainPanel.context.removeClass("max_panel");
							mainPanel.setMaxFlag(false);
						}
						desk.mainChartPanel =nextMainPanel;
						delete nextMainPanel.parentPanel;
						isFirst =false;
						nextMainPanel.addTaskInfo();
						WebChat.Ext.Panel.ChartPanelManage.moveChildTasks(nextMainPanel.getTaskInfo(), mainPanel.getTaskInfo());
					}
				}
				
			}
			mainPanel.resizeTabsWidth();
			dragObject.element=mainPanel.dragMergeButton;
			mainPanel.tabPanel.makeinToMergeStatus(mainPanel, desk,event,dragObject,mainPanel.getNormalStatus());
			dragObject.startX = Sharp.getEventX(event);
			dragObject.startY = Sharp.getEventY(event);
			mainPanel.getContentData().context.height('');
			mainPanel.resizeHeight();
			mainPanel.tabPanel.getTabParent().prop("groupDragOption",null);
			mainPanel.resizeTabsWidth();
			
			return null;
		}
		var tabIndex = -1;
		var mainPanel = unit.parentPanel;
		if(unit)
		{
			var self = this;
			Sharp.iter(this.units, function(temp,index)
			{
				if(temp == unit)
				{
					self.tabsData[index].element.remove();
					container.content.add(self.tabsData[index].unit.context);
					self.tabsData.splice(index, 1);
					self.units.splice(index, 1);
					tabIndex = index;
					self.hideOrShowTabParent();
					return false;
				}
			});
		}
		if(tabIndex!=-1 && tabIndex == this.tabIndex)
		{
			this.tabSelected(tabIndex);
		}
		
		if(unit.parentPanel.isMax())
		{
			unit.tabPanel.makeinToMergeStatus(unit, desk,event,dragObject,unit.parentPanel.getNormalStatus());
		}
		else
		{
			if(mainPanel)
			{
				unit.height=mainPanel.context.height();
				unit.width=mainPanel.context.width();
			}
			else
			{
				unit.height=unit.context.height();
				unit.width=unit.context.width();
			}
			unit.tabPanel.makeinToMergeStatus(unit, desk,event,dragObject);
		}
		unit.addTaskInfo();
		return unit;
	},
	makeinToMergeStatus:function(unit, container,event,dragObject,status)
	{
		unit.context.top(Sharp.getEventY(event)-20).left(Sharp.getEventX(event)-20)
			.attr("dragable","true").removeClass("chart_panel_none").style("z-index",WebChat.Ext.Panel.ChartPanel.getZIndex());
		if(status)
		{
			//nextMainPanel.saveNormalStatus(mainPanel.getNormalStatus());
			//nextMainPanel.maxOperate(true);
			unit.height=status.height;
			unit.width=status.width;
		}
		else
		{
			//unit.height=unit.context.height();
			//unit.width=unit.context.width();
		}
		unit.status = 1;
		unit.context.style("opacity",0.5).addClass("chart_panel_merge").width(400).height(400);
		if(unit.tabPanel.units[0].coreArray)unit.tabPanel.units[0].coreArray.hide();
		//setTimeout(function(){unit.context.addClass("chart_panel_animate")},300);
		dragObject.element = unit.context.elements[0];
		unit.tabPanel.tabParent.addClass("panel_content_tabs_merge").show();
		unit.context.children(".border_zoomer").show();
		unit.setParentPanel(null);
		unit.dragMergeButton.hide();
		unit.resizeHeight();
		unit.resize();
		return unit;
	}
});