$(function () {
    // console.log("aa");
    $(".weixinBox").hover(function () {
        $(".weixinBox").children().addClass("active");
    }, function () {
        $(".weixinBox").children().removeClass("active");
    });

})