$(function() {
	/*公共部分
	 * 导航栏
	 * footer CopyRight
	 */
	console.log("sdakjlgkj")
	// $("#headerpage").load("header.html");
	$("#footer").load("footer.html");
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
			var headernav = res.data.navList
			var othernav=res.data.othernav
			console.log(headernav);
			for (var i = 0; i < headernav.length; i++) {
				$(".daohanglan").append("<li class='nav-item' onclick='tiaozhuan(" + headernav[i].id +
					")'><a class='nav-link daohanglanaaa' id='nav" + headernav[i].id + "' data-toggle='pill' href='#'>" +
					headernav[i].title +
					"</a></li>");
			}
			for (var i = 0; i < othernav.length; i++) {
				$("#otherNav").append("<div class='px-3' onclick='leibiaoToDetail(" + othernav[i].id +")' style='height: 40px;line-height: 40px;cursor:pointer;'>"+othernav[i].title+"</div><div style='height: 18px;margin-top: 6px;'>|</div>")
			}
			// $("#nav1").addClass("active");  
			console.log("12312312");
			if (getUrlParam('nav_id')) {
				$("#nav" + getUrlParam('nav_id') + "").addClass("active")
			} else {
				$("#nav1000").addClass("active");
			}


		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	show()

});
//获取地址栏参数
function getUrlParam(id) {
	var regExp = new RegExp('([?]|&)' + id + '=([^&]*)(&|$)');
	var result = window.location.href.match(regExp);
	if (result) {
		return decodeURIComponent(result[2]);
	} else {
		return null;
	}

}
function xialashow(){
	console.log("dfasfesasdf");
	$("#xialaNav").toggleClass("d-none")
}

function tiaozhuan(index) {


	if (index == 1000) {
		window.location.href = "index.html"
	} else {
		window.location.href = "erjiList.html?nav_id=" + index
	}
}

function shenduToDetail(id) {
	window.location.href = "newsDetail.html?id=" + id
}
function leibiaoToDetail(cate_id){
	console.log(cate_id);
	window.location.href="erjiList.html?nav_id="+cate_id+"&shouye="+1
}

