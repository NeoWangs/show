/*! BUILD: 2018-07-25 */
echarts.bocutil = function($, winodw) {
    "use strict";
    function uuid() {
        function random() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        return random() + random() + "-" + random() + "-" + random() + "-" + random() + "-" + random() + random() + random()
    }
    function timeFormat(timestamp, type) {
        if (!timestamp) return "";
        switch (timestamp += "", type) {
        case "1":
            return timestamp.slice( - 6, -4) + ":" + timestamp.slice( - 4, -2) + ":" + timestamp.slice( - 2);
        case "2":
        case "3":
            return timestamp.slice(0, 4) + "-" + timestamp.slice(4, 6) + "-" + timestamp.slice(6, 8) + " " + timestamp.slice(8, 10) + ":" + timestamp.slice(10, 12);
        case "4":
        case "5":
        case "6":
            return timestamp.slice(0, 4) + "-" + timestamp.slice(4, 6) + "-" + timestamp.slice(6, 8);
        default:
            var c = timestamp.slice(0, 4) + "-" + timestamp.slice(4, 6) + "-" + timestamp.slice(6, 8) + " " + timestamp.slice(8, 10) + ":" + timestamp.slice(10, 12) + ":" + timestamp.slice(12, 14);
            return c.match(/\d.*\d/)[0]
        }
    }
    function adaptData(list, type) { //type:分时图为1，k线图为4
        function sort(a) {
            return a.sort(function(a, list) {
                return a.bussTime - list.bussTime
            })
        }
        var data = {
            timeline : [],
            kset : [],
            lastRefreshTime : null,
            updateTime : null,
            ma5 : [],
	        ma10 : [],
	        ma20 : [],
	        ma30 : [],
	        macds : [],
	        deas : [],
	        difs : [],
	        k : [],
	        d : [],
	        j : []
        };
        var g = sort(list[0]);
        if (g.length && (data.lastRefreshTime = g[g.length - 1].bussTime, data.updateTime = g[g.length - 2] && g[g.length - 2].bussTime || ""), 
            $.each(g,function(a, b) {
             (1 != type || 1 == type && data.lastRefreshTime.slice(0, 8) == b.bussTime.slice(0, 8)) && (data.kset.push([b.openPrice, b.closePrice, b.lowPrice, b.highPrice]), data.timeline.push(timeFormat(b.bussTime, type)))
            }), 1 == type){
                 return n.cache(data, type); //分时图over
            }

        var h = sort(list[1]),
	        time = h[0] && h[0].bussTime,
	        j = {
	            5 : 0,
	            10 : 0,
	            20 : 0,
	            30 : 0
	        },
	        k = 0;
        $.each(h,function(i, item) {
            var d = data["ma" + item.period];
            for (time !== item.bussTime && (time = item.bussTime, k++); item.bussTime > list[0][k + j[item.period]].bussTime;) j[item.period]++;
            d[k + j[item.period]] = item.maValue
        });

        $.each(sort(list[2]),function(i, item) {
            data.macds[i] = item.macd,
            data.deas[i] = item.dea,
            data.difs[i] = item.diff;
        });

        $.each(sort(list[3]),function(i, item) {
            data.k[i] = item.kval,
            data.d[i] = item.dval,
            data.j[i] = item.jval
        });

        $.each(data,function(i, b) {
            b instanceof Array && "kset" != i && (b.length = data.kset.length)
        });
        return n.cache(data, type)
    }
    function getData(request) {
        return $.extend(request.data, {
            startTime: n.cacheUpdateTime[request.data.queryType] || "",
            uuid: uuid(),
            clientid: base.clientid,
            client_secret: base.client_secret
        }),
        $.each(request.data,function(a, c) {
            request.url += ~request.url.indexOf("?") ? "&" + a + "=" + c: "?" + a + "=" + c
        }),
        $.jsonp({
            async: !1,
            url: base.baseUrl + request.url,
            callbackParameter: "callback",
            dataType: "jsonp"
        })
    }
    function getUrlParams() {
        var c = b.location.href,
        d = c.split("?"),
        e = {};
        if (d[1]) {
            var f = d[1].split("&");
            $.each(f,
            function(a, b) {
                var c = b.split("=");
                e[c[0]] = c[1]
            })
        }
        return e
    }
    function getCurrentTime() {
        var a = new Date;
        return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + " " + ("0" + a.getHours()).slice( - 2) + ":" + ("0" + a.getMinutes()).slice( - 2) + ":" + ("0" + a.getSeconds()).slice( - 2)
    }
    function getLastRefreshTime(a) {
        return timeFormat(n.lastRefreshTime[a])
    }
    function showError(b) {
        $("#overlay").addClass("show").find("#error").html(b || "未知错误")
    }
    function hideError() {
        $("#overlay").removeClass("show")
    }
    function formatCurrency(a, b, c, d) {
        var e = "object" == typeof a ? a.length: 0;
        if ("F" == c ? e = "027" != a && "027" != b || "013" == a ? 4 : 2 : "G" == c && (e = "068" == a || "036" == a ? 3 : 2), e) {
            var f = ((d || a && a.value || "") + "").split("."),
            g = f[0];
            return g && (g += "." + ((f[1] || "") + "0000").slice(0, e)),
            [g, e, 1 / Math.pow(10, e)]
        }
    }
    var base = {
        baseUrl: "https://openapi.boc.cn/erh/unlogin/",//b.opener.CU.getUrl("kline"),
        clientid: '531',//b.opener.CU.getUrl("kline.clientId"),
        client_secret: "0f8486dadab4b129fa9b9e61a3ad301824b4b8ae2e385c11d5"//b.opener.CU.getUrl("kline.clientSecret")
    };
    winodw.console && console.log || (winodw.console = {
        log: function() {},
        debug: function() {},
        info: function() {},
        warn: function() {},
        error: function() {}
    });
    var n = {
        lastRefreshTime: {},
        cacheUpdateTime: {},
        cachedData: {},
        cache: function(a, b) {
            return this._merge(this.cachedData[b] || (this.cachedData[b] = []), a, b),
            a.updateTime && (this.cacheUpdateTime[b] = a.updateTime),
            a.lastRefreshTime && (this.lastRefreshTime[b] = a.lastRefreshTime || ""),
            this.cachedData[b]
        },
        _merge: function(b, c, e) {
            var f, g = timeFormat(this.cacheUpdateTime[e], e);
            return $.each(c.timeline,
            function(a, b) {
                return g == b ? (f = a + 1, !1) : void 0
            }),
            $.each(c,
            function(a, c) {
                b[a] && b[a] instanceof Array ? c.length && (b[a].pop(), Array.prototype.push.apply(b[a], c.slice(f || 0))) : b[a] = c
            }),
            b
        }
    };
    return {
        getdata: getData,
        adaptData: adaptData,
        getUrlParams: getUrlParams,
        getCurrentTime: getCurrentTime,
        getLastRefreshTime: getLastRefreshTime,
        showError: showError,
        hideError: hideError,
        formatCurrency: formatCurrency
    }
} (jQuery, window);