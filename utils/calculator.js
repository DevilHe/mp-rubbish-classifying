function r(r) {
    return {
        error: "error",
        msg: r
    };
}

function t(r, t, a) {
    var e = r - t - a, o = [ {
        level: 5e3,
        rate: .03
    }, {
        level: 8e3,
        rate: .1
    }, {
        level: 17e3,
        rate: .2
    }, {
        level: 3e4,
        rate: .25
    }, {
        level: 4e4,
        rate: .3
    }, {
        level: 6e4,
        rate: .35
    }, {
        level: 85e3,
        rate: .45
    } ], n = 0, u = 0, l = 0;
    for (var s in o) {
        var h = o[s];
        if (e < h.level) break;
        n += (e - h.level) * (h.rate - u), u += h.rate, l = h.rate;
    }
    return n = Math.round(100 * n) / 100, {
        tax: n,
        cur: l,
        taxN: e - n + a
    };
}

function a(r, t) {
    for (var a = 0, o = 0, n = 0, u = [], l = 1; l <= r.length; l++) {
        var s = r[l - 1], h = s.salary, p = s.insur, c = h - p - s.discus - t, i = 0;
        c > 0 && (i = e(a, c, 0, o)), a += c > 0 ? c : 0, o += i;
        var d = h - i - p;
        n += d = d > 0 ? d : 0;
        var v = {
            monthName: "第" + l + "月",
            monthAll: Math.round(100 * h) / 100,
            monthGet: Math.round(100 * d) / 100,
            monthTax: Math.round(100 * i) / 100
        };
        u.push(v);
    }
    return {
        monthArray: u,
        getAll: Math.round(100 * n) / 100,
        deductAll: Math.round(100 * o) / 100
    };
}

function e(r, t, a, e) {
    var o = r + t, n = .03, u = 0;
    return o > 96e4 ? (n = .45, u = 181920) : o > 66e4 ? (n = .35, u = 85920) : o > 42e4 ? (n = .3, 
    u = 52920) : o > 3e5 ? (n = .25, u = 31920) : o > 144e3 ? (n = .2, u = 16920) : o > 36e3 && (n = .1, 
    u = 2520), o * n - u - a - e;
}

function o(r, t, a) {
    if ("1" == t) {
        var e = r / (1 + a / 100);
        return e = Math.round(100 * e) / 100, {
            tax: o = Math.round(100 * (r - e)) / 100,
            taxP: e,
            taxN: r
        };
    }
    if ("0" == t) {
        var o = Math.round(r * a) / 100, n = 1 * r + o;
        return n = Math.round(100 * n) / 100, {
            tax: o,
            taxN: n,
            taxP: r
        };
    }
    return M;
}

function n(r, t, a, e) {
    var o = r - t - a;
    if (o <= e) console.log(o); else {
        var n = .03 * (o - e), u = o - n;
        console.log(n), console.log(u);
    }
}

function u(r, t, a, e) {
    return "1" == r ? l(t, a, e / 100) : "0" == r ? s(t, a, e / 100) : void 0;
}

function l(r, t, a) {
    r = parseFloat(r);
    for (var e = parseInt(t), o = parseFloat(a) / 12, n = r * o * Math.pow(1 + o, e) / (Math.pow(1 + o, e) - 1), u = e * n - r, l = u + r, s = [], h = u + r, p = 1; p <= e; p++) {
        var c = r * o * (Math.pow(1 + o, e) - Math.pow(1 + o, p - 1)) / (Math.pow(1 + o, e) - 1);
        (h -= n) < 0 && (h = 0), c = Math.round(100 * c) / 100;
        var i = Math.round(100 * n) / 100, d = {
            monthName: "第" + p + "月",
            monthRate: c,
            curMoney: i,
            yueBenjin: i - c,
            leftFund: Math.round(100 * h) / 100
        };
        s.push(d);
    }
    return n = Math.round(100 * n) / 100, u = Math.round(100 * u) / 100, l = Math.round(100 * l) / 100, 
    {
        per: n,
        interest: u,
        totalPrice: l,
        monthArray: s
    };
}

