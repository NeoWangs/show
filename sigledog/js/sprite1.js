var roadContainer1 = function(e){
    function t() {
        e.call(this);

        this.pContainer = new PavingContainer1();
        this.addChild(this.pContainer);

        this.middleRoad1 = new createjs.Shape();
        this.addChild(this.middleRoad1);

        this.middleRoad2 = new createjs.Shape();
        this.addChild(this.middleRoad2);

        this.middleRoad3 = new createjs.Shape();
        this.addChild(this.middleRoad3);

        this.middleRoad4 = new createjs.Shape();
        this.addChild(this.middleRoad4);

        this.drawRoadType = 0;

        this.drawStep = 0;//画了多少格
        this.roadStep = 0;//走了多少格

        this.middleRoadObj = [];
        this.middleLanObj = [];
        this.middleMoveLanObj = [];
        this.middleSpeedArr = [];

        this.middleAngle = 90;
        this.lamType = -1;
        this.lanMove = null;

        this.lanGap = 50;

        this.speed = 7;

        this.roadWidth = 1;

        this.waitDeleteGap = 22;

        for(var i = 0;i<=66;i++){
            this.drawRoad();

        }

        this.middleRoadObj.splice(0,33);
        this.middleLanObj.splice(0,33);
        this.middleMoveLanObj.splice(0,33);
        this.middleSpeedArr.splice(0,33);
        this.middleSpeedArr[0] = 5;
        e.g_instance = this;
    }
    __extends(t, e);
    t.prototype.update = function(){
        this.drawRoad();
        this.roadStep++
        if(this.roadStep%this.waitDeleteGap==0){
            if(this.drawRoadType==0){
                this.middleRoad1.graphics.clear();
            }else if(this.drawRoadType==1){
                this.middleRoad2.graphics.clear();
            }else if(this.drawRoadType==2){
                this.middleRoad3.graphics.clear();
            }else if(this.drawRoadType==3){
                this.middleRoad4.graphics.clear();
            }
        }
        this.middleAngle = this.middleRoadObj.splice(0,1)[0];
        this.lamType = this.middleLanObj.splice(0,1)[0];
        this.lanMove = this.middleMoveLanObj.splice(0,1)[0];
        this.speed = this.middleSpeedArr.splice(0,1)[0];

        this.y+=Math.sin(this.middleAngle)*this.speed;
        this.x-=Math.cos(this.middleAngle)*this.speed;
    }
    t.prototype.drawRoad = function(){
        this.drawStep++;
        this.pContainer.update();
        var mRoadObj = this.pContainer.returnRoadObj();
        var mAngle = mRoadObj.ta;
        var compleAngle = -((mAngle/(2*Math.PI / 360))-90);

        this.middleRoadObj.push(mAngle);
        this.middleSpeedArr.push(mRoadObj.ps);
        //分画画器画

        var lamType = -1;
        var lanmap = null;



        switch(this.roadStep){
            case 500:{;
                this.lanGap = 40;break;
            }
            case 1000:{;
                this.lanGap = 30;break;
            }
            case 1500:{
                this.lanGap = 20;break;
            }
            case 2000:{
                this.lanGap = 15;break;
            }
        }

        if(this.drawRoadType==0){
            this.middleRoad1.graphics.beginFill("#FFFFFF").setStrokeStyle(1, 'round', 'round').beginStroke("#FFFFFF").mt(mRoadObj.x,mRoadObj.y).lt(mRoadObj.bx,mRoadObj.by).ef();
            if(this.drawStep%this.lanGap==0){
                lamType = mRoadObj.lty;
                if(lamType != -1){
                    if(lamType == 3){
                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx1;
                        comple.y = mRoadObj.ly1;
                        this.addChild(comple);
                        comple.rotation = compleAngle

                        comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx3;
                        comple.y = mRoadObj.ly3;
                        this.addChild(comple);
                        comple.rotation = compleAngle
                    }else if(lamType == 4){
                        lanmap = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan1"));
                        lanmap.regX = 25;
                        lanmap.regY = 25;
                        switch(GetRandomNum(0,1)){
                            case 0:{
                                lanmap.x = mRoadObj.lx2;
                                lanmap.y = mRoadObj.ly2;
                                lanmap.ltype = 1;
                                createjs.Tween.get(lanmap,{loop:true}).to({x:mRoadObj.lx1,y:mRoadObj.ly1,ltype:0},500).wait(1000).to({x:mRoadObj.lx2,y:mRoadObj.ly2,ltype:1},500)
                                break;
                            }
                            case 1:{
                                lanmap.x = mRoadObj.lx1;
                                lanmap.y = mRoadObj.ly1;
                                lanmap.ltype = 0;
                                createjs.Tween.get(lanmap,{loop:true}).to({x:mRoadObj.lx2,y:mRoadObj.ly2,ltype:1},500).wait(1000).to({x:mRoadObj.lx1,y:mRoadObj.ly1,ltype:0},500)
                                break;
                            }
                        }
                        this.addChild(lanmap);
                    }else{
                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;
                        this.addChild(comple);
                        comple.rotation =compleAngle
                        switch(lamType){
                            case 0:{

                                comple.x = mRoadObj.lx1;
                                comple.y = mRoadObj.ly1;
                                break;
                            }
                            case 1:{

                                comple.x = mRoadObj.lx2;
                                comple.y = mRoadObj.ly2;
                                break;
                            }
                            case 2:{

                                comple.x = mRoadObj.x;
                                comple.y = mRoadObj.y;
                                break;
                            }
                        }
                    }
                }
            }
            if(this.drawStep==this.waitDeleteGap){
                this.drawRoadType = 1;
                //this.drawStep=0;
            }
        }else if(this.drawRoadType==1){
            this.middleRoad2.graphics.beginFill("#FFFFFF").setStrokeStyle(1, 'round', 'round').beginStroke("#FFFFFF").mt(mRoadObj.x,mRoadObj.y).lt(mRoadObj.bx,mRoadObj.by).ef();
            if(this.drawStep%this.lanGap==0){
                lamType = mRoadObj.lty;
                if(lamType != -1) {
                    if(lamType == 3){
                        //this.middleRoad2.graphics.beginFill("#FFFFFF").setStrokeStyle(3, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).mt(mRoadObj.lx3, mRoadObj.ly3).lt(mRoadObj.lx4, mRoadObj.ly4).ef();

                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx1;
                        comple.y = mRoadObj.ly1;
                        this.addChild(comple);
                        comple.rotation = compleAngle

                        comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx3;
                        comple.y = mRoadObj.ly3;
                        this.addChild(comple);
                        comple.rotation = compleAngle
                    }else if(lamType == 4){
                        lanmap = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan1"));
                        lanmap.regX = 73.5;
                        lanmap.regY = 25;
                        lanmap.rotation = compleAngle
                        switch(GetRandomNum(0,1)){
                            case 0:{
                                lanmap.x = mRoadObj.lx2;
                                lanmap.y = mRoadObj.ly2;
                                lanmap.ltype = 1;
                                createjs.Tween.get(lanmap,{loop:true}).to({x:mRoadObj.lx1,y:mRoadObj.ly1,ltype:0},500).wait(1000).to({x:mRoadObj.lx2,y:mRoadObj.ly2,ltype:1},500)
                                break;
                            }
                            case 1:{
                                lanmap.x = mRoadObj.lx1;
                                lanmap.y = mRoadObj.ly1;
                                lanmap.ltype = 0;
                                createjs.Tween.get(lanmap,{loop:true}).to({x:mRoadObj.lx2,y:mRoadObj.ly2,ltype:1},500).wait(1000).to({x:mRoadObj.lx1,y:mRoadObj.ly1,ltype:0},500)
                                break;
                            }
                        }
                        this.addChild(lanmap);
                    }else{
                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;
                        this.addChild(comple);
                        comple.rotation =compleAngle
                        switch(lamType){
                            case 0:{

                                comple.x = mRoadObj.lx1;
                                comple.y = mRoadObj.ly1;
                                break;
                            }
                            case 1:{

                                comple.x = mRoadObj.lx2;
                                comple.y = mRoadObj.ly2;
                                break;
                            }
                            case 2:{

                                comple.x = mRoadObj.x;
                                comple.y = mRoadObj.y;
                                break;
                            }
                        }                    }
                }
            }
            if(this.drawStep==this.waitDeleteGap*2){
                this.drawRoadType = 2;
                // this.drawStep=0;
            }
        }else if(this.drawRoadType==2){
            this.middleRoad3.graphics.beginFill("#FFFFFF").setStrokeStyle(1, 'round', 'round').beginStroke("#FFFFFF").mt(mRoadObj.x,mRoadObj.y).lt(mRoadObj.bx,mRoadObj.by).ef();
            if(this.drawStep%this.lanGap==0){
                lamType = mRoadObj.lty;
                if(lamType != -1) {
                    if(lamType == 3){
                        //this.middleRoad3.graphics.beginFill("#FFFFFF").setStrokeStyle(3, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).mt(mRoadObj.lx3, mRoadObj.ly3).lt(mRoadObj.lx4, mRoadObj.ly4).ef();

                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx1;
                        comple.y = mRoadObj.ly1;
                        this.addChild(comple);
                        comple.rotation = compleAngle

                        comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx3;
                        comple.y = mRoadObj.ly3;
                        this.addChild(comple);
                        comple.rotation = compleAngle

                    }else if(lamType == 4){
                        lanmap = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan1"));
                        lanmap.regX = 73.5;
                        lanmap.regY = 25;
                        lanmap.rotation = compleAngle
                        switch(GetRandomNum(0,1)){
                            case 0:{
                                lanmap.x = mRoadObj.lx2;
                                lanmap.y = mRoadObj.ly2;
                                lanmap.ltype = 1;
                                createjs.Tween.get(lanmap,{loop:true}).to({x:mRoadObj.lx1,y:mRoadObj.ly1,ltype:0},500).wait(1000).to({x:mRoadObj.lx2,y:mRoadObj.ly2,ltype:1},500)
                                break;
                            }
                            case 1:{
                                lanmap.x = mRoadObj.lx1;
                                lanmap.y = mRoadObj.ly1;
                                lanmap.ltype = 0;
                                createjs.Tween.get(lanmap,{loop:true}).to({x:mRoadObj.lx2,y:mRoadObj.ly2,ltype:1},500).wait(1000).to({x:mRoadObj.lx1,y:mRoadObj.ly1,ltype:0},500)
                                break;
                            }
                        }
                        this.addChild(lanmap);
                    }else{
                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;
                        this.addChild(comple);
                        comple.rotation =compleAngle
                        switch(lamType){
                            case 0:{

                                comple.x = mRoadObj.lx1;
                                comple.y = mRoadObj.ly1;
                                break;
                            }
                            case 1:{

                                comple.x = mRoadObj.lx2;
                                comple.y = mRoadObj.ly2;
                                break;
                            }
                            case 2:{

                                comple.x = mRoadObj.x;
                                comple.y = mRoadObj.y;
                                break;
                            }
                        }                    }
                }
            }
            if(this.drawStep==this.waitDeleteGap*3){
                this.drawRoadType = 3;
                // this.drawStep=0;
            }
        }else if(this.drawRoadType==3){
            this.middleRoad4.graphics.beginFill("#FFFFFF").setStrokeStyle(1, 'round', 'round').beginStroke("#FFFFFF").mt(mRoadObj.x,mRoadObj.y).lt(mRoadObj.bx,mRoadObj.by).ef();
            if(this.drawStep%this.lanGap==0){
                lamType = mRoadObj.lty;
                if(lamType != -1) {
                    if(lamType == 3){
                        //this.middleRoad4.graphics.beginFill("#FFFFFF").setStrokeStyle(3, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).mt(mRoadObj.lx3, mRoadObj.ly3).lt(mRoadObj.lx4, mRoadObj.ly4).ef();

                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx1;
                        comple.y = mRoadObj.ly1;
                        this.addChild(comple);
                        comple.rotation = compleAngle

                        comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx3;
                        comple.y = mRoadObj.ly3;
                        this.addChild(comple);
                        comple.rotation = compleAngle

                    }else if(lamType == 4){
                        lanmap = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan1"));
                        lanmap.regX = 73.5;
                        lanmap.regY = 25;
                        lanmap.rotation = compleAngle
                        switch(GetRandomNum(0,1)){
                            case 0:{
                                lanmap.x = mRoadObj.lx2;
                                lanmap.y = mRoadObj.ly2;
                                lanmap.ltype = 1;
                                createjs.Tween.get(lanmap,{loop:true}).to({x:mRoadObj.lx1,y:mRoadObj.ly1,ltype:0},500).wait(1000).to({x:mRoadObj.lx2,y:mRoadObj.ly2,ltype:1},500)
                                break;
                            }
                            case 1:{
                                lanmap.x = mRoadObj.lx1;
                                lanmap.y = mRoadObj.ly1;
                                lanmap.ltype = 0;
                                createjs.Tween.get(lanmap,{loop:true}).to({x:mRoadObj.lx2,y:mRoadObj.ly2,ltype:1},500).wait(1000).to({x:mRoadObj.lx1,y:mRoadObj.ly1,ltype:0},500)
                                break;
                            }
                        }
                        this.addChild(lanmap);

                    }else{
                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;
                        this.addChild(comple);
                        comple.rotation =compleAngle
                        switch(lamType){
                            case 0:{

                                comple.x = mRoadObj.lx1;
                                comple.y = mRoadObj.ly1;
                                break;
                            }
                            case 1:{

                                comple.x = mRoadObj.lx2;
                                comple.y = mRoadObj.ly2;
                                break;
                            }
                            case 2:{

                                comple.x = mRoadObj.x;
                                comple.y = mRoadObj.y;
                                break;
                            }
                        }
                    }
                }
            }
            if(this.drawStep==this.waitDeleteGap*4){
                this.drawRoadType = 0;
                this.drawStep=0;
            }
        }
        this.middleMoveLanObj.push(lanmap);
        this.middleLanObj.push(lamType);

    }
    t.prototype.getAngle = function(){


        var n = this;
        if(this.lanMove!=null){
            if(this.lanMove.ltype>0.5){
                this.lamType = 1;
            }else{
                this.lamType = 0;
            }
            createjs.Tween.get(this).wait(100).call(function(){
                n.removeChild(n.lanMove);
            });
        }

        var obj = {an:this.middleAngle/(2*Math.PI / 360),lp:this.lamType}
        return obj;
    }
    return t;
}(createjs.Container);

