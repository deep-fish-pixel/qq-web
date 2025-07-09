WebChat.Base.Panel.extend('WebChat.Ext.Panel.OutputPanel',
{
	elementExp: /^ *<\w+.*>/
},
{
	init:function(context, container, settings)
	{
		this._super("init", context, container, settings);
	},
	onInit:function(context, container, settings)
	{
		var sys = Sharp.getSystem();
		//if(sys.ie<=8)
		if(true)
		{
			this.iframe = Sharp('<div id="fDisplayer" style="height:100%;width:100%;border:0px;margin:0px;padding:0px;position: relative;"></div>').addTo(this.content);
			this.initIFrame();
		}
		else
		{
			this.iframe = Sharp('<iframe tabindex="5" id="fDisplayer" style="height:100%;width:100%;border:0px;margin:0px;padding:0px;background-color:#FFFFFF;" frameborder="0"><html><head></head><body></body></html></iframe>').addTo(this.content);
			setTimeout(this.callback("initIFrame"),100);
		}
		
		
	},
	initIFrame:function(htmlObj)
	{
		var sys = Sharp.getSystem();
		if(true)
		{
			this.outputParent = Sharp('<div style="width:100%;height:100%;" class="output_content" ></div>').addTo(this.iframe);
			this.inputDiv = Sharp('<div style="width:100%;word-break: break-all;"></div>').addTo(this.outputParent);
			this.sbody = this.outputParent;
			this.outputParent.scroller({dragstart:function()
			{
				chartCoreLeftArray.hide();
			},dragend:function()
			{
				chartCoreLeftArray.show();
			},drag:function(process)
			{
				
			},stepAmount:1,right:0,zIndex:999999,backgroundColor:this.iframe.style("background-color")});
			this.outputParent.width(this.iframe.width());
		}
		else
		{
			var iframe = this.iframe.elements[0];
			var doc = iframe.contentDocument || iframe.document;
			var createDiv = doc.createElement("div");
			var sbody = this.sbody = Sharp(doc.body);
			sbody.style("overflow","hidden");
			var head = Sharp(doc.head);
			head.add('X<div><link rel="stylesheet" type="text/css" href="../css/general/sharp.css"></div>');
			head.add('X<div><link rel="stylesheet" type="text/css" href="../css/general/iframe.css"></div>');
			this.outputParent = Sharp('<div style="width:100%;" class="output_content" ></div>').addTo(this.sbody);
			this.inputDiv = Sharp('<div style="width:100%;word-break: break-all;"></div>').addTo(this.outputParent);
			this.outputParent.scroller({dragstart:function()
			{
				chartCoreLeftArray.hide();
			},dragend:function()
			{
				chartCoreLeftArray.show();
			},drag:function(process)
			{
				
			},stepAmount:1,right:0,zIndex:999999,backgroundColor:this.iframe.style("background-color")});
		}
		//chart_core_left_array;
		
		var chartCoreLeftArray = this.container.contentData.context.find(".chart_core_left_array");
		
		var a = this.sbody.height();
		var self = this;
		//setTimeout(function(){self.outputParent.height(self.sbody.height())},100);
		this.outputParent.height(this.sbody.height())
		Sharp.dragable(this.sbody, true);
		var lastKeyCodeObj;
		this.sbody.elements[0].onkeydown=function(evt)
		{
			evt = (evt) ? evt : window.event;
			if(!evt)return;
			var code = evt.keyCode;
			var keyCodeObj = {keyCode:code,time:new Date()};
			if(lastKeyCodeObj && (keyCodeObj.keyCode == 65 && lastKeyCodeObj.keyCode == 17 || keyCodeObj.keyCode == 17 && lastKeyCodeObj.keyCode == 65) && keyCodeObj.time - lastKeyCodeObj.time < 2000)
			{
				//self.outputParent.removeAttr("contenteditable");
				return;
			}
			else
			{
				//self.outputParent.attr("contenteditable","true");
			}
			lastKeyCodeObj = keyCodeObj;
			if(evt.preventDefault)evt.preventDefault();
			else if(evt.returnValue)evt.returnValue = false;
			return false;
		};
		this.sbody.elements[0].onclick=function(evt)
		{
			//self.outputParent.attr("contenteditable","true");
		};
	},
	output:function(htmlObj)
	{
		
		this.addOutputStamp(true);
		var preValue="";
		//console.log(/^\s+$/.test(htmlObj.html));
		if(htmlObj.html && !/^\s+$/.test(htmlObj.html))
		{
			 var index = htmlObj.html.indexOf('<div style="min-height:20px;font-size: 11pt;');
			 if(index!=0)
			 {
				 preValue += htmlObj.html.substring(0,index);
				 htmlObj.html = htmlObj.html.substring(index);
			 }
		}
		var sHtml = Sharp(htmlObj.html);
		this.inputDiv.add(sHtml);
		sHtml.style("margin-left",20);
		if(preValue)sHtml.html(preValue);
		//this.parent.scrollerfixed();
		this.outputParent.scrollerfixed(null,sHtml,-htmlObj.height-99999);
	},
	resize:function(height,width)
	{
		height = height || this.sbody.height();
		width = width || this.sbody.width();
		this.outputParent.width(width||this.iframe.width());
		this.outputParent.height(height);
		this.outputParent.scrollerfixed();
		
	},
	addOutputStamp:function(isSelf)
	{
		this.inputDiv.add('<div style="'+(isSelf?'color:#008040':'color:#0000FF')+';min-height:20px;font-size: 10pt;line-height: 2;padding-left: 5px;" selected="true" class="select" value="'+Sharp.dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss")+'">'+"马卫 "+Sharp.dateFormat(new Date(),"hh:mm:ss")+'</div>');
	}
});