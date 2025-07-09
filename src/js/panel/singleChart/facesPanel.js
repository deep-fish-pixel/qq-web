WebChat.Ext.panel.FramePanel.extend('WebChat.Ext.Panel.FacesPanel',
{
	init:function(context, container, option)
	{
		this._super("init", context, container,option);
	},
	onInit:function(context, container, option)
	{
		this.context.width(this.option.width).height(this.option.height);
		this._super("onInit", context, container);
		this.content = Sharp('<div class="faces_content"></div>').addTo(this.content);
		if(this.option.trigger)this.option.trigger.addClass("pic_text_outer_select");
		this.initTabs();
	},
	initTabs:function()
	{
		var facesTabPanel = this.facesTabPanel = new WebChat.Ext.Panel.FacesTabPanel(Sharp('<div class="faces_tab_panel noselect" parentdragable="true"></div>'), this, 4,{noSetWidth:true});
		
		
		facesTabPanel.add("", "../css/pic/Res/AppFramework/CustomFace/StoreFace/classic_page_focus.png","默认",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div></div>').addTo(parent);
			return tabLi;	
		},function(data, friendConentPanel)
		{
			
			
		});
		
		facesTabPanel.add("", "../css/pic/Res/AppFramework/CustomFace/StoreFace/sys2_page_focus.png","生活",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div></div>').addTo(parent);
			return tabLi;	
		},function(data, friendConentPanel)
		{
			
			
		});
		facesTabPanel.add("", "../css/pic/Res/AppFramework/CustomFace/StoreFace/emoji_page_focus.png","符号表情",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'><img class="tab_pic" src="'+ tabPic +'" style=" margin-top: 10px;"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div></div>').addTo(parent);
			return tabLi;	
		},function(data, friendConentPanel)
		{
			
			
		});
		
		facesTabPanel.add("", "../css/pic/Res/AppFramework/CustomFace/StoreFace/default_tab_icon_focus_0.png","我的收藏",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div></div>').addTo(parent);
			return tabLi;	
		},function(data, friendConentPanel)
		{
			
			
		});
		
		new WebChat.Ext.Panel.FacesTabContentPanel(Sharp('<div class="faces_tab_content_panel noselect" parentdragable="true"></div>'), facesTabPanel, {tabIndex:0, data:WebChat.Ext.Panel.FacesTabContentPanel.defaultFacesData});
		new WebChat.Ext.Panel.FacesTabContentPanel(Sharp('<div class="faces_tab_content_panel noselect" parentdragable="true"></div>'), facesTabPanel, {tabIndex:1, data:WebChat.Ext.Panel.FacesTabContentPanel.liveFacesData});
		facesTabPanel.tabSelected(0);
		
	},
	initContent:function()
	{
		
	},
	resite:function()
    {
		var trigger = this.option.trigger;
		var triggerPos = trigger.getAbsPos();
		var left = triggerPos.x-this.context.width()/2;
		this.context.left(left<=3?3:left).top(triggerPos.y -this.context.height()-6);
		this.initBackground();
		this.background.click(this.callback("remove"));
    },
	initBackground:function()
    {
		var background = this.background, target = this.context;
        var position = target.getAbsPos();
        var borderLeftWidth = target.style("border-left-width"),borderTopWidth = target.style("border-top-width");
		var sys = Sharp.getSystem();
		background.style("left", -position.x - borderLeftWidth);
        background.style("top", -position.y - borderTopWidth);
		if(sys.ie)
		{
			background.style("width", document.documentElement.scrollWidth);
			background.style("height", document.documentElement.scrollHeight-1);
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
	remove:function()
	{
		this._super("remove");
		if(this.option.trigger)this.option.trigger.removeClass("pic_text_outer_select");
	},
	output:function(htmlStr)
	{
		if(this.option.outputPanel)
		{
			this.option.outputPanel.outputFace(htmlStr);
		}
	}
});