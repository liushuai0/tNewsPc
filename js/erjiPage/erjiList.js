// 获取地址栏参数

$(function() {
	/*公共部分
	 * 导航栏
	 * footer CopyRight
	 */
	console.log("safasfa");
	// $("#headerpage").load("header.html");
	$("#footer").load("footer.html");
var visiblePages
var totalPages
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
			if(getUrlParam('shouye')){
				$("#nav1000").addClass("active")
			}
			$("#nav" + getUrlParam('nav_id') + "").addClass("active")

		},
		error: function() {
			console.log("错误")
			//请求出错处理
		}
	});

	show()
	console.log("show下");
	(function ($) {
    'use strict';

    $.jqPaginator = function (el, options) {
        if(!(this instanceof $.jqPaginator)){
            return new $.jqPaginator(el, options);
        }

        var self = this;

        self.$container = $(el);

        self.$container.data('jqPaginator', self);

        self.init = function () {

            if (options.first || options.prev || options.next || options.last || options.page) {
                options = $.extend({}, {
                    first: '',
                    prev: '',
                    next: '',
                    last: '',
                    page: ''
                }, options);
            }

            self.options = $.extend({}, $.jqPaginator.defaultOptions, options);

            self.verify();

            self.extendJquery();

            self.render();

            self.fireEvent(this.options.currentPage, 'init');
        };

        self.verify = function () {
            var opts = self.options;

            if (!self.isNumber(opts.totalPages)) {
                throw new Error('[jqPaginator] type error: totalPages');
            }

            if (!self.isNumber(opts.totalCounts)) {
                throw new Error('[jqPaginator] type error: totalCounts');
            }

            if (!self.isNumber(opts.pageSize)) {
                throw new Error('[jqPaginator] type error: pageSize');
            }

            if (!self.isNumber(opts.currentPage)) {
                throw new Error('[jqPaginator] type error: currentPage');
            }

            if (!self.isNumber(opts.visiblePages)) {
                throw new Error('[jqPaginator] type error: visiblePages');
            }

            if (!opts.totalPages && !opts.totalCounts) {
                throw new Error('[jqPaginator] totalCounts or totalPages is required');
            }

            if (!opts.totalPages && opts.totalCounts && !opts.pageSize) {
                throw new Error('[jqPaginator] pageSize is required');
            }

            if (opts.totalCounts && opts.pageSize) {
                opts.totalPages = Math.ceil(opts.totalCounts / opts.pageSize);
            }

            if (opts.currentPage < 1 || opts.currentPage > opts.totalPages) {
                throw new Error('[jqPaginator] currentPage is incorrect');
            }

            if (opts.totalPages < 1) {
                throw new Error('[jqPaginator] totalPages cannot be less currentPage');
            }
        };

        self.extendJquery = function () {
            $.fn.jqPaginatorHTML = function (s) {
                return s ? this.before(s).remove() : $('<p>').append(this.eq(0).clone()).html();
            };
        };

        self.render = function () {
            self.renderHtml();
            self.setStatus();
            self.bindEvents();
        };

        self.renderHtml = function () {
            var html = [];

            var pages = self.getPages();
            for (var i = 0, j = pages.length; i < j; i++) {
                html.push(self.buildItem('page', pages[i]));
            }

            self.isEnable('prev') && html.unshift(self.buildItem('prev', self.options.currentPage - 1));
            self.isEnable('first') && html.unshift(self.buildItem('first', 1));
            self.isEnable('statistics') && html.unshift(self.buildItem('statistics'));
            self.isEnable('next') && html.push(self.buildItem('next', self.options.currentPage + 1));
            self.isEnable('last') && html.push(self.buildItem('last', self.options.totalPages));

            if (self.options.wrapper) {
                self.$container.html($(self.options.wrapper).html(html.join('')).jqPaginatorHTML());
            } else {
                self.$container.html(html.join(''));
            }
        };

        self.buildItem = function (type, pageData) {
            var html = self.options[type]
                .replace(/{{page}}/g, pageData)
                .replace(/{{totalPages}}/g, self.options.totalPages)
                .replace(/{{totalCounts}}/g, self.options.totalCounts);

            return $(html).attr({
                'jp-role': type,
                'jp-data': pageData
            }).jqPaginatorHTML();
        };

        self.setStatus = function () {
            var options = self.options;

            if (!self.isEnable('first') || options.currentPage === 1) {
                $('[jp-role=first]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('prev') || options.currentPage === 1) {
                $('[jp-role=prev]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('next') || options.currentPage >= options.totalPages) {
                $('[jp-role=next]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('last') || options.currentPage >= options.totalPages) {
                $('[jp-role=last]', self.$container).addClass(options.disableClass);
            }

            $('[jp-role=page]', self.$container).removeClass(options.activeClass);
            $('[jp-role=page][jp-data=' + options.currentPage + ']', self.$container).addClass(options.activeClass);
        };

        self.getPages = function () {
            var pages = [],
                visiblePages = self.options.visiblePages,
                currentPage = self.options.currentPage,
                totalPages = self.options.totalPages;

            if (visiblePages > totalPages) {
                visiblePages = totalPages;
            }

            var half = Math.floor(visiblePages / 2);
            var start = currentPage - half + 1 - visiblePages % 2;
            var end = currentPage + half;

            if (start < 1) {
                start = 1;
                end = visiblePages;
            }
            if (end > totalPages) {
                end = totalPages;
                start = 1 + totalPages - visiblePages;
            }

            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }

            return pages;
        };

        self.isNumber = function (value) {
            var type = typeof value;
            return type === 'number' || type === 'undefined';
        };

        self.isEnable = function (type) {
            return self.options[type] && typeof self.options[type] === 'string';
        };

        self.switchPage = function (pageIndex) {
            self.options.currentPage = pageIndex;
            self.render();
        };

        self.fireEvent = function (pageIndex, type) {
            return (typeof self.options.onPageChange !== 'function') || (self.options.onPageChange(pageIndex, type) !== false);
        };

        self.callMethod = function (method, options) {
            switch (method) {
                case 'option':
                    self.options = $.extend({}, self.options, options);
                    self.verify();
                    self.render();
                    break;
                case 'destroy':
                    self.$container.empty();
                    self.$container.removeData('jqPaginator');
                    break;
                default :
                    throw new Error('[jqPaginator] method "' + method + '" does not exist');
            }

            return self.$container;
        };

        self.bindEvents = function () {
            var opts = self.options;

            self.$container.off();
            self.$container.on('click', '[jp-role]', function () {
                var $el = $(this);
                if ($el.hasClass(opts.disableClass) || $el.hasClass(opts.activeClass)) {
                    return;
                }

                var pageIndex = +$el.attr('jp-data');
                if (self.fireEvent(pageIndex, 'change')) {
                    self.switchPage(pageIndex);
                }
            });
        };

        self.init();

        return self.$container;
    };

    $.jqPaginator.defaultOptions = {
        wrapper: '',
        first: '<li class="first"><a href="javascript:;">First</a></li>',
        prev: '<li class="prev"><a href="javascript:;">Previous</a></li>',
        next: '<li class="next"><a href="javascript:;">Next</a></li>',
        last: '<li class="last"><a href="javascript:;">Last</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        totalPages: 0,
        totalCounts: 0,
        pageSize: 0,
        currentPage: 1,
        visiblePages: 7,
        disableClass: 'disabled',
        activeClass: 'active',
        onPageChange: null
    };

    $.fn.jqPaginator = function () {
        var self = this,
            args = Array.prototype.slice.call(arguments);

        if (typeof args[0] === 'string') {
            var $instance = $(self).data('jqPaginator');
            if (!$instance) {
                throw new Error('[jqPaginator] the element is not instantiated');
            } else {
                return $instance.callMethod(args[0], args[1]);
            }
        } else {
            return new $.jqPaginator(this, args[0]);
        }
    };

})(jQuery);
	$.jqPaginator('#pagination2', {
		totalPages: parseInt(getCookie("totalPages"))  ,
		visiblePages:parseInt(getCookie("visiblePages"))  ,
		currentPage: 1,
		first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
		prev: '<li class="prev"><a href="javascript:;">前一页</a></li>',
		next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
		last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
		page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
		onPageChange: function(num, type) {
			$('#p2').text(type + '：' + num);
			console.log(num);
			var cate_id = getUrlParam("nav_id")
			
			//获取二级页文章列表
			$.ajax({
				type: "post", //请求方式
				url: "http://ji.agampai.cn/api/home/pc/articlelist",
				dataType: "json",
				data: {
					cate_id,
					page:(num-1)
				}, //请求参数
				beforeSend: function() {
					//请求前的处理
				},
				success: function(res) {
					console.log(res);
					let cardList = res.data.list
					$("#contentList").empty()
					for (let index = 0; index < cardList.length; index++) {
						$("#contentList").append(
							"<div style='padding-bottom: 20px;margin-top:20px; border-bottom: 2px solid #F2F2F1;'><div class='yanji_content_tilte' onclick='todetail(" +
							cardList[index].id + ")'>" +
							cardList[index].title +
							"</div><div class='d-flex' style='margin-top: 10px;'><img src='" + cardList[index].thumbnail +
							"' style='width: 260px;height: 170px;margin-right: 20px;'><div class='d-flex flex-column position-relative py-3' style='width: 503px;'><div class='yanji_content'>" +
							cardList[index].description +
							"</div><div class='yanji_content_date position-absolute' style='bottom: 20px;left: 0;'>" + cardList[index].create_time +
							"</div></div></div></div>"
						)
					}
					$('body,html').animate({
					          scrollTop: 0
					        },
					       100);
				},
			})
		}
	});
});

