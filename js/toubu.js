class Headers {

    constructor(data) {
        this.data = [{
            "nav1": "首页",
            "nav2": [],
            "nav3": "",
        }, {
            "nav1": "衬衫",
            "nav2": ["免烫", "易打理", "休闲", "高支", "法兰绒", "牛津纺", "麻棉麻棉", "水洗棉", "泡泡纱", "商务衬衫"],
            "nav3": "hot",
        }, {
            "nav1": "T恤",
            "nav2": ["本广", "李翔伟", "张广先", "药", "长场雄", "创可贴", "周南", "山鸟叔", "简鱼", "欧飞鸿", "好小猪", "剪纸猪", "赵老师的猪",
                "熊本熊", "水柔棉T", "运动T恤", "POLO"
            ],
            "nav3": "new",
        }, {
            "nav3": "",
            "nav1": "卫衣",
            "nav2": ["熊本熊", "开衫", "连帽", "圆领", "水柔棉"]
        }, {
            "nav3": "",
            "nav1": "外套",
            "nav2": ["运动户外", "皮肤衣", "西服", "C9设计款", "夹克", "nautilus", "大衣", "羽绒服"]
        }, {
            "nav3": "",
            "nav1": "针织衫",
            "nav2": ["空调衫", "棉线衫", "羊毛衫"]
        }, {
            "nav3": "",
            "nav1": "裤装",
            "nav2": ["针织裤", "休闲裤", "牛仔裤", "运动裤", "沙滩裤"]
        }, {
            "nav3": "",
            "nav1": "鞋",
            "nav2": ["复古跑鞋", "帆布鞋", "休闲鞋", "运动鞋", "皮鞋", "凉鞋"]
        }, {
            "nav3": "",
            "nav1": "家居配饰",
            "nav2": ["内衣袜品", "床品套件", "被子", "枕", "家居服", "家居鞋", "背提包", "拉杆箱", "皮带钱包", "手机壳"]
        }, {
            "nav3": "",
            "nav1": "特惠",
            "nav2": []
        }];
        this.ul = null;
        // this.username = store.get("name");
        this.password = null;
    }
    init() {
        this.creatHtml();
        this.addEventMouseenter();
    }
    creatHtml() {


        let olis1;
        let html = "";
        let htmlA = $("<div></div>").addClass("header");
        let oUl1 = $("<ul></ul>").addClass("nav1");

        this.data.forEach((items1) => {
            olis1 = $("<li></li>").html($("<a href='#'></a>").html(items1.nav1)).attr("data-class", `${items1.nav3}`);
            if (olis1.attr("data-class") == "new") {
                olis1.css("background", "url(../images/new.png) no-repeat 64px 17px");
            } else if (olis1.attr("data-class") == "hot") {
                olis1.css("background", "url(../images/hot.png) no-repeat 66px 17px");
            } else {
                olis1.css("background", "none");
            };

            let html1 = items1.nav2.map((items2) => {
                return `<li><a href='${items2=="空调衫"?"../html/listpage.html":""}'>${items2}</a></li>`
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
                                    <a href="../html/login.html" class="login">登录</a>
                                    <a href="../html/registe.html" class="zhuce">注册</a>
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

        $("body").prepend($("<div></div>").addClass("header").html(html));

        let username = store.get("username");
        console.log(username);
        if (username) {
            $(".headerTopLeft").empty();
            $(".headerTopLeft").append($("<span></span>").html(`你好 ${username} 欢迎光临`)).append($("<a href='' class='logout'></a>").html("登出"))
        }

        $(".headerNav").append(oUl1);
    }
    addEventMouseenter() {
        $(".nav1").on("mouseenter", "li", function () {
            $(this).children(".nav2").slideDown().parent().siblings().children(".nav2").slideUp().stop();
        });

        $(".nav1").on("mouseleave", "li", function () {
            $(this).children(".nav2").css("display", "none");
        });

        $(".weixinBox").hover(function () {
            $(this).children().addClass("active");
        }, function () {
            $(this).children().removeClass("active");
        });

        $(".logout").click(function () {
            store.clear();
        })
    }
};