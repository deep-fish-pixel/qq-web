WebChat.Base.Component.extend('WebChat.Ext.Component.MainHeaderComponent',
{
    init:function(context, container, option)
    {
        this._super("init", context, container, option);
    },
    onInit:function(context, container, option)
    {
        this.content = Sharp('<div class="component_content main_head_component_content" parentdragable="true"></div>').addTo(context);
        this.content.add('<table class="title margin_left5" parentdragable="true"><tr class="title_text" parentdragable="true"><td parentdragable="true">QQ2013</td></tr></table>');
        this.content.add('<table parentdragable="true" class="head_table_info margin_left5"><tr parentdragable="true"><td rowspan="3" class="head_pic"></td><td parentdragable="true"></td><td rowspan="3" class="head_table_right"></td></tr><tr parentdragable="true"><td parentdragable="true"></td></tr><tr parentdragable="true"><td parentdragable="true"></td></tr></table>');
        var tds = this.content.find(".head_table_info").find("td");
        var headPic = Sharp(tds.elements[0]);
		var taskInfo = this.container.getTaskInfo();
		taskInfo.pic = './css/pic/Res/Misc/TaskbarIcon-DiscussChatFrame.png';
		taskInfo.name = 'QQ2013';
        var headPicContent = Sharp('<img class="head_picture" src="./css/pic/Data/Head/1_100.gif"/>').addTo(headPic);
        var headStatusNameGrade = Sharp('<div class="head_status_name_grade"></div>').addTo(Sharp(tds.elements[1]));
        
		
		if(!this.statusMenus)
		{
			this.statusMenus = [
				{pic:"./css/pic/Res/Status/FLAG/Big/imonline.png",text:"我在线上",click:function(){headStatus.find(".head_status_pic").attr("src",this.pic);}},
				{pic:"./css/pic/Res/Status/FLAG/Big/Qme.png",text:"Q我吧",click:function(){headStatus.find(".head_status_pic").attr("src",this.pic);}},
				{pic:"./css/pic/Res/Status/FLAG/Big/away.png",text:"离开",click:function(){headStatus.find(".head_status_pic").attr("src",this.pic);}},
				{pic:"./css/pic/Res/Status/FLAG/Big/busy.png",text:"忙碌",click:function(){headStatus.find(".head_status_pic").attr("src",this.pic);}},
				{pic:"./css/pic/Res/Status/FLAG/Big/mute.png",text:"请勿打扰",click:function(){headStatus.find(".head_status_pic").attr("src",this.pic);}},
				{pic:"./css/pic/Res/Status/FLAG/Big/invisible.png",text:"隐身",click:function(){headStatus.find(".head_status_pic").attr("src",this.pic);}},
				{pic:"./css/pic/Res/Status/FLAG/Big/imoffline.png",text:"离线",click:function(){headStatus.find(".head_status_pic").attr("src",this.pic);}},
				{text:"添加状态信息",line:true,click:function(){}},
				{text:"关闭所有声音",click:function(currentMenuSharp)
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
				{pic:"./css/pic/Res/Misc/AddBuddy/Icon_FolderAuthFalse.png",text:"关闭头像闪动",line:true,click:function(currentMenuSharp)
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
				{pic:"./css/pic/Res/lockPanel/lock20.png",text:"锁定QQ",line:true,click:function(){}},
				{text:"系统设置",click:function(){}},
				{text:"我的资料",click:function(){}},
				{text:"我的QQ中心",click:function(){}}
			];	
		}
		var statusSetting = this.option.statusSetting;
		var headStatus = Sharp('<div class="head_status inline moveover1" title="在线状态菜单&#10 当前状态:隐身&#10 声音:关闭&#10 消息提示:关闭&#10 会话消息:任务栏头像闪动"><img class="head_status_pic margin_left5" src="'+this.statusMenus[statusSetting.userStatus-1].pic+'"/><img class="head_status_arrow margin_left5" src="./css/pic/Res/ContactMgr/ArrowDown.png"/></div>').addTo(headStatusNameGrade);
		
		
        var headNick = Sharp('<div class="head_nick inline" parentdragable="true">张三</div>').addTo(headStatusNameGrade);
        var headLevel = Sharp('<div class="head_level inline moveover1" title="我的QQ等级&#10 等级29级&#10 剩余升级天数:7天">LV29</div>').addTo(headStatusNameGrade);
        var headStatusTd2 = Sharp(tds.elements[3]);
        var headIntroduce = Sharp('<div class="head_introduce margin_left5 moveover1" title="诚静勤省恒倔">诚静勤省恒倔</div>').addTo(headStatusTd2);
        var headStatusTd3 = Sharp(tds.elements[4]);
		var serviceStr = '<div class="head_other_service" parentdragable="true">'
		+'<div class="head_service_pic noselect moveover1" title="QQ邮箱&#10 1封未收邮箱"><img class="head_service_pic2 noselect" src="./css/pic/Res/AppPluginIcon/ContactTipsVASFlagExt_Mail.png"/><div>1</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="QQ空间&#10 我的空间动态(2)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/qzoneicon.png"/><div>2</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="腾讯微博&#10 系统通知(1)&#10 QQ好友微博(10)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/wblogicon.png"/><div>10</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="腾讯微博&#10 系统通知(1)&#10 QQ好友微博(10)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/wblogicon.png"/><div>10</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="腾讯微博&#10 系统通知(1)&#10 QQ好友微博(10)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/wblogicon.png"/><div>10</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="腾讯微博&#10 系统通知(1)&#10 QQ好友微博(10)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/wblogicon.png"/><div>10</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="腾讯微博&#10 系统通知(1)&#10 QQ好友微博(10)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/wblogicon.png"/><div>10</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="腾讯微博&#10 系统通知(1)&#10 QQ好友微博(10)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/wblogicon.png"/><div>10</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="腾讯微博&#10 系统通知(1)&#10 QQ好友微博(10)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/wblogicon.png"/><div>10</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="腾讯微博&#10 系统通知(1)&#10 QQ好友微博(10)"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/wblogicon.png"/><div>10</div></div>'
		+'<div class="head_service_pic noselect moveover1" title="朋友网"><img class="head_service_pic2 noselect" src="./css/pic/Res/Misc/CustomSnsHead/friendicon.png"/><div></div></div></div>';
        var headOtherService = Sharp(serviceStr).addTo(headStatusTd3);
        var self = this;
        headStatus.click(function()
        {
			new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, self.statusMenus, headStatus, 195);
        });

    }
});