//jQuery.Class
// It provides class level inheritance and callbacks.
// @author:mawei
// @date:2012/06/22
(function(Sharp)
{
	// subClass can invoke it's superClass.Following by _prototype(prototype chain),
	// it can invoke superClass or super-super-Class's any method, and superClass
	// can invoke super-super-Class also;
	var _super = function(mName)
	{
		var _methodFlag = this._methodFlag;
		if(!this._methodFlag)this._methodFlag=[{method:mName,temp:null}];
		else if(this._methodFlag[this._methodFlag.length-1].method != mName)this._methodFlag.push({method:mName,temp:this._methodFlag[this._methodFlag.length-1].temp});
		var lastIndex = this._methodFlag.length-1;
		var _prototype = this._methodFlag[lastIndex].temp || this._prototype;
		var args = Array.prototype.slice.call(arguments, 1);
		
		var ret;
		while(_prototype)
		{
			var method = _prototype[mName];
			if(method)
			{
				if(this._methodFlag[lastIndex].temp)
				{
					_prototype = _prototype._prototype;
					this._methodFlag[lastIndex].temp = false;
					continue;
				}
				if((!this._methodFlag[lastIndex].invoke && this[mName] == method) || this._methodFlag[lastIndex].invoke == method)
				{
					_prototype = _prototype._prototype;
					continue;
				}
				this._methodFlag[lastIndex].temp = _prototype;
				this._methodFlag[lastIndex].invoke = method;
				ret = method.apply(this, args);
				_prototype = null;
			}
			else _prototype = _prototype._prototype;
		}
		if(lastIndex == 0)_methodFlag == undefined ? delete this._methodFlag : this._methodFlag = _methodFlag;
		else this._methodFlag.pop();
		return ret;
	}
	// this is used in ajax callback or setTimeout and so on
	var _callback = function(methodName)
	{
		var args = Array.prototype.slice.call(arguments,1);
		return (function(object,methodName,params)
		{
			return function ()
			{
				var newParam = [].concat(params);
				Sharp.iter(arguments, function(item)
				{
					newParam.push(item);
				});
				return object[methodName].apply(object,newParam);
			}
		})(this,methodName,args)
	}

    var _create = function(className,value)
    {
         if(typeof className == "string")
         {
             var names = className.split(".");
             var context = window;
             for(var i= 0,l=names.length;i<l;i++)
             {
                  if(context)
                  {
                       if(!context[names[i]] && i != l-1)
                       {
                           context = context[names[i]] = {};
                       }
                       else if( i == l-1)
                       {
                           return context[names[i]] = value;
                       }
                       else if(context[names[i]])
                       {
                           context = context[names[i]];
                       }
                  }
             }
         }
    }
	
	var instanceOf = function(targetClass)
	{
		if(Sharp.isString(targetClass))
		{
			var _prototype = this;
			var className = this.getClassName();
			while(_prototype)
			{
				if(targetClass == className)
				{
					return true;
				}
				else
				{
					_prototype = _prototype._prototype;
					if(_prototype && _prototype.getClassName)className = _prototype.getClassName();
				}
			}
		}
		else
		{
			var _prototype = this;
			var classTemp = _prototype.clazz;
			while(_prototype)
			{
				if(targetClass == classTemp)
				{
					return true;
				}
				else
				{
					_prototype = _prototype._prototype;
					if(_prototype && _prototype.clazz)classTemp = _prototype.clazz;
				}
			}
		}
		return false;
	}
	
	
	
	Sharp.Class = function()
	{
		//initialize method
		if(this.init)this.init.apply(this, arguments);
		if(this.onInit)this.onInit.apply(this, arguments);
	}
	Sharp.extend(Sharp.Class, {
		extend: function(className, classOption, objectOption)
		{
			/*var subClass = window[className] = function()
			{
				if(this.init)this.init.apply(this, arguments);
			};*/
			var _shutInit = false;
			
            var subClass = _create(className,function()
            {
				if(!_shutInit)
				{
					if(this.init)this.init.apply(this, arguments);
					if(this.onInit)this.onInit.apply(this, arguments);
				}
            })
			Sharp.extend(subClass, Sharp.Class);
			this._shutInit();
			var prototype = subClass.prototype = new this;
			this._shutInit();
			if(arguments.length <= 2)
			{
				var objectOption = classOption || {};
				var classOption = {};
			}
			for(var property in classOption)
			{
				if(':extend:'.indexOf(':' + property + ':') == -1)
				{
					subClass[property] = classOption[property];
				}
			}
			subClass['_shutInit']=function(){_shutInit=!_shutInit};
			for(var property in objectOption)
			{
				if(':_super:callback:_prototype:_shutInit:getClassName:instanceOf:clazz'.indexOf(':' + property + ':') == -1)
				{
					prototype[property] = objectOption[property];
				}
			}
			var getClassName = function()
			{
				return this.clazz.className;
			}
			Sharp.extend(prototype,
			{
				_super:_super,
				callback:_callback,
				getClassName:getClassName,
				instanceOf:instanceOf,
				clazz:subClass
			});
			prototype.constructor = subClass;
			subClass.className = className;
			prototype._prototype = this.prototype;
		},
		_shutInit:function(){}
	});
	
})(Sharp);