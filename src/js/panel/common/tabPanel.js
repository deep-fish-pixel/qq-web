// JavaScript Document
WebChat.Base.Panel.extend('WebChat.Ext.Panel.TabPanel',
{
	init:function(context, container, pageSize, settings)
	{
		this._super("init", context, container);
		this.pageSize = pageSize;
		this.settings = settings||{};
		this.tabIndex =0;
		this.tabsData=[];
		
	},
	onInit:function(context, container)
	{
		var settings = this.settings;
		this.content = Sharp('<table class="panel_content tab_panel_content" border="0" cellpadding="0" cellspacing="0" '+(settings.parentdragable?'parentdragable="true"':'')+'><tr class="panel_content_tr_first" '+(settings.parentdragable?'parentdragable="true"':'')+'><td></td></tr><tr class="panel_content_tr_second" '+(settings.parentdragable?'parentdragable="true"':'')+'><td class="panel_content_tr_second_td" '+(settings.parentdragable?'parentdragable="true"':'')+'></td></tr></table>').addTo(context);
        this.tabParent = Sharp('<div class="panel_content_tabs" '+(settings.parentdragable?'parentdragable="true"':'')+'></div>').addTo(this.content.find(".panel_content_tr_first td"));
		this.content = this.tabContents = Sharp('<div class="panel_content_tab_contents" '+(settings.parentdragable?'parentdragable="true"':'')+'></div>').addTo(this.content.find(".panel_content_tr_second td"));
	},
	add:function(tabName, tabPic, tabSelectedPic, titleName, createTabFunc, selectedTabFunc, params, tabIndex)
	{
		if(this.tabsData.length==this.pageSize)return false;
		if(tabSelectedPic == undefined|| tabSelectedPic.indexOf(".")==-1)
		{
			tabIndex = params;
			params = selectedTabFunc;
			selectedTabFunc = createTabFunc;
			createTabFunc = titleName;
			titleName = tabSelectedPic;
			tabSelectedPic = tabPic;
		}
		var tabIndex = tabIndex||this.tabsData.length;
		this.tabsData.push({tabName:tabName,tabPic:tabPic,tabSelectedPic:tabSelectedPic,tabSelectedClass:(params?params.tabSelectedClass:""),titleName:titleName,selectedTabFunc:selectedTabFunc});
		this.createTabFunc = createTabFunc;
		if(createTabFunc)
		{
			var tabLi = this.createTabFunc(this.tabParent, tabName, tabPic, titleName,this.tabsData[tabIndex],tabIndex);
			tabLi.index = tabIndex;
			this.tabsData[this.tabsData.length-1].element = tabLi.addEvent("mousedown",this.callback("tabClick", tabLi))
			if(!this.settings.noSetWidth)tabLi.width(this.getTabWidth(1));
		}
		else
		{
			var tabLi = Sharp('<div class="tab_content'+(this.tabsData[tabIndex].tabSelectedClass?" "+this.tabsData[tabIndex].tabSelectedClass:"")+'"'+(titleName?' title="'+titleName+'"':'')
			+(this.settings.noSetWidth?"":' style="width:'+this.getTabWidth(1)+'">')+'<img class="tab_pic" src="'+ tabPic +'"/>'
					+'<div class="tab_name">'+(tabName?tabName:'')+'</div></div>').addTo(this.tabParent);	
			
			tabLi.index = tabIndex;
			this.tabsData[this.tabsData.length-1].element=tabLi;	
			tabLi.addEvent("mousedown",this.callback("tabClick", tabLi));
		}
		this.resizeTabWidth();
		return this;
	},
	tabClick:function(tab, event)
	{
		if(event)
		{
			var element = Sharp(event.srcElement||event.target);
			if(element.attr("class").indexOf("delete") != -1)return;
		}
		var index;
		if(Sharp.isNumber(tab)) index = tab;
		else if(Sharp.isSharp(tab))
		{
			var tabsData = this.tabsData;
			for(var i=0; i<tabsData.length; i++)
			{
				if(tabsData[i].element.elements[0] == tab.elements[0])
				{
					index = i;
					break;
				}
			}
		}
		
		if(this.tabIndex>=0 && this.tabIndex<this.tabsData.length)
		{
			var data = this.tabsData[this.tabIndex];
			if(data.tabSelectedClass)data.element.removeClass(data.tabSelectedClass);
			if(this.settings.selectedZIndex)
			{
				data.element.style("z-index",this.settings.selectedZIndex-1);
				this.units[this.tabIndex].context.style("z-index",this.settings.selectedZIndex-2);
			}
			
		}
		if(index>=0 && index<this.tabsData.length)
		{
			this.tabIndex = index;
			var currentTabData = this.tabsData[index];
			if(currentTabData.tabSelectedClass)currentTabData.element.addClass(currentTabData.tabSelectedClass);
			if(this.settings.selectedZIndex)
			{
				currentTabData.element.style("z-index",this.settings.selectedZIndex);
				this.units[this.tabIndex].context.style("z-index",this.settings.selectedZIndex-1);
			}
			
			if(currentTabData.selectedTabFunc)currentTabData.selectedTabFunc(currentTabData, this.units[this.tabIndex],this.tabIndex);
		}
		
	},
	getTabParent:function()
	{
		return this.tabParent;
	},
	getSelectedIndex:function()
	{
		return this.tabIndex;
	},
	isFull:function()
	{
		return this.tabsData.length >= this.pageSize
	},
	tabSelected:function(index)
	{
		
		if(this.tabsData[index] && this.tabsData[index].element)
		{
			//this.tabsData[index].element.fire("mousedown");
			this.tabClick(index);
		}
		else if(index >= this.tabsData.length)
		{
			this.tabClick(this.tabsData.length-1);
		}
		else if(index < 0)
		{
			this.tabClick(0);
		}
	},
	getTabsData:function()
	{
		return this.tabsData;
	},
	getContentsData:function()
	{
		return this.units;
	},
	getTabData:function(index)
	{
		return this.tabsData[index];
	},
	getTabDataByTab:function(tabElement)
	{
		var tabElements = this.tabParent.children();
		var index = -1;
		tabElements.iter(function(item, i)
		{
			if(item == tabElement.elements[0])
			{
				index = i;
			}
		});
		if(index != -1)return this.tabsData[index];
		return null;
	},
	getTabWidth:function(type)
	{
		if(type==1)
		{
			return (100/this.pageSize)+"%"
		}
	},
	resizeTabWidth:function()
	{
		if(!this.settings.noSetWidth)this.tabParent.children().width(this.getTabWidth(1));
	}
});