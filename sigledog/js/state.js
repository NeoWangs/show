
var gameState = function(e){
    function t() {
        e.call(this);

        this.boatState = 0;

        this.end = false;

        this.soundsecond=0;

        this.gameScore = 0;
        this.timeAge = 0;
        this.initiliazed = false;
        this.timeNum = 30*40;

        this.bgContainer = new BackgroundContainer();
        this.addChild(this.bgContainer);

        if(StateManager.g_instance.isIphone){
            this.rContainer = new roadContainer();
        }else{
            this.rContainer = new roadContainer1();
        }

        this.addChild(this.rContainer);

        this.cContainer = new CarmerContainer();
        this.addChild(this.cContainer);

        var n = this;
        if(window.localStorage.getItem("isSecond") == null){
            $(".teachDiv").show();
            $(".teachDiv").on("click",function(){
                $(".teachDiv").hide();
                n.end = false;
                window.localStorage.setItem("isSecond","true");
              //  createjs.Sound.play("music",{volume:0.8});
            });
            this.end = true;

            _czc.push(["_trackEvent", "开始游戏", "click", "main", 1]);
        }else{

            _czc.push(["_trackEvent", "开始游戏", "click", "main", 1]);
            //createjs.Sound.play("music",{volume:0.8});
        }

        this.checkWinW = StateManager.g_instance.winW/2;

        var isCannotTouch = false;

        this.touchType = 0;

        if(StateManager.g_instance.thisismobile){
                StateManager.g_instance.canvas.addEventListener("touchstart",function(e){

                    if(e.targetTouches.length>=2){
                        if (e.targetTouches[1].pageX > n.checkWinW) {
                            n.touchType=2;
                            n.setCarType(2);
                        } else {
                            n.touchType=1;
                            startType = 1;
                            n.setCarType(1);
                        }
                    }else{
                        if (e.targetTouches[0].pageX > n.checkWinW) {
                            n.touchType=2;
                            n.setCarType(2);
                        } else {
                            n.touchType=1;
                            n.setCarType(1);
                        }
                    }
                },true);

                StateManager.g_instance.canvas.addEventListener("touchmove",function(e){

                    if(e.targetTouches.length>=2){
                        if (e.targetTouches[1].pageX > n.checkWinW) {
                            n.touchType=2;
                            n.setCarType(2);
                        } else {
                            n.touchType=1;
                            n.setCarType(1);
                        }
                    }else{
                        if (e.targetTouches[0].pageX > n.checkWinW) {
                            n.touchType=2;
                            n.setCarType(2);
                        } else {
                            n.touchType=1;
                            n.setCarType(1);
                        }
                    }
                 },true);

                StateManager.g_instance.canvas.addEventListener("touchend",function(e){

                    if(e.targetTouches.length==0){
                        n.isCannotTouch = false;
                        n.setCarType(0);
                    }
                },true);


        }else{

            StateManager.g_instance.stage.on("stagemousedown",function(e){

                isCannotTouch = true;

                if(e.stageX>320){
                    n.setCarType(2);
                }else{
                    n.setCarType(1);
                }
            },true);
            StateManager.g_instance.stage.on("stagemousemove",function(e){

                if(isCannotTouch){
                    if(e.stageX>320){
                        n.setCarType(2);
                    }else{
                        n.setCarType(1);
                    }
                }
            },true);
            StateManager.g_instance.stage.on("stagemouseup",function(e){
                isCannotTouch = false;
                n.setCarType(0);
            },true);
        }
    }
    __extends(t, e);
    t.prototype.cleanup = function () {};
    t.prototype.resume = function () {};
    t.prototype.init = function () {
        this.initiliazed = true
    };
    t.prototype.isInitiliazed = function () {
        return this.initiliazed
    };
    t.prototype.update = function (n) {
        if(this.end)return;

        //if(this.timeAge%60==0){
        //    this.soundsecond++;
        //    if(this.soundsecond==76){
        //        createjs.Sound.play("music",{volume:0.8});
        //        this.soundsecond=0;
        //    }
        //}
        this.timeAge++;
        this.rContainer.update();
        this.cContainer.update(this.rContainer.getAngle());
        this.bgContainer.update(this.rContainer.getAngle());
    }
    t.prototype.setCarType = function(type){
        this.cContainer.setLmrType(type);
    }
    t.prototype.gameOver = function(type){
        this.end = true;
        var gamescore = this.bgContainer.scorenum+"KM";

        var storage = window.localStorage;

        storage.setItem("gameScore",this.cContainer.cage+"");

        storage.setItem("gameLevel",this.cContainer.levelNum);//设置b为"isaac"

        var highscore = storage.getItem("hightScore");
        if(parseInt(highscore)<this.cContainer.cage||highscore==null){
            storage.setItem("hightScore",this.cContainer.cage+"");//设置b为"isaac"
        }

        highscore = storage.getItem("hightScore")+"KM";
        createjs.Sound.stop("music");

        $(".main").show();
        $(".endScore").html(this.bgContainer.scorenum+"M")

        var au1 = document.getElementById('audio1');
        au1.pause();

        _czc.push(["_trackEvent", "游戏结束", "click", "gameend", 1]);

        var titlestr = "[有人@你，单身狗~]进来签收你的礼物"
        var decstr = '跑了'+this.bgContainer.scorenum+'米！我成功解救了1只单身狗，获得了一份脱单大奖！'

                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: titlestr,
                    desc:decstr,
                    link: linkstr,
                    imgUrl: iconstr,
                    trigger: function (res) {
                    },
                    success: function (res) {

                        _czc.push(["_trackEvent", "分享", "share", "朋友", 1]);
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                    }
                });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title:decstr,
                    link: linkstr,
                    imgUrl: iconstr,
                    trigger: function (res) {
                    },
                    success: function (res) {
                        _czc.push(["_trackEvent", "分享", "share", "朋友圈", 1]);
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                    }
                });

            wx.error(function (res) {
                console.log(res.errMsg);
            });

        var score1 = this.bgContainer.scorenum

        if(this.bgContainer.scorenum>2000){


            $.ajax({
                type: 'post',
                url: 'myScore',
                data:JSON.stringify({
                    _csrf:_csrf,
                    score:this.bgContainer.scorenum
                }),
                contentType: "application/json",
                dataType: 'json',
                success: function (result) {
                    console.log(result)
                    if (result.success) {
                        getPrice (score1);
                    }
                },
                error: function (err) {
                }
            });
        }else{
            $(".endbottomimg").attr("src","res/pic1bottom.png");
            $(".endpic1").show();
            var page = 1;
            setInterval(function(){
                $(".pic1img").attr("src","res/pic1"+page+".png");
                page = page<6?page+1:1;
            },100);
        }


    }
    return t;
}(createjs.Container);
//点击抽奖
function getPrice (score) {


    _czc.push(["_trackEvent", "能抽奖", "click", "getPrice", 1]);
    $.ajax({
        type: 'post',
        url: 'lottery',
        data:JSON.stringify({
            _csrf:_csrf
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            console.log(result)
            if (result.success) {
                if(result.msg=='success')
                {
                    var titlestr = "[有人@你，单身狗~]进来签收你的礼物"
                    var decstr = '里面有一个光棍节上街的理由'

                    _czc.push(["_trackEvent", "中奖", "click", "getPrice", 1]);
                    switch(result.data.type){
                        case 1:{
                            titlestr = "[有人@你，单身狗~]进来签收你的礼物"
                            decstr = '跑了'+score+'米，我成功解救了单身狗，获得了一份佐丹奴五折购物券！约吗？'
                            $(".goods").attr("src","res/good2.png")
                            break;
                        }
                        case 2:{
                            titlestr = "[有人@你，单身狗~]进来签收你的礼物"
                            decstr = '跑了'+score+'米，我成功解救了单身狗，获得了一份绿茵阁罗汉果陈皮茶！约吗？'
                            $(".goods").attr("src","res/good3.png")
                            break;
                        }
                        case 3:{
                            titlestr = "[有人@你，单身狗~]进来签收你的礼物"
                            decstr = '跑了'+score+'米，我成功解救了单身狗，获得了一份UBER四折优惠码！约吗？'
                            $(".goods").attr("src","res/good4.png")
                            break;
                        }
                        case 4:{
                            titlestr = "[有人@你，单身狗~]进来签收你的礼物"
                            decstr = '跑了'+score+'米，我成功解救了单身狗，获得了一份U五折优惠码！约吗？'
                            $(".goods").attr("src","res/good4.png")
                            break;
                        }
                        case 5:{
                            titlestr = "[有人@你，单身狗~]进来签收你的礼物"
                            decstr = '跑了'+score+'米，我成功解救了单身狗，获得了一份格瓦拉红包！约吗？'
                            $(".goods").attr("src","res/good1.png")
                            break;
                        }
                    }

                    var iconstr ='http://m.muzhibuluo.com/single_dog/res/icon.jpg';
                    var linkstr = 'http://m.muzhibuluo.com/single_dog/startup?cc='+getQueryString('cc');



                            //分享给朋友
                            wx.onMenuShareAppMessage({
                                title: titlestr,
                                desc:decstr,
                                link: linkstr,
                                imgUrl: iconstr,
                                trigger: function (res) {
                                },
                                success: function (res) {

                                    _czc.push(["_trackEvent", "分享", "share", "朋友", 1]);
                                },
                                cancel: function (res) {
                                },
                                fail: function (res) {
                                }
                            });
                            //分享到朋友圈
                            wx.onMenuShareTimeline({
                                title:decstr,
                                link: linkstr,
                                imgUrl: iconstr,
                                trigger: function (res) {
                                },
                                success: function (res) {
                                    _czc.push(["_trackEvent", "分享", "share", "朋友圈", 1]);
                                },
                                cancel: function (res) {
                                },
                                fail: function (res) {
                                }
                            });

                        wx.error(function (res) {
                            console.log(res.errMsg);
                        });



                    $(".endbottomimg").attr("src","res/pic3bottom.png");
                    $(".endpic3").show();
                    var page = 1;
                    setInterval(function(){
                        $(".pic3img").attr("src","res/pic3"+page+".png");
                        $(".picd").attr("src","res/picd"+page+".png");

                        page = page<3?page+1:1;
                    },100);
                } else {
                    $(".endbottomimg").attr("src","res/pic2bottom.png");
                    $(".endpic2").show();
                    var page = 1;
                    setInterval(function(){
                        $(".pic2img").attr("src","res/pic2"+page+".png");
                        $(".picd").attr("src","res/picd"+page+".png");

                        page = page<3?page+1:1;
                    },100);


                }
            }
        },
        error: function (err) {
            console.log("抽奖出错！");
        }
    });
}