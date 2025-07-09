// JavaScript Document

WebChat.Base.Panel.extend('WebChat.Ext.Panel.MainPanel',
{
	init:function(context, container, settings)
	{
		this._super("init", context, container);
		this.settings = settings;
		this.taskInfo= new WebChat.object.TaskInfo({unit:this});
	},
	onInit:function(context, container, settings)
	{
		var self = this;
		
		context.prop("dragend",function()
		{
			self.container.resizeMaxPanel();
		});
		this.context.zoomable({minWidth:175,minHeight:97});
		this.content = Sharp('<div class="panel_content main_panel_content"  parentdragable="true" onselectstart="return false"></div>').addTo(context);
		this.headerOperateComponent = new WebChat.Ext.Component.HeaderOperateComponent(Sharp('<div class="header_operate_component main_header_operate_component"></div>'),this,{types:[{typeName:"skinSet"},{typeName:"min"},{typeName:"close"}]});
		
        var table = Sharp('<table class="main_panel_content_table" parentdragable="true"><tr class="first" parentdragable="true"></tr><tr class="second" parentdragable="true"></tr><tr class="third" parentdragable="true"></tr></table>').addTo(this.content);
        var trs = table.find("tr");
		
        this.content = trs.get(0);
		var mainHeaderComponent = new WebChat.Ext.Component.MainHeaderComponent(Sharp('<div class="component main_header_component" parentdragable="true"></div>'), this, this.settings);
		
		this.content = trs.get(1);
		var mainTabPanel = this.mainTabPanel = new WebChat.Ext.Panel.MainTabPanel(Sharp('<div class="panel main_tab_panel noselect" id="main_tab_panel" border="0" cellpadding="0" cellspacing="0" unselectable="on"></div>'), this, 5);
		var friendSetting= this.settings.friendSetting;
		var groupSetting= this.settings.groupSetting;
		
		mainTabPanel.add("", "../css/pic/Themes/Default/MainPanel/icon_contacts_normal.png","../css/pic/Themes/Default/MainPanel/icon_contacts_selected.png","联系人",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'"><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div>'+'<div class="down_array" onmousedown="return false;" style="right: 80%;"><img class="down_array_pic" src="../css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"/></div></div>').addTo(parent);
			var trigger = tabLi.children(".down_array");
			var self = mainTabPanel;
			if(friendSetting.showBigHeader)this.units[0].context.addClass("friend_big_panel");
			trigger.addEvent("mousedown",function(event)
			{
				if (event && event.stopPropagation)event.stopPropagation(); 
				else window.event.cancelBubble = true; 
				return false;
			});
			trigger.click(function(event)
			{
				if (event && event.stopPropagation)event.stopPropagation(); 
				else window.event.cancelBubble = true; 
				trigger.addClass("down_array_click");
				var mainMenuData = [
					{pic:"../css/pic/Res/MainPanel/menu/modehead.png",text:"头像显示",click:function(){}},
					{pic:"",text:"名称显示"},
					{pic:"",text:"列表显示",line:true,click:function(){}},
					{pic:"",text:"排序显示",click:function(){}},
					{pic:"",text:"刷新好友列表",line:true,click:function(){}},
					{pic:"",text:"显示在线联系人",line:true,click:function(){}},
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"显示企业分组",click:function(){}},
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"显示陌生人分组",click:function(){}},
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"显示黑名单",click:function(){}}
				];	
				mainMenuData[0].children=[
					{pic:(friendSetting.showBigHeader?"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png":""),text:"大头像",click:function()
					{
						self.units[0].context.addClass("friend_big_panel");
						self.units[0].friendContentTab.scrollerfixed();
						friendSetting.showBigHeader=true;
					}},
					{pic:(friendSetting.showBigHeader?"":"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png"),text:"小头像",line:true,click:function()
					{
						self.units[0].context.removeClass("friend_big_panel");
						friendSetting.showBigHeader=false;
						self.units[0].friendContentTab.scrollerfixed();
					}},
					{pic:(friendSetting.selectedShowBigPic?"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png":""),text:"选中时显示大头像",line:true,click:function()
					{
						friendSetting.selectedShowBigPic=!friendSetting.selectedShowBigPic;
						if(friendSetting.selectedShowBigPic)friendContentPanel.context.addClass("friend_item_selected");
						else friendContentPanel.context.removeClass("friend_item_selected");
						self.units[0].friendContentTab.scrollerfixed();
					}},
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"显示我的头像",click:function(){}}
				];
				mainMenuData[1].children=[
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"显示备注和昵称",click:function(){}},
					{pic:"",text:"显示备注",line:true,click:function(){}},
					{pic:"",text:"显示昵称",click:function(){}}
				];
				mainMenuData[2].children=[
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"单列显示",click:function(){}},
					{pic:"",text:"多列平铺",line:true,click:function(){}},
					{pic:"",text:"显示清爽资料",line:true,click:function(){}},
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"动画效果",click:function(){}}
				];
				mainMenuData[3].children=[
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"按身份标识排序",click:function(){}},
					{pic:"",text:"按服务更新排序",line:true,click:function(){}},
					{pic:"",text:"按名称排序",line:true,click:function(){}}
				];
				new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), mainTabPanel, mainMenuData, trigger, 150, "down_array_click");
			});
			return tabLi;	
		},function(data, friendConentPanel)
		{
			
			if(data.clickNum==1 || !data.isFirstShow)
			{
				var friendContext = friendConentPanel.context;
				var friendTable = friendContext.children().children();
				var selectFriendClazzes = friendContext.elements[0].clazzesSelects;
				if(!selectFriendClazzes || selectFriendClazzes.size() == 0) selectFriendClazzes = friendTable.children(".friend_clazz");
				if(selectFriendClazzes.size()==0) selectFriendClazzes = friendTable.children(".friend_clazz_select_real");
				friendContext.elements[0].clazzesSelects = selectFriendClazzes;
				if(friendConentPanel)friendConentPanel.setSelectedClosed(true);
				selectFriendClazzes.fire("click");
			}
			
			document.onkeydown = function showKeyDown(evt)
			 {
 				evt = (evt) ? evt : window.event;
				var code = evt.keyCode;
				switch(code)
				{
					case 38:
						friendConentPanel.up(evt);
						break;
					case 39:
						break;
					case 40:
						friendConentPanel.down(evt);
						break;
					case 37:
						break;
					case 13:
						friendConentPanel.enter(evt);
						break;
				}
			 }
		});
		mainTabPanel.add("", "../css/pic/Themes/Default/MainPanel/icon_group_normal.png","../css/pic/Themes/Default/MainPanel/icon_group_selected.png","群/讨论组",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'"><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div>'+'<div class="down_array" style="right: 60%;"><img class="down_array_pic" src="../css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"/></div></div>').addTo(parent);
			var trigger = tabLi.children(".down_array");
			var self = mainTabPanel;
			if(friendSetting.showBigHeader)this.units[0].context.addClass("friend_big_panel");
			trigger.addEvent("mousedown",function(event)
			{
				if (event && event.stopPropagation)event.stopPropagation(); 
				else window.event.cancelBubble = true; 
				return false;
			});
			trigger.click(function(event)
			{
				trigger.addClass("down_array_click");
				var mainMenuData = [
					{pic:"../css/pic/Res/MainPanel/menu/modehead.png",text:"图标显示",click:function(){}},
					{pic:"",text:"列表显示",line:true},
					{pic:"",text:"访问我的群主页",click:function(){}},
					{pic:"",text:"所有群消息设置",line:true,click:function(){}},
					{pic:"",text:"查找添加群",click:function(){}},
					{pic:"",text:"创建一个群",click:function(){}},
					{pic:"",text:"添加群分组",click:function(){}},
				];
				mainMenuData[0].children=[
					{pic:(groupSetting.showBigHeader?"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png":""),text:"大图标",click:function()
					{
						self.units[1].context.addClass("group_big_panel");
						self.units[1].groupContentTab.scrollerfixed();
						groupSetting.showBigHeader=true;	
					}},
					{pic:(!groupSetting.showBigHeader?"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png":""),text:"小图标",line:true,click:function()
					{						
						self.units[1].context.removeClass("group_big_panel");
						groupSetting.showBigHeader=false;
						self.units[1].groupContentTab.scrollerfixed();
					}},
					{pic:(groupSetting.selectedShowBigPic?"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png":""),text:"选中时显示大图标",click:function()
					{
						groupSetting.selectedShowBigPic=!groupSetting.selectedShowBigPic;
						if(groupSetting.selectedShowBigPic)groupContentPanel.context.addClass("group_item_selected");
						else groupContentPanel.context.removeClass("group_item_selected");
						self.units[1].groupContentTab.scrollerfixed();
					}}
				];
				mainMenuData[1].children=[
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"单列显示",click:function(){}},
					{pic:"",text:"多列平铺",line:true,click:function(){}},
					{pic:"",text:"动画效果",click:function(){}}
				];
				mainMenuData[3].children=[
					{pic:"",text:"接收并提示消息",click:function(){}},
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"不提示消息只显示数目",line:true,click:function(){}},
					{pic:"",text:"屏蔽群消息提示",click:function(){}}
				];
				mainMenuData[3].children[2].children=[
					{pic:"",text:"15分钟提示一次",click:function(){}},
					{pic:"",text:"30分钟提示一次",click:function(){}},
					{pic:"",text:"1小时提示一次",click:function(){}},
					{pic:"",text:"4小时提示一次",click:function(){}},
					{pic:"",text:"始终不提示",line:true,click:function(){}}
				];
				new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), mainTabPanel, mainMenuData, trigger, 180, "down_array_click");
			});
			return tabLi;	
		},function(data, groupConentPanel)
		{
			if(data.clickNum==1 || !data.isFirstShow)
			{
				var groupContext = groupConentPanel.context;
				var groupTable = groupContext.children().children();
				var selectFriendClazzes = groupContext.elements[0].clazzesSelects;
				if(!selectFriendClazzes || selectFriendClazzes.size() == 0) selectFriendClazzes = groupTable.children(".group_clazz");
				if(selectFriendClazzes.size()==0) selectFriendClazzes = groupTable.children(".group_clazz_select_real");
				groupContext.elements[0].clazzesSelects = selectFriendClazzes;
				if(groupConentPanel)groupConentPanel.setSelectedClosed(true);
				selectFriendClazzes.fire("click");
			}
			
			document.onkeydown = function showKeyDown(evt)
			 {
				evt = (evt) ? evt : window.event;
				var code = evt.keyCode;
				switch(code)
				{
					case 38:
						groupConentPanel.up(evt);
						break;
					case 39:
						break;
					case 40:
						groupConentPanel.down(evt);
						break;
					case 37:
						break;
					case 13:
						groupConentPanel.enter(evt);
						break;
				}
			 }
		});
		mainTabPanel.add("", "../css/pic/Themes/Default/MainPanel/icon_last_normal.png","../css/pic/Themes/Default/MainPanel/icon_last_selected.png","会话",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'"><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div>'+'<div class="down_array" style="right: 40%;"><img class="down_array_pic" src="../css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"/></div></div>').addTo(parent);
			var trigger = tabLi.children(".down_array");
			trigger.click(function(event)
			{
				trigger.addClass("down_array_click");
				var mainMenuData = [
					{pic:"../css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"漫游会话列表",click:function(){}},
					{pic:"",text:"清空会话列表"}
				];
				new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), mainTabPanel, mainMenuData, trigger, 130, "down_array_click");
			});
			return tabLi;	
		});
		mainTabPanel.add("", "../css/pic/Themes/Default/MainPanel/icon_group_normal.png","群/讨论组");
		mainTabPanel.add("", "../css/pic/Themes/Default/MainPanel/icon_contacts_normal.png","联系人");
		var friendContentPanel = new WebChat.Ext.Panel.MainTabContentFriendPanel(Sharp('<div class="panel main_tab_panel friend_panel noselect" id="friend_panel"></div>'), mainTabPanel, mainTabPanel.tabsData.length,friendSetting);
		friendContentPanel.addData([{name:"同学",friends:[{showName:"农民1",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/1.png"},{showName:"农民2",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/2.png"},{showName:"农民3",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/5.png"},{showName:"农民4",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/33.png"},{showName:"农民5",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民6",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/3.png"},{showName:"农民7",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/16.png"},{showName:"农民8",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/25.png"},{showName:"农民9",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民10",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/49.png"},{showName:"农民11",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/3.png"},{showName:"农民12",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/16.png"},{showName:"农民13",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/25.png"},{showName:"农民14",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民15",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/49.png"}]},{name:"陌生人",friends:[{showName:"农民16",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/3.png"},{showName:"农民17",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/16.png"},{showName:"农民18",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/25.png"},{showName:"农民19",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民20",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/49.png"},{showName:"农民21",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/3.png"},{showName:"农民22",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/16.png"},{showName:"农民23",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/25.png"},{showName:"农民24",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民25",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/49.png"},{showName:"农民26",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/3.png"},{showName:"农民27",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/16.png"},{showName:"农民28",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/25.png"},{showName:"农民29",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民30",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/49.png"}]}]);
		
		var groupContentPanel = new WebChat.Ext.Panel.MainTabContentGroupPanel(Sharp('<div class="main_tab_group_panel noselect" id="friend_panel"></div>'), mainTabPanel, mainTabPanel.tabsData.length,friendSetting);
		groupContentPanel.addData([{name:"我的qq群",groups:[{showName:"南京以恒软件",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"},{showName:"南京以恒软件2",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"},{showName:"南京以恒软件3",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"},{showName:"南京以恒软件4",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"},{showName:"南京以恒软件5",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"}]},
		{name:"不常用群",groups:[{showName:"南京以恒软件",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"},{showName:"南京以恒软件2",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"},{showName:"南京以恒软件3",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"},{showName:"南京以恒软件4",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"},{showName:"南京以恒软件5",nickName:"南京",sign:"杨慧在群动态中1张图片",shortPic:"../css/pic/Data/Misc/normal_group_40.png"}]}]);
		var groupContent = groupContentPanel.groupContentTab.children();
		groupContentPanel.groupContentTab.scroller({dragstart:function()
		{
			groupContent.removeClass("animate");
			
		},dragend:function()
		{
			groupContent.addClass("animate");
		},drag:function(process)
		{
			
		},stepAmount:10})
		
		
		
		var chartSessionPanel = new WebChat.Ext.Panel.TabContentPanel(Sharp('<div class="panel main_tab_panel chart_session_panel noselect"></div>'), mainTabPanel);
		mainTabPanel.tabSelected(1);
        this.content = trs.get(2);
        var mainFooterComponent = new WebChat.Ext.Component.MainFooterComponent(Sharp('<div class="component main_footer_component" parentdragable="true"></div>'), this);
		var task = this.container.getTask()
		if(task)task.add(this.taskInfo);
		this.context.resite("right");
	},
	getTaskInfo:function()
	{
		if(this.taskInfo)this.taskInfo.unit = this;
		return this.taskInfo;
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
	showSelected:function()
	{
		if(this.taskInfo)this.taskInfo.showSelected();
		return this.taskInfo;
	},
	setMin:function()
	{
		//if(this.taskInfo)this.taskInfo.element.fire("click");
		if(this.taskInfo)this.taskInfo.setMin();
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
		if(this.taskInfo)this.taskInfo.remove();
	}
});