function s(r, t, a) {
    r = parseFloat(r);
    for (var e = parseInt(t), o = parseFloat(a) / 12, n = r / e, u = n + r * o, l = (n + r * o + r / e * (1 + o)) / 2 * e - r, s = l + r, h = [], p = l + r, c = 0, i = 1; i <= e; i++) {
        var d = (r - (c = n * (i - 1))) * o, v = n + d;
        (p -= v) < 0 && (p = 0);
        var M = {
            monthName: "第" + i + "月",
            monthRate: d = Math.round(100 * d) / 100,
            perBenjin: Math.round(100 * n) / 100,
            curMoney: v = Math.round(100 * v) / 100,
            leftFund: Math.round(100 * p) / 100
        };
        h.push(M);
    }
    return u = Math.round(100 * u) / 100, l = Math.round(100 * l) / 100, s = Math.round(100 * s) / 100, 
    {
        firstMonth: u,
        interest: l,
        totalPrice: s,
        monthArray: h
    };
}

function h(r, t, a) {
    for (var e = 1 + a, o = 1, n = 0; n < t; n++) o *= e;
    return r * a * o / (o - 1);
}

function p(r, t, a, e, o) {
    var n = h(r, t, e), u = 1 / r;
    return o > 100 ? e : n - a > u ? p(r, t, a, e - .01 / o, o + 1) : n - a > 0 ? e : n - a > -u / 2 ? e : p(r, t, a, e + .01 / o, o + 1);
}

function c(t, a, e) {
    t = Number(t), a = Number(a);
    var o = (e = Number(e)) * a;
    if (o < t) return r("还款总额不能小于贷款总额");
    if (o == t) return {
        rate: 0
    };
    var n = 2 * a * ((o - t) / t / a * 12) / (a + 1);
    return n = p(t, a, e, n / 12, 1), n = Math.round(1e4 * n * 12) / 100, {
        rate: n
    };
}

function i(r) {
    var t = r.split("-");
    if (3 != t.length) return "error";
    var a = parseInt(t[0]), e = parseInt(t[1]), o = parseInt(t[2]), n = new Date(a, e - 1, o), u = new Date(), l = u.getFullYear(), s = u.getMonth() + 1, h = u.getDate(), p = s > e || s == e && h >= o ? l - a : l - a - 1, c = l - a + 1, i = u.getTime() - n.getTime();
    return {
        zage: p,
        xage: c,
        days_all: parseInt(i / 864e5) + 1
    };
}

function d(r) {
    var t = 30 * r, a = 360 * r;
    return t = Math.round(t) / 100, a = Math.round(a) / 100, {
        mrate: t,
        yrate: a
    };
}

function v(r) {
    var t = r.split("-");
    if (3 != t.length) return "error";
    var a = parseInt(t[0]), e = parseInt(t[1]), o = parseInt(t[2]), r = new Date(a, e - 1, o), n = new Date(), u = r.getTime() - n.getTime();
    return {
        days_all: parseInt(u / 864e5) + 1
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ptaxCalculator = t, exports.ptax2019Calculator = a, exports._ptaxOne = e, 
exports.taxCalculator = o, exports.houseCalculator = n, exports.loanCalculator = u, 
exports.loanBenxi = l, exports.loadBenjin = s, exports.loanPerCalculator = h, exports.handleRate = p, 
exports.rateCalculator = c, exports.ageCalculator = i, exports.dayCalculator = d, 
exports.dateCalculator = v;

var M = {
    error: "error",
    msg: "出错了啊"
};

module.exports = {
    ptaxCalculator: t,
    taxCalculator: o,
    houseCalculator: n,
    loanCalculator: u,
    rateCalculator: c,
    ageCalculator: i,
    loanPerCalculator: h,
    dayCalculator: d,
    dateCalculator: v,
    ptax2019Calculator: a
};