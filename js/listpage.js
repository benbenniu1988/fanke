$(function () {
    $(".footer").append(new Footer().createHtml());
    let orderType = 0;

    getData(0);

    function getData(page) {
        $.ajax({
            type: "post",
            dataType: "json",
            data: `page=${page}&orderType=${orderType}`,
            url: "../server1/listpage1.php",
            success(res) {
                let html = res.data.map(items => {
                    return `<li data-title="${items.title}">
                                <div class="imgBox">
                                    <a href="../html/details.html?${items.id}&${items.title}"><img src="../imagesL1/${items.srcB}" alt=""></a>
                                    <div class="tehui">${items.price1}</div>
                                    <div class="details">
                                        <img src="../imagesL1/${items.srcB}" alt="">
                                        <p class="p11">${items.detail}</p>
                                        <p class="p22"><span>产品编号：</span>${items.id}</p>
                                        <p class="p33"><span>售价:￥${items.price1}</span><span>好评率</span></p>
                                        <h3>${items.talk}%</h3>
                                     </div>
                                </div>
                                <p class="p1"><a href="" alt="${items.detail}">${items.detail}</a></p>
                                <p class="p2"><span>售价￥</span><b>${items.price2}</b></p>
                            </li>`;
                }).join("");
                $(".listC").html(html);
            }
        });
    };


    //[2] 获取总页码
    $.ajax({
        type: "post",
        url: "../server1/getPageCount.php",
        dataType: "json",
        success: function (response) {
            let pageSize = response.data.count;
            var html = `<input type="button" class="pageGGsub20111226 get" value="">
                        <strong>页</strong>
                        <input type="text" id="bottompageindex" class="pageGGshuru20111226 jump" value="1">
                        <strong>到第</strong>
                        <em class="allpagesNumber20111226 pagecount" data-count="${pageSize}">共 ${pageSize} 页</em>
                        <span class="go"><a>下一页</a></span>
                        <ul>
                            <li class="currentpage20111226 count">1</li>
                        </ul>
                        <span class="back" style="background-position: 3px -1996px;"><a>上一页</a></span>`;
            $(".pageBox").html(html);
        }
    });

    let page = "";

    $(".pageBox").on("click", ".back", function () {
        page = $(".count").html()
        page--;
        if (page < 1) page = 1;
        $(".count").html(page);
        $(".jump").val(page)
        getData(page - 1);
    });

    $(".pageBox").on("click", ".go", function () {
        let count = $(".pagecount").data("count");
        page = $(".count").html();
        page++;
        if (page >= count) page = count;
        $(".count").html(page);
        $(".jump").val(page);
        getData(page - 1);
    });

    $(".pageBox").on("click", ".get", function () {
        let jumpPage = $.trim($(".jump").val());
        let count = $(".pagecount").data("count");

        if (jumpPage < 1) {
            jumpPage = 1;
            $(".jump").val(jumpPage);
        } else if (jumpPage > count) {
            jumpPage = count;
            $(".jump").val(jumpPage);
        };

        $(".count").html(jumpPage);
        getData(jumpPage - 1);
    });

    $(".listC").on("mouseenter", "li", function (e) {
        // console.log(this);

        $(this).children(".imgBox").addClass("current").parent().siblings().children(".imgBox").removeClass("current");
        // $(this).children(".imgBox").children(".details").addClass("active2").parents("li").siblings().children(".imgBox").children(".details").removeClass("active2");
        // // let left = e.offsetX;
        // console.log(e.offsetX);
        // console.log(e.clientX);

    });

    $(".listC").mouseleave(function () {
        $(this).children("li").children(".imgBox").removeClass("current");
    });

    $(".searchCol").on("click", "li", function (e) {
        e.preventDefault();
        let index = $(this).index();
        orderType = index;
        console.log(orderType);
        getData(0);
    });


});