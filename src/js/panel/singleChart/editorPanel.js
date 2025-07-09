WebChat.Base.Panel.extend('WebChat.Ext.Panel.EditorPanel',
{
	INPUTDIV:1,
	INPUTSPAN:2,
	INPUTBR:3,
	FACEDIV:4,
	showPic:function(img)
	{
		var imgSharp = Sharp(img);
		var parent = imgSharp.parent();
		var scale = parent.children(".pic_scale"); 
		var naturalHeight = imgSharp.prop("naturalHeight");
		var naturalWidth = imgSharp.prop("naturalWidth");
		var height = imgSharp.height()||1;
		var width = imgSharp.width()||1;
		if(naturalHeight>=200||naturalWidth>=200)
		{
			scale.show();
			
			var s1 = height/naturalHeight;
			var s2 = width/naturalWidth;
			parent.attr("title","显示比例："+(s1>s2?Math.round(s2*100):Math.round(s1*100))+"%,双击查看原图");
		}
	},
	showScalePic:function(img)
	{
		var imgSharp = Sharp(img);
		var parent = imgSharp.parent();
		var scale = parent.children(".pic_scale"); 
		var element = imgSharp.elements[0];
		var value = element.naturalHeight;
		var v3= element.clientHeight;
		var v4= element.offsetHeight;
		var v5= element.scrollHeight;
		var value2 = imgSharp.attr("naturalHeight");
		var naturalHeight = imgSharp.prop("naturalHeight")|| imgSharp.prop("scrollHeight");
		var naturalWidth = imgSharp.prop("naturalWidth")|| imgSharp.prop("scrollWidth");
		var height = imgSharp.height()||1;
		var width = imgSharp.width()||1;
		new WebChat.Ext.Panel.ScalePicPanel(Sharp('<div class="scale_pic_panel" dragable="true" unselectable="on"></div>'), desk, {width:naturalWidth+40,height:naturalHeight+40,minWidth:615,minHeight:415,pic:imgSharp.attr("src")});
	}
},
{
	init:function(context, container, settings)
	{
		this._super("init", context, container, settings);
	},
	onInit:function(context, container, settings)
	{
		this.frame = Sharp('<div class="fEditor" style="height:100px;width:100%;border:0px;margin:0px;padding:0px;position: relative;""</div>').addTo(this.content);
		this.sbody = Sharp('<div class="input_body edit_content"></div>').addTo(this.frame);
		
		this.inputDefaultStyle="min-height:20px;font-size: 11pt;word-break: break-all;margin: 0;border: 0;outline: 0;";
		
		this.sbody.style("margin-top","2px").style("margin-bottom","2px").style("margin-left","3px").style("margin-right","5px").height(100);
		this.inputDiv = Sharp('<div style="'+this.inputDefaultStyle+(this.inputStyle?this.inputStyle+"":"")+'" class="input_unit select" contentEditable="true" selected="true"></div>').addTo(this.sbody);
		//this.inputDivHide = Sharp('<div style="height:0px;" contentEditable="true"></div>').addTo(this.sbody);
		var chartCoreLeftArray = this.container.contentData.context.find(".chart_core_left_array");
		this.sbody.scroller({dragstart:function()
		{
			chartCoreLeftArray.hide();
		},dragend:function()
		{
			chartCoreLeftArray.show();
		},drag:function(process)
		{
			
		},stepAmount:1,zIndex:999999,right:0,backgroundColor:this.frame.style("background-color")});
		this.sbody.width(this.sbody.width());
		var self = this;
		this.initFocus();
		var sys = Sharp.getSystem();
		if(sys.ie)
		{
			
			this.sbody.addEvent("paste",function(evt)
			{
				var text;
				var html;
				var texts;
				var images;
				var results=[];
				var imgFlag = 0;
				var firstElement;
				setTimeout(function(){  
					//alert(self.inputDiv.html());
					var children = self.inputDiv.children()
					var sharps = children.toSharps();
					Sharp.iter(sharps, function(e,index)
					{
						var selection = self.getSelection()
						var text = e.text();
						var html = e.html();
						//var node = Sharp.createTextNode(text);
						//if(node && node.length)if(node)e.replace(node[0]);
						var element = self.getElementByHtml(text, html);
						if(index==0 && element)
						{
							e.replace(element.elements[0]);
							lastElement = element;
						}
						else if(element)
						{
							//lastElement.addNext(element);
							e.replace(element.elements[0]);
							lastElement = element;
						}
					});
					//console.log(children);
				},0); 
				
			})
			
		}
		else
		{
			this.sbody.addEvent("paste",function(evt)
			{
				try
				{
					var text;
					var html;
					var texts;
					var images;
					var results=[];
					var imgFlag = 0;
					
					text = evt.clipboardData.getData("Text");
					html = evt.clipboardData.getData("text/html");
					text = text.replace(/<(\/?)strong>|<(\/)?b>|<(\/)?br>/ig, "");
					var re = /[\S ]+|\s+/ig;
					var texts = text.match(re);
					texts = texts||[];
					
					if((!html || /^\s+$/.test(html))&&(texts==null || texts.length==0))return;
					
					var selection = self.getSelection()
					var range = selection.getRangeAt(0);
					var children = self.inputDiv.children();
					var child = children.get(children.size()-1);
					//selection.setPosition(self.sbody, 100);
					//self.sbody.focus();
					if(range.startContainer!=range.endContainer || range.startOffset!=range.endOffset)
					{
						selection.deleteFromDocument();
					}
					//selection.selectAllChildren(self.inputParent.elements[0]);
					//selection.deleteFromDocument();
					
					var images, values=[];
					if(html || (html && !/^\s+$/.test(html)))images = Sharp('<div>'+html+'</div>').find("img").toSharps();
					else images=[];
					for(var i=0, l=texts.length; i<l; i++)
					{
						if(texts[i].match(/^\s+$/))
						{
							//texts[i] = texts[i].replace(/[\f\n\r]/,"</br>").replace(/[\t\v]/,"&nbsp;&nbsp;&nbsp;&nbsp;")
							values.push(Sharp(texts[i].replace(/[\f\n\r]/,"</br>").replace(/[\t\v]/,"&nbsp;&nbsp;&nbsp;&nbsp;")).elements[0]);
							
						}
						for(var h=imgFlag, k=images.length; h<k; h++)
						{
							if(html.indexOf(">"+texts[i]+"<") < html.indexOf(images[h].prop("outerHTML")))
							{
								//values+=texts[i]+" ";
								values.push(Sharp.createTextNode(texts[i])[0]);
								break;
							}
							else if(h >= imgFlag)
							{
								//if(!values[values.length])values[values.length]="";
								var html = self.inputImage(images[h],true);
								if(html)values.push(Sharp(html).elements[0]);
								if(h==imgFlag)imgFlag++;
								else imgFlag = h;
							}
						}
						if(imgFlag >= images.length)
						{
							values.push(Sharp.createTextNode(texts[i])[0]);
						}
					}
					if(imgFlag<images.length)
					{
						for(var h=imgFlag, k=images.length; h<k; h++)
						{
							var html = self.inputImage(images[h],images.length>1&&h!=images.length-1?true:false);
							if(html)values.push(Sharp(html).elements[0]);
						}
					}
					
					if(values && values.length>0)
					{
						//if(values.lastIndexOf(" ")==values.length-1)values = values.substring(0,values.length-1);
						self.addContent(values,range,selection,images.length==0?WebChat.Ext.Panel.EditorPanel.INPUTSPAN:WebChat.Ext.Panel.EditorPanel.INPUTDIV);
					}
					
					//self.sbody.scrollerfixed();
					if(evt.preventDefault)evt.preventDefault();
					else if(evt.returnValue)evt.returnValue = false;
					return false;
				}
				catch(e)
				{
					if(evt.preventDefault)evt.preventDefault();
					else if(evt.returnValue)evt.returnValue = false;
					return false;
				}
				
			});
		}
		
		var lastKeyCodeObj;
		this.sbody.elements[0].onkeydown=function(evt)
		{
			
			evt = (evt) ? evt : window.event;
			if(!evt)return;
			var code = evt.keyCode;
			var keyCodeObj = {keyCode:code,time:new Date()};
			if(lastKeyCodeObj && (keyCodeObj.keyCode == 65 && lastKeyCodeObj.keyCode == 17 || keyCodeObj.keyCode == 17 && lastKeyCodeObj.keyCode == 65) && keyCodeObj.time - lastKeyCodeObj.time < 2000)
			{
				self.inputDiv.children(".scroller").hide();
				setTimeout(function(){self.sbody.scrollerfixed();},200);
			}
			else
			{
				self.inputDiv.attr("contenteditable","true");
			}
			lastKeyCodeObj = keyCodeObj;
			if(code==13)
			{
				/*var selection = self.getSelection()
				var range = selection.getRangeAt(0);
				self.addContent('<p>&#8203;</p>', range, selection, WebChat.Ext.Panel.EditorPanel.INPUTBR);
				//self.addContent("<br></br>", range, selection, WebChat.Ext.Panel.EditorPanel.INPUTBR);
				if(!self.inputDiv.elements[0].hasfocus) {
					self.inputDiv.elements[0].focus();
				}
				if(evt.preventDefault)evt.preventDefault();
				else if(evt.returnValue)evt.returnValue = false;*/
				
				return;
			}
		};
		
		this.sbody.addEvent("keydown",function(evt)
		{
			var selection = self.getSelection();
			self.sbody.scrollerfixed(evt, selection.focusNode, -1000);
			//self.sbody.scrollerfixed();
		});
		this.sbody.addEvent("keyup",function(evt)
		{
			var selection = self.getSelection();
			self.sbody.scrollerfixed(evt, selection.focusNode, -1000);
			//self.sbody.scrollerfixed();
		});
		this.sbody.click(function(evt)
		{
			if(self.inputDiv.attr("contenteditable"))self.inputDiv.attr("contenteditable","true");
			//self.initFocus();
			var element = evt.toElement||evt.target||evt.srcElement;
			if(element != self.inputDiv.elements[0] &&  !self.inputDiv.elements[0].contains(element))
			{
				self.initFocus();
			}
		});
		Sharp.dragable(this.sbody, true);
		
	},
	getContent:function()
	{
		if(!this.inputDiv || this.inputDiv.size()==0)this.inputDiv = Sharp('<div style="'+this.inputDefaultStyle+(this.inputStyle?this.inputStyle+"":"")+'" class="input_unit"></div>').addTo(this.sbody);
		var text = this.inputDiv.text();
		
		if(!text || /^\s+$/.test(text))
		{
			if(this.inputDiv.find("img").size()==0)return;
		}
		this.inputDiv.removeAttr("contenteditable").style("margin","0px");
		var result = {html:this.inputDiv.prop("outerHTML"),height:this.inputDiv.height()};
		this.inputDiv.attr("contenteditable","true");
		return result;
	},
	clearContent:function()
	{
		this.inputDiv.empty();
		this.sbody.scrollerfixed();
		this.initFocus();
	},
	initFocus:function(start, end)
	{
		var selection = this.getSelection();
		var range = null;
		if(!selection.focusNode || !this.sbody.elements[0].contains(selection.focusNode))
		{
			//range = selection.getRangeAt(0);
			if(!this.inputDiv.elements[0].hasfocus) {
				this.inputDiv.elements[0].focus();
			}
			if(selection.getRangeAt)
			{
				range = selection.getRangeAt(0);
				if(this.inputDiv.elements[0].childNodes.length)range.setEndAfter(this.inputDiv.elements[0].childNodes[this.inputDiv.elements[0].childNodes.length-1]);
				selection.removeAllRanges();
				selection.addRange(range);
				return {selection:selection,range:range};
			}
			else
			{
				var self = this;
   				var len = self.inputDiv.text().length;
				
				var selection = document.selection.createRange();
				//var selection = this.inputDiv.elements[0].createTextRange();
				/*selection.moveStart('character',len);
				selection.collapse(true);
				selection.select();*/
				return {selection:selection,range:selection};
			}
			
		}
		
		if(!this.inputDiv.elements[0].hasfocus) {
			this.inputDiv.elements[0].focus();
		}
		start = start||0;
		end = end||start;
		
		
		if(selection.focusNode && this.sbody.elements[0].contains(selection.focusNode))
		{
			range = selection.getRangeAt(0);
			//selection.setPosition(selection.focusNode, selection.focusOffset);
			element = range.endContainer;
			if(element){
				range.setStart(element,range.endOffset);
				range.setEnd(element,range.endOffset)
			}
			return {selection:selection,range:range};
		}
		
		range.collapse(false);
		element = this.inputDiv.elements[0];
		if(element){
			range.setStart(element,start?1:0);
			range.setEnd(element,end?10:0)
		}
		selection.removeAllRanges();
		selection.addRange(range);
		/*selection.setPosition(this.inputDiv.elements[0], 10000);
		range = selection.getRangeAt(0);*/
		return {selection:selection,range:range};
	},
	resize:function(width)
	{
		//this.inputParent.height(this.sbody.height());
		this.sbody.width(width||this.frame.width());
		this.sbody.scrollerfixed();
	},
	addParentContentDiv:function()
	{
		/*this.cursor = Sharp('<div style="'+this.inputDefaultStyle+(this.inputStyle?this.inputStyle+"":"")+'" class="input_unit"></div>').addTo(this.inputDiv);*/
	},
	addContent:function(htmlStr, range, selection, type)
	{
		var elements, element;
		if(Sharp.isArray(htmlStr))
		{
			elements = htmlStr;
		}
		else if(type==WebChat.Ext.Panel.EditorPanel.INPUTDIV)
		{
			if(htmlStr.indexOf("/css/pic/Data/Face/")!=-1)
			{
				var a = htmlStr.match(/(src="[\w|:|\\|\/ ]*\/css\/pic\/Data\/Face\/)+/g);
				htmlStr = htmlStr.replace(/src="[\w|:|\\|\/ ]*\/css\/pic\/Data\/Face\//g, 'src="./css/pic/Data/Face/');
			}
			elements = Sharp(htmlStr).elements;
			
		}
		
		else if(type==WebChat.Ext.Panel.EditorPanel.INPUTSPAN)elements = [Sharp.createTextNode(htmlStr)[0]];
		else if(type==WebChat.Ext.Panel.EditorPanel.INPUTBR)
		{
			
			var element = Sharp(htmlStr).elements[0];
			range.collapse(false);
			//range.insertNode(Sharp("<br>").elements[0]);
			range.insertNode(element);
			
			parent = element.parentElement;
			//var c = parent.lastChild;
			if(element){
				range.setEndAfter(element);
				range.setStartAfter(element)
			}
			selection.removeAllRanges();
			selection.addRange(range);
			//this.sbody.scrollerfixed(evt, element, -element.height());
			return;
		}
		else if(type==WebChat.Ext.Panel.EditorPanel.FACEDIV)
		{
			elements = Sharp(htmlStr).elements;
		}
		
		
		range.collapse(false);
		if(range != selection)
		{
			for(var i=0; i<elements.length; i++)
			{
				range.insertNode(elements[i]);
				range.setStartAfter(elements[i]);
			}
			element = elements[elements.length-1];
			if(element){
				range.setEndAfter(element);
			}
			selection.removeAllRanges();
			selection.addRange(range);
		}
		else
		{
			if(!this.inputDiv.elements[0].hasfocus) {
				this.inputDiv.elements[0].focus();
			}
			var selection = this.getSelection();
			try{
			selection.pasteHTML('<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8" /></head><body>'+htmlStr+'</body>');
			}
			catch(e)
			{
				//console.log(e);
			}
		}
		//this.sbody.scrollerfixed(null, null, -100);
	},
	outputFace:function(htmlStr)
	{
		var info = this.initFocus();
		this.addContent(htmlStr,info.range,info.selection,WebChat.Ext.Panel.EditorPanel.FACEDIV);
	},
	setBold:function()
	{
		var inputs = this.inputDiv;
		if(inputs.style("font-weight")=="bold")
		{
			inputs.style("font-weight","");
		}
		else inputs.style("font-weight","bold");
	},
	setItalic:function()
	{
		var inputs = this.inputDiv;
		if(inputs.style("font-style")=="italic")
		{
			inputs.style("font-style","");
		}
		else inputs.style("font-style","italic");
	},
	setUnderline:function()
	{
		var inputs = this.inputDiv;
		if(inputs.style("text-decoration")=="underline")
		{
			inputs.style("text-decoration","");
		}
		else inputs.style("text-decoration","underline");
	},
	inputImage:function(imageSharp, noBlank)
	{
		var src = imageSharp.prop("src");
		var height = imageSharp.prop("height");
		var width = imageSharp.prop("width");
		if(src)
		{
			var package;
			if(src.indexOf('css/pic/Data/Face/') != -1)
			{
				src = src.replace(/[\w|:|\\|\/ ]*\/css\/pic\/Data\/Face\//, './css/pic/Data/Face/');
				package = ('<img src="'+ src +'"></img>');
			}
			else
			{
				package = '<div class="pic_show" contenteditable="false">'
				+'<span class="pic_parent"><img src="'+ src +'" class="pic_img" onload="if(window.parent.WebChat)window.parent.WebChat.Ext.Panel.EditorPanel.showPic(this);" onclick="if(window.parent.WebChat)window.parent.WebChat.Ext.Panel.EditorPanel.showScalePic(this);"></img>'
				+'<div class="pic_scale" onclick="if(window.parent.WebChat)window.parent.WebChat.Ext.Panel.EditorPanel.showScalePic(this.parentElement.firstChild);"></div>'
				+'<span></div>'+(noBlank?'':'&nbsp;');
			}
			return package||"";
		}
		return "";
	},
	getSelection:function()
	{
		var selection; //申明range 对象
		if (window.getSelection) {
			selection = window.getSelection();
		} else if (document.selection) { 
			selection = document.selection.createRange();
		}
		return selection
	},
	getElementByHtml:function(text, html)
	{
		var parent = Sharp("<span></span>");
		var images, values=[], imgFlag = 0;;
		text = text.replace(/<(\/?)strong>|<(\/)?b>|<(\/)?br>/ig, "");
		var re = /[\S ]+|\s+/ig;
		var texts = text.match(re);
		texts = texts||[];
		if(html || (html && !/^\s+$/.test(html)))images = Sharp('<div>'+html+'</div>').find("img").toSharps();
		else images=[];
		for(var i=0, l=texts.length; i<l; i++)
		{
			if(texts[i].match(/^\s+$/))
			{
				parent.add(Sharp(texts[i].replace(/[\f\n\r]/,"</br>").replace(/[\t\v]/,"&nbsp;&nbsp;&nbsp;&nbsp;")));
			}
			for(var h=imgFlag, k=images.length; h<k; h++)
			{
				if(html.indexOf(">"+texts[i]+"<") < html.indexOf(images[h].prop("outerHTML")))
				{
					//values+=texts[i]+" ";
					parent.add(Sharp.createTextNode(texts[i]));
					break;
				}
				else if(h >= imgFlag)
				{
					//if(!values[values.length])values[values.length]="";
					var html = this.inputImage(images[h],true);
					if(html)parent.add(Sharp(html));
					if(h==imgFlag)imgFlag++;
					else imgFlag = h;
				}
			}
			if(imgFlag >= images.length)
			{
				parent.add(Sharp.createTextNode(texts[i]));
			}
		}
		if(imgFlag<images.length)
		{
			for(var h=imgFlag, k=images.length; h<k; h++)
			{
				var html = this.inputImage(images[h],true);
				if(html)parent.add(Sharp(html));
			}
		}
		
		if(parent.size()>0)
		{
			return parent;
		}
		else return null;
	}
});