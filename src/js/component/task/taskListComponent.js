WebChat.Base.Component.extend('WebChat.Ext.Component.TaskListComponent',
{
	compHeight:function(totalHeight, height, margin)
	{
		var result = totalHeight%(height+margin);
		var size = Math.floor(totalHeight/(height+margin));
		if(!size)size = 1;
		return {height:height+result/size, sizeY:size};
	},
	compWidth:function(totalWidth, width, marginLeft)
	{
		var result = totalWidth%(width+marginLeft);
		var size = Math.floor(totalWidth/(width+marginLeft));
		
		return {width:width+result/size, sizeX:size};
	},
	getMatrix:function(totalWidth, totalHeight, width, height, marginLeft, marginTop)
	{
		var heightObj = this.compHeight(totalHeight, height, marginTop);
		var widthObj= this.compWidth(totalHeight, width, marginLeft);
		return Sharp.extend(widthObj, heightObj);
	},
	getPosition:function(element, tasks, option, index)
	{
		var length = arguments.length>3? index+1 : tasks.length;
		var ret1;
		var ret2 = length%option.sizeY;
		if(!ret2)
		{
			ret2 = option.sizeY;
		}
		ret1 = Math.ceil(length/option.sizeY);
		
		return {
				x:option.totalWidth - (option.width + option.marginLeft)*ret1 + option.marginLeft,
				y:option.totalHeight - (option.height + option.marginTop)*ret2 + option.marginTop
			};
	}
},
{
    init:function(context, container, option)
    {
        this._super("init", context, container);
		var defaultOption = {width:50,height:53,marginTop:4,marginLeft:4};
		this.option = Sharp.extend(defaultOption,option);
		this.option.initHeight = this.option.height;
		this.option.initWidth = this.option.width;
		this.tasks=[];
		this.positions=[];
    },
    onInit:function(context, container, data) 
    {
		this.content = Sharp('<div class="task_content_list"></div>').addTo(this.content);
		this.refreshParam();
	},
	refreshParam:function()
	{
		var totalHeight = this.option.totalHeight = this.container.context.height();
		var totalWidth = this.option.totalWidth= this.container.context.width();
		var matrix = this.clazz.getMatrix(totalWidth, totalHeight, this.option.initWidth, this.option.initHeight, this.option.marginLeft, this.option.marginTop);
		this.option.height = matrix.height;
		this.option.sizeX = matrix.sizeX;
		this.option.sizeY = matrix.sizeY;
	},
	add:function(taskInfo)
	{
		var element = taskInfo.draw(this);
		element.addTo(this.content);
		taskInfo.setParentUnit(this.container);
		this.tasks.push(taskInfo);
		this.setPosition(element, this.tasks.length-1);
		this.showSelected();
	},
	remove:function(taskInfo)
	{
		Sharp.iter(this.tasks, function(taskInfoTemp, index)
		{
			if(taskInfo == taskInfoTemp && taskInfo.element)
			{
				taskInfo.element.remove();
				this.tasks.splice(index,1);
				return true;
			}
		}, this);
		var self = this;
		self.resize();
		//setTimeout(function(){self.resize();},300);
		
	},
	draw:function(data)
	{
		var elementStr = '<div class="pic_text_outer">'
			+'<div class="pic_content"><img class="pic" src="'+data.pic+'"/><i></i></div></div>';
		var element = Sharp(elementStr).addTo(this.content);
		this.tasks.push(element);
		this.setPosition(element, this.tasks.length-1);
	},
	setPosition:function(element, index)
	{
		var pos = this.clazz.getPosition(element, this.tasks, this.option, index);
		element.height(this.option.height);
		element.stop(false);
		var top = element.top();
		var left = element.left();
		if((Math.abs(pos.y - top)>1 || Math.abs(pos.x - left)>1) && !Sharp.isMoving(element, "top"))
		{
			element.sin({time:500,prop:"left",value:pos.x,rate:3000,originPoint:0,terminalPoint:1},{time:500,prop:"top",value:pos.y,rate:3000,originPoint:0,terminalPoint:2,decay:0.04,maxSumLimit:true});
		}
		//element.top(pos.y).left(pos.x);
		if(index<this.positions.length)
		{
			this.positions[index]={x:pos.x,y:pos.y};
		}
		else
		{
			this.positions.push({x:pos.x,y:pos.y});
		}
	},
	setLeftPos:function(element, index)
	{
		element.left(this.context.width() - (this.option.width));
		
	},
	del:function(data)
	{
		
		
	},
	click:function(element, data)
    {
		//if(data)data.fireElement=element;
        if(data.click)data.click(element, data);
    },
	getOption:function()
	{
		return this.option;
	},
	resizeWidth:function()
	{
		this.refreshParam();
		Sharp.iter(this.tasks, function(task, index)
		{
			this.setPosition(task.element, index);
		},this);
	},
	resize:function()
	{
		this.refreshParam();
		Sharp.iter(this.tasks, function(task, index)
		{
			this.setPosition(task.element, index);
		},this);
		
	},
	showSelected:function(mainPanel,loginPanel,extask)
	{
		var desk = this.container.container;
		var context = desk.getMaxContext(extask?extask.unit.context:null);
		var mainPanelContext = desk.context.children(".main_panel");
		var framePanelContext = desk.context.children(".frame_panel");
		if(this.selectedTaskInfo)
		{
			this.selectedTaskInfo.element.removeClass("pic_text_outer_selected");
			this.selectedTaskInfo = null;
		}
		
		if(context && (!mainPanel || !loginPanel || mainPanelContext.size()==0))
		{
			var panel = context;
			Sharp.iter(this.tasks, function(task, index)
			{
				if(task.unit.context.elements[0] == panel.elements[0] &&  context.style("display")!="none")
				{
					task.element.addClass("pic_text_outer_selected");
					this.selectedTaskInfo = task;
					return true;
				}
				
			},this);
			
			var firstTask = this.tasks[0];
			if(firstTask)
			{
				if(!this.selectedTaskInfo && firstTask.unit.context.style("display")!="none")
				{
					firstTask.element.addClass("pic_text_outer_selected");
					this.selectedTaskInfo = firstTask;
				}
				else if(mainPanel && mainPanel.show)
				{
					if(this.selectedTaskInfo)
					{
						this.selectedTaskInfo.element.removeClass("pic_text_outer_selected");
						this.selectedTaskInfo = null;
					}
					firstTask.element.addClass("pic_text_outer_selected");
					this.selectedTaskInfo = firstTask;
				}
				else
				{
					firstTask.element.removeClass("pic_text_outer_selected");
				}
			}
		}
		else
		{
			if(framePanelContext.size() >0)
			{
				if(loginPanel)
				{
					this.tasks[0].element.addClass("pic_text_outer_selected");
					return true;
				}
				this.tasks[0].element.removeClass("pic_text_outer_selected");
				this.selectedTaskInfo = this.tasks[0];
				return true;
			}
			
			if(mainPanelContext.style("display")=="none")
			{
				Sharp.iter(this.tasks, function(task, index)
				{
					if(context && task.unit.context.elements[0] == context.elements[0] &&  context.style("display")!="none")
					{
						task.element.addClass("pic_text_outer_selected");
						this.selectedTaskInfo = task;
						return true;
					}
				},this);
				return;
			}
			/*Sharp.iter(this.tasks, function(task, index)
			{
				task.element.removeClass("pic_text_outer_selected");
			},this);*/
			if(mainPanelContext && this.tasks[0].unit.context.elements[0] == mainPanelContext.elements[0] &&  mainPanelContext.style("display")!="none" && (!extask|| extask.unit.context.elements[0] != mainPanelContext.elements[0]))
			{
				this.tasks[0].element.addClass("pic_text_outer_selected");
				this.selectedTaskInfo = this.tasks[0];
			}
		}
	}
});