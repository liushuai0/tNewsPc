
$(function() {
	//头部加载
	// $("#headerpage").load("header.html");
	//尾部加载
	$("#footerContent").load("footer.html")
	//滚动文字
	setCookie("id",1)
	
	var num = 0;
	function goLeft() {
	    //750是根据你给的尺寸，可变的
	    if (num == -1200) {
	        num = 0;
	    }
	    num -= 1;
	    $(".scrollabc").css({
	        left: num
	    })
	}
	//设置滚动速度
	var timer = setInterval(goLeft, 20);
	//设置鼠标经过时滚动停止
	$(".boxabc").hover(function() {
	    clearInterval(timer);
	},
	function() {
	    timer = setInterval(goLeft, 20);
	})
	
	
	$('.dropdown-toggle').dropdown();
	//函数
	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/pc/nav",
		dataType: "json",
		data: {
	
		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			console.log(res);
			var headernav = res.data.navList
			var othernav=res.data.othernav
			for (var i = 0; i < headernav.length; i++) {
				$(".daohanglan").append("<li class='nav-item' onclick='tiaozhuan(" + headernav[i].id +
					")'><a class='nav-link daohanglanaaa' id='nav" + headernav[i].id + "' data-toggle='pill' href='#'>" +
					headernav[i].title +
					"</a></li>");
			}
			for (var i = 0; i < othernav.length; i++) {
				$("#otherNav").append("<div class='px-3' onclick='leibiaoToDetail(" + othernav[i].id +")' style='height: 40px;line-height: 40px;cursor:pointer;'>"+othernav[i].title+"</div><div style='height: 18px;margin-top: 6px;'>|</div>")
			}
			$("#nav1000").addClass("active");  
			
			// $(".daohanglanaaa").each(function() {
			// 	$this = $(this);
				
			// 	if($this[0].href==String(window.location)){  
			// 	    $this.addClass("abc");  
			// 	} 
			// 	$(this).on('click',function(){
					
			// 		if(this.id=='nav1'){
			// 			this.href="index.html"
			// 			// window.location.href='index.html'
			// 		}else{
			// 			this.href="erji.html"
			// 			console.log(this);
			// 			// window.location.href='erji.html'
			// 		}
					
					
			// 	})
				
			// });	
		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	
	//领导接口
	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/pc/leaders",
		dataType: "json",
		data: {
	
		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			console.log(res.data.list);
			let leaderlist=res.data.list
			// res.data.leaderlist
			$.each(leaderlist,function(index){
				$('#leaderList').append("<div class='d-flex flex-column align-items-center' onclick='goLeaderList("+leaderlist[index].id+")'><img src='"+leaderlist[index].thumbnail+"' style='width: 71px;height: auto;'><span>"+leaderlist[index].title+"</span></div>")
			})
		},
	})
	showabc()
	
	//触摸显示微信二维码
	$('#weixin').popover({
		trigger: 'hover', //鼠标以上时触发弹出提示框
		html: true, //开启html 为true的话，data-content里就能放html代码了
		content: "<img src='img/shouye/code2.png' style='width:180px;height:180px' class=''>"
	});
	$('#shengji').hover(function(){
		
		$("#addrUl").toggleClass('d-none')
	});
	$('#difang').hover(function(){
		
		$("#addrUl1").toggleClass('d-none')
	});
	$('#youqing').hover(function(){
		
		$("#addrUl2").toggleClass('d-none')
	});

})
	
function xialashow(){
	console.log("dfasfesasdf");
	$("#xialaNav").toggleClass("d-none")
}
function tiaozhuan(index) {
	
	
	if(index==1000){
		window.location.href="index.html"
	}else{
		window.location.href="erjiList.html?nav_id="+index
	}
}
//跳转领导报道集
function goLeaderList(id){
	console.log(id);
	window.location.href="lingdaoGroup.html?id="+id 
}
//影展跳转详情
function yinzhanToDetail(index){
	
	window.location.href="newsDetail.html?id="+index
}

