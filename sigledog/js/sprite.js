var roadContainer = function(e){
    function t() {
        e.call(this);

        this.pContainer = new PavingContainer();
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

        this.lanGap = 80;

        this.speed = 10;

        this.waitDeleteGap = 60;

        this.roadWidth = 1;


        for(var i = 0;i<=120;i++){
            this.drawRoad();

        }

        this.middleRoadObj.splice(0,38);
        this.middleLanObj.splice(0,38);
        this.middleMoveLanObj.splice(0,38);
        this.middleSpeedArr.splice(0,38);
        this.middleSpeedArr[0] = 6;

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
                this.lanGap = 50;break;
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
            this.middleRoad1.graphics.beginFill("#FFFFFF").setStrokeStyle(this.roadWidth, 'round', 'round').beginStroke("#FFFFFF").mt(mRoadObj.x,mRoadObj.y).lt(mRoadObj.bx,mRoadObj.by).ef();
            if(this.drawStep%this.lanGap==0){
                lamType = mRoadObj.lty;
                if(lamType != -1){
                    if(lamType == 3){
                        //this.middleRoad1.graphics.beginFill("#FFFFFF").setStrokeStyle(5, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).mt(mRoadObj.lx3, mRoadObj.ly3).lt(mRoadObj.lx4, mRoadObj.ly4).ef();
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
                        //this.middleRoad1.graphics.beginFill("#FFFFFF").setStrokeStyle(5, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1,mRoadObj.ly1).lt(mRoadObj.lx2,mRoadObj.ly2).ef();
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
            this.middleRoad2.graphics.beginFill("#FFFFFF").setStrokeStyle(this.roadWidth, 'round', 'round').beginStroke("#FFFFFF").mt(mRoadObj.x,mRoadObj.y).lt(mRoadObj.bx,mRoadObj.by).ef();
            if(this.drawStep%this.lanGap==0){
                lamType = mRoadObj.lty;
                if(lamType != -1) {
                    if(lamType == 3){
                        //this.middleRoad2.graphics.beginFill("#FFFFFF").setStrokeStyle(5, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).mt(mRoadObj.lx3, mRoadObj.ly3).lt(mRoadObj.lx4, mRoadObj.ly4).ef();

                        console.log(mRoadObj.ta);

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
                        //this.middleRoad2.graphics.beginFill("#FFFFFF").setStrokeStyle(5, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).ef();
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
            if(this.drawStep==this.waitDeleteGap*2){
                this.drawRoadType = 2;
               // this.drawStep=0;
            }
        }else if(this.drawRoadType==2){
            this.middleRoad3.graphics.beginFill("#FFFFFF").setStrokeStyle(this.roadWidth, 'round', 'round').beginStroke("#FFFFFF").mt(mRoadObj.x,mRoadObj.y).lt(mRoadObj.bx,mRoadObj.by).ef();
            if(this.drawStep%this.lanGap==0){
                lamType = mRoadObj.lty;
                if(lamType != -1) {
                    if(lamType == 3){
                        //this.middleRoad3.graphics.beginFill("#FFFFFF").setStrokeStyle(5, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).mt(mRoadObj.lx3, mRoadObj.ly3).lt(mRoadObj.lx4, mRoadObj.ly4).ef();

                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx1;
                        comple.y = mRoadObj.ly1;
                        comple.rotation =compleAngle
                        this.addChild(comple);

                        comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx3;
                        comple.y = mRoadObj.ly3;
                        comple.rotation = compleAngle
                        this.addChild(comple);

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
                        //this.middleRoad3.graphics.beginFill("#FFFFFF").setStrokeStyle(5, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).ef();

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
            if(this.drawStep==this.waitDeleteGap*3){
                this.drawRoadType = 3;
               // this.drawStep=0;
            }
        }else if(this.drawRoadType==3){
            this.middleRoad4.graphics.beginFill("#FFFFFF").setStrokeStyle(this.roadWidth, 'round', 'round').beginStroke("#FFFFFF").mt(mRoadObj.x,mRoadObj.y).lt(mRoadObj.bx,mRoadObj.by).ef();
            if(this.drawStep%this.lanGap==0){
                lamType = mRoadObj.lty;
                if(lamType != -1) {
                    if(lamType == 3){
                        //this.middleRoad4.graphics.beginFill("#FFFFFF").setStrokeStyle(5, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).mt(mRoadObj.lx3, mRoadObj.ly3).lt(mRoadObj.lx4, mRoadObj.ly4).ef();

                        var comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx1;
                        comple.y = mRoadObj.ly1;
                        comple.rotation =compleAngle
                        this.addChild(comple);

                        comple = new createjs.Bitmap(StateManager.g_instance.loader.getResult("lan"));
                        comple.regX = 73.5;
                        comple.regY = 25;

                        comple.x = mRoadObj.lx3;
                        comple.y = mRoadObj.ly3;
                        comple.rotation =compleAngle
                        this.addChild(comple);

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
                        //this.middleRoad4.graphics.beginFill("#FFFFFF").setStrokeStyle(5, 'round', 'round').beginStroke("#000").mt(mRoadObj.lx1, mRoadObj.ly1).lt(mRoadObj.lx2, mRoadObj.ly2).ef();

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

var PavingContainer = function(e){
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
        this.speed = 13;
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
        if(cage%10==0){

            this.isRoundType=true
            this.turnStep = 72;
            this.alongStep = 100;

        }

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
                        this.turnAngel+=5;
                    }else if(this.TurnType == 1){
                        this.turnAngel-=5;
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
                this.speed = 13;break;
            }
            case 1000:{
                this.speed = 14;break;
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

        switch(lanType){
            case 0:{//left
                lany1 = this.middleRound.y-Math.sin((mAngel+90)*this.oneAngel)*50;
                lanx1 = Math.cos((mAngel+90)*this.oneAngel)*50+this.middleRound.x;
                lany2 = this.middleRound.y-Math.sin((mAngel-90)*this.oneAngel)*10;
                lanx2 = Math.cos((mAngel-90)*this.oneAngel)*10+this.middleRound.x;
                break;
            }
            case 1:{//right
                lany1 = this.middleRound.y-Math.sin((mAngel+90)*this.oneAngel)*10;
                lanx1 = Math.cos((mAngel+90)*this.oneAngel)*10+this.middleRound.x;
                lany2 = this.middleRound.y-Math.sin((mAngel-90)*this.oneAngel)*50;
                lanx2 = Math.cos((mAngel-90)*this.oneAngel)*50+this.middleRound.x;
                break;
            }

            case 2:{//leftandRight
                lany1 = this.middleRound.y-Math.sin((mAngel+90)*this.oneAngel)*30;
                lanx1 = Math.cos((mAngel+90)*this.oneAngel)*30+this.middleRound.x;
                lany2 = this.middleRound.y-Math.sin((mAngel-90)*this.oneAngel)*30;
                lanx2 = Math.cos((mAngel-90)*this.oneAngel)*30+this.middleRound.x;
                break;
            }

            case 3:{//leftandRight
                lany1 = this.middleRound.y-Math.sin((mAngel+90)*this.oneAngel)*130;
                lanx1 = Math.cos((mAngel+90)*this.oneAngel)*130+this.middleRound.x;
                lany2 = this.middleRound.y-Math.sin((mAngel+90)*this.oneAngel)*30;
                lanx2 = Math.cos((mAngel+90)*this.oneAngel)*30+this.middleRound.x;

                lany3 = this.middleRound.y-Math.sin((mAngel-90)*this.oneAngel)*130;
                lanx3 = Math.cos((mAngel-90)*this.oneAngel)*130+this.middleRound.x;
                lany4 = this.middleRound.y-Math.sin((mAngel-90)*this.oneAngel)*30;
                lanx4 = Math.cos((mAngel-90)*this.oneAngel)*30+this.middleRound.x;
                break;
            }

            case 4:{//leftandRight
                lany1 = this.middleRound.y-Math.sin((mAngel+90)*this.oneAngel)*90;
                lanx1 = Math.cos((mAngel+90)*this.oneAngel)*90+this.middleRound.x;
                lany2 = this.middleRound.y-Math.sin((mAngel-90)*this.oneAngel)*90;
                lanx2 = Math.cos((mAngel-90)*this.oneAngel)*90+this.middleRound.x;
                break;
            }
        }



        var roadOnj = {x:nx,y:ny,bx:bnx,by:bny,lx1:lanx1,ly1:lany1,lx2:lanx2,ly2:lany2,lx3:lanx3,ly3:lany3,lx4:lanx4,ly4:lany4,lty:lanType,ta:tAngel,ps:pspeed};

        return roadOnj;

    }
    return t;
}(createjs.Container);

var CarmerContainer = function(e){
    function t() {
        e.call(this);

        this.ccontainer = new ChrysanthemumContainer();

        this.addChild(this.ccontainer);

        this.dog1 = new createjs.SpriteSheet({
            "animations":
            {
                "run": [0, 1, "run",.1]
            },
            "images": [StateManager.g_instance.getResult("car01")],
            "frames":
            {
                "height": 155,
                "width":80,
                "regX": 0,
                "regY": 0,
                "count": 64
            }
        });
        this.dog2 = new createjs.SpriteSheet({
            "animations":
            {
                "run": [0, 1, "run",.1]
            },
            "images": [StateManager.g_instance.getResult("car02")],
            "frames":
            {
                "height": 155,
                "width":80,
                "regX": 0,
                "regY": 0,
                "count": 64
            }
        });
        this.dog3 = new createjs.SpriteSheet({
            "animations":
            {
                "run": [0, 1, "run",.1]
            },
            "images": [StateManager.g_instance.getResult("car03")],
            "frames":
            {
                "height": 155,
                "width":80,
                "regX": 0,
                "regY": 0,
                "count": 64
            }
        });
        this.dog4 = new createjs.SpriteSheet({
            "animations":
            {
                "run": [0, 1, "run",.1]
            },
            "images": [StateManager.g_instance.getResult("car04")],
            "frames":
            {
                "height": 155,
                "width":80,
                "regX": 0,
                "regY": 0,
                "count": 64
            }
        });
        this.dog5 = new createjs.SpriteSheet({
            "animations":
            {
                "run": [0, 1, "run",.1]
            },
            "images": [StateManager.g_instance.getResult("car05")],
            "frames":
            {
                "height": 155,
                "width":80,
                "regX": 0,
                "regY": 0,
                "count": 64
            }
        });
        this.dog6 = new createjs.SpriteSheet({
            "animations":
            {
                "run": [0, 1, "run",.1]
            },
            "images": [StateManager.g_instance.getResult("car06")],
            "frames":
            {
                "height": 155,
                "width":80,
                "regX": 0,
                "regY": 0,
                "count": 64
            }
        });


        this.middlePoint = SpriteFactory(this.dog1,"run",320,500,.8,.8,40,77.5);//车
        this.addChild( this.middlePoint);


        this.middlePoint1 = SpriteFactory(this.dog1,"run",320,500,.8,.8,40,77.5);//车

        this.middlePoint2 = SpriteFactory(this.dog2,"run",320,500,.8,.8,40,77.5);//车
        this.middlePoint3 = SpriteFactory(this.dog3,"run",320,500,.8,.8,40,77.5);//车
        this.middlePoint4 = SpriteFactory(this.dog4,"run",320,500,.8,.8,40,77.5);//车
        this.middlePoint5 = SpriteFactory(this.dog5,"run",320,500,.8,.8,40,77.5);//车

        this.middlePoint6 = SpriteFactory(this.dog6,"run",320,500,.8,.8,40,77.5);//车

        this.AngleArr = [];
        this.mpxArr = [];
        this.mpyArr = [];

        this.addTime = 30;

        var endLiness = new createjs.SpriteSheet({
            "animations":
            {
                "shan": [0, 3, "",0.2]
            },
            "images": [StateManager.g_instance.loader.getResult("endLine")],
            "frames":
            {
                "height": 200,
                "width":200,
                "regX": 100,
                "regY": 100,
                "count": 64
            }
        });

        this.endLine  =  new createjs.Sprite(endLiness,"");
        this.endLine.x = 320;
        this.endLine.y = 500;


        this.oneAngel = 2*Math.PI / 360;

        this.lmrType = 0;//0为中间  1为左边  2为右边

        this.cage = 0;

        this.LevelBar = new createjs.Text("Level 1", "100px Arial", "#FFF");
        this.LevelBar.x = 320;
        this.LevelBar.y = 350;
        this.LevelBar.regX = 160;
        this.LevelBar.regY = 0;
        this.LevelBar.scaleX = 0.5;
        this.LevelBar.scaleY = 0.5;

        this.levelNum = 0;


    }
    __extends(t, e);
    t.prototype.update = function(e){

        this.cage++;
        switch(this.cage){
            case 10:{
                var n = this;
                this.addChild(this.LevelBar);
                createjs.Tween.get(this.LevelBar).wait(200).to({scaleX:1,scaleY:1},200).to({scaleX:2,scaleY:2,alpha:0.5},500).call(function(){
                    n.removeChild(n.LevelBar);
                })
                this.levelNum = 1;
                break;
            }

            case 500:{
                var n = this;
                var tn=this.middlePoint;
                createjs.Tween.get(tn).to({alpha:0},200).call(function(){
                    n.removeChild(this);
                })
                this.middlePoint = this.middlePoint2;
                this.addChild(this.middlePoint)
                this.LevelBar.text = "Level 2"
                this.LevelBar.alpha = 1;
                this.LevelBar.scaleX=1;
                this.LevelBar.scaleY=1;
                this.addChild(this.LevelBar);
                createjs.Tween.get(this.LevelBar).wait(200).to({scaleX:1,scaleY:1},200).to({scaleX:2,scaleY:2,alpha:0.5},500).call(function(){
                    n.removeChild(n.LevelBar);
                })
                this.levelNum = 2;
                break;
            }
            case 1000:{
                var n = this;
                var tn=this.middlePoint;
                createjs.Tween.get(tn).to({alpha:0},200).call(function(){
                    n.removeChild(this);
                })
                this.middlePoint = this.middlePoint3;
                this.addChild(this.middlePoint)
                this.LevelBar.text = "Level 3"
                this.LevelBar.alpha = 1;
                this.LevelBar.scaleX=1;
                this.LevelBar.scaleY=1;
                this.addChild(this.LevelBar);
                createjs.Tween.get(this.LevelBar).wait(200).to({scaleX:1,scaleY:1},200).to({scaleX:2,scaleY:2,alpha:0.5},500).call(function(){
                    n.removeChild(n.LevelBar);
                })
                this.levelNum = 3;
                break;
            }
            case 1500:{
                var n = this;
                var tn=this.middlePoint;
                createjs.Tween.get(tn).to({alpha:0},200).call(function(){
                    n.removeChild(this);
                })
                this.middlePoint = this.middlePoint4;
                this.addChild(this.middlePoint)
                this.LevelBar.text = "Level 4"
                this.LevelBar.alpha = 1;
                this.LevelBar.scaleX=1;
                this.LevelBar.scaleY=1;
                this.addChild(this.LevelBar);
                createjs.Tween.get(this.LevelBar).wait(200).to({scaleX:1,scaleY:1},200).to({scaleX:2,scaleY:2,alpha:0.5},500).call(function(){
                    n.removeChild(n.LevelBar);
                })
                this.levelNum = 4;
                break;
            }
            case 2000:{
                var n = this;
                var tn=this.middlePoint;
                createjs.Tween.get(tn).to({alpha:0},200).call(function(){
                    n.removeChild(this);
                })
                this.middlePoint = this.middlePoint5;
                this.addChild(this.middlePoint)
                this.LevelBar.text = "Level 5"
                this.LevelBar.alpha = 1;
                this.LevelBar.scaleX=1;
                this.LevelBar.scaleY=1;
                this.addChild(this.LevelBar);
                createjs.Tween.get(this.LevelBar).wait(200).to({scaleX:1,scaleY:1},200).to({scaleX:2,scaleY:2,alpha:0.5},500).call(function(){
                    n.removeChild(n.LevelBar);
                })
                this.levelNum = 5;
                break;
            }

            case 2500:{
                var n = this;
                var tn=this.middlePoint;
                createjs.Tween.get(tn).to({alpha:0},200).call(function(){
                    n.removeChild(this);
                })
                this.middlePoint = this.middlePoint6;
                this.addChild(this.middlePoint)
                break;
            }
        }

        this.middlePoint.rotation = -(e.an-90);
        if(this.lmrType==1)this.onLeft(e);
        else if(this.lmrType==2)this.onRight(e)
        else if(this.lmrType==0)this.onMiddle(e)

        this.AngleArr.push(e.an);
        this.AngleArr.splice(0,1);


        this.ccontainer.update(e.an,this.middlePoint.x,this.middlePoint.y);

        if(e.lp!=-1){

            if(e.lp==2&&this.lmrType==0){
                this.CgameOver();
            }

            if(e.lp==0&&this.lmrType!=2){
                this.CgameOver();
            }
            if(e.lp==1&&this.lmrType!=1){
                this.CgameOver();
            }

            if(e.lp==3&&this.lmrType!=0){
                  this.CgameOver();
            }

        }

    }
    t.prototype.CgameOver = function(){
        console.log("death")
        this.addChild(this.endLine);
        this.endLine.gotoAndPlay("shan");
        var n = this.parent;
        var self = this;
        createjs.Tween.get(this.endLine).wait(50).to({scaleX:10,scaleY:10},100).call(function(){
            self.removeChild(self.endLine);
            n.gameOver();
        });

    }
    t.prototype.setLmrType = function(type){

        this.lmrType = type;
    }
    t.prototype.onLeft = function(e){
        this.middlePoint.y = 500-Math.sin((e.an+90)*this.oneAngel)*90;
        this.middlePoint.x = Math.cos((e.an+90)*this.oneAngel)*90+320;

    }
    t.prototype.onRight = function(e){
        this.middlePoint.y = 500-Math.sin((e.an-90)*this.oneAngel)*90;
        this.middlePoint.x = Math.cos((e.an-90)*this.oneAngel)*90+320;

    }
    t.prototype.onMiddle = function(e){
        this.middlePoint.x = 320;
        this.middlePoint.y = 500;
    }
    return t;
}(createjs.Container);

var BackgroundContainer = function(e){
    function t() {
        e.call(this);

        this.mAge = 0;
        this.level = 1;

        this.mainBg1 = new createjs.Shape();
        this.mainBg1.graphics.beginFill("#4876FF").drawRect(0, 0, 64, 100)
        this.mainBg1.scaleX = 10;
        this.mainBg1.scaleY = 10;
        this.mainBg1.alpha = .5

        this.mainBg2 = new createjs.Shape();
        this.addChild(this.mainBg2);
        this.mainBg2.graphics.beginFill("#8B5A00").drawRect(0, 0, 64, 100)
        this.mainBg2.scaleX = 10;
        this.mainBg2.scaleY = 10;
        this.mainBg2.alpha = 0;

        this.backmap = new createjs.Bitmap(StateManager.g_instance.getResult("mainbg"));
        this.backmap.regX = 320;
        this.backmap.regY = 500;
        //this.backmap.alpha = 0.5;
        this.backmap.x = 320;
        this.backmap.y = 500;
        this.addChild(this.backmap);

        this.addChild(this.mainBg1);

        this.scoretxt = new createjs.Text("0", "36px Arial", "#FFF");
        this.scoretxt.x = 500;
        this.scoretxt.y = 25;
        this.addChild(this.scoretxt);
        this.scorenum = 0;

    }
    __extends(t, e);
    t.prototype.update = function(e){

        this.mAge++;
        this.scorenum+=2
        this.scoretxt.text = this.scorenum+"KM";

        if(this.mAge%500==0){
            this.turnBg();
        }
    }
    t.prototype.turnBg = function(){
        var n = this;
        if(this.level==1){
            createjs.Tween.get(this.mainBg2).to({alpha:1},1000)
            createjs.Tween.get(this.mainBg1).to({alpha:0},1000)
            this.level++;
        }else if(this.level==2){
            this.mainBg1.graphics.beginFill("#56cb9a").drawRect(0, 0, 64, 100)
            createjs.Tween.get(this.mainBg1).to({alpha:1},1000)
            createjs.Tween.get(this.mainBg2).to({alpha:0},1000)
            this.level++;
        }else if(this.level==3){
            this.mainBg2.graphics.beginFill("#8B2323").drawRect(0, 0, 64, 100)
            createjs.Tween.get(this.mainBg1).to({alpha:0},1000)
            createjs.Tween.get(this.mainBg2).to({alpha:1},1000)
            this.level++;
        }else if(this.level==4){
            this.mainBg1.graphics.beginFill("#8E388E").drawRect(0, 0, 64, 100)
            createjs.Tween.get(this.mainBg1).to({alpha:1},1000)
            createjs.Tween.get(this.mainBg2).to({alpha:0},1000)
            this.level++;
        }

    }
    return t;
}(createjs.Container);

var ChrysanthemumContainer = function(e){
    function t() {
        e.call(this);
        this.cAge = 0;
        this.oneAngel = 2*Math.PI / 360;
        this.regY = 500;
        this.regX = 320;
        this.x = 320;
        this.y = 500;
    }
    __extends(t, e);
    t.prototype.update = function(an,x,y){

        if(this.cAge%10==0){
            this.addDirt(Math.random() * 2 + 1 | 0, x, y,an, 10);
        }
        this.cAge++;


    }
    t.prototype.addDirt = function(count, ix, iy, an,speed){
        this.x = ix;
        this.y = iy;

        this.regY = iy;
        this.regX = ix;

        for(var i = 0; i < count; i++) {
            // clone the original sparkle, so we don't need to set shared properties:


            var sparkle  = new createjs.Bitmap(StateManager.g_instance.getResult("dirt"+GetRandomNum(1,2)));

            // set display properties:
            sparkle.x = ix;
            sparkle.y = iy;

            sparkle.regX = 25;

            var a = GetRandomNum(80,100)*this.oneAngel;
            this.rotation = -(an-90);
            var v = 50


            var tox1 = ix+-Math.cos(GetRandomNum(70,110)*this.oneAngel) * v;
            var tox2 = ix+-Math.cos(GetRandomNum(70,110)*this.oneAngel) * v;
            var tox3 = ix+-Math.cos(GetRandomNum(70,110)*this.oneAngel) * v;


            var toy1 = iy+Math.sin(a) * v;
            var toy2 = iy+2*Math.sin(a) * v;
            var toy3 = iy+3*Math.sin(a) * v;

            sparkle.scaleX = 0.15;
            sparkle.scaleY = 0.15;

            createjs.Tween.get(sparkle).to({x:tox1,y:toy1},200).to({x:tox2,y:toy2},200).to({x:tox3,y:toy3},200).call(function(){
                this.parent.removeChild(this);
            });

            // add to the display list:
            this.addChild(sparkle);
        }

    }
    return t;
}(createjs.Container);
