// JavaScript Document
WebChat.Base.Panel.extend('WebChat.Ext.Panel.TaskManagePanel',
{
	init:function(context, container, settings)
	{
		this._super("init", context, container);
		this.settings = settings||{};
		this.taskIndex =0;
		this.tasksData=[];
	},
	onInit:function(context, container)
	{
		
		Sharp('<table style="width:100%;height:100%;" class="task_background"><tr><td style="width:100%;height:100%;"><div style="width:100%;height:100%;" class="task_first_child"></div></td><td style="width:20px;height:100%;"><div style="width:10px;height:100%;" class="task_last_child"></div></td></tr></table>').addTo(this.context);
		//this.content = Sharp('<div class="panel_content task_content_panel"></div>').addTo(context);
		var self = this;
		this.context.zoomable({minWidth:50,maxWidth:300,width:3,endFunc:function(zoomObject)
		{
			self.container.resizeMaxPanel();
			var context = self.context;
			var pos = context.getAbsPos();
			self.taskListComponent.resizeWidth();
		}});
		
		this.context.children(".border_zoomer").hide().get(1).show();
		this.taskListComponent = new WebChat.Ext.Component.TaskListComponent(Sharp('<div class="task_contents"></div>'),this);
		
	},
	add:function(data)
	{
		this.taskListComponent.add(data);
	},
	remove:function(data)
	{
		this.taskListComponent.remove(data);
		if(this.taskListComponent.tasks.length ==0 && data.unit && !data.unit.instanceOf(WebChat.Ext.panel.LoginFramePanel))
		{
			desk.addLoginFramePanel();
		}
	},
	resize:function()
	{
		this.taskListComponent.resize();
	},
	showSelected:function(mainPanel)
	{
		this.taskListComponent.showSelected(mainPanel);
	}
});