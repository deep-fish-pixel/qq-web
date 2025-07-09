WebChat.Ext.Panel.TabContentPanel.extend('WebChat.Ext.Panel.GroupChartCorePanel',
{
	init:function(context, container, option)
	{
		this._super("init", context, container);
		this.option = option;
	},
	onInit:function(context, container)
	{
		var self = this;
		var leftArrayPics=["../css/pic/Res/ChatFrame/aio_flexleft_normal.png","../css/pic/Res/ChatFrame/aio_flexright_normal.png"];
		this.content = Sharp('<div class="panel_content group_chart_panel_content"></div>').addTo(context);
		this.content = Sharp('<table class="thread_column_panel"><tr class=""><td class="three_column_first_td"></td>'
		+'<td class="three_column_second_td"><div class="chart_core_left_array_p"><img class="chart_core_left_array" src="'+leftArrayPics[0]+'" title="隐藏侧边"></div></td>'
		+'<td class="three_column_third_td"><div class="chart_core_left"></div></td></tr></table>').addTo(this.content);
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
		var chartCoreLeft = this.chartCoreLeft = coreLeftTd.children(".chart_core_left");
		var chartInputOperate = this.coreTable.find(".chart_input_operate");
		
		Sharp('<table class="core_left_table"><tr class="core_left_table_func_tr" ><td class="core_left_table_func_td"></td></tr><tr class="core_left_table_updown_tr"><td class="core_left_table_updown_td"><div class="core_left_table_updown"></div></td></tr><tr class="core_left_table_mem_tr"><td class="core_left_table_mem_td"></td></tr></table>').addTo(chartCoreLeft);
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
			{title:"系统字体",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/aio_quickbar_sysfont_tab_button.png",click:function(element, obj)
				{
				}},
			{title:"加粗",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/Bold.png",click:function(element, obj)
				{
					self.container.container.container.container.editorPanel.setBold()
				}},
			{title:"倾斜",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/Italic.png",click:function(element, obj)
				{
					
					self.container.container.container.container.editorPanel.setItalic()
				}},
			{title:"下划线",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/underline.png",click:function(element, obj)
				{
					self.container.container.container.container.editorPanel.setUnderline()
				}},
			{title:"颜色",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/MidToolbarExtUp_Font/color.png",click:function(element, obj)
				{
					
					
				}}
		]);
		//this.fontSettingList.hide();
		new WebChat.Ext.Component.PictureListComponent(Sharp('<div class="input_tools_pic_component input_tools_set_component" parentdragable="true"></div>'), this, 
		[
			{title:"字体选择工具栏",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_font.png",click:function(element, obj)
				{
					var font = self.fontSettingList.context;
					//var parent = self.fontSettingList.context.parent();
					if(Sharp.isMoving(font,"top"))return;
					//alert(element.top());
					if(font.top() == 0)
					{
						//font.show();
						
						element.addClass("pic_text_outer_select");
						//self.chartRecentShow.sin({time:200,prop:"height",value:self.chartRecentShow.height()-27});
						font.sin({time:200,prop:"top",value:-27,callback:function()
						{
							var output = self.container.container.container.container.outputPanel;
							self.container.container.container.container.outputPanel.resize(output.iframe.height());
						}});
					}
					else
					{
						element.removeClass("pic_text_outer_select");
						//font.hide();
						//self.chartRecentShow.sin({time:200,prop:"height",value:self.chartRecentShow.height()+27});
						font.sin({time:200,prop:"top",value:0,callback:function()
						{
							var output = self.container.container.container.container.outputPanel;
							self.container.container.container.container.outputPanel.resize(output.iframe.height());
						}});
					}
					
				}},
			{title:"选择表情",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_face.png",click:function()
			{
				//pic_text_outer_select
				//this.fireElement.addClass("pic_text_outer_select");
				new WebChat.Ext.Panel.FacesPanel(Sharp('<div class="faces_panel"></div>'), desk,{width:462,height:318,trigger:this.fireElement,outputPanel:self.container.container.container.container.editorPanel});
				
			}},
			{title:"VIP魔法表情/超级表情/涂鸦表情/宠物炫",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_richface.png",click:function(){}},
			{title:"多功能辅助输入",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_inputassist.png",click:function(){}},
			{title:"发送图片",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_sendpic.png",array:"../css/pic/Res/ContactMgr/ArrowDown.png",arrayClick:function(element, data, arrayElement)
			{
				var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.option.menuData.sendPic, element, 150, "pic_text_outer_select");
				menu.setShowAndRemoveFunc(function()
				{
					arrayElement.addClass("down_array_context_select");
				},function()
				{
					arrayElement.removeClass("down_array_context_select");
				});
				menu.show();
			},click:function(){}},
			{title:"点歌",pic:"../css/pic/Res/AppPluginIcon/main_musicbtn20_music.png",click:function(){}},
			{title:"屏幕截图",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_cut.png",array:"../css/pic/Res/ContactMgr/ArrowDown.png",arrayClick:function(element, data, arrayElement)
			{
				var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.option.menuData.printscreen, element, 175, "pic_text_outer_select");
				menu.setShowAndRemoveFunc(function()
				{
					arrayElement.addClass("down_array_context_select");
				},function()
				{
					arrayElement.removeClass("down_array_context_select");
				});
				menu.show();
			},click:function(){}},
			{title:"投票",pic:"../css/pic/Res/GroupVote/aio_quickbar_vote.png",click:function(){}},
			{title:"接受并提示消息",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_screen1.png",click:function()
			{
				var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.option.menuData.receiveAndPrompt, Sharp(this.fireElement), 175, "pic_text_outer_select");
				menu.setShowAndRemoveFunc(function()
				{
					
				},function()
				{
					
				});
				menu.show();
			}},
			{title:"显示消息记录",name:"消息记录",pic:"../css/pic/Res/AppFramework/ChatFrame/MidToolbar/aio_quickbar_register.png",array:"../css/pic/Res/ContactMgr/ArrowDown.png",floatRight:true,arrayClick:function(element, data, arrayElement)
			{
				var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.option.menuData.messageManage, element, 140, "pic_text_outer_select");
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
		this.content = this.threeColumnSecondTd;
		
		
		
		
		this.content = chartInputOperate;
		var chartManager = this.container.container.container.container;
		new WebChat.Ext.Component.ButtonListComponent(Sharp('<div class="button_list_component"></div>'),this,[{name:"发送(S)",array:"../css/pic/Res/ContactMgr/ArrowDown.png",floatRight:true,click:function()
		{
			chartManager.send();
		},arrayClick:function(element, data, arrayElement)
		{
			var menu = new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.option.menuData.sendButton, arrayElement, 180, "down_array_context_select");
			menu.setShowAndRemoveFunc(function()
			{
				element.addClass("button_component_select");
			},function()
			{
				element.removeClass("button_component_select");
			});
			menu.show();
		}},{name:"关闭(C)",floatRight:true}]);
		
		
		this.content = this.coreLeftTableFuncTd = chartCoreLeft.find(".core_left_table_func_td");
		this.pictureListComponent = new WebChat.Ext.Component.PictureListComponent(Sharp('<div class="group_pic_list_component" parentdragable="true"></div>'), this, 
		[
			{title:"相册",name:"相册",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/2_24.png",click:function(){}},
			{title:"共享",name:"共享",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/1_24.png",click:function(){}},
			{title:"论坛",name:"论坛",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/11_24.png",click:function(){}},
			{title:"讨论组",name:"讨论组",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/8_24.png",click:function(){}},
			{title:"群视频",name:"群视频",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/21_24.png",click:function(){}},
			{title:"语音",name:"语音",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/20_24.png",click:function(){}},
			{title:"投票",name:"投票",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/20_24.png",click:function(){}},
			{title:"看节目",name:"看节目",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/20_24.png",click:function(){}},
			{title:"签到",name:"签到",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/20_24.png",click:function(){}},
			{title:"匿名聊",name:"匿名聊",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/20_24.png",click:function(){}},
			{title:"听音乐",name:"听音乐",pic:"../css/pic/Res/GroupApp/DefaultAppIcons/20_24.png",click:function(){}} 
		]);
		this.content = chartCoreLeft.find(".core_left_table_mem_td");
		var groupChartFriendListPanel = new WebChat.Ext.Panel.GroupChartFriendListPanel(Sharp('<div class="main_tab_group_panel noselect" id="friend_panel"></div>'), this);
		this.groupChartFriendListPanel = groupChartFriendListPanel;
		
		groupChartFriendListPanel.addData([{showName:"农民1",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/1.png"},{showName:"农民2",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/2.png"},{showName:"农民3",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/5.png"},{showName:"农民4",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/33.png"},{showName:"农民5",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民6",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/3.png"},{showName:"农民7",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/16.png"},{showName:"农民8",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/25.png"},{showName:"农民9",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民10",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/49.png"},{showName:"农民11",nickName:"张三1",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/3.png"},{showName:"农民12",nickName:"张三2",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/16.png"},{showName:"农民13",nickName:"张三3",sign:"适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我,适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/25.png"},{showName:"农民14",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/43.png"},{showName:"农民15",nickName:"张三",sign:"适度分流家里，是否拉瑟陪我",shortPic:"../css/pic/Data/Head/49.png"}]);
		groupChartFriendListPanel.context.scroller({dragstart:function()
		{
			//rightZoom.hide();
		},dragend:function()
		{
			//rightZoom.show();
		},drag:function(process)
		{
			
		},stepAmount:1})
		//setTimeout(function(){groupChartFriendListPanel.selected(0);},0);
	},
	addData:function(data)
	{
		this.data = data;
	},
	up:function()
	{
		
	},
	down:function()
	{
		
	},
	enter:function()
	{
		
	}
	
});