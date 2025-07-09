WebChat.Ext.Panel.ChartTabContentPanel.extend('WebChat.Ext.Panel.ChartTabContentGroupPanel',
{
	initChartHeader: function(chartHeaderContent)
	{
		this.headerTable = Sharp('<table class="chart_friend_header_table" parentdragable="true"><tr class="friend_info_tr" parentdragable="true"><td rowspan=2 class="friend_pic_td"  parentdragable="true"><div class="friend_pic_div" parentdragable="true"><img class="friend_pic" src="./css/pic/Data/Misc/normal_group_40.png"/></div></td><td class="friend_nick_td" colspan=2 parentdragable="true"><a class="friend_nick" href="javascript:void(0)">高三（九）班'+random+'</a></td></tr><tr class="friend_sign_tr"><td colspan=2 class="friend_sign_td" parentdragable="true"><div class="friend_sign select" selected="true">同事.朋友-同学</div></td></tr><tr class="chart_others_func_tr" parentdragable="true"><td colspan=3 class="chart_funcs chart_funcs_group" parentdragable="true"><div class="chart_funcs_content" parentdragable="true"></div></td></table>').addTo(chartHeaderContent);
		
	},
	initChartCore: function(chartHeaderContent)
	{
		var self = this;
		var chartToolbarMenuData = this.chartToolbarMenuData = {video:[
			{pic:"",text:"开始视频会话",click:function(){}},
			{pic:"",text:"邀请多人视频会话"},
			{pic:"",text:"发送视频留言",line:true,click:function(){}},
			{pic:"",text:"视频设置",click:function(){}},
			{pic:"",text:"语言测试向导",click:function(){}},
			{pic:"",text:"网络检测",click:function(){}}
		],voice:[
			{pic:"",text:"开始语音会话",click:function(){}},
			{pic:"",text:"发起多人语音"},
			{pic:"",text:"语音设置",click:function(){}},
			{pic:"",text:"语音测试向导",click:function(){}},
			{pic:"",text:"发送语音消息",click:function(){}}
		],sendFile:[
			{pic:"",text:"发送文件/文件夹",click:function(){}},
			{pic:"",text:"发送离线文件"},
			{pic:"",text:"发送微云文件",click:function(){}},
			{pic:"",text:"传文件设置",line:true,click:function(){}},
			{pic:"",text:"语言测试向导",click:function(){}},
			{pic:"",text:"文件管理器",click:function(){}}
		],remoteControl:[
			{pic:"",text:"请求控制对方电脑",click:function(){}},
			{pic:"",text:"邀请对方远程协助",line:true},
			{pic:"",text:"设置",click:function(){}}
		],app:[
			{pic:"",text:"发送短信",click:function(){}},
			{pic:"",text:"发送邮件"},
			{pic:"",text:"手机免费聊QQ",line:true,click:function(){}},
			{pic:"",text:"腾讯视频",click:function(){}},
			{pic:"",text:"财付通转账",click:function(){}},
			{pic:"",text:"QQ装扮",click:function(){}},
			{pic:"",text:"一起玩游戏",click:function(){}},
			{pic:"",text:"给好友送份礼物",line:true},
			{pic:"",text:"给他推荐好友",click:function(){}},
			{pic:"",text:"删除好友",click:function(){}},
			{pic:"",text:"移至黑名单",click:function(){}},
			{pic:"",text:"QQ举报",click:function(){}}
		],sendPic:[
			{pic:"",text:"发送本地图片",click:function(){}},
			{pic:"./css/pic/Res/MainHelp/ProductBlog.PNG",text:"从QQ空间相册选图"}
		],printscreen:[
			{pic:"",text:"屏幕截图CTRL+ALT+A",click:function(){}},
			{pic:"./css/pic/Res/AppFramework/Camera/DynaCapture/TipDlgTitleImage_Movie.png",text:"录制视频动画"},
			{pic:"./css/pic/Res/AppFramework/Camera/DynaCapture/TipDlgTitleImage_Image.png",text:"捕捉视频图像",line:true},
			{pic:"",text:"显示截图编辑工具栏"},
			{pic:"",text:"截图时隐藏当前窗口"}
		],messageManage:[
			{pic:"",text:"显示消息记录",click:function(){}},
			{pic:"",text:"显示图像比例",children:[
					{pic:"",text:"放大CTRL+滚轮",click:function(){}},
					{pic:"",text:"缩小",line:true},
					{pic:"",text:"400%"},
					{pic:"",text:"200%"},
					{pic:"",text:"150%"},
					{pic:"",text:"125%"},
					{pic:"",text:"100%"},
					{pic:"",text:"75%"},
					{pic:"",text:"50%"}
				]},
			{pic:"",text:"清屏"},
			{pic:"",text:"消息管理器"}
		],sendButton:[
			{pic:"",text:"按enter键发送消息",click:function(){}},
			{pic:"",text:"按ctrl+enter键发送消息"},
			{pic:"",text:"消息合并模式"}
		],groupChartSetting:[
			{pic:"",text:"举报",click:function(){}},
			{pic:"",text:"查看/修改群资料"},
			{pic:"",text:"更新群信息",line:true},
			{pic:"",text:"修改我的群名片",click:function(){}},
			{pic:"",text:"更换群图标"},
			{pic:"",text:"群消息设置",children:[
			{pic:"",text:"自动弹出消息",click:function(){}},
			{pic:"./css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"接收并提示消息"},
			{pic:"",text:"不提示消息只显示数目"},
			{pic:"",text:"屏蔽群消息提示",line:true,children:[
							{pic:"",text:"15分钟提示一次",click:function(){}},
							{pic:"",text:"30分钟提示一次"},
							{pic:"",text:"1小时提示一次"},
							{pic:"",text:"4小时提示一次",line:true},
							{pic:"",text:"始终不提示"}
						]},
					{pic:"",text:"屏蔽群内图片",line:true},
					{pic:"",text:"设置屏蔽时关注内容"}
				]},
			{pic:"",text:"视图设置",line:true,click:function(){},children:[
					{pic:"./css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"显示侧边",click:function(){}},
					{pic:"",text:"本窗口总在最前"}
				]},
			{pic:"",text:"成员管理"},
			{pic:"",text:"认证服务"},
			{pic:"",text:"转让该群",click:function(){}},
			{pic:"",text:"升级该群"},
			{pic:"",text:"解散该群"}
		],receiveAndPrompt:[
			{pic:"",text:"自动弹出消息",click:function(){}},
			{pic:"",text:"接收并提示消息"},
			{pic:"",text:"不提示消息只显示数目"},
			{pic:"",text:"屏蔽群消息提示",line:true,children:[
					{pic:"",text:"15分钟提示一次",click:function(){}},
					{pic:"",text:"30分钟提示一次"},
					{pic:"",text:"1小时提示一次"},
					{pic:"",text:"4小时提示一次",line:true},
					{pic:"",text:"始终不提示"}
				]},
			{pic:"",text:"屏蔽群内图片",line:true},
			{pic:"",text:"设置屏蔽时关注内容"}
		]};
		this.chartFuncsContent = this.headerTable.find(".chart_funcs_content");
		
		
		this.content = this.chartFuncsContent;
		var groupContentTabPanel = this.groupContentTabPanel = new WebChat.Ext.Panel.GroupContentTabPanel(Sharp('<div class="tab_content_group_panel noselect" parentdragable="true"></div>'), this, 3,{parentdragable:true,content:chartHeaderContent});
		
		
		groupContentTabPanel.add("聊天", "./css/pic/Res/ChatFrame/Group/Icons/TopToolbar/b24m0_0.png","聊天",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div></div>').addTo(parent);
			return tabLi;	
		},function(data, friendConentPanel)
		{
			
			
		});
		groupContentTabPanel.add("空间", "./css/pic/Res/ChatFrame/Group/Icons/TopToolbar/b25m0_0.png","空间",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div></div>').addTo(parent);
			return tabLi;	
		},function(data, friendConentPanel)
		{
			
			
		});
		groupContentTabPanel.add("应用", "./css/pic/Res/ChatFrame/Group/Icons/TopToolbar/b26m0_0.png","应用",function(parent, tabName, tabPic, titleName)
		{
			
			var tabLi = Sharp('<div class="tab_content"'+(titleName?' title="'+titleName+'"':'')+'><img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div></div>').addTo(parent);
			return tabLi;	
		},function(data, friendConentPanel)
		{
			
			
		});
		var panelContentTabs= this.chartFuncsContent.find(".panel_content_tabs");
		var func1 = Sharp('<div class="friend_func2" title="创建讨论组"><div class="func_pic_context2"><div class="func_pic_content"><img class="func_pic" src="./css/pic/Res/ChatFrame/Group/Icons/TopToolbar/b27m0_0.png"></div></div></div>').addTo(panelContentTabs);
		var func2 = Sharp('<div class="friend_func" title="开启语音会话"><div class="func_pic_context"><div class="func_pic_content"><img class="func_pic" src="./css/pic/Res/ChatFrame/Group/Icons/TopToolbar/aio_toobar_tool.png"></div></div><div class="down_array_context"><div class="down_array"><img class="down_array_pic" src="./css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"></div></div></div>').addTo(panelContentTabs);
		var func2DownArray = func2.find(".down_array_context");
		func2.find(".down_array_context").click(function()
		{
			var funcMenu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, chartToolbarMenuData.groupChartSetting, func2, 170, "friend_func_click");
			funcMenu.setShowAndRemoveFunc(function()
			{
				func2DownArray.addClass("down_array_click");
			},function()
			{
				func2DownArray.removeClass("down_array_click");
			});
			funcMenu.show();
		});
		var groupChartCorePanel = new WebChat.Ext.Panel.GroupChartCorePanel(Sharp('<div class="group_chart_content_panel noselect"></div>'), groupContentTabPanel,{menuData: chartToolbarMenuData});
		this.threeColumnThirdTd = groupChartCorePanel.threeColumnThirdTd;
		this.chartInputToolbar = groupChartCorePanel.chartInputToolbar;
		this.groupChartCorePanel = groupChartCorePanel;
		this.chartRecentShow = groupChartCorePanel.chartRecentShow;
		this.chartCoreLeft = groupChartCorePanel.chartCoreLeft;
		var chartSessionPanel = new WebChat.Ext.Panel.TabContentPanel(Sharp('<div class="group_space_panel noselect"></div>'), groupContentTabPanel,{menuData: chartToolbarMenuData});
		var chartSessionPanel = new WebChat.Ext.Panel.TabContentPanel(Sharp('<div class="group_app_panel noselect"></div>'), groupContentTabPanel,{menuData: chartToolbarMenuData});
		groupContentTabPanel.tabSelected(0);
		
	},
	/*resizeHeight:function(manageHeight)
	{
		var trFirstHeight = this.panelContentTrFirst.height();
		manageHeight = manageHeight|| this.chartManagePanel.height();
		var toolbarHeight = this.chartInputToolbar.height();
		var sys = Sharp.getSystem();
		if(sys.ie )
		{
			this.chartRecentShow.height(manageHeight-227-toolbarHeight-trFirstHeight);
			//this.chartCoreContent.height(chartHeight-94-trFirstHeight);
			this.chartCoreLeft.height(manageHeight-100-trFirstHeight);
		}
		else if(sys.chrome)
		{
			//this.chartRecentShow.height(manageHeight-308-trFirstHeight);
			this.chartCoreLeft.height(manageHeight-101-trFirstHeight);
		}
		else
		{
			this.chartRecentShow.height(manageHeight-227-toolbarHeight-trFirstHeight);
			this.chartCoreLeft.height(manageHeight-101-trFirstHeight);
		}
		
		this.groupChartCorePanel.groupChartFriendListPanel.resizeHeight(manageHeight-101-trFirstHeight);
		var self = this;
		setTimeout(function(){if(self.container.container.outputPanel)self.container.container.outputPanel.resize(manageHeight-227-toolbarHeight-trFirstHeight);},300);
		
	},*/
	resizeHeight:function(manageHeight)
	{
		var trFirstHeight = this.panelContentTrFirst.height();
		var height = manageHeight|| this.chartManagePanel.height();
		var toolbarHeight = this.chartInputToolbar.height();
		var sys = Sharp.getSystem();
		if(sys.ie )
		{
			this.chartRecentShow.height(height-227-toolbarHeight-trFirstHeight);
			//this.chartCoreContent.height(chartHeight-94-trFirstHeight);
			this.chartCoreLeft.height(height-100-trFirstHeight);
		}
		else if(sys.chrome)
		{
			//this.chartRecentShow.height(manageHeight-308-trFirstHeight);
			this.chartCoreLeft.height(height-101-trFirstHeight);
		}
		else
		{
			this.chartRecentShow.height(height-227-toolbarHeight-trFirstHeight);
			this.chartCoreLeft.height(height-101-trFirstHeight);
		}
		//this.chartCoreLeft.width(227);
		this.groupChartCorePanel.groupChartFriendListPanel.resizeHeight(height-101-trFirstHeight);
		var self = this;
		if(manageHeight!=undefined)
		{
			
			if(self.container.container.outputPanel)self.container.container.outputPanel.resize(height-227-toolbarHeight-trFirstHeight);
		}
		else 
		{
			setTimeout(function(){if(self.container.container.outputPanel)self.container.container.outputPanel.resize(height-227-toolbarHeight-trFirstHeight);},200);
		}
	}
})