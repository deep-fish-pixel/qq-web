WebChat.Base.Component.extend('WebChat.Ext.Component.MainFooterComponent',
{
    init:function(context, container)
    {
        this._super("init", context, container);
    },
    onInit:function(context, container)
    {
        //this.content = Sharp('<div class="component_content main_footer_component_content" parentdragable="true"></div>').addTo(context);
        this.content.add('<table><tr><td rowspan="2" class="footer_main_pic_td"></td><td></td></tr><tr><td></td></tr></table>');
        var tds = this.content.find("td");
		var tdFirst = tds.get(0);
        var tdSecond = tds.get(1);
		var tdThird = tds.get(2);
		var mainMenuSharp;
		if(Sharp.getSystem().ie)
		{
			mainMenuSharp = Sharp('<div class="footer_service_pic4 noselect moveover2" title="主菜单">'
            +'<div><img class="footer_main_pic" src="./css/pic/Res/Mine/switch_multi_hover-2.gif"> </img></div>'
            +'<div style="position: absolute;"><img class="footer_main_pic_hover" src="./css/pic/Res/Mine/TaskbarIcon-DiscussChatFrame-2.gif"> </img></div>'
            +'</div>').addTo(tdFirst);
			var mainPics = mainMenuSharp.find("img");
			var mainPicFirst = mainPics.get(0);
			var mainPicSec = mainPics.get(1);
			
			mainPicSec.mouseover(function()
			{
				mainPicSec.stop(true).sin({time:250, prop:"opacity", value:1});
			}).mouseout(function()
			{
				mainPicSec.stop(true).sin({time:250, prop:"opacity", value:0});
				
			});
		}
		else
		{
			mainMenuSharp = Sharp('<div class="footer_service_pic2 noselect moveover2" title="主菜单">'
            +'<div><img class="footer_main_pic" src="./css/pic/Res/Mine/switch_multi_hover-2.gif"> </img></div>'
            +'<div style="position: absolute;"><img class="footer_main_pic_hover" src="./css/pic/Res/Mine/TaskbarIcon-DiscussChatFrame-2.gif"> </img></div>'
            +'</div>').addTo(tdFirst);
		}

        var serviceStr = '<div class="footer_other_service">'
                    +'<img class="footer_service_pic noselect margin_left5 moveover1 float_right" src="./css/pic/Res/MainPanel/AppBox/appbox_mgr_btn.png" title="打开应用管理器"/>'
                    +'<img class="footer_service_pic noselect moveover1" src="./css/pic/Res/MainPanel/AppCenter/Data/AppIcon/1001/16.png" title="手机生活"/>'
					+'<img class="footer_service_pic noselect moveover1" src="./css/pic/Res/AppPluginIcon/main_gamebtn20_game.png" title="QQ游戏"/>'
                    +'<img class="footer_service_pic noselect margin_left5 moveover1" src="./css/pic/Res/AppPluginIcon/main_musicbtn20_music.png" title="QQ音乐"/>'
                    +'<img class="footer_service_pic noselect margin_left5 moveover1" src="./css/pic/Res/MainPanel/AppCenter/Data/AppIcon/1005/16.png" title="腾讯视频"/>'
                    +'<img class="footer_service_pic noselect margin_left5 moveover1" src="./css/pic/Res/MainPanel/AppCenter/Data/AppIcon/1006/16.png" title="QQ团购"/>'
                    +'<img class="footer_service_pic noselect margin_left5 moveover1" src="./css/pic/Res/AppFramework/Safe/PCMgr_Installed.png" title="腾讯电脑专家"/>'
                    +'<img class="footer_service_pic noselect margin_left5 moveover1" src="./css/pic/Res/MainPanel/AppCenter/Data/AppIcon/1040/16.png" title="QQ备忘录"/></div>';
        var firstServices = Sharp(serviceStr).addTo(tdSecond);
		
		serviceStr = '<div class="footer_other_service">'
					+'<div class="footer_service_pic3 noselect margin_left5 moveover1 float_right" title="打开应用中心"><img class="footer_service_pic noselect" src="./css/pic/Res/MainPanel/QPlusEntranceBtn.png"/><div>应用</div></div>'
					+'<img class="footer_service_pic noselect moveover1" src="./css/pic/Res/MainPanel/Button/Tools.png" title="打开系统设置"/>'
                    +'<img class="footer_service_pic noselect margin_left5 moveover1" src="./css/pic/Res/MainPanel/Button/message.png" title="打开消息管理器"/>'
                    +'<img class="footer_service_pic noselect margin_left5 moveover1" src="./css/pic/Res/MainPanel/Button/filemanager.png" title="打开文件管理器"/>'
                    +'<div class="footer_service_pic3 noselect margin_left5 moveover1" title="查找联系人"><img class="footer_service_pic noselect" src="./css/pic/Res/AppFramework/Misc/find.png"/><div>查找</div></div></div>';
        var secondServices = Sharp(serviceStr).addTo(tdThird);
		var self = this;
		tdFirst.click(function()
        {			if(!self.mainMenuSharp)
			{
				self.mainMenuData = [
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/mainmenu_allservices.png",text:"所有服务",children:true,click:function(){}},
					{pic:"./css/pic/Data/Misc/VAS/VasBizIcon/118/0.png",text:"QQ会员",children:true,click:function(){}},
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/mainmenu_imqqcom.png",text:"我的QQ中心",line:true,click:function(){}},
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/Tools.png",text:"工具",children:true,click:function(){}},
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/OnlineUpdate.png",text:"软件升级",line:true,click:function(){}},
					{pic:"./css/pic/Res/AppFramework/Safe/QQSafe.png",text:"安全中心",children:true,click:function(){}},
					{pic:"./css/pic/Res/MainHelp/menu_help.png",text:"帮助",children:true,line:true,click:function(){}},
	
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/ContactMgr.png",text:"好友管理器",click:function(){}},
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/menu_changepswd.png",text:"修改密码",click:function(currentMenuSharp)
					{
						if(this.pic)
						{
							delete this.pic;
						}
						else
						{
							this.pic = "./css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png";
						}
					}},
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/menu_switch.png",text:"更改用户",click:function(){}},
					{pic:"./css/pic/Res/lockPanel/lock20.png",text:"锁定QQ",click:function(){}},
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/menu_exit.png",text:"退出",click:function(){}}
				];	
				self.mainMenuData[0].children=[
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/TencentNet.png",text:"腾讯网",click:function(){}},
					{pic:"./css/pic/Res/MainHelp/ProductBlog.PNG",text:"QQ空间",click:function(){}},
					{pic:"./css/pic/Res/ChatFrame/Buddy/Profile/paipai_16.png",text:"拍拍购物",line:true,click:function(){}},
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/SoSo.png",text:"SOSO搜索",click:function(){}},
					{text:"QQ充值",children:[
							{text:"充值Q币/Q点",click:function(){}},
							{text:"开通包月服务",children:[
									{text:"QQ会员",click:function(){}},
									{text:"黄钻贵族",click:function(){}},
									{text:"红钻贵族",click:function(){}},
									{text:"绿钻贵族",click:function(){}},
									{text:"超级QQ",click:function(){}},
									{text:"蓝钻贵族",click:function(){}},
									{text:"粉钻贵族",click:function(){}},
									{text:"CF会员",click:function(){}},
									{text:"DNF黑钻"},
									{text:"炫舞紫钻黑钻"},
									{text:"飞车紫钻"},
									{text:"QQ堂紫钻"},
									{text:"AVA精英"},
									{text:"音速紫钻"},
									{text:"读书VIP"}
								],click:function(){}},
							{text:"充值游戏点券",children:[
									{text:"CF点券",click:function(){}},
									{text:"DNF点券",click:function(){}},
									{text:"AVA点券",click:function(){}},
									{text:"QQ炫舞点券",click:function(){}},
									{text:"QQ飞车点券",click:function(){}},
									{text:"七雄争霸元宝",click:function(){}},
									{text:"幻想世界金子",click:function(){}},
									{text:"寻仙仙玉",click:function(){}},
									{text:"QQ华夏点券"}
								],click:function(){}}
						],click:function(){}},
					{text:"腾讯游戏",children:[
							{text:"地下城与勇士",click:function(){}},
							{text:"QQ西游",click:function(){}},
							{text:"七雄争霸",click:function(){}},
							{text:"3366",click:function(){}},
							{text:"QQ幻想",click:function(){}},
							{text:"大明王权",click:function(){}},
							{text:"战地之王",click:function(){}},
							{text:"魔幻大陆",click:function(){}},
							{text:"烽火世界"},
							{text:"丝路英雄",click:function(){}},
							{text:"QQ自由幻想",click:function(){}},
							{text:"穿越火线",click:function(){}},
							{text:"QQ炫舞",click:function(){}},
							{text:"QQ飞车",click:function(){}},
							{text:"逆战",click:function(){}},
							{text:"QQ西游",click:function(){}},
							{text:"七雄争霸",click:function(){}},
							{text:"3366",click:function(){}},
							{text:"QQ幻想",click:function(){}},
							{text:"大明王权",click:function(){}},
							{text:"战地之王",click:function(){}},
							{text:"魔幻大陆",click:function(){}},
							{text:"烽火世界"},
							{text:"丝路英雄",click:function(){}},
							{text:"QQ自由幻想",click:function(){}},
							{text:"穿越火线",click:function(){}},
							{text:"QQ炫舞",click:function(){}},
							{text:"QQ飞车",click:function(){}},
							{text:"逆战",click:function(){}}
						],click:function(){}},
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/mainmenu_allservices.png",text:"手机生活",children:[
							{text:"超级QQ",click:function(){}},
							{text:"手机QQ",click:function(){}},
							{text:"应用宝",click:function(){}},
							{text:"手机游戏",click:function(){}},
							{text:"手机音乐",click:function(){}},
							{text:"手机QQ空间",click:function(){}},
							{text:"腾讯手机管家",click:function(){}}
						],click:function(){}},
	
					{pic:"./css/pic/Res/MainPanel/MainMenuFrame/TencentNet.png",text:"新闻资讯",children:[
							{text:"订阅新闻",click:function(){}},
							{text:"我的资讯",line:true,click:function(){}},
							{text:"新闻频道",click:function(){}},
							{text:"娱乐频道",click:function(){}},
							{text:"体育频道",click:function(){}},
							{text:"汽车频道",click:function(){}},
							{text:"财经频道",click:function(){}},
							{text:"女性频道",line:true,click:function(){}},
							{text:"游戏频道",click:function(){}},
							{text:"科技频道",line:true,click:function(){}},
							{text:"名人频道",click:function(){}},
							{text:"腾讯频道",click:function(){}}
						],click:function(){}},
					{text:"财付通",children:[
							{text:"我的钱包",click:function(){}},
							{text:"QQ充值",click:function(){}},
							{text:"手机充值",click:function(){}},
							{text:"游戏直充",click:function(){}},
							{text:"机票订阅",click:function(){}},
							{text:"超值购物",click:function(){}}
						]}
				];	
				self.mainMenuData[1].children=[
							{text:"会员官网",click:function(){}},
							{text:"会员专区",click:function(){}},
							{text:"成长体系",click:function(){}},
							{text:"QQ装扮",line:true,click:function(){}},
							{text:"升级为会员",click:function(){}},
							{text:"赠送会员",click:function(){}},
							{text:"索要会员",line:true,click:function(){}},
							{text:"全部特权",click:function(){}},
							{text:"热门功能",click:function(){},children:
								[
									{text:"网络硬盘",click:function(){}},
									{text:"QQ装扮",click:function(){}},
									{text:"会员炫彩字",line:true,click:function(){}},
									{text:"会员魔法表情",click:function(){}},
									{text:"会员超级表情",click:function(){}},
									{text:"表情漫游",click:function(){}},
									{text:"会员头像",click:function(){}},
									{text:"会员个性铃声",line:true,click:function(){}},
									{text:"会员红名",click:function(){}},
									{text:"QQ等级加速",line:true,click:function(){}},
									{text:"消息记录漫游",click:function(){}},
									{text:"离线下载",click:function(){}}
								]},
							{text:"生活特权",click:function(){},children:
								[
									{text:"QQ彩贝",click:function(){}},
									{text:"QQ电影票",click:function(){}},
									{text:"QQ团购",line:true,click:function(){}},
									{text:"QQ旅游",click:function(){}},
									{text:"QQ返利",click:function(){}}
								]}
						]
				self.mainMenuData[3].children=[
							{text:"QQ在线状态官网",click:function(){}},
							{text:"QQ备忘录",click:function(){}},
							{text:"消息管理器",click:function(){}},
							{text:"文件管理器",click:function(){}},
							{text:"数据导入工具",click:function(){}},
							{text:"查找",click:function(){}},
							{text:"回复关闭状态",click:function(){}}
						]
				self.mainMenuData[5].children=[
							{text:"安全沟通",click:function(){}},
							{text:"安全中心首页",click:function(){}},
							{text:"申请密码保护",click:function(){}},
							{text:"举报恶意行为",click:function(){}},
							{text:"QQ安全帮助",click:function(){}}
						]
				self.mainMenuData[6].children=[
							{text:"使用帮助",click:function(){}},
							{text:"腾讯客服",click:function(){}},
							{text:"反馈问题",click:function(){}},
							{text:"QQ新特性",line:true,click:function(){}},
							{text:"I'M QQ官网",line:true,click:function(){}},
							{text:"QQ官方微博",click:function(){}},
							{text:"关于QQ2013",click:function(){}}
						]
			}
			//self.content = mainMenuSharp;
			new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.mainMenuData, mainMenuSharp, 140);
        });
    }
});