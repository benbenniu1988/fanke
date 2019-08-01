$(function () {
    // console.log("aa");

    $.get({
        url: "../server1/toubu.php",
        dataType: "json",
        success(res) {
            // console.log(res);
            let headerManager = new Headers(res);
            headerManager.init();
        }
    });

    class Headers {
        constructor(data) {
            this.data = data;
            this.ul = null;
        }
        init() {
            this.creatHtml();
            this.addEventMouseenter();
        }
        creatHtml() {
            // console.log(this.data);
            let olis1;
            let html = "";
            let htmlA = $("<div></div>").addClass("header");
            let oUl1 = $("<ul></ul>").addClass("nav1");

            this.data.forEach((items1) => {
                olis1 = $("<li></li>").html($("<a href='#'></a>").html(items1.nav1)).attr("data-class", `${items1.nav3}`);

                // console.log(olis1.attr("data-class"));
                if (olis1.attr("data-class") == "new") {
                    olis1.css("background", "url(../images/new.png) no-repeat top right");
                } else if (olis1.attr("data-class") == "hot") {
                    olis1.css("background", "url(../images/hot.png) no-repeat top right");
                } else {
                    olis1.css("background", "none");
                };

                let html1 = items1.nav2.map((items2) => {
                    return `<li><a href='#'>${items2}</a></li>`
                }).join("");
                let oUl2 = $("<ul></ul>").addClass("nav2").html(html1);
                olis1.append(oUl2);
                oUl1.append(olis1);
                this.ul = oUl1;
                // console.log(this.ul);
                html = `        
                            <div class="content">
                                <div class="headerTop">
                                <div class="headerTopLeft">
                                    <span>你好， 欢迎光临凡客诚品！ </span>
                                    <a href="#" class="login">登录</a>
                                    <a href="#" class="zhuce">注册</a>
                                    <a href="#" class="order">我的订单</a>
                                </div>
                                <div class="headerTopRight">
                                    <a href="#" class="gonggao">网站公告</a>
                                    <a href="" class="weixinBox">
                                        <span class="erweima"></span>
                                    </a>
                                    <a href="" class="weibo"></a>
                                </div>
                            </div>
                            <div class="headerMiddle">
                                <div class="searchBox">
                                    <div class="search fl">
                                        <input type="text" class="Enter fl">
                                        <input type="button" class="btn">
                                    </div>
                                    <div class="shoppingCar">
                                        <a href="#">购物车<span> (0) </span></a>
                                        <div class="carList"></div>
                                    </div>
                                    <ul class="hotList">
                                        <li><a href="">热门搜索：</a></li>
                                        <li><a href="">免烫衬衫</a></li>
                                        <li><a href="">羽绒服</a></li>
                                        <li><a href="">外套</a></li>
                                        <li><a href="">熊本能</a></li>
                                        <li><a href="">户外运动</a></li>
                                        <li><a href="">帆布鞋</a></li>
                                        <li><a href="">水柔棉</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="headerNav">
                                <i></i>
                            </div>
                        </div>`;
                htmlA.html(html);
            });
            $("body").append($("<div></div>").addClass("header").html(html));
            $(".headerNav").append(oUl1);
        }
        addEventMouseenter() {
            // console.log(this.ul.children().index());
            $(".nav1").on("mouseenter", "li", function () {
                // $(this).addClass("cur").siblings().removeClass("cur");
                $(this).children(".nav2").slideDown().parent().siblings().children(".nav2").slideUp().stop();

            });
            $(".nav1").on("mouseleave", "li", function () {
                $(this).children(".nav2").css("display", "none");
            });
            $(".weixinBox").hover(function () {
                $(this).children().addClass("active");
            }, function () {
                $(this).children().removeClass("active");
            })
        }
    }
})