WebChat.Base.Component.extend('WebChat.Ext.Component.HeaderOperateComponent',
{
	expandMaxScreen:function(target, container, task)
    {
        var initMenuBackgroundWidth = target.style("width") || target.prop("offsetWidth");
        var initMenuBackgroundLeft = target.style("left") || target.prop("offsetLeft");
        var initMenuBackgroundHeight = target.style("height") || target.prop("offsetHeight");
        var initMenuBackgroundTop = target.style("top") || target.prop("offsetTop");
        var position = container.getAbsPos();
        var borderLeftWidth = container.style("border-left-width"),borderTopWidth = container.style("border-top-width");
		var borderRightWidth = container.style("border-right-width"),borderBottomWidth = container.style("border-bottom-width");
		var sys = Sharp.getSystem();
		//target.style("left", - borderLeftWidth);
        //target.style("top", - borderTopWidth);
		var allOuterWidth = borderLeftWidth; 
		var outlineWidth = container.style("outline-width");
		
		var taskWidth = task.width();
		
		target.style("top", -borderTopWidth);
		target.style("left", taskWidth-borderLeftWidth);
		
		if(sys.ie)
		{
			target.style("width", document.body.clientWidth-taskWidth);
			target.style("height", document.body.clientHeight);
		}
		else if(sys.chrome)
		{
			//target.style("width", document.body.scrollWidth-borderLeftWidth-borderRightWidth-taskWidth);
			//target.style("height", document.body.scrollHeight-borderTopWidth-borderBottomWidth);
			target.style("width", document.body.clientWidth-taskWidth);
			target.style("height", document.body.clientHeight);
		}
		else
		{
			target.style("width", document.body.clientWidth-taskWidth);
			target.style("height", document.body.clientHeight);
		}
      	return {top:-borderTopWidth,left:taskWidth-borderLeftWidth,width:document.body.clientWidth-taskWidth,height:document.body.clientHeight};
    }
},
{
    init:function(context, container, data)
    {
        this._super("init", context, container, data);
		this.status={min:false,max:false};
		var self = this;
		var task = this.container.container.getUnitsByClass(WebChat.Ext.Panel.TaskManagePanel);
		this.preDefines=
		{
			close:{title:"关闭","class":"close",pic1:"../css/general/pic/btn_close_normal.png",click:this.callback("close")},
			min:{title:"最小化","class":"min",pic1:"../css/general/pic/btn_mini_normal.png",click:this.callback("setMin")},
			max:{title:"最大化","class":"max",pic1:"../css/general/pic/btn_max_normal.png",click:this.callback("_setMax", task[0])},
			chartSet:{title:"设置","class":"chart_set",pic1:"./css/pic/Res/ChatFrame/AIO_SetBtn_normal.png",click:function()
					{
						var menuData=[
						{pic:"",text:"保持窗口最前",click:function(){}},
						{pic:"./css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"合并会话窗口",line:true,click:function(){}},
						{pic:"./css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"显示自己的皮肤",click:function(){}},
						{pic:"",text:"皮肤管理",line:true,click:function(){}},
						{pic:"",text:"更多设置",click:function(){}}
						];
						new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, menuData, this.fireElement, 130);
					}},
			skinSet:{title:"更改外观","class":"skin_set",pic1:"./css/pic/Res/MainPanel/Button/btn_Skin_normal.png",click:function(){}},
			loginSet:{title:"设置","class":"login_set",pic1:"./css/pic/Res/LoginUI/btn_set_normal.png",click:function(){}}
		}
		this.types = [];
    },
    onInit:function(context, container, data)
    {
		var self = this;
		Sharp.iter(data.types, function(item)
		{
			var temp = self.preDefines[item.typeName];
			if(temp)
			{
				Sharp.extend(temp,item);
				self.types.push(temp);
			}
		});
		this.pictureListComponent = new WebChat.Ext.Component.PictureListComponent(Sharp('<div class="group_pic_list_component" parentdragable="true"></div>'), this, self.types);
	},
	isMin:function()
	{
		return this.status.min;
	},
	isMax:function()
	{
		return this.status.max;
	},
	_setMax:function(task, element)
	{
		var maxData = this.preDefines.max;
		this.status.max = !this.status.max;
		if(this.status.max)
		{
			var picContent = maxData.fireElement.find(".pic_content").addClass("max_wicket");
			picContent.parent().parent().attr("title","还原");
			this.container.maxOperate(task);
		}
		else
		{
			var picContent = maxData.fireElement.find(".pic_content").removeClass("max_wicket");
			picContent.parent().parent().attr("title","最大化");
			this.container.restoreNormalOperate();
		}
	},
	setMax:function(task, element)
	{
		var maxData = this.preDefines.max;
		this.status.max = !this.status.max;
		if(this.status.max)
		{
			maxData.fireElement.find(".pic_content").addClass("max_wicket");
			this.container.maxOperate(task);
		}
		else
		{
			maxData.fireElement.find(".pic_content").removeClass("max_wicket");
			this.container.restoreNormalOperate();
		}
	},
	setMin:function()
	{
		this.container.setMin();
		//this.container.context.attr("dragable","true").removeClass("max_panel").zoomable();
	},
	close:function()
	{
		this.container.remove();
	},
	setMaxFlag:function(flag)
	{
		this.status.max = flag;
	}
});