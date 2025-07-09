WebChat.Ext.Panel.ChartPanel.extend('WebChat.Ext.Panel.ChartPanelManage',
{
	minWidth:533,
	minHeight:539,
	moveChildTasks:function(sourceTask, fromTask)
	{
		var childTasks = fromTask.childTasks;
		var schildTasks = sourceTask.childTasks;
		Sharp.iter(childTasks, function(task)
		{
			if(task!=sourceTask)schildTasks.push(task);
		});
		fromTask.childTasks = [];
	}
},
{
	init:function(context, container, settings)
	{
		this._super("init", context, container,settings);
		this.settings = settings;
		this.dragMergeButton = Sharp('<div class="tab_parent_show" dragable="true" title="拖动合并会话窗口"><div class="tab_parent_show_pic" parentdragable="true" ></div></div>').addTo(this.content);
		this.dragHide = Sharp('<div style="display:none;"></div>').addTo(this.content);
		this.headerOperateComponent = new WebChat.Ext.Component.HeaderOperateComponent(Sharp('<div class="header_operate_component"></div>'),this,{types:[{typeName:"chartSet"},{typeName:"min"},{typeName:"max"},{typeName:"close"}]});
		this.taskInfo= new WebChat.object.TaskInfo({unit:this});
	},
	onInit:function(context, container, settings)
	{
		this._super("onInit", context, container, settings);
		
		//this.initTabPanel();
		var self = this;
		context.zoomable({minWidth:this.instanceOf(WebChat.Ext.Panel.GroupChartManage)?WebChat.Ext.Panel.GroupChartManage.minWidth:WebChat.Ext.Panel.ChartPanelManage.minWidth,minHeight:WebChat.Ext.Panel.ChartPanelManage.minHeight,startFunc:function(){},zoomingFunc:function(obj)
		{
			self.resizeHeight(obj.toHeight,obj.toWidth);
			self.resizeTabsWidth(null,null,obj.toWidth);
			
		},endFunc:function(obj)
		{
			self.resizeTabsWidth(null,null,obj.toWidth);
			self.resizeHeight(obj.toHeight,obj.toWidth);
		}});
		context.addEvent("mousedown",this.callback("setFronted"));
		var isDragFirst = true;
		var chartPanelDivs;
		var chartPanels;
		var sourcePanel;
		var chartPanelPos;
		var tagParentPosY;
		var dragNearSuccess;
		context.prop("drag",function(pos, mousePos,event,dragObject)
		{
			//dragObject.element = {};
			if(self.status==1)
			{
				dragNearSuccess = false;
				if(!chartPanelDivs || isDragFirst)
				{
					chartPanelDivs = self.container.getChartPanelDivs();
					chartPanels = self.container.getChartPanelDivsPanel();
					
					for(var i=0, l=chartPanels.length; i<l; i++)
					{
						if(chartPanels[i].context.elements[0] == context.elements[0])
						{
							chartPanels.splice(i,1);
							chartPanelDivs.splice(i,1);
							break;
						}
					}
					isDragFirst = false;
				}
				if(sourcePanel && tagParentPosY && (Math.abs(tagParentPosY-mousePos.y)>50))
				{
					//sourcePanel.tabPanel.tabParent.hide();
					sourcePanel.tabPanel.hideOrShowTabParent();
				}
				if(chartPanelDivs&&chartPanelDivs.length>0)
				{
					var dragNearOption;
					Sharp.dragNear(context, chartPanelDivs,
					{
						posSubMaxX:chartPanelDivs[0].width()-270,
						posSubMinX:0,
						posSubMaxY:20,
						posSubMinY:0,
						poses:Sharp.dragNearPoses(chartPanelDivs),
						callback:function(target, source, targetPos, sourcePos, index, dragNearOption)
						{
							dragNearOption = dragNearOption;
							chartPanels[index].tabPanel.tabParent.show();
							if(sourcePanel && sourcePanel != chartPanels[index])
							{
								//sourcePanel.tabPanel.tabParent.hide();
								sourcePanel.tabPanel.hideOrShowTabParent();
							}
							if(sourcePanel != chartPanels[index])
							{
								sourcePanel = chartPanels[index];
								tagParentPosY = sourcePanel.tabPanel.tabParent.getAbsPos().y + 32;
								
								dragNearSuccess = sourcePanel.addChartPanel(self, {x:Sharp.getEventX(event)-sourcePanel.context.getAbsPos().x});
								
								if(dragNearSuccess)
								{
									sourcePanel.setFronted();
									sourcePanel.getContainer().notify();
									
									delete self.status
									//pos = {};
									var children = sourcePanel.tabPanel.tabParent.children();
									dragObject.element = children.get(children.size()-1);
									dragObject.startX = Sharp.getEventX(event);
									dragObject.startY = Sharp.getEventY(event);
									sourcePanel = null;
									//children.get(children.size()-1).fire("mousemove");
								}
							}
						}
					});
					if(dragNearSuccess)
					{
						isDragFirst = true;
						//var top = dragObject.element.style("top")||0;
						var left = dragObject.element.style("left")||0;
						var tabParent = dragObject.element.parent();
						var elementWidth = dragObject.element.width();
						dragObject.element = dragObject.element.elements[0];
						var posX = dragObject.startX-tabParent.getAbsPos().x-elementWidth/2;
						if(posX<6)posX = 6;
						return {x:posX};
					}
				}
				
			}
			return pos;
		}).prop("dragstart",function(pos)
		{
			return pos;
		}).prop("dragend",function(pos)
		{
			if(self.status==0 || self.status==1)
			{
				self.recoverFromSepetateStat();
			}
			isDragFirst = true;
			if(sourcePanel)
			{
				sourcePanel.tabPanel.hideOrShowTabParent();
				sourcePanel=null;
			}
			self.container.resizeMaxPanel();
			delete self.status
			return pos;
		});
		this.refreshDragMergeButton();
		this.tabElement = this.tabPanel.tabParent.children(":first-child");
		this.dragMergeButton.prop("dragstart",function(event,dragObject)
		{
			self.makeinToMergeStatus(self.tabElement,event,dragObject);
		});
		this.content = this.context.find(".chart_recent_show");
		this.outputPanel = new WebChat.Ext.Panel.OutputPanel(Sharp('<div class="output_panel"></div>'), this);
		this.content = this.context.find(".chart_input_text");
		this.editorPanel = new WebChat.Ext.Panel.EditorPanel(Sharp('<div class="edit_panel"></div>'), this);
		
		
	},
	initTabPanel:function()
	{
		this.tabPanel = new WebChat.Ext.Panel.ChartFriendTabPanel(Sharp('<div class="chart_frame_tab_panel noselect"></div>'), this, 5, {parentdragable:true,selectedZIndex:5001});
		
		random = Math.round(Math.random()*100);
		var self = this;
		this.taskInfo.name="XXX"+random;
		this.taskInfo.pic="../css/pic/Data/Head/2.png";
		
		var tabData = this.tabData = {tabName:"XXX"+random, tabPic:"../css/pic/Data/Head/2.png", tabSelectedPic:"../css/pic/Data/Head/2.png",tabSelectedClass:"tab_content_select", titleName:"XXX"+random, createTabFunc:function(parent, tabName, tabPic, titleName,data, index)
		{
			var tabLi = Sharp('<div class="tab_content'+(data.tabSelectedClass?" "+data.tabSelectedClass:"")+'" '+(titleName?' title="'+titleName+'"':'')+' dragable="true"><div class="tab_content_inner" parentdragable="true"><div class="tab_pic_div" parentdragable="true"><img class="tab_pic" src="'+ tabPic +'" parentdragable="true"/></div>'
					+'<div class="tab_name" parentdragable="true" unselectable="on">'+(tabName?tabName:'')+'</div><div class="tab_delete"></div></div></div>').addTo(parent);
			
			tabLi.find(".tab_delete").click(this.container.callback("deleteChartPanel",data));
			
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
		this.resizeTabsWidth();
		var chartContent = this.contentData = new WebChat.Ext.Panel.ChartTabContentPanel(Sharp('<div class="chart_frame_inner_tab noselect"></div>'), this.tabPanel, {tabIndex:this.tabPanel.units.length-1});
		chartContent.show();
		var tabsData = this.tabPanel.getTabsData();
		tabsData[tabsData.length-1].unit = chartContent;
		
	},
	addChartPanel:function(unit, postion)
	{
		if(unit.instanceOf(WebChat.Ext.Panel.GroupChartManage))
		{
			if(this.context.width()<WebChat.Ext.Panel.GroupChartManage.minWidth+2)
			{
				this.context.width(WebChat.Ext.Panel.GroupChartManage.minWidth+2);
				this.resize(WebChat.Ext.Panel.GroupChartManage.minWidth);
			}
		}
		if(unit.instanceOf(WebChat.Ext.Panel.ChartPanelManage))
		{
			var tabData = unit.getTabData();
			var isSuccess = this.tabPanel.add(tabData.tabName,tabData.tabPic,tabData.tabSelectedPic,tabData.titleName,tabData.createTabFunc,tabData.selectedTabFunc,tabData);
			if(!isSuccess)return false;
			var tabsData = this.tabPanel.getTabsData();
			tabsData[tabsData.length-1].unit = unit;
			this.resizeTabsWidth(null, postion);
			//unit.context.top(0).left(0);
			
			this.tabPanel.addExternalTabContent(unit);
			desk.mainChartPanel = this;
			unit.context.top(0).left(0).removeAttr("dragable").removeClass("chart_panel_merge").addClass("chart_panel_animate").addClass("chart_panel_none");//.removeClass("chart_panel_animate")
			setTimeout(function(){unit.context.removeClass("chart_panel_animate");},300);
			unit.context.style("opacity", 0);
			unit.context.height(this.context.height() - this.tabPanel.tabParent.height()-1);
			unit.context.style("width","",true);
			unit.tabPanel.tabParent.hide();
			unit.hideHeaderOperate();
			unit.context.children(".border_zoomer").hide();
			unit.setParentPanel(this);
			this.tabPanel.tabSelected(this.getContentsData().length-1);
			unit.resizeHeight();
			if(unit.tabInner)unit.tabInner.fire("mouseout");
			setTimeout(function(){if(unit.tabInner)unit.tabInner.fire("mouseout");},100);
			if(unit.tabPanel.units[0].coreArray)unit.tabPanel.units[0].coreArray.show();
			//unit.dragMergeButton.show();
			if(this.tabPanel.getTabsData().length ==2)
			{
				this.getContentsData()[0].context.height(this.context.height() - this.tabPanel.tabParent.height()-1);
				this.getContentsData()[0].resizeHeight(this.context.height());
			}
			delete unit.status;
			
			var tabParent = this.tabPanel.getTabParent();
			this.addChildTaskInfo(unit.getTaskInfo());
			//tabParent.children().addEvent("mouseout",function(){console.log(1)});
			//tabParent.children().fire("mouseover");
			return true;
		}
		
		
	},
	deleteChartPanel:function(tabData,evt)
	{
		//console.log(this);return;
		this.tabPanel.deleteExternalTabContent(tabData.unit);
		this.removeUnit(tabData.unit);
		tabData.unit.remove();
		this.resizeTabsWidth(tabData.element);
		if(this.tabPanel.units.length==1)
		{
			this.tabPanel.units[0].context.height(this.context.height());
		}
		this.resizeHeight();
		this.resize();
		if(this.taskInfo)this.taskInfo.remove(tabData.unit.getTaskInfo());
	},
	seperateChartPanel:function(tabElement,event,dragObject,option)
	{
		var self = this;
		if(Sharp.isNumber(tabElement))
		{
			var index = tabElement;
			var tabData = self.tabPanel.getTabData(index);
			var unit = self.tabPanel.sepetateExternalTabContent(tabData.unit, desk,event,dragObject);
			unit.width = self.context.width();
			unit.height = self.context.height();
			unit.getContainer().notify();
			self.resizeTabsWidth(tabData.element);
			unit.dragMergeButton.hide();
			unit.context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
			unit.showHeaderOperate();
			self.resizeHeight();
			self.resize();
		}
		else
		{
			if(Sharp.getSystem().ie <=8)
			{
				var event = {clientY:event.clientY,clientX:event.clientX}
			}
			setTimeout(function()
			{
				var tabData = self.tabPanel.getTabDataByTab(tabElement);
				
				var unit = self.tabPanel.sepetateExternalTabContent(tabData.unit, desk,event,dragObject);
				if(unit)
				{
					//unit.width = self.context.width();
					//unit.height = self.context.height();
					unit.getContainer().notify();
					unit.context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
					self.resizeTabsWidth(tabData.element);
					unit.dragMergeButton.hide();
					unit.showHeaderOperate();
					self.resizeHeight();
					self.resize();
					dragObject.startX = Sharp.getEventX(event);
					dragObject.startY = Sharp.getEventY(event);
					option.mouseDelayOnY = true;
				}
				
			},0);
		}
		
		
		
	},
	makeinToMergeStatus:function(tabElement,event,dragObject)
	{
		var self = this;
		this.height = this.context.height();
		this.width = this.context.width();
		if(Sharp.getSystem().ie <=8)
		{
			var event = {clientY:event.clientY,clientX:event.clientX}
		}
		setTimeout(function()
		{
			var tabData = self.tabPanel.getTabDataByTab(tabElement);
			var unit = self.tabPanel.makeinToMergeStatus(self, desk,event,dragObject);
			unit.getContainer().notify();
			unit.dragMergeButton.hide();
			dragObject.startX = Sharp.getEventX(event);
			dragObject.startY = Sharp.getEventY(event);
			//self.resizeTabsWidth(tabData.element);
		},0);
	},
	recoverFromSepetateStat:function(flag)
	{
		if(this.status == 0 || this.status==1 || flag)
		{
			var newTabElement = this.tabPanel.tabParent.hide().children().removeAttr("parentdragable").attr("dragable","true");
			this.context.style("opacity",1).removeClass("chart_panel_merge").removeClass("chart_panel_none").removeClass("chart_panel_animate").width(this.width).height(this.height);
			if(flag)this.context.attr("dragable","true");
			var context = this.context;
			this.tabPanel.tabParent.hide().removeClass("panel_content_tabs_merge");
			this.context.children(".border_zoomer").show();
			if(this.isMax())this.restoreNormalOperate(true);
			this.dragMergeButton.show();
			if(this.tabPanel.units[0].coreArray)this.tabPanel.units[0].coreArray.show();
			
			this.resizeHeight();
			delete this.height;
			delete this.width;
			if(!flag)this.status = 1;
			this.resize();
		}
		
		return this;
	},
	isFull:function()
	{
		return this.tabPanel.isFull();
	},
	getTabsData:function()
	{
		return this.tabPanel.tabsData;
	},
	getContentsData:function()
	{
		return this.tabPanel.units;
	},
	isMergedPanel:function()
	{
		return this.tabPanel.tabsData.length>1 || (this.tabPanel.tabsData.length==1&&this.parentPanel)?true:false;
	},
	tabSelected:function(index)
	{
		this.tabPanel.tabSelected(index);
	},
	setParentPanel:function(unit)
	{
		this.parentPanel = unit;
	},
	getParentPanel:function()
	{
		return this.parentPanel;
	},
	hideDragMergeButton:function()
	{
		this.dragMergeButton.hide();
	},
	refreshDragMergeButton:function()
	{
		if(this.isMergedPanel() || this.isMax())
		{
			this.dragMergeButton.hide();
		}
		else
		{
			this.dragMergeButton.show();
		}
	},
	tabContentSelected:function(index)
	{
		var datas = this.tabPanel.tabsData;
		var units = this.tabPanel.units;
		
		
	},
	resizeHeight:function(contextHeight,contextWidth)
	{
		if(contextHeight)
		{
			this.context.height(contextHeight);
		}
		contextHeight = contextHeight||this.context.height();
		if(contextWidth)
		{
			this.context.width(contextWidth);
		}
		contextWidth = contextWidth||this.context.width();
		var contentsData = this.getContentsData();
		if(contentsData.length==1)
		{
			contentsData[0].context.height('');
		}
		for(var i=0, l=contentsData.length; i<l; i++)
		{
			if(contentsData[i].instanceOf(WebChat.Ext.Panel.ChartTabContentPanel))
			{
				contentsData[i].context.height(contextHeight-(this.tabPanel.tabParent.style("display")=="none"?0:this.tabPanel.tabParent.height())-1);
				contentsData[i].resizeHeight(contextHeight);
			}
			else if(l==1)contentsData[i].resizeHeight(contextHeight-1);
			else contentsData[i].resizeHeight(contextHeight-this.tabPanel.tabParent.height()-1,contextWidth);
		}
		this.editorPanel.resize(contextWidth - this.contentData.threeColumnThirdTd.width()-28);
		this.outputPanel.resize(null,contextWidth - this.contentData.threeColumnThirdTd.width()-28);
	},
	resizeTabsWidth:function(delElement,moveToPostion, tabParentWidth)
	{
		this.tabPanel.resizeTabWidth();
		var tabParent = this.tabPanel.getTabParent();
		var self = this;
		if(tabParent.groupDrag)tabParent.groupDrag(
		{
			direct:"horizontal",
			minLimit:6,
			maxLimit:(tabParentWidth||tabParent.width())-125,
			spaceSub:-3,
			triggerFunc:function(){},
			dragZIndex:5001,
			delElement:delElement,//没有可以为空
			moveToPostion:moveToPostion,//触发该位置tab显示 属性包含x y,默认为最新加入的元素
			mouseDelayX:15,
			mouseOutX:125,
			mouseOutY:50,
			mouseOutOnX:true,
			mouseOutOnY:true,
			mouseOutXFunc:this.callback("seperateChartPanel"),
			mouseOutYFunc:this.callback("seperateChartPanel"),
			drag:function(tab, pos, mousePos)
			{
			},
			dragstart:function(tab, pos,option)
			{
				//tab.style("z-index", option.dragZIndex);
			},
			dragend:function(tab, pos,option)
			{
				//tab.style("z-index", "", option);
				delete self.status;
			}
		});
		
	},
	resize:function(minWidth, minHeight)
	{
		if(minWidth)
		{
			this.context.zoomable(
			{
				minWidth: minWidth||WebChat.Ext.Panel.ChartPanelManage.minWidth,
				minHeight: minHeight||WebChat.Ext.Panel.ChartPanelManage.minHeight
			});
		}
		else if(this.instanceOf(WebChat.Ext.Panel.SingleChartManage))
		{
			this.context.zoomable(
			{
				minWidth: minWidth||WebChat.Ext.Panel.ChartPanelManage.minWidth
			});
		}
		else if(this.instanceOf(WebChat.Ext.Panel.GroupChartManage))
		{
			this.context.zoomable(
			{
				minWidth: minWidth||WebChat.Ext.Panel.GroupChartManage.minWidth
			});
		}
	},
	zoomableResize:function()
	{
		this.context.zoomable();
	},
	hideHeaderOperate:function()
	{
		if(this.headerOperateComponent)this.headerOperateComponent.hide();
	},
	showHeaderOperate:function()
	{
		if(this.headerOperateComponent)this.headerOperateComponent.show();
	},
	isMin:function()
	{
		if(this.headerOperateComponent) return this.headerOperateComponent.isMin();
		return false;
	},
	isMax:function()
	{
		if(this.headerOperateComponent) return this.headerOperateComponent.isMax();
		return false;
	},
	maxOperate:function(task, notSaveStatus, callHeaderOperateComponentsetMax)
	{
		if(!notSaveStatus)this.saveNormalStatus();
		if(!task)
		{
			//if(taskOrnotSaveStatus) this.headerOperateComponent.setMax();
			task = this.container.getUnitsByClass(WebChat.Ext.Panel.TaskManagePanel)[0];
		}
		if(callHeaderOperateComponentsetMax) this.headerOperateComponent.setMax(task);
		this.context.removeAttr("dragable").addClass("max_panel");
		var site;
		if(task)site = WebChat.Ext.Component.HeaderOperateComponent.expandMaxScreen(this.context,this.context,task.context);
		else site = WebChat.Ext.Component.HeaderOperateComponent.expandMaxScreen(this.context,this.context);
		
		this.resizeHeight(site.height,site.width);
		this.resizeTabsWidth();
		this.hideDragMergeButton();
		var self = this;
		if(Sharp.getSystem().ie)
		{
			this.resizeTabsWidth();
		}
		else
		{
			setTimeout(function()
			{
				self.resizeTabsWidth();
				self.editorPanel.resize(self.context.width() - self.contentData.threeColumnThirdTd.width()-28);
				self.outputPanel.resize(self.context.width(),contextWidth - self.contentData.threeColumnThirdTd.width()-28);
			},200);
		}
	},
	restoreNormalOperate:function(onlySize)
	{
		this.restoreNormalStatus(onlySize);
		if(onlySize)
		{
			this.headerOperateComponent.setMax();
		}
		var self = this;
		if(Sharp.getSystem().ie)
		{
			self.context.attr("dragable","true").removeClass("max_panel").zoomable();
			this.resizeTabsWidth();
		}
		else
		{
			setTimeout(function()
			{
				self.context.attr("dragable","true").removeClass("max_panel").zoomable();
				self.resizeHeight(null,self.normalStauts.width);
				self.resizeTabsWidth(null,null,self.normalStauts.width);
			},150);
		}
		this.resizeHeight(this.getNormalStatus().height);
		this.refreshDragMergeButton();
		
	},
	setUnitsNormalStatus:function()
	{
		var tabPanel = this.tabPanel;
		if(tabPanel)
		{
			var manages = tabPanel.getUnitsByClass(WebChat.Ext.Panel.ChartPanel);
			Sharp.iter(manages, function(unit)
			{
				//console.log(this.getNormalStatus());
				unit.saveNormalStatus(this.getNormalStatus());
			},this);
		}
	},
	setMaxFlag:function(flag)
	{
		this.headerOperateComponent.setMaxFlag(flag);
	},
	getTaskInfo:function()
	{
		if(this.taskInfo && !this.taskInfo.unit)
		{
			this.taskInfo.unit = this;
		}
		return this.taskInfo;
	},
	getTask:function()
	{
		return this.container.getTask();
	},
	addChildTaskInfo:function(taskInfo)
	{
		if(this.taskInfo)
		{
			this.taskInfo.add(taskInfo);
		}
		return this.taskInfo;
	},
	removeChildTaskInfo:function(taskInfo)
	{
		if(this.taskInfo)
		{
			this.taskInfo.remove(taskInfo);
		}
		return this.taskInfo;
	},
	addTaskInfo:function()
	{
		var task = this.getTask()
		this.removeTaskInfo();
		if(this.taskInfo && task)
		{
			if(task)task.add(this.taskInfo);
		}
		return this.taskInfo;
	},
	showSelected:function()
	{
		if(this.taskInfo)this.taskInfo.showSelected();
		return this.taskInfo;
	},
	getTaskInfo:function()
	{
		return this.taskInfo;
	},
	setMin:function()
	{
		//if(this.taskInfo)this.taskInfo.element.fire("click");
		if(this.taskInfo)this.taskInfo.setMin();
	},
	setMax:function(noAnimate)
	{
		if(this.taskInfo)this.taskInfo.setMax(noAnimate);
	},
	removeTaskInfo:function()
	{
		var task = this.getTask()
		
		if(this.taskInfo && task)
		{
			if(task)task.remove(this.taskInfo);
		}
		return this.taskInfo;
	},
	remove:function()
	{
		this._super("remove");
		if(desk.mainChartPanel == this) desk.mainChartPanel = null;
		if(this.taskInfo)this.taskInfo.remove();
	},
	send:function()
	{
		var content = this.editorPanel.getContent();
		if(content)
		{
			this.outputPanel.output(content);
			this.editorPanel.clearContent();
		}
	}
});