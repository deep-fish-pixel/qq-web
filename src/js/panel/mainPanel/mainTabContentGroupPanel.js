WebChat.Ext.Panel.TabContentPanel.extend('WebChat.Ext.Panel.MainTabContentGroupPanel',
{
	init:function(context, container, tabIndex, setting)
	{
		this._super("init", context, container, tabIndex, setting);
		this.tabData = container.tabsData[tabIndex];
		this.setting = setting;
		this.clazzes = [];
		this.clazzKeyIndex = -1;
		this.clazzFocus = false;
		this.selectItem = null;
		this.selectedClosed = false;
	},
	onInit:function(context, container, data)
	{
		this.groupContentTab = this.content = Sharp('<div class="panel_content main_tab_content_group"></div>').addTo(context);
		
	},
	up:function(evt)
	{
		var index = this.clazzKeyIndex;
		var preClazz = this.clazzes[index];
		if(preClazz)
		{
			var child = preClazz.match(".group_clazz_select_real");
			if(!child)
			{
				if(index == 0)
				{
					this.clazzFocus = true;
					this.selectItem = this.clazzes[this.clazzKeyIndex]
					return this.selectItem;
				}
				else
				{
					preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
				}
				index--;
				if(this.clazzes[index].child&&this.clazzes[index].child.getItems().length >0)
				{
					var selectedItem = this.clazzes[index].child.getSelected();
					preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
					this.clazzes[index].child.selected(selectedItem.items.length-1);
					this.clazzFocus = false;
					this.selectItem = this.clazzes[index].child;
					return this.selectItem;
				}
			}
			else 
			{
				var selectedItem = preClazz.child.getSelected();
				if(this.clazzFocus)
				{
					index--;
					if(!this.clazzes[index])
					{
						index == 0;
						this.clazzFocus = true;
						return this.clazzes[index];
					}
					else if(this.clazzes[index].child&&this.clazzes[index].child.getItems().length >0)
					{
						preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
						this.clazzes[index].child.selected(selectedItem.items.length-1);
						this.clazzFocus = false;
						this.selectItem = this.clazzes[index].child;
						return this.selectItem;
					}
					else
					{
						preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
					}
				}
				else if(selectedItem.index <=0)
				{
					preClazz.child.removeSelected(true);
				}
				else
				{
					preClazz.child.prev();
					preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
					this.clazzFocus = false;
					this.selectItem = preClazz.child;
					return this.selectItem;
				}
			}
		}
		else
		{
			index--;
		}
		
		if(index == -1)
		{
			this.clazzKeyIndex = ++index;
		}
		var clazz = this.clazzes[index];
		if(clazz)
		{
			this.clazzKeyIndex = index;
			this.groupContentTab.scrollerfixed(evt, clazz, clazz.height());
			this.clazzFocus = true;
			var haschild = clazz.match(".group_clazz_select_real");
			if(haschild)this.selectItem = clazz.addClass("group_clazz_select_focus");
			else this.selectItem = clazz.addClass("group_clazz_focus");
			return this.selectItem;
		}
	},
	down:function(evt)
	{
		var index = this.clazzKeyIndex;
		var preClazz = this.clazzes[index];
		if(preClazz)
		{
			var child = preClazz.match(".group_clazz_select_real");
			if(!child)
			{
				if(index == this.clazzes.length-1)
				{
					this.clazzFocus = true;
					this.selectItem = this.clazzes[this.clazzKeyIndex]
					return this.selectItem;
				}
				preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
				index++;
			}
			else 
			{
				var selectedItem = preClazz.child.getSelected();
				if(this.clazzFocus)
				{
					if(selectedItem.items.length == 0)
					{
						index++;
						preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
					}
					else
					{
						preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
						preClazz.child.selected(0);
						this.clazzFocus = false;
						this.selectItem = preClazz.child;
						return this.selectItem;
					}
					/*else
					{
						preClazz.removeClass("group_clazz_focus");
						preClazz.child.next();
						return preClazz.child;
					}*/
				}
				else
				{
					if(index == -1)
					{
						index++;
					}
					else if(selectedItem.index ==selectedItem.items.length-1)
					{
						if(index < this.clazzes.length-1)
						{
							preClazz.child.removeSelected();
							index++;
						}
						else
						{
							preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
							this.clazzFocus = false;
							this.selectItem = preClazz.child;
							return this.selectItem;
						}
					}
					else if(selectedItem.index == -1)
					{
						preClazz.child.selected(0);
						preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
						this.clazzFocus = false;
						this.selectItem = preClazz.child;
						return this.selectItem;
					}
					else
					{
						preClazz.child.next();
						preClazz.removeClass("group_clazz_focus").removeClass("group_clazz_select_focus");
						this.clazzFocus = false;
						this.selectItem = preClazz.child;
						return this.selectItem;
					}
				}
			}
		}
		else
		{
			index++;
		}
		
		if(index == this.clazzes.length)
		{
			this.clazzKeyIndex = --index;
		}
		var clazz = this.clazzes[index];
		if(clazz)
		{
			this.clazzKeyIndex = index;
			this.groupContentTab.scrollerfixed(evt, clazz, clazz.height());
			this.clazzFocus = true;
			var haschild = clazz.match(".group_clazz_select_real");
			if(haschild)this.selectItem = clazz.addClass("group_clazz_select_focus");
			else this.selectItem = clazz.addClass("group_clazz_focus");
			return this.selectItem;
		}
	},
	enter:function()
	{
		if(!this.selectItem)return;
		if(Sharp.isSharp(this.selectItem))
		{
			this.selectItem.fire("click");
		}
		else if(this.selectItem.instanceOf && this.selectItem.instanceOf(WebChat.Ext.Component.ListComponent))
		{
			//console.log(this.selectItem.getSelected());
			
		}
	},
	selected:function(index, notRemoveChildSelected)
	{
		if(this.selectedClosed)return;
		var clazz;
		for(var i=0, l=this.clazzes.length; i<l; i++)
		{
			clazz = this.clazzes[i];
			clazz.removeClass("group_clazz_select_focus").removeClass("group_clazz_focus");
			var haschild = clazz.match(".group_clazz_select_real");
			if(!notRemoveChildSelected&& haschild && clazz.child.removeSelected)clazz.child.removeSelected(true);
		}
		
		if(this.clazzKeyIndex == -1)this.clazzKeyIndex=0;
		index = arguments.length==0?this.clazzKeyIndex:index;
		if(index >=0 && index<this.clazzes.length)
		{
			clazz = this.clazzes[index];
			var haschild = clazz.match(".group_clazz_select_real");
			if(haschild) clazz.addClass("group_clazz_select_focus");
			else clazz.addClass("group_clazz_focus");
			this.clazzKeyIndex = index;
			this.clazzFocus = true;
		}
		else
		{
			this.clazzKeyIndex = -1;
			this.clazzFocus = false;
		}
	},
	removeSelected:function()
	{
		var clazz;
		for(var i=0, l=this.clazzes.length; i<l; i++)
		{
			clazz = this.clazzes[i];
			clazz.removeClass("group_clazz_select_focus").removeClass("group_clazz_focus");
			var haschild = clazz.match(".group_clazz_select_real");
			if(haschild && clazz.child.removeSelected)clazz.child.removeSelected(true);
		}
	},
	setSelectedClosed:function(status)
	{
		this.selectedClosed = status;
	},
	getSelectedClosed:function()
	{
		return this.selectedClosed;
	},
	addData:function(data)
	{
		this._super("addData", data);
		var groupClazzTable = Sharp('<ul class="group_clazz_table animate"></ul>').addTo(this.content);
		var self =this;
		Sharp.iter(data, function(clazz,index)
		{
			var groupClazz = Sharp('<li class="group_clazz"><div class="arrow_clazz"><div class="arrow_clazz_div"><div class="arrow_clazz_pic"></div></div></div><div class="clazz_info"><div class="clazz_info_div"><div class="clazz_name">'+clazz.name+'</div><div class="clazz_group_num"> ['+clazz.groups.length+'/'+clazz.groups.length+']</div></div></div></li>').addTo(groupClazzTable);
			self.clazzes.push(groupClazz);
			var clazzIndex = self.clazzes.length - 1;
			var groupClazzGroups = Sharp('<li class="clazz_groups_none"><div class="clazz_groups" colspan="2"></div></li>').addTo(groupClazzTable);
			var arrowClazzPic = groupClazz.find(".arrow_clazz_pic");
			var child;
			var childList;
			groupClazz.click(function(evt)
			{
				self.selected(clazzIndex, true);
				var target = this;
				if(groupClazz.match(".group_clazz"))
				{
					if(childList)
					{
						if(Sharp.getSystem().ie)
						{
							childList.show();
							var selectClassGroups = groupClazz.next().show();
							groupClazz.child = childList;
							groupClazz.removeClass("group_clazz_middle5").addClass("group_clazz_select").removeClass("group_clazz").addClass("group_clazz_select_real");
							if(groupClazz.match(".group_clazz_focus"))
							{
								groupClazz.removeClass("group_clazz_focus").addClass("group_clazz_select_focus");
							}
							
							var selectedClosed = self.getSelectedClosed();
							var clazzesSelect = self.context.elements[0].clazzesSelects;
							if(clazzesSelect && clazzesSelect.size()>0)
							{
								clazzesSelect = clazzesSelect.elements[clazzesSelect.size() - 1];
							}
							else clazzesSelect = null;
							
							if(clazzesSelect == target && selectedClosed)
							{
								self.setSelectedClosed(false);
								self.selected();
								self.groupContentTab.scrollerfixed();
								var reals = groupClazzTable.children(".group_clazz_select_real");
								if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
							}
							else if(!selectedClosed)
							{
								self.selected(clazzIndex);
								self.groupContentTab.scrollerfixed(evt);
								var reals = groupClazzTable.children(".group_clazz_select_real");
								if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
							}
						}
						else
						{
							arrowClazzPic.sin({time:100, prop:"left1", value:"0",  callback:function(a,b,c)
							{
								if(c < 100)
								{
									groupClazz.addClass("group_clazz_middle5");
								}
								else if(c==100)
								{
									childList.show();
									var selectClassGroups = groupClazz.next().show();
									
									groupClazz.child = childList;
									groupClazz.removeClass("group_clazz_middle5").addClass("group_clazz_select").removeClass("group_clazz").addClass("group_clazz_select_real");
									if(groupClazz.match(".group_clazz_focus"))
									{
										groupClazz.removeClass("group_clazz_focus").addClass("group_clazz_select_focus");
									}
									//self.context.elements[0].clazzesSelects = groupClazzTable.children(".group_clazz_select_real");
									/*if(self.getSelectedClosed())
									{
										self.selected(clazzIndex);
									}*/
									
									var selectedClosed = self.getSelectedClosed();
									var clazzesSelect = self.context.elements[0].clazzesSelects;
									if(clazzesSelect && clazzesSelect.size()>0)
									{
										clazzesSelect = clazzesSelect.elements[clazzesSelect.size() - 1];
									}
									else clazzesSelect = null;
									
									if(clazzesSelect == target && selectedClosed)
									{
										self.setSelectedClosed(false);
										self.selected();
										self.groupContentTab.scrollerfixed();
										var reals = groupClazzTable.children(".group_clazz_select_real");
										if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
									}
									else if(!selectedClosed)
									{
										self.selected(clazzIndex);
										self.groupContentTab.scrollerfixed(evt);
										var reals = groupClazzTable.children(".group_clazz_select_real");
										if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
									}
									
								}
							}});
						}
						
					}
					else
					{
						var selectClassGroups = groupClazz.next().show();
						self.content = selectClassGroups.children();
						var listComponent = childList = new WebChat.Ext.Component.ListComponent(Sharp('<div class="component group_list_component"></div>'), self,2, 0, function(itemSharp, data, index, pageSize)
						{
							var content = '<div class="list_item_head"><div class="group_head_pic_div"><img class="group_head_pic" src="'+data.shortPic
											+'"/></div></div><div class="list_item_info"><label class="group_showname">'
											+data.showName+'</label><label class="group_nickname">('+data.nickName
											+')</label><label class="group_sign_block"></label>';
							var sign = data.sign;
							if(sign)
							{
								for(var i=0,l=sign.length; i<l; i++)
								{
									content += '<label class="group_sign_text">'+sign.charAt(i)+'</label>';
								}
							}
							content +='</div>';
							var itemTdSharp = Sharp(content).addTo(itemSharp);
						},{itemDoubleClick:true});
						
						listComponent.addData(clazz.groups);
						listComponent.setSelectedClass("item_selected");
						listComponent.setPreSelectedFunc(function(element, data, index, evt)
						{
							self.removeSelected();
							var lists = self.getUnitsByClass(WebChat.Ext.Component.ListComponent);
							Sharp.iter(lists, function(list)
							{
								list.removeSelected();
							});
							this.upordownamount = 10;
						});
						listComponent.setSelectedFunc(function(element, data, index, evt)
						{
							if(self.setting.selectedShowBigPic)
							{
								self.context.addClass("group_item_selected");
							}
							self.groupContentTab.scrollerfixed(evt, element, this.upordownamount);
							self.clazzKeyIndex = clazzIndex;
						});
						listComponent.setDoubleClickFunc(function(element, data, index, evt)
						{
							
							var chartPanels = desk.getUnitsByClass(WebChat.Ext.Panel.ChartPanelManage);
							if(chartPanels.length==0)
							{
								desk.mainChartPanel = new WebChat.Ext.Panel.GroupChartManage(Sharp('<div class="chart_panel chart_manage_panel chart_manage_group_panel" id="chart_manage_panel" dragable="true"></div>'), desk,{tab:false});
								desk.mainChartPanel.context.resite();
								desk.mainChartPanel.addTaskInfo();
							}
							else
							{
								if(!desk.mainChartPanel)desk.mainChartPanel = chartPanels[0];
								
									
								chartPanel = new WebChat.Ext.Panel.GroupChartManage(Sharp('<div class="chart_panel chart_manage_panel chart_manage_group_panel" id="chart_manage_panel" dragable="true"></div>'), desk,{tab:false});
								
								if(!desk.mainChartPanel.isFull())
								{
									desk.mainChartPanel.setFronted();
									desk.mainChartPanel.setMax(true);
									desk.mainChartPanel.showSelected();
									desk.mainChartPanel.addChartPanel(chartPanel);
								}
								else 
								{
									var status = desk.mainChartPanel.getNormalStatus();
									//var task = desk.mainChartPanel.getTaskInfo();
									chartPanel.context.left(desk.mainChartPanel.context.left()+15).top(desk.mainChartPanel.context.top()+35);
									chartPanel.context.height(status.height).width(status.width);
									chartPanel.resizeHeight();
									chartPanel.resize();
									chartPanel.setFronted();
									desk.mainChartPanel =chartPanel;
									desk.mainChartPanel.addTaskInfo();
								}
								chartPanel.getContainer().notify();
							}
							
						});
						self.context.elements[0].clazzesSelects = groupClazzTable.children(".group_clazz_select_real");
						listComponent.hide();
						self.setSelectedClosed(false);
					}
				}
				else if(groupClazz.match(".group_clazz_select"))
				{
					if(Sharp.getSystem().ie)
					{
						groupClazz.removeClass("group_clazz_middle6").removeClass("group_clazz_select").removeClass("group_clazz_select_real").addClass("group_clazz");
						if(groupClazz.match(".group_clazz_select_focus"))
						{
							groupClazz.removeClass("group_clazz_select_focus").addClass("group_clazz_focus");
						}
						groupClazz.child.hide();
						delete groupClazz.child;
						
						
						var selectedClosed = self.getSelectedClosed();
						var clazzesSelect = self.context.elements[0].clazzesSelects;
						if(clazzesSelect && clazzesSelect.size()>0)
						{
							clazzesSelect = clazzesSelect.elements[clazzesSelect.size() - 1];
						}
						else clazzesSelect = null;
						
						if(clazzesSelect == target && selectedClosed)
						{
							self.setSelectedClosed(false);
							self.selected();
							self.groupContentTab.scrollerfixed();
							var reals = groupClazzTable.children(".group_clazz_select_real");
							if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
						}
						else if(!selectedClosed)
						{
							self.selected(clazzIndex);
							self.groupContentTab.scrollerfixed(evt);
							var reals = groupClazzTable.children(".group_clazz_select_real");
							if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
						}
						
						
						childList.removeSelected();
						groupClazz.removeClass("group_clazz_select_real");
						self.groupContentTab.scrollerfixed();
						var reals = groupClazzTable.children(".group_clazz_select_real");
						if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
					}
					else
					{
						arrowClazzPic.sin({time:100, prop:"left1", value:"0",  callback:function(a,b,c)
						{
							if(c < 100)
							{
								groupClazz.addClass("group_clazz_middle6");
								
							}
							else if(c==100)
							{
								groupClazz.removeClass("group_clazz_middle6").removeClass("group_clazz_select").removeClass("group_clazz_select_real").addClass("group_clazz");
								if(groupClazz.match(".group_clazz_select_focus"))
								{
									groupClazz.removeClass("group_clazz_select_focus").addClass("group_clazz_focus");
								}
								groupClazz.child.hide();
								delete groupClazz.child;
								
								var selectedClosed = self.getSelectedClosed();
								var clazzesSelect = self.context.elements[0].clazzesSelects;
								if(clazzesSelect && clazzesSelect.size()>0)
								{
									clazzesSelect = clazzesSelect.elements[clazzesSelect.size() - 1];
								}
								else clazzesSelect = null;
								
								if(clazzesSelect == target && selectedClosed)
								{
									self.setSelectedClosed(false);
									self.selected();
									self.groupContentTab.scrollerfixed();
									var reals = groupClazzTable.children(".group_clazz_select_real");
									if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
								}
								else if(!selectedClosed)
								{
									self.selected(clazzIndex);
									self.groupContentTab.scrollerfixed(evt);
									var reals = groupClazzTable.children(".group_clazz_select_real");
									if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
								}
								
								childList.removeSelected();
								self.groupContentTab.scrollerfixed();
								
							}
						}});
						groupClazz.removeClass("group_clazz_select_real")
					}
				}
			});
			groupClazz.fire("click");//groupClazz.fire("click");
		});
		self.selected(0);
	}
});