WebChat.Ext.Panel.TabContentPanel.extend('WebChat.Ext.Panel.GroupChartFriendListPanel',
{
	init:function(context, container, setting)
	{
		this._super("init", context, container, 0, setting);
		this.setting = {showBigHeader:false,selectedShowBigHeader:false,selectedShowBigPic:false};
		Sharp.extend(this.setting ,setting);
		this.items = [];
		this.keyIndex = -1;
		this.selectedClosed = false;
	},
	onInit:function(context, container, data)
	{
		this.content = Sharp('<div class="panel_content main_tab_content_group"></div>').addTo(context);
		
	},
	up:function(evt)
	{
		var index = this.keyIndex;
		var preClazz = this.items[index].element;
		if(preClazz)
		{
			preClazz.removeClass("item_selected");
		}
		index--;
		
		if(index == -1)
		{
			this.keyIndex = ++index;
		}
		var clazz = this.items[index].element;
		if(clazz)
		{
			this.keyIndex = index;
			this.context.scrollerfixed(evt, clazz, clazz.height());
			clazz.addClass("item_selected");
		}
	},
	down:function(evt)
	{
		var index = this.keyIndex;
		var preClazz = this.items[index].element;
		if(preClazz)
		{
			preClazz.removeClass("item_selected");
		}
		index++;
		
		if(index == this.items.length)
		{
			this.keyIndex = --index;
		}
		var clazz = this.items[index].element;
		if(clazz)
		{
			this.keyIndex = index;
			this.context.scrollerfixed(evt, clazz, clazz.height());
			clazz.addClass("item_selected");
		}
	},
	focus:function()
	{
		var self = this;
		document.onkeydown = function showKeyDown(evt)
		 {
			evt = (evt) ? evt : window.event;
			var code = evt.keyCode;
			switch(code)
			{
				case 38:
					self.up(evt);
					break;
				case 39:
					break;
				case 40:
					self.down(evt);
					break;
				case 37:
					break;
				case 13:
					self.enter(evt);
					break;
			}
		 }
	},
	lostFocus:function()
	{
		var self = this;
		document.onkeydown = null;
	},
	enter:function()
	{
		
	},
	selected:function(index, notRemoveChildSelected)
	{
		if(this.selectedClosed)return;
		var clazz;
		for(var i=0, l=this.items.length; i<l; i++)
		{
			clazz = this.items[i].element;
			clazz.removeClass("item_selected");
			//if(!notRemoveChildSelected&& haschild && clazz.child.removeSelected)clazz.child.removeSelected(true);
		}
		
		if(this.keyIndex == -1)this.keyIndex=0;
		index = arguments.length==0?this.keyIndex:index;
		if(index >=0 && index<this.items.length)
		{
			clazz = this.items[index].element;
			clazz.addClass("item_selected");
			this.keyIndex = index;
			this.listComponent.selected(this.keyIndex);
		}
		else
		{
			this.keyIndex = -1;
		}
		return clazz;
	},
	getSelected:function()
	{
		return this.items[this.keyIndex];
	},
	removeSelected:function()
	{
		var clazz;
		for(var i=0, l=this.items.length; i<l; i++)
		{
			clazz = this.items[i];
			clazz.element.removeClass("item_selected");
			
			//if(haschild && clazz.child.removeSelected)clazz.child.removeSelected(true);
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
	resizeHeight:function(height)
	{
		height = height||this.container.chartCoreLeft.height()
		//alert(this.coreLeftTableFuncTr.elements[0].style.height);
		this.context.height(height-25-this.coreLeftTableFuncTr.height());
		//this.context.scrollerfixed(evt, this.getSelected().element, 0);
		this.context.scrollerfixed();
	},
	
	addData:function(data)
	{
		//this._super("addData", data);
		var groupClazzTable = Sharp('<ul class="group_clazz_table animate"></ul>').addTo(this.content);
		this.items = this.items.concat(data);
		var self =this;
		this.content = groupClazzTable;
		this.coreLeftTableFuncTr = this.container.context.find(".core_left_table_func_tr");
		this.coreLeftTableUpdown = this.container.context.find(".core_left_table_updown");
		Sharp('<div class="clazz_info_div"><div class="clazz_name">群成员</div><div class="clazz_group_num">&nbsp;[5/5]</div></div><div class="arrow_clazz_div"><div class="arrow_clazz_pic"></div></div><div class="arrow_clazz_search"><div class="arrow_clazz_search_pic"></div></div>').addTo(this.coreLeftTableUpdown);
		
		this.coreLeftTableUpdown.click(function(evt)
		{
			if(self.coreLeftTableUpdown.match(".core_left_table_up"))
			{
				self.coreLeftTableUpdown.removeClass("core_left_table_up");
				self.container.pictureListComponent.context.parent().parent().show();
				self.context.height(self.container.chartCoreLeft.height()-205);
				
			}
			else
			{
				self.coreLeftTableUpdown.addClass("core_left_table_up");
				self.container.pictureListComponent.context.parent().parent().hide();
				self.context.height(self.container.chartCoreLeft.height()-25);
				
			}
			self.context.scrollerfixed(evt, self.getSelected().element, 20);
			
		});
		
		
		var listComponent = this.listComponent = new WebChat.Ext.Component.ListComponent(Sharp('<div class="component group_list_component"></div>'), self,2, 0, function(itemSharp, data, index, pageSize)
		{
			var content = '<div class="list_item_head"><div class="group_head_pic_div"><img class="group_head_pic" src="'+data.shortPic
							+'"/></div></div><div class="list_item_info"><label class="group_showname">'
							+data.showName+'</label><label class="group_nickname">('+data.nickName
							+')</label><label class="group_sign_block"></label>';
			var sign = data.sign;
			/*if(sign)
			{
				for(var i=0,l=sign.length; i<l; i++)
				{
					content += '<label class="group_sign_text">'+sign.charAt(i)+'</label>';
				}
			}*/
			content +='</div>';
			var itemTdSharp = Sharp(content).addTo(itemSharp);
			self.items[index].element=itemSharp;
		},{itemDoubleClick:true});
		
		listComponent.addData(data);
		listComponent.setSelectedClass("item_selected");
		listComponent.setPreSelectedFunc(function(element, data, index, evt)
		{
			self.removeSelected();
			var lists = self.getUnitsByClass(WebChat.Ext.Component.ListComponent);
			Sharp.iter(lists, function(list)
			{
				list.removeSelected();
			});
			this.upordownamount = 0;
		});
		listComponent.setSelectedFunc(function(element, data, index, evt)
		{
			if(self.setting.selectedShowBigPic)
			{
				self.context.addClass("group_item_selected");
			}
			self.context.scrollerfixed(evt, element, this.upordownamount);
			self.keyIndex = index;
			self.focus();
		});
		listComponent.setDoubleClickFunc(function(element, data, index, evt)
		{
			
			var chartPanels = desk.getUnitsByClass(WebChat.Ext.Panel.ChartPanelManage);
			if(chartPanels.length==0)
			{
				desk.mainChartPanel = new WebChat.Ext.Panel.GroupChartManage(Sharp('<div class="chart_panel chart_manage_panel chart_manage_group_panel" id="chart_manage_panel" dragable="true"></div>'), desk,{tab:false});
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
		self.selected(0);
		
	}
});