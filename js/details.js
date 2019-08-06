$(function () {
    // $(".footer").append(new Footer().createHtml());
    let oImgSBox = $(".imgSBox");
    let oImg = $(".imgBox").children("img");

    let oImgBox = $(".imgBox");
    let oImgH = $(".imgH");
    let shadow = $(".shadow");
    let oImgHBox2 = $(".imgHBox2");

    oImgSBox.on("mouseenter", "li", function () {
        let src = $(this).children("img")[0].src;
        // console.log(src);
        oImg[0].src = src;
        oImgH[0].src = src;
    });

    oImgBox.hover(function () {
        // console.log("aa");
        $(this).children().addClass("active");
    }, function () {
        // console.log("bb");
        $(this).children().removeClass("active");

    });

    oImgBox.mousemove(function (e) {
        e = e || window.event;
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
    })

})