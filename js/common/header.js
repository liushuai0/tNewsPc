$(function() {
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
			// ("#nav1").addClass("abc");  
			
			$(".daohanglanaaa").each(function() {
				$this = $(this);
				console.log($this[0].href);
				if($this[0].href==String(window.location)){  
				    $this.addClass("abc");  
				} 
				$(this).on('click',function(){
					
					if(this.id=='nav1'){
						this.href="index.html"
						// window.location.href='index.html'
					}else{
						this.href="erji.html"
						console.log(this);
						// window.location.href='erji.html'
					}
					
					
				})
				
			});	

			//必须在加载完导航栏之后 增加选中的样式
			// if (getCookie("id") == 1) {
			// 	$("#nav1").addClass("active")
			// } else if (getCookie("id") == 2) {
			// 	$("#nav2").addClass("active")
			// } else if (getCookie("id") == 3) {
			// 	$("#nav3").addClass("active")
			// } else if (getCookie("id") == 4) {
			// 	$("#nav4").addClass("active")
			// } else if (getCookie("id") == 5) {
			// 	$("#nav5").addClass("active")
			// } else if (getCookie("id") == 6) {
			// 	$("#nav6").addClass("active")
			// } else if (getCookie("id") == 7) {
			// 	$("#nav7").addClass("active")
			// }

		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});





	// 搜索栏搜索
	$("#submitBtn").on('click', function(e) {
		alert($('#searchInput').val());
	})



})

function tiaozhuan(index) {
	
	console.log(index);
	if(index==1){
		window.location.href="index.html"
	}else{
		window.location.href="erjiList.html?cate_id="+index
	}
	
	// switch (index) {
	// 	case 1:
	// 		setCookie("id", 1) //跳转时存入cookie  在上边页面加载时候读取并显示
	// 		window.location.href = "index.html"
	// 		break;
	// 	case 2:
	// 		setCookie("id", 2)
	// 		window.location.href = "erjiList.html" //延边新闻页

	// 		break;
	// 	case 3:
	// 		setCookie("id", 3)
	// 		window.location.href = "erjiList.html" //新闻详情页和视频详情页
	// 		break;
	// 	case 4:
	// 		setCookie("id", 4)
	// 		window.location.href = "erjiList.html" //领导报道集
	// 		break;
	// 	case 5:
	// 		setCookie("id", 5)
	// 		window.location.href = "erjiList.html" //文章列表页
	// 		break;
	// 	case 6:
	// 		setCookie("id", 6)
	// 		window.location.href = "erjiList.html"
	// 		break;
	// 	case 7:
	// 		setCookie("id", 7)
	// 		window.location.href = "erjiList.html"
	// 	case 14:
	// 		setCookie("id", 14)
	// 		window.location.href = "erjiList.html"
	// }

}
