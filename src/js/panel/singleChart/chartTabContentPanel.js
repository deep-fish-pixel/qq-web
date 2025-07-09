WebChat.Ext.Panel.TabContentPanel.extend('WebChat.Ext.Panel.ChartTabContentPanel',
{
	init:function(context, container, setting)
	{
		this._super("init", context, container, setting.tabIndex, setting);
		this.tabData = container.getTabsData()[setting.tabIndex];
		this.setting = setting;
	},
	onInit:function(context, container, setting)
	{
		this.content = Sharp('<div class="panel_content chart_tab_content"></div>').addTo(context);
		this.outerTable = Sharp('<table class="chart_tab_inner_table" parentdragable="true">'
		+'<tr class="chart_friend_header_tr" parentdragable="true"><td colspan=3 class="chart_friend_header_td">'
			+'<div class="chart_friend_header_content"></div></td></tr>'
		+'<tr class="chart_core_tr"><td class="chart_core_td">'
		+'<div class="chart_core_content"></div></td></tr></table>').addTo(this.content);
		
					
		var chartHeaderContent = this.outerTable.find(".chart_friend_header_content");
		 
		this.chartCoreContent = this.outerTable.find(".chart_core_content");
		this.chartCoreTd = this.outerTable.find(".chart_core_td");
		this.chartManagePanel = this.container.container.context;
		this.panelContentTrFirst = this.chartManagePanel.find(".panel_content_tr_first");
		
		this.initChartHeader(chartHeaderContent);
		this.initChartCore(this.chartCoreContent);
		//chartCoreContent.height(chartCoreTd.height());
		chartHeaderContent.addEvent("dblclick", this.callback("dblclick"));
	},
	initChartHeader: function(chartHeaderContent)
	{
		this.headerTable = Sharp('<table class="chart_friend_header_table" parentdragable="true"><tr class="friend_info_tr" parentdragable="true"><td rowspan=2 class="friend_pic_td"  parentdragable="true"><div class="friend_pic_div" parentdragable="true"><img class="friend_pic" src="./css/pic/Data/Head/2.png"/></div></td><td class="friend_nick_td" colspan=2 parentdragable="true"><a class="friend_nick" href="javascript:void(0)">李四一个两个的个'+random+'</a></td></tr><tr class="friend_sign_tr"><td colspan=2 class="friend_sign_td" parentdragable="true"><div class="friend_sign select" selected="true">善若水。水善利万物而不争，处众人之所恶，故几于道</div></td></tr><tr class="chart_others_func_tr" parentdragable="true"><td colspan=3 class="chart_funcs" parentdragable="true"><div class="chart_funcs_content" parentdragable="true"></div></td></table>').addTo(chartHeaderContent);
		
		
		var funcs = this.headerTable.find(".chart_funcs_content");
		var func1 = Sharp('<div class="friend_func" title="开启视频会话"><div class="func_pic_context"><div class="func_pic_content"><img class="func_pic" src="./css/pic/Res/AppPluginIcon/video.png"></div></div><div class="down_array_context"><div class="down_array"><img class="down_array_pic" src="./css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"></div></div></div>').addTo(funcs);
		var func2 = Sharp('<div class="friend_func" title="开启语音会话"><div class="func_pic_context"><div class="func_pic_content"><img class="func_pic" src="./css/pic/Res/ChatFrame/Group/Icons/TopToolbar/b9m0_0.png"></div></div><div class="down_array_context"><div class="down_array"><img class="down_array_pic" src="./css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"></div></div></div>').addTo(funcs);
		var func3 = Sharp('<div class="friend_func" title="传送文件"><div class="func_pic_context2"><div class="func_pic_content"><img class="func_pic2" src="./css/pic/Res/AppFramework/FileAssitant/fileassitant_icon_32.png"></div></div><div class="down_array_context2"><div class="down_array"><img class="down_array_pic" src="./css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"></div></div></div>').addTo(funcs);
		var func4 = Sharp('<div class="friend_func2" title="创建讨论组"><div class="func_pic_context2"><div class="func_pic_content"><img class="func_pic" src="./css/pic/Res/ChatFrame/Group/Icons/TopToolbar/b8m0_0.png"></div></div></div>').addTo(funcs);
		var func5 = Sharp('<div class="friend_func" title="远程桌面"><div class="func_pic_context2"><div class="func_pic_content"><img class="func_pic3" src="./css/pic/Res/AppFramework/Misc/OfflinepicManualGet.png"></div></div><div class="down_array_context2"><div class="down_array"><img class="down_array_pic" src="./css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"></div></div></div>').addTo(funcs);
		var func6 = Sharp('<div class="friend_func" title="应用"><div class="func_pic_context2"><div class="func_pic_content"><img class="func_pic" src="./css/pic/Res/ChatFrame/Buddy/Icons/TopToolbar/aio_toobar_app.png"></div></div><div class="down_array_context2"><div class="down_array"><img class="down_array_pic" src="./css/pic/Res/AppFramework/FileAssitant/batchoper_btndown.png"></div></div></div>').addTo(funcs);
		
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
		]};	
		var func1DownArray = func1.find(".down_array_context");
		func1DownArray.click(function()
		{
			var funcMenu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, chartToolbarMenuData.video, func1, 150, "friend_func_click");
			funcMenu.setShowAndRemoveFunc(function()
			{
				func1DownArray.addClass("down_array_click");
			},function()
			{
				func1DownArray.removeClass("down_array_click");
			});
			funcMenu.show();
		});
		var func2DownArray = func2.find(".down_array_context");
		func2.find(".down_array_context").click(function()
		{
			var funcMenu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, chartToolbarMenuData.voice, func2, 150, "friend_func_click");
			funcMenu.setShowAndRemoveFunc(function()
			{
				func2DownArray.addClass("down_array_click");
			},function()
			{
				func2DownArray.removeClass("down_array_click");
			});
			funcMenu.show();
		});
		func3.click(function()
		{
			new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, chartToolbarMenuData.sendFile, func3, 150, "friend_func_click");
		});
		
		func5.click(function()
		{
			new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, chartToolbarMenuData.remoteControl, func5, 150, "friend_func_click");
		});
		func6.click(function()
		{
			new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, chartToolbarMenuData.app, func6, 150, "friend_func_click");
		});
	},
	initChartCore: function(chartHeaderContent)
	{
		var self = this;
		var leftArrayPics=["./css/pic/Res/ChatFrame/aio_flexleft_normal.png","./css/pic/Res/ChatFrame/aio_flexright_normal.png"];
		
		this.content = Sharp('<table class="thread_column_panel"><tr class=""><td class="three_column_first_td"></td>'
		+'<td class="three_column_second_td"><div class="chart_core_left_array_p"><img class="chart_core_left_array" src="'+leftArrayPics[0]+'" title="隐藏侧边"></div></td>'
		+'<td class="three_column_third_td"><div class="chart_core_left" parentdragable="true"></div></td></tr></table>').addTo(chartHeaderContent);
		this.threeColumnFirstTd = this.content.find(".three_column_first_td");
		this.threeColumnSecondTd = this.content.find(".three_column_second_td");
		this.threeColumnThirdTd = this.content.find(".three_column_third_td");
		this.content = this.threeColumnFirstTd;
		
		
		this.coreTable = Sharp('<table class="chart_core_inner_table" parentdragable="true">'
		+'<tr class="chart_recent_show_tr"parentdragable="true"><td class="chart_recent_show_td"><div class="chart_recent_show"></div></td></tr>'
		+'<tr class="chart_input_toolbar_tr" parentdragable="true"><td class="chart_input_toolbar_td" parentdragable="true"><div class="chart_input_toolbar" parentdragable="true"></div></td></tr>'
		+'<tr class="chart_input_text_tr" parentdragable="true"><td class="chart_input_text_td"><div class="chart_input_text"></div></td></tr>'
		+'<tr class="chart_input_operate_tr" parentdragable="true"><td class="chart_input_operate_td" parentdragable="true"><div class="chart_input_operate" parentdragable="true"></div></td></tr>'
		+'</table>').addTo(this.content);
		this.chartRecentShow = this.coreTable.find(".chart_recent_show");
		this.chartInputToolbar = this.content = this.coreTable.find(".chart_input_toolbar");
		var coreArray = this.coreArray = this.threeColumnSecondTd.find(".chart_core_left_array").style("visibility","hidden");
		var coreLeftTd = this.threeColumnThirdTd;
		this.chartCoreLeft = coreLeftTd.children(".chart_core_left");
		var chartInputOperate = this.coreTable.find(".chart_input_operate");
		this.threeColumnSecondTd.mouseover(function()
		{
			//alert(coreLeftTd.style("display"));
			if(coreLeftTd.style("display") =="none")
			{
				coreArray.attr("src",leftArrayPics[1]);
			}
			else
			{
				coreArray.attr("src",leftArrayPics[0]);
			}
			coreArray.style("visibility","visible");
			
		}).mouseout(function()
		{
			coreArray.style("visibility","hidden");
		}).click(function()
		{
			if(coreLeftTd.style("display") =="none")
			{
				coreLeftTd.show();
				self.threeColumnSecondTd.attr("title","隐藏侧边");
			}
			else
			{
				coreLeftTd.hide();
				self.threeColumnSecondTd.attr("title","显示侧边");
			}
		});
		this.fontSettingList = new WebChat.Ext.Component.PictureListComponent(Sharp('<div class="input_tools_pic_component font_set_component" parentdragable="true"></div>'), this, 
		[
			{title:"系统字体",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/aio_quickbar_sysfont_tab_button.png",click:function(element, obj)
				{
				}},
			{title:"加粗",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/Bold.png",click:function(element, obj)
				{
					self.container.container.editorPanel.setBold()
				}},
			{title:"倾斜",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/Italic.png",click:function(element, obj)
				{
					
					self.container.container.editorPanel.setItalic()
				}},
			{title:"下划线",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/underline.png",click:function(element, obj)
				{
					self.container.container.editorPanel.setUnderline()
				}},
			{title:"颜色",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/color.png",click:function(element, obj)
				{
					
					
				}}
		]);
		new WebChat.Ext.Component.PictureListComponent(Sharp('<div class="input_tools_pic_component input_tools_set_component" parentdragable="true"></div>'), this, 
		[
			{title:"字体选择工具栏",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_font.png",click:function(element, obj)
				{
					var font = self.fontSettingList.context;
					//var parent = self.fontSettingList.context.parent();
					if(Sharp.isMoving(font,"top"))return;
					//alert(element.top());
					if(!element.match(".pic_text_outer_select"))
					{
						//font.show();
						
						element.addClass("pic_text_outer_select");
						//self.chartRecentShow.sin({time:200,prop:"height",value:self.chartRecentShow.height()-27});
						//font.top(-27);
						font.sin({time:200,prop:"top",value:-27,callback:function()
						{
							//var output = self.container.container.outputPanel;
							//self.container.container.outputPanel.resize(output.iframe.height());
						}});
					}
					else
					{
						element.removeClass("pic_text_outer_select");
						//font.hide();
						//self.chartRecentShow.sin({time:200,prop:"height",value:self.chartRecentShow.height()+27});
						//font.top(0);
						font.sin({time:200,prop:"top",value:0,callback:function()
						{
							//var output = self.container.container.outputPanel;
							//self.container.container.outputPanel.resize(output.iframe.height());
						}});
					}
					
				}},
			{title:"选择表情",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_face.png",click:function()
			{
				//console.log(this);
				//pic_text_outer_select
				//this.fireElement.addClass("pic_text_outer_select");
				new WebChat.Ext.Panel.FacesPanel(Sharp('<div class="faces_panel"></div>'), desk,{width:462,height:318,trigger:this.fireElement,outputPanel:self.container.container.editorPanel});
				
			}},
			{title:"VIP魔法表情/超级表情/涂鸦表情/宠物炫",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_richface.png",click:function(){}},
			{title:"向好友发送窗口抖动",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_twitter.png",click:function(){}},
			{title:"语音消息",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/AM_MenuICON.png",click:function(){}},
			{title:"多功能辅助输入",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_inputassist.png",click:function(){}},
			{title:"发送图片",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_sendpic.png",array:"./css/pic/Res/ContactMgr/ArrowDown.png",arrayClick:function(element, data, arrayElement)
			{
				var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.chartToolbarMenuData.sendPic, element, 150, "pic_text_outer_select");
				menu.setShowAndRemoveFunc(function()
				{
					arrayElement.addClass("down_array_context_select");
				},function()
				{
					arrayElement.removeClass("down_array_context_select");
				});
				menu.show();
			},click:function(){}},
			{title:"点歌",pic:"./css/pic/Res/AppPluginIcon/main_musicbtn20_music.png",click:function(){}},
			{title:"屏幕截图",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_cut.png",array:"./css/pic/Res/ContactMgr/ArrowDown.png",arrayClick:function(element, data, arrayElement)
			{
				var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.chartToolbarMenuData.printscreen, element, 175, "pic_text_outer_select");
				menu.setShowAndRemoveFunc(function()
				{
					arrayElement.addClass("down_array_context_select");
				},function()
				{
					arrayElement.removeClass("down_array_context_select");
				});
				menu.show();
			},click:function(){}},
			{title:"显示消息记录",name:"消息记录",pic:"./css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_register.png",array:"./css/pic/Res/ContactMgr/ArrowDown.png",floatRight:true,arrayClick:function(element, data, arrayElement)
			{
				var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.chartToolbarMenuData.messageManage, element, 140, "pic_text_outer_select");
				menu.setShowAndRemoveFunc(function()
				{
					arrayElement.addClass("down_array_context_select");
				},function()
				{
					arrayElement.removeClass("down_array_context_select");
				});
				menu.show();
			},click:function(){}}
		]);
		this.content = this.chartCoreLeft;
		new WebChat.Ext.Component.FigureComponent(Sharp('<div class="friend_figure_component"></div>'),this,{pic:'./css/general/pic/female_big.png'});
		new WebChat.Ext.Component.FigureComponent(Sharp('<div class="self_figure_component"></div>'),this,{pic:'./css/general/pic/male_small.png'});
		this.content = chartInputOperate;
		var chartManager = this.container.container
		new WebChat.Ext.Component.ButtonListComponent(Sharp('<div class="button_list_component"></div>'),this,[{name:"发送(S)",array:"./css/pic/Res/ContactMgr/ArrowDown.png",floatRight:true,click:function()
		{
			chartManager.send();
		},arrayClick:function(element, data, arrayElement)
		{
			var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.chartToolbarMenuData.sendButton, arrayElement, 180, "down_array_context_select");
			menu.setShowAndRemoveFunc(function()
			{
				element.addClass("button_component_select");
			},function()
			{
				element.removeClass("button_component_select");
			});
			menu.show();
		}},{name:"关闭(C)",floatRight:true}]);
	},
	resizeHeight:function(manageHeight)
	{
		
		
		var trFirstHeight = this.panelContentTrFirst.height();
		var toolbarHeight = this.chartInputToolbar.height();
		var height = manageHeight|| this.chartManagePanel.height();
		var sys = Sharp.getSystem();
		if(sys.ie )
		{
			this.chartRecentShow.height(height-227-toolbarHeight-trFirstHeight);
			//this.chartCoreContent.height(chartHeight-94-trFirstHeight);
			this.chartCoreLeft.height(height-100-trFirstHeight);
		}
		else if(!sys.chrome)
		{
			//this.chartRecentShow.height(manageHeight-257-trFirstHeight);
			this.chartCoreLeft.height(height-101-trFirstHeight);
		}
		else
		{
			this.chartRecentShow.height(height-227-toolbarHeight-trFirstHeight);
			this.chartCoreLeft.height(height-101-trFirstHeight);
		}
		var self = this;
		if(manageHeight!=undefined)
		{
			if(self.container.container.outputPanel)self.container.container.outputPanel.resize(height-227-toolbarHeight-trFirstHeight);
		}
		else setTimeout(function(){if(self.container.container.outputPanel)self.container.container.outputPanel.resize(height-227-toolbarHeight-trFirstHeight);},200);
		//this.groupChartCorePanel.groupChartFriendListPanel.resizeHeight(manageHeight-101-trFirstHeight);
		
	},
	show:function()
	{
		this._super("show");
		this.resizeHeight(this.container.container.context.height());
	},
	dblclick:function(evt)
	{
		var target = Sharp(evt.srcElement||evt.target);
		if(!target.attr("parentdragable"))return;
		if(this.container.container.parentPanel)
		{
			this.container.container.parentPanel.headerOperateComponent.setMax();
		}
		else if(this.container.container.headerOperateComponent)this.container.container.headerOperateComponent.setMax();
	}
})