$(function () {
    let date = new Date(2019, 7, 1, 22, 00, 00);
    let miaoSha = $("<div></div>").addClass("qianggouT")
    let timeTemp = "";
    let timer = setInterval(function () {
        let date1 = new Date();
        let res = (date - date1) / 1000;
        let time = secChang(res);
        console.log(res);
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


    let oUl = $("<ul></ul>");
    $.get({
        url: "../server1/qianggou.php",
        dataType: "json",
        success(items) {
            console.log(items.data);
            let html = items.data.map((items1) => {
                return ` <li>
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
            }).join("");
            oUl.html(html);
        }
    });
    $("<div></div>").addClass("qianggouB").append(oUl);
    // console.log($("<div></div>").addClass("qianggouB").append(oUl)[0]);
    $(".qianggou").append(miaoSha).append($("<div></div>").addClass("qianggouB").append(oUl));

})