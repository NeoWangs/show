/**
 * Created by Administrator on 2014/12/16.
 */

var $$Client = {};
$$Client.shareData = {
    /*分享调用图片*/
    "imgUrl" : 'http://game.m.muzhibuluo.cn/resources/sanguo/res/weixintou.jpg',
    /*分享调用图片*/
    "link" : window.location.href,
    /*分享标题*/
    "title" : '三国无双——拇指部落',
    /*分享描述*/
    "desc" : "超过3000万人都玩过的游戏"
}

function init(n) {
    new StateManager(Constants);

}

var StateManager = function(){
    function e(t){
        var n = this;
        this.lastTime = 0;
        this.score = 0;
        this.canvas = t.canvas;
        this.thisismobile = t.thisismobile;
        this.winW = t.winW;
        this.winH = t.winH;
        this.stage = new createjs.Stage(this.canvas);
        this.stage.autoClear = true;
        createjs.Touch.enable(this.stage);
        this.timeDevider = 1;
        this.stage.enableMouseOver(5);
        this.loader = new createjs.LoadQueue();
        this.states = new Array();
        this.loadingFunc();

        this.isIphone = t.isIphone;
        this.isMi = t.isMi;

        this.gameScore = 0;

        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", function(e){
            return n.update(e)
        });
        e.g_instance = this;
    }
    e.prototype.update = function (e) {
        try {

            if (this.states.length != 0) {
                var t = this.states[this.states.length - 1];
                if (!t.isInitiliazed()) {
                    t.init()
                }
                var n = createjs.Ticker.getTime();
                var r = n - this.lastTime;
                this.lastTime = n;

                t.update(n)
            }
        } catch (i) {
           // console.log(i, "statemanager::update")
        }
        try {
            this.stage.update()
        } catch (i) {}
    };
    e.prototype.loadingFunc = function(){
        var n = this;
        createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
        this.loader.installPlugin(createjs.Sound);
        this.loader.loadManifest(manifest);

        this.loader.on("progress",function(){
            n.handleProgress(n);
        });
        this.loader.on("complete", function(){
            n.handleComplete(n)
        });


        this.messageField = new createjs.Text("0%", "bold 24px Arial", "#888888");
        this.messageField.textAlign = "center";
        this.messageField.maxWidth = 790;
        this.messageField.x = this.canvas.width / 2;
        this.messageField.y = this.canvas.height/2+5;
        this.stage.addChild(this.messageField);
    }
    e.prototype.handleProgress = function(e){
        e.messageField.text = (e.loader.progress*100|0) + "%"
        e.stage.update();
    }
    e.prototype.handleComplete = function(e){
        this.stage.removeChild(e.loadingbg);
        this.stage.removeChild(e.messageField);
        this.stage.removeChild(e.loadingBar);
        $(".loadinglogo").hide();
        e.pushState(new gameState());



        var loader1 = new createjs.LoadQueue();

        var manifest1;
        manifest1 = [

            {src:"res/pic11.png", id:"p8"},
            {src:"res/pic12.png", id:"p9"},
            {src:"res/pic13.png", id:"p10"},

            {src:"res/pic2.png", id:"p4"},
            {src:"res/pic21.png", id:"p5"},
            {src:"res/pic22.png", id:"p6"},
            {src:"res/pic23.png", id:"p7"}

        ];
        loader1.loadManifest(manifest1);

    }
    e.prototype.getResult = function (e) {
        return this.loader.getResult(e)
    };

    e.prototype.changeState = function (e) {
        while (this.states.length != 0) {
            this.popState()
        }
        this.pushState(new e())
    };
    e.prototype.pushState = function (e) {
        this.states.push(e);
        this.stage.addChild(e)
    };
    e.prototype.popState = function () {
        if (this.states.length != 0) {
            this.states[this.states.length - 1].cleanup();
            this.stage.removeChild(this.states[this.states.length - 1]);
            this.states.pop();
            if (this.states.length != 0) {
                this.states[this.states.length - 1].resume()
            }
        }
    };
    return e;
}();

var Constants = function () {
    function e() {}



    var thisismobile = true;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
        thisismobile = true;

    }else{
        thisismobile = false;
    }

    var isIphone = false;
    var isMi = /MI/.test(navigator.userAgent);



    var u = navigator.userAgent;
   if (u.indexOf('iPhone') > -1) {//苹果手机
       isIphone = true;
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
       isIphone = false;
    }



    var W = 640, H = 1E3,
        IS_TOUCH, SCREEN_SHOW_ALL = !0;

    var canvas = document.getElementById("Canvas");
    winW = window.innerWidth,
        winH = window.innerHeight;
    if (SCREEN_SHOW_ALL) {
        winW / winH > W / H ? winW = W * winH / H: winH = H * winW / W,
            canvas.style.marginTop = 0;
    }else {
        var w = W * winH / H;
        winW >= w ? (winW = w, stage.x = 0) : stage.x = (winW - w) / 2;
    }
    canvas.width = W;
    canvas.height = H;
    canvas.style.left = '50%';
    canvas.style.marginLeft = -(document.body.clientWidth/2)+"px";

    if(!thisismobile){
        canvas.style.width = winW + "px";
        canvas.style.height = winH + "px";

        canvas.style.marginLeft = -(winW/2)+"px";

    }
    e.winW = winW;
    e.winH = winH;
    e.canvas = canvas;
    e.thisismobile = thisismobile;

    e.isIphone = isIphone;
    e.isMi = isMi;

    return e
}();

