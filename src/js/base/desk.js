WebChat.Base.Unit.extend('WebChat.Base.Desk',
{
	getMaxContext:function(element, taskBars, mainPanels,framePanels, exContext)
	{
		var contexts = element.children().toSharps();
		if(taskBars.length>0)contexts.splice(0,1);//暂时为一个
		if(framePanels.length>0)contexts.splice(0,1);//暂时为一个
		if(mainPanels.length>0)contexts.splice(0,1);//暂时为一个
		if(contexts.length>0)
		{
			var maxZIndexContext;
			Sharp.iter(contexts, function(context)
			{
				if(context.style("display") != "none" && (!exContext || (exContext.elements[0] != context.elements[0])) && (!maxZIndexContext || maxZIndexContext.style("z-index")-0 < context.style("z-index")-0))
				{
					maxZIndexContext = context;
				}
			});	
			return maxZIndexContext;
		}
		return null;
	}
},
{
	init:function(context)
	{
		this._super("init", context, null);
		this.unitType =1;
	},
	onInit:function()
	{
		Sharp.dragable();
		Sharp().attr("onresize", "desk.resize();");
		
		var taskManagePanel = this.taskManagePanel = new WebChat.Ext.Panel.TaskManagePanel(Sharp('<div class="task_manage_panel noselect" unselectable="on" ></div>'), this);
		
		this.addLoginFramePanel();
		
	},
	addLoginFramePanel:function()
	{
		var loginFramePanel = this.loginFramePanel = new WebChat.Ext.panel.LoginFramePanel(Sharp('<div class="panel frame_panel" dragable="true" unselectable="on"></div>'), this, {width:380,height:290,success:this.callback("addMainPanel")});
	},
	addMainPanel:function(option)
	{
		globalSettings.statusSetting.userStatus = option.status || WebChat.Ext.panel.LoginFramePanel.onlineStauts;
		var mainPanel = new WebChat.Ext.Panel.MainPanel(Sharp('<div class="panel main_panel noselect" dragable="true" unselectable="on"></div>'), this, globalSettings);
		
		var mainTabPanel = mainPanel.context.find("#main_tab_panel");
		var tabPanelContent = mainPanel.mainTabPanel.context.children();
		var friendTabContentPanel = mainPanel.mainTabPanel.units[0].context.children();
		var groupTabContentPanel = mainPanel.mainTabPanel.units[1].context.children();
		var friendClazzTable = friendTabContentPanel.children(".friend_clazz_table");
		Sharp.zoomable(function(zoomObject)
		{
			if(zoomObject.parent == mainPanel.context.elements[0])
			{
				var mainTab = mainPanel.getUnitsByClass(WebChat.Ext.Panel.TabPanel);
				if(mainTab.length>0&&mainTab[0].tabIndex==0)
				{
					friendTabContentPanel.children(".scroller").find(".scrollbtn").addClass("scrollanimatefast");
				}
			}
		},function(zoomObject)
		{
			var ie = Sharp.getSystem().ie;
			var height = zoomObject.toHeight-(ie?240:200);
			
			if(zoomObject.parent == mainPanel.context.elements[0])
			{
				//mainTabPanel.height(height);
				tabPanelContent.height(height);
				friendTabContentPanel.width(zoomObject.toWidth).height(height-(ie?0:38));
				friendTabContentPanel.scrollerfixed();
				
				groupTabContentPanel.width(zoomObject.toWidth).height(height-(ie?0:38));
				groupTabContentPanel.scrollerfixed();
			}
			
			
		},function(zoomObject)
		{
			if(zoomObject.parent == mainPanel.context.elements[0])
			{
				var mainTab = mainPanel.getUnitsByClass(WebChat.Ext.Panel.TabPanel);
				if(mainTab.length>0&&mainTab[0].tabIndex==0)
				{
					friendTabContentPanel.scrollerfixed();
					friendTabContentPanel.children(".scroller").find(".scrollbtn").removeClass("scrollanimatefast");;
					setTimeout(function(){friendTabContentPanel.scrollerfixed();},200);
				}
			}
		});
		
		var lastprocess =0;
		//a.zoomable();
		var rightZoom = Sharp("[zoomable=zoomable]");
		var friendTabContent = friendTabContentPanel.children();
		friendTabContentPanel.scroller({dragstart:function()
		{
			rightZoom.hide();
			friendTabContent.removeClass("animate");
		},dragend:function()
		{
			rightZoom.show();
			friendTabContent.addClass("animate");
		},drag:function(process)
		{
			
		},stepAmount:10})
	},
	notify:function()
	{
		this.notifyChartPanels();
	},
	notifyChartPanels:function()
	{
		var panels = this.getUnitsByClass(WebChat.Ext.Panel.ChartPanel);
		Sharp.iter(panels, function(panel)
		{
			panel.refresh();
		});
	},
	getChartPanelDivs:function()
	{
		return this.context.children(".chart_panel").toSharps();
	},
	getChartPanelDivsPanel:function()
	{
		var divs = this.context.children(".chart_panel").elements;
		var units = this.getUnitsByClass(WebChat.Ext.Panel.ChartPanelManage);
		var panels=[];
		var div;
		for(var i=0, l=divs.length; i<l; i++)
		{
			div = divs[i]
			for(var j=0, h=units.length; j<h; j++)
			{
				if(units[j].context.elements[0] == div)
				{
					panels.push(units[j]);
					break;
				}
			}
		}
		return panels;
	},
	resize:function()
	{
		this.resizeMaxPanel();
		if(this.taskManagePanel)this.taskManagePanel.resize();
		if(this.loginFramePanel)this.loginFramePanel.resite();
	},
	resizeMaxPanel:function()
	{
		var panels = this.getUnitsByClass(WebChat.Ext.Panel.ChartPanel);
		Sharp.iter(panels, function(panel)
		{
			if(panel && panel.isMax && panel.isMax())
			{
				if(panel.maxOperate)panel.maxOperate(false,true,false);
			}
		});
	},
	getTask:function()
	{
		return this.taskManagePanel
	},
	getMaxContext:function(exContext)
	{
		var taskManagePanels = this.getUnitsByClass(WebChat.Ext.Panel.TaskManagePanel);
		var mainPanels = this.getUnitsByClass(WebChat.Ext.Panel.MainPanel);
		var framePanels = this.getUnitsByClass(WebChat.Ext.panel.FramePanel);
		return this.clazz.getMaxContext(this.context, taskManagePanels, mainPanels, framePanels, exContext);
	}
	/*remove:function()
	{
        if(this._super("registerUnit", unit))
		{
			if(this.taskManagePanel)this.taskManagePanel.del(unit.getTaskInfo());
		}
	},
	registerUnit:function(unit)
	{
		if(this._super("registerUnit", unit))
		{
			if(this.taskManagePanel)this.taskManagePanel.add(unit.getTaskInfo());
		}
	}*/
});