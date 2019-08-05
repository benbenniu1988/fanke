$(function () {
    $(".login").append(new Footer().createHtml());
    let phoneReg = /^1[3-9][0-9]{9}$/;

    let tab = $(".tabBox1");
    let phoneN = $("#username");
    let passwordN = $("#password");
    let loginN = $("#vanclLogin");

    let phoneQ = $("#phoneNum");
    let sendMsg = $(".sendMsg");
    let imgCode = $("#imgCode");
    let clear = $(".clear");
    let phoneMsg = $("#phoneMsg");
    let loginQ = $(".loginBtn");

    let imgCodeText = "";
    let code = "";
    /* 验证码处理 */
    (new CaptchaMini({
        fontSize: 60
    })).draw(document.querySelector('#captcha'), r => {
        // console.log(r, '验证码1');
        imgCodeText = r.toLowerCase();
    });
    console.log(imgCodeText);

    tab.on("click", "li", function () {
        let index = $(this).index() + 1;
        $(this).addClass("on").siblings().removeClass("on");
        $(".mainR").children().eq(index).addClass("active").siblings().removeClass("active");
    });

    // 普通登录
    phoneN.blur(function () {
        let text = $.trim($(this).val());
        phoneNText = text;
        if (text.length == 0) {
            alert("请输入用户名");
        } else if (!phoneReg.test(text)) {
            $(this).nextAll("span").css("display", "block").html("请输入正确的电话号码");
        };
    });

    passwordN.blur(function () {
        let text = $.trim($(this).val());
        passwordNText = text;
        if (text.length == 0) {
            $(this.nextAll("span").html("请输入密码"));
        };
    });

    loginN.click(function () {
        // e.preventDefault();
        console.log(phoneNText);
        console.log(passwordNText);
        $.ajax({
            type: "post",
            url: "../server1/loginN.php",
            dataType: "json",
            data: `username=${phoneNText}&password=${passwordNText}`,
            success(res) {
                console.log(res);
                if (res.status == "error") {
                    alert(`${res.msg}`);
                } else {
                    store.set("username", phoneNText);
                    store.set("password", passwordNText);
                    location.href = "../html/shouye.html";
                }
            }
        });

    });

    // 快速登录
    phoneQ.blur(function () {
        let text = $.trim($(this).val());
        phoneQText = text;
        if (text.length == 0) {
            $(this).nextAll(".msgCodeText").addClass("cur").html("手机号码不能为空");
        } else if (!phoneReg.test(text)) {
            $(this).nextAll(".msgCodeText").addClass("cur").html("手机号码输入有误，请重新输入");
        } else {
            $(this).addClass("got");
        }
    });

    sendMsg.click(function () {
        if (phoneQ.hasClass("got")) {
            code = getRandomMsg();
            console.log(code);
        } else {
            $(this).nextAll(".msgCodeText").addClass("cur").html("手机号码输入有误，请重新输入");
        };
    });

    imgCode.blur(function () {
        let text = $.trim($(this).val()).toLowerCase();
        // imgCodeText = text;
        if (text.length == 0) {
            $(this).nextAll(".imgCodeText2").addClass("cur").html("请输入验证码");
        } else if (text != imgCodeText) {
            $(this).nextAll(".imgCodeText2").addClass("cur").html("验证码输入不正确，请重新输入");
        } else {
            $(this).addClass("got");
        }
    });

    clear.click(function () {
        // imgCodeText = "";
        (new CaptchaMini({
            fontSize: 60
        })).draw(document.querySelector('#captcha'), r => {
            // console.log(r, '验证码1');
            imgCodeText = r.toLowerCase();
        });
        console.log(imgCodeText);
    });

    phoneMsg.blur(function () {
        console.log(code);
        let text = $.trim($(this).val());
        // phoneMsgText = text;
        if (text.length == 0) {
            $(this).nextAll(".msgCodeText").addClass("cur").html("手机验证码不能为空");
        } else if (text != code) {
            $(this).nextAll(".msgCodeText").addClass("cur").html("手机验证码错误，请重新输入");
        } else {
            $(this).addClass("got");
        };
    });

    loginQ.click(function () {
        let num = $(".got").length;
        if (num != 3) {
            alert("请正确输入登录信息");
        } else {
            console.log("login");
            console.log(phoneQText);

            $.ajax({
                url: "../server1/loginQ.php",
                type: "post",
                dataType: "json",
                data: `username=${phoneQText}`,
                success(res) {
                    console.log(res);
                    if (res.status == "error") {
                        alert(`${res.msg}`);
                    } else {
                        store.set("username", phoneQText);
                        location.href = "../html/shouye.html";
                    }
                }
            })

        }
    });

    function getRandomMsg() {
        let str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        let arr = [...str];
        let msg = "";
        // console.log(index);
        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * (arr.length - 1));
            msg += arr[index]
        }
        // console.log(msg);
        return msg;
    };


})