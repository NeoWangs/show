/*! BUILD: 2018-07-25 */
!function($) {
    "use strict";
    var params = {
        	c1: "人民币银",
			c2: "人民币元",
			firstCoinCode: "068", //firstCoinCode=068白银，035黄金，845铂金，844钯金
			lastCoinCode: "001",
			cn: "贵金属",
			ct: "G",
			th: "M"
        },
	    type = "4",
	    postArr = [];
    function init() {
        echarts.wrapper.init(document.getElementById("main"), params);
        run(type);
        $("#menu").children("button").on("click",function() {
            $("#error").html(""),
            $("#menu").children().removeClass("selected");
            var b = $(this).addClass("selected");
            	type = b.attr("value"),
            run(type)
        });
        $("#refresh").on("click",function() {
            run(type)
        });
    }
    function run(type) {
        echarts.bocutil.hideError();
        var c = {
            tradeHead: "A",
            queryType: type + "",
            firstCoinCode: "Au99.99",
            lastCoinCode: "",
            cardType: "A",
            branchNo: "00020",
            startTime: ""
        };
        $.extend(c, {
            tradeHead: params.th,
            firstCoinCode: params.firstCoinCode,
            lastCoinCode: params.lastCoinCode,
            cardType: params.ct
        }),
        echarts.wrapper.showLoading(),
        postArr.length && $.each(postArr,
        function($, b) {
            "pending" === b.state() && b.abort()
        }),
        postArr.length = 0;
        var g = echarts.bocutil.getdata({
            data: c,
            url: "kline_data_query"
        });
        if (postArr.push(g), 1 != type) {
            var i = echarts.bocutil.getdata({
                data: c,
                url: "ma_data_query"
            }),
            j = echarts.bocutil.getdata({
                data: c,
                url: "macd_data_query"
            }),
            k = echarts.bocutil.getdata({
                data: c,
                url: "kdj_data_query"
            });
            postArr.push(i, j, k);
        }
        $.when.apply($, $.map(postArr,function(b) {
            return b.then(function(b) {
                var c = $.Deferred();
                return b.msgcde ? "ERH_000011" == b.msgcde ? c.resolve({
                    sapList: []
                }) : c.reject(b, "data_error", b) : c.resolve(b),
                c.promise()
            })
        })).done(function(Kline, MA, MACD, KDJ) {
        	console.log(Kline, MA, MACD, KDJ)
            var k = [{
                text: decodeURI(unescape(params.cn) || "") + "(" + decodeURI(unescape(params.c1) || "") + "/" + decodeURI(unescape(params.c2) || "") + ")",
                left: "center"
            }];
            1 == postArr.length ? echarts.wrapper.renderTimeTrendChart(echarts.bocutil.adaptData([Kline.sapList], type), {
                title: k[0]
            }) : echarts.wrapper.renderMainChart(echarts.bocutil.adaptData([Kline.sapList, MA.sapList, MACD.sapList, KDJ.sapList], type), {
                title: k
            }),
            $("#stateText").html("上次更新时间：" + echarts.bocutil.getLastRefreshTime(type))
        }).fail(function(a, e, c) {
            "data_error" == e ? echarts.bocutil.showError(c.rtnmsg) : "error" == e && echarts.bocutil.showError("网络错误")
        }).always(function() {
            echarts.wrapper.hideLoading()
        })
    }
    init();
} (jQuery, window);