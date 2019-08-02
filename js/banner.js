// $(function () {
// console.log("aa");
// $.get({
//     url: "../server1/banner.php",
//     dataType: "json",
//     success(data) {
//         let bannerManager = new BannerTap(data);
//         bannerManager.init();
//     }
// });

class BannerTap {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.dropBoxT = null;
        this.imgBox = null;
        this.length = null;
    }
    init() {
        this.createHtml();
        this.addEventClick();
    }
    createHtml() {
        // console.log("aa");
        let oSpan;
        let dropBox = $("<div></div>").addClass("dropBox");
        let imgBox = $("<div></div>").addClass("imgBox");
        let imgHtml = this.data.map((items, index) => {
            oSpan = $("<span></span>");
            dropBox.append(oSpan);
            return `<a href="#"><img src="../images/${items}" alt=""></a>`;
        }).join("");
        // console.log(dropBox[0]);
        dropBox.children().eq(0).addClass("red");
        imgBox.html(imgHtml);
        // console.log(imgBox[0]);
        let btnBox = $("<div></div>").addClass("btnBox");
        let leftBtn = $("<i></i>").addClass("leftBtn");
        let rightBtn = $("<i></i>").addClass("rightBtn");
        btnBox.append(leftBtn).append(rightBtn);
        // console.log(btnBox[0]);
        let content = $("<div></div>").addClass("content");
        let banner = $("<div></div>").addClass("banner");
        content.append(imgBox).append(btnBox).append(dropBox);
        banner.append(content);
        $("body").prepend(banner);
        this.left = leftBtn;
        this.right = rightBtn;
        this.dropBoxT = dropBox;
        this.imgBox = imgBox;
        this.length = imgBox.children().length;

    }
    addEventClick() {
        this.right.hover(function () {
            $(this).css("background", "url(../images/zuoyou.png) no-repeat -50px -61px")
        }, function () {
            $(this).css("background", "url(../images/zuoyou.png) no-repeat -50px 0px")
        });

        this.left.hover(function () {
            $(this).css("background", "url(../images/zuoyou.png) no-repeat 0px -61px")
        }, function () {
            $(this).css("background", "url(../images/zuoyou.png) no-repeat 0px 0px")
        });


        this.right.click(function () {
            next();
        });

        this.left.click(function () {
            prev();
        });

        let timer = setInterval(function () {
            next();
        }, 1500);

        $(".banner").hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(next, 1500);
        });


        let index = 0;
        let length = this.length
        let imgBox = this.imgBox;
        let dropBox = this.dropBoxT
        let leftBtn = this.left;

        this.dropBoxT.on("click", "span", function () {
            let index = $(this).index();
            imgBox.children().eq(index).fadeIn().siblings().fadeOut();
            dropBox.children().eq(index).addClass("red").siblings().removeClass("red");
        });


        function next() {
            index++;
            if (index > length - 1) {
                index = 0;
            };
            imgBox.children().eq(index).fadeIn().siblings().fadeOut();
            dropBox.children().eq(index).addClass("red").siblings().removeClass("red");
        };

        function prev() {
            index--;
            if (index < 0) {
                index = length - 1;
            };
            imgBox.children().eq(index).fadeIn().siblings().fadeOut();
            dropBox.children().eq(index).addClass("red").siblings().removeClass("red");
        };
    }
};

// });