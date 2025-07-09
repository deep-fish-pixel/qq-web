Sharp.Class.extend('WebChat.object.TaskInfo',
{
	init:function(option)
	{
		if(option)
		{
			this.name = option.name;
			this.pic = option.pic;
			this.unit = option.unit;
		}
		this.elementContext = Sharp(document.createElement("div"));
		this.children = Sharp(document.createElement("div"));
		this.childTasks = [];
		this.parentUnit = null;
		this.taskList = null;
		this.flag = Math.random()*100000;
	},
	setName:function(name)
	{
		this.name = name;
	},
	setPic:function(pic)
	{
		this.pic = pic;
	},
	setUnit:function(unit)
	{
		this.unit = unit;
	},
	setParentUnit:function(parentUnit)
	{
		this.parentUnit = parentUnit;
	},
	add:function(taskInfo)
	{
		taskInfo.remove();
		taskInfo.setParentUnit(this);
		this.childTasks.push(taskInfo);
	},
	remove:function(taskInfo)
	{
		var temp;
		if(taskInfo)for(var i=0; i< this.childTasks.length; i++)
		{
			temp = this.childTasks[i];
			if(temp.unit== taskInfo.unit)
			{
				if(temp.element)temp.element.remove();
				this.childTasks.splice(i,1);
				i--;
			}
		}
		else if(this.parentUnit)
		{
			this.parentUnit.remove(this);
		}
	},
	draw:function(taskList)
	{
		//this.remove();
		this.taskList = taskList;
		this.elementContext.empty();
		var elementStr = '<div class="pic_text_outer" >'
			+'<div class="pic_content" parentdragable="true"><img class="pic" parentdragable="true" src="'+this.pic+'"/><i></i></div>'
			+'<div class="back_color_show">'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'<div class="back_color"></div><div class="back_color"></div><div class="back_color"></div><div class="back_color"></div>'
			+'</div></div>';
		var element = this.element = Sharp(elementStr).addTo(this.elementContext);
		var backColors = element.find(".back_color");
		
		element.mouseover(function(evt)
		{
			var x = Sharp.getEventX(evt);
			var y = Sharp.getEventY(evt);
			var width = element.width();
			var height = element.height();
			var pos = element.getAbsPos()
			var subx = x - pos.x;
			var suby = y - pos.y;
			var y1 = subx;
			var y2 = height-subx*height/width;
			var addClass;
			if(suby < y1 )
			{
				if(suby < y2)addClass = "back_color_top";
				else addClass = "back_color_right";
			}
			else
			{
				if(suby < y2)addClass = "back_color_left";
				else addClass = "back_color_bottom";
			}
			element.addClass(addClass);
			
		}).mouseout(function(evt)
		{
			element.removeClass("back_color_top").removeClass("back_color_right");
			element.removeClass("back_color_left").removeClass("back_color_bottom");
		});
		
		var self = this;
		this.top = 0,this.left = 0;
		var flag = true;
		
		element.click(function()
		{
			if(!flag)return;
			flag = false;
			var element = self.element;
			var context = self.unit.context;
			var isMainPanel = context.match(".main_panel");
			var isFrame_panel = context.match(".frame_panel");
			var sys = Sharp.getSystem();
			if(context.style("display") == "none")
			{
				
				
				self.show();
				element.addClass("pic_text_outer_selected");
				
				if(element)
				{
					
					if(!isMainPanel && !isFrame_panel)context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
					if(sys.ie<=9)
					{
						context.top(self.top).left(self.left);
						flag = true;
					}
					else
					{
						context.addClass("task_info_panel_min");
						setTimeout(function(){context.top(self.top).left(self.left).addClass("task_info_panel_middle")},0);
						setTimeout(function(){context.removeClass("task_info_panel_min").removeClass("task_info_panel_middle").style("opacity",1);flag = true;},310);
					}
				}
				if(isMainPanel)self.taskList.showSelected({show:true});
				else if(isFrame_panel)self.taskList.showSelected(false, true);
				else self.taskList.showSelected();
			}
			else
			{
				var maxContext = desk.getMaxContext();
				if(element && ((maxContext && maxContext.elements[0] == context.elements[0]) ||isMainPanel ||isFrame_panel))
				{
					self.top = context.top();
					self.left = context.left();
					var pos = element.getAbsPos();
					if(sys.ie<=9)
					{
						context.top(pos.y-context.height()/2+20).left(pos.x-context.width());
						self.hide();
						flag = true;
					}
					else
					{
						context.addClass("task_info_panel_min");
						setTimeout(function()
						{
							context.style("opacity",0.2).top(pos.y-context.height()/2+20).left(pos.x-context.width());
						},0);
						setTimeout(function()
						{
							context.removeClass("task_info_panel_min").removeClass("task_info_panel_middle");
							context.removeClass("task_info_panel_min").removeClass("task_info_panel_middle");
							self.hide();
							flag = true;
						},310);
					}
					self.taskList.showSelected(false,false,self);
				}
				else
				{
					context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
					if(isMainPanel)self.taskList.showSelected(true);
					else if(isFrame_panel)self.taskList.showSelected(false, true);
					else self.taskList.showSelected();
					flag = true;
				}
			}
		});
		return this.element;
	},
	show:function()
	{
		if(this.unit)this.unit.show();
	},
	hide:function()
	{
		if(this.unit)this.unit.hide();
	},
	showSelected:function()
	{
		if(this.taskList)this.taskList.showSelected();
	},
	setMax:function(noAnimate)
	{
		var element = this.element;
		var context = this.unit.context;
		if(context.style("display") == "none")
		{
			this.show();
			var self = this;
			var isMainPanel = context.match(".main_panel");
			var isFrame_panel = context.match(".frame_panel");
			element.addClass("pic_text_outer_selected");
			if(element)
			{
				if(noAnimate)
				{
					if(!context.match(".main_panel"))context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
					context.top(self.top).left(self.left);
					context.style("opacity",1);
					flag = true;
				}
				else
				{
					var sys = Sharp.getSystem();
					if(sys.ie<=9)
					{
						if(!context.match(".main_panel"))context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
						context.top(self.top).left(self.left);
						flag = true;
					}
					else
					{
						context.addClass("task_info_panel_min");
						if(!context.match(".main_panel"))context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
						setTimeout(function(){context.top(self.top).left(self.left).addClass("task_info_panel_middle")},0);
						setTimeout(function(){context.removeClass("task_info_panel_min").removeClass("task_info_panel_middle").style("opacity",1);flag = true;},310);
					}
				}
			}
			if(isMainPanel)self.taskList.showSelected(true);
			else if(isFrame_panel)self.taskList.showSelected(false, true);
			else self.taskList.showSelected();
		}
	},
	setMin:function()
	{
		var element = this.element;
		var context = this.unit.context;
		var isMainPanel = context.match(".main_panel");
		var isFrame_panel = context.match(".frame_panel");
		var self = this;
		var maxContext = desk.getMaxContext();
		if(element && ((maxContext && maxContext.elements[0] == context.elements[0]) ||isMainPanel || isFrame_panel))
		{
			self.top = context.top();
			self.left = context.left();
			var pos = element.getAbsPos();
			var sys = Sharp.getSystem();
			if(sys.ie<=9)
			{
				context.top(pos.y-context.height()/2+20).left(pos.x-context.width());
				self.hide();
				flag = true;
			}
			else
			{
				context.addClass("task_info_panel_min");
				setTimeout(function()
				{
					context.style("opacity",0.2).top(pos.y-context.height()/2+20).left(pos.x-context.width());
				},0);
				setTimeout(function()
				{
					context.removeClass("task_info_panel_min").removeClass("task_info_panel_middle");
					self.hide();
					flag = true;
				},310);
			}
			self.taskList.showSelected(false,false,self);
		}
		else
		{
			context.style("z-index", WebChat.Ext.Panel.ChartPanel.getZIndex());
			if(isMainPanel)self.taskList.showSelected(true);
			else if(isFrame_panel)self.taskList.showSelected(false, true);
			else self.taskList.showSelected();
			flag = true;
		}
	}
});