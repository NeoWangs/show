/*! BUILD: 2018-07-25 */
echarts.wrapper = function($, b) {
    "use strict";
    function c(b, c, d, e) {
        var f = "";
        return f += b,
        f += -1 != navigator.appVersion.indexOf("MSIE 8.") ? $("<span>" + c + "：" + (d || "-") + "</span>").css("font-weight", "bold").prop("outerHTML") : c + "：" + (d || "-"),
        f += !e && "<br/>" || ""
    }
    function d(c, d) {
        return g = echarts.init(c),
	        $(b).on("resize",function() {
	            g.resize()
	        }),h = d,g
    }
    function timeTrendChart(b, d) {
        j.hide(),
        g.setOption($.extend({
            animation: !1,
            tooltip: {
                confine: !1,
                trigger: "axis",
                axisPointer: {
                    type: "cross"
                },
                backgroundColor: "rgba(245, 245, 245, " + i.opacity + ")",
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                textStyle: {
                    color: "#000"
                },
                formatter: function(b) {
                    var d = [];
                    return $.each(b,function(a, b) {
                        0 == a && d.push(c(b.marker, "时间", b.name, !0) + '<hr size=1 style="margin: 3px 0">'),
                        d.push(c(b.marker, b.seriesName, echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, b.data)[0]))
                    }),d.join("")
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: "all"
                },
                label: {
                    backgroundColor: "#777"
                }
            },
            grid: [{
                top: "5%",
                left: "80",
                right: "5%",
                height: "80%"
            }],
            xAxis: [{
                type: "category",
                data: b.timeline,
                splitLine: {
                    show: !1
                },
                axisTick: {
                    show: !1
                }
            }],
            yAxis: [{
                splitArea: {
                    show: !0
                },
                scale: !0,
                axisPointer: {
                    label: {
                        formatter: function(a) {
                            return echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, a.value)[0]
                        }
                    }
                },
                axisLabel: {
                    formatter: function(a) {
                        return echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, a)[0]
                    }
                },
                minInterval: echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct)[2]
            }],
            series: [{
                name: "价格",
                type: "line",
                data: $.map(b.kset,function(a) {
	                    return a[1]
	                }),
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.kset),
                lineStyle: i.lineStyle
            }]
        },d), !0)
    }
    function mainChart(b, d) {
        j.show();
        var e = {
            animation: !1,
            toolbox: {
                show: !0,
                feature: {
                    dataView: {
                        show: !0
                    },
                    restore: {
                        show: !0
                    },
                    dataZoom: {
                        show: !0
                    },
                    saveAsImage: {
                        show: !0
                    },
                    magicType: {
                        type: ["bar", "line"]
                    }
                }
            },
            tooltip: {
                confine: !1,
                trigger: "axis",
                axisPointer: {
                    type: "cross"
                },
                backgroundColor: "rgba(245, 245, 245, " + i.opacity + ")",
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                textStyle: {
                    color: "#000"
                },
                formatter: function(b) {
                    var d = [],
                    e = '<hr size=1 style="margin: 3px 0">',
                    f = b[0].axisId;
                    return $.each(b,function(b, g) {~$.inArray(g.seriesId, j.ids) && $("#" + g.seriesId).html(g.marker + g.seriesName + ":" + (echarts.bocutil.formatCurrency({
                            length: 2,
                            value: g.data
                        })[0] || "-")).css("color", g.color),
                        f == g.axisId && (0 == b && d.push(c(g.marker, "时间", g.name + e, !0)), "kIndex" == g.seriesId ? (d.push(c(g.marker, "开盘价", echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, g.data[1])[0])), d.push(c(g.marker, "收盘价", echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, g.data[2])[0])), d.push(c(g.marker, "最低价", echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, g.data[3])[0])), d.push(c(g.marker, "最高价", echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, g.data[4])[0]))) : d.push(/^MA\d+$/.test(g.seriesName) ? c(g.marker, g.seriesName, echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, g.data)[0]) : c(g.marker, g.seriesName, echarts.bocutil.formatCurrency({
                            length: 2,
                            value: g.data
                        })[0])))
                    }),
                    d.join("")
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: "all"
                }
            },
            grid: [{
                top: "6%",
                left: "80",
                right: "5%",
                height: "40%"
            },
            {
                show: "true",
                borderWidth: "1",
                left: "80",
                right: "5%",
                top: "55%",
                height: "10%"
            },
            {
                show: "true",
                left: "80",
                right: "5%",
                top: "70%",
                height: "10%"
            }],
            xAxis: [{
                type: "category",
                data: b.timeline,
                scale: !0,
                splitNumber: 20,
                min: "dataMin",
                max: "dataMax",
                axisPointer: {
                    label: {
                        backgroundColor: i.invisibleColor,
                        color: i.invisibleColor
                    }
                }
            },
            {
                type: "category",
                gridIndex: 1,
                data: b.timeline,
                scale: !0,
                splitLine: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                axisLine: {
                    show: !1
                },
                axisLabel: {
                    show: !1
                },
                axisPointer: {
                    label: {
                        backgroundColor: i.invisibleColor,
                        color: i.invisibleColor
                    }
                }
            },
            {
                type: "category",
                gridIndex: 2,
                data: b.timeline,
                axisLabel: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                axisLine: {
                    show: !1,
                    lineStyle: {
                        color: i.invisibleColor
                    }
                }
            }],
            yAxis: [{
                scale: !0,
                splitArea: {
                    show: !0
                },
                axisLine: {
                    lineStyle: {
                        color: i.tagColor
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function(a) {
                            return echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, a.value)[0]
                        }
                    }
                },
                axisLabel: {
                    formatter: function(a) {
                        return echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct, a)[0]
                    }
                },
                minInterval: echarts.bocutil.formatCurrency(h.cc1, h.cc2, h.ct)[2]
            },
            {
                //KDJ
                gridIndex: 1,
                scale: !0,
                axisLabel: {
                    show: !1
                },
                axisLine: {
                    show: !1,
                    lineStyle: {
                        color: i.tagColor
                    }
                },
                splitLine: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                axisPointer: {
                    label: {
                        formatter: function(a) {
                            return echarts.bocutil.formatCurrency({
                                length: 2,
                                value: a.value
                            })[0]
                        }
                    }
                }
            },
            {
                //MACD
                gridIndex: 2,
                scale: !0,
                axisLine: {
                    show: !1,
                    lineStyle: {
                        color: i.tagColor
                    }
                },
                axisTick: {
                    show: !1
                },
                splitLine: {
                    show: !1
                },
                axisLabel: {
                    show: !1
                },
                axisPointer: {
                    label: {
                        formatter: function(a) {
                            return echarts.bocutil.formatCurrency({
                                length: 2,
                                value: a.value
                            })[0]
                        }
                    }
                }
            }],
            dataZoom: [{
                type: "inside",
                xAxisIndex: [0, 1, 2],
                minValueSpan: 30,
                //maxValueSpan: 120
            },
            {
                show: !0,
                xAxisIndex: [0, 1, 2],
                type: "slider",
                top: "85%",
                left: "80",
                showDetail: !1
            }],
            series: [{
                name: "道琼期指数",
                id: "kIndex",
                type: "candlestick",
                data: b.kset,
                itemStyle: {
                    normal: {
                        color: i.upColor,
                        color0: i.downColor,
                        borderColor: null,
                        borderColor0: null
                    }
                }
            },
            {
                name: "MA5",
                type: "line",
                data: b.ma5,
                smooth: !0,
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.ma5),
                lineStyle: i.lineStyle
            },
            {
                name: "MA10",
                type: "line",
                data: b.ma10,
                smooth: !0,
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.ma10),
                lineStyle: i.lineStyle
            },
            {
                name: "MA20",
                type: "line",
                data: b.ma20,
                smooth: !0,
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.ma20),
                lineStyle: i.lineStyle
            },
            {
                name: "MA30",
                type: "line",
                data: b.ma30,
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.ma30),
                smooth: !0,
                lineStyle: i.lineStyle
            },
            //KDJ
            {
                name: "K",
                id: "k",
                type: "line",
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.k),
                data: b.k,
                lineStyle: i.lineStyle
            },
            {
                name: "D",
                id: "d",
                type: "line",
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.d),
                data: b.d,
                lineStyle: i.lineStyle
            },
            {
                name: "J",
                id: "j",
                type: "line",
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(this.data),
                data: b.j,
                lineStyle: i.lineStyle
            },
            //MACD
            {
                name: "MACD",
                id: "macd",
                type: "bar",
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: b.macds,
                itemStyle: {
                    normal: {
                        color: function(a) {
                            var b;
                            return b = a.data >= 0 ? i.upColor: i.downColor
                        }
                    }
                }
            },
            {
                name: "DIF",
                id: "dif",
                type: "line",
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.difs),
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: b.difs,
                lineStyle: i.lineStyle
            },
            {
                name: "DEA",
                id: "dea",
                type: "line",
                symbolSize: i.symbolSize,
                showSymbol: i.getShowSymbol(b.deas),
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: b.deas,
                lineStyle: i.lineStyle
            },
            {
                name: "MACD Pointer",
                id: "macdP",
                type: "scatter",
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: b.deas
            }]
        };
        g.setOption($.extend(e, d), !0),
        b.timeline.length > 60 && g.setOption({
            dataZoom: [{
                startValue: b.timeline.length - 61,
                endValue: b.timeline.length - 1
            }]
        }),
        g.on("globalout",
        function() {
            j.clear()
        })
    }
    var g, h, i = {
        upColor: "#ec0000",
        downColor: "#00da3c",
        tagColor: "#777",
        invisibleColor: "transparent",
        currentTag: "day",
        lineStyle: {
            normal: {
                width: 1
            }
        },
        symbolSize: 3,
        showSymbol: !1,
        minValueSpan: 30,
        maxValueSpan: 120,
        getShowSymbol: function(a) {
            return a && 1 === a.length
        },
        tips: {
            upLimitTip: "已经最小了哦！",
            downLimtTip: "已经最大了哦",
            rightLimitTip: "已经最右边了哦",
            leftLimitTip: "已经最左边了哦"
        },
        opacity: .8
    },
    j = {
        ids: ["k", "d", "j", "macd", "dif", "dea"],
        clear: function() {
            $.each(this.ids,
            function(b, c) {
                $("#" + c).html("")
            })
        },
        hide: function() {
            $(".index_container").hide()
        },
        show: function() {
            $(".index_container").show()
        }
    };
    return {
        getChart: function() {
            return g
        },
        init: d,
        renderTimeTrendChart: timeTrendChart,
        renderMainChart: mainChart,
        hideLoading: function() {
            g.hideLoading(),
            g.resize()
        },
        showLoading: function() {
            g.showLoading("default", {
                text: "加载中..."
            })
        }
    }
} (jQuery, window);