function leibiaoToDetail(cate_id){
	console.log(cate_id);
	window.location.href="erjiList.html?nav_id="+cate_id+"&shouye="+1
}
//7 8 9 10 13 14 15的阅读全文跳转
// function toNewsDetail(index){
// 	newsquanwen15
// 	console.log(index);
// 	if(index==13||index==14||index==15){
// 		// let cId=$("#renshiTitle"+"index").
// 		console.log(HomeList[index].newslist[0].id);
// 		window.location.href="newsDetail.html?id="+ HomeList[index].newslist[0].id
// 	}else if(index==7||index==8||index==9||index==10){
// 		window.location.href="newsDetail.html?id="+ HomeList[index].newslist[0].id
// 	}
// }
function toquanwen(id){
	window.location.href="newsDetail.html?id="+id
}

var HomeList=[]
function showabc() {
	$.ajax({
		type: "get", //请求方式
		url: "http://ji.agampai.cn/api/home/pc/index",
		dataType: "json",
		data: {

		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			
			if (res.data != null) {
				HomeList = res.data
			}
			//轮播图处理
			if(HomeList.bannerlist!=null){
				$.each(HomeList.bannerlist,function(index){
					if (index == 0) {
							$("#shoyeSwiper").append(
								"<div class='carousel-item position-relative active'><img class='d-block w-100' onclick='yinzhanToDetail("+res.data.bannerlist[index].id+")' style='height: 389px;cursor:pointer;' src='" + res.data.bannerlist[
									0].thumbnail + "' alt='Second slide'><div class='swiperText'><a href='newsDetail.html?id=" + res.data.bannerlist[index].id + "'>"+res.data.bannerlist[0].title+"</a></div></div>")
						} else {
							$("#shoyeSwiper").append("<div class='carousel-item position-relative'><img class='d-block w-100' onclick='yinzhanToDetail("+res.data.bannerlist[index].id+")' style='height: 389px;' src='" +
								res.data.bannerlist[index].thumbnail + "' alt='Second slide'><div class='swiperText'><a href='newsDetail.html?id=" + res.data.bannerlist[index].id + "'>"+res.data.bannerlist[index].title+"</a></div></div>")
						}
				})
				
			}			
			//头条数据处理  HomeList.toutiaolist.data
			if (HomeList.toutiaolist.data!= null) {
				console.log(HomeList);
				$("#toutiaoTitle").append("<a style='color: rgba(194, 27, 31, 1);' href='newsDetail.html?id="+ HomeList.toutiaolist.data.id + "'>"  + HomeList.toutiaolist.data.title+ "</a>")
				$("#toutiaoTitleM").attr("onclick","leibiaoToDetail("+ HomeList.toutiaolist.cate_id + ")")
				$("#toutiaoTitleJJ").append("<a href='newsDetail.html?id="+ HomeList.toutiaolist.data.id + "'>"+HomeList.toutiaolist.data.description+"</a>")
			}

			//今日快讯处理  HomeList[1]
			if (HomeList.kuaixunlist.data != null) {
				$.each(HomeList.kuaixunlist.data, function(index, value) {
					$("#kuaixunList").append("<li><a href='newsDetail.html?id=" + HomeList.kuaixunlist.data[index].id + "'>" +
						HomeList.kuaixunlist.data[index].title + "</a></li>")
				})
				$.each(HomeList.kuaixunlist.data, function(index, value) {
					$("#kuaixunList").append("<li><a href='newsDetail.html?id=" + HomeList.kuaixunlist.data[index].id + "'>" +
						HomeList.kuaixunlist.data[index].title + "</a></li>")
				})
				$("#kuaixunTitle").append(HomeList.kuaixunlist.title)
			}
			//领导报道集处理
			
				
			//荐读处理 HomeList[2]
			if (HomeList.jiandulist.data != null) {
				$("#jinriTitle").append(HomeList.jiandulist.title)
				$("#jinriList1T").append("<a style='color: #333333;' href='newsDetail.html?id=" + HomeList.jiandulist.data[0].id + "'>"+HomeList.jiandulist.data[0].title+"</a>") //第一个标题 1Title
				$("#jinriList1C").append(HomeList.jiandulist.data[0].description) //第一个内容 1Content
				$("#jinriTitleM").attr("onclick","leibiaoToDetail("+ HomeList.jiandulist.cate_id + ")")
				for(let index=1;index<HomeList.jiandulist.data.length;index++){
					
					$("#jinriList").append("<div><span class='dian'>·</span><a href='newsDetail.html?id=" + HomeList.jiandulist.data[index].id + "'>" + HomeList.jiandulist.data[index].title + "</a></div>")
				}

			}

			//聚焦处理  HomeList[3]
			
			if (HomeList.renshilist.data != null) {
				$("#jujiaoTitle").append(HomeList.renshilist.title)
				$("#jujiaoImg").attr("src", HomeList.renshilist.data[0].thumbnail)
				$("#jujiaoList1T").append("<a style='color: #C21B1F;' href='newsDetail.html?id=" + HomeList.renshilist.data[0].id + "'>" + HomeList.renshilist.data[0].title + "</a>") //第一个标题 1Title
				for(let index=1;index<HomeList.renshilist.data.length;index++){
					$("#jujiaoList").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.renshilist.data[index].id + "'>" + HomeList.renshilist.data[index].title + "</a></div>")
				}
			}
			//要闻处理  HomeList[4]
			if (HomeList.yaowenlist.data != null) {
				$("#yaowenTitleM").attr("onclick","leibiaoToDetail("+ HomeList.yaowenlist.cate_id + ")")
				$("#yaowenTitle").append(HomeList.yaowenlist.title)
				//第一个card
				$("#yanwenContent1T").append("<a style='color: rgba(194, 27, 31, 1);' class='yaowen_content1_title' href='newsDetail.html?id=" + HomeList.yaowenlist.data[0].id + "' >" + HomeList.yaowenlist.data[0].title + "</a> ")
				for (let index = 1; index < 5; index++) {
					$("#yaowenList").append("<div><span class='dian'>·</span><a href='newsDetail.html?id=" + HomeList.yaowenlist.data[index].id + "'>" +HomeList.yaowenlist.data[index].title + "</a></div>")
				}

				//第二个card
				$("#yanwenContent2T").append("<a style='color: rgba(194, 27, 31, 1);' class='yaowen_content1_title' href='newsDetail.html?id=" + HomeList.yaowenlist.data[
						5].id + "' >" + HomeList.yaowenlist.data[5].title + "</a> ")
				for (let index = 6; index < 10; index++) {
					$("#yaowenList2").append("<div><span class='dian'>·</span><a href='newsDetail.html?id=" + HomeList.yaowenlist.data[index].id + "'>" + HomeList.yaowenlist.data[index].title + "</a></div>")
				}
				//第三个card
				$("#yanwenContent3T").append("<a style='color: rgba(194, 27, 31, 1);' class='yaowen_content1_title' href='newsDetail.html?id=" + HomeList.yaowenlist.data[
						10].id + "' >" + HomeList.yaowenlist.data[10].title + "</a> ")
				for (let index = 11; index < 15; index++) {
					$("#yaowenList3").append("<div><span class='dian'>·</span><a href='newsDetail.html?id=" + HomeList.yaowenlist.data[index].id + "'>" + HomeList.yaowenlist.data[index].title + "</a></div>")
				}
				//第四个
				if(HomeList.yaowenlist.data[16]){
					for(let index=15;index<17;index++){
						$("#yaowen13").append("<div><img src='"+HomeList.yaowenlist.data[index].thumbnail+"' style='width: 240px;height: 138px;'><div class='yaowen_bottom_twotext'><a style='color: #333333;' href='newsDetail.html?id="+HomeList.yaowenlist.data[index].id+"'>"+HomeList.yaowenlist.data[index].title+"</a></div></div>")
					}
				}
				
				}
			//深度处理
			if (HomeList.shendulist.data != null) {
				$("#shenduTitle").append(HomeList.shendulist.title)
				$("#shenduImg").attr("src", HomeList.shendulist.data[0].thumbnail)
				$("#shenduList1T").append("<a style='color: #C21B1F;' href='newsDetail.html?id=" + HomeList.shendulist.data[0].id + "'>" + HomeList.shendulist.data[0].title + "</a>") //第一个标题 1Title
				for (let index = 1; index < HomeList.shendulist.data.length; index++) {
					$("#shenduList").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.shendulist.data[index].id + "'>" + HomeList.shendulist.data[index].title + "</a></div>")
				}
			}
			//访谈处理
			if (HomeList.fangtanlist.data != null) {
				$("#fangtanTitle").append(HomeList.fangtanlist.title)
				$("#fangtanTitleM").attr("onclick","leibiaoToDetail("+ HomeList.fangtanlist.cate_id + ")")
				$("#fangtanImg").attr("src", HomeList.fangtanlist.data[0].thumbnail)
				$("#fangtanList1T").append("<a style='color: #333333;' href='newsDetail.html?id="+ HomeList.fangtanlist.data[0].id+"'>"+HomeList.fangtanlist.data[0].title+"</a>") //第一个标题 1Title

				for (let index = 1; index < HomeList.fangtanlist.data.length; index++) {
					$("#fangtanList").append(
						"<div class='fangtan_content_card d-flex'  style='margin-top: 17px;'><img src='" + HomeList.fangtanlist.data[index]
						.thumbnail +
						"' style='width:120px;height:68px;margin-right: 15px;'/><div><div class='fangtan_content_card_t' style='color: rgba(194, 27, 31, 1);'><a style='color: #666666;' href='newsDetail.html?id="+ HomeList.fangtanlist.data[index].id+"'>" +
						HomeList.fangtanlist.data[index].title +
						"</a></div></div></div>"
					)
				}
			}

			//延边新闻 江城 公交  大交通处理
			if (HomeList.yanbianlist.data != null) {
				console.log(HomeList.yanbianlist.data[0]);
					$("#yanbianTitle7").append(HomeList.yanbianlist.title)
					$("#yanbianTitle7M").attr("onclick","leibiaoToDetail("+ HomeList.yanbianlist.cate_id + ")")
					
					$("#yanbianImg7").attr("src", HomeList.yanbianlist.data[0].thumbnail)
					
					$("#yanbianContentC7").append(HomeList.yanbianlist.data[0].title)
					$("#yanbianContentC7").attr("onclick","toquanwen("+HomeList.yanbianlist.data[0].id+")")
					$("#newsquanwen7").attr("onclick","toquanwen("+HomeList.yanbianlist.data[0].id+")")
					for (let a = 1; a < HomeList.yanbianlist.data.length; a++) {
						$("#yanbianList7").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.yanbianlist.data[a].id +
							"'>" + HomeList.yanbianlist.data[a].title + "</a></div>")
					}
				
			}
			if (HomeList.jchenglist.data != null) {
				
					$("#yanbianTitle8").append(HomeList.jchenglist.title)
					$("#yanbianTitle8M").attr("onclick","leibiaoToDetail("+ HomeList.jchenglist.cate_id + ")")
					$("#yanbianImg8").attr("src", HomeList.jchenglist.data[0].thumbnail)
					$("#yanbianContentC8").append(HomeList.jchenglist.data[0].title)
					$("#yanbianContentC8").attr("onclick","toquanwen("+HomeList.jchenglist.data[0].id+")")
					$("#newsquanwen8").attr("onclick","toquanwen("+HomeList.jchenglist.data[0].id+")")
					for (let a = 1; a < HomeList.jchenglist.data.length; a++) {
						$("#yanbianList8").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.jchenglist.data[a].id +
							"'>" + HomeList.jchenglist.data[a].title + "</a></div>")
					}
				
			}
			if (HomeList.gonganlist.data != null) {
				
					$("#yanbianTitle9").append(HomeList.gonganlist.title)
					$("#yanbianTitle9M").attr("onclick","leibiaoToDetail("+ HomeList.gonganlist.cate_id + ")")
					$("#yanbianImg9").attr("src", HomeList.gonganlist.data[0].thumbnail)
					$("#yanbianContentC9").append(HomeList.gonganlist.data[0].title)
					$("#yanbianContentC9").attr("onclick","toquanwen("+HomeList.gonganlist.data[0].id+")")
					$("#newsquanwen9").attr("onclick","toquanwen("+HomeList.gonganlist.data[0].id+")")
					for (let a = 1; a < HomeList.gonganlist.data.length; a++) {
						$("#yanbianList9").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.gonganlist.data[a].id +
							"'>" + HomeList.gonganlist.data[a].title + "</a></div>")
					}
				
			}
			if (HomeList.jiaotonglist.data != null) {
				
					$("#yanbianTitle10").append(HomeList.jiaotonglist.title)
					$("#yanbianTitle10M").attr("onclick","leibiaoToDetail("+ HomeList.jiaotonglist.cate_id + ")")
					$("#yanbianImg10").attr("src", HomeList.jiaotonglist.data[0].thumbnail)
					$("#yanbianContentC10").append(HomeList.jiaotonglist.data[0].title)
					$("#yanbianContentC10").attr("onclick","toquanwen("+HomeList.jiaotonglist.data[0].id+")")
					$("#newsquanwen10").attr("onclick","toquanwen("+HomeList.jiaotonglist.data[0].id+")")
					for (let a = 1; a < HomeList.jiaotonglist.data.length; a++) {
						$("#yanbianList10").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.jiaotonglist.data[a].id +
							"'>" + HomeList.jiaotonglist.data[a].title + "</a></div>")
					}
				
			}
			// if (HomeList[7].newslist != null) {
			// 	for (let index = 7; index < 11; index++) {
			// 		$("#yanbianTitle" + index + "").append(HomeList[index].title)
			// 		$("#yanbianImg" + index + "").attr("src", HomeList[index].newslist[0].thumbnail)
			// 		$("#yanbianContentC" + index + "").append(HomeList[index].newslist[0].description)
			// 		for (let a = 1; a < 4; a++) {
			// 			$("#yanbianList" + index + "").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList[index].newslist[a].id +
			// 				"'>" + HomeList[index]
			// 				.newslist[a].title + "</a></div>")
			// 		}
			// 	}
			// }
			//文苑处理
			if (HomeList.wenyuanlist.data != null) {
				
				$("#fabu").append(HomeList.wenyuanlist.title)
				$("#fabuM").attr("onclick","leibiaoToDetail("+ HomeList.wenyuanlist.cate_id + ")")
				$("#redianImg").attr("src",HomeList.wenyuanlist.data[0].thumbnail)
				$("#fabuTitle").append("<a style='color: #333333;' href='newsDetail.html?id="+HomeList.wenyuanlist.data[0].id+"'>"+HomeList.wenyuanlist.data[0].title+"</a>" )
				for (let index = 1; index < 3; index++) {
					$("#fabutext2Cont").append("<div><img src='" + HomeList.wenyuanlist.data[index].thumbnail +
						"' style='width: 130px;height: 70px;'><div class='fabutext2'><a style='color: #333333;height:15px' href='newsDetail.html?id="+HomeList.wenyuanlist.data[index].id+"'>" + HomeList.wenyuanlist.data[index].title +
						"</a></div></div>")
				}
				$("#fabuContentT3").append("<a style='color: #922530;' href='newsDetail.html?id=" + HomeList.wenyuanlist.data[3].id +
					"'>" + HomeList.wenyuanlist.data[3].title + "</a>")
				$("#fabuContentT4").append("<a style='color: #922530;' href='newsDetail.html?id=" + HomeList.wenyuanlist.data[8].id +
					"'>" + HomeList.wenyuanlist.data[8].title + "</a>")
				for (let i = 4; i < 8; i++) {
					$("#fabuContentList").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.wenyuanlist.data[i].id +
						"'>" + HomeList.wenyuanlist.data[i].title + "</a> </div>")
				}
				for (let i = 9; i < 13; i++) {
					$("#fabuContentList2").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.wenyuanlist.data[i].id +
						"'>" + HomeList.wenyuanlist.data[i].title + "</a> </div>")
				}
			}
			//线上影展处理
			if (HomeList.yingzhanlist.data != null) {
				$("#yingzhan").append(HomeList.yingzhanlist.title)
				// for(let index=)
				$("#yingzhanM").attr("onclick","leibiaoToDetail("+ HomeList.yingzhanlist.cate_id + ")")
				$.each(HomeList.yingzhanlist.data, function(index, value) {
					$("#yingzhanList").append("<div onclick='yinzhanToDetail("+HomeList.yingzhanlist.data[index].id+")' style=''><img src='" + HomeList.yingzhanlist.data[index].thumbnail +
						"' style='width: 140px;height: 140px;'><div class='yingzhangcard_t'>" + HomeList.yingzhanlist.data[index].title +
						"</div></div>")
				})
			}
			//人事楷模 财经观察
			if (HomeList.xwfblist.data != null) {
				
					$("#renshiTitle13").append(HomeList.xwfblist.title)
					$("#yanbianTitle13M").attr("onclick","leibiaoToDetail("+ HomeList.xwfblist.cate_id + ")")
					$("#renshiContentT13").append("<a style='color: #333333;' href='newsDetail.html?id=" + HomeList.xwfblist.data[0].id +"'>"+HomeList.xwfblist.data[0].title+"</a>")
					$("#renshiContentC13").append(HomeList.xwfblist.data[0].description)
					$("#newsquanwen13").attr("onclick","toquanwen("+HomeList.xwfblist.data[0].id+")")
					for (let a = 1; a < HomeList.xwfblist.data.length; a++) {
						$("#renshiList13").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.xwfblist.data[a].id +
							"'>" +HomeList.xwfblist.data[a].title + "</a></div>")
					}
				
			}
			if (HomeList.kaimolist.data != null) {
					console.log(HomeList.kaimolist);
					$("#renshiTitle14").append(HomeList.kaimolist.title)
					$("#yanbianTitle14M").attr("onclick","leibiaoToDetail("+ HomeList.kaimolist.cate_id + ")")
					$("#renshiContentT14").append("<a style='color: #333333;' href='newsDetail.html?id=" + HomeList.kaimolist.data[0].id +"'>"+HomeList.kaimolist.data[0].title+"</a>")
					$("#renshiContentC14").append(HomeList.kaimolist.data[0].description)
					$("#newsquanwen14").attr("onclick","toquanwen("+HomeList.kaimolist.data[0].id+")")
					for (let a = 1; a < HomeList.kaimolist.data.length; a++) {
						$("#renshiList14").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.kaimolist.data[a].id +
							"'>" +HomeList.kaimolist.data[a].title + "</a></div>")
					}
				
			}
			if (HomeList.caijinglist.data != null) {
				
					$("#renshiTitle15").append(HomeList.caijinglist.title)
					$("#yanbianTitle15M").attr("onclick","leibiaoToDetail("+ HomeList.caijinglist.cate_id + ")")
					$("#renshiContentT15").append("<a style='color: #333333;' href='newsDetail.html?id=" + HomeList.caijinglist.data[0].id +"'>"+HomeList.caijinglist.data[0].title+"</a>")
					$("#renshiContentC15").append(HomeList.caijinglist.data[0].description)
					$("#newsquanwen15").attr("onclick","toquanwen("+HomeList.caijinglist.data[0].id+")")
					for (let a = 1; a < HomeList.caijinglist.data.length; a++) {
						$("#renshiList15").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList.caijinglist.data[a].id +
							"'>" +HomeList.caijinglist.data[a].title + "</a></div>")
					}
				
			}
			// if (HomeList[13].newslist != null) {
			// 	for (let index = 13; index < 16; index++) {
			// 		$("#renshiTitle" + index + "").append(HomeList[index].title)
			// 		$("#renshiContentT" + index + "").append("<a style='color: #333333;' href='newsDetail.html?id=" + HomeList[index].newslist[0].id +"'>"+HomeList[index].newslist[0].title+"</a>")
			// 		$("#renshiContentC" + index + "").append(HomeList[index].newslist[0].description)
			// 		for (let a = 1; a < 4; a++) {
			// 			$("#renshiList" + index + "").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + HomeList[index].newslist[a].id +
			// 				"'>" +HomeList[index].newslist[a].title + "</a></div>")
			// 		}
			// 	}
			// }
			//视频模块处理
			if (res.data.vlist.data != null) {
				$("#shipinM").attr("onclick","leibiaoToDetail("+ res.data.vlist.cate_id + ")")
				var videolist = res.data.vlist.data
				$("#videoContent1").append(
				"<div style='margin-bottom:10px'><img src='"+videolist[0].thumbnail+"' onclick='yinzhanToDetail("+videolist[0].id+")' style='width:550px;height:412px' ><div class='video_title'>"+videolist[0].title+"</div>"
					// "<video width='550' height='412' preload='meta' controls id='video1'><source  src='" + videolist[0].video +
					// "'  type='video/mp4'><source  src='" + videolist[0].video +
					// "' type='video/ogg'></video><div class='video_title' style='width: 500px;'>" + videolist[0].title + "</div>"
				)
				for (let index = 1; index < videolist.length; index++) {
					$("#videoContent2").append("<div style='margin-bottom:10px'><img src='"+videolist[index].thumbnail+"' onclick='yinzhanToDetail("+videolist[index].id+")' style='width:240px;height:180px' ><div class='video_title'>"+videolist[index].title+"</div></div>")
				}
			}
			//客户端微博展示处理
			if (res.data.logolist != null) {
				
				var logolist = res.data.logolist
				for (let index = 0; index < logolist.length; index++) {
					$("#logoImg" + index + "").attr("src", logolist[index].thumbnail)
					$("#logotext" + index + "").append(logolist[index].title)
				}
			}
			//省级部门 地方网联 友情链接
			if (res.data.threelist != null) {
				
				var addrList = res.data.threelist
				$.each(addrList.sheng, function(index, value) {
					$("#addrUl").append("<li class='addrUl_li'><a class='nav-link text-nowrap' href='" + addrList.sheng[index].unit_url +
						"'>" + addrList.sheng[
							index].title + "</a></li>")
				})
				$.each(addrList.difang, function(index, value) {
					$("#addrUl1").append("<li class='addrUl_li'><a class='nav-link text-nowrap' href='" + addrList.difang[index].unit_url +
						"'>" + addrList.difang[
							index].title + "</a></li>")
				})
				$.each(addrList.yuqing, function(index, value) {
					$("#addrUl2").append("<li class='addrUl_li'><a class='nav-link text-nowrap' href='" + addrList.yuqing[index].unit_url +
						"'>" + addrList.yuqing[
							index].title + "</a></li>")
				})

				
			}
		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});


}
//滚动文字
function play() {
	$(".gundongwenzi ul").animate({
			"marginTop": "-50px"
		},
		600,
		function() {
			/* stuff to do after animation is complete */
			$(this).css({
				"marginTop": 0
			}).children("li:first").appendTo(this);
		});
}
