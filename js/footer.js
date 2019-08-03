class Footer {
    constructor(data) {
        this.data = data;
    }
    createHtml() {
        let html = `<div class="footerT">
                        <div class="footerTBox1">
                            <a href="#" class="a1">
                                <img src="../images/kefu.png" alt="">
                                <span>7X9小时在线客服</span>
                            </a>
                            <a href="#" class="a2">
                                <img src="../images/qitian.png" alt="">
                                <p>7天内退货</p>
                                <p>购物满199元免运费</p>
                            </a>
                            <a href="#" class="a3">
                                <img src="../images/fanke.jpg" alt="">
                                <p> 扫描下载<i>凡客</i>客户端</p>
                            </a>
                            <ul class="footerTBox2">
                                <li><a href="#">关于凡客</a></li>
                                <li><a href="#">新手指南</a></li>
                                <li><a href="#">配送范围及时间</a></li>
                                <li><a href="#">支付方式</a></li>
                                <li><a href="#">售后服务</a></li>
                                <li><a href="#">帮助中心</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footerB">
                        <div class="footerBT">
                            <p>Copyright 2007 - 2019 vancl.com All Rights Reserved 京ICP证100557号 京公网安备11011502002400号
                                出版物经营许可证新出发京批字第直110138号</p>
                            <p>凡客诚品（北京）科技有限公司</p>
                        </div>
                        <div class="footerBB">
                            <ul>
                                <li><a href="#"></a></li>
                                <li><a href="#"></a></li>
                                <li><a href="#"></a></li>
                                <li><a href="#"></a></li>
                                <li><a href="#"></a></li>
                                <li><a href="#"></a></li>
                            </ul>
                        </div>
                    </div>`;
        return $("<div></div>").addClass("footer").html(html);
    }
}