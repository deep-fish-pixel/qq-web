WebChat.Ext.Panel.TabContentPanel.extend('WebChat.Ext.Panel.MainTabContentFriendPanel',
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
		this.friendContentTab = this.content = Sharp('<div class="panel_content tab_content_panel friend_tab_content_panel"></div>').addTo(context);
	},
	up:function(evt)
	{
		var index = this.clazzKeyIndex;
		var preClazz = this.clazzes[index];
		if(preClazz)
		{
			var child = preClazz.match(".friend_clazz_select_real");
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
					preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
				}
				index--;
				if(this.clazzes[index].child&&this.clazzes[index].child.getItems().length >0)
				{
					var selectedItem = this.clazzes[index].child.getSelected();
					preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
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
						preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
						this.clazzes[index].child.selected(selectedItem.items.length-1);
						this.clazzFocus = false;
						this.selectItem = this.clazzes[index].child;
						return this.selectItem;
					}
					else
					{
						preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
					}
				}
				else if(selectedItem.index <=0)
				{
					preClazz.child.removeSelected(true);
				}
				else
				{
					preClazz.child.prev();
					preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
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
			this.friendContentTab.scrollerfixed(evt, clazz, clazz.height());
			this.clazzFocus = true;
			var haschild = clazz.match(".friend_clazz_select_real");
			if(haschild)this.selectItem = clazz.addClass("friend_clazz_select_focus");
			else this.selectItem = clazz.addClass("friend_clazz_focus");
			return this.selectItem;
		}
	},
	down:function(evt)
	{
		var index = this.clazzKeyIndex;
		var preClazz = this.clazzes[index];
		if(preClazz)
		{
			var child = preClazz.match(".friend_clazz_select_real");
			if(!child)
			{
				if(index == this.clazzes.length-1)
				{
					this.clazzFocus = true;
					this.selectItem = this.clazzes[this.clazzKeyIndex]
					return this.selectItem;
				}
				preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
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
						preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
					}
					else
					{
						preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
						preClazz.child.selected(0);
						this.clazzFocus = false;
						this.selectItem = preClazz.child;
						return this.selectItem;
					}
					/*else
					{
						preClazz.removeClass("friend_clazz_focus");
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
							preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
							this.clazzFocus = false;
							this.selectItem = preClazz.child;
							return this.selectItem;
						}
					}
					else if(selectedItem.index == -1)
					{
						preClazz.child.selected(0);
						preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
						this.clazzFocus = false;
						this.selectItem = preClazz.child;
						return this.selectItem;
					}
					else
					{
						preClazz.child.next();
						preClazz.removeClass("friend_clazz_focus").removeClass("friend_clazz_select_focus");
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
			this.friendContentTab.scrollerfixed(evt, clazz, clazz.height());
			this.clazzFocus = true;
			var haschild = clazz.match(".friend_clazz_select_real");
			if(haschild)this.selectItem = clazz.addClass("friend_clazz_select_focus");
			else this.selectItem = clazz.addClass("friend_clazz_focus");
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
			clazz.removeClass("friend_clazz_select_focus").removeClass("friend_clazz_focus");
			var haschild = clazz.match(".friend_clazz_select_real");
			if(!notRemoveChildSelected&& haschild && clazz.child.removeSelected)clazz.child.removeSelected(true);
		}
		
		if(this.clazzKeyIndex == -1)this.clazzKeyIndex=0;
		index = arguments.length==0?this.clazzKeyIndex:index;
		if(index >=0 && index<this.clazzes.length)
		{
			clazz = this.clazzes[index];
			var haschild = clazz.match(".friend_clazz_select_real");
			if(haschild) clazz.addClass("friend_clazz_select_focus");
			else clazz.addClass("friend_clazz_focus");
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
			clazz.removeClass("friend_clazz_select_focus").removeClass("friend_clazz_focus");
			var haschild = clazz.match(".friend_clazz_select_real");
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
		var friendClazzTable = Sharp('<ul class="friend_clazz_table animate"></ul>').addTo(this.content);
		var self =this;
		Sharp.iter(data, function(clazz,index)
		{
			var friendClazz = Sharp('<li class="friend_clazz"><div class="arrow_clazz"><div class="arrow_clazz_div"><div class="arrow_clazz_pic"></div></div></div><div class="clazz_info"><div class="clazz_info_div"><div class="clazz_name">'+clazz.name+'</div><div class="clazz_friend_num"> ['+clazz.friends.length+'/'+clazz.friends.length+']</div></div></div></li>').addTo(friendClazzTable);
			self.clazzes.push(friendClazz);
			var clazzIndex = self.clazzes.length - 1;
			var friendClazzFriends = Sharp('<li class="clazz_friends_none"><div class="clazz_friends" colspan="2"></div></li>').addTo(friendClazzTable);
			var arrowClazzPic = friendClazz.find(".arrow_clazz_pic");
			var child;
			var childList;
			friendClazz.click(function(evt)
			{
				self.selected(clazzIndex, true);
				var target = this;
				if(friendClazz.match(".friend_clazz"))
				{
					if(childList)
					{
						if(Sharp.getSystem().ie)
						{
							childList.show();
							var selectClassFriends = friendClazz.next().show();
							friendClazz.child = childList;
							friendClazz.removeClass("friend_clazz_middle5").addClass("friend_clazz_select").removeClass("friend_clazz").addClass("friend_clazz_select_real");
							if(friendClazz.match(".friend_clazz_focus"))
							{
								friendClazz.removeClass("friend_clazz_focus").addClass("friend_clazz_select_focus");
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
								if(self.friendContentTab)self.friendContentTab.scrollerfixed();
								var reals = friendClazzTable.children(".friend_clazz_select_real");
								if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
							}
							else if(!selectedClosed)
							{
								self.selected(clazzIndex);
								if(self.friendContentTab)self.friendContentTab.scrollerfixed(evt);
								var reals = friendClazzTable.children(".friend_clazz_select_real");
								if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
							}
						}
						else
						{
							arrowClazzPic.sin({time:100, prop:"left1", value:"0",  callback:function(a,b,c)
							{
								if(c < 100)
								{
									friendClazz.addClass("friend_clazz_middle5");
								}
								else if(c==100)
								{
									childList.show();
									var selectClassFriends = friendClazz.next().show();
									
									friendClazz.child = childList;
									friendClazz.removeClass("friend_clazz_middle5").addClass("friend_clazz_select").removeClass("friend_clazz").addClass("friend_clazz_select_real");
									if(friendClazz.match(".friend_clazz_focus"))
									{
										friendClazz.removeClass("friend_clazz_focus").addClass("friend_clazz_select_focus");
									}
									//self.context.elements[0].clazzesSelects = friendClazzTable.children(".friend_clazz_select_real");
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
										self.friendContentTab.scrollerfixed();
										var reals = friendClazzTable.children(".friend_clazz_select_real");
										if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
									}
									else if(!selectedClosed)
									{
										self.selected(clazzIndex);
										self.friendContentTab.scrollerfixed(evt);
										var reals = friendClazzTable.children(".friend_clazz_select_real");
										if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
									}
									
								}
							}});
						}
						
					}
					else
					{
						var selectClassFriends = friendClazz.next().show();
						self.content = selectClassFriends.children();
						var listComponent = childList = new WebChat.Ext.Component.ListComponent(Sharp('<div class="component friend_list_component"></div>'), self,2, 0, function(itemSharp, data, index, pageSize)
						{
							var content = '<div class="list_item_head"><div class="friend_head_pic_div"><img class="friend_head_pic" src="'+data.shortPic
											+'"/></div></div><div class="list_item_info"><label class="friend_showname">'
											+data.showName+'</label><label class="friend_nickname">('+data.nickName
											+')</label><label class="friend_sign_block"></label>';
							var sign = data.sign;
							if(sign)
							{
								for(var i=0,l=sign.length; i<l; i++)
								{
									content += '<label class="friend_sign_text">'+sign.charAt(i)+'</label>';
								}
							}
							content +='</div>';
							var itemTdSharp = Sharp(content).addTo(itemSharp);
						},{itemDoubleClick:true});
						
						listComponent.addData(clazz.friends);
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
								self.context.addClass("friend_item_selected");
							}
							self.friendContentTab.scrollerfixed(evt, element, this.upordownamount);
							self.clazzKeyIndex = clazzIndex;
						});
						listComponent.setDoubleClickFunc(function(element, data, index, evt)
						{
							
							var chartPanels = desk.getUnitsByClass(WebChat.Ext.Panel.ChartPanelManage);
							if(chartPanels.length==0)
							{
								desk.mainChartPanel = new WebChat.Ext.Panel.SingleChartManage(Sharp('<div class="chart_panel chart_manage_panel single_chart_manage_panel" id="chart_manage_panel" dragable="true"></div>'), desk,{tab:false});
								desk.mainChartPanel.addTaskInfo();
								desk.mainChartPanel.context.resite();
							}
							else
							{
								if(!desk.mainChartPanel)desk.mainChartPanel = chartPanels[0];
								chartPanel = new WebChat.Ext.Panel.SingleChartManage(Sharp('<div class="chart_panel chart_manage_panel single_chart_manage_panel" id="chart_manage_panel" dragable="true"></div>'), desk,{tab:false});				
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
						self.context.elements[0].clazzesSelects = friendClazzTable.children(".friend_clazz_select_real");
						listComponent.hide();
						self.setSelectedClosed(false);
					}
				}
				else if(friendClazz.match(".friend_clazz_select"))
				{
					if(Sharp.getSystem().ie)
					{
						friendClazz.removeClass("friend_clazz_middle6").removeClass("friend_clazz_select").removeClass("friend_clazz_select_real").addClass("friend_clazz");
						if(friendClazz.match(".friend_clazz_select_focus"))
						{
							friendClazz.removeClass("friend_clazz_select_focus").addClass("friend_clazz_focus");
						}
						friendClazz.child.hide();
						delete friendClazz.child;
						
						
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
							self.friendContentTab.scrollerfixed();
							var reals = friendClazzTable.children(".friend_clazz_select_real");
							if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
						}
						else if(!selectedClosed)
						{
							self.selected(clazzIndex);
							self.friendContentTab.scrollerfixed(evt);
							var reals = friendClazzTable.children(".friend_clazz_select_real");
							if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
						}
						
						
						childList.removeSelected();
						friendClazz.removeClass("friend_clazz_select_real");
						self.friendContentTab.scrollerfixed();
						var reals = friendClazzTable.children(".friend_clazz_select_real");
						if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
					}
					else
					{
						arrowClazzPic.sin({time:100, prop:"left1", value:"0",  callback:function(a,b,c)
						{
							if(c < 100)
							{
								friendClazz.addClass("friend_clazz_middle6");
								
							}
							else if(c==100)
							{
								friendClazz.removeClass("friend_clazz_middle6").removeClass("friend_clazz_select").removeClass("friend_clazz_select_real").addClass("friend_clazz");
								if(friendClazz.match(".friend_clazz_select_focus"))
								{
									friendClazz.removeClass("friend_clazz_select_focus").addClass("friend_clazz_focus");
								}
								friendClazz.child.hide();
								delete friendClazz.child;
								
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
									self.friendContentTab.scrollerfixed();
									var reals = friendClazzTable.children(".friend_clazz_select_real");
									if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
								}
								else if(!selectedClosed)
								{
									self.selected(clazzIndex);
									self.friendContentTab.scrollerfixed(evt);
									var reals = friendClazzTable.children(".friend_clazz_select_real");
									if(reals.size()>0)self.context.elements[0].clazzesSelects = reals;
								}
								
								childList.removeSelected();
								self.friendContentTab.scrollerfixed();
								
							}
						}});
						friendClazz.removeClass("friend_clazz_select_real")
					}
				}
			});
			friendClazz.fire("click");
		});
		self.selected(0);
	}
});