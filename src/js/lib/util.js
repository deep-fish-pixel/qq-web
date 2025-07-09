// JavaScript Document
Sharp.getFrameSize = function(parent)
{
	if(parent)
	{
		return {width:parent.width(),height:parent.height()};
	}
	else
	{
		var sys = Sharp.getSystem();
		var width, height;
		if(sys.ie)
		{
			width = document.documentElement.scrollWidth;
			height = document.documentElement.scrollHeight-1;
		}
		if(sys.chrome)
		{
			width = document.body.scrollWidth-4;
			height = document.body.scrollHeight;
		}
		else
		{
			width = document.documentElement.scrollWidth;
			height = document.documentElement.scrollHeight;
		}
		return {width:width,height:height};
	}
	
}

Sharp.resite = function(element, type, parent)
{
	var width = element.width();
	var height = element.height();
	var frameSize = Sharp.getFrameSize(parent);
	var left,top;
	switch(type)
	{
		case "left":
			break;
		case "right":
			left = frameSize.width-width-5;
			top = (frameSize.height-height)/2;
			if(top<0)top=0;
			break;
		case "top":
			break;
		case "bottom":
			break;
		case "center":
			left = (frameSize.width-width)/2;
			top = (frameSize.height-height)/2;
			if(left<0)left=0;
			if(top<0)top=0;
			break;
		default:
			left = (frameSize.width-width)/2;
			top = (frameSize.height-height)/2;
			if(left<0)left=0;
			if(top<0)top=0;
			break;
	}
	
	element.left(left).top(top);
}
Sharp.resiteByParent = function(element,type)
{
	Sharp.resite(element,type, element.parent());
}

Sharp.dateFormat = function (date, fmt) { //author: meizz 
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Sharp.prototype.resite = function(type)
{
	Sharp.resite(this, type);
}
Sharp.prototype.resiteByParent = function(type)
{
	Sharp.resiteByParent(this, type);
}