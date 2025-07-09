WebChat.Ext.panel.FramePanel.extend('WebChat.Ext.panel.LoginFramePanel',
{
	onlineStauts:1,
	freeStatus:2,
	goawayStatus:3,
	busyStatus:4,
	notFazeStatus:5,
	hideStauts:6,
	offlineStatus:7
},
{
	init:function(context, container, option)
    {
		option.dragable= true;
		this._super("init", context, container,option);
		this.taskInfo= new WebChat.object.TaskInfo({unit:this});
		this.loginStatus = this.clazz.onlineStauts;
    },
	onInit:function(context, container)
    {
		this._super("onInit", context, container);
    },
	initContent:function()
	{
		this.headerOperateComponent = new WebChat.Ext.Component.HeaderOperateComponent(Sharp('<div class="header_operate_component main_header_operate_component"></div>'),this,{types:[{typeName:"loginSet"},{typeName:"min"},{typeName:"close"}]});
		
		this.initLogin();
		var task = this.container.getTask()
		this.taskInfo.pic = '../css/pic/Res/Misc/TaskbarIcon-DiscussChatFrame.png';
		if(task)task.add(this.taskInfo);
	},
    initLogin:function()
    {
		this.content = Sharp('<form></form>').addTo(this.content);
		var date = new Date().getHours();
		var videoName;
		if(date>=6 & date<10)videoName='morning';
		else if(date>=9 & date<14)videoName='noon';
		else if(date>=14 & date<18)videoName='afternoon';
		else videoName='night';
		
		var video = Sharp('<video id="video" src="../css/general/pic/'+videoName+'.mp4"  autoplay="autoplay" class="login_video login_'+videoName+'" parentdragable="true"></video>');
		//var video = Sharp('<video id="video" autoplay class="login_video login_'+videoName+'" parentdragable="true"><source src="../css/general/pic/'+'kk236 2013-12-03 15-14-27'+'.mp4"/></video>');
		video.addTo(this.content);
		this.content.addClass('login_'+videoName);
		this.content.add('<table parentdragable="true" class="head_table_info margin_left5 head_table_'+videoName+'">'
			+'<tr parentdragable="true"><td rowspan="3" class="head_pic"></td><td parentdragable="true"><div class="login_input_func">'
			+'<input name="login" class="login_input" selected="true" required="required" placeholder="QQ号码/手机/邮箱"/>'
			+'<div clas="login_arrow"></div></div></td><td parentdragable="true" class="href_td"><div clas="login_href_div"><a clas="login_href" href="http://ptlogin2.qq.com/qq_signup?ptlang=2052&regkey=FE38797C8714ED39E057ABD9997C6ACD86C4286A3C1DF426537276C4D0F2057E&ADUIN=0&ADSESSION=0&ADTAG=CLIENT.QQ.5239_NewAccount_Btn.0&ADPUBNO=26248" target="_blank">注册账号</a></div></td></tr>'
			+'<tr parentdragable="true"><td parentdragable="true"><div class="password_input_func">'
			+'<input type ="password" name="password" class="password_input" selected="true" required="required" placeholder="密码"/>'
			+'<div clas="password_keyboard"></div></div></td><td parentdragable="true" class="href_td"><div clas="login_href_div"><a clas="login_href" href="https://aq.qq.com/cn2/findpsw/pc/pc_find_pwd_input_account"  target="_blank">找回密码</a></div></td></tr>'
			+'<tr parentdragable="true"><td parentdragable="true">'
			+'<div parentdragable="true" class="login_status"><div class="record_li"><div class="record_check record_password_check"></div><div class="record_password_tip">记住密码</div></div><div class="record_li"><div class="record_check record_auto_login_check"></div><div class="record_auto_login_tip">自动登录</div></div></div>'
			+'</td><td parentdragable="true"></td></tr></table>');
		var submitParent = Sharp('<div class="login_submit login_submit_btn"><div class="login_submit_tip">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div><div class="mobile_input"></div></div>').addTo(this.content);
		
		var submitBtn = Sharp('<input type="submit" style="display:none;"/>').addTo(this.content);
		var self = this;
		this.submitBtn = submitParent.children().click(function()
		{
			var form = self.content;
			var top = self.context.top()+(self.context.height()/2);
			self.context.addClass("frame_panel_close");
			self.context.sin({time:250,prop:"height",value:0},{time:500,prop:"top",value:top},{time:500,prop:"opacity",value:0.5})
			form.sin({time:250,prop:"margin-top",value:-top/3});
			setTimeout(function()
			{
				
				self.remove();
				self.option.success({status:self.loginStatus});
			},250);
			/*var form = self.content;
			if(form.elements[0].checkValidity && !form.elements[0].checkValidity())
			{
				submitBtn.fire("click");
			}
			else
			{
				var top = self.context.top()+(self.context.height()/2);
				
				self.context.sin({time:250,prop:"height",value:0},{time:500,prop:"top",value:top},{time:500,prop:"opacity",value:0.5})
				form.sin({time:250,prop:"margin-top",value:-top/3});
				setTimeout(function()
				{
					self.remove();
					self.option.success({status:self.loginStatus});
				},250);
				
			}*/
		});
		
		var tds = this.content.find(".head_table_info").find("td");
		var headPic = Sharp(tds.elements[0]);
		var headPicContent = Sharp('<img class="head_picture" src="../css/pic/Data/Head/1_100.gif"/>').addTo(headPic);
		var loginStatus = Sharp('<div class="login_status_set"><img class="login_status_set_pic" src="../css/pic/Res/Status/FLAG/Big/imonline.png"></div>').addTo(headPic);
		var recordChecks = this.content.find(".record_check");
		recordChecks.iter(function(check)
		{
			var target = Sharp(check);
			target.addEvent("click",function(evt)
			{
				if(target.match(".record_checked"))target.removeClass("record_checked");
				else target.addClass("record_checked");
			});
		});
		
		var statusMenus = [
			{pic:"../css/pic/Res/Status/FLAG/Big/imonline.png",text:"我在线上",click:function(){loginStatus.find(".login_status_set_pic").attr("src",this.pic);self.loginStatus = WebChat.Ext.panel.LoginFramePanel.onlineStauts;}},
			{pic:"../css/pic/Res/Status/FLAG/Big/Qme.png",text:"Q我吧",line:true,click:function(){loginStatus.find(".login_status_set_pic").attr("src",this.pic);self.loginStatus = WebChat.Ext.panel.LoginFramePanel.freeStatus;}},
			{pic:"../css/pic/Res/Status/FLAG/Big/away.png",text:"离开",click:function(){loginStatus.find(".login_status_set_pic").attr("src",this.pic);self.loginStatus = WebChat.Ext.panel.LoginFramePanel.goawayStatus;}},
			{pic:"../css/pic/Res/Status/FLAG/Big/busy.png",text:"忙碌",click:function(){loginStatus.find(".login_status_set_pic").attr("src",this.pic);self.loginStatus = WebChat.Ext.panel.LoginFramePanel.busyStatus;}},
			{pic:"../css/pic/Res/Status/FLAG/Big/mute.png",text:"请勿打扰",line:true,click:function(){loginStatus.find(".login_status_set_pic").attr("src",this.pic);self.loginStatus = WebChat.Ext.panel.LoginFramePanel.notFazeStatus;}},
			{pic:"../css/pic/Res/Status/FLAG/Big/invisible.png",text:"隐身",click:function(){loginStatus.find(".login_status_set_pic").attr("src",this.pic);self.loginStatus = WebChat.Ext.panel.LoginFramePanel.hideStauts;}}
		];	
		loginStatus.click(function()
        {
			new WebChat.Ext.Component.MenuComponent(Sharp('<div class="component menu_component"></div>'), self, statusMenus, loginStatus, 100, null, "down");
        });
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