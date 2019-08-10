$(function () {

    let targetData;
    let num;
    let numCount;
    getCatHtml();

    let username = store.get("username");
    if (username) {
        $(".welcome").empty();
        $(".welcome").append($("<span></span>").html(`你好 ${username}，欢迎光临`)).append($("<a href='' class='logout'></a>").html("    登出"))
    }

    $(".logout").click(function () {
        store.clear();
    })




    let tbody = $("#supplier-general-product_tb");
    tbody.on("click", ".del", function (e) {
        // e.preventDefault();
        let id = $(this).parents("tr").data("id");
        console.log(id);
        $.ajax({
            url: "../server1/removeShoppingCar.php",
            type: "post",
            data: `id=${id}`,
            dataType: "json",
            success(res) {}
        });
    });

    // let count = $(".count1");

    tbody.on("click", ".add", function () {
        add($(this), 1);
    });




    tbody.on("click", ".sub", function () {
        sub($(this), 1);
    });


    tbody.on("focus", ".count1", function () {
        num1 = $(this).val() * 1
    })



    tbody.on("blur", ".count1", function () {
        let numB = $(this).val() * 1;
        let id = $(this).parents("tr").data("id");
        // console.log(numB);
        // console.log(num1);
        if (numB > num1) {
            let n = numB - num1;
            numCount = numCount + n;
            // if (numCount < 1) {
            //     numCount = 1;
            // }
            $(".count").html(numCount);


            // add($(this).next(), n);
            $.ajax({
                type: "post",
                url: "../server1/add2Car.php",
                dataType: "json",
                data: `id=${id}&num=${num}`,
                success(res) {
                    // console.log(res);
                }
            });
            let priceT = ($(this).parents("tr").children(".priceT").html()).slice(1) * 1;
            let priceTotal = priceT * num;
            $(this).parents("tr").children(".subtotal").html(priceTotal);
            $(".amount").html(($(".amount").html() * 1) + priceT);


        } else if (numB < num1) {
            let n = num1 - numB
            numCount = numCount - n;
            if (numCount < 1) {
                numCount = 1;
            }
            $(".count").html(numCount);

            // sub($(this).next(), n);
            $.ajax({
                type: "post",
                url: "../server1/upData.php",
                dataType: "json",
                data: `id=${id}&num=${num}`,
                success(res) {
                    // console.log(res);
                }
            });
            let priceT = ($(this).parents("tr").children(".priceT").html()).slice(1) * 1;
            let priceTotal = priceT * num;
            $(this).parents("tr").children(".subtotal").html(priceTotal);
            $(".amount").html(($(".amount").html() * 1) - priceT);
        };
    });






    tbody.on("click", ".ckBox", function () {
        let check = Number($(this).is(":checked"));
        let id = $(this).parents("tr").data("id");
        $.ajax({
            type: "post",
            url: "../server1/upDateCheck.php",
            data: `ischeck=${check}&id=${id}`,
            dataType: "json",
            success(res) {
                getCatHtml();
            }
        });
    });



    $("#all-ckb-bt").click(function () {
        // let check = Number($(this).is(":checked"));
        $(".ckBox").prop("checked", $(this).is(":checked"))
    });






    function sub(items, n) {
        numCount = numCount - n;
        if (numCount < 1) {
            numCount = 1;
        }
        $(".count").html(numCount);
        num = items.siblings(".count1").val() * 1;
        num = num - n;
        // console.log(num);
        if (num >= 1) {
            items.siblings(".count1").val(num);
            // console.log(num);
            id = items.parents("tr").data("id");
            console.log(id);
            $.ajax({
                type: "post",
                url: "../server1/upData.php",
                dataType: "json",
                data: `id=${id}&num=${num}`,
                success(res) {
                    // console.log(res);
                }
            });
            let priceT = (items.parents("tr").children(".priceT").html()).slice(1) * 1;
            let priceTotal = priceT * num;
            items.parents("tr").children(".subtotal").html(priceTotal);
            $(".amount").html(($(".amount").html() * 1) - priceT);
        } else {
            num = 1;
        }

    }



    function add(items, n) {

        numCount = numCount * 1 + n;
        $(".count").html(numCount);
        num = items.siblings(".count1").val() * 1;
        num = num + n;
        items.siblings(".count1").val(num);
        // num = $(this).siblings(".count1").val();
        id = items.parents("tr").data("id");
        console.log(id);

        $.ajax({
            type: "post",
            url: "../server1/add2Car.php",
            dataType: "json",
            data: `id=${id}&num=${num}`,
            success(res) {
                // console.log(res);
            }
        });
        let priceT = (items.parents("tr").children(".priceT").html()).slice(1) * 1;
        let priceTotal = priceT * num;
        items.parents("tr").children(".subtotal").html(priceTotal);
        $(".amount").html(($(".amount").html() * 1) + priceT);

    }



    function getCatHtml() {
        $.ajax({
            type: "get",
            url: "../server1/getCarData.php",
            dataType: "json",
            success(data) {
                targetData = data;
                // console.log(targetData);
                // console.log(data);

                let html = data.map(items => {
                    num = items.num;
                    /* 根据数据来渲染页面 */
                    return `<tr data-id="${items.id}">
                                <td class="white bd-left">&nbsp;</td>
                                <td class="bar" rowspan="1">
                                    <input type="checkbox" class="track ckb ckBox" name="p-item" ${items.ischeck == 1 ? "checked" : ""}>
                                </td>
                                <td class="image" rowspan="1">
                                    <a target="_blank" href="">
                                        <img alt="${items.title}" src="../imagesL1/${items.srcB}">
                                    </a>
                                </td>
                                <td class="name">
                                    <a target="_blank" href="" title="${items.title}">${items.detail}<br></a>
                                    <div style="float: right; width: 36%"></div>
                                </td>
                                <td class="size">
                                    <a target="_blank" title="${items.title}">${items.size}</a>
                                </td>
                                <td class="presentpoints" style="display: none">78分</td>
                                <td class="priceT">￥${items.price}</td>
                                <td class="qty">
                                    <div class="qtyBox">
                                        <b class="sub">-</b>
                                        <input type="text" value="${items.num}" class="count1">
                                        <b class="add">+</b>
                                    </div>
                                </td>
                                <td>-</td>
                                <td class="subtotal">￥${items.total}</td>
                                <td class="operate">
                                    <a class="del track" name="sp_cart_mycart_del" href="">删除</a>
                                </td>
                                <td class="white bd-right">&nbsp;</td>
                            </tr>`;
                }).join("");
                tbody.html(html);
                getTotalPrice();
                getTotalNum();
                num = $(".count1").attr("value");
            }
        })
    };

    function getTotalPrice() {
        let res = 0;
        targetData.forEach(items => {
            if (items.ischeck == 1) {
                res += items.total * 1
            }
        });
        $(".amount").html(`${res}`);
    }


    function getTotalNum() {
        let res = 0;
        targetData.forEach(items => {
            if (items.ischeck == 1) {
                res += items.num * 1;
                numCount = res;
            }
            $(".count").html(numCount);
        })
    }
})