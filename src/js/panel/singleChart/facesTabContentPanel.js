WebChat.Base.Panel.extend('WebChat.Ext.Panel.FacesTabContentPanel',
{
	defaultFacesData:
		{
			colNum:16,
			rowNum:14,
			title:"默认",
			pics:[{show:"../css/pic/Data/Face/apng/0.png",focus:"../css/pic/Data/Face/0.gif",title:"惊讶/jy"},
			{show:"../css/pic/Data/Face/apng/1.png",focus:"../css/pic/Data/Face/1.gif",title:"撇嘴/pz"},
			{show:"../css/pic/Data/Face/apng/2.png",focus:"../css/pic/Data/Face/2.gif",title:"色/se"},
			{show:"../css/pic/Data/Face/apng/3.png",focus:"../css/pic/Data/Face/3.gif",title:"发呆/fd"},
			{show:"../css/pic/Data/Face/apng/4.png",focus:"../css/pic/Data/Face/4.gif",title:"得意/dy"},
			{show:"../css/pic/Data/Face/apng/5.png",focus:"../css/pic/Data/Face/5.gif",title:"流泪/ll"},
			{show:"../css/pic/Data/Face/apng/6.png",focus:"../css/pic/Data/Face/6.gif",title:"害羞/hx"},
			{show:"../css/pic/Data/Face/apng/7.png",focus:"../css/pic/Data/Face/7.gif",title:"闭嘴/bz"},
			{show:"../css/pic/Data/Face/apng/8.png",focus:"../css/pic/Data/Face/8.gif",title:"睡/shui"},
			{show:"../css/pic/Data/Face/apng/9.png",focus:"../css/pic/Data/Face/9.gif",title:"大哭/dk"},
			{show:"../css/pic/Data/Face/apng/10.png",focus:"../css/pic/Data/Face/10.gif",title:"尴尬/gg"},
			{show:"../css/pic/Data/Face/apng/11.png",focus:"../css/pic/Data/Face/11.gif",title:"发怒/fn"},
			{show:"../css/pic/Data/Face/apng/12.png",focus:"../css/pic/Data/Face/12.gif",title:"调皮/tp"},
			{show:"../css/pic/Data/Face/apng/13.png",focus:"../css/pic/Data/Face/13.gif",title:"呲牙/zy"},
			{show:"../css/pic/Data/Face/apng/14.png",focus:"../css/pic/Data/Face/14.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/15.png",focus:"../css/pic/Data/Face/15.gif",title:"难过/ng"},
			{show:"../css/pic/Data/Face/apng/16.png",focus:"../css/pic/Data/Face/16.gif",title:"酷/kuk"},
			{show:"../css/pic/Data/Face/apng/17.png",focus:"../css/pic/Data/Face/17.gif",title:"冷汗/lengh"},
			{show:"../css/pic/Data/Face/apng/18.png",focus:"../css/pic/Data/Face/18.gif",title:"抓狂/zk"},
			{show:"../css/pic/Data/Face/apng/19.png",focus:"../css/pic/Data/Face/19.gif",title:"吐/wx"},
			{show:"../css/pic/Data/Face/apng/20.png",focus:"../css/pic/Data/Face/20.gif",title:"偷笑/wx"},
			{show:"../css/pic/Data/Face/apng/21.png",focus:"../css/pic/Data/Face/21.gif",title:"可爱/wx"},
			{show:"../css/pic/Data/Face/apng/22.png",focus:"../css/pic/Data/Face/22.gif",title:"白眼/wx"},
			{show:"../css/pic/Data/Face/apng/23.png",focus:"../css/pic/Data/Face/23.gif",title:"傲慢/wx"},
			{show:"../css/pic/Data/Face/apng/24.png",focus:"../css/pic/Data/Face/24.gif",title:"饥饿/wx"},
			{show:"../css/pic/Data/Face/apng/25.png",focus:"../css/pic/Data/Face/25.gif",title:"困/wx"},
			{show:"../css/pic/Data/Face/apng/26.png",focus:"../css/pic/Data/Face/26.gif",title:"惊恐/wx"},
			{show:"../css/pic/Data/Face/apng/27.png",focus:"../css/pic/Data/Face/27.gif",title:"流汗/wx"},
			{show:"../css/pic/Data/Face/apng/28.png",focus:"../css/pic/Data/Face/28.gif",title:"憨笑/wx"},
			{show:"../css/pic/Data/Face/apng/29.png",focus:"../css/pic/Data/Face/29.gif",title:"大兵/wx"},
			{show:"../css/pic/Data/Face/apng/30.png",focus:"../css/pic/Data/Face/30.gif",title:"奋斗/wx"},
			{show:"../css/pic/Data/Face/apng/31.png",focus:"../css/pic/Data/Face/31.gif",title:"咒骂/wx"},
			{show:"../css/pic/Data/Face/apng/32.png",focus:"../css/pic/Data/Face/32.gif",title:"疑问/wx"},
			{show:"../css/pic/Data/Face/apng/33.png",focus:"../css/pic/Data/Face/33.gif",title:"嘘../wx"},
			{show:"../css/pic/Data/Face/apng/34.png",focus:"../css/pic/Data/Face/34.gif",title:"晕/wx"},
			{show:"../css/pic/Data/Face/apng/35.png",focus:"../css/pic/Data/Face/35.gif",title:"折磨/wx"},
			{show:"../css/pic/Data/Face/apng/36.png",focus:"../css/pic/Data/Face/36.gif",title:"衰/shuai"},
			{show:"../css/pic/Data/Face/apng/37.png",focus:"../css/pic/Data/Face/37.gif",title:"骷髅/wx"},
			{show:"../css/pic/Data/Face/apng/38.png",focus:"../css/pic/Data/Face/38.gif",title:"敲打/wx"},
			{show:"../css/pic/Data/Face/apng/39.png",focus:"../css/pic/Data/Face/39.gif",title:"再见/wx"},
			{show:"../css/pic/Data/Face/apng/40.png",focus:"../css/pic/Data/Face/40.gif",title:"擦汗/wx"},
			{show:"../css/pic/Data/Face/apng/41.png",focus:"../css/pic/Data/Face/41.gif",title:"抠鼻/wx"},
			{show:"../css/pic/Data/Face/apng/42.png",focus:"../css/pic/Data/Face/42.gif",title:"鼓掌/wx"},
			{show:"../css/pic/Data/Face/apng/43.png",focus:"../css/pic/Data/Face/43.gif",title:"丑大了/wx"},
			{show:"../css/pic/Data/Face/apng/44.png",focus:"../css/pic/Data/Face/44.gif",title:"坏笑/wx"},
			{show:"../css/pic/Data/Face/apng/45.png",focus:"../css/pic/Data/Face/45.gif",title:"左哼哼/wx"},
			{show:"../css/pic/Data/Face/apng/46.png",focus:"../css/pic/Data/Face/46.gif",title:"右哼哼/wx"},
			{show:"../css/pic/Data/Face/apng/47.png",focus:"../css/pic/Data/Face/47.gif",title:"哈欠/wx"},
			{show:"../css/pic/Data/Face/apng/48.png",focus:"../css/pic/Data/Face/48.gif",title:"鄙视/wx"},
			{show:"../css/pic/Data/Face/apng/49.png",focus:"../css/pic/Data/Face/49.gif",title:"委屈/wx"},
			{show:"../css/pic/Data/Face/apng/50.png",focus:"../css/pic/Data/Face/50.gif",title:"快哭了/wx"},
			{show:"../css/pic/Data/Face/apng/51.png",focus:"../css/pic/Data/Face/51.gif",title:"阴险/wx"},
			{show:"../css/pic/Data/Face/apng/52.png",focus:"../css/pic/Data/Face/52.gif",title:"亲亲/wx"},
			{show:"../css/pic/Data/Face/apng/53.png",focus:"../css/pic/Data/Face/53.gif",title:"吓/wx"},
			{show:"../css/pic/Data/Face/apng/54.png",focus:"../css/pic/Data/Face/54.gif",title:"可怜/wx"},
			{show:"../css/pic/Data/Face/apng/55.png",focus:"../css/pic/Data/Face/55.gif",title:"菜刀/wx"},
			{show:"../css/pic/Data/Face/apng/56.png",focus:"../css/pic/Data/Face/56.gif",title:"西瓜/wx"},
			{show:"../css/pic/Data/Face/apng/57.png",focus:"../css/pic/Data/Face/57.gif",title:"啤酒/wx"},
			{show:"../css/pic/Data/Face/apng/58.png",focus:"../css/pic/Data/Face/58.gif",title:"篮球/wx"},
			{show:"../css/pic/Data/Face/apng/59.png",focus:"../css/pic/Data/Face/59.gif",title:"乒乓/wx"},
			{show:"../css/pic/Data/Face/apng/60.png",focus:"../css/pic/Data/Face/60.gif",title:"咖啡/wx"},
			{show:"../css/pic/Data/Face/apng/61.png",focus:"../css/pic/Data/Face/61.gif",title:"饭/wx"},
			{show:"../css/pic/Data/Face/apng/62.png",focus:"../css/pic/Data/Face/62.gif",title:"猪头/wx"},
			{show:"../css/pic/Data/Face/apng/63.png",focus:"../css/pic/Data/Face/63.gif",title:"玫瑰/wx"},
			{show:"../css/pic/Data/Face/apng/64.png",focus:"../css/pic/Data/Face/64.gif",title:"凋谢/wx"},
			{show:"../css/pic/Data/Face/apng/65.png",focus:"../css/pic/Data/Face/65.gif",title:"示爱/wx"},
			{show:"../css/pic/Data/Face/apng/66.png",focus:"../css/pic/Data/Face/66.gif",title:"爱心/wx"},
			{show:"../css/pic/Data/Face/apng/67.png",focus:"../css/pic/Data/Face/67.gif",title:"心碎/wx"},
			{show:"../css/pic/Data/Face/apng/68.png",focus:"../css/pic/Data/Face/68.gif",title:"蛋糕/wx"},
			{show:"../css/pic/Data/Face/apng/69.png",focus:"../css/pic/Data/Face/69.gif",title:"闪电/wx"},
			{show:"../css/pic/Data/Face/apng/70.png",focus:"../css/pic/Data/Face/70.gif",title:"炸弹/wx"},
			{show:"../css/pic/Data/Face/apng/71.png",focus:"../css/pic/Data/Face/71.gif",title:"刀/wx"},
			{show:"../css/pic/Data/Face/apng/72.png",focus:"../css/pic/Data/Face/72.gif",title:"足球/wx"},
			{show:"../css/pic/Data/Face/apng/73.png",focus:"../css/pic/Data/Face/73.gif",title:"瓢虫/wx"},
			{show:"../css/pic/Data/Face/apng/74.png",focus:"../css/pic/Data/Face/74.gif",title:"便便/wx"},
			{show:"../css/pic/Data/Face/apng/75.png",focus:"../css/pic/Data/Face/75.gif",title:"月亮/wx"},
			{show:"../css/pic/Data/Face/apng/76.png",focus:"../css/pic/Data/Face/76.gif",title:"太阳/wx"},
			{show:"../css/pic/Data/Face/apng/77.png",focus:"../css/pic/Data/Face/77.gif",title:"礼物/wx"},
			{show:"../css/pic/Data/Face/apng/78.png",focus:"../css/pic/Data/Face/78.gif",title:"拥抱/wx"},
			{show:"../css/pic/Data/Face/apng/79.png",focus:"../css/pic/Data/Face/79.gif",title:"强/wx"},
			{show:"../css/pic/Data/Face/apng/80.png",focus:"../css/pic/Data/Face/80.gif",title:"弱/wx"},
			{show:"../css/pic/Data/Face/apng/81.png",focus:"../css/pic/Data/Face/81.gif",title:"握手/wx"},
			{show:"../css/pic/Data/Face/apng/82.png",focus:"../css/pic/Data/Face/82.gif",title:"胜利/wx"},
			{show:"../css/pic/Data/Face/apng/83.png",focus:"../css/pic/Data/Face/83.gif",title:"抱拳/wx"},
			{show:"../css/pic/Data/Face/apng/84.png",focus:"../css/pic/Data/Face/84.gif",title:"勾引/wx"},
			{show:"../css/pic/Data/Face/apng/85.png",focus:"../css/pic/Data/Face/85.gif",title:"拳头/wx"},
			{show:"../css/pic/Data/Face/apng/86.png",focus:"../css/pic/Data/Face/86.gif",title:"差劲/wx"},
			{show:"../css/pic/Data/Face/apng/87.png",focus:"../css/pic/Data/Face/87.gif",title:"爱你/wx"},
			{show:"../css/pic/Data/Face/apng/88.png",focus:"../css/pic/Data/Face/88.gif",title:"NO/wx"},
			{show:"../css/pic/Data/Face/apng/89.png",focus:"../css/pic/Data/Face/89.gif",title:"OK/wx"},
			{show:"../css/pic/Data/Face/apng/90.png",focus:"../css/pic/Data/Face/90.gif",title:"爱情/wx"},
			{show:"../css/pic/Data/Face/apng/91.png",focus:"../css/pic/Data/Face/91.gif",title:"飞吻/wx"},
			{show:"../css/pic/Data/Face/apng/92.png",focus:"../css/pic/Data/Face/92.gif",title:"跳跳/wx"},
			{show:"../css/pic/Data/Face/apng/93.png",focus:"../css/pic/Data/Face/93.gif",title:"发抖/wx"},
			{show:"../css/pic/Data/Face/apng/94.png",focus:"../css/pic/Data/Face/94.gif",title:"窝火/wx"},
			{show:"../css/pic/Data/Face/apng/95.png",focus:"../css/pic/Data/Face/95.gif",title:"转圈/wx"},
			{show:"../css/pic/Data/Face/apng/96.png",focus:"../css/pic/Data/Face/96.gif",title:"磕头/wx"},
			{show:"../css/pic/Data/Face/apng/97.png",focus:"../css/pic/Data/Face/97.gif",title:"回头/wx"},
			{show:"../css/pic/Data/Face/apng/98.png",focus:"../css/pic/Data/Face/98.gif",title:"跳绳/wx"},
			{show:"../css/pic/Data/Face/apng/99.png",focus:"../css/pic/Data/Face/99.gif",title:"挥手/wx"},
			{show:"../css/pic/Data/Face/apng/100.png",focus:"../css/pic/Data/Face/100.gif",title:"激动/wx"},
			{show:"../css/pic/Data/Face/apng/101.png",focus:"../css/pic/Data/Face/101.gif",title:"街舞/wx"},
			{show:"../css/pic/Data/Face/apng/102.png",focus:"../css/pic/Data/Face/102.gif",title:"献吻/wx"},
			{show:"../css/pic/Data/Face/apng/103.png",focus:"../css/pic/Data/Face/103.gif",title:"左太极/wx"},
			{show:"../css/pic/Data/Face/apng/104.png",focus:"../css/pic/Data/Face/104.gif",title:"右太极/wx"},
			{show:"../css/pic/Data/Face/apng/105.png",focus:"../css/pic/Data/Face/105.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/106.png",focus:"../css/pic/Data/Face/106.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/107.png",focus:"../css/pic/Data/Face/107.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/108.png",focus:"../css/pic/Data/Face/108.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/109.png",focus:"../css/pic/Data/Face/109.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/110.png",focus:"../css/pic/Data/Face/110.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/111.png",focus:"../css/pic/Data/Face/111.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/112.png",focus:"../css/pic/Data/Face/112.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/113.png",focus:"../css/pic/Data/Face/113.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/114.png",focus:"../css/pic/Data/Face/114.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/115.png",focus:"../css/pic/Data/Face/115.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/116.png",focus:"../css/pic/Data/Face/116.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/117.png",focus:"../css/pic/Data/Face/117.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/118.png",focus:"../css/pic/Data/Face/118.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/119.png",focus:"../css/pic/Data/Face/119.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/120.png",focus:"../css/pic/Data/Face/120.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/121.png",focus:"../css/pic/Data/Face/121.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/122.png",focus:"../css/pic/Data/Face/122.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/123.png",focus:"../css/pic/Data/Face/123.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/124.png",focus:"../css/pic/Data/Face/124.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/125.png",focus:"../css/pic/Data/Face/125.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/126.png",focus:"../css/pic/Data/Face/126.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/127.png",focus:"../css/pic/Data/Face/127.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/128.png",focus:"../css/pic/Data/Face/128.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/129.png",focus:"../css/pic/Data/Face/129.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/130.png",focus:"../css/pic/Data/Face/130.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/131.png",focus:"../css/pic/Data/Face/131.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/132.png",focus:"../css/pic/Data/Face/132.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/133.png",focus:"../css/pic/Data/Face/133.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/134.png",focus:"../css/pic/Data/Face/134.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/135.png",focus:"../css/pic/Data/Face/135.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/136.png",focus:"../css/pic/Data/Face/136.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/137.png",focus:"../css/pic/Data/Face/137.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/138.png",focus:"../css/pic/Data/Face/138.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/139.png",focus:"../css/pic/Data/Face/139.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/140.png",focus:"../css/pic/Data/Face/140.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/141.png",focus:"../css/pic/Data/Face/141.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/142.png",focus:"../css/pic/Data/Face/142.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/143.png",focus:"../css/pic/Data/Face/143.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/144.png",focus:"../css/pic/Data/Face/144.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/145.png",focus:"../css/pic/Data/Face/145.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/146.png",focus:"../css/pic/Data/Face/146.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/147.png",focus:"../css/pic/Data/Face/147.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/148.png",focus:"../css/pic/Data/Face/148.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/149.png",focus:"../css/pic/Data/Face/149.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/150.png",focus:"../css/pic/Data/Face/150.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/151.png",focus:"../css/pic/Data/Face/151.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/152.png",focus:"../css/pic/Data/Face/152.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/153.png",focus:"../css/pic/Data/Face/153.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/154.png",focus:"../css/pic/Data/Face/154.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/155.png",focus:"../css/pic/Data/Face/155.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/156.png",focus:"../css/pic/Data/Face/156.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/157.png",focus:"../css/pic/Data/Face/157.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/158.png",focus:"../css/pic/Data/Face/158.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/159.png",focus:"../css/pic/Data/Face/159.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/160.png",focus:"../css/pic/Data/Face/160.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/161.png",focus:"../css/pic/Data/Face/161.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/162.png",focus:"../css/pic/Data/Face/162.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/163.png",focus:"../css/pic/Data/Face/163.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/164.png",focus:"../css/pic/Data/Face/164.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/165.png",focus:"../css/pic/Data/Face/165.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/166.png",focus:"../css/pic/Data/Face/166.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/167.png",focus:"../css/pic/Data/Face/167.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/168.png",focus:"../css/pic/Data/Face/168.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/169.png",focus:"../css/pic/Data/Face/169.gif",title:"微笑/wx"},
			{show:"../css/pic/Data/Face/apng/170.png",focus:"../css/pic/Data/Face/170.gif",title:"微笑/wx"},
			]
		},
		liveFacesData:
		{
			colNum:16,
			rowNum:9,
			title:"生活",
			pics:[{show:"../css/pic/Data/Face/2/2_0.png",focus:"../css/pic/Data/Face/2/2_0.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_1.png",focus:"../css/pic/Data/Face/2/2_1.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_2.png",focus:"../css/pic/Data/Face/2/2_2.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_3.png",focus:"../css/pic/Data/Face/2/2_3.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_4.png",focus:"../css/pic/Data/Face/2/2_4.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_5.png",focus:"../css/pic/Data/Face/2/2_5.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_6.png",focus:"../css/pic/Data/Face/2/2_6.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_7.png",focus:"../css/pic/Data/Face/2/2_7.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_8.png",focus:"../css/pic/Data/Face/2/2_8.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_9.png",focus:"../css/pic/Data/Face/2/2_9.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_10.png",focus:"../css/pic/Data/Face/2/2_10.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_11.png",focus:"../css/pic/Data/Face/2/2_11.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_12.png",focus:"../css/pic/Data/Face/2/2_12.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_13.png",focus:"../css/pic/Data/Face/2/2_13.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_14.png",focus:"../css/pic/Data/Face/2/2_14.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_15.png",focus:"../css/pic/Data/Face/2/2_15.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_16.png",focus:"../css/pic/Data/Face/2/2_16.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_17.png",focus:"../css/pic/Data/Face/2/2_17.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_18.png",focus:"../css/pic/Data/Face/2/2_18.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_19.png",focus:"../css/pic/Data/Face/2/2_19.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_20.png",focus:"../css/pic/Data/Face/2/2_20.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_21.png",focus:"../css/pic/Data/Face/2/2_21.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_22.png",focus:"../css/pic/Data/Face/2/2_22.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_23.png",focus:"../css/pic/Data/Face/2/2_23.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_24.png",focus:"../css/pic/Data/Face/2/2_24.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_25.png",focus:"../css/pic/Data/Face/2/2_25.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_26.png",focus:"../css/pic/Data/Face/2/2_26.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_27.png",focus:"../css/pic/Data/Face/2/2_27.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_28.png",focus:"../css/pic/Data/Face/2/2_28.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_29.png",focus:"../css/pic/Data/Face/2/2_29.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_30.png",focus:"../css/pic/Data/Face/2/2_30.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_31.png",focus:"../css/pic/Data/Face/2/2_31.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_32.png",focus:"../css/pic/Data/Face/2/2_32.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_33.png",focus:"../css/pic/Data/Face/2/2_33.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_34.png",focus:"../css/pic/Data/Face/2/2_34.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_35.png",focus:"../css/pic/Data/Face/2/2_35.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_36.png",focus:"../css/pic/Data/Face/2/2_36.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_37.png",focus:"../css/pic/Data/Face/2/2_37.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_38.png",focus:"../css/pic/Data/Face/2/2_38.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_39.png",focus:"../css/pic/Data/Face/2/2_39.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_40.png",focus:"../css/pic/Data/Face/2/2_40.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_41.png",focus:"../css/pic/Data/Face/2/2_41.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_42.png",focus:"../css/pic/Data/Face/2/2_42.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_43.png",focus:"../css/pic/Data/Face/2/2_43.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_44.png",focus:"../css/pic/Data/Face/2/2_44.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_45.png",focus:"../css/pic/Data/Face/2/2_45.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_46.png",focus:"../css/pic/Data/Face/2/2_46.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_47.png",focus:"../css/pic/Data/Face/2/2_47.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_48.png",focus:"../css/pic/Data/Face/2/2_48.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_49.png",focus:"../css/pic/Data/Face/2/2_49.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_50.png",focus:"../css/pic/Data/Face/2/2_50.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_51.png",focus:"../css/pic/Data/Face/2/2_51.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_52.png",focus:"../css/pic/Data/Face/2/2_52.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_53.png",focus:"../css/pic/Data/Face/2/2_53.png",title:"微笑/wx"},
				{show:"../css/pic/Data/Face/2/2_54.png",focus:"../css/pic/Data/Face/2/2_54.png",title:"微笑/wx"}
			]
		}
},
{
	init:function(context, container, option)
	{
		this._super("init", context, container);
		this.tabIndex = option.tabIndex;
		this.colNum = option.data.colNum;
		this.rowNum = option.data.rowNum;
		this.pics = option.data.pics;
		this.title = option.data.title;
	},
	onInit:function(context, container)
	{
		context.show();
		Sharp('<div class="tab_content_panel_title">'+this.title+'</div>').addTo(context);
		this.content = Sharp('<div class="panel_content tab_content_panel"></div>').addTo(context);
		this.initData();
		this.content.scroller({});
		context.hide();
	},
	initData:function()
	{
		var self = this;
		
		var tableStr = '<table class="faces_table">';
		for(var i=0; i<this.rowNum; i++)
		{
			tableStr += '<tr class="faces_tr">';
			for(var j=0; j<this.colNum; j++)
			{
				var index = this.colNum*i+j;
				tableStr += '<td class="faces_td">'+(index>=this.pics.length||!this.pics[index]?'':'<div class="faces_div" value="'+index+'" title="'+this.pics[index].title+'"><img src="'+this.pics[index].show+'"></div>')+'</td>';
			}
			tableStr += '</tr>';
		}
		tableStr += '</table>';
		
		this.table = Sharp(tableStr).addTo(this.content);
		var facesDivs = this.table.find(".faces_div");
		var pics = this.pics;
		var writer = this.container.container;
		facesDivs.iter(function(element)
		{
			var element = Sharp(element);
			element.mouseover(function()
			{
				//var element = Sharp(this);
				var index = element.attr("value")-0;
				var pic = pics[index];
				if(pic && index>=0)
				{
					element.children().attr("src", pic.focus);
				}
			})
			.mouseout(function()
			{
				//var element = Sharp(this);
				var index = element.attr("value")-0;
				var pic = pics[index];
				if(pic && index>=0)
				{
					element.children().attr("src", pic.show);
				}
			})
			.click(function()
			{
				//var element = Sharp(this);
				var value = element.attr("value");
				var index = element.attr("value")-0;
				var pic = pics[index];
				if(pic && index>=0)
				{
					//element.children().attr("src", pic.focus);
					writer.output('<img src="'+pic.focus+'">');
					self.remove();
				}
			});
		});
		
		
	},
	output:function(htmlStr)
	{
		if(this.container.container.output)
		{
			this.container.container.output(htmlStr);
		}
	},
	remove:function(htmlStr)
	{
		this.container.container.remove();
	}
});