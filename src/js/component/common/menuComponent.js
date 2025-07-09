WebChat.Base.Component.extend('WebChat.Ext.Component.MenuComponent',
{
    init:function(context, container, menusData, trigger, width, triggerClickedClass, firstDirection)
    {
		this._super("init", context, container);
		if(!container.instanceOf(WebChat.Ext.Component.MenuComponent))
		{
			var temp = container;
			while(temp.container)
			{
				temp = temp.container;
			}
			this.context.addTo(temp.context);
		}
        this.menusData = menusData;
        this.trigger = trigger;
		this.width = width||150;
		this.unitType =31;//菜单组件
		this.triggerClickedClass = triggerClickedClass;
		this.firstDirection = firstDirection;
    },
    onInit:function(context, container)
    {
		if(!this.menusData.length)
		{
			return;
		}
		this.context.width(this.width);
        this.content = Sharp('<div class="component_content menu_component_content"></div>').addTo(context);
		if(container.unitType != 31)this.background = Sharp('<div class="menu_background"></div>').addTo(this.content);
        
        
        this.menuGroup = Sharp('<div class="menu_group"></div>').addTo(this.content);
        var menusData = this.menusData;
        var menusStr ='<table class="menu_group_table">';
        
        Sharp.iter(menusData,function(menu)
        {
			if(!menu)return;
            menusStr +='<tr class="menu_select'+(menu.children? ' menu_children"':'"')+'><td class="menu_pic">'+(menu.pic?'<img src="'+menu.pic+'"/>':"")+'</td><td class="menu_text">'+menu.text+'</td><td class="menu_right">'+(menu.children?'<img src="../css/pic/Res/Mine/Arrow-right3.png"/>':'')+'</td></tr>';
			if(menu.line)
			{
				menusStr +='<tr class="menu_line"><td class="menu_line_pic"></td><td class="menu_line_text"></td><td class="menu_line_right"></td></tr>';
			}
        });
        menusStr +='</table>';
		this.menuGroupTable = Sharp(menusStr).addTo(this.menuGroup);
        this.menuSharps = this.menuGroup.find("tr[class=menu_select]");
		var self = this;
		
		
        this.computePosition(this.context, this.trigger, this.container.container.context)
		if(container.unitType != 31)
		{
			this.initMenuBackground(this.background, this.content);
			var self = this;
			this.background.click(function(event)
			{
				if(event && event.stopPropagation)event.stopPropagation(); 
				else window.event.cancelBubble = true; 
				self.hide();
				self.remove();
			});
		}
		
		this.menuSharps.iter(function(menu, index, menuSharps)
        {
			var currentMenuSharp = Sharp(menu);
            
			if(currentMenuSharp.match(".menu_children"))
			{
				currentMenuSharp.mouseover(self.callback("menuMouseover",index, currentMenuSharp, self, self.menusData[index].children))
				.mouseout(self.callback("menuMouseout", index, currentMenuSharp, self, self.menusData[index].children));
			}
			else
			{
				currentMenuSharp.click(self.callback("menuClick",index, currentMenuSharp));
				currentMenuSharp.mouseover(self.callback("menuMouseover",index, currentMenuSharp, self, null))
				.mouseout(self.callback("menuMouseout", index, currentMenuSharp, self, self.menusData[index].children));
			}
        });
		this.show();
    } ,
    initMenuBackground:function(background, target)
    {
        this.initMenuBackgroundWidth = background.style("width") || background.prop("offsetWidth");
        this.initMenuBackgroundLeft = background.style("left") || background.prop("offsetLeft");
        this.initMenuBackgroundHeight = background.style("height") || background.prop("offsetHeight");
        this.initMenuBackgroundTop = background.style("top") || background.prop("offsetTop");
        var position = target.getAbsPos();
        var borderLeftWidth = target.style("border-left-width"),borderTopWidth = target.style("border-top-width");
		var sys = Sharp.getSystem();
		background.style("left", -position.x - borderLeftWidth);
        background.style("top", -position.y - borderTopWidth);
		if(sys.ie)
		{
			background.style("width", document.documentElement.scrollWidth-10);
			background.style("height", document.documentElement.scrollHeight-10);
		}
		if(sys.chrome)
		{
			background.style("width", document.body.scrollWidth-4);
			background.style("height", document.body.scrollHeight);
		}
		else
		{
			background.style("width", document.documentElement.scrollWidth);
			background.style("height", document.documentElement.scrollHeight);
		}
      
    },
	menuClick:function(index,currentMenuSharp,event)
    {
		if (event && event.stopPropagation)event.stopPropagation(); 
		else window.event.cancelBubble = true; 
		this.hide();
		this.remove();
		var container = this;
		while(container.unitType == 31)
		{
			if(container.container.unitType == 31)
			{
				container = container.container;
			}
			else break;
		}
		container.hide()
		container.remove();
		var menu = this.menusData[index];
        if(menu && menu.click)
		{
			menu.click(currentMenuSharp);
		}
		return false;
    },
	menuMouseover:function(index,currentMenuSharp,parentComponent,menusData,event)
    {
		if (event && event.stopPropagation)event.stopPropagation(); 
		else window.event.cancelBubble = true; 
		var s = event.fromElement || event.relatedTarget ;  
		var f = event.fromElement;
		if( Sharp.contains(currentMenuSharp.elements[0], s)){  
			return false;  
		}
		if(this.childMenu)
		{
			this.childMenu.hide();
			this.childMenu.remove();
			this.childMenu = null;
		}
		if(this.currentMenuSharp)this.currentMenuSharp.removeClass("menu_focus");
		if(menusData)
		{
			//parentComponent.content = currentMenuSharp.find("td").get(2);
			this.childMenu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), parentComponent, menusData, currentMenuSharp, this.width);
		}
		this.currentMenuSharp = currentMenuSharp;
		if(currentMenuSharp)currentMenuSharp.addClass("menu_focus");
		if(this.container.currentMenuSharp)this.container.currentMenuSharp.addClass("menu_focus");
		
    },
	menuMouseout:function(index,currentMenuSharp,parentComponent,menusData,event)
    {
		if (event && event.stopPropagation)event.stopPropagation(); 
		else event.cancelBubble = true; 
        var s = event.toElement || event.relatedTarget;   
        if( Sharp.contains(currentMenuSharp.elements[0], s)){  
			return false;  
		}
		if(parentComponent.childMenu)
		{
			var childContent = parentComponent.childMenu.content;
			if(Sharp.contains(s,childContent.elements[0])||childContent.contains(s))
			{
				return;
			}
			if(this.childMenu)
			{
				this.childMenu.hide();
				this.childMenu.remove();
				this.childMenu = null;
			}
		}
		if(this.currentMenuSharp)this.currentMenuSharp.removeClass("menu_focus");
    },
	hide:function()
	{
		this.context.hide();
		if(this.container.unitType != 31)
		{
			this.background.style("width", this.initMenuBackgroundWidth);
			this.background.style("height", this.initMenuBackgroundHeight);
			this.background.style("left", this.initMenuBackgroundLeft);
			this.background.style("top", this.initMenuBackgroundTop);
		}
	},
	show:function()
	{
		this.context.show();
		if(this.triggerClickedClass)this.trigger.addClass(this.triggerClickedClass);
		if(this.container.unitType != 31)this.initMenuBackground(this.background, this.content);
		if(this.showFunc)this.showFunc(this.trigger,this.data);
	},
	remove:function()
	{
		this._super("remove");
		if(this.triggerClickedClass)this.trigger.removeClass(this.triggerClickedClass);
		if(this.removeFunc)this.removeFunc(this.trigger,this.data);
	},
	setShowAndRemoveFunc:function(showFunc,removeFunc)
	{
		this.showFunc = showFunc;
		this.removeFunc = removeFunc;
	},
	computePosition:function(target, trigger, frame)
	{
		var bodyPositon = Sharp("body").getAbsPos();
		var sys = Sharp.getSystem();
		var bodyWidth = parseInt(document.documentElement.clientWidth);
		var bodyHeight = parseInt(document.documentElement.clientHeight);
		var targetPositon = target.getAbsPos();
		var targetWidth = parseInt(target.prop("offsetWidth"));
		var targetHeight = parseInt(target.prop("offsetHeight"));
		
		var triggerPosition = trigger.getAbsPos();
		var triggerWidth = parseInt(trigger.prop("offsetWidth"));
		var triggerHeight = parseInt(trigger.prop("offsetHeight"));
		
		var framePositon = frame.getAbsPos();
		var frameWidth = parseInt(frame.prop("offsetWidth"));
		var frameHeight = parseInt(frame.prop("offsetHeight"));
		
		if(this.container.unitType != 31)
		{
			var down = true;//向上or向下 优先
			var downGreater  = triggerPosition.y +triggerHeight + targetHeight - framePositon.y-frameHeight;
			var upGreater = framePositon.y-(triggerPosition.y - targetHeight);
			if(downGreater>0 && downGreater>upGreater)down = false;
			var a =triggerPosition.y +triggerHeight + targetHeight - (framePositon.y+frameHeight);
			var b =  triggerPosition.y - targetHeight -framePositon.y;
			if(triggerPosition.x + targetWidth <= bodyWidth)
			{
				//右边展示
				target.style("left", triggerPosition.x  - targetPositon.x - 1).children().addClass("menu_frame_left_margin");
				if(down)
				{
					if(triggerPosition.y + triggerHeight + targetHeight <= bodyHeight || this.firstDirection=="down")
					{
						//向下展示
						target.style("top", triggerPosition.y - targetPositon.y + triggerHeight + 2);
					}
					else
					{
						//向上展示
						target.style("top", triggerPosition.y - targetPositon.y - targetHeight - 2);
					}
				}
				else
				{
					if(triggerPosition.y - targetHeight > 0 && this.firstDirection!="down")
					{
						//向上展示
						target.style("top", triggerPosition.y - targetPositon.y - targetHeight - 2);
					}
					else
					{
						//向下展示
						target.style("top", triggerPosition.y - targetPositon.y + triggerHeight + 2);
					}
				}
			}
			else
			{
				//左边展示
				target.style("left", triggerPosition.x - targetPositon.x + triggerWidth - targetWidth + 1).children().addClass("menu_frame_right_margin");
				if(down)
				{
					if(triggerPosition.y + triggerHeight + targetHeight <= bodyHeight || this.firstDirection=="down")
					{
						//向下展示
						target.style("top", triggerPosition.y - targetPositon.y + triggerHeight + 2);
					}
					else
					{
						//向上展示
						target.style("top", triggerPosition.y - targetPositon.y - targetHeight - 2);
					}
				}
				else
				{
					if(triggerPosition.y - targetHeight > 0  && this.firstDirection!="down")
					{
						//向上展示
						target.style("top", triggerPosition.y - targetPositon.y - targetHeight - 2);
					}
					else
					{
						//向下展示
						target.style("top", triggerPosition.y - targetPositon.y + triggerHeight + 2);
					}
				}
			}
		}
		else
		{
			if(triggerPosition.x + triggerWidth + targetWidth <= bodyWidth)
			{
				//右边展示
				target.style("left", triggerPosition.x + triggerWidth  - targetPositon.x -1).children().addClass("menu_frame_left_margin");
			}
			else
			{
				//左边展示
				target.style("left", triggerPosition.x - targetPositon.x - targetWidth +1).children().addClass("menu_frame_right_margin");
			}
			
			if(triggerPosition.y + targetHeight <= bodyHeight || this.firstDirection=="down")
			{
				//向下展示
				target.style("top", triggerPosition.y - targetPositon.y - 2);
			}
			else
			{
				//向上展示
				target.style("top", triggerPosition.y - targetPositon.y - targetHeight + triggerHeight+2);
			}
		}
		
	}
});