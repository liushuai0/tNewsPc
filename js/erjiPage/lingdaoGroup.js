$(function() {
	/*公共部分
	 * 导航栏
	 * footer CopyRight
	 */
	console.log("sdakjlgkj")
	// $("#headerpage").load("header.html");
	$("#footer").load("footer.html");
	$.jqPaginator('#pagination2', {
		totalPages: 5,
		visiblePages: 5,
		currentPage: 1,
		first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
		prev: '<li class="prev"><a href="javascript:;">前一页</a></li>',
		next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
		last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
		page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
		onPageChange: function(num, type) {
			$('#p2').text(type + '：' + num);
			console.log(num);
		}
	});
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
			// console.log(res);
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
			
		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	show()
	
	
});
function xialashow(){
	console.log("dfasfesasdf");
	$("#xialaNav").toggleClass("d-none")
}
function leibiaoToDetail(cate_id){
	console.log(cate_id);
	window.location.href="erjiList.html?nav_id="+cate_id+"&shouye="+1
}
function getUrlParam(id) {
	var regExp = new RegExp('([?]|&)' + id + '=([^&]*)(&|$)');
	var result = window.location.href.match(regExp);
	if (result) {
		return decodeURIComponent(result[2]);
	} else {
		return null;
	}

}
function toDetail(id){
	window.location.href='newsDetail.html?id='+id+"&leader="+1
}
function show(){
	console.log("领导报道集");
	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/pc/leaderlist",
		dataType: "json",
		data: {
			id:getUrlParam("id")
		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			// console.log(res);
			console.log(res);
			console.log(res.data.leader);
			let leaderList=res.data.leader
			$("#leaderName").append(leaderList.title)
			$("#leaderName2").append(leaderList.title)
			$("#leaderPhoto").attr("src",leaderList.thumbnail)
			$("#leaderContent").append(leaderList.description)
			
			if(res.data.list.length!=0&&res.data.list!=null){
				let list=res.data.list
				$.each(list,function (index) {
					$("#leaderlist").append("<div class='card_list'><div class='cl_title' onclick='toDetail("+list[index].id+")'>"+list[index].title+"</div><div class='cl_content'>"+list[index].description+"</div><div class='cl_footer'><div class='cl_footer_name'>"+list[index].source+"</div><div class='cl_footer_date'>"+list[index].create_time+"</div><div class='cl_footer_detail' onclick='toDetail("+list[index].id+")'>【详细】</div></div></div>")
				})	
			}else{
				$("#leaderlist").append("当前暂无数据")
			}
		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});
	
	
	
}
function tiaozhuan(index) {
	
	
	if(index==1000){
		window.location.href="index.html"
	}else{
		window.location.href="erjiList.html?nav_id="+index
	}
}
