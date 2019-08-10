    $(function () {
        $(".footer").append(new Footer().createHtml());

        $(".logout").click(function () {
            store.clear();
        })

        let url = location.search;
        let urlT = url.slice(1);
        let querryID = urlT.split("&")[0];
        // console.log(querryID);
        let querryTitle = decodeURI(urlT.split("&")[1])
        // console.log(querryTitle);

        getDetails(querryID, querryTitle);

        let priceID;
        let num = 1;


        let oImgSBox = $(".imgSBox");
        let oImgBox = $(".imgBox");
        oImgSBox.on("mouseenter", "li", function () {
            let src = $(this).children("img")[0].src;
            oImg = oImgBox.children("img");
            oImgH = $(".imgH");
            oImg[0].src = src;
            oImgH[0].src = src;
            $(this).children("img").addClass("cur").parent().siblings().children("img").removeClass("cur")
        });

        oImgBox.hover(function () {
            $(this).children().addClass("active");
        }, function () {
            $(this).children().removeClass("active");
        });

        oImgBox.mousemove(function (e) {
            e = e || window.event;
            let oImgBox = $(".imgBox");
            let shadow = $(".shadow");
            let oImgHBox2 = $(".imgHBox2");
            let oImgH = $(".imgH");

            let oLeft = e.clientX - oImgBox[0].offsetLeft - shadow[0].offsetWidth / 2;
            let oTop = e.clientY - oImgBox[0].offsetTop - shadow[0].offsetHeight / 2;
            if (oLeft < 0) oLeft = 0;
            if (oTop < 0) oTop = 0;

            let oLeftMax = oImgBox[0].offsetWidth - shadow[0].offsetWidth;
            if (oLeft > oLeftMax) oLeft = oLeftMax;

            let oTopMax = oImgBox[0].offsetHeight - shadow[0].offsetHeight;
            if (oTop > oTopMax) oTop = oTopMax;

            shadow[0].style.left = oLeft + "px";
            shadow[0].style.top = oTop + "px";

            let oImgHLeft = oLeft * (oImgH[0].offsetWidth - oImgHBox2[0].offsetWidth) / oLeftMax;
            let oImgHTop = oTop * (oImgH[0].offsetHeight - oImgHBox2[0].offsetHeight) / oTopMax;

            //因为鼠标向左走，大图向右走，鼠标向下走，大图向上走，即鼠标方向和大图的方向刚好相反，所以取负值；
            oImgH[0].style.left = -oImgHLeft + "px";
            oImgH[0].style.top = -oImgHTop + "px";
        });

        let color = $(".color2");
        color.on("click", "li", function () {
            // console.log(this);
            // console.log($(this).data("id"), $(this).data("title"));
            querryID = $(this).data("id");
            console.log(querryID);

            let querryTitle = $(this).data("title");
            $(this).addClass("cur1").siblings().removeClass("cur1");
            getDetailsImg(querryID);
        });

        let size = $(".size1");
        let choose = $(".chooseC");
        let tips = $(".tips");

        size.on("click", "li", function () {
            let choose = $(".chooseC")
            $(this).addClass("active1").siblings().removeClass("active1");
            tips.css("display", "none");
            sizeHtml = $(this).html();
            let sizeT = $(this).html();
            choose.html(sizeT);
        });

        let buynow = $(".buynow");
        buynow.click(function (e) {
            e.preventDefault();
            // console.log(sizeHtml);
            // console.log(querryID);
            if ($(".active1").length == 0) {
                tips.css("display", "block");
            } else if ($(".active1").length == 1) {
                // e.preventDefault();
                console.log(sizeHtml);
                console.log(querryID);
                console.log(priceID);
                console.log(num);

                $.ajax({
                    type: "post",
                    url: "../server1/add2Car.php",
                    dataType: "json",
                    data: `id=${querryID}&size=${sizeHtml}&price=${priceID}&num=${num}`,
                    success(res) {
                        let text = res["totalRow"];
                        let price = res["totalPrice"];
                        console.log(text);
                        console.log(price);

                        // $("#shopcarcount").html(text);
                        // $("#shopcarprice").html(`￥${price}`);
                    }
                });
                // location.href = `../html/shoppingCar.html`;
            }
        });

        let add2Car = $(".add2car");
        let carbox = $(".carbox")
        add2Car.click(function (e) {
            e.preventDefault()
            if ($(".active1").length == 0) {
                tips.css("display", "block");
            } else if ($(".active1").length == 1) {
                console.log(carbox);
                carbox.addClass("current");
            }
            // console.log(sizeHtml);
            // console.log(querryID);
            // console.log(priceID);
            // console.log(num);
            $.ajax({
                type: "post",
                url: "../server1/add2Car.php",
                dataType: "json",
                data: `id=${querryID}&size=${sizeHtml}&price=${priceID}&num=${num}`,
                success(res) {
                    let text = res["totalRow"];
                    let price = res["totalPrice"];
                    console.log(text);
                    console.log(price);
                    $("#shopcarcount").html(text);
                    $("#shopcarprice").html(`￥${price}`);
                }
            });

        });

        let close = $(".close1");
        close.click(function () {
            console.log("close");
            carbox.removeClass("current");
        });

        let go_on = $(".go_on");
        go_on.click(function (e) {
            e.preventDefault();
            carbox.removeClass("current");
        })

        let select = $("#selectedCount");
        select.change(function () {
            num = select.val();
        });


        // let goCar = $(".goCar");
        // goCar.click(function (e) {
        //     // console.log("11");

        // })










        function getDetailsImg(ID) {
            $.ajax({
                type: "post",
                url: "../server1/listpage.php",
                dataType: "json",
                success(res) {
                    let htmlH2 = "";
                    let htmlImgSBox = "";
                    let htmlImgBox = "";

                    res.data.forEach(items => {
                        if (items.id == ID) {
                            // console.log(items);
                            priceID = items.price1;
                            htmlH2 = `<h2 class="h2">${items.detail}</h2>`
                            htmlImgSBox = `<li><img src="../imagesL1/${items.srcS1}" alt=""></li>
                                   <li><img src="../imagesL1/${items.srcS2}" alt=""></li>
                                   <li style="${items.srcS3 == "" ? "display:none" : "dispaly:block"}"><img src="../imagesL1/${items.srcS3}" alt=""></li>
                                   <li style="${items.srcS3 == "" ? "display:none" : "dispaly:block"}"><img src="../imagesL1/${items.srcS4}" alt=""></li>
                                   <li style="${items.srcS3 == "" ? "display:none" : "dispaly:block"}"><img src="../imagesL1/${items.srcS5}" alt=""></li>`;
                            htmlImgBox = `<img src="../imagesL1/${items.srcB}" alt="">
                                        <div class="shadow"></div>
                                   <div class="imgHBox2">
                                        <img src="../imagesL1/${items.srcB}" class="imgH" alt="">
                                   </div>`;
                            // choose = `<span class="choosed">已选：</span><span class="chooseC">${items.size}</span><span class="youhuo">现在有货</span>`;

                        };
                    });
                    $(".h2").html(htmlH2);
                    $(".imgSBox").html(htmlImgSBox);
                    $(".imgBox").html(htmlImgBox);
                }
            });

        }

        function getDetails(ID, Title) {
            $.ajax({
                type: "post",
                url: "../server1/listpage.php",
                dataType: "json",
                success(res) {
                    // console.log(res.data);
                    let htmlH2 = "";
                    let htmlImgColor = "";
                    let htmlImgSBox = "";
                    let htmlImgBox = "";
                    let dRT = "";
                    let choose = "";
                    let size = "";
                    res.data.forEach(items => {

                        if (items.id == ID) {
                            // console.log(items);
                            priceID = items.price1;
                            htmlH2 = `<h2 class="h2">${items.detail}</h2>`
                            htmlImgSBox = `<li><img src="../imagesL1/${items.srcS1}" alt=""></li>
                                   <li><img src="../imagesL1/${items.srcS2}" alt=""></li>
                                   <li style="${items.srcS3 == "" ? "display:none" : "dispaly:block"}"><img src="../imagesL1/${items.srcS3}" alt=""></li>
                                   <li style="${items.srcS3 == "" ? "display:none" : "dispaly:block"}"><img src="../imagesL1/${items.srcS4}" alt=""></li>
                                   <li style="${items.srcS3 == "" ? "display:none" : "dispaly:block"}"><img src="../imagesL1/${items.srcS5}" alt=""></li>`;
                            htmlImgBox = `<img src="../imagesL1/${items.srcB}" alt="">
                                        <div class="shadow"></div>
                                   <div class="imgHBox2">
                                        <img src="../imagesL1/${items.srcB}" class="imgH" alt="">
                                   </div>`;
                            dRT = `<span>特惠价：￥</span><b>${items.price1}</b><a href="">充100返100，点击充值</a>`;
                            choose = `<span class="choosed">已选：</span><span class="chooseC">${items.color}</span><span class="youhuo">现在有货</span>`;
                            size = `<li style="${items.size1 == "" ? "display:none" : "display:block"}">${items.size1}</li>
                            <li style="${items.size2 == "" ? "display:none" : "display:block"}">${items.size2}</li>
                            <li style="${items.size3 == "" ? "display:none" : "display:block"}">${items.size3}</li>`
                        };

                        if (items.title == Title) {
                            // console.log(items);
                            // console.log(items.srcB);
                            htmlImgColor += `<li data-id="${items.id}" data-title="${items.title}"><img src="../imagesL1/${items.srcB}" alt=""><span>${items.color}</span></li>`;
                        }
                    });
                    // console.log(htmlImgColor);
                    $(".h2").html(htmlH2);
                    // console.log($(".color2")[0]);
                    $(".imgSBox").html(htmlImgSBox);
                    $(".size1").html(size);
                    $(".imgBox").html(htmlImgBox);
                    $(".color2").html(htmlImgColor);
                    $(".dRT").html(dRT);
                    $(".choose").html(choose);
                }
            });
        };

    })