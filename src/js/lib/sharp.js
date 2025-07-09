// JavaScript Document
if(!Sharp)
{


var Sharp =(function()
{
	var information = 
	{
		version:"1.0",
		document:document,
		parseDiv:(function()
		{
			var frag = document.createDocumentFragment()
			frag.appendChild(document.createElement("div"));
			return frag.childNodes[0];
		})(),//bug1 当子元素为tr li等需对于的父元素document.createDocumentFragment();
		parseTable: (function(){var table = document.createElement("table"); table.appendChild(document.createElement("tbody")); return table.children[0];}
					)(),
		numberExp: /^[\-\+]?\d+(.\d+)?/,
		regExpId: /^#\w+/,
		pxStyleExp: /^\-?[\d\.]+px$/,
		elementExp: /^\s*<\/?\w+.*>/,
		invalideTagExp:/SCRIPT|STYLE/,
		ieFilterStyleExp:/opacity/,
		system:(function()
			{
				var Sys = {};
				var ua = navigator.userAgent.toLowerCase();
				var s;
				(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
				(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
				(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
				(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
				(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
				return Sys;
			})(),
		contains: function(B){ 
			return this.compareDocumentPosition(B) - 19 > 0 
		} 
	};
	var parserExp = /( +)|(\w+)|\[([\'\"]\w+[\'\"]|\w+)=([\'\"]\w+[\'\"]|\w+)\]|(\.\w+)|:first-child|:last-child|:nth-child\(([\w\+\-]+)\)/g;
	var pxStylePropertyExp = /top|left|bottom|right|height|width|margin[Top|Right|Bottom|Left]|border(Top|Right|Bottom|Left)|padding(Top|Right|Bottom|Left)/;
	var parserTypes = {separator:-1,tagname:1,attr:2,compute:3};
	var sharpId = 0;
	
	
	function Sharp(selector, elements, instance, noselect)
	{
		if(!instance)
		{
			return Sharp.find(selector, elements, noselect);
		}
		this.selector = selector;
		this.elements = elements || [];
	}

	Sharp.prototype.find = function(selector)
	{
		return Sharp.find(selector, this.elements);
	}
	Sharp.prototype.match = function(selector)
	{
		return Sharp.match(this.elements[0], selector);
	}
	
	/*
	 *子节点查找
	 */
	Sharp.find = function(selector, elements, noselect)
	{
		var prev,next;
		if(noselect)
		{
			prev = Sharp.isString(selector)?selector:undefined;
			next = elements;
		}
		else if(Sharp.isString(selector))
		{
			prev = selector;
			next = Sharp.select(selector,Sharp.isArray(elements)?elements:[information.document.documentElement]);
		}
		else if(Sharp.isSharp(selector))
		{
			prev = Sharp.isString(selector)?selector:undefined;
			next = selector.elements;
		}
		else
		{
			prev = undefined;
			next = selector?(selector==information.document?[information.document.body]:[selector]):[information.document.body];
		}
		return new Sharp(prev, next, true);
		
	}
	
	/*
	 *Sharp原型方法
	 */
	 
	
	
	/*
	 *属性操作
	 */
	Sharp.prototype.attr = function(name, value)
	{
		var elements = this.elements;
		if(arguments.length < 2)
		{
			return Sharp.attr(elements[0], name);
		}
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.attr(elements[i], name, value);
		}
		return this;
	}
	
	Sharp.prototype.removeAttr = function(name)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.removeAttr(elements[i], name);
		}
		return this;
	}
	
	Sharp.prototype.prop = function(name, value)
	{
		var elements = this.elements;
		if(arguments.length < 2)
		{
			return Sharp.prop(elements[0], name);
		}
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.prop(elements[i], name, value);
		}
		return this;
	}
	
	Sharp.prototype.addClass = function(name)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.addClass(elements[i], name);
		}
		return this;
	}
	
	Sharp.prototype.removeClass = function(name)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.removeClass(elements[i], name);
		}
		return this;
	}
	
	Sharp.prototype.name = function(value)
	{
		if(arguments.length == 0)
		{
			return this.attr("name");
		}
		this.attr("name", value);
		return this;
	}
	
	Sharp.prototype.value = function(value)
	{
		if(arguments.length == 0)
		{
			return this.prop("value");
		}
		this.prop("value", value);
		return this;
	}
	
	Sharp.prototype.text = function(value)
	{
		if(arguments.length == 0)
		{
			if(this.elements[0].innerText != undefined)
			{
				return this.prop("innerText");
			}
			else if(this.elements[0].textContent != undefined)
			{
				return this.prop("textContent");
			}
		}
		this.prop("innerText", value);
		return this;
	}
	Sharp.prototype.getTagName = function()
	{
		return this.prop("tagName");
	}
	
	Sharp.prototype.html = function(value)
	{
		if(arguments.length == 0)
		{
			return this.prop("innerHTML");
		}
		this.prop("innerHTML", value);
		return this;
	}
	Sharp.prototype.empty = function()
	{
		this.prop("innerHTML", "");
		return this;
	}
	/*
	 *style操作
	 */
	Sharp.prototype.style = function(name, value)
	{
		var elements = this.elements;
		if(arguments.length < 2)
		{
			return Sharp.style(elements[0], name);
		}
		else if(arguments.length == 2)
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.style(elements[i], name, value);
		}
		else for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.style(elements[i], name, value, true);
		}
		return this;
	}
	
	Sharp.prototype.height = function(value)
	{
		if(arguments.length == 0)
		{
			return this.style("height");
		}
		if(value<0)value=0;
		this.style("height", value);
		return this;
	}
	
	Sharp.prototype.width = function(value)
	{
		if(arguments.length == 0)
		{
			return this.style("width");
		}
		if(value<0)value=0;
		this.style("width", value);
		return this;
	}
	
	Sharp.prototype.top = function(value)
	{
		if(arguments.length == 0)
		{
			return this.style("top");
		}
		this.style("top", value);
		return this;
	}
	
	Sharp.prototype.left = function(value)
	{
		if(arguments.length == 0)
		{
			return this.style("left");
		}
		this.style("left", value);
		return this;
	}
	
	Sharp.prototype.show = function()
	{
		var olddisplay = this.prop("olddisplay");
		var display = this.style("display");
		if(olddisplay)
		{
			this.style("display", olddisplay);
		}
		else if(display=="none")this.style("display", "block");
		return this;
	}
	
	Sharp.prototype.hide = function(value)
	{
		var display = this.style("display");
		if(display && display != "none")
		{
			this.prop("olddisplay", display);
		}
		this.style("display", "none");
		return this;
	}
	
	Sharp.prototype.children = function(selector)
	{
		var parents = this.elements;
		var children = [];
		for(var i=0,l = parents.length;i<l;i++)
		{
			children = children.concat(Sharp.children(parents[i],selector));
		}
		return Sharp.find(selector, children, true);
	}
	
	Sharp.prototype.get = function(index)
	{
		return Sharp.find(this.selector, [this.elements[index]], true);
	}
	
	Sharp.prototype.remove = function(selector)
	{
		var parents = this.elements;
		var children = [];
		if(selector)
		{
			for(var i=0,l = parents.length;i<l;i++)
			{
				children = children.concat(Sharp.children(parents[i],selector));
			}
		}
		else
		{
			children = children.concat(this.elements);
		}
		return Sharp.remove(children);
	}
	
	Sharp.prototype.prev = function(selector)
	{
		var element = Sharp.prev(selector, this.elements[0]);
		var elements = [];
		if(element)
		{
			elements.push(element);
		}
		return Sharp.find(selector,elements,true);
	}
	
	Sharp.prototype.next = function(selector)
	{
		var element = Sharp.next(selector,this.elements[0]);
		var elements = [];
		if(element)
		{
			elements.push(element);
		}
		return Sharp.find(selector,elements, true);
	}
	
	Sharp.prototype.parent = function(selector)
	{
		var parent = Sharp.parent(null, this.elements[0]);
		return Sharp.find(selector,parent?[parent]:[], true);
	}
	/*
	 *dom操作
	 */
	Sharp.prototype.size = function()
	{
		return this.elements.length;
	}
	Sharp.prototype.add = function(content)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.add(elements[i], content);
		}
		return this;
	}
	
	Sharp.prototype.addTo = function(parent)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.addTo(elements[i], parent);
		}
		return this;
	}
	
	Sharp.prototype.addFirst = function(content)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.addFirst(elements[i], content);
		}
		return this;
	}
	
	Sharp.prototype.addNext = function(element)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.addNext(elements[i], element);
		}
		return this;
	}
	
	Sharp.prototype.insertBefore = function(element)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.insertBefore(elements[i], element);
		}
		return this;
	}
	
	Sharp.prototype.replace = function(element)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.replace(elements[i], element);
		}
		return this;
	}
	
	/*
	 *dom事件
	 */
	Sharp.prototype.addEvent = function(name, func, capture)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.addEvent(elements[i], name, func, capture);
		}
		return this;
	}
	
	Sharp.prototype.removeEvent = function(name, func)
	{
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.removeEvent(elements[i], name, func);
		}
		return this;
	}
	
	Sharp.prototype.click = function(func, capture)
	{
		this.addEvent("click", func, capture);
		return this;
	}
	
	Sharp.prototype.change = function(func, capture)
	{
		this.addEvent("change", func, capture);
		return this;
	}
	
	Sharp.prototype.focus = function(func, capture)
	{
		this.addEvent("focus", func, capture);
		return this;
	}
	
	Sharp.prototype.blur = function(func, capture)
	{
		this.addEvent("blur", func, capture);
		return this;
	}
	
	Sharp.prototype.mouseout = function(func, capture)
	{
		this.addEvent("mouseout", func, capture);
		return this;
	}
	
	Sharp.prototype.mouseover = function(func, capture)
	{
		this.addEvent("mouseover", func, capture);
		return this;
	}
	
	Sharp.prototype.fire = function(name)
	{	
		var elements = this.elements;
		for(var i=0,l = elements.length;i<l;i++)
		{
			Sharp.fire(elements[i], name);
		}
		return this;
	}
	
	Sharp.prototype.contains = function(element)
	{
		return Sharp.contains(this.elements[0], element);
	}
	Sharp.prototype.getSharp = function()
	{
		return Sharp;
	}
	
	//曲线运动
	Sharp.prototype.sin = function(option1)
	{
		var argus =[this];
		for(var i=0,l = arguments.length;i<l;i++)
		{
			argus.push(arguments[i]);
		}
		Sharp.sin.apply(this, argus);
		return this;
	}
	Sharp.prototype.stop = function(complete)
	{
		Sharp.stop(this, complete);
		return this;
	}
	//获取坐标
	Sharp.prototype.getAbsPos = function(){
		 return Sharp.getAbsPos(this);
	}
	//大小变换
	Sharp.prototype.zoomable = function(option,zoomerIndex)
	{
		var zoomers = this.children("div[zoomable=zoomable]");
		if(zoomers.size()==0)
		{
			var defaultOption={width:3,maxHight:0,minHight:0,maxWidth:0,minWidth:0,
						startFunc:option.startFunc||function(){},
						zoomingFunc:option.zoomingFunc||function(){},
						endFunc:option.endFunc||function(){},overflow:this.style("overflow")};
			if(option)
			{
				Sharp.extend(defaultOption,option);
			}
			var zoomersStr = '<div class="left_zoom border_zoomer" style="position: absolute;cursor: w-resize;background-color: #ffffff;opacity:0;filter:alpha(opacity=0);-ms-user-select: none;" zoomable="zoomable" direct="left" onselectstart="return false"></div>'
					+'<div class="right_zoom border_zoomer" style="position: absolute;cursor: e-resize;background-color: #ffffff;opacity:0;filter:alpha(opacity=0);-ms-user-select: none;" zoomable="zoomable" direct="right" onselectstart="return false"></div>'
					+'<div class="top_zoom border_zoomer" style="position: absolute;cursor: n-resize;background-color: #ffffff;opacity:0;filter:alpha(opacity=0);" zoomable="zoomable" direct="top" onselectstart="return false"></div>'
					+'<div class="bottom_zoom border_zoomer" style="position: absolute;cursor: s-resize;background-color: #ffffff;opacity:0;filter:alpha(opacity=0);" zoomable="zoomable" direct="bottom" onselectstart="return false"></div>'
					+'<div class="leftTop_zoom border_zoomer" style="position: absolute;cursor: nw-resize;background-color: #ffffff;opacity:0;filter:alpha(opacity=0);" zoomable="zoomable" direct="leftTop" onselectstart="return false"></div>'
					+'<div class="leftBottom_zoom border_zoomer" style="position: absolute;cursor: sw-resize;background-color: #ffffff;opacity:0;filter:alpha(opacity=0);" zoomable="zoomable" direct="leftBottom" onselectstart="return false"></div>'
					+'<div class="rightTop_zoom border_zoomer" style="position: absolute;cursor: ne-resize;background-color: #ffffff;opacity:0;filter:alpha(opacity=0);" zoomable="zoomable" direct="rightTop" onselectstart="return false"></div>'
					+'<div class="rightBottom_zoom border_zoomer" style="position: absolute;cursor: se-resize;background-color: #ffffff;opacity:0;filter:alpha(opacity=0);" zoomable="zoomable" direct="rightBottom" onselectstart="return false"></div>';
			this.add(zoomersStr);
			zoomers = this.children("div[zoomable=zoomable]");
			this.prop("zoomableOption", defaultOption);
		}
		else if(option)
		{
			var zoomableOption = this.prop("zoomableOption");
			Sharp.extend(zoomableOption,option);
		}
		var zoomerWidth = this.prop("zoomableOption").width,zoomerWidthDouble = 2*zoomerWidth,borderLeftWidth = this.style("border-left-width"),borderRightWidth = this.style("border-right-width"),borderTopWidth = this.style("border-top-width"),borderBottomWidth = this.style("border-bottom-width");
		//alert(this.prop("offsetHeight"));
		//alert(this.prop("offsetHeight")-zoomerWidthDouble);
		if(zoomerIndex != 0)zoomers.get(0).height(this.prop("offsetHeight")-zoomerWidthDouble<0?0:this.prop("offsetHeight")-zoomerWidthDouble).top(zoomerWidth).left(-zoomerWidth/2).width(zoomerWidth);
		if(zoomerIndex != 1)zoomers.get(1).height(this.prop("offsetHeight")-zoomerWidthDouble).top(zoomerWidth).left(this.prop("offsetWidth")-zoomerWidth/2-borderLeftWidth-borderRightWidth).width(zoomerWidth);
		if(zoomerIndex != 2)zoomers.get(2).height(zoomerWidth).top(-zoomerWidth/2).left(zoomerWidth).width(this.prop("offsetWidth")-zoomerWidthDouble);
		if(zoomerIndex != 3)zoomers.get(3).height(zoomerWidth).top(this.prop("offsetHeight")-zoomerWidth/2-borderTopWidth-borderBottomWidth).left(zoomerWidth).width(this.prop("offsetWidth")-zoomerWidthDouble);
		if(zoomerIndex != 4)zoomers.get(4).height(zoomerWidthDouble).top(-zoomerWidth).left(-zoomerWidth).width(zoomerWidthDouble);
		if(zoomerIndex != 5)zoomers.get(5).height(zoomerWidthDouble).top(this.prop("offsetHeight")-zoomerWidth-borderLeftWidth-borderRightWidth).left(-zoomerWidth).width(zoomerWidthDouble);
		if(zoomerIndex != 6)zoomers.get(6).height(zoomerWidthDouble).top(-zoomerWidth).left(this.prop("offsetWidth")-zoomerWidth-borderTopWidth-borderBottomWidth).width(zoomerWidthDouble);
		if(zoomerIndex != 7)zoomers.get(7).height(zoomerWidthDouble).top(this.prop("offsetHeight")-zoomerWidth-borderLeftWidth-borderRightWidth).left(this.prop("offsetWidth")-zoomerWidth-borderTopWidth-borderBottomWidth).width(zoomerWidthDouble);
	}
	
	/*
	 *迭代器
	 */
	Sharp.prototype.iter = function(callback)
	{
		Sharp.iter(this.elements, callback, this);
	}
	Sharp.prototype.toSharps = function()
	{
		return Sharp.toSharps(this);
	}
	/*
	 *滚动条
	 */
	Sharp.prototype.scroller = function(option)
	{
		for(var i=0,l = this.elements.length;i<l;i++)
		{
			Sharp.scroller(this.get(i), option);
		}
		return this;
	}
	
	Sharp.prototype.groupDrag = function(option)
	{
		Sharp.groupDrag(this, option);
		return this;
	}
	
	Sharp.prototype.scrollerfixed = function(ev,selectedElement, upordownamount)
	{
		for(var i=0,l = this.elements.length;i<l;i++)
		{
			Sharp.scrollerfixed(this.get(i), ev, selectedElement,upordownamount);
		}
		return this;
	}
	
	Sharp.iter = function(list, callback, obj)
	{
		var ret;
		if(!obj)for(var i=0,l = list.length;i<l;i++)
		{
			ret = callback.call(list, list[i], i, list);
			if(!ret && typeof ret == "boolean")break;
		}
		else for(var i=0,l = list.length;i<l;i++)
		{
			ret = callback.call(obj, list[i], i, list);
			if(!ret && typeof ret == "boolean")break;
		}
	}
	
	Sharp.extend = function(target, original)
	{
		for(var property in original)
		{
			if(!original.hasOwnProperty)
			{
				target[property] = original[property];
			}
			else if(original.hasOwnProperty(property))
			{
				target[property] = original[property];
			}
		}
		return target;
	}
	
	Sharp.attr = function(element, name, value)
	{
		if(!element)return;
		if(arguments.length==2)
		{
			return element.getAttribute(name);
		}
		else if(arguments.length>2)
		{
			element.setAttribute(name, value);
		}
	}
	
	Sharp.removeAttr = function(element, name)
	{
		if(!element)return;
		element.removeAttribute(name);
	}
	
	Sharp.prop = function(element, name, value)
	{
		if(!element)return;
		if(arguments.length==2)
		{
			return element[name];
		}
		else if(arguments.length>2)
		{
			try
			{
				element[name] = value;
			}
			catch(e){}
		}
	}
	
	Sharp.addClass = function(element, name)
	{
		var value = Sharp.prop(element, "className"), results = value.match(/(\w+)/g);
		if(results)
		{
			for(var i=0,l=results.length; i<l; i++)
			{
				if(results[i] == name)
				{
					return element;
				}
			}
		}
		Sharp.prop(element, "className", value+" " + name)
	}
	
	Sharp.removeClass = function(element, name)
	{
		var value = Sharp.prop(element, "className"), results = value.match(/(\w+)/g), newValue ="";
		if(results)
		{
			for(var i=0,l=results.length; i<l; i++)
			{
				if(results[i] == name)
				{
					results.splice(i,1);
					i--;
				}
			}
			for(var i=0,l=results.length; i<l; i++)
			{
				newValue += " "+results[i];
			}
			Sharp.prop(element, "className", newValue)
		}
	}
	
	Sharp.style = function(element, name, value)
	{
		name = name.replace(/-(\w)/g, function($0,$1,$2) { 
			return ($1.toUpperCase());
		});
		if(!element)return;
		if(arguments.length==2)
		{
			var value = element.style[name];
			if(information.system.ie && information.ieFilterStyleExp.test(name))//opacity获取和设置有问题，暂用class代替
			{
				/*if(element.style.filter) value = element.style.filter('alpha')[name]/100;
				else value = element.style[name];	*/
				if(element.filters)
				{
					 if(element.filters.alpha)value = element.filters.alpha[name]/100;
					 else value =1;
				}
  				else if(information.document.defaultView)
				{
					 value = information.document.defaultView.getComputedStyle(element,null);
					 if(value)value = value.getPropertyValue(name);
					 else value = element.style[name];
				}
				//'alpha(opacity=' + value*10 + ')'; 
				else value = element.filters.alpha.opacity;
			}
			else if(element.currentStyle){ 
				value = element.currentStyle[name];   
			}   
			else{ 
				value = information.document.defaultView.getComputedStyle(element,null)[name]; 
			}   
			
			if(information.pxStyleExp.test(value))
			{
				return value.match(information.numberExp)[0]-0;
			}
			else if(/^[\-\+]?\d+$/.test(value))
			{
				return value;
			}
			else if(/^\d+%$/.test(value))
			{
				return element['offset'+name.substr(0,1).toUpperCase() + name.substring(1)];
			}
			else if(/top|left|height|width/.test(name) && value=="auto")
			{
				return Sharp.prop(element,"offset"+name.charAt(0).toUpperCase() + name.substring(1));
			}
			else if(pxStylePropertyExp.test(name))
			{
				return 0;
			}
			else
			{
				return value;
			}
			return value;
		}
		else if(arguments.length==3)
		{
			if(information.system.ie && information.ieFilterStyleExp.test(name))
			{
				/*if(element.filters)element.filters.alpha[name] = value*100;
  				else element.style[name] = value;*/
				element.filter="alpha(opacity="+value*100+")";
			}
			else if(pxStylePropertyExp.test(name) && !/\d+(%|(px))/.test(value+""))
			{
				if(value == "" && typeof value == "string")element.style[name] = value;
				else element.style[name] = value + "px";
			}
			else
			{
				element.style[name] = value;
			}
		}
		else if(arguments.length==4)
		{
			element.style[name] = value;
		}
	}
	
	Sharp.add = function(element, content)
	{
		if(Sharp.isString(content))
		{
			var children = Sharp.create(content);
			for(var i=0,l = children.length;i<l;i++)
			{
				element.appendChild(children[i]);
			}
		}
		else if(Sharp.isSharp(content))
		{
			for(var i=0,l = content.elements.length;i<l;i++)
			{
				element.appendChild(content.elements[i]);
			}
		}
		else if(Sharp.isArray(content))
		{
			for(var i=0,l = content.length;i<l;i++)
			{
				element.appendChild(content[i]);
			}
		}
		else
		{
			try{//Sharp.parent(null, orignal).insertBefore(content, orignal);
			element.appendChild(content);
			}
			catch(e)
			{
			    var a = Sharp.isSharp(content);
				for(var i=0,l = content.elements.length;i<l;i++)
				{
					element.appendChild(content.elements[i]);
				}
			}
		}
		
		return element;
	}
	
	Sharp.addTo = function(element, parent)
	{
		parent.add(element);
		return element;
	}
	
	Sharp.addFirst = function(element, content)
	{
		var child = element.children?element.children[0]:null;
		if(child)
		{
			Sharp.insertBefore(child, content);
		}
		return element;
	}
	
	Sharp.insertBefore = function(orignal, content)
	{
		if(Sharp.isString(content))
		{
			var children = Sharp.create(content);
			for(var i=0,l = children.length;i<l;i++)
			{
				Sharp.parent(null, orignal).insertBefore(children[i], orignal);
			}
		}
		else if(Sharp.isSharp(content))
		{
			for(var i=0,l = content.size();i<l;i++)
			{
				Sharp.parent(null, orignal).insertBefore(content.elements[i], orignal);
			}
		}
		else
		{
			Sharp.parent(null, orignal).insertBefore(content, orignal);
		}
		return orignal;
	}
	
	Sharp.replace = function(orignal, content)
	{
		if(Sharp.isString(content))
		{
			var children = Sharp.create(content);
			Sharp.parent(null, orignal).replaceChild(children[0], orignal);
		}
		else if(Sharp.isSharp(content))
		{
			Sharp.parent(null, orignal).replaceChild(content.elements[0], orignal);
		}
		else
		{
			Sharp.parent(null, orignal).replaceChild(content, orignal);
		}
		return orignal;
	}
	
	Sharp.addNext = function(element, content)
	{
		var next = Sharp.next(null, element);
		if(next)
		{
			Sharp.insertBefore(next, content);;
		}
		else
		{
			Sharp.add(Sharp.parent(null, element), content);
		}
		return element;
	}
	
	Sharp.remove = function(elements, content)
	{
		var element;
		for(var i=0,l = elements.length;i<l;i++)
		{
			element = elements[i];
			if(element.remove)
			{
				element.remove();
			}
			else if(element.parentElement)
			{
				element.parentElement.removeChild(element);
			}
		}
	}
	
	
	Sharp.parent = function(selector, element)
	{
		return element.parentElement;
	}
	
	Sharp.children = function(parent,selector)
	{
		var children = [];
		
		var childrenOrigal = parent.children;
		if(parent.nodeType == 9)
		{
			childrenOrigal = parent.body.children
		}
		for(var i=0,l = childrenOrigal.length;i<l;i++)
		{
			children.push(childrenOrigal[i]);
		}
		return Sharp.filter(children, selector);
	}
	
	Sharp.prev = function(selector, element)
	{
		var prev = element;
		var parsers = Sharp.parsers(selector);
		while(prev && (prev = prev.previousSibling))
		{
			if(prev.nodeType == 1 && Sharp.match(prev, parsers))
			{
				return prev;
			}
		}
		return null;
	}
	
	Sharp.next = function(selector, element)
	{
		var next = element;
		var parsers = Sharp.parsers(selector);
		while(next && (next = next.nextSibling))
		{
			if(next.nodeType == 1 && Sharp.match(next, parsers))
			{
				return next;
			}
		}
		return null;
	}
	
	Sharp.create = function(content)
	{
		var parseDiv;
		var children;
		//其他tag 标签 ，参考http://www.cnblogs.com/rubylouvre/archive/2009/12/14/1622631.html；
		if(/^ *<(tr|td)/.test(content))
		{
			parseDiv = information.parseDiv;
			
			if(/^ *<tr/.test(content))
			{
				parseDiv.innerHTML = "<table>"+content+"</table>";
				children = parseDiv.children[0].children[0].children;
			}
			
			else 
			{
				parseDiv.innerHTML = "<table><tr>"+content+"</tr></table>";
				children = parseDiv.children[0].children[0].children[0].children;
			}
		}
		else 
		{
			parseDiv = information.parseDiv;
			if(!content)
			{
				parseDiv.innerHTML = content;
			}
			parseDiv.innerHTML = "X"+content;
			children = parseDiv.children;
		}
		
		var elements = [];
		for(var i=0; i<children.length; i++)
		{
			elements.push(children[i]);
		}
		return elements;
	}
	
	Sharp.createTextNode = function(selector)
	{
		var parseDiv = information.parseDiv;
		parseDiv.innerHTML = "";
		if(parseDiv.innerText != undefined)parseDiv.innerText = selector;
		else parseDiv.textContent = selector;
		var children = parseDiv.childNodes;
		var elements = [];
		for(var i=0; i<children.length; i++)
		{
			elements.push(children[i]);
		}
		return elements;
	}
	
	Sharp.addEvent = function(element, name, func, capture)
	{
		if(element.addEventListener)
		{
			capture = capture || false;
			element.addEventListener(name, func, capture);
		}
		else if(element.attachEvent)
		{
			element.attachEvent("on"+name, func);
		}
	}
	
	Sharp.removeEvent = function(element, name, func)
	{
		if(element.removeEventListener)
		{
			element.removeEventListener(name, func);
		}
		else if(element.detachEvent)
		{
			element.detachEvent(name, func);
		}
	}
	
	Sharp.fire = function(element, name)
	{
		if( document.createEvent ) 
		{
			var evObj = document.createEvent('MouseEvents');
			//evObj.initEvent( name, true, false );
			var pos = Sharp.getAbsPos(element)
			
			//evObj.initMouseEvent( name, true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null );
			evObj.initMouseEvent( name, true, true, window, 1, pos.x+3, pos.y+3,  pos.x+3, pos.y+3, false, false, true, false, 0, null );
			element.dispatchEvent(evObj);
		}
		else if( document.createEventObject )
		{
		  	element.fireEvent('on'+name);
		}
	}
	
	
	Sharp.contains = function(parent, element)
	{
		if(parent.contains)
		{
			if(element)
			{
				var a = parent.contains(element);
				return a ;
			}
			return true;
		}
		else
		{
			return information.contains.call(parent, element);
		}
	}
	
	/*
	 *Sharp公共方法
	 */
	Sharp.select = function(selector, originals)
	{
		if(information.regExpId.test(selector))
		{
			var elements = [information.document.getElementById(selector.match(/\w+/)[0])];
			return elements;
		}
		else if(information.elementExp.test(selector))
		{
			return Sharp.create(selector);
		}
		else if(information.document.querySelectorAll)
		{
			var elements=[],oldId,es,element,j,newTemp = Sharp.differ(originals),unexception = true;
			try
			{
				for(var i=0,l = newTemp.length;i<l;i++)
				{
					element = newTemp[i];
					var doc = information.document;
					if(element == information.document.documentElement && information.document.querySelectorAll)
					{
						es = information.document.querySelectorAll(selector);
						for(var j=0,m = es.length;j<m;j++)
						{
							elements.push(es[j]);
						}
					}
					else
					{
						if(element.parentElement == information.parseDiv)
						{
							element = information.parseDiv;
							originals = [element];
						}
						else if(element.parentElement == information.parseTable)
						{
							element = information.parseTable;
							originals = [element];
						}
						oldId = element.id;
						element.id = "_sharp_temp_inner_id";
						es = element.querySelectorAll("[id='_sharp_temp_inner_id'] "+selector);
						for(var j=0,m = es.length;j<m;j++)
						{
							elements.push(es[j]);
						}
						
						oldId?element.id = oldId:element.id=null;
					}	
				}
					
			}
			catch(e)
			{
				unexception = false;
			}
			if(unexception)
			{
				//return elements;
			}
			else if(element)
			{
				oldId?element.id = oldId:element.id=null;
			}
		}
		return Sharp.mySelect(selector, Sharp.differ(originals));
	}
	
	Sharp.mySelect = function(selector, originals)
	{
		var parsers = Sharp.parsers(selector);
		var targets = [];
		for(var i=0,l = originals.length;i<l;i++)
		{
			Sharp.mutilFilter(parsers, originals[i], targets, 0);
		}
		return targets;
	}
	
	
	
	Sharp.mutilFilter = function(parsers, parent, targets, parsersIndex)
	{
		var originals = parent.children;
		if(originals && originals.length ==0)return;
		var elements = Sharp.filter(originals, [parsers[parsersIndex]]);
		
		if(parsersIndex == parsers.length - 1)
		{
			for(var i=0,l = elements.length;i<l;i++)
			{
				targets.push(elements[i]);
				Sharp.mutilFilter(parsers, elements[i], targets, parsersIndex);
			}
		}
		else if(parsersIndex < parsers.length - 1)
		{
			for(var i=0,l = elements.length;i<l;i++)
			{
				Sharp.mutilFilter(parsers, elements[i], targets, parsersIndex+1);
			}
		}
		
		for(var i=0,l = originals.length;i<l;i++)
		{
			for(var j=0,k = elements.length;j<k;j++)
			{
				if(originals[i] == elements[j])
				{
					break;
				}
			}
			if(j == k)
			{
				Sharp.mutilFilter(parsers, originals[i], targets, parsersIndex);
			}
		}
		
	}
	
	Sharp.differ=function(array)
	{
		var news = [];
		for(var i=0,outer; i<array.length;i++)
		{
			news.push(outer = array[i]);
			for(var j=i+1; j<array.length;j++)
			{
				if(!outer.contains(array[j]))
				{
					i = --j;
					break;
				}
				if(j==array.length-1)
				{
					return news;
				}
			}
		}
		return news;
	}
	
	Sharp.filter = function(elements, content)
	{
		var parsers = Sharp.parsers(content);
		var newElements=[];
		
		
		for(var i=0,l = parsers.length, has_nth_child_exp=false, parser;i<l;i++)
		{
			parser = parsers[i];
			for(var j=1,k = parser.length,types = parserTypes;j<k;j++)
			{
				if(types[parser[j].type] == 3)
				{
					has_nth_child_exp=true;
				}
			}
			newElements = Sharp.filterParser(elements, parser,has_nth_child_exp);
		}
		
		return newElements;
	}
	
	Sharp.filterParser = function(elements, parser, has_nth_child)
	{
		for(var i=0,l = parser.length,indexes=[];i<l;i++)
		{
			elements = Sharp.filterExpression(elements, parser[i],has_nth_child,l, i);
		}
		return elements;
	}
	
	Sharp.filterExpression = function(elements, expression, has_nth_child, parserLength, eIndex)
	{
		if(!has_nth_child || eIndex == 0)
		{
			var types = parserTypes,element, results=has_nth_child?{}:[];
			if(types[expression.type] == 1)
			{
				for(var i=0,l = elements.length;i<l;i++)
				{
					element = elements[i];
					if(element.tagName == expression.value)
					{
						if(has_nth_child)results[i+1]=element;
						else results.push(element);
					}
				}
			}
			else if(types[expression.type] == 2)
			{
				for(var i=0,l = elements.length;i<l;i++)
				{
					element = elements[i];
					if(expression.name == "class")
					{
						if(new RegExp("(^| +)"+expression.value+"( +|$)","g").test(element.getAttribute("class")))
						{
							if(has_nth_child)results[i+1]=element;
							else results.push(element);
						}
					}
					else if(element.getAttribute(expression.name) == expression.value)
					{
						if(has_nth_child)results[i+1]=element;
						else results.push(element);
					}
				}
			}
			else if(types[expression.type] == 3)
			{
				for(var i=0,l = elements.length;i<l;i++)
				{
					element = elements[i];
					var value = expression.value;
					if(value == -1)
					{
						if(i == elements.length-1)
						{
							if(has_nth_child)results[i+1]=element;
							else results.push(element);
							break;
						}
						
					}
					else if(/^([\+\-\d]+)$/g.test(value))
					{
						if(i+1 == value)
						{
							if(has_nth_child)results[i+1]=element;
							else results.push(element);
							break;
						}
					}
					
					else if(/([\+\-\d]+)n([\+\-\d]+)?/g.test(value))
					{
						var nValue = (/([\+\-\d]+)n([\+\-\d]+)?/g).exec(value);
						if(nValue.length > 1 && nValue[1])
						{
							var mod=0;
							if(nValue[1]=="" || nValue[1]=="+" || nValue[1]=="-")nValue[1]+=1;
							if(nValue[2]==undefined)nValue[2]=0;
							if(nValue.length > 2)mod = nValue[2]%nValue[1];
							if((i+1)%nValue[1] == mod)
							{
								if(nValue[1]>0&&i+1>=nValue[2] || nValue[1]<0&&i+1<=nValue[2])
								{
									if(has_nth_child)results[i+1]=element;
									else results.push(element);
								}
							}
							continue;
						}
						else if(nValue.length > 1 && nValue[1]==0)
						{
							if(i+1 == nValue[2])
							{
								if(has_nth_child)results[i+1]=element;
								else results.push(element);
							}
							continue;
						}
						continue;
					}
				}
			}
			return results;
		}
		else
		{
			var types = parserTypes,element,isLast=(eIndex == parserLength-1), results=isLast?[]:{};
			if(types[expression.type] == 1)
			{
				for(var i in elements)
				{
					element = elements[i];
					if(element.tagName == expression.value)
					{
						if(isLast)results.push(element);
						else results[i]=element;
					}
				}
			}
			else if(types[expression.type] == 2)
			{
				for(var i in elements)
				{
					element = elements[i];
					if(element.getAttribute(expression.name) == expression.value)
					{
						if(isLast)results.push(element);
						else results[i]=element;
					}
				}
			}
			else if(types[expression.type] == 3)
			{
				for(var i in elements)
				{
					element = elements[i];
					var value = expression.value;
					if(value == -1)
					{
						if(i == elements.length)
						{
							if(isLast)results.push(element);
							else results[i]=element;
							break;
						}
					}
					else if(/^([\+\-\d]+)$/g.test(value))
					{
						if(i == value)
						{
							if(isLast)results.push(element);
							else results[i]=element;
							break;
						}
					}
					
					else if(/([\+\-\d]+)n([\+\-\d]+)?/g.test(value))
					{
						var nValue = (/([\+\-\d]+)n([\+\-\d]+)?/g).exec(value);
						if(nValue.length > 1 && nValue[1])
						{
							var mod=0;
							if(nValue[1]=="" || nValue[1]=="+" || nValue[1]=="-")nValue[1]+=1;
							else nValue[1]-=0;
							if(nValue[2]==undefined)nValue[2]=0;
							else nValue[2]-=0;
							if(nValue.length > 2)mod = nValue[2]%nValue[1];
							if((i)%nValue[1] == mod)
							{
								if(nValue[1]>0&&i>=nValue[2])
								{
									if(isLast)results.push(element);
									else results[i]=element;
								}
								else if(nValue[1]<0&&i<=nValue[2])
								{
									if(isLast)results.push(element);
									else results[i]=element;
								}
							}
						}
						else if(nValue.length > 1 && nValue[1]==0)
						{
							if(i == nValue[2])
							{
								if(isLast)results.push(element);
								else results[i]=element;
							}
						}
					}
				}
			}
			return results;
		}
		
	}
	
	Sharp.match = function(element, content, eIndex)
	{
		var parsers = Sharp.parsers(content);
		for(var i=0,l = parsers.length;i<l;i++)
		{
			if(!Sharp.matchParser(element, parsers[i],eIndex))
			{
				return false;
			}
		}
		return true;
	}
	
	Sharp.matchParser = function(element, parser, eIndex)
	{
		for(var i=0,l = parser.length;i<l;i++)
		{
			if(!Sharp.matchExpression(element, parser[i],eIndex))
			{
				return false;
			}
		}
		return true;
	}
	Sharp.matchExpression = function(element, expression, eIndex)
	{
		var types = parserTypes;
		if(types[expression.type] == 1)
		{
			if(element.tagName == expression.value)return true;
		}
		else if(types[expression.type] == 2)
		{
			if(element.getAttribute(expression.name) == expression.value)return true;
			
			if(expression.name == "class")
			{
				if(new RegExp("(^| +)"+expression.value+"( +|$)","g").test(element.getAttribute("class")))return true;
				else return false;
			}
			else if(element.getAttribute(expression.name) == expression.value)
			{
				return true
			}
		}
		else if(types[expression.type] == 3)
		{
			var rgExps = [/-1/g,/^\d+$/g,/([\+\-]\d+)n([\+\-]\d+)?/g];
			var value = expression.value;
			if(value == -1)return true;//暂时未实现
			else if(rgExps[1].test(value))
			{
				if(eIndex== value)return true;
			}
			else if(rgExps[2].test(value))
			{
				var nValue = (/([\+\-]\d+)n([\+\-]\d+)?/g).exec(value);
				if(nValue.length > 1 && nValue[1])
				{
					var mod=0;
					if(nValue.length > 2 && nValue[2]!=undefined)
					{
						mod = nValue[2]%nValue[1];
					}
					if(eIndex%nValue[1] == mod)
					{
						if(nValue[1]>0&&eIndex>=nValue[2])
						{
							return true;
						}
						else if(nValue[1]<0&&eIndex<=nValue[2])
						{
							return true;
						}
					}
				}
				else if(nValue.length > 1 && nValue[1]==0)
				{
					if(eIndex== nValue[2])return true;
				}
				return false;
			}
		}
	}
	
	Sharp.parsers = function(content)
	{
		if(Sharp.isNull(content))
		{
			return [[]];
		}
		else if(Sharp.isString(content))
		{
			content = Sharp.trim(content);
			if(content == "")
			{
				return [[]];
			}
			var parsers = [];
			var results = content.match(parserExp);
			var parser = [];
			parsers.push(parser);;
			for(var i=0,l=results.length; i<l; i++)
			{
				var result = results[i];
				if(/^ +$/.test(result))
				{
					parser = [];
					parsers.push(parser);
					continue;
				}
				var expression = Sharp.expression(result);
				if(expression)
				{
					parser.push(expression);
				}
			}
			return parsers;
		}
		else
		{
			return content;
		}
	}
	
	Sharp.expression = function(content)
	{
		var parser = null;
		if(/^\w+$/.test(content))
		{
			parser = {type:"tagname",value:content.toUpperCase()};
		}
		else if(/^.\w+$/.test(content))
		{
			var values = content.match(/\w+/);
			if(values.length>0)
			{
				parser = {type:"attr",name:"class",value:values[0]};
			}
		}
		else if(/^\[([\'\"]\w+[\'\"]|\w+)=([\'\"]\w+[\'\"]|\w+)\]$/.test(content))
		{
			var values = content.match(/\w+/g);
			if(values.length>1)
			{
				parser = {type:"attr",name:values[0],value:values[1]};
			}
		}
		else if(/^:first-child$/.test(content))
		{
			parser = {type:"compute",value:"1"};
		}
		else if(/^:last-child$/.test(content))
		{
			parser = {type:"compute",value:"-1"};
		}
		else if(/^:nth-child\(([\w\+\-]+)\)$/.test(content))
		{
			var arr = /^:nth-child\(([\w\+\-]+)\)$/g.exec(content);
			var s = arr[1];
			if(s == "even")
			{
				arr[1] = "2n";
			}
			else if(s == "odd")
			{
				arr[1] = "2n+1";
			}
			parser = {type:"compute",value:arr[1]};
		}
		return parser;
	}
	
	//ajax
	
	Sharp.ajax = function(url, data, type, onSuccess, onError, onComplete){
		
		var type        = (type 		|| 'POST').toUpperCase(),
			url         = url           || '',
			data        = data          || '',
			onComplete  = onComplete    || function(){},
			onError     = onError       || function(){},
			onSuccess   = onSuccess     || function(){};
		if(!Sharp.isString(data))
		{
			data = Sharp.serialize(data);
		}
	
		if(typeof XMLHttpRequest === 'undefined'){
			XMLHttpRequest = function(){
				return new ActiveXObject(
					navigator.userAgent.indexOf('MSIE 5') >= 0 ?
						'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'
				);
			}
		}
		
		var request = new XMLHttpRequest();
		request.open(type,url,true);
		
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				if(httpSuccess(request)){
					onSuccess(httpData(request,type));
				}else{
					onError(request.status);
				}
				onComplete();
				request = null;
			}
		};
		request.send();
		var httpSuccess = function(r){
			try{
				return !r.status && location.protocol == "file:"
					|| (r.status >= 200 && r.status < 300)
					|| r.status == 304
					|| navigator.userAgent.indexOf('Safari') >= 0 && typeof r.status == 'undefined';
			}catch(e){}
			return false;
		}
	
		var httpData = function(r,type){
			var ct = r.getResponseHeader("content-type");
			if(ct.indexOf('xml') >= 0)
			{
				return r.responseXML;
			}
			else if(/^\s*(\{\s*"\w+"\s*:|\[\s*\{(\s*\}|\s*"\w+"\s*:))/g.test(r.responseText))
			{
				try
				{
					if(JSON && JSON.parse)
					{
						return JSON.parse(r.responseText);
					}
					else 
					{
						return eval(r.responseText);
					}
				}
				catch(e)
				{
					return r.responseText;
				}
				
			}
			return r.responseText;
		}
	}
	
	Sharp.serialize = function(a){
		var s = [];
		if(a.constructor == Array){
			for(var i = 0 ; i < a.length ; i++){
				s.push(a[i].name + '=' + encodeURIComponent(a[i].value));
			}
		}else{
			for(var j in a){
				s.push(j + '=' + encodeURIComponent(a[j]));
			}
		}
		return s.join('&');
	}
	//获取坐标
	Sharp.getAbsPos = function(sharp){
		var pTarget;
		if(Sharp.isSharp(sharp))pTarget = sharp.elements[0];
		else pTarget = sharp;
		
		if(!pTarget.getBoundingClientRect){
			var x_ = y_ = 0;
			while(pTarget.offsetParent){
					x_ += pTarget.offsetLeft;
					y_ += pTarget.offsetTop;
					pTarget = pTarget.offsetParent;
			}
			x_ += pTarget.offsetLeft;
			y_ += pTarget.offsetTop;
			return {x:x_,y:y_}
		}
		else{
			var body = document.compatMode == 'CSS1Compat' ?  document.body: document.documentElement;
			var rect = pTarget.getBoundingClientRect()
			return {x:rect.left + body.scrollLeft,y:rect.top + body.scrollTop};
		}
	}
	
	//曲线运动
	Sharp.sin = function(sharp, option1)
	{
		//sharp, time, prop, value,  callback, rate, originPoint, terminalPoint, decay, maxSumLimit
		var time = option1.time||0;
		var PI = Math.PI, sin = Math.sin, cos = Math.cos, round = Math.round;
		var propes=[], currValues = [],targetValues = [],sinSums = [],subtracts=[],originPointParams=[],
			terminalPointParams=[],rates=[],decays=[]
			speeds=[],lineSpeeds=[],sinPxSpeeds=[],sums=[], maxSumLimits=[],callbacks=[];
		var option,lastOption,originPoint,terminalPoint;
		for(var i=0,l=arguments.length-1; i<l; i++)
		{
			option = arguments[i+1];
			lastOption = arguments[i];
			if(option.prop)
			{
				propes.push(option.prop);
			}
			//alert(propes[i] + "  "+ sharp.style(propes[i]));
			currValues.push(sharp.style(propes[i])-0||0);
			
			if(option.value != undefined)
			{
				targetValues.push(option.value);
			}
			else
			{
				targetValues.push(targetValues[targetValues.length-1]);
			}
			if(option.callback)
			{
				callbacks.push(option.callback);
			}
			else
			{
				callbacks.push(null);
			}
			
			if(option.originPoint != undefined)
			{
				originPointParams.push(option.originPoint);
			}
			else
			{
				originPointParams.push(0.5);
			}
			
			if(option.terminalPoint != undefined)
			{
				terminalPointParams.push(option.terminalPoint);
			}
			else
			{
				terminalPointParams.push(-originPointParams[originPointParams.length-1]);
			}
			
			originPoint = originPointParams[i]*PI;
			
			terminalPoint = terminalPointParams[i]*PI;
			
			
			if(option.decay != undefined)
			{
				decays.push(option.decay);
			}
			else
			{
				decays.push(1);
			}
			
			if(option.rate != undefined)
			{
				rates.push(option.rate);
			}
			else
			{
				rates.push(1);
			}
			
			if(option.maxSumLimit != undefined)
			{
				maxSumLimits.push(option.maxSumLimit);
			}
			else
			{
				maxSumLimits.push(false);
			}
			
			sinSums.push(rates[i]? rates[i]*(Sharp.sinsumDecay(originPointParams[i], terminalPointParams[i], decays[i],maxSumLimits[i])):0);
			subtracts.push(targetValues[i] - currValues[i]);
			if(sinSums[i]+terminalPoint-originPoint)speeds.push(subtracts[i]/(sinSums[i]+terminalPoint-originPoint));
			else speeds.push(0);
			lineSpeeds.push((terminalPoint-originPoint)*speeds[i]/time);
			sinPxSpeeds.push((terminalPointParams[i]-originPointParams[i])/time);
		}
		var interval = time/50;
		var pxSpeed =  time/Math.abs(subtracts[0]);
		//if(interval > pxSpeed )interval = pxSpeed;
		if(time)
		{
			var executor = function(sharp, time, callbacks, propes, rates,currValues,lineSpeeds,speeds,originPointParams,terminalPointParams,sinPxSpeeds,decays,maxSumLimits)
			{
				var queue = Sharp.getQueue(sharp, propes[0]);
				//var isLocked = queue?queue.locked:false;
				//queue.locked = true;
				var clock;
				var startTime = new Date();
				var longer;
				var currTime;
				var lastTime;
				var accessFirst = true;
				var access;
				var sums=[];
				return function()
				{
					try
					{
						var obj = Sharp.queueFirst(sharp, propes[0]);
						clock = obj.object;
						if(obj.interval > startTime - obj.startTime && clock != queue.locked)
						{
							startTime = new Date();
							return;
						}
						var status = Sharp.stopCheckStatus(sharp, propes[0], clock);
						currTime = new Date();
						if(!status)
						{
							longer = currTime - startTime;
						}
						else if(status==1)
						{
							if(accessFirst)
							{
								longer = currTime - startTime;
								if(time-longer<=250)access=1;
								else 
								{
									access=(time-longer)/250;
								}
								accessFirst = false;
								
							}
							longer += access*(currTime - (lastTime||currTime));
						}
						else if(status==2)
						{
							for(var i=0,l=propes.length; i<l; i++)
							{
								if(callbacks[i])callbacks[i](2, sums[i],longer, sharp);
							}
							Sharp.queueShift(sharp, propes,clock);
							queue.locked = false;
							clearInterval(clock);
							return;
						}
						lastTime = currTime;
						if(longer < time)
						{
							for(var i=0,l=propes.length; i<l; i++)
							{
								if(rates[i])
								{
									sums[i] =currValues[i] +  lineSpeeds[i]*longer + speeds[i]*rates[i]*Sharp.sinsumDecay(originPointParams[i],  originPointParams[i]+sinPxSpeeds[i]*longer, decays[i],maxSumLimits[i]);
									//console.log(rates[i]+"  "+currValues[i]+"  "+lineSpeeds[i]+"  "+speeds[i]+"  "+originPointParams[i]+"  "+originPointParams[i]+"  "+sinPxSpeeds[i]+"  "+decays[i]+"  "+maxSumLimits[i]+"  ");
								}
								else
								{
									sums[i] =currValues[i] +  lineSpeeds[i]*longer;
								}
								
								sharp.style(propes[i],Math.abs(sums[i])<1?sums[i]:Math.floor(sums[i]));
								if(callbacks[i])callbacks[i]("process", sums[i],longer, sharp);
							}
						}
						else
						{
							for(var i=0,l=propes.length; i<l; i++)
							{
								sharp.style(propes[i], targetValues[i]);
								if(callbacks[i])callbacks[i]("end", sums[i], time, sharp);
							}
							Sharp.queueShift(sharp, propes,clock);
							queue.locked = false;
							clearInterval(clock);
						}
					}
					catch(e)
					{
						Sharp.queueShift(sharp, propes,clock);
						queue.locked = false;
						clearInterval(clock);
					}
				};
			}
			Sharp.queueInit(sharp, propes);
			//executor(sharp, time, callbacks, propes, rates,currValues,lineSpeeds,speeds,originPointParams,terminalPointParams,sinPxSpeeds,decays,maxSumLimits)();
			var clock = setInterval((executor)(sharp, time, callbacks, propes, rates,currValues,lineSpeeds,speeds,originPointParams,terminalPointParams,sinPxSpeeds,decays,maxSumLimits), interval);
			
			queue = Sharp.getQueue(sharp, propes[0]);
			if(!queue.locked)queue.locked=clock;
			Sharp.queuePush(sharp, propes, clock, time);
		}
		else
		{
			for(var i=0,l=propes.length; i<l; i++)
			{
				sharp.style(propes[i],targetValues[i]);
			}
		}
	}
	
	
	
	Sharp.sinsumDecay = function(originPoint, terminalPoint, decay, maxSum)
	{
		var minus = terminalPoint - originPoint,sum = 0;
		var PI = Math.PI, cos = Math.cos, ceil = Math.ceil, floor = Math.floor;
		if(minus>0)
		{
			for(var i=originPoint,temp,start,end,l=terminalPoint,count=0; i<l; i++,count++)
			{
				temp = floor(i);
				start = i;
				if(maxSum)
				{
					if(count==0 && temp+1 < terminalPoint && i+1< terminalPoint)
					{
						end = i+0.5;
					}
					else if(count==0)
					{
						end = originPoint + (terminalPoint-originPoint)/2;
					}
					else if(temp+1 < terminalPoint && i+1< terminalPoint)
					{
						start = i+ count - 0.5;
						end = i+ count + 0.5;
					}
					else
					{
						start = i+ count - 0.5;
						end = terminalPoint + count - 0.5;
					}
				}
				else if(temp+1 < terminalPoint && i+1< terminalPoint)
				{
					end = i+1;
				}
				else
				{
					end = terminalPoint;
				}
				
				if(count==0)
				{
					sum+= cos(start*PI) - cos(end*PI);
					
				}
				else if(count%2==1)
				{
					sum+= decay*(cos(start*PI) - cos(end*PI));
					if(decay != 1)decay *= 0.6 ;
				}
				else
				{
					sum+= decay*(cos(start*PI) - cos(end*PI));
				}
			}
		}
		else if(minus<0)
		{
			for(var i=originPoint,temp,start,end,l=terminalPoint,count=0; i>l; i--,count++)
			{
				temp = ceil(i);
				start = i;
				if(maxSum)
				{
					if(count==0 && temp-1 > terminalPoint && i-1> terminalPoint)
					{
						end = i-0.5;
					}
					else if(count==0)
					{
						end = originPoint + (terminalPoint-originPoint)/2;
					}
					else if(temp-1 > terminalPoint && i-1> terminalPoint)
					{
						start = i - count + 0.5;
						end = i - count - 0.5;
					}
					else
					{
						start = i - count - 0.5;
						end = terminalPoint - count - 0.5;
					}
				}
				else if(temp-1 > terminalPoint && i-1> terminalPoint)
				{
					end = i-1;
				}
				else
				{
					end = terminalPoint;
				}
				
				if(count==0)
				{
					sum+= cos(start*PI) - cos(end*PI);
					
				}
				else if(count%2==1)
				{
					sum+= decay*(cos(start*PI) - cos(end*PI));
					if(decay != 1)decay *= 0.6 ;
					
				}
				else
				{
					sum+= decay*(cos(start*PI) - cos(end*PI));
				}
			}
		}
		else
		{
			sum = end = start = 0;
		}
		return sum;
	}
	
	
	Sharp.queueInit = function(sharp, names)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)sharpData = sharp.elements[0].sharpData = {};
		
		if(!sharpData.queue)sharpData.queue={};
		var name;
		for(var j=0,k=names.length; j<k; j++)
		{
			name = names[j];
			if(!sharpData.queue[name])sharpData.queue[name] = [];
		}
	}
	
	Sharp.queuePush = function(sharp, names,  object, interval)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)sharpData = sharp.elements[0].sharpData = {};
		
		if(!sharpData.queue)sharpData.queue={};
		var name;
		for(var j=0,k=names.length; j<k; j++)
		{
			name = names[j];
			if(!sharpData.queue[name])sharpData.queue[name] = [];
			sharpData.queue[name].push({"object":object,"status":0,interval:interval,startTime:new Date()});
		}
	}
	
	
	Sharp.getQueue = function(sharp, name)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)return false;
		if(!sharpData.queue)return false;
		var values = sharpData.queue[name];
		if(values)return values;
		return null;
	}
	
	Sharp.isMoving = function(sharp, name)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)return false;
		if(!sharpData.queue)return false;
		var values = sharpData.queue[name];
		if(values)return values.length>0?true:false;
		return false;
	}
	
	Sharp.queueFirst = function(sharp, name)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)return false;
		//var time = new Date();
		var values = sharpData.queue[name];
		if(values && values.length>0)
		{
			/*if(values[0].interval < time - values[0].startTime)
			{
				clearInterval(values[0].object);
				values.shift();
				values.length?values.locked=values[0].object:values.locked=null;
				return Sharp.queueFirst(sharp, name);
			}*/
			return values[0];
		}
		return null;
	}
	
	Sharp.queueLast = function(sharp, name)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)return false;
		var values = sharpData.queue[name];
		if(values && values.length>0)
		{
			return values[values.length-1].object;
		}
		return null;
	}
	
	Sharp.queueShift = function(sharp, name,clock)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)return false;
		var names; 
		if(Sharp.isString(name))
		{
			names = name.split(",");
		}
		else
		{
			names = name;
		}
		var values;
		for(var i=0,l=names.length; i<l; i++)
		{
			values = sharpData.queue[names[i]];
			if(!values || !values[0])continue;
			if(values[0].object == clock)
			{
				values.shift();
				continue;
			}
			for(var j=0,k=values.length; j<k; j++)
			{
				if(values[j].object == clock)
				{
					values.splice(j,1);
					break;
				}
			}
		}
		return null;
	}
	
	Sharp.stop = function(sharp, flag)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)return false;
		if(!(sharpData.queue))return 0;
		var values;
		var status =!flag?1:2; 
		
		for(var prop in sharpData.queue)
		{
			values = sharpData.queue[prop];
			if(values)
			{
				for(var j=0,k=values.length; j<k; j++)
				{
					values[j].status = status;
				}
			}
		}
	}
	
	Sharp.stopCheckStatus = function(sharp,name,clock)
	{
		var sharpData = sharp.elements[0].sharpData;
		if(!sharpData)return false;
		var data = sharpData.queue;
		if(!data)return 0;
		var values = data[name];
		if(!values || values.length==0)return 0;
		if(values && values[0] && values[0].object == clock)
		{
			return values[0].status;
		}
		for(var i=0,l=values.length; i<l; i++)
		{
			if(values[i].object != clock)
			{
				values.shift();
				i--;
			}
			else
			{
				return 0;
			}
		}
		return 0;
	}
	
	Sharp.getEventX = function(event)
	{
		 return event.pageX || ((event.clientX || 0)  
					+ (document.documentElement.scrollLeft || document.body.scrollLeft));    
	}
	Sharp.getEventY = function(event)
	{
		 return event.pageY || ((event.clientY || 0)  
					+ (document.documentElement.scrollTop || document.body.scrollTop));  
	}
	
	//注册元素拖动
	Sharp.dragable = function(body, noSelected)
	{
		var body = body || Sharp(information.document.body);
		body.addEvent("mousedown",function(event){
			var element = event.toElement||event.target||event.srcElement;
			var parentElement = element;
			var selectedElement;
			if(!noSelected)
			{
				while(parentElement)
				{
					if(parentElement.getAttribute("selected"))
					{
						selectedElement = element;
						break;
					}
					else parentElement = parentElement.parentElement;
				}
				if(!selectedElement)
				{
					if(event.preventDefault)event.preventDefault();
					else if(event.returnValue)event.returnValue = false;
				}
			}
			
			if(element.getAttribute("dragable"))
			{
				if(event.preventDefault)event.preventDefault();
				else if(event.returnValue)event.returnValue = false;
				var eSharp = Sharp(element);
				document.body.dragObject = {x:getX(event),y:getY(event),element:element,startX:getX(event),startY:getY(event),screenX:event.screenX,screenY:event.screenY};
				if(element.dragstart)element.dragstart(event,document.body.dragObject);
			}
			else if(element.getAttribute("parentdragable"))
			{
				if(event.preventDefault)event.preventDefault();
				else if(event.returnValue)event.returnValue = false;
				while(element = element.parentElement)
				{
					if(element.getAttribute("dragable"))
					{
						document.body.dragObject = {x:getX(event),y:getY(event),element:element,startX:getX(event),startY:getY(event),screenX:event.screenX,screenY:event.screenY};
						if(element.dragstart)element.dragstart(event,document.body.dragObject);
						break;
					}
				}
			}
			else document.body.dragObject = null;
		});
		body.addEvent("mousemove",function(event){
			var dragObject = document.body.dragObject;
			
			if(dragObject)
			{
				if(!this.onselectstart)
				{
					document.body.onselectstart=function(){return false;};//ie拖动禁选择文本效果
				}
				var element = Sharp(dragObject.element);
				var top = element.style("top")||0;
				var left = element.style("left")||0;
				var x = getX(event);
				var y= getY(event);
				var screenX = event.screenX;
				var screenY = event.screenY;
				
				var toX = left- 0 +(screenX-dragObject.screenX);
				var toY = top-0 +(screenY-dragObject.screenY);
				if(dragObject.element.drag)
				{
					var toPos = dragObject.element.drag({x:toX,y:toY},{x:x,y:y,startX:dragObject.startX,startY:dragObject.startY},event,dragObject);
					
					if(toPos && dragObject.element)
					{
						element = Sharp(dragObject.element);
						if(Sharp.isBoolean(toPos))
						{
							element.top(toY).left(toX);
							dragObject.x = x;
							dragObject.y = y;
						}
						else
						{
							if(toPos.x != undefined)
							{
								element.left(toPos.x);
								dragObject.x = x;
								//dragObject.totalX+=x-dragObject.x;
							}
							if(toPos.y != undefined)
							{
								element.top(toPos.y);
								dragObject.y = y;
								//dragObject.totalY+=y-dragObject.y;
							}
						}
					}
				}
				else element.top(toY).left(toX);
				dragObject.x = x;
				dragObject.y = y;
				dragObject.screenX = screenX;
				dragObject.screenY = screenY;
			}
		});
		body.addEvent("mouseup",function(event){
			if(document.body.onselectstart)
			{
				document.body.onselectstart=function(){return true;};
			}
			if(!document.body.dragObject)return;
			var element = document.body.dragObject.element;
			if(element && element.dragend)element.dragend(event,document.body.dragObject);
			document.body.dragObject = null;
		});
		
		function getX(event)
		{
			 return event.pageX || ((event.clientX || 0)  
                        + (document.documentElement.scrollLeft || document.body.scrollLeft));    
		}
		function getY(event)
		{
			 return event.pageY || ((event.clientY || 0)  
                        + (document.documentElement.scrollTop || document.body.scrollTop));  
		}
	}
	
	//注册大小变换
	Sharp.zoomable = function(startcallback, callback, endcallback)
	{
		var body = Sharp(document.body);
		body.addEvent("mousedown",function(event){
			//if(event.preventDefault)event.preventDefault();
			//else if(event.returnValue)event.returnValue = false;
			var element = event.toElement||event.target||event.srcElement;
			
			if(element.getAttribute("zoomable"))
			{
				var directStr = element.getAttribute("direct"),directX,directY,index;
				if(directStr == "left")
				{
					directX = -1;
					directY = 0;
					index=0;
				}
				else if(directStr == "right")
				{
					directX = 1;
					directY = 0;
					index=1;
				}
				else if(directStr == "top")
				{
					directX = 0;
					directY = -1;
					index=2;
				}
				else if(directStr == "bottom")
				{
					directX = 0;
					directY = 1;
					index=3;
				}
				else if(directStr == "leftTop")
				{
					directX = -1;
					directY = -1;
					index=4;
				}
				else if(directStr == "leftBottom")
				{
					directX = -1;
					directY = 1;
					index=5;
				}
				else if(directStr == "rightTop")
				{
					directX = 1;
					directY = -1;
					index=6;
				}
				else if(directStr == "rightBottom")
				{
					directX = 1;
					directY = 1;
					index=7;
				}
				var parent = Sharp(element.parentElement);
				var children = parent.children(".border_zoomer");
				children.iter(function(e,index)
				{
					if(e==element)
					{
						children.elements.splice(index, 1);
						return true;
					}
				});
				children.hide();
				
				this.zoomObject = {x:getX(event),y:getY(event),directX:directX,directY:directY,parent:element.parentElement,zoomer:element,zoomerIndex:index,children:children};
				
				var zoomer = Sharp(element);
				this.initZoomWidth = zoomer.style("width") || element.offsetWidth;
				this.initZoomLeft = zoomer.style("left") || element.offsetLeft;
				this.initZoomHeight = zoomer.style("height") || element.offsetHeight;
				this.initZoomTop = zoomer.style("top") || element.offsetTop;
				var target = Sharp(this.zoomObject.parent);
				var position = target.getAbsPos();
				var borderLeftWidth = target.style("border-left-width"),borderTopWidth = target.style("border-top-width");
				this.zoomObject.borderLeftWidth = borderLeftWidth-0;
				this.zoomObject.borderTopWidth = borderTopWidth-0;
				this.zoomObject.zIndex = zoomer.style("z-index");
				if(information.system.ie)
				{
					zoomer.style("width", document.documentElement.scrollWidth);
					zoomer.style("height", document.documentElement.scrollHeight-1);
				}
				else if(information.system.firefox)
				{
					zoomer.style("width", document.documentElement.scrollWidth);
					zoomer.style("height", document.documentElement.scrollHeight);
				}
				else if(information.system.chrome)
				{
					zoomer.style("width", document.body.scrollWidth-4);
					zoomer.style("height",document.body.scrollHeight);
				}
				else
				{
					zoomer.style("width", document.documentElement.scrollWidth);
					zoomer.style("height", document.documentElement.scrollHeight);
				}
				zoomer.left( -position.x - borderLeftWidth);
				zoomer.top(-position.y - borderTopWidth);
				var parent = Sharp(element.parentElement);
				var option = parent.prop("zoomableOption");
				
				zoomer.style("z-index", option.zIndex || 9990);
				parent.style("overflow","visible");
				
				if(startcallback)startcallback(this.zoomObject);
				option.startFunc(this.zoomObject);
				
			}
			else this.zoomObject = null;
		});
		body.addEvent("mousemove",function(event){
			if(event.preventDefault)event.preventDefault();
			else if(event.returnValue)event.returnValue = false;
			var zoomObject = this.zoomObject;
			if(zoomObject)
			{
				var parent = Sharp(zoomObject.parent);
				var zoomer = Sharp(zoomObject.zoomer);
				var width = parent.style("width")||parent.prop("offsetWidth");
				var left = parent.style("left")||0;
				var height = parent.style("height")||parent.prop("offsetHeight");
				var top = parent.style("top")||0;
				var x = getX(event);
				var y= getY(event);
				var subX = x-zoomObject.x;
				var subY = y-zoomObject.y;
				var toWidth = width-0+zoomObject.directX*subX;
				var toHeight = height-0+zoomObject.directY*subY;
				var option = parent.elements[0].zoomableOption;
				if(zoomObject.directX)
				{
					if(option.maxWidth&&toWidth>option.maxWidth)subX=0
					if(option.minWidth&&toWidth<option.minWidth)subX=0
					toWidth = width-0+zoomObject.directX*subX;
				}
				if(zoomObject.directY)
				{
					if(option.maxHeight&&toHeight>option.maxHeight)subY=0
					if(option.minHeight&&toHeight<option.minHeight)subY=0
					toHeight = height-0+zoomObject.directY*subY;
				}
				zoomObject.x = x;
				zoomObject.y = y;
				zoomObject.toWidth = toWidth;
				zoomObject.toHeight = toHeight;
				parent.zoomable(false, zoomObject.zoomerIndex);
				if(callback)callback(zoomObject);
				var option = parent.prop("zoomableOption");
				option.zoomingFunc(this.zoomObject);
				
				if(zoomObject.directX)
				{
					parent.style("width",toWidth);
				}
				if(zoomObject.directY)
				{
					parent.style("height",toHeight);
				}
				if(zoomObject.directX==-1)parent.left(left-0+subX);
				if(zoomObject.directY==-1)parent.top(top-0+subY);
				
				var position = Sharp(zoomObject.parent).getAbsPos();
				zoomer.left( -position.x-zoomObject.borderLeftWidth);
				zoomer.top(-position.y-zoomObject.borderTopWidth);
			}
		});
		body.addEvent("mouseup",function(){
			if(this.zoomObject)
			{
				var zoomer = Sharp(this.zoomObject.zoomer);
				zoomer.style("width", this.initZoomWidth);
				zoomer.left( this.initZoomLeft);
				zoomer.style("height", this.initZoomHeight);
				zoomer.top(this.initZoomTop);
				zoomer.style("z-index", this.zoomObject.zIndex)
				this.zoomObject.children.show();
				var parent = Sharp(this.zoomObject.parent)
				parent.zoomable();
				var option = parent.prop("zoomableOption");
				parent.style("overflow",option.overflow);
				if(endcallback)endcallback(this.zoomObject);
				option.endFunc(this.zoomObject);
				this.zoomObject = null;
				
			}
		});
		
		function getX(event)
		{
			 return event.pageX || ((event.clientX || 0)  
						+ (document.documentElement.scrollLeft || document.body.scrollLeft));    
		}
		function getY(event)
		{
			 return event.pageY || ((event.clientY || 0)  
						+ (document.documentElement.scrollTop || document.body.scrollTop));  
		}
	}
	
	Sharp.scroller = function(target, option)
	{
		var scrollParent, innerContent = target.children(":first-child"), init=(arguments.length == 2);
		if(init)
		{
			scrollParent = Sharp('<div class="scroller"'+(option.zIndex?(' style="z-index:'+option.zIndex+';"'):'')+' contenteditable="false"><div class="scrollup"><div class="uparrow"></div></div><div class="scrollscale"><div class="scrollbar" dragable=dragable></div><div class="scrollbtn scrollanimate" dragable="true"></div></div><div class="scrolldown"><div class="downarrow"></div></div></div>').addTo(target);
			scrollParent.style("background-color", option.backgroundColor?option.backgroundColor:target.style("background-color")).style("border-color", target.style("background-color"));
			target.style("overflow","hidden");
			scrollParent.prop("dragoption",option);
			option.wheelAmount = option.wheelAmount?option.wheelAmount:100;
		}
		else
		{
			scrollParent = target.children(".scroller");
			if(option)scrollParent.prop("dragoption",option);
		}
		
		//target.prop("initPos",target.getAbsPos());
		var targetInitPos= target.getAbsPos();
		if(!scrollParent.size())return;
		var scrollParentInitPos = scrollParent.getAbsPos();
		var innerSharp = target.children();
		var scrollup = scrollParent.children(".scrollup");
		var scrolldown = scrollParent.children(".scrolldown");
		var outerHeight = target.height();
		var innerHeight = innerSharp.height();
		
		var scrollupHeight = scrollup.height();
		var scrolldownHeight = scrolldown.height();
		var option = scrollParent.prop("dragoption");
		var scrollScale = scrollParent.children(".scrollscale").height(outerHeight-scrollupHeight-scrolldownHeight-5);
		var scrollScaleHeight = scrollScale.height();
		var scrollbar = scrollScale.children(".scrollbar").height(scrollScaleHeight);
		var scrollbtn = scrollScale.children(".scrollbtn");
		var btnPosY = scrollbtn.getAbsPos().y;
		var minTop,maxTop,btnHeight = scrollbtn.height();
		
		function getY(event)
		{
			 return event.pageY || ((event.clientY || 0)  
						+ (document.documentElement.scrollTop || document.body.scrollTop));  
		}
		function onMouseWheel(ev)
		{
			var oEvent=ev||event;
			var amount = oEvent.detail?oEvent.detail:oEvent.wheelDelta;
			if(Math.abs(amount)<30)amount*=-40;
			if(amount<0)
			{
				dragAmountByContent(option.wheelAmount*amount/100)
			}
			else
			{
				dragAmountByContent(option.wheelAmount*amount/100)
			}
			
			if(oEvent.preventDefault)
			{
				oEvent.preventDefault();
			}
			else if(oEvent.returnValue)oEvent.returnValue = false;
			
			return false;
		}
		function dragAmountByBtn(amount)
		{
			minTop = scrollbar.getAbsPos().y; 
			maxTop = minTop + scrollbar.height();
			btnHeight = scrollbtn.height();
			scrollbtn.top(dragByBtn({x:0,y:scrollbtn.top()+amount,pageY:scrollbtn.getAbsPos().y}).y);
		}
		function dragByBtn(pos)
		{
			var value,pageY = pos.pageY||scrollbtn.getAbsPos().y;
			if(pageY + pos.y - scrollbtn.top() < minTop)
			{
				value = {y:scrollup.height(),x:0};
				pageY = minTop;
			}
			else if(pageY + btnHeight + pos.y - scrollbtn.top() > maxTop)
			{
				value = {y:maxTop-minTop-btnHeight+scrollup.height(),x:0};
				pageY = maxTop-btnHeight;
			}
			else
			{
				value = {y:pos.y,x:0};
				pageY += pos.y - scrollbtn.top();
			}
			var process;
			if(maxTop-minTop>0)process=(pageY-minTop)/(maxTop-minTop-btnHeight);
			else process =0;
			if(process>1) 
			{
				process = 1;
			}
			if(!option)
			{
				option={}
				scrollParent.prop("dragoption",option);
			}
			if(option) 
			{
				var scrollPx = (innerContent.height()-target.height())*process;
				innerContent.style("margin-top", -(scrollPx>=0?scrollPx:0));
				if(option.drag)option.drag(process);
			}
			return value;
		}
		
		function dragAmountByContent(amount,scrollbtnHeight)
		{
			outerHeight = target.height();
			innerHeight = innerSharp.height();
			if(outerHeight < innerHeight)
			{
				scrollParent.show();
				var innerPosY = innerContent.getAbsPos().y,outerPosY = target.getAbsPos().y;
				var process;
				var contentMinTop = outerPosY-innerHeight+outerHeight;
				var contentMaxTop = outerPosY;
				var marginTop;
				if(innerPosY+amount < contentMinTop)
				{
					marginTop=outerHeight-innerHeight;
					
				}
				else if(innerPosY + amount > contentMaxTop)
				{
					marginTop=0;
				}
				else
				{
					marginTop = innerContent.style("margin-top")+amount;
				}
				innerPosY += marginTop - innerContent.style("margin-top");
				innerContent.style("margin-top",marginTop);
				
				
				var barTopPosY = scrollbar.getAbsPos().y;
				minTop = barTopPosY;
				maxTop = barTopPosY + scrollbar.height();
				if(innerHeight - outerHeight>0)process= (outerPosY - innerPosY)/(innerHeight - outerHeight);
				else process =0;
				if(process>1)process=1;
				var scrollbtnTop = (maxTop-minTop-(arguments.length==2?scrollbtnHeight:scrollbtn.height()))*process+scrollup.height();
				scrollbtn.top(scrollbtnTop);
				if(option.drag)option.drag(process);
			}
			else
			{
				if(option) 
				{
					if(option.drag)option.drag(0);
				}
				innerContent.style("margin-top",0);
				scrollParent.hide();
			}
		}
		if(init)
		{
			scrollParent.height(outerHeight- scrollParent.style("border-top-width")- scrollParent.style("border-bottom-width")).top(targetInitPos.y-scrollParentInitPos.y);
			option.scrollParentInitPos = scrollParentInitPos;
			if(Sharp.isNumber(option.right)){scrollParent.style("right",option.right);}
			else scrollParent.left(target.width() - scrollParent.width() - scrollParent.style("border-left-width")- scrollParent.style("border-right-width"));
			scrollbtn.prop("dragstart",function()
			{
				if(option && option.dragstart) option.dragstart(scrollbtn);
				minTop = scrollbar.getAbsPos().y; 
				maxTop = minTop + scrollbar.height();
				btnHeight = scrollbtn.height();
				scrollbtn.removeClass("scrollanimate");
				innerContent.removeClass("scrollanimate");
				scrollParent.addClass("scroller_active");
			}).prop("drag",dragByBtn).prop("dragend",function(pos)
			{
				scrollParent.removeClass("scroller_active");
				scrollbtn.addClass("scrollanimate");
				innerContent.addClass("scrollanimate");
				if(option && option.dragend) option.dragend(scrollbtn);
			});
			scrollup.click(function()
			{
				dragAmountByContent(option&&option.stepAmount?option.stepAmount:10);
			});
			scrolldown.click(function()
			{
				dragAmountByContent(-(option&&option.stepAmount?option.stepAmount:10));
			});
			target.addEvent("DOMMouseScroll",onMouseWheel).addEvent("mousewheel",onMouseWheel);
			scrollbar.prop("dragstart",function(ev)
			{
				var ev = {pageY:ev.pageY,clientY:ev.clientY};
				var lastbtnY = scrollbtn.getAbsPos().y;
				var count =0;
				var longClickClock = this.longClickClock = setInterval(drag,400);
				drag();
				var self = this;
				function drag()
				{
					count++;
					if(count==2)
					{
						clearInterval(longClickClock);
						longClickClock = self.longClickClock = setInterval(drag,50);
					}
					var pageY = scrollbtn.getAbsPos().y;
					var eventY = getY(ev);
					btnHeight = scrollbtn.height();
					var amount = maxTop-minTop-btnHeight;
					if(eventY<pageY)
					{
						dragAmountByBtn(-btnHeight);
					}
					else if(eventY>pageY+btnHeight)
					{
						dragAmountByBtn(btnHeight);
					}
					else
					{
						clearInterval(longClickClock);
					}
					
				}
				
			}).prop("drag",function(pos,event)
			{
				return;
			}).prop("dragend",function(event)
			{
				clearInterval(this.longClickClock);
			});
		}
		else
		{
			var targetInitPos= target.getAbsPos();
			var scrollParentInitPos = scrollParent.getAbsPos();
			scrollParent.height(outerHeight- scrollParent.style("border-top-width")- scrollParent.style("border-bottom-width"));//.top(scrollParent.top()+targetInitPos.y-scrollParentInitPos.y);
			if(Sharp.isNumber(option.right)){scrollParent.style("right",option.right);}
			else scrollParent.left(target.width() - scrollParent.width() - scrollParent.style("border-left-width")- scrollParent.style("border-right-width"));
		}
		
		
		if(outerHeight < innerHeight)
		{
			scrollParent.show();
			var  btntoHeight = scrollScaleHeight*outerHeight/innerHeight;
			innerHeight = innerContent.height(),outerHeight = target.height();
			if(outerHeight<scrollup.height()+scrolldown.height()+scrollbtn.height()){scrollParent.hide();}
			else if(btntoHeight<scrollbtn.width()*5){btntoHeight = scrollbtn.width()*5;}
			scrollbtn.height(btntoHeight);
			if(option) 
			{
				
				if(!option)
				{
					option={}
					scrollParent.prop("dragoption" ,option);
				}
			}
			
			var e = arguments[3];
			var selectedElement = arguments[4];
			var upordownamount = arguments[5]||0;
			
			if(Sharp.isSharp(selectedElement))
			{
				var selectedElementY = selectedElement.getAbsPos().y;
				var selectedElementHeight = selectedElement.height();
				var outerPosY = target.getAbsPos().y;
				var outerMinTop = outerPosY;
				var outerMaxTop = outerPosY + outerHeight;
				if(selectedElementY-upordownamount<outerMinTop)
				{
					dragAmountByContent(outerMinTop - selectedElementY+upordownamount,btntoHeight);
				}
				else if(selectedElementY+selectedElementHeight+upordownamount>outerMaxTop)
				{
					dragAmountByContent(outerMaxTop - selectedElementY - selectedElementHeight-upordownamount,btntoHeight);
				}
				else
				{
					dragAmountByContent(upordownamount,btntoHeight);
				}
			}
			else if(e)
			{
				
				var eventY = getY(e);
				var outerPosY = target.getAbsPos().y;
				var outerMinTop = outerPosY;
				var outerMaxTop = outerPosY + outerHeight;
				if(Sharp.isNumber(selectedElement))
				{
					upordownamount = selectedElement;
				}
				else upordownamount = -outerHeight/4;
				
				if(eventY <outerMinTop)
				{
					dragAmountByContent(upordownamount, btntoHeight);
				}
				else if(eventY > outerMinTop + outerHeight+upordownamount)
				{
					dragAmountByContent(outerMinTop + outerHeight+upordownamount - eventY, btntoHeight);
				}
				else
				{
					upordownamount = 0;
				}
				
			}
			else dragAmountByContent(0,btntoHeight);
		}
		else
		{
			if(option) 
			{
				if(option.drag)option.drag(0);
			}
			innerContent.style("margin-top",0);
			scrollParent.hide();
		}
		
	}
	
	Sharp.groupDrag = function(target, option)
	{
		var targetPos = target.getAbsPos();
		var lockFlagX ={};
		if(!target.prop("groupDragOption"))
		{
			var defaultOption = 
			{
				minLimit:3,
				maxLimit:target.width()-6,
				dragZIndex:1,
				spaceSub:0,
				slideTime:100,
				drag:function(tab, pos, mousePos){},
				dragstart:function(tab, pos){},
				dragend:function(tab, pos){}
			}
			option = Sharp.extend(defaultOption, option);
			target.prop("groupDragOption", option);
			var targets = target.children().toSharps();
			var positions = order(targets, option);
			option.positions = positions;
			option.targets = targets;
			if(option.direct == "horizontal")
			{
				Sharp.iter(targets, function(item,index)
				{
					addItemDrags(item, option);
				})
			}
		}
		else
		{
			if(option.direct == "horizontal")
			{
				if(option)option = Sharp.extend(target.prop("groupDragOption"), option);
				target.prop("groupDragOption", option);
				var targets = option.targets;
				var positions = option.positions;
				var curTargets = target.children().toSharps();
				var delElement = option.delElement;
				if(delElement)Sharp.iter(targets, function(item, index)
				{
					if(item.elements[0] == delElement.elements[0])
					{
						targets.splice(index,1);
						positions.splice(index,1);
						return false;
					}
				});
				
				if(targets.length < curTargets.length)
				{
					var index = curTargets.length-1;
					var item = curTargets[index];
					targets.push(item);
					addItemDrags(item, option);
				}
				else if(targets.length > curTargets.length)
				{
					for(var i=0,l=targets.length; i<l;i++)
					{
						var targ = targets[i];
						for(var j=0,k=curTargets.length; j<k;j++)
						{
							if(targ == curTargets[j])break;
						}
						if(j ==k)
						{
							targets.splice(i,1);
						}
					}
				}
				option.positions = order(targets, option);
				//moveToPostion
				if(option.moveToPostion)
				{
					var targets = option.targets;
					var positions = option.positions;
					var curTargets = target.children().toSharps();
					var target = targets[targets.length-1];
					for(var i=positions.length-1; i>=0; i--)
					{
						var movePos = option.moveToPostion.x;
						var pos = positions[i];
						if(option.moveToPostion.x < positions[i] && i-1>=0)
						{
							target.left(positions[i-1]);
							Sharp.dragNearInOrder(target, targets, {posxs:option.positions,callback:function(current, next, index, nextIndex)
							{
								if(current && next)
								{
									if(next!=current && index != nextIndex && targets[index] && targets[nextIndex])
									{
										targets[index] = next;
										targets[nextIndex] = current;
									}
									next.sin({time:option.slideTime, prop:"left", value: option.positions[index],  callback:function(a,b,c)
									{
										if(a != "end")return;
									}})
								}
							}})
						}
					}
				}
				
			}
		}
		
		
		
		
		function order(targets, option)
		{
			var positions = [];
			if(option.direct == "horizontal")
			{
				Sharp.iter(targets, function(item,index)
				{
					var pos = index != 0? (option.space?option.space+option.spaceSub:item.width()+option.spaceSub)+positions[index-1]:(option.minLimit);
					positions.push(pos);
					item.left(pos);
				})
			}
			return positions;
		}
		
		function drag(target, pos, option)
		{
			var width = option.space?option.space:target.width();
			
			if(pos.x<option.minLimit)
			{
				return {x:option.minLimit};
			}
			else if(pos.x>option.maxLimit-width)
			{
				return {x:option.maxLimit-width};
			}
			return {x:pos.x};
		};
		
		function dragEnd(target, option, index)
		{
			if(index == undefined || index == null)
			{
				Sharp.iter(option.targets,function(item,i)
				{
					if(item == target)
					{
						index = i;
						return false;
					}
				});
			}
			var pos = option.positions[index];
			var lpos = target.left();
			if(pos != lpos)
			{
				target.sin({time:100, prop:"left", value: pos,  callback:function(a,b,c)
				{
					target.left(target.left()-1).left(target.left()+1);//去除chrome左边出现边框重影
				}})
			}
		};
		
		function addItemDrags(item, option)
		{
			item.prop("drag",function(pos, mousePos, event,dragObject)
			{
				if(option.mouseOutY && option.mouseOutOnY && Math.abs(mousePos.y-mousePos.startY)>option.mouseOutY)
				{
					option.mouseOutOnY = false;
					if(option.mouseOutYFunc)option.mouseOutYFunc(item, event, dragObject,option);
					return drag(item, pos, option);
				}
				if(option.mouseDelayX && Math.abs(mousePos.x-mousePos.startX)<option.mouseDelayX)return;
				else if(option.minLimit + targetPos.x - mousePos.x > option.mouseOutX || mousePos.x - option.maxLimit - targetPos.x > option.mouseOutX)
				{
					option.mouseOutOnX = false;
					if(option.mouseOutXFunc)option.mouseOutXFunc(item, event, dragObject,option);
					return drag(item, pos, option);
				}
				Sharp.dragNearInOrder(item, targets, {posxs:option.positions,callback:function(current, next, index, nextIndex)
				{
					if(!lockFlagX[index+"_"+nextIndex] || (new Date()-lockFlagX[index+"_"+nextIndex]>option.slideTime))lockFlagX[index+"_"+nextIndex]= new Date();
					else return;
					if(current && next)
					{
						if(next!=current && index != nextIndex && targets[index] && targets[nextIndex])
						{
							targets[index] = next;
							targets[nextIndex] = current;
						}
						next.sin({time:option.slideTime, prop:"left", value: option.positions[index],  callback:function(a,b,c)
						{
							if(a != "end")return;
							delete lockFlagX[index+"_"+nextIndex];
						}})
					}
				}})
				
				return drag(item, pos, option);
			}).prop("dragstart",function(pos)
			{
				option.mouseOutOnX = true;
				option.mouseOutOnY = true;
				item.style("z-index", option.dragZIndex);
			}).prop("dragend",function(pos)
			{
				item.style("z-index", "");
				dragEnd(item, option);
			});
		}
		
	}
	Sharp.dragNearInOrder = function(target, sources, option)
	{
		var defaultOption =
		{
		}
		option = Sharp.extend(defaultOption, option);
		
		var posxs = option.posxs;
		var posys = option.posys;
		if(posxs)
		{
			var index = option.index;
			if(index == undefined || index == null)
			{
				Sharp.iter(sources,function(item,i)
				{
					if(item == target)
					{
						index = i;
						return false;
					}
				});
			}
			var left = target.left();
			var width = (option.space?option.space:target.width());
			var tPozCenterX = left+width/2;
			if(tPozCenterX<posxs[index])
			{
				if(option.callback)option.callback(target, sources[index-1], index, index-1);
			}
			else if(tPozCenterX>posxs[index+1])
			{
				if(option.callback)option.callback(target, sources[index+1], index, index+1);
			}
		}
	}
	Sharp.dragNear = function(target, sources, option)
	{
		option = option||{};
		var defaultOption =
		{
			triggerScale:0.5,//0~1
			posSubMaxX:target.width(),//有效区域绝对位置差值x最大值限制
			posSubMinX:0,
			posSubMaxY:target.height(),//有效区域绝对位置差值y最大值限制
			posSubMinY:0
		}
		option = Sharp.extend(defaultOption, option);
		
		var poses = option.poses;
		if(poses)
		{
			var pos = target.getAbsPos();
			var width = target.width();
			var height = target.height();
			var x = pos.x;
			var y = pos.y;
			var triggerX = x+width*option.triggerScale;
			var triggerY = y+height*option.triggerScale;
			var sourcePos;
			var posSubXFlag = true;
			var posSubYFlag = true;
			for(var i=0, l=poses.length; i<l; i++)
			{
				sourcePos = poses[i];
				if(x>sourcePos.x && y>sourcePos.y && triggerX<sourcePos.x+sourcePos.width && triggerY<sourcePos.y+sourcePos.height)
				{
					if(option.posSubMaxX && (x - sourcePos.x) > option.posSubMaxX)
					{
						posSubXFlag = false;
					}
					if(option.posSubMaxY && (y - sourcePos.y) > option.posSubMaxY)
					{
						posSubYFlag = false;
					}
					if(posSubXFlag && posSubYFlag)
					{
						if(option.callback)option.callback(target, sources[i], {x:x,y:y,width:width,height:height}, poses[i], i,option);
					}
					posSubXFlag = true;
					posSubYFlag = true;
				}
			}
		}
	}
	Sharp.dragNearPoses = function(sources)
	{
		var poses=[];
		var source;
		var pos;
		for(var i=0, l=sources.length; i<l; i++)
		{
			source = sources[i];
			pos = source.getAbsPos();
			poses.push({x:pos.x,y:pos.y,width:source.width(),height:source.height()});
		}
		return poses;
	}
	Sharp.toSharps = function(target)
	{ 
		var targets = [];
		target.iter(function(item,index)
		{
			targets.push(target.get(index));
		})
		return targets;
	}
	Sharp.scrollerfixed = function(target,ev,selectedElement,upordownamount)
	{
		Sharp.scroller(target,null,false,ev,selectedElement,upordownamount);
	}
	
    Sharp.getInformation = function(value)
    {
        return information;
    }
    Sharp.getSystem = function(value)
    {
        return information.system;
    }
	Sharp.isSharp = function(value)
	{
		//if(value)return value instanceof Sharp;
		if(value && value.getSharp)return true;
		if(value)return value instanceof Sharp;
		return false;
	}
	Sharp.isString = function(value)
	{
		return typeof value == "string";
	}
	
	Sharp.isNumber = function(value)
	{
		return typeof value == "number";
	}
	
	Sharp.isArray = function(value)
	{
		 return Object.prototype.toString.call(value) === '[object Array]';
	}
	
	Sharp.isBoolean = function(value)
	{
		return typeof value == "boolean";
	}
	
	Sharp.isNull = function(value)
	{
		return value == null || value == undefined;
	}
	
	Sharp.isNotNull = function(value)
	{
		return value != null && value != undefined;
	}
	Sharp.trim = function(value)
	{
		if(Sharp.isString(value))
		{
			return value.match(/^\s*(.*?)\s*$/)[1];
		}
		return value;
	}
	
	return Sharp;
})();
}