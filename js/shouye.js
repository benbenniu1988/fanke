$(function () {
    let date = new Date(2019, 7, 1, 22, 00, 00);
    let miaoSha = $("<div></div>").addClass("qianggouT")
    let timeTemp = "";
    let timer = setInterval(function () {
        let date1 = new Date();
        let res = (date - date1) / 1000;
        let time = secChang(res);
        // console.log(res);
        timeTemp = `<span class="timeStatus">距离秒杀还有</span>
                    <span class="hour">${time.hours}</span>
                    <span class="mins">${time.mins}</span>
                    <span class="secs">${time.secs}</span>`;
        miaoSha.html(timeTemp);

        if (res <= 0) {
            clearInterval(timer);
            $(".timeStatus").html("秒杀正在进行");
            $(".hour").html("00");
            $(".mins").html("00");
            $(".secs").html("00");
        }
    }, 1000);

    function secChang(num) { //接收一个秒数，转成：xx天xx时xx分xx秒
        var sec = Math.floor(num % 60); //秒数
        var min = Math.floor(num / 60) % 60; //分
        var hour = Math.floor(num / 60 / 60) % 24; //小时
        var day = Math.floor(num / 60 / 60 / 24); //天数
        if (sec < 10) sec = "0" + sec;
        if (min < 10) min = "0" + min;
        if (hour < 10) hour = "0" + hour;
        if (day < 10) day = "0" + day;
        return {
            days: day,
            hours: hour,
            mins: min,
            secs: sec
        };
    };



    $.get({
        url: "../server1/shouye.php",
        dataType: "json",
        success(items) {
            console.log(items.data);
            $(".qianggou").append(miaoSha).append(new QiangGou(items.data).creatHtml());
            $("body").append(new ListManager(items.data, "上新", "shangxinBox", "shangxinT", "shangxinB", "container1").creatHtml());
            $("body").append(new ListManager(items.data, "明星商品", "mingxinBox", "mingxingT", "mingxingB", "container2").creatHtml());
            $("body").append(new ListManager(items.data, "清凉专场", "qingliangBox", "qingliangT", "qingliangB", "container3").creatHtml());
            $("body").append(new Youxuan(items.data).createHtml());
            $("body").append(new XiaZhuang(items.data).creatHtml());
        }
    });

    class QiangGou {
        constructor(data) {
            this.data = data;
        }
        creatHtml() {
            let oDiv = $("<div></div>").addClass("qianggouB");
            let oUl = $("<ul></ul>");
            let html = "";
            this.data.forEach((items1) => {

                if (items1.type == "抢购专场") {
                    // console.log(items1);
                    html += ` <li>
                                    <a href="">
                                        <img src="../images/${items1.src}" alt="">
                                        <p>${items1.title}</p>
                                        <div class="priceBox">
                                            <span class="price1">￥${items1.price1}</span>
                                            <span class="price2">￥${items1.price2}</span>
                                            <span class="price3">充值后<b> ${items1.price3}</b>元</span>
                                        </div>
                                    </a>
                                </li>`
                };
            });
            oUl.html(html);
            oDiv.append(oUl);
            // console.log(oDiv[0]);
            return oDiv;
        }
    };

    class ListManager {
        constructor(data, type, className1, className2, className3, className4) {
            this.data = data;
            this.type = type;
            this.className1 = className1;
            this.className2 = className2;
            this.className3 = className3;
            this.className4 = className4;
        }
        creatHtml() {
            let oDiv = $("<div></div>").addClass(this.className1);
            let oDivT = $("<div></div>").addClass(this.className2);
            let oDivB = $("<div></div>").addClass(this.className3);
            let oDivB1 = $("<div></div>").addClass(this.className4);
            let html = "";
            this.data.forEach((items1) => {
                if (items1.type == this.type) {
                    // console.log(items1);
                    html += `<a href="#"><img src="../images/${items1.src}" alt="${items1.title}" data-p1="${items1.price1}" data-p2="${items1.price2}" data-p3="${items1.price3}" data-id="${items1.id}"></a>`;
                };
            });
            oDivB1.html(html);
            oDivB.append(oDivB1);
            oDiv.append(oDivT).append(oDivB);
            return oDiv;
        }
    };

    class Youxuan {
        constructor(data) {
            this.data = data;
        }
        createHtml() {
            let oDiv = $("<div></div>").addClass("youxuan");
            let arrT = [];
            this.data.forEach((items1) => {
                if (items1.type == "优选推荐") {
                    arrT.push(items1);
                };
            });
            let html = `<h2>优选推荐</h2>
                        <div class="yxL">
                            <img src="../images/${arrT[0].src}" alt="" data-id="${arrT[0].id}">
                            <span class="sL">${arrT[0].title}</span><span class="sR">充值购买更优惠</span>
                        </div>
                        <div class="yxM">
                            <div class="yxMT">
                                <img src="../images/${arrT[1].src}" alt="" data-id="${arrT[1].id}">
                                <span class="sL">${arrT[1].title}</span><span class="sR">充值购买相当于69元</span>
                            </div>
                            <div class="yxMB">
                                <img src="../images/${arrT[2].src}" alt="" data-id="${arrT[2].id}>
                                <span class="sL">${arrT[2].title}</span><span class="sR">充值购买相当于19元起</span>
                            </div>
                        </div>
                        <div class="yxR">
                            <img src="../images/${arrT[3].src}" alt="" data-id="${arrT[3].id}>
                            <span class="sL">${arrT[3].title}</span><span class="sR">充值购买相当于19元起</span>
                        </div>
                        <div class="yxL">
                            <img src="../images/${arrT[4].src}" alt="" data-id="${arrT[4].id}">
                            <span class="sL">${arrT[4].title}</span><span class="sR">充值购买更优惠</span>
                        </div>
                        <div class="yxM">
                            <div class="yxMT">
                                <img src="../images/${arrT[5].src}" alt="" data-id="${arrT[5].id}">
                                <span class="sL">${arrT[5].title}</span><span class="sR">充值购买相当于69元</span>
                            </div>
                            <div class="yxMB">
                                <img src="../images/${arrT[6].src}" alt="" data-id="${arrT[6].id}>
                                <span class="sL">${arrT[6].title}</span><span class="sR">充值购买相当于19元起</span>
                            </div>
                        </div>
                        <div class="yxR">
                            <img src="../images/${arrT[7].src}" alt="" data-id="${arrT[7].id}>
                            <span class="sL">${arrT[7].title}</span><span class="sR">充值购买相当于19元起</span>
                        </div>`;
            oDiv.html(html);
            // console.log(oDiv[0]);
            return oDiv;
        }
    };

    class XiaZhuang {
        constructor(data) {
            this.data = data;
        }
        creatHtml() {
            let oDiv = $("<div></div>").addClass("xiazhuang");
            let oH1 = $("<h1></h1>").html("下装推荐");
            let oDiv1 = $("<div></div>").addClass("xiazhuangBox");
            let oUl = $("<ul></ul>")
            let html = "";
            this.data.forEach(items => {
                if (items.type == "下装推荐") {
                    html += `<li>
                                <a href="">
                                    <img src="../images/${items.src}" alt="" data-id="${items.id}">
                                    <span>${items.title}</span><span>充值购买相当于69元起</span>
                                </a>
                             </li>`;
                };
                oUl.html(html);
            });
            oDiv.append(oH1).append(oDiv1.append(oUl));
            console.log(oDiv[0]);

            return oDiv;
        }
    }



})