function show() {
	// 获取当前文章详情
	if(getUrlParam('leader')==1){
		$.ajax({
			type: "post", //请求方式
			url: "http://ji.agampai.cn/api/home/pc/leaderdetail",
			dataType: "json",
			data: {
				id: getUrlParam('id') //获取地址栏参数
			}, //请求参数
			beforeSend: function() {
				//请求前的处理
			},
			success: function(res) {
				console.log(res);
				$("#qrabc").empty()
				$("#newsTitle").append(res.data.data.title);
				document.title = res.data.data.title;
				$("#newsDate").append(res.data.data.create_time)
				
				//来源
				if (res.data.data.post_source) {
					$("#newslaiyuan").append(res.data.data.post_source);
				}
				if (res.data.data.source) {
					$("#newslaiyuan").append(res.data.data.source);
				}
				$("#newsbianji").append(res.data.data.editor);
				
				$("#newsneirong").append(res.data.data.content)
				if(res.data.data.qrcode){
					$("#qrcode").attr("src",res.data.data.qrcode)
					
				}else{
					$("#qrcode").attr("src","img/shouye/code2.png")
				}
				
				//文章侧栏处理哦
				console.log("-----------侧栏---------");
				console.log(res.data);
				//新闻右边侧栏处理
				
				
				//深度处理
				var shenduList = res.data.shendu
				var shendunum
				
				for (let index = 0; index < 2; index++) {
					$("#shenduq2").append("<div><img onclick='shenduToDetail(" + shenduList[index].id + ")' src=" + shenduList[index]
						.thumbnail +
						" style='width: 135px;height: 77px;'><div class='text-center fabutext2' onclick='shenduToDetail(" + shenduList[
							index].id + ")' style='font-size: 10px;width: 135px;margin-top: 10px;'>" +
						shenduList[index].title + "</div></div>")
				
				}
				for (let index = 2; index < 5; index++) {
					$("#shenduUl").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + shenduList[
						index].id + "'>" + shenduList[index].title + "</a></div>")
				}
				
				//热点新闻处理 fabuswiper1
				var fabuList = res.data.fabu
				// for (let index = 0; index < 3; index++) {
				// 	if (index == 0) {
				// 		$("#fabuswiper1").append(
				// 			"<div class='carousel-item active'><img class='d-block w-100' style='height: 160px;' src='" + fabuList[
				// 				0].photos_url[index] + "' alt='Second slide'></div>")
				// 	} else {
				// 		$("#fabuswiper1").append("<div class='carousel-item'><img class='d-block w-100' style='height: 160px;' src='" +
				// 			fabuList[0].photos_url[index] + "' alt='Second slide'></div>")
				// 	}
				// }
				
				$("#redianImg").attr("src", fabuList[0].thumbnail)
				$("#fabuTitle1").append(fabuList[0].title)
				$("#fabuTitle1").attr("onclick", "shenduToDetail(" + fabuList[0].id + ")")
				for (let index = 1; index < 3; index++) {
					$("#fabutext2Cont1").append("<div><img src='" + fabuList[index].thumbnail +
						"' style='width: 130px;height: 70px;'><div class='fabutext2' onclick='shenduToDetail(" + fabuList[index].id +
						")'>" + fabuList[index].title +
						"</div></div>")
				}
				$("#fabuContentT3").append("<a style='color: #922530;' href='newsDetail.html?id=" + fabuList[3].id +
					"'>" + fabuList[3].title + "</a>")
				
				for (let i = 4; i < fabuList.length; i++) {
					$("#fabuContentList").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" +
						fabuList[i].id +
						"'>" + fabuList[i].title + "</a> </div>")
				}
				
				
				
				//相关新闻列表
				let recList = res.data.relatedNews
				$.each(recList, function(index) {
					$("#tuijianList").append(
						"<div class='nav-item position-relative'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+recList[
							index].id+"'>" + recList[
							index].title + "<span class='xiangguanul_date'>" + recList[index].create_time + "</span></a></div>")
				
				})
				//推荐新闻列表
				let tuijianList = res.data.recommendNews
				$("#tuijianListM1").attr("src",tuijianList[0].thumbnail)
				$("#tuijianListT1").append(tuijianList[0].title)
				$("#tuijianListT1").attr("onclick", "shenduToDetail(" + tuijianList[0].id + ")")
				$("#tuijianListul1").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[1].id+"'>"+tuijianList[1].title+" </a></div>")
				$("#tuijianListul1").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[2].id+"'>"+tuijianList[2].title+" </a></div>")
				$("#tuijianListT2").append(tuijianList[3].title)
				$("#tuijianListT2").attr("onclick", "shenduToDetail(" + tuijianList[3].id + ")")
				$("#tuijianListul2").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[4].id+"'>"+tuijianList[1].title+" </a></div>")
				$("#tuijianListul2").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[5].id+"'>"+tuijianList[2].title+" </a></div>")
				$("#tuijianListT3").append(tuijianList[6].title)
				$("#tuijianListT3").attr("onclick", "shenduToDetail(" + tuijianList[6].id + ")")
				$("#tuijianListul3").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[7].id+"'>"+tuijianList[1].title+" </a></div>")
				$("#tuijianListul3").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[8].id+"'>"+tuijianList[2].title+" </a></div>")
				
				
			},
		})
	}else{
		
	

	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/pc/newsdetail",
		dataType: "json",
		data: {
			id: getUrlParam('id') //获取地址栏参数
		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			console.log(res);

			$("#newsTitle").append(res.data.data.title);
			document.title = res.data.data.title;
			$("#newsDate").append(res.data.data.create_time)
			
			//来源
			if (res.data.data.post_source) {
				$("#newslaiyuan").append(res.data.data.post_source);
			}
			if (res.data.data.source) {
				$("#newslaiyuan").append(res.data.data.source);
			}
			$("#newsbianji").append(res.data.data.editor);

			$("#newsneirong").append(res.data.data.content)
			if(res.data.data.qrcode){
				$("#qrcode").attr("src",res.data.data.qrcode)
				
			}else{
				$("#qrcode").attr("src","img/shouye/code2.png")
			}
			
			//文章侧栏处理哦
			console.log("-----------侧栏---------");
			console.log(res.data);
			//新闻右边侧栏处理


			//深度处理
			var shenduList = res.data.shendu
			var shendunum

			for (let index = 0; index < 2; index++) {
				$("#shenduq2").append("<div><img onclick='shenduToDetail(" + shenduList[index].id + ")' src=" + shenduList[index]
					.thumbnail +
					" style='width: 135px;height: 77px;'><div class='text-center fabutext2' onclick='shenduToDetail(" + shenduList[
						index].id + ")' style='font-size: 10px;width: 135px;margin-top: 10px;'>" +
					shenduList[index].title + "</div></div>")

			}
			for (let index = 2; index < 5; index++) {
				$("#shenduUl").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" + shenduList[
					index].id + "'>" + shenduList[index].title + "</a></div>")
			}

			//热点新闻处理 fabuswiper1
			var fabuList = res.data.fabu
			// for (let index = 0; index < 3; index++) {
			// 	if (index == 0) {
			// 		$("#fabuswiper1").append(
			// 			"<div class='carousel-item active'><img class='d-block w-100' style='height: 160px;' src='" + fabuList[
			// 				0].photos_url[index] + "' alt='Second slide'></div>")
			// 	} else {
			// 		$("#fabuswiper1").append("<div class='carousel-item'><img class='d-block w-100' style='height: 160px;' src='" +
			// 			fabuList[0].photos_url[index] + "' alt='Second slide'></div>")
			// 	}
			// }

			$("#redianImg").attr("src", fabuList[0].thumbnail)
			$("#fabuTitle1").append(fabuList[0].title)
			$("#fabuTitle1").attr("onclick", "shenduToDetail(" + fabuList[0].id + ")")
			for (let index = 1; index < 3; index++) {
				$("#fabutext2Cont1").append("<div><img src='" + fabuList[index].thumbnail +
					"' style='width: 130px;height: 70px;'><div class='fabutext2' onclick='shenduToDetail(" + fabuList[index].id +
					")'>" + fabuList[index].title +
					"</div></div>")
			}
			$("#fabuContentT3").append("<a style='color: #922530;' href='newsDetail.html?id=" + fabuList[3].id +
				"'>" + fabuList[3].title + "</a>")

			for (let i = 4; i < fabuList.length; i++) {
				$("#fabuContentList").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" +
					fabuList[i].id +
					"'>" + fabuList[i].title + "</a> </div>")
			}



			//相关新闻列表
			let recList = res.data.relatedNews
			$.each(recList, function(index) {
				$("#tuijianList").append(
					"<div class='nav-item position-relative'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+recList[
						index].id+"'>" + recList[
						index].title + "<span class='xiangguanul_date'>" + recList[index].create_time + "</span></a></div>")

			})
			//推荐新闻列表
			let tuijianList = res.data.recommendNews
			$("#tuijianListM1").attr("src",tuijianList[0].thumbnail)
			$("#tuijianListT1").append(tuijianList[0].title)
			$("#tuijianListT1").attr("onclick", "shenduToDetail(" + tuijianList[0].id + ")")
			$("#tuijianListul1").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[1].id+"'>"+tuijianList[1].title+" </a></div>")
			$("#tuijianListul1").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[2].id+"'>"+tuijianList[2].title+" </a></div>")
			$("#tuijianListT2").append(tuijianList[3].title)
			$("#tuijianListT2").attr("onclick", "shenduToDetail(" + tuijianList[3].id + ")")
			$("#tuijianListul2").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[4].id+"'>"+tuijianList[1].title+" </a></div>")
			$("#tuijianListul2").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[5].id+"'>"+tuijianList[2].title+" </a></div>")
			$("#tuijianListT3").append(tuijianList[6].title)
			$("#tuijianListT3").attr("onclick", "shenduToDetail(" + tuijianList[6].id + ")")
			$("#tuijianListul3").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[7].id+"'>"+tuijianList[1].title+" </a></div>")
			$("#tuijianListul3").append("<div class='nav-item'><span class='dian'>·</span><a class='diva' href='newsDetail.html?id="+tuijianList[8].id+"'>"+tuijianList[2].title+" </a></div>")
			

		},

		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	}
}