var PavingContainer1 = function(e){
    function t() {
        e.call(this);
        this.middleRound = {};

        this.middleRound.x = 320;
        this.middleRound.y = 1000;
        this.middleRound.bx = 320;
        this.middleRound.by = 1000;

        this.mAngleArr = [];
        this.oneAngel = 2*Math.PI / 360;
        this.turnAngel = 90;
        this.speed = 15;
        this.isRoundType = false;

        this.LanTypeArr = [];

        this.isTurnnow = true;
        this.isTurned = false;
        this.turnStep = 0;
        this.alongStep = 100;
        this.nowStep = 0;
        this.isAlong = true;

        this.TurnType = 0;

        this.Lramdonnum = 1;

        this.pAge = 0;
        this.returnStep=0;

        for(var i = 0;i<=3000;i++){
            this.update();
        }
    }
    __extends(t, e);
    t.prototype.update = function(){
        this.pAge++;
        switch(this.pAge){
            case 500:{
                this.Lramdonnum = 1;break;
            }
            case 1000:{
                this.Lramdonnum = 2;break;
            }
            case 1500:{
                this.Lramdonnum = 3;break;
            }
            case 2000:{
                this.Lramdonnum = 4;break;
            }
        }
        if(this.isTurned)this.beAngelRoad();
        if(this.isTurnnow)this.goAngelRoad();
    }
    t.prototype.beAngelRoad = function(){//制作弯道
        this.isTurnnow = true;
        this.isTurned = false;
        this.alongStep = GetRandomNum(50,100);
        if(this.turnAngel<20){
            this.TurnType = 0;
        }else if(this.turnAngel>160){
            this.TurnType = 1;
        }else {
            this.TurnType = GetRandomNum(0,1);
        }
        this.turnStep = GetRandomNum(10,120);
        this.isRoundType = false;

        var cage = this.pAge/100|0;
        //if(cage%10==0){
        //
        //    this.isRoundType=true
        //    this.turnStep = 90;
        //    this.alongStep = 100;
        //
        //}

    }
    t.prototype.goAngelRoad = function(){//装入数组
        if(!this.isAlong){
            if(this.nowStep<this.turnStep){
                this.nowStep++;

                if(!this.isRoundType){
                    var lantyper = GetRandomNum(0,this.Lramdonnum);
                    this.LanTypeArr.push(lantyper);
                    if(this.TurnType == 0){
                        this.turnAngel++;
                    }else if(this.TurnType == 1){
                        this.turnAngel--;
                    }

                    if(this.turnAngel>160||this.turnAngel<20){
                        this.isTurned= true;
                        this.isAlong = false;
                        this.nowStep = 0
                        this.turnStep = 0;
                    }
                }else{
                    if(this.nowStep>30){
                        var lantyper = 2
                        this.LanTypeArr.push(lantyper);
                    }else{
                        var lantyper = -1;
                        this.LanTypeArr.push(lantyper);
                    }
                    if(this.TurnType == 0){
                        this.turnAngel+=4;
                    }else if(this.TurnType == 1){
                        this.turnAngel-=4;
                    }
                }
            }else{
                this.isAlong = true;
                this.nowStep = 0
                this.turnStep = 0;
                if(this.isRoundType){

                    if(this.Lramdonnum==4){
                        for(var i = 0;i<=90;i++){
                            this.LanTypeArr[this.LanTypeArr.length-i] = -1;
                        }
                    }else{
                        for(var i = 0;i<=90;i++){
                            this.LanTypeArr[this.LanTypeArr.length-90-i] = -1;
                        }
                    }

                    if(this.TurnType == 0){
                        this.turnAngel-=360;
                    }else if(this.TurnType == 1){
                        this.turnAngel+=360;
                    }
                }
            }
        }else{
            if(this.nowStep<this.alongStep){
                if(!this.isRoundType){
                    var lantyper = GetRandomNum(0,this.Lramdonnum);
                    this.LanTypeArr.push(lantyper);
                }else{
                    var lantyper = -1;
                    this.LanTypeArr.push(lantyper);
                }
                this.nowStep++

            }else{

                this.isTurned= true;
                this.isAlong = false;
                this.nowStep = 0
            }
        }

        this.mAngleArr.push(this.turnAngel);
    }
    t.prototype.returnRoadObj = function(){//返回弯道数组


        this.returnStep++;
        switch(this.returnStep){
            case 500:{
                this.speed = 15;break;
            }
            case 1000:{
                this.speed = 15;break;
            }
            case 1500:{
                this.speed = 15;break;
            }
            case 2000:{
                this.speed = 15;break;
            }
        }

        this.middleRound.bx = this.middleRound.x;
        this.middleRound.by = this.middleRound.y;

        var mAngel = this.mAngleArr.splice(0,1)[0];
        var tAngel = mAngel*this.oneAngel;

        this.middleRound.y-=Math.sin(tAngel)*this.speed;
        this.middleRound.x+=Math.cos(tAngel)*this.speed;

        var nx = this.middleRound.x;
        var ny = this.middleRound.y;

        var bnx = this.middleRound.bx;
        var bny = this.middleRound.by;

        var lany1 = 0
        var lanx1 = 0
        var lany2 = 0
        var lanx2 = 0

        var lany3 = 0
        var lanx3 = 0
        var lany4 = 0
        var lanx4 = 0

        var lanType = this.LanTypeArr.splice(0,1)[0];

        if(this.returnStep<200){
            lanType = -1;
        }

        var pspeed = this.speed;

        switch(lanType) {
            case 0:
            {//left
                lany1 = this.middleRound.y - Math.sin((mAngel + 90) * this.oneAngel) * 50;
                lanx1 = Math.cos((mAngel + 90) * this.oneAngel) * 50 + this.middleRound.x;
                lany2 = this.middleRound.y - Math.sin((mAngel - 90) * this.oneAngel) * 10;
                lanx2 = Math.cos((mAngel - 90) * this.oneAngel) * 10 + this.middleRound.x;
                break;
            }
            case 1:
            {//right
                lany1 = this.middleRound.y - Math.sin((mAngel + 90) * this.oneAngel) * 10;
                lanx1 = Math.cos((mAngel + 90) * this.oneAngel) * 10 + this.middleRound.x;
                lany2 = this.middleRound.y - Math.sin((mAngel - 90) * this.oneAngel) * 50;
                lanx2 = Math.cos((mAngel - 90) * this.oneAngel) * 50 + this.middleRound.x;
                break;
            }

            case 2:
            {//leftandRight
                lany1 = this.middleRound.y - Math.sin((mAngel + 90) * this.oneAngel) * 30;
                lanx1 = Math.cos((mAngel + 90) * this.oneAngel) * 30 + this.middleRound.x;
                lany2 = this.middleRound.y - Math.sin((mAngel - 90) * this.oneAngel) * 30;
                lanx2 = Math.cos((mAngel - 90) * this.oneAngel) * 30 + this.middleRound.x;
                break;
            }

            case 3:
            {//leftandRight
                lany1 = this.middleRound.y - Math.sin((mAngel + 90) * this.oneAngel) * 130;
                lanx1 = Math.cos((mAngel + 90) * this.oneAngel) * 130 + this.middleRound.x;
                lany2 = this.middleRound.y - Math.sin((mAngel + 90) * this.oneAngel) * 30;
                lanx2 = Math.cos((mAngel + 90) * this.oneAngel) * 30 + this.middleRound.x;

                lany3 = this.middleRound.y - Math.sin((mAngel - 90) * this.oneAngel) * 130;
                lanx3 = Math.cos((mAngel - 90) * this.oneAngel) * 130 + this.middleRound.x;
                lany4 = this.middleRound.y - Math.sin((mAngel - 90) * this.oneAngel) * 30;
                lanx4 = Math.cos((mAngel - 90) * this.oneAngel) * 30 + this.middleRound.x;
                break;
            }

            case 4:
            {//leftandRight
                lany1 = this.middleRound.y - Math.sin((mAngel + 90) * this.oneAngel) * 90;
                lanx1 = Math.cos((mAngel + 90) * this.oneAngel) * 90 + this.middleRound.x;
                lany2 = this.middleRound.y - Math.sin((mAngel - 90) * this.oneAngel) * 90;
                lanx2 = Math.cos((mAngel - 90) * this.oneAngel) * 90 + this.middleRound.x;
                break;
            }
        }
        var roadOnj = {x:nx,y:ny,bx:bnx,by:bny,lx1:lanx1,ly1:lany1,lx2:lanx2,ly2:lany2,lx3:lanx3,ly3:lany3,lx4:lanx4,ly4:lany4,lty:lanType,ta:tAngel,ps:pspeed};

        return roadOnj;

    }
    return t;
}(createjs.Container);

