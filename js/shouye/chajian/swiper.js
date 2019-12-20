$(function(){
	show()
})
function show(){
	
	new slideplayer("#slideplay", {
	    width: "376px",
	    height: "296px",
	    fontsize: "14px",
	    time: "5000"
	});
}
/*图片轮播*/
(function($) {
    slideplayer = function(object, config) {
        this.obj = object;
        this.n = 0;
        this.j = 0;
        var _this = this;
        var t;
        var defaults = {
            width: "690px",
            height: "389px",
            fontsize: "12px",
            right: "0px",
            bottom: "10px",
            time: "5000"
        };
        this.config = $.extend(defaults, config);
        this.count = $(this.obj + " li").size();

        // Download by http://www.codefans.net
        this.factory = function() {
            //元素定位
            $(this.obj).css({
                position: "relative",
                zIndex: "0",
                margin: "0",
                padding: "0",
               width: "690px",
               height: "389px",
                overflow: "hidden"
            });
            $(this.obj).prepend(
                "<div style='position:absolute;z-index:20;right:" +
                this.config.right +
                ";bottom:7px;display:flex;align-items:center;'></div>"
            );
            $(this.obj + " li")
                .css({
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "690px",
                    height: "389px",
                    overflow: "hidden"
                })
                .each(function(i) {
                    $(_this.obj + " div").append("<a>" + (i + 1) + "</a>");
                });
            $(this.obj + " img").css({
                border: "none",
                width: "690px",
                height: "389px"
            });
            this.resetclass(this.obj + " div a", 0);
            //标题背景
            $(this.obj).prepend("<div class='dkTitleBg'></div>");
            $(this.obj + " .dkTitleBg").css({
                position: "absolute",
                margin: "0",
                padding: "0",
                zIndex: "1",
                bottom: "0",
                left: "0",
                width: "100%",
                height: _this.height,
                background: "#cc0055",
                overflow: "hidden"
            });
            //插入标题
            $(this.obj).prepend("<div class='dkTitle'></div>");
            $(this.obj + " p").each(function(i) {
                $(this)
                    .appendTo($(_this.obj + " .dkTitle"))
                    .css({
                        position: "absolute",
                        margin: "0",
                        padding: "0",
                        zIndex: "2",
                        bottom: "0",
                        left: "0",
                        width: "100%",
                        height: "50px",
                        lineHeight: "50px",
                        textIndent: "10px",
                        textDecoration: "none",
                        fontSize: _this.size,
                        color: "#FFFFFF",
                        background: "#000",
                        opacity: "0.6",
                        overflow: "hidden"
                    });
                if (i != 0) {
                    $(this).hide();
                }
            });
            this.slide();
            this.addhover();
            t = setInterval(this.autoplay, this.config.time);
        };
        //图片渐影
        this.slide = function() {
            $(this.obj + " div a").mouseover(function() {
                _this.j = $(this).text() - 1;
                _this.n = _this.j;
                if (_this.j >= _this.count) {
                    return;
                }
                $(_this.obj + " li:eq(" + _this.j + ")")
                    .fadeIn("200")
                    .siblings("li")
                    .fadeOut("200");
                $(_this.obj + " .dkTitle p:eq(" + _this.j + ")")
                    .show()
                    .siblings()
                    .hide();
                _this.resetclass(_this.obj + " div a", _this.j);
            });
        };
        //滑过停止
        this.addhover = function() {
            $(this.obj).hover(
                function() {
                    clearInterval(t);
                },
                function() {
                    t = setInterval(_this.autoplay, _this.config.time);
                }
            );
        };
        //自动播放
        this.autoplay = function() {
            _this.n = _this.n >= _this.count - 1 ? 0 : ++_this.n;
            $(_this.obj + " div a")
                .eq(_this.n)
                .triggerHandler("mouseover");
        };
        //翻页函数
        this.resetclass = function(obj, i) {
            $(obj).css({
                float: "left",
                marginRight: "5px",
                width: "16px",
                height: "16px",
                lineHeight: "16px",
                textAlign: "center",
                fontWeight: "800",
                fontSize: "12px",
                color: "#000",
                background: "#FFFFFF",
                cursor: "pointer",
				
            });
            $(obj)
                .eq(i)
                .css({
                    color: "#FFFFFF",
                    background: "#ff5400",
                    textDecoration: "none",
					fontSize: "22px",
					width: "30px",
					height: "30px",
					lineHeight: "30px",
                });
        };
        this.factory();
    };
})(jQuery);


