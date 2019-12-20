$(function() {
	/*公共部分
	 * 导航栏
	 * footer CopyRight
	 */
	console.log("sdakjlgkj")
	// $("#headerpage").load("header.html");
	$("#footer").load("footer.html");
	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/index/nav",
		dataType: "json",
		data: {

		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			var headernav = res.data.navList
			console.log(headernav);
			for (var i = 0; i < headernav.length; i++) {
				$(".daohanglan").append("<li class='nav-item' onclick='tiaozhuan(" + headernav[i].id +
					")'><a class='nav-link daohanglanaaa' id='nav" + headernav[i].id + "' data-toggle='pill' href='#'>" +
					headernav[i].name +
					"</a></li>");
			}
			// $("#nav1").addClass("active");  
			console.log("12312312");

			$("#nav" + getUrlParam('cate_id') + "").addClass("active")

		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	show()

});

function tiaozhuan(index) {


	if (index == 1) {
		window.location.href = "index.html"
	} else {
		window.location.href = "erjiList.html?cate_id=" + index
	}
}

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

function show() {
	// 获取当前文章详情

	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/portal/articles/read",
		dataType: "json",
		data: {
			id: getUrlParam('id') //获取地址栏参数
		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			console.log("aaaaaa");
			console.log(res);
			$("#newsTitle").append(res.data.list.post_title);
			$("#newsDate").append(res.data.list.published_time)
			$("#newslaiyuan").append(res.data.list.post_source);
			$("#newsneirong").append(res.data.list.post_content)
			//合作单位
			let hezuo = res.data.hezuo
			$.each(hezuo, function(index, value) {
				$("#hezhuodanwei").append("<li class='nav-item'><a class='nav-link' href='" + hezuo[index].unit_url + "'>" +
					hezuo[index].title + "</a></li>")
			})
		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
}
