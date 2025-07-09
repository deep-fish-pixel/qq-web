WebChat.Base.Panel.extend('WebChat.Ext.Panel.ChartPanel',
{
	zIndex:500,
	getZIndex:function()
	{
		if(++this.zIndex>=5000)this.zIndex=500;
		return this.zIndex;
	}
},
{
	init:function(context, container, settings)
	{
		this._super("init", context, container);
		this.settings = settings;
		this.tabPanel = null;
		this.tabData=null;
		this.contentData=null;
		if(!settings.selectedIndex)settings.selectedIndex=1;
		if(!settings.lostSelectedIndex)settings.lostSelectedIndex=0;
	},
	onInit:function(context, container, settings)
	{
		var self = this;
		context.prop("dragend",function()
		{
			self.container.resizeMaxPanel();
		});
		this.content = Sharp('<div class="chart_content" parentdragable="true"></div>').addTo(context);
		this.initTabPanel();
	},
	initTabPanel:function()
	{
	},
	getTabData:function()
	{
		return this.tabData;
	},
	getContentData:function()
	{
		return this.contentData;
	},
	setFronted:function(event)
	{
		if(event)
		{
			var element = Sharp(event.srcElement||event.target);
			if(element.attr("class") && element.attr("class").indexOf("delete") != -1)return;
		}
		if(this.container.selectedPanel && this.container.selectedPanel.lostSelected)this.container.selectedPanel.lostSelected();
		if(!this.parentPanel)this.context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
		this.container.selectedPanel = this;
	},
	lostSelected:function()
	{
		//this.context.style("z-index", this.settings.lostSelectedIndex);
	},
	refreshDragMergeButton:function()
	{
	},
	refresh:function()
	{
		this.refreshDragMergeButton();
	},
	remove:function()
	{
		if(this == desk.mainChartPanel)delete desk.mainChartPanel;
		var chartPanels = this.getContentsData();
		for(var i=0; i<chartPanels.length; i++)
		{
			if(chartPanels[i] && chartPanels[i].instanceOf(WebChat.Ext.Panel.ChartPanelManage))
			{
				chartPanels[i].remove();
				chartPanels.splice(i,1);
				i--;
			}
		};
		this._super("remove");
		this.getContainer().notify();
		desk.mainChartPanel = desk.getUnitsByClass(WebChat.Ext.Panel.ChartPanelManage)[0];
	},
	isMin:function()
	{
		return false;
	},
	isMax:function()
	{
		return false;
	},
	maxOperate:function(task)
	{
		
	},
	restoreNormalOperate:function()
	{
		
	},
	saveNormalStatus:function(normalStauts)
	{
		if(normalStauts)this.normalStauts=normalStauts;
		else
		{
			var context = this.context;
			this.normalStauts ={top:context.top(),left:context.left(),width:context.width(),height:context.height()};
			//this.setUnitsNormalStatus();
		}
	},
	getNormalStatus:function()
	{
		if(this.normalStauts)return this.normalStauts;
		var context = this.context;
		return this.normalStauts ={top:context.top(),left:context.left(),width:context.width(),height:context.height()};
	},
	setUnitsNormalStatus:function()
	{
		
	},
	restoreNormalStatus:function(onlySize)
	{
		if(this.normalStauts)
		{
			var context = this.context;
			context.width(this.normalStauts.width);
			context.height(this.normalStauts.height);
			if(!onlySize)
			{
				context.top(this.normalStauts.top);
				context.left(this.normalStauts.left);
			}
		}
	},
	getTaskInfo:function()
	{
		
	}
});