function getUrlParam(id) {
	var regExp = new RegExp('([?]|&)' + id + '=([^&]*)(&|$)');
	var result = window.location.href.match(regExp);
	if (result) {
		return decodeURIComponent(result[2]);
	} else {
		return null;
	}

}
function leibiaoToDetail(cate_id){
	console.log(cate_id);
	window.location.href="erjiList.html?nav_id="+cate_id+"&shouye="+1
}
function xialashow(){
	console.log("dfasfesasdf");
	$("#xialaNav").toggleClass("d-none")
}

function tiaozhuan(index) {

	console.log(index);
	if (index == 1000) {
		window.location.href = "index.html"
	} else {
		window.location.href = "erjiList.html?nav_id=" + index
	}
}

function todetail(id) {
	window.location.href = "newsDetail.html?id=" + id + "&nav_id=" + getUrlParam('nav_id')
}

function shenduToDetail(id) {
	window.location.href = "newsDetail.html?id=" + id
}



function show() {
	console.log("当前是二级页面");

	var cate_id = getUrlParam("nav_id")
	console.log(cate_id);
	//获取二级页文章列表
	$.ajax({
		type: "post", //请求方式
		url: "http://ji.agampai.cn/api/home/pc/articlelist",
		dataType: "json",
		async: false,
		data: {
			cate_id
		}, //请求参数
		beforeSend: function() {
			//请求前的处理
		},
		success: function(res) {
			console.log("141234123");
			console.log(res);
			
				//新闻列表遍历
				let cardList = res.data.list
				visiblePages = res.data.totalpage
				totalPages = res.data.totalpage
				if(totalPages>5){
					setCookie("visiblePages",5)
					setCookie("totalPages",totalPages)
				}else{
					setCookie("visiblePages",visiblePages)
					setCookie("totalPages",totalPages)
				}
				
				
				// if(cardList.length>6){
				// 	var currentNum=6
				// }else{
				// 	var currentNum=cardList.length
				// }
				
				//新闻右边侧栏处理
				
				//最新新闻处理
				var zxxinwenList = res.data.newslist
				console.log("---------------------");
				console.log(zxxinwenList);
				$("#zuixinImg").attr("src", zxxinwenList[0].thumbnail)
				var zuixinnum
				if (zxxinwenList.length > 6) {
					zuixinnum = 6
				} else {
					zuixinnum = zxxinwenList.length
				}
				for (let index = 0; index < zuixinnum; index++) {
					$("#zuixinList").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" +
						zxxinwenList[index].id + "'>" + zxxinwenList[index]
						.title + " </a></div>")
				}
				//热点新闻处理 fabuswiper1
				var fabuList = res.data.hotnewslist
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
				
				for (let i = 4; i < 8; i++) {
					$("#fabuContentList").append("<div><span class='dian'>·</span><a class='diva' href='newsDetail.html?id=" +
						fabuList[i].id +
						"'>" + fabuList[i].title + "</a> </div>")
				}
				//深度处理
				var shenduList = res.data.shendulist
				console.log(shenduList);
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
				
				
				if(res.data.total!=0){
				for (let index = 0; index < cardList.length; index++) {
					$("#contentList").append(
						"<div style='padding-bottom: 20px;margin-top:20px; border-bottom: 2px solid #F2F2F1;'><div class='yanji_content_tilte' onclick='todetail(" +
						cardList[index].id + ")'>" +
						cardList[index].title +
						"</div><div class='d-flex' style='margin-top: 10px;'><img src='" + cardList[index].thumbnail +
						"' style='width: 257x !important;height: 170px;margin-right: 20px;'><div class='d-flex flex-column position-relative py-3' style='width: 503px;'><div class='yanji_content'>" +
						cardList[index].description +
						"</div><div class='yanji_content_date position-absolute' style='bottom: 20px;left: 0;'>" + cardList[index].create_time +
						"</div></div></div></div>"
					)
				}
				
				
				
				
				
				
			}else{
				$("#contentList").append("当前暂无数据")
			}
			
		console.log("show结束");


			//合作单位处理




		}
	})
}
