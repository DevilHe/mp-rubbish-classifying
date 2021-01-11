var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), u = e.getHours(), a = e.getMinutes(), g = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ u, a, g ].map(t).join(":");
    },
    formatYmd: function(e) {
        return [ e.getFullYear(), e.getMonth() + 1, e.getDate() ].map(t).join("/");
    },
    thousandBitSeparator: function(num) {
        return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
            return $1 + ",";
        }) : num.toString().replace(/(\d)(?=(\d{3})+\b)/g, function($0, $1) {
            return $1 + ",";
        }));    
    },
    getDateInfo: function(date) {
        // var myDate = new Date();
        var myDate = date;
        var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var myToday = myDate.getDate(); //获取当前日(1-31)
        var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        // var myHour = myDate.getHours(); //获取当前小时数(0-23)
        // var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
        // var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
        var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var nowDate = myYear + '年' + fillZero(myMonth) + '月' + fillZero(myToday) + '日' + '  ' + week[myDay];
        //  + '  ' + fillZero(myHour) + ':' +
        // fillZero(myMinute) + ':' + fillZero(mySecond) 
        return nowDate;

        function fillZero(str) {
            var realNum;
            if (str < 10) {
                realNum = '0' + str;
            } else {
                realNum = str;
            }
            return realNum;
        }
        // setInterval(getTime, 1000);
    }
};