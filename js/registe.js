$(function () {
    $(".registe").append(new Footer().createHtml());

    let phoneReg = /^1[3-9][0-9]{9}$/;
    let pswReg = /^[a-zA-Z0-9]{6,16}$/;
    let pswReg1 = /^[a-z]{6,16}$/;
    let pswReg2 = /^[A-Z]{6,16}$/;
    let pswReg3 = /^[0-9]{6,16}$/;
    let pswReg4 = /^[a-zA-Z]{6,16}$/;
    let pswReg5 = /^[a-z0-9]{6,16}$/;
    let pswReg6 = /^[A-Z0-9]{6,16}$/;

    let imgCode = $("#imgCode");
    let phoneNum = $("#phoneNum");
    let sendMsg = $(".sendMsg");
    let phoneMsg = $("#phoneMsg");
    let password1 = $("#password1");
    let password2 = $("#password2");
    let oBtn = $(".btn");

    let phoneNumText = "";
    let passwordText = "";

    let imgCodeText = "";
    /* 验证码处理 */
    (new CaptchaMini({
        fontSize: 60
    })).draw(document.querySelector('#captcha'), r => {
        // console.log(r, '验证码1');
        imgCodeText = r.toLowerCase();
    });
    console.log(imgCodeText);

    imgCode.blur(function () {
        let text = $.trim($(this).val()).toLowerCase();
        if (text.length == 0) {
            $(this).nextAll(".imgCodeText").css("display", "block").html("验证码不能为空");
        } else if (text != imgCodeText) {
            $(this).nextAll(".imgCodeText").css("display", "block").html("验证码输入有误");
        } else {
            $(this).nextAll(".imgCodeText").addClass("got").css("display", "block").html("验证码通过");
        };
    });

    phoneNum.blur(function () {
        let text = $.trim($(this).val());
        phoneNumText = text;
        if (text.length == 0) {
            $(this).nextAll(".msgCodeText").css("display", "block").html("手机号码不能为空");
        } else if (!phoneReg.test(text)) {
            $(this).nextAll(".msgCodeText").css("display", "block").html("手机号码输入有误");
        } else {
            $(this).nextAll(".msgCodeText").addClass("got").css("display", "block").html("手机号码通过");
        }
    });

    sendMsg.on("click", sendMessage);

    phoneMsg.blur(function () {
        let text = $.trim($(this).val());
        console.log(msg);
        if (text.length == 0) {
            $(this).nextAll("span").css({
                "display": "block",
                "color": "red"
            }).html("手机验证码不能为空");
        } else if (text != msg) {
            $(this).nextAll("span").css("display", "block").html("手机验证码有误，请重新输入");
        } else {
            $(this).nextAll("span").addClass("got").css("display", "block").html("手机验证码通过");
        };
    });

    password1.blur(function () {
        let text = $.trim($(this).val());
        passwordText = text;
        // console.log(pswReg.test(text));
        // console.log(pswReg1.test(text));
        // console.log(pswReg2.test(text));
        // console.log(pswReg3.test(text));

        if (text.length == 0) {
            $(this).nextAll("span").html("请输入密码");
        } else if (!pswReg.test(text)) {
            $(this).nextAll("span").html("请按要求输入密码");
        } else if (pswReg1.test(text) || pswReg2.test(text) || pswReg3.test(text)) {
            $(this).addClass("got")
            $(this).nextAll(".p1").addClass("active").children(".s1").css("background", "red");
            $(this).nextAll(".p1").addClass("active").children(".s2").css("background", "#cbcbcb");
            $(this).nextAll(".p1").addClass("active").children(".s3").css("background", "#cbcbcb");
            $(this).nextAll(".p1").addClass("active").children(".b2").html("弱");
        } else if (pswReg4.test(text) || pswReg5.test(text) || pswReg6.test(text)) {
            $(this).addClass("got")
            $(this).nextAll(".p1").addClass("active").children(".s1").css("background", "red");
            $(this).nextAll(".p1").addClass("active").children(".s2").css("background", "orange");
            $(this).nextAll(".p1").addClass("active").children(".s3").css("background", "#cbcbcb");
            $(this).nextAll(".p1").addClass("active").children(".b2").html("中");
        } else if (pswReg.test(text)) {
            $(this).addClass("got")
            $(this).nextAll(".p1").addClass("active").children(".s1").css("background", "red");
            $(this).nextAll(".p1").addClass("active").children(".s2").css("background", "orange");
            $(this).nextAll(".p1").addClass("active").children(".s3").css("background", "green");
            $(this).nextAll(".p1").addClass("active").children(".b2").html("强");
        };
    });

    password2.blur(function () {
        let text1 = $.trim($(this).val());
        let text2 = $.trim($("#password1").val());
        if (text1 == text2) {
            $(this).nextAll("span").addClass("got").html("密码验证成功");
        } else {
            $(this).nextAll("span").html("请确认密码是否相同");
        }
    });

    oBtn.click(function (e) {
        e.preventDefault();
        // console.log($(".got"));
        if (!$("#check").is(":checked")) {
            alert("请同意《VANCL凡客诚品服务条款》");
        } else if ($("#check").is(":checked")) {
            //  && $(".got").length == 5
            console.log(phoneNumText);
            console.log(passwordText);


            $.ajax({
                type: "post",
                url: "../server1/registe.php",
                data: `username=${phoneNumText}&password=${passwordText}`,
                dataType: "json",
                success(res) {
                    console.log(res);
                    alert(res.msg);
                }
            });


        } else {
            alert("请按要求填写注册信息");
        }
    });


    // 事件用off解除绑定后，需要把事件函数抽取出来，再用on.(type, "事件处理函数")重新绑定;
    function sendMessage() {
        if ($(".msgCodeText").hasClass("got")) {
            msg = getRandomMsg();
            console.log(msg);
            let sec = 10;
            let timer = setInterval(() => {
                sec--;
                sendMsg.off("click"); //倒计时时取消点击事件
                // console.log(this);
                $(this).html(`${sec}s 后重试`);
                if (sec <= 0) {
                    clearInterval(timer);
                    $(this).html(`获取短信验证码`);
                    sendMsg.on("click", sendMsg1); //倒计时后需要重新绑定点击事件；
                };
            }, 1000);

        } else {
            $(this).nextAll(".msgCodeText").css("display", "block").html("请输入正确的手机号后才能获取验证码");
        };
    };

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
    }

})