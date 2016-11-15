(function () {
	var t = this,
	e = t._,
	n = {},
	i = Array.prototype,
	s = Object.prototype,
	r = Function.prototype,
	o = i.push,
	a = i.slice,
	l = i.concat,
	u = s.toString,
	h = s.hasOwnProperty,
	c = i.forEach,
	p = i.map,
	d = i.reduce,
	f = i.reduceRight,
	m = i.filter,
	g = i.every,
	v = i.some,
	_ = i.indexOf,
	y = i.lastIndexOf,
	b = Array.isArray,
	x = Object.keys,
	w = r.bind,
	T = function (t) {
		return t instanceof T ? t : this instanceof T ? (this._wrapped = t, void 0) : new T(t)
	};
	"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = T), exports._ = T) : t._ = T,
	T.VERSION = "1.4.4";
	var C = T.each = T.forEach = function (t, e, i) {
		if (null != t)
			if (c && t.forEach === c)
				t.forEach(e, i);
			else if (t.length === +t.length) {
				for (var s = 0, r = t.length; r > s; s++)
					if (e.call(i, t[s], s, t) === n)
						return
			} else
				for (var o in t)
					if (T.has(t, o) && e.call(i, t[o], o, t) === n)
						return
	};
	T.map = T.collect = function (t, e, n) {
		var i = [];
		return null == t ? i : p && t.map === p ? t.map(e, n) : (C(t, function (t, s, r) {
				i[i.length] = e.call(n, t, s, r)
			}), i)
	};
	var E = "Reduce of empty array with no initial value";
	T.reduce = T.foldl = T.inject = function (t, e, n, i) {
		var s = arguments.length > 2;
		if (null == t && (t = []), d && t.reduce === d)
			return i && (e = T.bind(e, i)), s ? t.reduce(e, n) : t.reduce(e);
		if (C(t, function (t, r, o) {
				s ? n = e.call(i, n, t, r, o) : (n = t, s = !0)
			}), !s)
			throw new TypeError(E);
		return n
	},
	T.reduceRight = T.foldr = function (t, e, n, i) {
		var s = arguments.length > 2;
		if (null == t && (t = []), f && t.reduceRight === f)
			return i && (e = T.bind(e, i)), s ? t.reduceRight(e, n) : t.reduceRight(e);
		var r = t.length;
		if (r !== +r) {
			var o = T.keys(t);
			r = o.length
		}
		if (C(t, function (a, l, u) {
				l = o ? o[--r] : --r,
				s ? n = e.call(i, n, t[l], l, u) : (n = t[l], s = !0)
			}), !s)
			throw new TypeError(E);
		return n
	},
	T.find = T.detect = function (t, e, n) {
		var i;
		return S(t, function (t, s, r) {
			return e.call(n, t, s, r) ? (i = t, !0) : void 0
		}),
		i
	},
	T.filter = T.select = function (t, e, n) {
		var i = [];
		return null == t ? i : m && t.filter === m ? t.filter(e, n) : (C(t, function (t, s, r) {
				e.call(n, t, s, r) && (i[i.length] = t)
			}), i)
	},
	T.reject = function (t, e, n) {
		return T.filter(t, function (t, i, s) {
			return !e.call(n, t, i, s)
		}, n)
	},
	T.every = T.all = function (t, e, i) {
		e || (e = T.identity);
		var s = !0;
		return null == t ? s : g && t.every === g ? t.every(e, i) : (C(t, function (t, r, o) {
				return (s = s && e.call(i, t, r, o)) ? void 0 : n
			}), !!s)
	};
	var S = T.some = T.any = function (t, e, i) {
		e || (e = T.identity);
		var s = !1;
		return null == t ? s : v && t.some === v ? t.some(e, i) : (C(t, function (t, r, o) {
				return s || (s = e.call(i, t, r, o)) ? n : void 0
			}), !!s)
	};
	T.contains = T.include = function (t, e) {
		return null == t ? !1 : _ && t.indexOf === _ ? -1 != t.indexOf(e) : S(t, function (t) {
			return t === e
		})
	},
	T.invoke = function (t, e) {
		var n = a.call(arguments, 2),
		i = T.isFunction(e);
		return T.map(t, function (t) {
			return (i ? e : t[e]).apply(t, n)
		})
	},
	T.pluck = function (t, e) {
		return T.map(t, function (t) {
			return t[e]
		})
	},
	T.where = function (t, e, n) {
		return T.isEmpty(e) ? n ? null : [] : T[n ? "find" : "filter"](t, function (t) {
			for (var n in e)
				if (e[n] !== t[n])
					return !1;
			return !0
		})
	},
	T.findWhere = function (t, e) {
		return T.where(t, e, !0)
	},
	T.max = function (t, e, n) {
		if (!e && T.isArray(t) && t[0] === +t[0] && 65535 > t.length)
			return Math.max.apply(Math, t);
		if (!e && T.isEmpty(t))
			return -1 / 0;
		var i = {
			computed : -1 / 0,
			value : -1 / 0
		};
		return C(t, function (t, s, r) {
			var o = e ? e.call(n, t, s, r) : t;
			o >= i.computed && (i = {
					value : t,
					computed : o
				})
		}),
		i.value
	},
	T.min = function (t, e, n) {
		if (!e && T.isArray(t) && t[0] === +t[0] && 65535 > t.length)
			return Math.min.apply(Math, t);
		if (!e && T.isEmpty(t))
			return 1 / 0;
		var i = {
			computed : 1 / 0,
			value : 1 / 0
		};
		return C(t, function (t, s, r) {
			var o = e ? e.call(n, t, s, r) : t;
			i.computed > o && (i = {
					value : t,
					computed : o
				})
		}),
		i.value
	},
	T.shuffle = function (t) {
		var e,
		n = 0,
		i = [];
		return C(t, function (t) {
			e = T.random(n++),
			i[n - 1] = i[e],
			i[e] = t
		}),
		i
	};
	var N = function (t) {
		return T.isFunction(t) ? t : function (e) {
			return e[t]
		}
	};
	T.sortBy = function (t, e, n) {
		var i = N(e);
		return T.pluck(T.map(t, function (t, e, s) {
				return {
					value : t,
					index : e,
					criteria : i.call(n, t, e, s)
				}
			}).sort(function (t, e) {
				var n = t.criteria,
				i = e.criteria;
				if (n !== i) {
					if (n > i || void 0 === n)
						return 1;
					if (i > n || void 0 === i)
						return -1
				}
				return t.index < e.index ? -1 : 1
			}), "value")
	};
	var k = function (t, e, n, i) {
		var s = {},
		r = N(e || T.identity);
		return C(t, function (e, o) {
			var a = r.call(n, e, o, t);
			i(s, a, e)
		}),
		s
	};
	T.groupBy = function (t, e, n) {
		return k(t, e, n, function (t, e, n) {
			(T.has(t, e) ? t[e] : t[e] = []).push(n)
		})
	},
	T.countBy = function (t, e, n) {
		return k(t, e, n, function (t, e) {
			T.has(t, e) || (t[e] = 0),
			t[e]++
		})
	},
	T.sortedIndex = function (t, e, n, i) {
		n = null == n ? T.identity : N(n);
		for (var s = n.call(i, e), r = 0, o = t.length; o > r; ) {
			var a = r + o >>> 1;
			s > n.call(i, t[a]) ? r = a + 1 : o = a
		}
		return r
	},
	T.toArray = function (t) {
		return t ? T.isArray(t) ? a.call(t) : t.length === +t.length ? T.map(t, T.identity) : T.values(t) : []
	},
	T.size = function (t) {
		return null == t ? 0 : t.length === +t.length ? t.length : T.keys(t).length
	},
	T.first = T.head = T.take = function (t, e, n) {
		return null == t ? void 0 : null == e || n ? t[0] : a.call(t, 0, e)
	},
	T.initial = function (t, e, n) {
		return a.call(t, 0, t.length - (null == e || n ? 1 : e))
	},
	T.last = function (t, e, n) {
		return null == t ? void 0 : null == e || n ? t[t.length - 1] : a.call(t, Math.max(t.length - e, 0))
	},
	T.rest = T.tail = T.drop = function (t, e, n) {
		return a.call(t, null == e || n ? 1 : e)
	},
	T.compact = function (t) {
		return T.filter(t, T.identity)
	};
	var I = function (t, e, n) {
		return C(t, function (t) {
			T.isArray(t) ? e ? o.apply(n, t) : I(t, e, n) : n.push(t)
		}),
		n
	};
	T.flatten = function (t, e) {
		return I(t, e, [])
	},
	T.without = function (t) {
		return T.difference(t, a.call(arguments, 1))
	},
	T.uniq = T.unique = function (t, e, n, i) {
		T.isFunction(e) && (i = n, n = e, e = !1);
		var s = n ? T.map(t, n, i) : t,
		r = [],
		o = [];
		return C(s, function (n, i) {
			(e ? i && o[o.length - 1] === n : T.contains(o, n)) || (o.push(n), r.push(t[i]))
		}),
		r
	},
	T.union = function () {
		return T.uniq(l.apply(i, arguments))
	},
	T.intersection = function (t) {
		var e = a.call(arguments, 1);
		return T.filter(T.uniq(t), function (t) {
			return T.every(e, function (e) {
				return T.indexOf(e, t) >= 0
			})
		})
	},
	T.difference = function (t) {
		var e = l.apply(i, a.call(arguments, 1));
		return T.filter(t, function (t) {
			return !T.contains(e, t)
		})
	},
	T.zip = function () {
		for (var t = a.call(arguments), e = T.max(T.pluck(t, "length")), n = Array(e), i = 0; e > i; i++)
			n[i] = T.pluck(t, "" + i);
		return n
	},
	T.object = function (t, e) {
		if (null == t)
			return {};
		for (var n = {}, i = 0, s = t.length; s > i; i++)
			e ? n[t[i]] = e[i] : n[t[i][0]] = t[i][1];
		return n
	},
	T.indexOf = function (t, e, n) {
		if (null == t)
			return -1;
		var i = 0,
		s = t.length;
		if (n) {
			if ("number" != typeof n)
				return i = T.sortedIndex(t, e), t[i] === e ? i : -1;
			i = 0 > n ? Math.max(0, s + n) : n
		}
		if (_ && t.indexOf === _)
			return t.indexOf(e, n);
		for (; s > i; i++)
			if (t[i] === e)
				return i;
		return -1
	},
	T.lastIndexOf = function (t, e, n) {
		if (null == t)
			return -1;
		var i = null != n;
		if (y && t.lastIndexOf === y)
			return i ? t.lastIndexOf(e, n) : t.lastIndexOf(e);
		for (var s = i ? n : t.length; s--; )
			if (t[s] === e)
				return s;
		return -1
	},
	T.range = function (t, e, n) {
		1 >= arguments.length && (e = t || 0, t = 0),
		n = arguments[2] || 1;
		for (var i = Math.max(Math.ceil((e - t) / n), 0), s = 0, r = Array(i); i > s; )
			r[s++] = t, t += n;
		return r
	},
	T.bind = function (t, e) {
		if (t.bind === w && w)
			return w.apply(t, a.call(arguments, 1));
		var n = a.call(arguments, 2);
		return function () {
			return t.apply(e, n.concat(a.call(arguments)))
		}
	},
	T.partial = function (t) {
		var e = a.call(arguments, 1);
		return function () {
			return t.apply(this, e.concat(a.call(arguments)))
		}
	},
	T.bindAll = function (t) {
		var e = a.call(arguments, 1);
		return 0 === e.length && (e = T.functions(t)),
		C(e, function (e) {
			t[e] = T.bind(t[e], t)
		}),
		t
	},
	T.memoize = function (t, e) {
		var n = {};
		return e || (e = T.identity),
		function () {
			var i = e.apply(this, arguments);
			return T.has(n, i) ? n[i] : n[i] = t.apply(this, arguments)
		}
	},
	T.delay = function (t, e) {
		var n = a.call(arguments, 2);
		return setTimeout(function () {
			return t.apply(null, n)
		}, e)
	},
	T.defer = function (t) {
		return T.delay.apply(T, [t, 1].concat(a.call(arguments, 1)))
	},
	T.throttle = function (t, e) {
		var n,
		i,
		s,
		r,
		o = 0,
		a = function () {
			o = new Date,
			s = null,
			r = t.apply(n, i)
		};
		return function () {
			var l = new Date,
			u = e - (l - o);
			return n = this,
			i = arguments,
			0 >= u ? (clearTimeout(s), s = null, o = l, r = t.apply(n, i)) : s || (s = setTimeout(a, u)),
			r
		}
	},
	T.debounce = function (t, e, n) {
		var i,
		s;
		return function () {
			var r = this,
			o = arguments,
			a = function () {
				i = null,
				n || (s = t.apply(r, o))
			},
			l = n && !i;
			return clearTimeout(i),
			i = setTimeout(a, e),
			l && (s = t.apply(r, o)),
			s
		}
	},
	T.once = function (t) {
		var e,
		n = !1;
		return function () {
			return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
		}
	},
	T.wrap = function (t, e) {
		return function () {
			var n = [t];
			return o.apply(n, arguments),
			e.apply(this, n)
		}
	},
	T.compose = function () {
		var t = arguments;
		return function () {
			for (var e = arguments, n = t.length - 1; n >= 0; n--)
				e = [t[n].apply(this, e)];
			return e[0]
		}
	},
	T.after = function (t, e) {
		return 0 >= t ? e() : function () {
			return 1 > --t ? e.apply(this, arguments) : void 0
		}
	},
	T.keys = x || function (t) {
		if (t !== Object(t))
			throw new TypeError("Invalid object");
		var e = [];
		for (var n in t)
			T.has(t, n) && (e[e.length] = n);
		return e
	},
	T.values = function (t) {
		var e = [];
		for (var n in t)
			T.has(t, n) && e.push(t[n]);
		return e
	},
	T.pairs = function (t) {
		var e = [];
		for (var n in t)
			T.has(t, n) && e.push([n, t[n]]);
		return e
	},
	T.invert = function (t) {
		var e = {};
		for (var n in t)
			T.has(t, n) && (e[t[n]] = n);
		return e
	},
	T.functions = T.methods = function (t) {
		var e = [];
		for (var n in t)
			T.isFunction(t[n]) && e.push(n);
		return e.sort()
	},
	T.extend = function (t) {
		return C(a.call(arguments, 1), function (e) {
			if (e)
				for (var n in e)
					t[n] = e[n]
		}),
		t
	},
	T.pick = function (t) {
		var e = {},
		n = l.apply(i, a.call(arguments, 1));
		return C(n, function (n) {
			n in t && (e[n] = t[n])
		}),
		e
	},
	T.omit = function (t) {
		var e = {},
		n = l.apply(i, a.call(arguments, 1));
		for (var s in t)
			T.contains(n, s) || (e[s] = t[s]);
		return e
	},
	T.defaults = function (t) {
		return C(a.call(arguments, 1), function (e) {
			if (e)
				for (var n in e)
					null == t[n] && (t[n] = e[n])
		}),
		t
	},
	T.clone = function (t) {
		return T.isObject(t) ? T.isArray(t) ? t.slice() : T.extend({}, t) : t
	},
	T.tap = function (t, e) {
		return e(t),
		t
	};
	var M = function (t, e, n, i) {
		if (t === e)
			return 0 !== t || 1 / t == 1 / e;
		if (null == t || null == e)
			return t === e;
		t instanceof T && (t = t._wrapped),
		e instanceof T && (e = e._wrapped);
		var s = u.call(t);
		if (s != u.call(e))
			return !1;
		switch (s) {
		case "[object String]":
			return t == e + "";
		case "[object Number]":
			return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
		case "[object Date]":
		case "[object Boolean]":
			return +t == +e;
		case "[object RegExp]":
			return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
		}
		if ("object" != typeof t || "object" != typeof e)
			return !1;
		for (var r = n.length; r--; )
			if (n[r] == t)
				return i[r] == e;
		n.push(t),
		i.push(e);
		var o = 0,
		a = !0;
		if ("[object Array]" == s) {
			if (o = t.length, a = o == e.length)
				for (; o-- && (a = M(t[o], e[o], n, i)); );
		} else {
			var l = t.constructor,
			h = e.constructor;
			if (l !== h && !(T.isFunction(l) && l instanceof l && T.isFunction(h) && h instanceof h))
				return !1;
			for (var c in t)
				if (T.has(t, c) && (o++, !(a = T.has(e, c) && M(t[c], e[c], n, i))))
					break;
			if (a) {
				for (c in e)
					if (T.has(e, c) && !o--)
						break;
				a = !o
			}
		}
		return n.pop(),
		i.pop(),
		a
	};
	T.isEqual = function (t, e) {
		return M(t, e, [], [])
	},
	T.isEmpty = function (t) {
		if (null == t)
			return !0;
		if (T.isArray(t) || T.isString(t))
			return 0 === t.length;
		for (var e in t)
			if (T.has(t, e))
				return !1;
		return !0
	},
	T.isElement = function (t) {
		return !(!t || 1 !== t.nodeType)
	},
	T.isArray = b || function (t) {
		return "[object Array]" == u.call(t)
	},
	T.isObject = function (t) {
		return t === Object(t)
	},
	C(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (t) {
		T["is" + t] = function (e) {
			return u.call(e) == "[object " + t + "]"
		}
	}),
	T.isArguments(arguments) || (T.isArguments = function (t) {
		return !(!t || !T.has(t, "callee"))
	}),
	T.isFunction = function (t) {
		return "function" == typeof t
	},
	T.isFinite = function (t) {
		return isFinite(t) && !isNaN(parseFloat(t))
	},
	T.isNaN = function (t) {
		return T.isNumber(t) && t != +t
	},
	T.isBoolean = function (t) {
		return t === !0 || t === !1 || "[object Boolean]" == u.call(t)
	},
	T.isNull = function (t) {
		return null === t
	},
	T.isUndefined = function (t) {
		return void 0 === t
	},
	T.has = function (t, e) {
		return h.call(t, e)
	},
	T.noConflict = function () {
		return t._ = e,
		this
	},
	T.identity = function (t) {
		return t
	},
	T.times = function (t, e, n) {
		for (var i = Array(t), s = 0; t > s; s++)
			i[s] = e.call(n, s);
		return i
	},
	T.random = function (t, e) {
		return null == e && (e = t, t = 0),
		t + Math.floor(Math.random() * (e - t + 1))
	};
	var P = {
		escape : {
			"&" : "&amp;",
			"<" : "&lt;",
			">" : "&gt;",
			'"' : "&quot;",
			"'" : "&#x27;",
			"/" : "&#x2F;"
		}
	};
	P.unescape = T.invert(P.escape);
	var O = {
		escape : RegExp("[" + T.keys(P.escape).join("") + "]", "g"),
		unescape : RegExp("(" + T.keys(P.unescape).join("|") + ")", "g")
	};
	T.each(["escape", "unescape"], function (t) {
		T[t] = function (e) {
			return null == e ? "" : ("" + e).replace(O[t], function (e) {
				return P[t][e]
			})
		}
	}),
	T.result = function (t, e) {
		if (null == t)
			return null;
		var n = t[e];
		return T.isFunction(n) ? n.call(t) : n
	},
	T.mixin = function (t) {
		C(T.functions(t), function (e) {
			var n = T[e] = t[e];
			T.prototype[e] = function () {
				var t = [this._wrapped];
				return o.apply(t, arguments),
				H.call(this, n.apply(T, t))
			}
		})
	};
	var A = 0;
	T.uniqueId = function (t) {
		var e = ++A + "";
		return t ? t + e : e
	},
	T.templateSettings = {
		evaluate : /<%([\s\S]+?)%>/g,
		interpolate : /<%=([\s\S]+?)%>/g,
		escape : /<%-([\s\S]+?)%>/g
	};
	var L = /(.)^/,
	D = {
		"'" : "'",
		"\\" : "\\",
		"\r" : "r",
		"\n" : "n",
		"	" : "t",
		"\u2028" : "u2028",
		"\u2029" : "u2029"
	},
	R = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	T.template = function (t, e, n) {
		var i;
		n = T.defaults({}, n, T.templateSettings);
		var s = RegExp([(n.escape || L).source, (n.interpolate || L).source, (n.evaluate || L).source].join("|") + "|$", "g"),
		r = 0,
		o = "__p+='";
		t.replace(s, function (e, n, i, s, a) {
			return o += t.slice(r, a).replace(R, function (t) {
				return "\\" + D[t]
			}),
			n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"),
			i && (o += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"),
			s && (o += "';\n" + s + "\n__p+='"),
			r = a + e.length,
			e
		}),
		o += "';\n",
		n.variable || (o = "with(obj||{}){\n" + o + "}\n"),
		o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
		try {
			i = Function(n.variable || "obj", "_", o)
		} catch (a) {
			throw a.source = o,
			a
		}
		if (e)
			return i(e, T);
		var l = function (t) {
			return i.call(this, t, T)
		};
		return l.source = "function(" + (n.variable || "obj") + "){\n" + o + "}",
		l
	},
	T.chain = function (t) {
		return T(t).chain()
	};
	var H = function (t) {
		return this._chain ? T(t).chain() : t
	};
	T.mixin(T),
	C(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
		var e = i[t];
		T.prototype[t] = function () {
			var n = this._wrapped;
			return e.apply(n, arguments),
			"shift" != t && "splice" != t || 0 !== n.length || delete n[0],
			H.call(this, n)
		}
	}),
	C(["concat", "join", "slice"], function (t) {
		var e = i[t];
		T.prototype[t] = function () {
			return H.call(this, e.apply(this._wrapped, arguments))
		}
	}),
	T.extend(T.prototype, {
		chain : function () {
			return this._chain = !0,
			this
		},
		value : function () {
			return this._wrapped
		}
	})
}).call(this), function (t, e) {
	function n(t) {
		var e = t.length,
		n = he.type(t);
		return he.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === n || "function" !== n && (0 === e || "number" == typeof e && e > 0 && e - 1 in t)
	}
	function i(t) {
		var e = Ee[t] = {};
		return he.each(t.match(pe) || [], function (t, n) {
			e[n] = !0
		}),
		e
	}
	function s(t, n, i, s) {
		if (he.acceptData(t)) {
			var r,
			o,
			a = he.expando,
			l = t.nodeType,
			u = l ? he.cache : t,
			h = l ? t[a] : t[a] && a;
			if (h && u[h] && (s || u[h].data) || i !== e || "string" != typeof n)
				return h || (h = l ? t[a] = ee.pop() || he.guid++ : a), u[h] || (u[h] = l ? {}

					 : {
					toJSON : he.noop
				}), ("object" == typeof n || "function" == typeof n) && (s ? u[h] = he.extend(u[h], n) : u[h].data = he.extend(u[h].data, n)), o = u[h], s || (o.data || (o.data = {}), o = o.data), i !== e && (o[he.camelCase(n)] = i), "string" == typeof n ? (r = o[n], null == r && (r = o[he.camelCase(n)])) : r = o, r
		}
	}
	function r(t, e, n) {
		if (he.acceptData(t)) {
			var i,
			s,
			r = t.nodeType,
			o = r ? he.cache : t,
			l = r ? t[he.expando] : he.expando;
			if (o[l]) {
				if (e && (i = n ? o[l] : o[l].data)) {
					he.isArray(e) ? e = e.concat(he.map(e, he.camelCase)) : e in i ? e = [e] : (e = he.camelCase(e), e = e in i ? [e] : e.split(" ")),
					s = e.length;
					for (; s--; )
						delete i[e[s]];
					if (n ? !a(i) : !he.isEmptyObject(i))
						return
				}
				(n || (delete o[l].data, a(o[l]))) && (r ? he.cleanData([t], !0) : he.support.deleteExpando || o != o.window ? delete o[l] : o[l] = null)
			}
		}
	}
	function o(t, n, i) {
		if (i === e && 1 === t.nodeType) {
			var s = "data-" + n.replace(Ne, "-$1").toLowerCase();
			if (i = t.getAttribute(s), "string" == typeof i) {
				try {
					i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Se.test(i) ? he.parseJSON(i) : i
				} catch (r) {}

				he.data(t, n, i)
			} else
				i = e
		}
		return i
	}
	function a(t) {
		var e;
		for (e in t)
			if (("data" !== e || !he.isEmptyObject(t[e])) && "toJSON" !== e)
				return !1;
		return !0
	}
	function l() {
		return !0
	}
	function u() {
		return !1
	}
	function h() {
		try {
			return Q.activeElement
		} catch (t) {}

	}
	function c(t, e) {
		do
			t = t[e];
		while (t && 1 !== t.nodeType);
		return t
	}
	function p(t, e, n) {
		if (he.isFunction(e))
			return he.grep(t, function (t, i) {
				return !!e.call(t, i, t) !== n
			});
		if (e.nodeType)
			return he.grep(t, function (t) {
				return t === e !== n
			});
		if ("string" == typeof e) {
			if (Xe.test(e))
				return he.filter(e, t, n);
			e = he.filter(e, t)
		}
		return he.grep(t, function (t) {
			return he.inArray(t, e) >= 0 !== n
		})
	}
	function d(t) {
		var e = We.split("|"),
		n = t.createDocumentFragment();
		if (n.createElement)
			for (; e.length; )
				n.createElement(e.pop());
		return n
	}
	function f(t, e) {
		return he.nodeName(t, "table") && he.nodeName(1 === e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
	}
	function m(t) {
		return t.type = (null !== he.find.attr(t, "type")) + "/" + t.type,
		t
	}
	function g(t) {
		var e = rn.exec(t.type);
		return e ? t.type = e[1] : t.removeAttribute("type"),
		t
	}
	function v(t, e) {
		for (var n, i = 0; null != (n = t[i]); i++)
			he._data(n, "globalEval", !e || he._data(e[i], "globalEval"))
	}
	function _(t, e) {
		if (1 === e.nodeType && he.hasData(t)) {
			var n,
			i,
			s,
			r = he._data(t),
			o = he._data(e, r),
			a = r.events;
			if (a) {
				delete o.handle,
				o.events = {};
				for (n in a)
					for (i = 0, s = a[n].length; s > i; i++)
						he.event.add(e, n, a[n][i])
			}
			o.data && (o.data = he.extend({}, o.data))
		}
	}
	function y(t, e) {
		var n,
		i,
		s;
		if (1 === e.nodeType) {
			if (n = e.nodeName.toLowerCase(), !he.support.noCloneEvent && e[he.expando]) {
				s = he._data(e);
				for (i in s.events)
					he.removeEvent(e, i, s.handle);
				e.removeAttribute(he.expando)
			}
			"script" === n && e.text !== t.text ? (m(e).text = t.text, g(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), he.support.html5Clone && t.innerHTML && !he.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && en.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
		}
	}
	function b(t, n) {
		var i,
		s,
		r = 0,
		o = typeof t.getElementsByTagName !== U ? t.getElementsByTagName(n || "*") : typeof t.querySelectorAll !== U ? t.querySelectorAll(n || "*") : e;
		if (!o)
			for (o = [], i = t.childNodes || t; null != (s = i[r]); r++)
				!n || he.nodeName(s, n) ? o.push(s) : he.merge(o, b(s, n));
		return n === e || n && he.nodeName(t, n) ? he.merge([t], o) : o
	}
	function x(t) {
		en.test(t.type) && (t.defaultChecked = t.checked)
	}
	function w(t, e) {
		if (e in t)
			return e;
		for (var n = e.charAt(0).toUpperCase() + e.slice(1), i = e, s = En.length; s--; )
			if (e = En[s] + n, e in t)
				return e;
		return i
	}
	function T(t, e) {
		return t = e || t,
		"none" === he.css(t, "display") || !he.contains(t.ownerDocument, t)
	}
	function C(t, e) {
		for (var n, i, s, r = [], o = 0, a = t.length; a > o; o++)
			i = t[o], i.style && (r[o] = he._data(i, "olddisplay"), n = i.style.display, e ? (r[o] || "none" !== n || (i.style.display = ""), "" === i.style.display && T(i) && (r[o] = he._data(i, "olddisplay", k(i.nodeName)))) : r[o] || (s = T(i), (n && "none" !== n || !s) && he._data(i, "olddisplay", s ? n : he.css(i, "display"))));
		for (o = 0; a > o; o++)
			i = t[o], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? r[o] || "" : "none"));
		return t
	}
	function E(t, e, n) {
		var i = _n.exec(e);
		return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
	}
	function S(t, e, n, i, s) {
		for (var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, o = 0; 4 > r; r += 2)
			"margin" === n && (o += he.css(t, n + Cn[r], !0, s)), i ? ("content" === n && (o -= he.css(t, "padding" + Cn[r], !0, s)), "margin" !== n && (o -= he.css(t, "border" + Cn[r] + "Width", !0, s))) : (o += he.css(t, "padding" + Cn[r], !0, s), "padding" !== n && (o += he.css(t, "border" + Cn[r] + "Width", !0, s)));
		return o
	}
	function N(t, e, n) {
		var i = !0,
		s = "width" === e ? t.offsetWidth : t.offsetHeight,
		r = cn(t),
		o = he.support.boxSizing && "border-box" === he.css(t, "boxSizing", !1, r);
		if (0 >= s || null == s) {
			if (s = pn(t, e, r), (0 > s || null == s) && (s = t.style[e]), yn.test(s))
				return s;
			i = o && (he.support.boxSizingReliable || s === t.style[e]),
			s = parseFloat(s) || 0
		}
		return s + S(t, e, n || (o ? "border" : "content"), i, r) + "px"
	}
	function k(t) {
		var e = Q,
		n = xn[t];
		return n || (n = I(t, e), "none" !== n && n || (hn = (hn || he("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(e.documentElement), e = (hn[0].contentWindow || hn[0].contentDocument).document, e.write("<!doctype html><html><body>"), e.close(), n = I(t, e), hn.detach()), xn[t] = n),
		n
	}
	function I(t, e) {
		var n = he(e.createElement(t)).appendTo(e.body),
		i = he.css(n[0], "display");
		return n.remove(),
		i
	}
	function M(t, e, n, i) {
		var s;
		if (he.isArray(e))
			he.each(e, function (e, s) {
				n || Nn.test(t) ? i(t, s) : M(t + "[" + ("object" == typeof s ? e : "") + "]", s, n, i)
			});
		else if (n || "object" !== he.type(e))
			i(t, e);
		else
			for (s in e)
				M(t + "[" + s + "]", e[s], n, i)
	}
	function P(t) {
		return function (e, n) {
			"string" != typeof e && (n = e, e = "*");
			var i,
			s = 0,
			r = e.toLowerCase().match(pe) || [];
			if (he.isFunction(n))
				for (; i = r[s++]; )
					"+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
		}
	}
	function O(t, n, i, s) {
		function r(l) {
			var u;
			return o[l] = !0,
			he.each(t[l] || [], function (t, l) {
				var h = l(n, i, s);
				return "string" != typeof h || a || o[h] ? a ? !(u = h) : e : (n.dataTypes.unshift(h), r(h), !1)
			}),
			u
		}
		var o = {},
		a = t === Vn;
		return r(n.dataTypes[0]) || !o["*"] && r("*")
	}
	function A(t, n) {
		var i,
		s,
		r = he.ajaxSettings.flatOptions || {};
		for (s in n)
			n[s] !== e && ((r[s] ? t : i || (i = {}))[s] = n[s]);
		return i && he.extend(!0, t, i),
		t
	}
	function L(t, n, i) {
		for (var s, r, o, a, l = t.contents, u = t.dataTypes; "*" === u[0]; )
			u.shift(), r === e && (r = t.mimeType || n.getResponseHeader("Content-Type"));
		if (r)
			for (a in l)
				if (l[a] && l[a].test(r)) {
					u.unshift(a);
					break
				}
		if (u[0]in i)
			o = u[0];
		else {
			for (a in i) {
				if (!u[0] || t.converters[a + " " + u[0]]) {
					o = a;
					break
				}
				s || (s = a)
			}
			o = o || s
		}
		return o ? (o !== u[0] && u.unshift(o), i[o]) : e
	}
	function D(t, e, n, i) {
		var s,
		r,
		o,
		a,
		l,
		u = {},
		h = t.dataTypes.slice();
		if (h[1])
			for (o in t.converters)
				u[o.toLowerCase()] = t.converters[o];
		for (r = h.shift(); r; )
			if (t.responseFields[r] && (n[t.responseFields[r]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = h.shift())
				if ("*" === r)
					r = l;
				else if ("*" !== l && l !== r) {
					if (o = u[l + " " + r] || u["* " + r], !o)
						for (s in u)
							if (a = s.split(" "), a[1] === r && (o = u[l + " " + a[0]] || u["* " + a[0]])) {
								o === !0 ? o = u[s] : u[s] !== !0 && (r = a[0], h.unshift(a[1]));
								break
							}
					if (o !== !0)
						if (o && t["throws"])
							e = o(e);
						else
							try {
								e = o(e)
							} catch (c) {
								return {
									state : "parsererror",
									error : o ? c : "No conversion from " + l + " to " + r
								}
							}
				}
		return {
			state : "success",
			data : e
		}
	}
	function R() {
		try {
			return new t.XMLHttpRequest
		} catch (e) {}

	}
	function H() {
		try {
			return new t.ActiveXObject("Microsoft.XMLHTTP")
		} catch (e) {}

	}
	function F() {
		return setTimeout(function () {
			Jn = e
		}),
		Jn = he.now()
	}
	function $(t, e, n) {
		for (var i, s = (ri[e] || []).concat(ri["*"]), r = 0, o = s.length; o > r; r++)
			if (i = s[r].call(n, e, t))
				return i
	}
	function j(t, e, n) {
		var i,
		s,
		r = 0,
		o = si.length,
		a = he.Deferred().always(function () {
				delete l.elem
			}),
		l = function () {
			if (s)
				return !1;
			for (var e = Jn || F(), n = Math.max(0, u.startTime + u.duration - e), i = n / u.duration || 0, r = 1 - i, o = 0, l = u.tweens.length; l > o; o++)
				u.tweens[o].run(r);
			return a.notifyWith(t, [u, r, n]),
			1 > r && l ? n : (a.resolveWith(t, [u]), !1)
		},
		u = a.promise({
				elem : t,
				props : he.extend({}, e),
				opts : he.extend(!0, {
					specialEasing : {}

				}, n),
				originalProperties : e,
				originalOptions : n,
				startTime : Jn || F(),
				duration : n.duration,
				tweens : [],
				createTween : function (e, n) {
					var i = he.Tween(t, u.opts, e, n, u.opts.specialEasing[e] || u.opts.easing);
					return u.tweens.push(i),
					i
				},
				stop : function (e) {
					var n = 0,
					i = e ? u.tweens.length : 0;
					if (s)
						return this;
					for (s = !0; i > n; n++)
						u.tweens[n].run(1);
					return e ? a.resolveWith(t, [u, e]) : a.rejectWith(t, [u, e]),
					this
				}
			}),
		h = u.props;
		for (z(h, u.opts.specialEasing); o > r; r++)
			if (i = si[r].call(u, t, h, u.opts))
				return i;
		return he.map(h, $, u),
		he.isFunction(u.opts.start) && u.opts.start.call(t, u),
		he.fx.timer(he.extend(l, {
				elem : t,
				anim : u,
				queue : u.opts.queue
			})),
		u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
	}
	function z(t, e) {
		var n,
		i,
		s,
		r,
		o;
		for (n in t)
			if (i = he.camelCase(n), s = e[i], r = t[n], he.isArray(r) && (s = r[1], r = t[n] = r[0]), n !== i && (t[i] = r, delete t[n]), o = he.cssHooks[i], o && "expand" in o) {
				r = o.expand(r),
				delete t[i];
				for (n in r)
					n in t || (t[n] = r[n], e[n] = s)
			} else
				e[i] = s
	}
	function X(t, e, n) {
		var i,
		s,
		r,
		o,
		a,
		l,
		u = this,
		h = {},
		c = t.style,
		p = t.nodeType && T(t),
		d = he._data(t, "fxshow");
		n.queue || (a = he._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
				a.unqueued || l()
			}), a.unqueued++, u.always(function () {
				u.always(function () {
					a.unqueued--,
					he.queue(t, "fx").length || a.empty.fire()
				})
			})),
		1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [c.overflow, c.overflowX, c.overflowY], "inline" === he.css(t, "display") && "none" === he.css(t, "float") && (he.support.inlineBlockNeedsLayout && "inline" !== k(t.nodeName) ? c.zoom = 1 : c.display = "inline-block")),
		n.overflow && (c.overflow = "hidden", he.support.shrinkWrapBlocks || u.always(function () {
				c.overflow = n.overflow[0],
				c.overflowX = n.overflow[1],
				c.overflowY = n.overflow[2]
			}));
		for (i in e)
			if (s = e[i], ei.exec(s)) {
				if (delete e[i], r = r || "toggle" === s, s === (p ? "hide" : "show"))
					continue;
				h[i] = d && d[i] || he.style(t, i)
			}
		if (!he.isEmptyObject(h)) {
			d ? "hidden" in d && (p = d.hidden) : d = he._data(t, "fxshow", {}),
			r && (d.hidden = !p),
			p ? he(t).show() : u.done(function () {
				he(t).hide()
			}),
			u.done(function () {
				var e;
				he._removeData(t, "fxshow");
				for (e in h)
					he.style(t, e, h[e])
			});
			for (i in h)
				o = $(p ? d[i] : 0, i, u), i in d || (d[i] = o.start, p && (o.end = o.start, o.start = "width" === i || "height" === i ? 1 : 0))
		}
	}
	function B(t, e, n, i, s) {
		return new B.prototype.init(t, e, n, i, s)
	}
	function V(t, e) {
		var n,
		i = {
			height : t
		},
		s = 0;
		for (e = e ? 1 : 0; 4 > s; s += 2 - e)
			n = Cn[s], i["margin" + n] = i["padding" + n] = t;
		return e && (i.opacity = i.width = t),
		i
	}
	function q(t) {
		return he.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
	}
	var W,
	Y,
	U = typeof e,
	G = t.location,
	Q = t.document,
	Z = Q.documentElement,
	K = t.jQuery,
	J = t.$,
	te = {},
	ee = [],
	ne = "1.10.1",
	ie = ee.concat,
	se = ee.push,
	re = ee.slice,
	oe = ee.indexOf,
	ae = te.toString,
	le = te.hasOwnProperty,
	ue = ne.trim,
	he = function (t, e) {
		return new he.fn.init(t, e, Y)
	},
	ce = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	pe = /\S+/g,
	de = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	fe = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	me = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	ge = /^[\],:{}\s]*$/,
	ve = /(?:^|:|,)(?:\s*\[)+/g,
	_e = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	ye = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
	be = /^-ms-/,
	xe = /-([\da-z])/gi,
	we = function (t, e) {
		return e.toUpperCase()
	},
	Te = function (t) {
		(Q.addEventListener || "load" === t.type || "complete" === Q.readyState) && (Ce(), he.ready())
	},
	Ce = function () {
		Q.addEventListener ? (Q.removeEventListener("DOMContentLoaded", Te, !1), t.removeEventListener("load", Te, !1)) : (Q.detachEvent("onreadystatechange", Te), t.detachEvent("onload", Te))
	};
	he.fn = he.prototype = {
		jquery : ne,
		constructor : he,
		init : function (t, n, i) {
			var s,
			r;
			if (!t)
				return this;
			if ("string" == typeof t) {
				if (s = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : fe.exec(t), !s || !s[1] && n)
					return !n || n.jquery ? (n || i).find(t) : this.constructor(n).find(t);
				if (s[1]) {
					if (n = n instanceof he ? n[0] : n, he.merge(this, he.parseHTML(s[1], n && n.nodeType ? n.ownerDocument || n : Q, !0)), me.test(s[1]) && he.isPlainObject(n))
						for (s in n)
							he.isFunction(this[s]) ? this[s](n[s]) : this.attr(s, n[s]);
					return this
				}
				if (r = Q.getElementById(s[2]), r && r.parentNode) {
					if (r.id !== s[2])
						return i.find(t);
					this.length = 1,
					this[0] = r
				}
				return this.context = Q,
				this.selector = t,
				this
			}
			return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : he.isFunction(t) ? i.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), he.makeArray(t, this))
		},
		selector : "",
		length : 0,
		toArray : function () {
			return re.call(this)
		},
		get : function (t) {
			return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
		},
		pushStack : function (t) {
			var e = he.merge(this.constructor(), t);
			return e.prevObject = this,
			e.context = this.context,
			e
		},
		each : function (t, e) {
			return he.each(this, t, e)
		},
		ready : function (t) {
			return he.ready.promise().done(t),
			this
		},
		slice : function () {
			return this.pushStack(re.apply(this, arguments))
		},
		first : function () {
			return this.eq(0)
		},
		last : function () {
			return this.eq(-1)
		},
		eq : function (t) {
			var e = this.length,
			n = +t + (0 > t ? e : 0);
			return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
		},
		map : function (t) {
			return this.pushStack(he.map(this, function (e, n) {
					return t.call(e, n, e)
				}))
		},
		end : function () {
			return this.prevObject || this.constructor(null)
		},
		push : se,
		sort : [].sort,
		splice : [].splice
	},
	he.fn.init.prototype = he.fn,
	he.extend = he.fn.extend = function () {
		var t,
		n,
		i,
		s,
		r,
		o,
		a = arguments[0] || {},
		l = 1,
		u = arguments.length,
		h = !1;
		for ("boolean" == typeof a && (h = a, a = arguments[1] || {}, l = 2), "object" == typeof a || he.isFunction(a) || (a = {}), u === l && (a = this, --l); u > l; l++)
			if (null != (r = arguments[l]))
				for (s in r)
					t = a[s], i = r[s], a !== i && (h && i && (he.isPlainObject(i) || (n = he.isArray(i))) ? (n ? (n = !1, o = t && he.isArray(t) ? t : []) : o = t && he.isPlainObject(t) ? t : {}, a[s] = he.extend(h, o, i)) : i !== e && (a[s] = i));
		return a
	},
	he.extend({
		expando : "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
		noConflict : function (e) {
			return t.$ === he && (t.$ = J),
			e && t.jQuery === he && (t.jQuery = K),
			he
		},
		isReady : !1,
		readyWait : 1,
		holdReady : function (t) {
			t ? he.readyWait++ : he.ready(!0)
		},
		ready : function (t) {
			if (t === !0 ? !--he.readyWait : !he.isReady) {
				if (!Q.body)
					return setTimeout(he.ready);
				he.isReady = !0,
				t !== !0 && --he.readyWait > 0 || (W.resolveWith(Q, [he]), he.fn.trigger && he(Q).trigger("ready").off("ready"))
			}
		},
		isFunction : function (t) {
			return "function" === he.type(t)
		},
		isArray : Array.isArray || function (t) {
			return "array" === he.type(t)
		},
		isWindow : function (t) {
			return null != t && t == t.window
		},
		isNumeric : function (t) {
			return !isNaN(parseFloat(t)) && isFinite(t)
		},
		type : function (t) {
			return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? te[ae.call(t)] || "object" : typeof t
		},
		isPlainObject : function (t) {
			var n;
			if (!t || "object" !== he.type(t) || t.nodeType || he.isWindow(t))
				return !1;
			try {
				if (t.constructor && !le.call(t, "constructor") && !le.call(t.constructor.prototype, "isPrototypeOf"))
					return !1
			} catch (i) {
				return !1
			}
			if (he.support.ownLast)
				for (n in t)
					return le.call(t, n);
			for (n in t);
			return n === e || le.call(t, n)
		},
		isEmptyObject : function (t) {
			var e;
			for (e in t)
				return !1;
			return !0
		},
		error : function (t) {
			throw Error(t)
		},
		parseHTML : function (t, e, n) {
			if (!t || "string" != typeof t)
				return null;
			"boolean" == typeof e && (n = e, e = !1),
			e = e || Q;
			var i = me.exec(t),
			s = !n && [];
			return i ? [e.createElement(i[1])] : (i = he.buildFragment([t], e, s), s && he(s).remove(), he.merge([], i.childNodes))
		},
		parseJSON : function (n) {
			return t.JSON && t.JSON.parse ? t.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = he.trim(n), n && ge.test(n.replace(_e, "@").replace(ye, "]").replace(ve, ""))) ? Function("return " + n)() : (he.error("Invalid JSON: " + n), e)
		},
		parseXML : function (n) {
			var i,
			s;
			if (!n || "string" != typeof n)
				return null;
			try {
				t.DOMParser ? (s = new DOMParser, i = s.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
			} catch (r) {
				i = e
			}
			return i && i.documentElement && !i.getElementsByTagName("parsererror").length || he.error("Invalid XML: " + n),
			i
		},
		noop : function () {},
		globalEval : function (e) {
			e && he.trim(e) && (t.execScript || function (e) {
				t.eval.call(t, e)
			})(e)
		},
		camelCase : function (t) {
			return t.replace(be, "ms-").replace(xe, we)
		},
		nodeName : function (t, e) {
			return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
		},
		each : function (t, e, i) {
			var s,
			r = 0,
			o = t.length,
			a = n(t);
			if (i) {
				if (a)
					for (; o > r && (s = e.apply(t[r], i), s !== !1); r++);
				else
					for (r in t)
						if (s = e.apply(t[r], i), s === !1)
							break
			} else if (a)
				for (; o > r && (s = e.call(t[r], r, t[r]), s !== !1); r++);
			else
				for (r in t)
					if (s = e.call(t[r], r, t[r]), s === !1)
						break;
			return t
		},
		trim : ue && !ue.call("﻿ ") ? function (t) {
			return null == t ? "" : ue.call(t)
		}
		 : function (t) {
			return null == t ? "" : (t + "").replace(de, "")
		},
		makeArray : function (t, e) {
			var i = e || [];
			return null != t && (n(Object(t)) ? he.merge(i, "string" == typeof t ? [t] : t) : se.call(i, t)),
			i
		},
		inArray : function (t, e, n) {
			var i;
			if (e) {
				if (oe)
					return oe.call(e, t, n);
				for (i = e.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
					if (n in e && e[n] === t)
						return n
			}
			return -1
		},
		merge : function (t, n) {
			var i = n.length,
			s = t.length,
			r = 0;
			if ("number" == typeof i)
				for (; i > r; r++)
					t[s++] = n[r];
			else
				for (; n[r] !== e; )
					t[s++] = n[r++];
			return t.length = s,
			t
		},
		grep : function (t, e, n) {
			var i,
			s = [],
			r = 0,
			o = t.length;
			for (n = !!n; o > r; r++)
				i = !!e(t[r], r), n !== i && s.push(t[r]);
			return s
		},
		map : function (t, e, i) {
			var s,
			r = 0,
			o = t.length,
			a = n(t),
			l = [];
			if (a)
				for (; o > r; r++)
					s = e(t[r], r, i), null != s && (l[l.length] = s);
			else
				for (r in t)
					s = e(t[r], r, i), null != s && (l[l.length] = s);
			return ie.apply([], l)
		},
		guid : 1,
		proxy : function (t, n) {
			var i,
			s,
			r;
			return "string" == typeof n && (r = t[n], n = t, t = r),
			he.isFunction(t) ? (i = re.call(arguments, 2), s = function () {
				return t.apply(n || this, i.concat(re.call(arguments)))
			}, s.guid = t.guid = t.guid || he.guid++, s) : e
		},
		access : function (t, n, i, s, r, o, a) {
			var l = 0,
			u = t.length,
			h = null == i;
			if ("object" === he.type(i)) {
				r = !0;
				for (l in i)
					he.access(t, n, l, i[l], !0, o, a)
			} else if (s !== e && (r = !0, he.isFunction(s) || (a = !0), h && (a ? (n.call(t, s), n = null) : (h = n, n = function (t, e, n) {
							return h.call(he(t), n)
						})), n))
				for (; u > l; l++)
					n(t[l], i, a ? s : s.call(t[l], l, n(t[l], i)));
			return r ? t : h ? n.call(t) : u ? n(t[0], i) : o
		},
		now : function () {
			return (new Date).getTime()
		},
		swap : function (t, e, n, i) {
			var s,
			r,
			o = {};
			for (r in e)
				o[r] = t.style[r], t.style[r] = e[r];
			s = n.apply(t, i || []);
			for (r in e)
				t.style[r] = o[r];
			return s
		}
	}),
	he.ready.promise = function (e) {
		if (!W)
			if (W = he.Deferred(), "complete" === Q.readyState)
				setTimeout(he.ready);
			else if (Q.addEventListener)
				Q.addEventListener("DOMContentLoaded", Te, !1), t.addEventListener("load", Te, !1);
			else {
				Q.attachEvent("onreadystatechange", Te),
				t.attachEvent("onload", Te);
				var n = !1;
				try {
					n = null == t.frameElement && Q.documentElement
				} catch (i) {}

				n && n.doScroll && function s() {
					if (!he.isReady) {
						try {
							n.doScroll("left")
						} catch (t) {
							return setTimeout(s, 50)
						}
						Ce(),
						he.ready()
					}
				}
				()
			}
		return W.promise(e)
	},
	he.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
		te["[object " + e + "]"] = e.toLowerCase()
	}),
	Y = he(Q),
	function (t, e) {
		function n(t, e, n, i) {
			var s,
			r,
			o,
			a,
			l,
			u,
			h,
			c,
			p,
			d;
			if ((e ? e.ownerDocument || e : V) !== R && D(e), e = e || R, n = n || [], !t || "string" != typeof t)
				return n;
			if (1 !== (a = e.nodeType) && 9 !== a)
				return [];
			if (F && !i) {
				if (s = Te.exec(t))
					if (o = s[1]) {
						if (9 === a) {
							if (r = e.getElementById(o), !r || !r.parentNode)
								return n;
							if (r.id === o)
								return n.push(r), n
						} else if (e.ownerDocument && (r = e.ownerDocument.getElementById(o)) && X(e, r) && r.id === o)
							return n.push(r), n
					} else {
						if (s[2])
							return se.apply(n, e.getElementsByTagName(t)), n;
						if ((o = s[3]) && N.getElementsByClassName && e.getElementsByClassName)
							return se.apply(n, e.getElementsByClassName(o)), n
					}
				if (N.qsa && (!$ || !$.test(t))) {
					if (c = h = B, p = e, d = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
						for (u = m(t), (h = e.getAttribute("id")) ? c = h.replace(Se, "\\$&") : e.setAttribute("id", c), c = "[id='" + c + "'] ", l = u.length; l--; )
							u[l] = c + g(u[l]);
						p = ve.test(t) && e.parentNode || e,
						d = u.join(",")
					}
					if (d)
						try {
							return se.apply(n, p.querySelectorAll(d)),
							n
						} catch (f) {}

					finally {
						h || e.removeAttribute("id")
					}
				}
			}
			return C(t.replace(fe, "$1"), e, n, i)
		}
		function i(t) {
			return we.test(t + "")
		}
		function s() {
			function t(n, i) {
				return e.push(n += " ") > I.cacheLength && delete t[e.shift()],
				t[n] = i
			}
			var e = [];
			return t
		}
		function r(t) {
			return t[B] = !0,
			t
		}
		function o(t) {
			var e = R.createElement("div");
			try {
				return !!t(e)
			} catch (n) {
				return !1
			}
			finally {
				e.parentNode && e.parentNode.removeChild(e),
				e = null
			}
		}
		function a(t, e, n) {
			t = t.split("|");
			for (var i, s = t.length, r = n ? null : e; s--; )
				(i = I.attrHandle[t[s]]) && i !== e || (I.attrHandle[t[s]] = r)
		}
		function l(t, e) {
			var n = t.getAttributeNode(e);
			return n && n.specified ? n.value : t[e] === !0 ? e.toLowerCase() : null
		}
		function u(t, e) {
			return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
		}
		function h(t) {
			return "input" === t.nodeName.toLowerCase() ? t.defaultValue : e
		}
		function c(t, e) {
			var n = e && t,
			i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || J) - (~t.sourceIndex || J);
			if (i)
				return i;
			if (n)
				for (; n = n.nextSibling; )
					if (n === e)
						return -1;
			return t ? 1 : -1
		}
		function p(t) {
			return function (e) {
				var n = e.nodeName.toLowerCase();
				return "input" === n && e.type === t
			}
		}
		function d(t) {
			return function (e) {
				var n = e.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && e.type === t
			}
		}
		function f(t) {
			return r(function (e) {
				return e = +e,
				r(function (n, i) {
					for (var s, r = t([], n.length, e), o = r.length; o--; )
						n[s = r[o]] && (n[s] = !(i[s] = n[s]))
				})
			})
		}
		function m(t, e) {
			var i,
			s,
			r,
			o,
			a,
			l,
			u,
			h = U[t + " "];
			if (h)
				return e ? 0 : h.slice(0);
			for (a = t, l = [], u = I.preFilter; a; ) {
				(!i || (s = me.exec(a))) && (s && (a = a.slice(s[0].length) || a), l.push(r = [])),
				i = !1,
				(s = ge.exec(a)) && (i = s.shift(), r.push({
						value : i,
						type : s[0].replace(fe, " ")
					}), a = a.slice(i.length));
				for (o in I.filter)
					!(s = xe[o].exec(a)) || u[o] && !(s = u[o](s)) || (i = s.shift(), r.push({
							value : i,
							type : o,
							matches : s
						}), a = a.slice(i.length));
				if (!i)
					break
			}
			return e ? a.length : a ? n.error(t) : U(t, l).slice(0)
		}
		function g(t) {
			for (var e = 0, n = t.length, i = ""; n > e; e++)
				i += t[e].value;
			return i
		}
		function v(t, e, n) {
			var i = e.dir,
			s = n && "parentNode" === i,
			r = W++;
			return e.first ? function (e, n, r) {
				for (; e = e[i]; )
					if (1 === e.nodeType || s)
						return t(e, n, r)
			}
			 : function (e, n, o) {
				var a,
				l,
				u,
				h = q + " " + r;
				if (o) {
					for (; e = e[i]; )
						if ((1 === e.nodeType || s) && t(e, n, o))
							return !0
				} else
					for (; e = e[i]; )
						if (1 === e.nodeType || s)
							if (u = e[B] || (e[B] = {}), (l = u[i]) && l[0] === h) {
								if ((a = l[1]) === !0 || a === k)
									return a === !0
							} else if (l = u[i] = [h], l[1] = t(e, n, o) || k, l[1] === !0)
								return !0
			}
		}
		function _(t) {
			return t.length > 1 ? function (e, n, i) {
				for (var s = t.length; s--; )
					if (!t[s](e, n, i))
						return !1;
				return !0
			}
			 : t[0]
		}
		function y(t, e, n, i, s) {
			for (var r, o = [], a = 0, l = t.length, u = null != e; l > a; a++)
				(r = t[a]) && (!n || n(r, i, s)) && (o.push(r), u && e.push(a));
			return o
		}
		function b(t, e, n, i, s, o) {
			return i && !i[B] && (i = b(i)),
			s && !s[B] && (s = b(s, o)),
			r(function (r, o, a, l) {
				var u,
				h,
				c,
				p = [],
				d = [],
				f = o.length,
				m = r || T(e || "*", a.nodeType ? [a] : a, []),
				g = !t || !r && e ? m : y(m, p, t, a, l),
				v = n ? s || (r ? t : f || i) ? [] : o : g;
				if (n && n(g, v, a, l), i)
					for (u = y(v, d), i(u, [], a, l), h = u.length; h--; )
						(c = u[h]) && (v[d[h]] = !(g[d[h]] = c));
				if (r) {
					if (s || t) {
						if (s) {
							for (u = [], h = v.length; h--; )
								(c = v[h]) && u.push(g[h] = c);
							s(null, v = [], u, l)
						}
						for (h = v.length; h--; )
							(c = v[h]) && (u = s ? oe.call(r, c) : p[h]) > -1 && (r[u] = !(o[u] = c))
					}
				} else
					v = y(v === o ? v.splice(f, v.length) : v), s ? s(null, o, v, l) : se.apply(o, v)
			})
		}
		function x(t) {
			for (var e, n, i, s = t.length, r = I.relative[t[0].type], o = r || I.relative[" "], a = r ? 1 : 0, l = v(function (t) {
						return t === e
					}, o, !0), u = v(function (t) {
						return oe.call(e, t) > -1
					}, o, !0), h = [function (t, n, i) {
						return !r && (i || n !== A) || ((e = n).nodeType ? l(t, n, i) : u(t, n, i))
					}
				]; s > a; a++)
				if (n = I.relative[t[a].type])
					h = [v(_(h), n)];
				else {
					if (n = I.filter[t[a].type].apply(null, t[a].matches), n[B]) {
						for (i = ++a; s > i && !I.relative[t[i].type]; i++);
						return b(a > 1 && _(h), a > 1 && g(t.slice(0, a - 1).concat({
									value : " " === t[a - 2].type ? "*" : ""
								})).replace(fe, "$1"), n, i > a && x(t.slice(a, i)), s > i && x(t = t.slice(i)), s > i && g(t))
					}
					h.push(n)
				}
			return _(h)
		}
		function w(t, e) {
			var i = 0,
			s = e.length > 0,
			o = t.length > 0,
			a = function (r, a, l, u, h) {
				var c,
				p,
				d,
				f = [],
				m = 0,
				g = "0",
				v = r && [],
				_ = null != h,
				b = A,
				x = r || o && I.find.TAG("*", h && a.parentNode || a),
				w = q += null == b ? 1 : Math.random() || .1;
				for (_ && (A = a !== R && a, k = i); null != (c = x[g]); g++) {
					if (o && c) {
						for (p = 0; d = t[p++]; )
							if (d(c, a, l)) {
								u.push(c);
								break
							}
						_ && (q = w, k = ++i)
					}
					s && ((c = !d && c) && m--, r && v.push(c))
				}
				if (m += g, s && g !== m) {
					for (p = 0; d = e[p++]; )
						d(v, f, a, l);
					if (r) {
						if (m > 0)
							for (; g--; )
								v[g] || f[g] || (f[g] = ne.call(u));
						f = y(f)
					}
					se.apply(u, f),
					_ && !r && f.length > 0 && m + e.length > 1 && n.uniqueSort(u)
				}
				return _ && (q = w, A = b),
				v
			};
			return s ? r(a) : a
		}
		function T(t, e, i) {
			for (var s = 0, r = e.length; r > s; s++)
				n(t, e[s], i);
			return i
		}
		function C(t, e, n, i) {
			var s,
			r,
			o,
			a,
			l,
			u = m(t);
			if (!i && 1 === u.length) {
				if (r = u[0] = u[0].slice(0), r.length > 2 && "ID" === (o = r[0]).type && N.getById && 9 === e.nodeType && F && I.relative[r[1].type]) {
					if (e = (I.find.ID(o.matches[0].replace(Ne, ke), e) || [])[0], !e)
						return n;
					t = t.slice(r.shift().value.length)
				}
				for (s = xe.needsContext.test(t) ? 0 : r.length; s-- && (o = r[s], !I.relative[a = o.type]); )
					if ((l = I.find[a]) && (i = l(o.matches[0].replace(Ne, ke), ve.test(r[0].type) && e.parentNode || e))) {
						if (r.splice(s, 1), t = i.length && g(r), !t)
							return se.apply(n, i), n;
						break
					}
			}
			return O(t, u)(i, e, !F, n, ve.test(t)),
			n
		}
		function E() {}

		var S,
		N,
		k,
		I,
		M,
		P,
		O,
		A,
		L,
		D,
		R,
		H,
		F,
		$,
		j,
		z,
		X,
		B = "sizzle" + -new Date,
		V = t.document,
		q = 0,
		W = 0,
		Y = s(),
		U = s(),
		G = s(),
		Q = !1,
		Z = function () {
			return 0
		},
		K = typeof e,
		J = 1 << 31,
		te = {}

		.hasOwnProperty,
		ee = [],
		ne = ee.pop,
		ie = ee.push,
		se = ee.push,
		re = ee.slice,
		oe = ee.indexOf || function (t) {
			for (var e = 0, n = this.length; n > e; e++)
				if (this[e] === t)
					return e;
			return -1
		},
		ae = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
		le = "[\\x20\\t\\r\\n\\f]",
		ue = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
		ce = ue.replace("w", "w#"),
		pe = "\\[" + le + "*(" + ue + ")" + le + "*(?:([*^$|!~]?=)" + le + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ce + ")|)|)" + le + "*\\]",
		de = ":(" + ue + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + pe.replace(3, 8) + ")*)|.*)\\)|)",
		fe = RegExp("^" + le + "+|((?:^|[^\\\\])(?:\\\\.)*)" + le + "+$", "g"),
		me = RegExp("^" + le + "*," + le + "*"),
		ge = RegExp("^" + le + "*([>+~]|" + le + ")" + le + "*"),
		ve = RegExp(le + "*[+~]"),
		_e = RegExp("=" + le + "*([^\\]'\"]*)" + le + "*\\]", "g"),
		ye = RegExp(de),
		be = RegExp("^" + ce + "$"),
		xe = {
			ID : RegExp("^#(" + ue + ")"),
			CLASS : RegExp("^\\.(" + ue + ")"),
			TAG : RegExp("^(" + ue.replace("w", "w*") + ")"),
			ATTR : RegExp("^" + pe),
			PSEUDO : RegExp("^" + de),
			CHILD : RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + le + "*(even|odd|(([+-]|)(\\d*)n|)" + le + "*(?:([+-]|)" + le + "*(\\d+)|))" + le + "*\\)|)", "i"),
			bool : RegExp("^(?:" + ae + ")$", "i"),
			needsContext : RegExp("^" + le + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + le + "*((?:-\\d)?\\d*)" + le + "*\\)|)(?=[^-]|$)", "i")
		},
		we = /^[^{]+\{\s*\[native \w/,
		Te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		Ce = /^(?:input|select|textarea|button)$/i,
		Ee = /^h\d$/i,
		Se = /'|\\/g,
		Ne = RegExp("\\\\([\\da-f]{1,6}" + le + "?|(" + le + ")|.)", "ig"),
		ke = function (t, e, n) {
			var i = "0x" + e - 65536;
			return i !== i || n ? e : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
		};
		try {
			se.apply(ee = re.call(V.childNodes), V.childNodes),
			ee[V.childNodes.length].nodeType
		} catch (Ie) {
			se = {
				apply : ee.length ? function (t, e) {
					ie.apply(t, re.call(e))
				}
				 : function (t, e) {
					for (var n = t.length, i = 0; t[n++] = e[i++]; );
					t.length = n - 1
				}
			}
		}
		P = n.isXML = function (t) {
			var e = t && (t.ownerDocument || t).documentElement;
			return e ? "HTML" !== e.nodeName : !1
		},
		N = n.support = {},
		D = n.setDocument = function (t) {
			var n = t ? t.ownerDocument || t : V,
			s = n.parentWindow;
			return n !== R && 9 === n.nodeType && n.documentElement ? (R = n, H = n.documentElement, F = !P(n), s && s.frameElement && s.attachEvent("onbeforeunload", function () {
					D()
				}), N.attributes = o(function (t) {
						return t.innerHTML = "<a href='#'></a>",
						a("type|href|height|width", u, "#" === t.firstChild.getAttribute("href")),
						a(ae, l, null == t.getAttribute("disabled")),
						t.className = "i",
						!t.getAttribute("className")
					}), N.input = o(function (t) {
						return t.innerHTML = "<input>",
						t.firstChild.setAttribute("value", ""),
						"" === t.firstChild.getAttribute("value")
					}), a("value", h, N.attributes && N.input), N.getElementsByTagName = o(function (t) {
						return t.appendChild(n.createComment("")),
						!t.getElementsByTagName("*").length
					}), N.getElementsByClassName = o(function (t) {
						return t.innerHTML = "<div class='a'></div><div class='a i'></div>",
						t.firstChild.className = "i",
						2 === t.getElementsByClassName("i").length
					}), N.getById = o(function (t) {
						return H.appendChild(t).id = B,
						!n.getElementsByName || !n.getElementsByName(B).length
					}), N.getById ? (I.find.ID = function (t, e) {
					if (typeof e.getElementById !== K && F) {
						var n = e.getElementById(t);
						return n && n.parentNode ? [n] : []
					}
				}, I.filter.ID = function (t) {
					var e = t.replace(Ne, ke);
					return function (t) {
						return t.getAttribute("id") === e
					}
				}) : (delete I.find.ID, I.filter.ID = function (t) {
					var e = t.replace(Ne, ke);
					return function (t) {
						var n = typeof t.getAttributeNode !== K && t.getAttributeNode("id");
						return n && n.value === e
					}
				}), I.find.TAG = N.getElementsByTagName ? function (t, n) {
				return typeof n.getElementsByTagName !== K ? n.getElementsByTagName(t) : e
			}
				 : function (t, e) {
				var n,
				i = [],
				s = 0,
				r = e.getElementsByTagName(t);
				if ("*" === t) {
					for (; n = r[s++]; )
						1 === n.nodeType && i.push(n);
					return i
				}
				return r
			}, I.find.CLASS = N.getElementsByClassName && function (t, n) {
				return typeof n.getElementsByClassName !== K && F ? n.getElementsByClassName(t) : e
			}, j = [], $ = [], (N.qsa = i(n.querySelectorAll)) && (o(function (t) {
						t.innerHTML = "<select><option selected=''></option></select>",
						t.querySelectorAll("[selected]").length || $.push("\\[" + le + "*(?:value|" + ae + ")"),
						t.querySelectorAll(":checked").length || $.push(":checked")
					}), o(function (t) {
						var e = n.createElement("input");
						e.setAttribute("type", "hidden"),
						t.appendChild(e).setAttribute("t", ""),
						t.querySelectorAll("[t^='']").length && $.push("[*^$]=" + le + "*(?:''|\"\")"),
						t.querySelectorAll(":enabled").length || $.push(":enabled", ":disabled"),
						t.querySelectorAll("*,:x"),
						$.push(",.*:")
					})), (N.matchesSelector = i(z = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && o(function (t) {
					N.disconnectedMatch = z.call(t, "div"),
					z.call(t, "[s!='']:x"),
					j.push("!=", de)
				}), $ = $.length && RegExp($.join("|")), j = j.length && RegExp(j.join("|")), X = i(H.contains) || H.compareDocumentPosition ? function (t, e) {
				var n = 9 === t.nodeType ? t.documentElement : t,
				i = e && e.parentNode;
				return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
			}
				 : function (t, e) {
				if (e)
					for (; e = e.parentNode; )
						if (e === t)
							return !0;
				return !1
			}, N.sortDetached = o(function (t) {
						return 1 & t.compareDocumentPosition(n.createElement("div"))
					}), Z = H.compareDocumentPosition ? function (t, e) {
				if (t === e)
					return Q = !0, 0;
				var i = e.compareDocumentPosition && t.compareDocumentPosition && t.compareDocumentPosition(e);
				return i ? 1 & i || !N.sortDetached && e.compareDocumentPosition(t) === i ? t === n || X(V, t) ? -1 : e === n || X(V, e) ? 1 : L ? oe.call(L, t) - oe.call(L, e) : 0 : 4 & i ? -1 : 1 : t.compareDocumentPosition ? -1 : 1
			}
				 : function (t, e) {
				var i,
				s = 0,
				r = t.parentNode,
				o = e.parentNode,
				a = [t],
				l = [e];
				if (t === e)
					return Q = !0, 0;
				if (!r || !o)
					return t === n ? -1 : e === n ? 1 : r ? -1 : o ? 1 : L ? oe.call(L, t) - oe.call(L, e) : 0;
				if (r === o)
					return c(t, e);
				for (i = t; i = i.parentNode; )
					a.unshift(i);
				for (i = e; i = i.parentNode; )
					l.unshift(i);
				for (; a[s] === l[s]; )
					s++;
				return s ? c(a[s], l[s]) : a[s] === V ? -1 : l[s] === V ? 1 : 0
			}, n) : R
		},
		n.matches = function (t, e) {
			return n(t, null, null, e)
		},
		n.matchesSelector = function (t, e) {
			if ((t.ownerDocument || t) !== R && D(t), e = e.replace(_e, "='$1']"), !(!N.matchesSelector || !F || j && j.test(e) || $ && $.test(e)))
				try {
					var i = z.call(t, e);
					if (i || N.disconnectedMatch || t.document && 11 !== t.document.nodeType)
						return i
				} catch (s) {}

			return n(e, R, null, [t]).length > 0
		},
		n.contains = function (t, e) {
			return (t.ownerDocument || t) !== R && D(t),
			X(t, e)
		},
		n.attr = function (t, n) {
			(t.ownerDocument || t) !== R && D(t);
			var i = I.attrHandle[n.toLowerCase()],
			s = i && te.call(I.attrHandle, n.toLowerCase()) ? i(t, n, !F) : e;
			return s === e ? N.attributes || !F ? t.getAttribute(n) : (s = t.getAttributeNode(n)) && s.specified ? s.value : null : s
		},
		n.error = function (t) {
			throw Error("Syntax error, unrecognized expression: " + t)
		},
		n.uniqueSort = function (t) {
			var e,
			n = [],
			i = 0,
			s = 0;
			if (Q = !N.detectDuplicates, L = !N.sortStable && t.slice(0), t.sort(Z), Q) {
				for (; e = t[s++]; )
					e === t[s] && (i = n.push(s));
				for (; i--; )
					t.splice(n[i], 1)
			}
			return t
		},
		M = n.getText = function (t) {
			var e,
			n = "",
			i = 0,
			s = t.nodeType;
			if (s) {
				if (1 === s || 9 === s || 11 === s) {
					if ("string" == typeof t.textContent)
						return t.textContent;
					for (t = t.firstChild; t; t = t.nextSibling)
						n += M(t)
				} else if (3 === s || 4 === s)
					return t.nodeValue
			} else
				for (; e = t[i]; i++)
					n += M(e);
			return n
		},
		I = n.selectors = {
			cacheLength : 50,
			createPseudo : r,
			match : xe,
			attrHandle : {},
			find : {},
			relative : {
				">" : {
					dir : "parentNode",
					first : !0
				},
				" " : {
					dir : "parentNode"
				},
				"+" : {
					dir : "previousSibling",
					first : !0
				},
				"~" : {
					dir : "previousSibling"
				}
			},
			preFilter : {
				ATTR : function (t) {
					return t[1] = t[1].replace(Ne, ke),
					t[3] = (t[4] || t[5] || "").replace(Ne, ke),
					"~=" === t[2] && (t[3] = " " + t[3] + " "),
					t.slice(0, 4)
				},
				CHILD : function (t) {
					return t[1] = t[1].toLowerCase(),
					"nth" === t[1].slice(0, 3) ? (t[3] || n.error(t[0]), t[4] =  + (t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] =  + (t[7] + t[8] || "odd" === t[3])) : t[3] && n.error(t[0]),
					t
				},
				PSEUDO : function (t) {
					var n,
					i = !t[5] && t[2];
					return xe.CHILD.test(t[0]) ? null : (t[3] && t[4] !== e ? t[2] = t[4] : i && ye.test(i) && (n = m(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (t[0] = t[0].slice(0, n), t[2] = i.slice(0, n)), t.slice(0, 3))
				}
			},
			filter : {
				TAG : function (t) {
					var e = t.replace(Ne, ke).toLowerCase();
					return "*" === t ? function () {
						return !0
					}
					 : function (t) {
						return t.nodeName && t.nodeName.toLowerCase() === e
					}
				},
				CLASS : function (t) {
					var e = Y[t + " "];
					return e || (e = RegExp("(^|" + le + ")" + t + "(" + le + "|$)")) && Y(t, function (t) {
						return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== K && t.getAttribute("class") || "")
					})
				},
				ATTR : function (t, e, i) {
					return function (s) {
						var r = n.attr(s, t);
						return null == r ? "!=" === e : e ? (r += "", "=" === e ? r === i : "!=" === e ? r !== i : "^=" === e ? i && 0 === r.indexOf(i) : "*=" === e ? i && r.indexOf(i) > -1 : "$=" === e ? i && r.slice(-i.length) === i : "~=" === e ? (" " + r + " ").indexOf(i) > -1 : "|=" === e ? r === i || r.slice(0, i.length + 1) === i + "-" : !1) : !0
					}
				},
				CHILD : function (t, e, n, i, s) {
					var r = "nth" !== t.slice(0, 3),
					o = "last" !== t.slice(-4),
					a = "of-type" === e;
					return 1 === i && 0 === s ? function (t) {
						return !!t.parentNode
					}
					 : function (e, n, l) {
						var u,
						h,
						c,
						p,
						d,
						f,
						m = r !== o ? "nextSibling" : "previousSibling",
						g = e.parentNode,
						v = a && e.nodeName.toLowerCase(),
						_ = !l && !a;
						if (g) {
							if (r) {
								for (; m; ) {
									for (c = e; c = c[m]; )
										if (a ? c.nodeName.toLowerCase() === v : 1 === c.nodeType)
											return !1;
									f = m = "only" === t && !f && "nextSibling"
								}
								return !0
							}
							if (f = [o ? g.firstChild : g.lastChild], o && _) {
								for (h = g[B] || (g[B] = {}), u = h[t] || [], d = u[0] === q && u[1], p = u[0] === q && u[2], c = d && g.childNodes[d]; c = ++d && c && c[m] || (p = d = 0) || f.pop(); )
									if (1 === c.nodeType && ++p && c === e) {
										h[t] = [q, d, p];
										break
									}
							} else if (_ && (u = (e[B] || (e[B] = {}))[t]) && u[0] === q)
								p = u[1];
							else
								for (; (c = ++d && c && c[m] || (p = d = 0) || f.pop()) && ((a ? c.nodeName.toLowerCase() !== v : 1 !== c.nodeType) || !++p || (_ && ((c[B] || (c[B] = {}))[t] = [q, p]), c !== e)); );
							return p -= s,
							p === i || 0 === p % i && p / i >= 0
						}
					}
				},
				PSEUDO : function (t, e) {
					var i,
					s = I.pseudos[t] || I.setFilters[t.toLowerCase()] || n.error("unsupported pseudo: " + t);
					return s[B] ? s(e) : s.length > 1 ? (i = [t, t, "", e], I.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function (t, n) {
							for (var i, r = s(t, e), o = r.length; o--; )
								i = oe.call(t, r[o]), t[i] = !(n[i] = r[o])
						}) : function (t) {
						return s(t, 0, i)
					}) : s
				}
			},
			pseudos : {
				not : r(function (t) {
					var e = [],
					n = [],
					i = O(t.replace(fe, "$1"));
					return i[B] ? r(function (t, e, n, s) {
						for (var r, o = i(t, null, s, []), a = t.length; a--; )
							(r = o[a]) && (t[a] = !(e[a] = r))
					}) : function (t, s, r) {
						return e[0] = t,
						i(e, null, r, n),
						!n.pop()
					}
				}),
				has : r(function (t) {
					return function (e) {
						return n(t, e).length > 0
					}
				}),
				contains : r(function (t) {
					return function (e) {
						return (e.textContent || e.innerText || M(e)).indexOf(t) > -1
					}
				}),
				lang : r(function (t) {
					return be.test(t || "") || n.error("unsupported lang: " + t),
					t = t.replace(Ne, ke).toLowerCase(),
					function (e) {
						var n;
						do
							if (n = F ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
								return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-");
						while ((e = e.parentNode) && 1 === e.nodeType);
						return !1
					}
				}),
				target : function (e) {
					var n = t.location && t.location.hash;
					return n && n.slice(1) === e.id
				},
				root : function (t) {
					return t === H
				},
				focus : function (t) {
					return t === R.activeElement && (!R.hasFocus || R.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
				},
				enabled : function (t) {
					return t.disabled === !1
				},
				disabled : function (t) {
					return t.disabled === !0
				},
				checked : function (t) {
					var e = t.nodeName.toLowerCase();
					return "input" === e && !!t.checked || "option" === e && !!t.selected
				},
				selected : function (t) {
					return t.parentNode && t.parentNode.selectedIndex,
					t.selected === !0
				},
				empty : function (t) {
					for (t = t.firstChild; t; t = t.nextSibling)
						if (t.nodeName > "@" || 3 === t.nodeType || 4 === t.nodeType)
							return !1;
					return !0
				},
				parent : function (t) {
					return !I.pseudos.empty(t)
				},
				header : function (t) {
					return Ee.test(t.nodeName)
				},
				input : function (t) {
					return Ce.test(t.nodeName)
				},
				button : function (t) {
					var e = t.nodeName.toLowerCase();
					return "input" === e && "button" === t.type || "button" === e
				},
				text : function (t) {
					var e;
					return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || e.toLowerCase() === t.type)
				},
				first : f(function () {
					return [0]
				}),
				last : f(function (t, e) {
					return [e - 1]
				}),
				eq : f(function (t, e, n) {
					return [0 > n ? n + e : n]
				}),
				even : f(function (t, e) {
					for (var n = 0; e > n; n += 2)
						t.push(n);
					return t
				}),
				odd : f(function (t, e) {
					for (var n = 1; e > n; n += 2)
						t.push(n);
					return t
				}),
				lt : f(function (t, e, n) {
					for (var i = 0 > n ? n + e : n; --i >= 0; )
						t.push(i);
					return t
				}),
				gt : f(function (t, e, n) {
					for (var i = 0 > n ? n + e : n; e > ++i; )
						t.push(i);
					return t
				})
			}
		};
		for (S in {
			radio : !0,
			checkbox : !0,
			file : !0,
			password : !0,
			image : !0
		})
			I.pseudos[S] = p(S);
		for (S in {
			submit : !0,
			reset : !0
		})
			I.pseudos[S] = d(S);
		O = n.compile = function (t, e) {
			var n,
			i = [],
			s = [],
			r = G[t + " "];
			if (!r) {
				for (e || (e = m(t)), n = e.length; n--; )
					r = x(e[n]), r[B] ? i.push(r) : s.push(r);
				r = G(t, w(s, i))
			}
			return r
		},
		I.pseudos.nth = I.pseudos.eq,
		E.prototype = I.filters = I.pseudos,
		I.setFilters = new E,
		N.sortStable = B.split("").sort(Z).join("") === B,
		D(),
		[0, 0].sort(Z),
		N.detectDuplicates = Q,
		he.find = n,
		he.expr = n.selectors,
		he.expr[":"] = he.expr.pseudos,
		he.unique = n.uniqueSort,
		he.text = n.getText,
		he.isXMLDoc = n.isXML,
		he.contains = n.contains
	}
	(t);
	var Ee = {};
	he.Callbacks = function (t) {
		t = "string" == typeof t ? Ee[t] || i(t) : he.extend({}, t);
		var n,
		s,
		r,
		o,
		a,
		l,
		u = [],
		h = !t.once && [],
		c = function (e) {
			for (s = t.memory && e, r = !0, a = l || 0, l = 0, o = u.length, n = !0; u && o > a; a++)
				if (u[a].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
					s = !1;
					break
				}
			n = !1,
			u && (h ? h.length && c(h.shift()) : s ? u = [] : p.disable())
		},
		p = {
			add : function () {
				if (u) {
					var e = u.length;
					(function i(e) {
						he.each(e, function (e, n) {
							var s = he.type(n);
							"function" === s ? t.unique && p.has(n) || u.push(n) : n && n.length && "string" !== s && i(n)
						})
					})(arguments),
					n ? o = u.length : s && (l = e, c(s))
				}
				return this
			},
			remove : function () {
				return u && he.each(arguments, function (t, e) {
					for (var i; (i = he.inArray(e, u, i)) > -1; )
						u.splice(i, 1), n && (o >= i && o--, a >= i && a--)
				}),
				this
			},
			has : function (t) {
				return t ? he.inArray(t, u) > -1 : !(!u || !u.length)
			},
			empty : function () {
				return u = [],
				o = 0,
				this
			},
			disable : function () {
				return u = h = s = e,
				this
			},
			disabled : function () {
				return !u
			},
			lock : function () {
				return h = e,
				s || p.disable(),
				this
			},
			locked : function () {
				return !h
			},
			fireWith : function (t, e) {
				return e = e || [],
				e = [t, e.slice ? e.slice() : e],
				!u || r && !h || (n ? h.push(e) : c(e)),
				this
			},
			fire : function () {
				return p.fireWith(this, arguments),
				this
			},
			fired : function () {
				return !!r
			}
		};
		return p
	},
	he.extend({
		Deferred : function (t) {
			var e = [["resolve", "done", he.Callbacks("once memory"), "resolved"], ["reject", "fail", he.Callbacks("once memory"), "rejected"], ["notify", "progress", he.Callbacks("memory")]],
			n = "pending",
			i = {
				state : function () {
					return n
				},
				always : function () {
					return s.done(arguments).fail(arguments),
					this
				},
				then : function () {
					var t = arguments;
					return he.Deferred(function (n) {
						he.each(e, function (e, r) {
							var o = r[0],
							a = he.isFunction(t[e]) && t[e];
							s[r[1]](function () {
								var t = a && a.apply(this, arguments);
								t && he.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === i ? n.promise() : this, a ? [t] : arguments)
							})
						}),
						t = null
					}).promise()
				},
				promise : function (t) {
					return null != t ? he.extend(t, i) : i
				}
			},
			s = {};
			return i.pipe = i.then,
			he.each(e, function (t, r) {
				var o = r[2],
				a = r[3];
				i[r[1]] = o.add,
				a && o.add(function () {
					n = a
				}, e[1^t][2].disable, e[2][2].lock),
				s[r[0]] = function () {
					return s[r[0] + "With"](this === s ? i : this, arguments),
					this
				},
				s[r[0] + "With"] = o.fireWith
			}),
			i.promise(s),
			t && t.call(s, s),
			s
		},
		when : function (t) {
			var e,
			n,
			i,
			s = 0,
			r = re.call(arguments),
			o = r.length,
			a = 1 !== o || t && he.isFunction(t.promise) ? o : 0,
			l = 1 === a ? t : he.Deferred(),
			u = function (t, n, i) {
				return function (s) {
					n[t] = this,
					i[t] = arguments.length > 1 ? re.call(arguments) : s,
					i === e ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
				}
			};
			if (o > 1)
				for (e = Array(o), n = Array(o), i = Array(o); o > s; s++)
					r[s] && he.isFunction(r[s].promise) ? r[s].promise().done(u(s, i, r)).fail(l.reject).progress(u(s, n, e)) : --a;
			return a || l.resolveWith(i, r),
			l.promise()
		}
	}),
	he.support = function (e) {
		var n,
		i,
		s,
		r,
		o,
		a,
		l,
		u,
		h,
		c = Q.createElement("div");
		if (c.setAttribute("className", "t"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = c.getElementsByTagName("*") || [], i = c.getElementsByTagName("a")[0], !i || !i.style || !n.length)
			return e;
		r = Q.createElement("select"),
		a = r.appendChild(Q.createElement("option")),
		s = c.getElementsByTagName("input")[0],
		i.style.cssText = "top:1px;float:left;opacity:.5",
		e.getSetAttribute = "t" !== c.className,
		e.leadingWhitespace = 3 === c.firstChild.nodeType,
		e.tbody = !c.getElementsByTagName("tbody").length,
		e.htmlSerialize = !!c.getElementsByTagName("link").length,
		e.style = /top/.test(i.getAttribute("style")),
		e.hrefNormalized = "/a" === i.getAttribute("href"),
		e.opacity = /^0.5/.test(i.style.opacity),
		e.cssFloat = !!i.style.cssFloat,
		e.checkOn = !!s.value,
		e.optSelected = a.selected,
		e.enctype = !!Q.createElement("form").enctype,
		e.html5Clone = "<:nav></:nav>" !== Q.createElement("nav").cloneNode(!0).outerHTML,
		e.inlineBlockNeedsLayout = !1,
		e.shrinkWrapBlocks = !1,
		e.pixelPosition = !1,
		e.deleteExpando = !0,
		e.noCloneEvent = !0,
		e.reliableMarginRight = !0,
		e.boxSizingReliable = !0,
		s.checked = !0,
		e.noCloneChecked = s.cloneNode(!0).checked,
		r.disabled = !0,
		e.optDisabled = !a.disabled;
		try {
			delete c.test
		} catch (p) {
			e.deleteExpando = !1
		}
		s = Q.createElement("input"),
		s.setAttribute("value", ""),
		e.input = "" === s.getAttribute("value"),
		s.value = "t",
		s.setAttribute("type", "radio"),
		e.radioValue = "t" === s.value,
		s.setAttribute("checked", "t"),
		s.setAttribute("name", "t"),
		o = Q.createDocumentFragment(),
		o.appendChild(s),
		e.appendChecked = s.checked,
		e.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked,
		c.attachEvent && (c.attachEvent("onclick", function () {
				e.noCloneEvent = !1
			}), c.cloneNode(!0).click());
		for (h in {
			submit : !0,
			change : !0,
			focusin : !0
		})
			c.setAttribute(l = "on" + h, "t"), e[h + "Bubbles"] = l in t || c.attributes[l].expando === !1;
		c.style.backgroundClip = "content-box",
		c.cloneNode(!0).style.backgroundClip = "",
		e.clearCloneStyle = "content-box" === c.style.backgroundClip;
		for (h in he(e))
			break;
		return e.ownLast = "0" !== h,
		he(function () {
			var n,
			i,
			s,
			r = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			o = Q.getElementsByTagName("body")[0];
			o && (n = Q.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", o.appendChild(n).appendChild(c), c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = c.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", u = 0 === s[0].offsetHeight, s[0].style.display = "", s[1].style.display = "none", e.reliableHiddenOffsets = u && 0 === s[0].offsetHeight, c.innerHTML = "", c.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", he.swap(o, null != o.style.zoom ? {
					zoom : 1
				}
					 : {}, function () {
					e.boxSizing = 4 === c.offsetWidth
				}), t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(c, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(c, null) || {
							width : "4px"
						}).width, i = c.appendChild(Q.createElement("div")), i.style.cssText = c.style.cssText = r, i.style.marginRight = i.style.width = "0", c.style.width = "1px", e.reliableMarginRight = !parseFloat((t.getComputedStyle(i, null) || {}).marginRight)), typeof c.style.zoom !== U && (c.innerHTML = "", c.style.cssText = r + "width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = 3 === c.offsetWidth, c.style.display = "block", c.innerHTML = "<div></div>", c.firstChild.style.width = "5px", e.shrinkWrapBlocks = 3 !== c.offsetWidth, e.inlineBlockNeedsLayout && (o.style.zoom = 1)), o.removeChild(n), n = c = s = i = null)
		}),
		n = r = o = a = i = s = null,
		e
	}
	({});
	var Se = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	Ne = /([A-Z])/g;
	he.extend({
		cache : {},
		noData : {
			applet : !0,
			embed : !0,
			object : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData : function (t) {
			return t = t.nodeType ? he.cache[t[he.expando]] : t[he.expando],
			!!t && !a(t)
		},
		data : function (t, e, n) {
			return s(t, e, n)
		},
		removeData : function (t, e) {
			return r(t, e)
		},
		_data : function (t, e, n) {
			return s(t, e, n, !0)
		},
		_removeData : function (t, e) {
			return r(t, e, !0)
		},
		acceptData : function (t) {
			if (t.nodeType && 1 !== t.nodeType && 9 !== t.nodeType)
				return !1;
			var e = t.nodeName && he.noData[t.nodeName.toLowerCase()];
			return !e || e !== !0 && t.getAttribute("classid") === e
		}
	}),
	he.fn.extend({
		data : function (t, n) {
			var i,
			s,
			r = null,
			a = 0,
			l = this[0];
			if (t === e) {
				if (this.length && (r = he.data(l), 1 === l.nodeType && !he._data(l, "parsedAttrs"))) {
					for (i = l.attributes; i.length > a; a++)
						s = i[a].name, 0 === s.indexOf("data-") && (s = he.camelCase(s.slice(5)), o(l, s, r[s]));
					he._data(l, "parsedAttrs", !0)
				}
				return r
			}
			return "object" == typeof t ? this.each(function () {
				he.data(this, t)
			}) : arguments.length > 1 ? this.each(function () {
				he.data(this, t, n)
			}) : l ? o(l, t, he.data(l, t)) : null
		},
		removeData : function (t) {
			return this.each(function () {
				he.removeData(this, t)
			})
		}
	}),
	he.extend({
		queue : function (t, n, i) {
			var s;
			return t ? (n = (n || "fx") + "queue", s = he._data(t, n), i && (!s || he.isArray(i) ? s = he._data(t, n, he.makeArray(i)) : s.push(i)), s || []) : e
		},
		dequeue : function (t, e) {
			e = e || "fx";
			var n = he.queue(t, e),
			i = n.length,
			s = n.shift(),
			r = he._queueHooks(t, e),
			o = function () {
				he.dequeue(t, e)
			};
			"inprogress" === s && (s = n.shift(), i--),
			s && ("fx" === e && n.unshift("inprogress"), delete r.stop, s.call(t, o, r)),
			!i && r && r.empty.fire()
		},
		_queueHooks : function (t, e) {
			var n = e + "queueHooks";
			return he._data(t, n) || he._data(t, n, {
				empty : he.Callbacks("once memory").add(function () {
					he._removeData(t, e + "queue"),
					he._removeData(t, n)
				})
			})
		}
	}),
	he.fn.extend({
		queue : function (t, n) {
			var i = 2;
			return "string" != typeof t && (n = t, t = "fx", i--),
			i > arguments.length ? he.queue(this[0], t) : n === e ? this : this.each(function () {
				var e = he.queue(this, t, n);
				he._queueHooks(this, t),
				"fx" === t && "inprogress" !== e[0] && he.dequeue(this, t)
			})
		},
		dequeue : function (t) {
			return this.each(function () {
				he.dequeue(this, t)
			})
		},
		delay : function (t, e) {
			return t = he.fx ? he.fx.speeds[t] || t : t,
			e = e || "fx",
			this.queue(e, function (e, n) {
				var i = setTimeout(e, t);
				n.stop = function () {
					clearTimeout(i)
				}
			})
		},
		clearQueue : function (t) {
			return this.queue(t || "fx", [])
		},
		promise : function (t, n) {
			var i,
			s = 1,
			r = he.Deferred(),
			o = this,
			a = this.length,
			l = function () {
				--s || r.resolveWith(o, [o])
			};
			for ("string" != typeof t && (n = t, t = e), t = t || "fx"; a--; )
				i = he._data(o[a], t + "queueHooks"), i && i.empty && (s++, i.empty.add(l));
			return l(),
			r.promise(n)
		}
	});
	var ke,
	Ie,
	Me = /[\t\r\n\f]/g,
	Pe = /\r/g,
	Oe = /^(?:input|select|textarea|button|object)$/i,
	Ae = /^(?:a|area)$/i,
	Le = /^(?:checked|selected)$/i,
	De = he.support.getSetAttribute,
	Re = he.support.input;
	he.fn.extend({
		attr : function (t, e) {
			return he.access(this, he.attr, t, e, arguments.length > 1)
		},
		removeAttr : function (t) {
			return this.each(function () {
				he.removeAttr(this, t)
			})
		},
		prop : function (t, e) {
			return he.access(this, he.prop, t, e, arguments.length > 1)
		},
		removeProp : function (t) {
			return t = he.propFix[t] || t,
			this.each(function () {
				try {
					this[t] = e,
					delete this[t]
				} catch (n) {}

			})
		},
		addClass : function (t) {
			var e,
			n,
			i,
			s,
			r,
			o = 0,
			a = this.length,
			l = "string" == typeof t && t;
			if (he.isFunction(t))
				return this.each(function (e) {
					he(this).addClass(t.call(this, e, this.className))
				});
			if (l)
				for (e = (t || "").match(pe) || []; a > o; o++)
					if (n = this[o], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Me, " ") : " ")) {
						for (r = 0; s = e[r++]; )
							0 > i.indexOf(" " + s + " ") && (i += s + " ");
						n.className = he.trim(i)
					}
			return this
		},
		removeClass : function (t) {
			var e,
			n,
			i,
			s,
			r,
			o = 0,
			a = this.length,
			l = 0 === arguments.length || "string" == typeof t && t;
			if (he.isFunction(t))
				return this.each(function (e) {
					he(this).removeClass(t.call(this, e, this.className))
				});
			if (l)
				for (e = (t || "").match(pe) || []; a > o; o++)
					if (n = this[o], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Me, " ") : "")) {
						for (r = 0; s = e[r++]; )
							for (; i.indexOf(" " + s + " ") >= 0; )
								i = i.replace(" " + s + " ", " ");
						n.className = t ? he.trim(i) : ""
					}
			return this
		},
		toggleClass : function (t, e) {
			var n = typeof t,
			i = "boolean" == typeof e;
			return he.isFunction(t) ? this.each(function (n) {
				he(this).toggleClass(t.call(this, n, this.className, e), e)
			}) : this.each(function () {
				if ("string" === n)
					for (var s, r = 0, o = he(this), a = e, l = t.match(pe) || []; s = l[r++]; )
						a = i ? a : !o.hasClass(s), o[a ? "addClass" : "removeClass"](s);
				else (n === U || "boolean" === n) && (this.className && he._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : he._data(this, "__className__") || "")
			})
		},
		hasClass : function (t) {
			for (var e = " " + t + " ", n = 0, i = this.length; i > n; n++)
				if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Me, " ").indexOf(e) >= 0)
					return !0;
			return !1
		},
		val : function (t) {
			var n,
			i,
			s,
			r = this[0];
			return arguments.length ? (s = he.isFunction(t), this.each(function (n) {
					var r;
					1 === this.nodeType && (r = s ? t.call(this, n, he(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : he.isArray(r) && (r = he.map(r, function (t) {
										return null == t ? "" : t + ""
									})), i = he.valHooks[this.type] || he.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, r, "value") !== e || (this.value = r))
				})) : r ? (i = he.valHooks[r.type] || he.valHooks[r.nodeName.toLowerCase()], i && "get" in i && (n = i.get(r, "value")) !== e ? n : (n = r.value, "string" == typeof n ? n.replace(Pe, "") : null == n ? "" : n)) : void 0
		}
	}),
	he.extend({
		valHooks : {
			option : {
				get : function (t) {
					var e = he.find.attr(t, "value");
					return null != e ? e : t.text
				}
			},
			select : {
				get : function (t) {
					for (var e, n, i = t.options, s = t.selectedIndex, r = "select-one" === t.type || 0 > s, o = r ? null : [], a = r ? s + 1 : i.length, l = 0 > s ? a : r ? s : 0; a > l; l++)
						if (n = i[l], !(!n.selected && l !== s || (he.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && he.nodeName(n.parentNode, "optgroup"))) {
							if (e = he(n).val(), r)
								return e;
							o.push(e)
						}
					return o
				},
				set : function (t, e) {
					for (var n, i, s = t.options, r = he.makeArray(e), o = s.length; o--; )
						i = s[o], (i.selected = he.inArray(he(i).val(), r) >= 0) && (n = !0);
					return n || (t.selectedIndex = -1),
					r
				}
			}
		},
		attr : function (t, n, i) {
			var s,
			r,
			o = t.nodeType;
			return t && 3 !== o && 8 !== o && 2 !== o ? typeof t.getAttribute === U ? he.prop(t, n, i) : (1 === o && he.isXMLDoc(t) || (n = n.toLowerCase(), s = he.attrHooks[n] || (he.expr.match.bool.test(n) ? Ie : ke)), i === e ? s && "get" in s && null !== (r = s.get(t, n)) ? r : (r = he.find.attr(t, n), null == r ? e : r) : null !== i ? s && "set" in s && (r = s.set(t, i, n)) !== e ? r : (t.setAttribute(n, i + ""), i) : (he.removeAttr(t, n), e)) : void 0
		},
		removeAttr : function (t, e) {
			var n,
			i,
			s = 0,
			r = e && e.match(pe);
			if (r && 1 === t.nodeType)
				for (; n = r[s++]; )
					i = he.propFix[n] || n, he.expr.match.bool.test(n) ? Re && De || !Le.test(n) ? t[i] = !1 : t[he.camelCase("default-" + n)] = t[i] = !1 : he.attr(t, n, ""), t.removeAttribute(De ? n : i)
		},
		attrHooks : {
			type : {
				set : function (t, e) {
					if (!he.support.radioValue && "radio" === e && he.nodeName(t, "input")) {
						var n = t.value;
						return t.setAttribute("type", e),
						n && (t.value = n),
						e
					}
				}
			}
		},
		propFix : {
			"for" : "htmlFor",
			"class" : "className"
		},
		prop : function (t, n, i) {
			var s,
			r,
			o,
			a = t.nodeType;
			return t && 3 !== a && 8 !== a && 2 !== a ? (o = 1 !== a || !he.isXMLDoc(t), o && (n = he.propFix[n] || n, r = he.propHooks[n]), i !== e ? r && "set" in r && (s = r.set(t, i, n)) !== e ? s : t[n] = i : r && "get" in r && null !== (s = r.get(t, n)) ? s : t[n]) : void 0
		},
		propHooks : {
			tabIndex : {
				get : function (t) {
					var e = he.find.attr(t, "tabindex");
					return e ? parseInt(e, 10) : Oe.test(t.nodeName) || Ae.test(t.nodeName) && t.href ? 0 : -1
				}
			}
		}
	}),
	Ie = {
		set : function (t, e, n) {
			return e === !1 ? he.removeAttr(t, n) : Re && De || !Le.test(n) ? t.setAttribute(!De && he.propFix[n] || n, n) : t[he.camelCase("default-" + n)] = t[n] = !0,
			n
		}
	},
	he.each(he.expr.match.bool.source.match(/\w+/g), function (t, n) {
		var i = he.expr.attrHandle[n] || he.find.attr;
		he.expr.attrHandle[n] = Re && De || !Le.test(n) ? function (t, n, s) {
			var r = he.expr.attrHandle[n],
			o = s ? e : (he.expr.attrHandle[n] = e) != i(t, n, s) ? n.toLowerCase() : null;
			return he.expr.attrHandle[n] = r,
			o
		}
		 : function (t, n, i) {
			return i ? e : t[he.camelCase("default-" + n)] ? n.toLowerCase() : null
		}
	}),
	Re && De || (he.attrHooks.value = {
			set : function (t, n, i) {
				return he.nodeName(t, "input") ? (t.defaultValue = n, e) : ke && ke.set(t, n, i)
			}
		}),
	De || (ke = {
			set : function (t, n, i) {
				var s = t.getAttributeNode(i);
				return s || t.setAttributeNode(s = t.ownerDocument.createAttribute(i)),
				s.value = n += "",
				"value" === i || n === t.getAttribute(i) ? n : e
			}
		}, he.expr.attrHandle.id = he.expr.attrHandle.name = he.expr.attrHandle.coords = function (t, n, i) {
		var s;
		return i ? e : (s = t.getAttributeNode(n)) && "" !== s.value ? s.value : null
	}, he.valHooks.button = {
		get : function (t, n) {
			var i = t.getAttributeNode(n);
			return i && i.specified ? i.value : e
		},
		set : ke.set
	}, he.attrHooks.contenteditable = {
		set : function (t, e, n) {
			ke.set(t, "" === e ? !1 : e, n)
		}
	}, he.each(["width", "height"], function (t, n) {
		he.attrHooks[n] = {
			set : function (t, i) {
				return "" === i ? (t.setAttribute(n, "auto"), i) : e
			}
		}
	})),
	he.support.hrefNormalized || he.each(["href", "src"], function (t, e) {
		he.propHooks[e] = {
			get : function (t) {
				return t.getAttribute(e, 4)
			}
		}
	}),
	he.support.style || (he.attrHooks.style = {
			get : function (t) {
				return t.style.cssText || e
			},
			set : function (t, e) {
				return t.style.cssText = e + ""
			}
		}),
	he.support.optSelected || (he.propHooks.selected = {
			get : function (t) {
				var e = t.parentNode;
				return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex),
				null
			}
		}),
	he.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		he.propFix[this.toLowerCase()] = this
	}),
	he.support.enctype || (he.propFix.enctype = "encoding"),
	he.each(["radio", "checkbox"], function () {
		he.valHooks[this] = {
			set : function (t, n) {
				return he.isArray(n) ? t.checked = he.inArray(he(t).val(), n) >= 0 : e
			}
		},
		he.support.checkOn || (he.valHooks[this].get = function (t) {
			return null === t.getAttribute("value") ? "on" : t.value
		})
	});
	var He = /^(?:input|select|textarea)$/i,
	Fe = /^key/,
	$e = /^(?:mouse|contextmenu)|click/,
	je = /^(?:focusinfocus|focusoutblur)$/,
	ze = /^([^.]*)(?:\.(.+)|)$/;
	he.event = {
		global : {},
		add : function (t, n, i, s, r) {
			var o,
			a,
			l,
			u,
			h,
			c,
			p,
			d,
			f,
			m,
			g,
			v = he._data(t);
			if (v) {
				for (i.handler && (u = i, i = u.handler, r = u.selector), i.guid || (i.guid = he.guid++), (a = v.events) || (a = v.events = {}), (c = v.handle) || (c = v.handle = function (t) {
						return typeof he === U || t && he.event.triggered === t.type ? e : he.event.dispatch.apply(c.elem, arguments)
					}, c.elem = t), n = (n || "").match(pe) || [""], l = n.length; l--; )
					o = ze.exec(n[l]) || [], f = g = o[1], m = (o[2] || "").split(".").sort(), f && (h = he.event.special[f] || {}, f = (r ? h.delegateType : h.bindType) || f, h = he.event.special[f] || {}, p = he.extend({
								type : f,
								origType : g,
								data : s,
								handler : i,
								guid : i.guid,
								selector : r,
								needsContext : r && he.expr.match.needsContext.test(r),
								namespace : m.join(".")
							}, u), (d = a[f]) || (d = a[f] = [], d.delegateCount = 0, h.setup && h.setup.call(t, s, m, c) !== !1 || (t.addEventListener ? t.addEventListener(f, c, !1) : t.attachEvent && t.attachEvent("on" + f, c))), h.add && (h.add.call(t, p), p.handler.guid || (p.handler.guid = i.guid)), r ? d.splice(d.delegateCount++, 0, p) : d.push(p), he.event.global[f] = !0);
				t = null
			}
		},
		remove : function (t, e, n, i, s) {
			var r,
			o,
			a,
			l,
			u,
			h,
			c,
			p,
			d,
			f,
			m,
			g = he.hasData(t) && he._data(t);
			if (g && (h = g.events)) {
				for (e = (e || "").match(pe) || [""], u = e.length; u--; )
					if (a = ze.exec(e[u]) || [], d = m = a[1], f = (a[2] || "").split(".").sort(), d) {
						for (c = he.event.special[d] || {}, d = (i ? c.delegateType : c.bindType) || d, p = h[d] || [], a = a[2] && RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--; )
							o = p[r], !s && m !== o.origType || n && n.guid !== o.guid || a && !a.test(o.namespace) || i && i !== o.selector && ("**" !== i || !o.selector) || (p.splice(r, 1), o.selector && p.delegateCount--, c.remove && c.remove.call(t, o));
						l && !p.length && (c.teardown && c.teardown.call(t, f, g.handle) !== !1 || he.removeEvent(t, d, g.handle), delete h[d])
					} else
						for (d in h)
							he.event.remove(t, d + e[u], n, i, !0);
				he.isEmptyObject(h) && (delete g.handle, he._removeData(t, "events"))
			}
		},
		trigger : function (n, i, s, r) {
			var o,
			a,
			l,
			u,
			h,
			c,
			p,
			d = [s || Q],
			f = le.call(n, "type") ? n.type : n,
			m = le.call(n, "namespace") ? n.namespace.split(".") : [];
			if (l = c = s = s || Q, 3 !== s.nodeType && 8 !== s.nodeType && !je.test(f + he.event.triggered) && (f.indexOf(".") >= 0 && (m = f.split("."), f = m.shift(), m.sort()), a = 0 > f.indexOf(":") && "on" + f, n = n[he.expando] ? n : new he.Event(f, "object" == typeof n && n), n.isTrigger = r ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = e, n.target || (n.target = s), i = null == i ? [n] : he.makeArray(i, [n]), h = he.event.special[f] || {}, r || !h.trigger || h.trigger.apply(s, i) !== !1)) {
				if (!r && !h.noBubble && !he.isWindow(s)) {
					for (u = h.delegateType || f, je.test(u + f) || (l = l.parentNode); l; l = l.parentNode)
						d.push(l), c = l;
					c === (s.ownerDocument || Q) && d.push(c.defaultView || c.parentWindow || t)
				}
				for (p = 0; (l = d[p++]) && !n.isPropagationStopped(); )
					n.type = p > 1 ? u : h.bindType || f, o = (he._data(l, "events") || {})[n.type] && he._data(l, "handle"), o && o.apply(l, i), o = a && l[a], o && he.acceptData(l) && o.apply && o.apply(l, i) === !1 && n.preventDefault();
				if (n.type = f, !r && !n.isDefaultPrevented() && (!h._default || h._default.apply(d.pop(), i) === !1) && he.acceptData(s) && a && s[f] && !he.isWindow(s)) {
					c = s[a],
					c && (s[a] = null),
					he.event.triggered = f;
					try {
						s[f]()
					} catch (g) {}

					he.event.triggered = e,
					c && (s[a] = c)
				}
				return n.result
			}
		},
		dispatch : function (t) {
			t = he.event.fix(t);
			var n,
			i,
			s,
			r,
			o,
			a = [],
			l = re.call(arguments),
			u = (he._data(this, "events") || {})[t.type] || [],
			h = he.event.special[t.type] || {};
			if (l[0] = t, t.delegateTarget = this, !h.preDispatch || h.preDispatch.call(this, t) !== !1) {
				for (a = he.event.handlers.call(this, t, u), n = 0; (r = a[n++]) && !t.isPropagationStopped(); )
					for (t.currentTarget = r.elem, o = 0; (s = r.handlers[o++]) && !t.isImmediatePropagationStopped(); )
						(!t.namespace_re || t.namespace_re.test(s.namespace)) && (t.handleObj = s, t.data = s.data, i = ((he.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, l), i !== e && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
				return h.postDispatch && h.postDispatch.call(this, t),
				t.result
			}
		},
		handlers : function (t, n) {
			var i,
			s,
			r,
			o,
			a = [],
			l = n.delegateCount,
			u = t.target;
			if (l && u.nodeType && (!t.button || "click" !== t.type))
				for (; u != this; u = u.parentNode || this)
					if (1 === u.nodeType && (u.disabled !== !0 || "click" !== t.type)) {
						for (r = [], o = 0; l > o; o++)
							s = n[o], i = s.selector + " ", r[i] === e && (r[i] = s.needsContext ? he(i, this).index(u) >= 0 : he.find(i, this, null, [u]).length), r[i] && r.push(s);
						r.length && a.push({
							elem : u,
							handlers : r
						})
					}
			return n.length > l && a.push({
				elem : this,
				handlers : n.slice(l)
			}),
			a
		},
		fix : function (t) {
			if (t[he.expando])
				return t;
			var e,
			n,
			i,
			s = t.type,
			r = t,
			o = this.fixHooks[s];
			for (o || (this.fixHooks[s] = o = $e.test(s) ? this.mouseHooks : Fe.test(s) ? this.keyHooks : {}), i = o.props ? this.props.concat(o.props) : this.props, t = new he.Event(r), e = i.length; e--; )
				n = i[e], t[n] = r[n];
			return t.target || (t.target = r.srcElement || Q),
			3 === t.target.nodeType && (t.target = t.target.parentNode),
			t.metaKey = !!t.metaKey,
			o.filter ? o.filter(t, r) : t
		},
		props : "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks : {},
		keyHooks : {
			props : "char charCode key keyCode".split(" "),
			filter : function (t, e) {
				return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode),
				t
			}
		},
		mouseHooks : {
			props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter : function (t, n) {
				var i,
				s,
				r,
				o = n.button,
				a = n.fromElement;
				return null == t.pageX && null != n.clientX && (s = t.target.ownerDocument || Q, r = s.documentElement, i = s.body, t.pageX = n.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), t.pageY = n.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)),
				!t.relatedTarget && a && (t.relatedTarget = a === t.target ? n.toElement : a),
				t.which || o === e || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
				t
			}
		},
		special : {
			load : {
				noBubble : !0
			},
			focus : {
				trigger : function () {
					if (this !== h() && this.focus)
						try {
							return this.focus(),
							!1
						} catch (t) {}

				},
				delegateType : "focusin"
			},
			blur : {
				trigger : function () {
					return this === h() && this.blur ? (this.blur(), !1) : e
				},
				delegateType : "focusout"
			},
			click : {
				trigger : function () {
					return he.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : e
				},
				_default : function (t) {
					return he.nodeName(t.target, "a")
				}
			},
			beforeunload : {
				postDispatch : function (t) {
					t.result !== e && (t.originalEvent.returnValue = t.result)
				}
			}
		},
		simulate : function (t, e, n, i) {
			var s = he.extend(new he.Event, n, {
					type : t,
					isSimulated : !0,
					originalEvent : {}

				});
			i ? he.event.trigger(s, null, e) : he.event.dispatch.call(e, s),
			s.isDefaultPrevented() && n.preventDefault()
		}
	},
	he.removeEvent = Q.removeEventListener ? function (t, e, n) {
		t.removeEventListener && t.removeEventListener(e, n, !1)
	}
	 : function (t, e, n) {
		var i = "on" + e;
		t.detachEvent && (typeof t[i] === U && (t[i] = null), t.detachEvent(i, n))
	},
	he.Event = function (t, n) {
		return this instanceof he.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault() ? l : u) : this.type = t, n && he.extend(this, n), this.timeStamp = t && t.timeStamp || he.now(), this[he.expando] = !0, e) : new he.Event(t, n)
	},
	he.Event.prototype = {
		isDefaultPrevented : u,
		isPropagationStopped : u,
		isImmediatePropagationStopped : u,
		preventDefault : function () {
			var t = this.originalEvent;
			this.isDefaultPrevented = l,
			t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
		},
		stopPropagation : function () {
			var t = this.originalEvent;
			this.isPropagationStopped = l,
			t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
		},
		stopImmediatePropagation : function () {
			this.isImmediatePropagationStopped = l,
			this.stopPropagation()
		}
	},
	he.each({
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	}, function (t, e) {
		he.event.special[t] = {
			delegateType : e,
			bindType : e,
			handle : function (t) {
				var n,
				i = this,
				s = t.relatedTarget,
				r = t.handleObj;
				return (!s || s !== i && !he.contains(i, s)) && (t.type = r.origType, n = r.handler.apply(this, arguments), t.type = e),
				n
			}
		}
	}),
	he.support.submitBubbles || (he.event.special.submit = {
			setup : function () {
				return he.nodeName(this, "form") ? !1 : (he.event.add(this, "click._submit keypress._submit", function (t) {
						var n = t.target,
						i = he.nodeName(n, "input") || he.nodeName(n, "button") ? n.form : e;
						i && !he._data(i, "submitBubbles") && (he.event.add(i, "submit._submit", function (t) {
								t._submit_bubble = !0
							}), he._data(i, "submitBubbles", !0))
					}), e)
			},
			postDispatch : function (t) {
				t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && he.event.simulate("submit", this.parentNode, t, !0))
			},
			teardown : function () {
				return he.nodeName(this, "form") ? !1 : (he.event.remove(this, "._submit"), e)
			}
		}),
	he.support.changeBubbles || (he.event.special.change = {
			setup : function () {
				return He.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (he.event.add(this, "propertychange._change", function (t) {
							"checked" === t.originalEvent.propertyName && (this._just_changed = !0)
						}), he.event.add(this, "click._change", function (t) {
							this._just_changed && !t.isTrigger && (this._just_changed = !1),
							he.event.simulate("change", this, t, !0)
						})), !1) : (he.event.add(this, "beforeactivate._change", function (t) {
						var e = t.target;
						He.test(e.nodeName) && !he._data(e, "changeBubbles") && (he.event.add(e, "change._change", function (t) {
								!this.parentNode || t.isSimulated || t.isTrigger || he.event.simulate("change", this.parentNode, t, !0)
							}), he._data(e, "changeBubbles", !0))
					}), e)
			},
			handle : function (t) {
				var n = t.target;
				return this !== n || t.isSimulated || t.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? t.handleObj.handler.apply(this, arguments) : e
			},
			teardown : function () {
				return he.event.remove(this, "._change"),
				!He.test(this.nodeName)
			}
		}),
	he.support.focusinBubbles || he.each({
		focus : "focusin",
		blur : "focusout"
	}, function (t, e) {
		var n = 0,
		i = function (t) {
			he.event.simulate(e, t.target, he.event.fix(t), !0)
		};
		he.event.special[e] = {
			setup : function () {
				0 === n++ && Q.addEventListener(t, i, !0)
			},
			teardown : function () {
				0 === --n && Q.removeEventListener(t, i, !0)
			}
		}
	}),
	he.fn.extend({
		on : function (t, n, i, s, r) {
			var o,
			a;
			if ("object" == typeof t) {
				"string" != typeof n && (i = i || n, n = e);
				for (o in t)
					this.on(o, n, i, t[o], r);
				return this
			}
			if (null == i && null == s ? (s = n, i = n = e) : null == s && ("string" == typeof n ? (s = i, i = e) : (s = i, i = n, n = e)), s === !1)
				s = u;
			else if (!s)
				return this;
			return 1 === r && (a = s, s = function (t) {
				return he().off(t),
				a.apply(this, arguments)
			}, s.guid = a.guid || (a.guid = he.guid++)),
			this.each(function () {
				he.event.add(this, t, s, i, n)
			})
		},
		one : function (t, e, n, i) {
			return this.on(t, e, n, i, 1)
		},
		off : function (t, n, i) {
			var s,
			r;
			if (t && t.preventDefault && t.handleObj)
				return s = t.handleObj, he(t.delegateTarget).off(s.namespace ? s.origType + "." + s.namespace : s.origType, s.selector, s.handler), this;
			if ("object" == typeof t) {
				for (r in t)
					this.off(r, n, t[r]);
				return this
			}
			return (n === !1 || "function" == typeof n) && (i = n, n = e),
			i === !1 && (i = u),
			this.each(function () {
				he.event.remove(this, t, i, n)
			})
		},
		trigger : function (t, e) {
			return this.each(function () {
				he.event.trigger(t, e, this)
			})
		},
		triggerHandler : function (t, n) {
			var i = this[0];
			return i ? he.event.trigger(t, n, i, !0) : e
		}
	});
	var Xe = /^.[^:#\[\.,]*$/,
	Be = /^(?:parents|prev(?:Until|All))/,
	Ve = he.expr.match.needsContext,
	qe = {
		children : !0,
		contents : !0,
		next : !0,
		prev : !0
	};
	he.fn.extend({
		find : function (t) {
			var e,
			n = [],
			i = this,
			s = i.length;
			if ("string" != typeof t)
				return this.pushStack(he(t).filter(function () {
						for (e = 0; s > e; e++)
							if (he.contains(i[e], this))
								return !0
					}));
			for (e = 0; s > e; e++)
				he.find(t, i[e], n);
			return n = this.pushStack(s > 1 ? he.unique(n) : n),
			n.selector = this.selector ? this.selector + " " + t : t,
			n
		},
		has : function (t) {
			var e,
			n = he(t, this),
			i = n.length;
			return this.filter(function () {
				for (e = 0; i > e; e++)
					if (he.contains(this, n[e]))
						return !0
			})
		},
		not : function (t) {
			return this.pushStack(p(this, t || [], !0))
		},
		filter : function (t) {
			return this.pushStack(p(this, t || [], !1))
		},
		is : function (t) {
			return !!p(this, "string" == typeof t && Ve.test(t) ? he(t) : t || [], !1).length
		},
		closest : function (t, e) {
			for (var n, i = 0, s = this.length, r = [], o = Ve.test(t) || "string" != typeof t ? he(t, e || this.context) : 0; s > i; i++)
				for (n = this[i]; n && n !== e; n = n.parentNode)
					if (11 > n.nodeType && (o ? o.index(n) > -1 : 1 === n.nodeType && he.find.matchesSelector(n, t))) {
						n = r.push(n);
						break
					}
			return this.pushStack(r.length > 1 ? he.unique(r) : r)
		},
		index : function (t) {
			return t ? "string" == typeof t ? he.inArray(this[0], he(t)) : he.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add : function (t, e) {
			var n = "string" == typeof t ? he(t, e) : he.makeArray(t && t.nodeType ? [t] : t),
			i = he.merge(this.get(), n);
			return this.pushStack(he.unique(i))
		},
		addBack : function (t) {
			return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
		}
	}),
	he.each({
		parent : function (t) {
			var e = t.parentNode;
			return e && 11 !== e.nodeType ? e : null
		},
		parents : function (t) {
			return he.dir(t, "parentNode")
		},
		parentsUntil : function (t, e, n) {
			return he.dir(t, "parentNode", n)
		},
		next : function (t) {
			return c(t, "nextSibling")
		},
		prev : function (t) {
			return c(t, "previousSibling")
		},
		nextAll : function (t) {
			return he.dir(t, "nextSibling")
		},
		prevAll : function (t) {
			return he.dir(t, "previousSibling")
		},
		nextUntil : function (t, e, n) {
			return he.dir(t, "nextSibling", n)
		},
		prevUntil : function (t, e, n) {
			return he.dir(t, "previousSibling", n)
		},
		siblings : function (t) {
			return he.sibling((t.parentNode || {}).firstChild, t)
		},
		children : function (t) {
			return he.sibling(t.firstChild)
		},
		contents : function (t) {
			return he.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : he.merge([], t.childNodes)
		}
	}, function (t, e) {
		he.fn[t] = function (n, i) {
			var s = he.map(this, e, n);
			return "Until" !== t.slice(-5) && (i = n),
			i && "string" == typeof i && (s = he.filter(i, s)),
			this.length > 1 && (qe[t] || (s = he.unique(s)), Be.test(t) && (s = s.reverse())),
			this.pushStack(s)
		}
	}),
	he.extend({
		filter : function (t, e, n) {
			var i = e[0];
			return n && (t = ":not(" + t + ")"),
			1 === e.length && 1 === i.nodeType ? he.find.matchesSelector(i, t) ? [i] : [] : he.find.matches(t, he.grep(e, function (t) {
					return 1 === t.nodeType
				}))
		},
		dir : function (t, n, i) {
			for (var s = [], r = t[n]; r && 9 !== r.nodeType && (i === e || 1 !== r.nodeType || !he(r).is(i)); )
				1 === r.nodeType && s.push(r), r = r[n];
			return s
		},
		sibling : function (t, e) {
			for (var n = []; t; t = t.nextSibling)
				1 === t.nodeType && t !== e && n.push(t);
			return n
		}
	});
	var We = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	Ye = / jQuery\d+="(?:null|\d+)"/g,
	Ue = RegExp("<(?:" + We + ")[\\s/>]", "i"),
	Ge = /^\s+/,
	Qe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	Ze = /<([\w:]+)/,
	Ke = /<tbody/i,
	Je = /<|&#?\w+;/,
	tn = /<(?:script|style|link)/i,
	en = /^(?:checkbox|radio)$/i,
	nn = /checked\s*(?:[^=]|=\s*.checked.)/i,
	sn = /^$|\/(?:java|ecma)script/i,
	rn = /^true\/(.*)/,
	on = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	an = {
		option : [1, "<select multiple='multiple'>", "</select>"],
		legend : [1, "<fieldset>", "</fieldset>"],
		area : [1, "<map>", "</map>"],
		param : [1, "<object>", "</object>"],
		thead : [1, "<table>", "</table>"],
		tr : [2, "<table><tbody>", "</tbody></table>"],
		col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default : he.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	},
	ln = d(Q),
	un = ln.appendChild(Q.createElement("div"));
	an.optgroup = an.option,
	an.tbody = an.tfoot = an.colgroup = an.caption = an.thead,
	an.th = an.td,
	he.fn.extend({
		text : function (t) {
			return he.access(this, function (t) {
				return t === e ? he.text(this) : this.empty().append((this[0] && this[0].ownerDocument || Q).createTextNode(t))
			}, null, t, arguments.length)
		},
		append : function () {
			return this.domManip(arguments, function (t) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var e = f(this, t);
					e.appendChild(t)
				}
			})
		},
		prepend : function () {
			return this.domManip(arguments, function (t) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var e = f(this, t);
					e.insertBefore(t, e.firstChild)
				}
			})
		},
		before : function () {
			return this.domManip(arguments, function (t) {
				this.parentNode && this.parentNode.insertBefore(t, this)
			})
		},
		after : function () {
			return this.domManip(arguments, function (t) {
				this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
			})
		},
		remove : function (t, e) {
			for (var n, i = t ? he.filter(t, this) : this, s = 0; null != (n = i[s]); s++)
				e || 1 !== n.nodeType || he.cleanData(b(n)), n.parentNode && (e && he.contains(n.ownerDocument, n) && v(b(n, "script")), n.parentNode.removeChild(n));
			return this
		},
		empty : function () {
			for (var t, e = 0; null != (t = this[e]); e++) {
				for (1 === t.nodeType && he.cleanData(b(t, !1)); t.firstChild; )
					t.removeChild(t.firstChild);
				t.options && he.nodeName(t, "select") && (t.options.length = 0)
			}
			return this
		},
		clone : function (t, e) {
			return t = null == t ? !1 : t,
			e = null == e ? t : e,
			this.map(function () {
				return he.clone(this, t, e)
			})
		},
		html : function (t) {
			return he.access(this, function (t) {
				var n = this[0] || {},
				i = 0,
				s = this.length;
				if (t === e)
					return 1 === n.nodeType ? n.innerHTML.replace(Ye, "") : e;
				if (!("string" != typeof t || tn.test(t) || !he.support.htmlSerialize && Ue.test(t) || !he.support.leadingWhitespace && Ge.test(t) || an[(Ze.exec(t) || ["", ""])[1].toLowerCase()])) {
					t = t.replace(Qe, "<$1></$2>");
					try {
						for (; s > i; i++)
							n = this[i] || {},
						1 === n.nodeType && (he.cleanData(b(n, !1)), n.innerHTML = t);
						n = 0
					} catch (r) {}

				}
				n && this.empty().append(t)
			}, null, t, arguments.length)
		},
		replaceWith : function () {
			var t = he.map(this, function (t) {
					return [t.nextSibling, t.parentNode]
				}),
			e = 0;
			return this.domManip(arguments, function (n) {
				var i = t[e++],
				s = t[e++];
				s && (i && i.parentNode !== s && (i = this.nextSibling), he(this).remove(), s.insertBefore(n, i))
			}, !0),
			e ? this : this.remove()
		},
		detach : function (t) {
			return this.remove(t, !0)
		},
		domManip : function (t, e, n) {
			t = ie.apply([], t);
			var i,
			s,
			r,
			o,
			a,
			l,
			u = 0,
			h = this.length,
			c = this,
			p = h - 1,
			d = t[0],
			f = he.isFunction(d);
			if (f || !(1 >= h || "string" != typeof d || he.support.checkClone) && nn.test(d))
				return this.each(function (i) {
					var s = c.eq(i);
					f && (t[0] = d.call(this, i, s.html())),
					s.domManip(t, e, n)
				});
			if (h && (l = he.buildFragment(t, this[0].ownerDocument, !1, !n && this), i = l.firstChild, 1 === l.childNodes.length && (l = i), i)) {
				for (o = he.map(b(l, "script"), m), r = o.length; h > u; u++)
					s = l, u !== p && (s = he.clone(s, !0, !0), r && he.merge(o, b(s, "script"))), e.call(this[u], s, u);
				if (r)
					for (a = o[o.length - 1].ownerDocument, he.map(o, g), u = 0; r > u; u++)
						s = o[u], sn.test(s.type || "") && !he._data(s, "globalEval") && he.contains(a, s) && (s.src ? he._evalUrl(s.src) : he.globalEval((s.text || s.textContent || s.innerHTML || "").replace(on, "")));
				l = i = null
			}
			return this
		}
	}),
	he.each({
		appendTo : "append",
		prependTo : "prepend",
		insertBefore : "before",
		insertAfter : "after",
		replaceAll : "replaceWith"
	}, function (t, e) {
		he.fn[t] = function (t) {
			for (var n, i = 0, s = [], r = he(t), o = r.length - 1; o >= i; i++)
				n = i === o ? this : this.clone(!0), he(r[i])[e](n), se.apply(s, n.get());
			return this.pushStack(s)
		}
	}),
	he.extend({
		clone : function (t, e, n) {
			var i,
			s,
			r,
			o,
			a,
			l = he.contains(t.ownerDocument, t);
			if (he.support.html5Clone || he.isXMLDoc(t) || !Ue.test("<" + t.nodeName + ">") ? r = t.cloneNode(!0) : (un.innerHTML = t.outerHTML, un.removeChild(r = un.firstChild)), !(he.support.noCloneEvent && he.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || he.isXMLDoc(t)))
				for (i = b(r), a = b(t), o = 0; null != (s = a[o]); ++o)
					i[o] && y(s, i[o]);
			if (e)
				if (n)
					for (a = a || b(t), i = i || b(r), o = 0; null != (s = a[o]); o++)
						_(s, i[o]);
				else
					_(t, r);
			return i = b(r, "script"),
			i.length > 0 && v(i, !l && b(t, "script")),
			i = a = s = null,
			r
		},
		buildFragment : function (t, e, n, i) {
			for (var s, r, o, a, l, u, h, c = t.length, p = d(e), f = [], m = 0; c > m; m++)
				if (r = t[m], r || 0 === r)
					if ("object" === he.type(r))
						he.merge(f, r.nodeType ? [r] : r);
					else if (Je.test(r)) {
						for (a = a || p.appendChild(e.createElement("div")), l = (Ze.exec(r) || ["", ""])[1].toLowerCase(), h = an[l] || an._default, a.innerHTML = h[1] + r.replace(Qe, "<$1></$2>") + h[2], s = h[0]; s--; )
							a = a.lastChild;
						if (!he.support.leadingWhitespace && Ge.test(r) && f.push(e.createTextNode(Ge.exec(r)[0])), !he.support.tbody)
							for (r = "table" !== l || Ke.test(r) ? "<table>" !== h[1] || Ke.test(r) ? 0 : a : a.firstChild, s = r && r.childNodes.length; s--; )
								he.nodeName(u = r.childNodes[s], "tbody") && !u.childNodes.length && r.removeChild(u);
						for (he.merge(f, a.childNodes), a.textContent = ""; a.firstChild; )
							a.removeChild(a.firstChild);
						a = p.lastChild
					} else
						f.push(e.createTextNode(r));
			for (a && p.removeChild(a), he.support.appendChecked || he.grep(b(f, "input"), x), m = 0; r = f[m++]; )
				if ((!i || -1 === he.inArray(r, i)) && (o = he.contains(r.ownerDocument, r), a = b(p.appendChild(r), "script"), o && v(a), n))
					for (s = 0; r = a[s++]; )
						sn.test(r.type || "") && n.push(r);
			return a = null,
			p
		},
		cleanData : function (t, e) {
			for (var n, i, s, r, o = 0, a = he.expando, l = he.cache, u = he.support.deleteExpando, h = he.event.special; null != (n = t[o]); o++)
				if ((e || he.acceptData(n)) && (s = n[a], r = s && l[s])) {
					if (r.events)
						for (i in r.events)
							h[i] ? he.event.remove(n, i) : he.removeEvent(n, i, r.handle);
					l[s] && (delete l[s], u ? delete n[a] : typeof n.removeAttribute !== U ? n.removeAttribute(a) : n[a] = null, ee.push(s))
				}
		},
		_evalUrl : function (t) {
			return he.ajax({
				url : t,
				type : "GET",
				dataType : "script",
				async : !1,
				global : !1,
				"throws" : !0
			})
		}
	}),
	he.fn.extend({
		wrapAll : function (t) {
			if (he.isFunction(t))
				return this.each(function (e) {
					he(this).wrapAll(t.call(this, e))
				});
			if (this[0]) {
				var e = he(t, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && e.insertBefore(this[0]),
				e.map(function () {
					for (var t = this; t.firstChild && 1 === t.firstChild.nodeType; )
						t = t.firstChild;
					return t
				}).append(this)
			}
			return this
		},
		wrapInner : function (t) {
			return he.isFunction(t) ? this.each(function (e) {
				he(this).wrapInner(t.call(this, e))
			}) : this.each(function () {
				var e = he(this),
				n = e.contents();
				n.length ? n.wrapAll(t) : e.append(t)
			})
		},
		wrap : function (t) {
			var e = he.isFunction(t);
			return this.each(function (n) {
				he(this).wrapAll(e ? t.call(this, n) : t)
			})
		},
		unwrap : function () {
			return this.parent().each(function () {
				he.nodeName(this, "body") || he(this).replaceWith(this.childNodes)
			}).end()
		}
	});
	var hn,
	cn,
	pn,
	dn = /alpha\([^)]*\)/i,
	fn = /opacity\s*=\s*([^)]*)/,
	mn = /^(top|right|bottom|left)$/,
	gn = /^(none|table(?!-c[ea]).+)/,
	vn = /^margin/,
	_n = RegExp("^(" + ce + ")(.*)$", "i"),
	yn = RegExp("^(" + ce + ")(?!px)[a-z%]+$", "i"),
	bn = RegExp("^([+-])=(" + ce + ")", "i"),
	xn = {
		BODY : "block"
	},
	wn = {
		position : "absolute",
		visibility : "hidden",
		display : "block"
	},
	Tn = {
		letterSpacing : 0,
		fontWeight : 400
	},
	Cn = ["Top", "Right", "Bottom", "Left"],
	En = ["Webkit", "O", "Moz", "ms"];
	he.fn.extend({
		css : function (t, n) {
			return he.access(this, function (t, n, i) {
				var s,
				r,
				o = {},
				a = 0;
				if (he.isArray(n)) {
					for (r = cn(t), s = n.length; s > a; a++)
						o[n[a]] = he.css(t, n[a], !1, r);
					return o
				}
				return i !== e ? he.style(t, n, i) : he.css(t, n)
			}, t, n, arguments.length > 1)
		},
		show : function () {
			return C(this, !0)
		},
		hide : function () {
			return C(this)
		},
		toggle : function (t) {
			var e = "boolean" == typeof t;
			return this.each(function () {
				(e ? t : T(this)) ? he(this).show() : he(this).hide()
			})
		}
	}),
	he.extend({
		cssHooks : {
			opacity : {
				get : function (t, e) {
					if (e) {
						var n = pn(t, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber : {
			columnCount : !0,
			fillOpacity : !0,
			fontWeight : !0,
			lineHeight : !0,
			opacity : !0,
			orphans : !0,
			widows : !0,
			zIndex : !0,
			zoom : !0
		},
		cssProps : {
			"float" : he.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style : function (t, n, i, s) {
			if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
				var r,
				o,
				a,
				l = he.camelCase(n),
				u = t.style;
				if (n = he.cssProps[l] || (he.cssProps[l] = w(u, l)), a = he.cssHooks[n] || he.cssHooks[l], i === e)
					return a && "get" in a && (r = a.get(t, !1, s)) !== e ? r : u[n];
				if (o = typeof i, "string" === o && (r = bn.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(he.css(t, n)), o = "number"), !(null == i || "number" === o && isNaN(i) || ("number" !== o || he.cssNumber[l] || (i += "px"), he.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (u[n] = "inherit"), a && "set" in a && (i = a.set(t, i, s)) === e)))
					try {
						u[n] = i
					} catch (h) {}

			}
		},
		css : function (t, n, i, s) {
			var r,
			o,
			a,
			l = he.camelCase(n);
			return n = he.cssProps[l] || (he.cssProps[l] = w(t.style, l)),
			a = he.cssHooks[n] || he.cssHooks[l],
			a && "get" in a && (o = a.get(t, !0, i)),
			o === e && (o = pn(t, n, s)),
			"normal" === o && n in Tn && (o = Tn[n]),
			"" === i || i ? (r = parseFloat(o), i === !0 || he.isNumeric(r) ? r || 0 : o) : o
		}
	}),
	t.getComputedStyle ? (cn = function (e) {
		return t.getComputedStyle(e, null)
	}, pn = function (t, n, i) {
		var s,
		r,
		o,
		a = i || cn(t),
		l = a ? a.getPropertyValue(n) || a[n] : e,
		u = t.style;
		return a && ("" !== l || he.contains(t.ownerDocument, t) || (l = he.style(t, n)), yn.test(l) && vn.test(n) && (s = u.width, r = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = a.width, u.width = s, u.minWidth = r, u.maxWidth = o)),
		l
	}) : Q.documentElement.currentStyle && (cn = function (t) {
		return t.currentStyle
	}, pn = function (t, n, i) {
		var s,
		r,
		o,
		a = i || cn(t),
		l = a ? a[n] : e,
		u = t.style;
		return null == l && u && u[n] && (l = u[n]),
		yn.test(l) && !mn.test(n) && (s = u.left, r = t.runtimeStyle, o = r && r.left, o && (r.left = t.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = s, o && (r.left = o)),
		"" === l ? "auto" : l
	}),
	he.each(["height", "width"], function (t, n) {
		he.cssHooks[n] = {
			get : function (t, i, s) {
				return i ? 0 === t.offsetWidth && gn.test(he.css(t, "display")) ? he.swap(t, wn, function () {
					return N(t, n, s)
				}) : N(t, n, s) : e
			},
			set : function (t, e, i) {
				var s = i && cn(t);
				return E(t, e, i ? S(t, n, i, he.support.boxSizing && "border-box" === he.css(t, "boxSizing", !1, s), s) : 0)
			}
		}
	}),
	he.support.opacity || (he.cssHooks.opacity = {
			get : function (t, e) {
				return fn.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
			},
			set : function (t, e) {
				var n = t.style,
				i = t.currentStyle,
				s = he.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
				r = i && i.filter || n.filter || "";
				n.zoom = 1,
				(e >= 1 || "" === e) && "" === he.trim(r.replace(dn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = dn.test(r) ? r.replace(dn, s) : r + " " + s)
			}
		}),
	he(function () {
		he.support.reliableMarginRight || (he.cssHooks.marginRight = {
				get : function (t, n) {
					return n ? he.swap(t, {
						display : "inline-block"
					}, pn, [t, "marginRight"]) : e
				}
			}),
		!he.support.pixelPosition && he.fn.position && he.each(["top", "left"], function (t, n) {
			he.cssHooks[n] = {
				get : function (t, i) {
					return i ? (i = pn(t, n), yn.test(i) ? he(t).position()[n] + "px" : i) : e
				}
			}
		})
	}),
	he.expr && he.expr.filters && (he.expr.filters.hidden = function (t) {
		return 0 >= t.offsetWidth && 0 >= t.offsetHeight || !he.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || he.css(t, "display"))
	}, he.expr.filters.visible = function (t) {
		return !he.expr.filters.hidden(t)
	}),
	he.each({
		margin : "",
		padding : "",
		border : "Width"
	}, function (t, e) {
		he.cssHooks[t + e] = {
			expand : function (n) {
				for (var i = 0, s = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++)
					s[t + Cn[i] + e] = r[i] || r[i - 2] || r[0];
				return s
			}
		},
		vn.test(t) || (he.cssHooks[t + e].set = E)
	});
	var Sn = /%20/g,
	Nn = /\[\]$/,
	kn = /\r?\n/g,
	In = /^(?:submit|button|image|reset|file)$/i,
	Mn = /^(?:input|select|textarea|keygen)/i;
	he.fn.extend({
		serialize : function () {
			return he.param(this.serializeArray())
		},
		serializeArray : function () {
			return this.map(function () {
				var t = he.prop(this, "elements");
				return t ? he.makeArray(t) : this
			}).filter(function () {
				var t = this.type;
				return this.name && !he(this).is(":disabled") && Mn.test(this.nodeName) && !In.test(t) && (this.checked || !en.test(t))
			}).map(function (t, e) {
				var n = he(this).val();
				return null == n ? null : he.isArray(n) ? he.map(n, function (t) {
					return {
						name : e.name,
						value : t.replace(kn, "\r\n")
					}
				}) : {
					name : e.name,
					value : n.replace(kn, "\r\n")
				}
			}).get()
		}
	}),
	he.param = function (t, n) {
		var i,
		s = [],
		r = function (t, e) {
			e = he.isFunction(e) ? e() : null == e ? "" : e,
			s[s.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
		};
		if (n === e && (n = he.ajaxSettings && he.ajaxSettings.traditional), he.isArray(t) || t.jquery && !he.isPlainObject(t))
			he.each(t, function () {
				r(this.name, this.value)
			});
		else
			for (i in t)
				M(i, t[i], n, r);
		return s.join("&").replace(Sn, "+")
	},
	he.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
		he.fn[e] = function (t, n) {
			return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
		}
	}),
	he.fn.extend({
		hover : function (t, e) {
			return this.mouseenter(t).mouseleave(e || t)
		},
		bind : function (t, e, n) {
			return this.on(t, null, e, n)
		},
		unbind : function (t, e) {
			return this.off(t, null, e)
		},
		delegate : function (t, e, n, i) {
			return this.on(e, t, n, i)
		},
		undelegate : function (t, e, n) {
			return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
		}
	});
	var Pn,
	On,
	An = he.now(),
	Ln = /\?/,
	Dn = /#.*$/,
	Rn = /([?&])_=[^&]*/,
	Hn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
	Fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	$n = /^(?:GET|HEAD)$/,
	jn = /^\/\//,
	zn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
	Xn = he.fn.load,
	Bn = {},
	Vn = {},
	qn = "*/".concat("*");
	try {
		On = G.href
	} catch (Wn) {
		On = Q.createElement("a"),
		On.href = "",
		On = On.href
	}
	Pn = zn.exec(On.toLowerCase()) || [],
	he.fn.load = function (t, n, i) {
		if ("string" != typeof t && Xn)
			return Xn.apply(this, arguments);
		var s,
		r,
		o,
		a = this,
		l = t.indexOf(" ");
		return l >= 0 && (s = t.slice(l, t.length), t = t.slice(0, l)),
		he.isFunction(n) ? (i = n, n = e) : n && "object" == typeof n && (o = "POST"),
		a.length > 0 && he.ajax({
			url : t,
			type : o,
			dataType : "html",
			data : n
		}).done(function (t) {
			r = arguments,
			a.html(s ? he("<div>").append(he.parseHTML(t)).find(s) : t)
		}).complete(i && function (t, e) {
			a.each(i, r || [t.responseText, e, t])
		}),
		this
	},
	he.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
		he.fn[e] = function (t) {
			return this.on(e, t)
		}
	}),
	he.extend({
		active : 0,
		lastModified : {},
		etag : {},
		ajaxSettings : {
			url : On,
			type : "GET",
			isLocal : Fn.test(Pn[1]),
			global : !0,
			processData : !0,
			async : !0,
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			accepts : {
				"*" : qn,
				text : "text/plain",
				html : "text/html",
				xml : "application/xml, text/xml",
				json : "application/json, text/javascript"
			},
			contents : {
				xml : /xml/,
				html : /html/,
				json : /json/
			},
			responseFields : {
				xml : "responseXML",
				text : "responseText",
				json : "responseJSON"
			},
			converters : {
				"* text" : String,
				"text html" : !0,
				"text json" : he.parseJSON,
				"text xml" : he.parseXML
			},
			flatOptions : {
				url : !0,
				context : !0
			}
		},
		ajaxSetup : function (t, e) {
			return e ? A(A(t, he.ajaxSettings), e) : A(he.ajaxSettings, t)
		},
		ajaxPrefilter : P(Bn),
		ajaxTransport : P(Vn),
		ajax : function (t, n) {
			function i(t, n, i, s) {
				var r,
				c,
				_,
				y,
				x,
				T = n;
				2 !== b && (b = 2, l && clearTimeout(l), h = e, a = s || "", w.readyState = t > 0 ? 4 : 0, r = t >= 200 && 300 > t || 304 === t, i && (y = L(p, w, i)), y = D(p, y, w, r), r ? (p.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (he.lastModified[o] = x), x = w.getResponseHeader("etag"), x && (he.etag[o] = x)), 204 === t || "HEAD" === p.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = y.state, c = y.data, _ = y.error, r = !_)) : (_ = T, (t || !T) && (T = "error", 0 > t && (t = 0))), w.status = t, w.statusText = (n || T) + "", r ? m.resolveWith(d, [c, T, w]) : m.rejectWith(d, [w, T, _]), w.statusCode(v), v = e, u && f.trigger(r ? "ajaxSuccess" : "ajaxError", [w, p, r ? c : _]), g.fireWith(d, [w, T]), u && (f.trigger("ajaxComplete", [w, p]), --he.active || he.event.trigger("ajaxStop")))
			}
			"object" == typeof t && (n = t, t = e),
			n = n || {};
			var s,
			r,
			o,
			a,
			l,
			u,
			h,
			c,
			p = he.ajaxSetup({}, n),
			d = p.context || p,
			f = p.context && (d.nodeType || d.jquery) ? he(d) : he.event,
			m = he.Deferred(),
			g = he.Callbacks("once memory"),
			v = p.statusCode || {},
			_ = {},
			y = {},
			b = 0,
			x = "canceled",
			w = {
				readyState : 0,
				getResponseHeader : function (t) {
					var e;
					if (2 === b) {
						if (!c)
							for (c = {}; e = Hn.exec(a); )
								c[e[1].toLowerCase()] = e[2];
						e = c[t.toLowerCase()]
					}
					return null == e ? null : e
				},
				getAllResponseHeaders : function () {
					return 2 === b ? a : null
				},
				setRequestHeader : function (t, e) {
					var n = t.toLowerCase();
					return b || (t = y[n] = y[n] || t, _[t] = e),
					this
				},
				overrideMimeType : function (t) {
					return b || (p.mimeType = t),
					this
				},
				statusCode : function (t) {
					var e;
					if (t)
						if (2 > b)
							for (e in t)
								v[e] = [v[e], t[e]];
						else
							w.always(t[w.status]);
					return this
				},
				abort : function (t) {
					var e = t || x;
					return h && h.abort(e),
					i(0, e),
					this
				}
			};
			if (m.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, p.url = ((t || p.url || On) + "").replace(Dn, "").replace(jn, Pn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = he.trim(p.dataType || "*").toLowerCase().match(pe) || [""], null == p.crossDomain && (s = zn.exec(p.url.toLowerCase()), p.crossDomain = !(!s || s[1] === Pn[1] && s[2] === Pn[2] && (s[3] || ("http:" === s[1] ? "80" : "443")) === (Pn[3] || ("http:" === Pn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = he.param(p.data, p.traditional)), O(Bn, p, n, w), 2 === b)
				return w;
			u = p.global,
			u && 0 === he.active++ && he.event.trigger("ajaxStart"),
			p.type = p.type.toUpperCase(),
			p.hasContent = !$n.test(p.type),
			o = p.url,
			p.hasContent || (p.data && (o = p.url += (Ln.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = Rn.test(o) ? o.replace(Rn, "$1_=" + An++) : o + (Ln.test(o) ? "&" : "?") + "_=" + An++)),
			p.ifModified && (he.lastModified[o] && w.setRequestHeader("If-Modified-Since", he.lastModified[o]), he.etag[o] && w.setRequestHeader("If-None-Match", he.etag[o])),
			(p.data && p.hasContent && p.contentType !== !1 || n.contentType) && w.setRequestHeader("Content-Type", p.contentType),
			w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + qn + "; q=0.01" : "") : p.accepts["*"]);
			for (r in p.headers)
				w.setRequestHeader(r, p.headers[r]);
			if (p.beforeSend && (p.beforeSend.call(d, w, p) === !1 || 2 === b))
				return w.abort();
			x = "abort";
			for (r in {
				success : 1,
				error : 1,
				complete : 1
			})
				w[r](p[r]);
			if (h = O(Vn, p, n, w)) {
				w.readyState = 1,
				u && f.trigger("ajaxSend", [w, p]),
				p.async && p.timeout > 0 && (l = setTimeout(function () {
							w.abort("timeout")
						}, p.timeout));
				try {
					b = 1,
					h.send(_, i)
				} catch (T) {
					if (!(2 > b))
						throw T;
					i(-1, T)
				}
			} else
				i(-1, "No Transport");
			return w
		},
		getJSON : function (t, e, n) {
			return he.get(t, e, n, "json")
		},
		getScript : function (t, n) {
			return he.get(t, e, n, "script")
		}
	}),
	he.each(["get", "post"], function (t, n) {
		he[n] = function (t, i, s, r) {
			return he.isFunction(i) && (r = r || s, s = i, i = e),
			he.ajax({
				url : t,
				type : n,
				dataType : r,
				data : i,
				success : s
			})
		}
	}),
	he.ajaxSetup({
		accepts : {
			script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents : {
			script : /(?:java|ecma)script/
		},
		converters : {
			"text script" : function (t) {
				return he.globalEval(t),
				t
			}
		}
	}),
	he.ajaxPrefilter("script", function (t) {
		t.cache === e && (t.cache = !1),
		t.crossDomain && (t.type = "GET", t.global = !1)
	}),
	he.ajaxTransport("script", function (t) {
		if (t.crossDomain) {
			var n,
			i = Q.head || he("head")[0] || Q.documentElement;
			return {
				send : function (e, s) {
					n = Q.createElement("script"),
					n.async = !0,
					t.scriptCharset && (n.charset = t.scriptCharset),
					n.src = t.url,
					n.onload = n.onreadystatechange = function (t, e) {
						(e || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, e || s(200, "success"))
					},
					i.insertBefore(n, i.firstChild)
				},
				abort : function () {
					n && n.onload(e, !0)
				}
			}
		}
	});
	var Yn = [],
	Un = /(=)\?(?=&|$)|\?\?/;
	he.ajaxSetup({
		jsonp : "callback",
		jsonpCallback : function () {
			var t = Yn.pop() || he.expando + "_" + An++;
			return this[t] = !0,
			t
		}
	}),
	he.ajaxPrefilter("json jsonp", function (n, i, s) {
		var r,
		o,
		a,
		l = n.jsonp !== !1 && (Un.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Un.test(n.data) && "data");
		return l || "jsonp" === n.dataTypes[0] ? (r = n.jsonpCallback = he.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Un, "$1" + r) : n.jsonp !== !1 && (n.url += (Ln.test(n.url) ? "&" : "?") + n.jsonp + "=" + r), n.converters["script json"] = function () {
			return a || he.error(r + " was not called"),
			a[0]
		}, n.dataTypes[0] = "json", o = t[r], t[r] = function () {
			a = arguments
		}, s.always(function () {
				t[r] = o,
				n[r] && (n.jsonpCallback = i.jsonpCallback, Yn.push(r)),
				a && he.isFunction(o) && o(a[0]),
				a = o = e
			}), "script") : e
	});
	var Gn,
	Qn,
	Zn = 0,
	Kn = t.ActiveXObject && function () {
		var t;
		for (t in Gn)
			Gn[t](e, !0)
	};
	he.ajaxSettings.xhr = t.ActiveXObject ? function () {
		return !this.isLocal && R() || H()
	}
	 : R,
	Qn = he.ajaxSettings.xhr(),
	he.support.cors = !!Qn && "withCredentials" in Qn,
	Qn = he.support.ajax = !!Qn,
	Qn && he.ajaxTransport(function (n) {
		if (!n.crossDomain || he.support.cors) {
			var i;
			return {
				send : function (s, r) {
					var o,
					a,
					l = n.xhr();
					if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
						for (a in n.xhrFields)
							l[a] = n.xhrFields[a];
					n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType),
					n.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (a in s)
							l.setRequestHeader(a, s[a])
					} catch (u) {}

					l.send(n.hasContent && n.data || null),
					i = function (t, s) {
						var a,
						u,
						h,
						c;
						try {
							if (i && (s || 4 === l.readyState))
								if (i = e, o && (l.onreadystatechange = he.noop, Kn && delete Gn[o]), s)
									4 !== l.readyState && l.abort();
								else {
									c = {},
									a = l.status,
									u = l.getAllResponseHeaders(),
									"string" == typeof l.responseText && (c.text = l.responseText);
									try {
										h = l.statusText
									} catch (p) {
										h = ""
									}
									a || !n.isLocal || n.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
								}
						} catch (d) {
							s || r(-1, d)
						}
						c && r(a, h, c, u)
					},
					n.async ? 4 === l.readyState ? setTimeout(i) : (o = ++Zn, Kn && (Gn || (Gn = {}, he(t).unload(Kn)), Gn[o] = i), l.onreadystatechange = i) : i()
				},
				abort : function () {
					i && i(e, !0)
				}
			}
		}
	});
	var Jn,
	ti,
	ei = /^(?:toggle|show|hide)$/,
	ni = RegExp("^(?:([+-])=|)(" + ce + ")([a-z%]*)$", "i"),
	ii = /queueHooks$/,
	si = [X],
	ri = {
		"*" : [function (t, e) {
				var n = this.createTween(t, e),
				i = n.cur(),
				s = ni.exec(e),
				r = s && s[3] || (he.cssNumber[t] ? "" : "px"),
				o = (he.cssNumber[t] || "px" !== r && +i) && ni.exec(he.css(n.elem, t)),
				a = 1,
				l = 20;
				if (o && o[3] !== r) {
					r = r || o[3],
					s = s || [],
					o = +i || 1;
					do
						a = a || ".5", o /= a, he.style(n.elem, t, o + r);
					while (a !== (a = n.cur() / i) && 1 !== a && --l)
				}
				return s && (o = n.start = +o || +i || 0, n.unit = r, n.end = s[1] ? o + (s[1] + 1) * s[2] : +s[2]),
				n
			}
		]
	};
	he.Animation = he.extend(j, {
			tweener : function (t, e) {
				he.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
				for (var n, i = 0, s = t.length; s > i; i++)
					n = t[i], ri[n] = ri[n] || [], ri[n].unshift(e)
			},
			prefilter : function (t, e) {
				e ? si.unshift(t) : si.push(t)
			}
		}),
	he.Tween = B,
	B.prototype = {
		constructor : B,
		init : function (t, e, n, i, s, r) {
			this.elem = t,
			this.prop = n,
			this.easing = s || "swing",
			this.options = e,
			this.start = this.now = this.cur(),
			this.end = i,
			this.unit = r || (he.cssNumber[n] ? "" : "px")
		},
		cur : function () {
			var t = B.propHooks[this.prop];
			return t && t.get ? t.get(this) : B.propHooks._default.get(this)
		},
		run : function (t) {
			var e,
			n = B.propHooks[this.prop];
			return this.pos = e = this.options.duration ? he.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t,
			this.now = (this.end - this.start) * e + this.start,
			this.options.step && this.options.step.call(this.elem, this.now, this),
			n && n.set ? n.set(this) : B.propHooks._default.set(this),
			this
		}
	},
	B.prototype.init.prototype = B.prototype,
	B.propHooks = {
		_default : {
			get : function (t) {
				var e;
				return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = he.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
			},
			set : function (t) {
				he.fx.step[t.prop] ? he.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[he.cssProps[t.prop]] || he.cssHooks[t.prop]) ? he.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
			}
		}
	},
	B.propHooks.scrollTop = B.propHooks.scrollLeft = {
		set : function (t) {
			t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
		}
	},
	he.each(["toggle", "show", "hide"], function (t, e) {
		var n = he.fn[e];
		he.fn[e] = function (t, i, s) {
			return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(V(e, !0), t, i, s)
		}
	}),
	he.fn.extend({
		fadeTo : function (t, e, n, i) {
			return this.filter(T).css("opacity", 0).show().end().animate({
				opacity : e
			}, t, n, i)
		},
		animate : function (t, e, n, i) {
			var s = he.isEmptyObject(t),
			r = he.speed(e, n, i),
			o = function () {
				var e = j(this, he.extend({}, t), r);
				(s || he._data(this, "finish")) && e.stop(!0)
			};
			return o.finish = o,
			s || r.queue === !1 ? this.each(o) : this.queue(r.queue, o)
		},
		stop : function (t, n, i) {
			var s = function (t) {
				var e = t.stop;
				delete t.stop,
				e(i)
			};
			return "string" != typeof t && (i = n, n = t, t = e),
			n && t !== !1 && this.queue(t || "fx", []),
			this.each(function () {
				var e = !0,
				n = null != t && t + "queueHooks",
				r = he.timers,
				o = he._data(this);
				if (n)
					o[n] && o[n].stop && s(o[n]);
				else
					for (n in o)
						o[n] && o[n].stop && ii.test(n) && s(o[n]);
				for (n = r.length; n--; )
					r[n].elem !== this || null != t && r[n].queue !== t || (r[n].anim.stop(i), e = !1, r.splice(n, 1));
				(e || !i) && he.dequeue(this, t)
			})
		},
		finish : function (t) {
			return t !== !1 && (t = t || "fx"),
			this.each(function () {
				var e,
				n = he._data(this),
				i = n[t + "queue"],
				s = n[t + "queueHooks"],
				r = he.timers,
				o = i ? i.length : 0;
				for (n.finish = !0, he.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = r.length; e--; )
					r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1));
				for (e = 0; o > e; e++)
					i[e] && i[e].finish && i[e].finish.call(this);
				delete n.finish
			})
		}
	}),
	he.each({
		slideDown : V("show"),
		slideUp : V("hide"),
		slideToggle : V("toggle"),
		fadeIn : {
			opacity : "show"
		},
		fadeOut : {
			opacity : "hide"
		},
		fadeToggle : {
			opacity : "toggle"
		}
	}, function (t, e) {
		he.fn[t] = function (t, n, i) {
			return this.animate(e, t, n, i)
		}
	}),
	he.speed = function (t, e, n) {
		var i = t && "object" == typeof t ? he.extend({}, t) : {
			complete : n || !n && e || he.isFunction(t) && t,
			duration : t,
			easing : n && e || e && !he.isFunction(e) && e
		};
		return i.duration = he.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in he.fx.speeds ? he.fx.speeds[i.duration] : he.fx.speeds._default,
		(null == i.queue || i.queue === !0) && (i.queue = "fx"),
		i.old = i.complete,
		i.complete = function () {
			he.isFunction(i.old) && i.old.call(this),
			i.queue && he.dequeue(this, i.queue)
		},
		i
	},
	he.easing = {
		linear : function (t) {
			return t
		},
		swing : function (t) {
			return .5 - Math.cos(t * Math.PI) / 2
		}
	},
	he.timers = [],
	he.fx = B.prototype.init,
	he.fx.tick = function () {
		var t,
		n = he.timers,
		i = 0;
		for (Jn = he.now(); n.length > i; i++)
			t = n[i], t() || n[i] !== t || n.splice(i--, 1);
		n.length || he.fx.stop(),
		Jn = e
	},
	he.fx.timer = function (t) {
		t() && he.timers.push(t) && he.fx.start()
	},
	he.fx.interval = 13,
	he.fx.start = function () {
		ti || (ti = setInterval(he.fx.tick, he.fx.interval))
	},
	he.fx.stop = function () {
		clearInterval(ti),
		ti = null
	},
	he.fx.speeds = {
		slow : 600,
		fast : 200,
		_default : 400
	},
	he.fx.step = {},
	he.expr && he.expr.filters && (he.expr.filters.animated = function (t) {
		return he.grep(he.timers, function (e) {
			return t === e.elem
		}).length
	}),
	he.fn.offset = function (t) {
		if (arguments.length)
			return t === e ? this : this.each(function (e) {
				he.offset.setOffset(this, t, e)
			});
		var n,
		i,
		s = {
			top : 0,
			left : 0
		},
		r = this[0],
		o = r && r.ownerDocument;
		return o ? (n = o.documentElement, he.contains(n, r) ? (typeof r.getBoundingClientRect !== U && (s = r.getBoundingClientRect()), i = q(o), {
				top : s.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
				left : s.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
			}) : s) : void 0
	},
	he.offset = {
		setOffset : function (t, e, n) {
			var i = he.css(t, "position");
			"static" === i && (t.style.position = "relative");
			var s,
			r,
			o = he(t),
			a = o.offset(),
			l = he.css(t, "top"),
			u = he.css(t, "left"),
			h = ("absolute" === i || "fixed" === i) && he.inArray("auto", [l, u]) > -1,
			c = {},
			p = {};
			h ? (p = o.position(), s = p.top, r = p.left) : (s = parseFloat(l) || 0, r = parseFloat(u) || 0),
			he.isFunction(e) && (e = e.call(t, n, a)),
			null != e.top && (c.top = e.top - a.top + s),
			null != e.left && (c.left = e.left - a.left + r),
			"using" in e ? e.using.call(t, c) : o.css(c)
		}
	},
	he.fn.extend({
		position : function () {
			if (this[0]) {
				var t,
				e,
				n = {
					top : 0,
					left : 0
				},
				i = this[0];
				return "fixed" === he.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), he.nodeName(t[0], "html") || (n = t.offset()), n.top += he.css(t[0], "borderTopWidth", !0), n.left += he.css(t[0], "borderLeftWidth", !0)), {
					top : e.top - n.top - he.css(i, "marginTop", !0),
					left : e.left - n.left - he.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent : function () {
			return this.map(function () {
				for (var t = this.offsetParent || Z; t && !he.nodeName(t, "html") && "static" === he.css(t, "position"); )
					t = t.offsetParent;
				return t || Z
			})
		}
	}),
	he.each({
		scrollLeft : "pageXOffset",
		scrollTop : "pageYOffset"
	}, function (t, n) {
		var i = /Y/.test(n);
		he.fn[t] = function (s) {
			return he.access(this, function (t, s, r) {
				var o = q(t);
				return r === e ? o ? n in o ? o[n] : o.document.documentElement[s] : t[s] : (o ? o.scrollTo(i ? he(o).scrollLeft() : r, i ? r : he(o).scrollTop()) : t[s] = r, e)
			}, t, s, arguments.length, null)
		}
	}),
	he.each({
		Height : "height",
		Width : "width"
	}, function (t, n) {
		he.each({
			padding : "inner" + t,
			content : n,
			"" : "outer" + t
		}, function (i, s) {
			he.fn[s] = function (s, r) {
				var o = arguments.length && (i || "boolean" != typeof s),
				a = i || (s === !0 || r === !0 ? "margin" : "border");
				return he.access(this, function (n, i, s) {
					var r;
					return he.isWindow(n) ? n.document.documentElement["client" + t] : 9 === n.nodeType ? (r = n.documentElement, Math.max(n.body["scroll" + t], r["scroll" + t], n.body["offset" + t], r["offset" + t], r["client" + t])) : s === e ? he.css(n, i, a) : he.style(n, i, s, a)
				}, n, o ? s : e, o, null)
			}
		})
	}),
	he.fn.size = function () {
		return this.length
	},
	he.fn.andSelf = he.fn.addBack,
	"object" == typeof module && module && "object" == typeof module.exports ? module.exports = he : (t.jQuery = t.$ = he, "function" == typeof define && define.amd && define("jquery", [], function () {
				return he
			}))
}
(window), function (t, e) {
	function n(e, n) {
		var s,
		r,
		o,
		a = e.nodeName.toLowerCase();
		return "area" === a ? (s = e.parentNode, r = s.name, e.href && r && "map" === s.nodeName.toLowerCase() ? (o = t("img[usemap=#" + r + "]")[0], !!o && i(o)) : !1) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || n : n) && i(e)
	}
	function i(e) {
		return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function () {
			return "hidden" === t.css(this, "visibility")
		}).length
	}
	var s = 0,
	r = /^ui-id-\d+$/;
	t.ui = t.ui || {},
	t.extend(t.ui, {
		version : "1.10.3",
		keyCode : {
			BACKSPACE : 8,
			COMMA : 188,
			DELETE : 46,
			DOWN : 40,
			END : 35,
			ENTER : 13,
			ESCAPE : 27,
			HOME : 36,
			LEFT : 37,
			NUMPAD_ADD : 107,
			NUMPAD_DECIMAL : 110,
			NUMPAD_DIVIDE : 111,
			NUMPAD_ENTER : 108,
			NUMPAD_MULTIPLY : 106,
			NUMPAD_SUBTRACT : 109,
			PAGE_DOWN : 34,
			PAGE_UP : 33,
			PERIOD : 190,
			RIGHT : 39,
			SPACE : 32,
			TAB : 9,
			UP : 38
		}
	}),
	t.fn.extend({
		focus : function (e) {
			return function (n, i) {
				return "number" == typeof n ? this.each(function () {
					var e = this;
					setTimeout(function () {
						t(e).focus(),
						i && i.call(e)
					}, n)
				}) : e.apply(this, arguments)
			}
		}
		(t.fn.focus),
		scrollParent : function () {
			var e;
			return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
					return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
				}).eq(0) : this.parents().filter(function () {
					return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
				}).eq(0),
			/fixed/.test(this.css("position")) || !e.length ? t(document) : e
		},
		zIndex : function (n) {
			if (n !== e)
				return this.css("zIndex", n);
			if (this.length)
				for (var i, s, r = t(this[0]); r.length && r[0] !== document; ) {
					if (i = r.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(r.css("zIndex"), 10), !isNaN(s) && 0 !== s))
						return s;
					r = r.parent()
				}
			return 0
		},
		uniqueId : function () {
			return this.each(function () {
				this.id || (this.id = "ui-id-" + ++s)
			})
		},
		removeUniqueId : function () {
			return this.each(function () {
				r.test(this.id) && t(this).removeAttr("id")
			})
		}
	}),
	t.extend(t.expr[":"], {
		data : t.expr.createPseudo ? t.expr.createPseudo(function (e) {
			return function (n) {
				return !!t.data(n, e)
			}
		}) : function (e, n, i) {
			return !!t.data(e, i[3])
		},
		focusable : function (e) {
			return n(e, !isNaN(t.attr(e, "tabindex")))
		},
		tabbable : function (e) {
			var i = t.attr(e, "tabindex"),
			s = isNaN(i);
			return (s || i >= 0) && n(e, !s)
		}
	}),
	t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function (n, i) {
		function s(e, n, i, s) {
			return t.each(r, function () {
				n -= parseFloat(t.css(e, "padding" + this)) || 0,
				i && (n -= parseFloat(t.css(e, "border" + this + "Width")) || 0),
				s && (n -= parseFloat(t.css(e, "margin" + this)) || 0)
			}),
			n
		}
		var r = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
		o = i.toLowerCase(),
		a = {
			innerWidth : t.fn.innerWidth,
			innerHeight : t.fn.innerHeight,
			outerWidth : t.fn.outerWidth,
			outerHeight : t.fn.outerHeight
		};
		t.fn["inner" + i] = function (n) {
			return n === e ? a["inner" + i].call(this) : this.each(function () {
				t(this).css(o, s(this, n) + "px")
			})
		},
		t.fn["outer" + i] = function (e, n) {
			return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function () {
				t(this).css(o, s(this, e, !0, n) + "px")
			})
		}
	}),
	t.fn.addBack || (t.fn.addBack = function (t) {
		return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
	}),
	t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function (e) {
		return function (n) {
			return arguments.length ? e.call(this, t.camelCase(n)) : e.call(this)
		}
	}
		(t.fn.removeData)),
	t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
	t.support.selectstart = "onselectstart" in document.createElement("div"),
	t.fn.extend({
		disableSelection : function () {
			return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (t) {
				t.preventDefault()
			})
		},
		enableSelection : function () {
			return this.unbind(".ui-disableSelection")
		}
	}),
	t.extend(t.ui, {
		plugin : {
			add : function (e, n, i) {
				var s,
				r = t.ui[e].prototype;
				for (s in i)
					r.plugins[s] = r.plugins[s] || [], r.plugins[s].push([n, i[s]])
			},
			call : function (t, e, n) {
				var i,
				s = t.plugins[e];
				if (s && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)
					for (i = 0; s.length > i; i++)
						t.options[s[i][0]] && s[i][1].apply(t.element, n)
			}
		},
		hasScroll : function (e, n) {
			if ("hidden" === t(e).css("overflow"))
				return !1;
			var i = n && "left" === n ? "scrollLeft" : "scrollTop",
			s = !1;
			return e[i] > 0 ? !0 : (e[i] = 1, s = e[i] > 0, e[i] = 0, s)
		}
	})
}
(jQuery), function (t, e) {
	var n = 0,
	i = Array.prototype.slice,
	s = t.cleanData;
	t.cleanData = function (e) {
		for (var n, i = 0; null != (n = e[i]); i++)
			try {
				t(n).triggerHandler("remove")
			} catch (r) {}

		s(e)
	},
	t.widget = function (n, i, s) {
		var r,
		o,
		a,
		l,
		u = {},
		h = n.split(".")[0];
		n = n.split(".")[1],
		r = h + "-" + n,
		s || (s = i, i = t.Widget),
		t.expr[":"][r.toLowerCase()] = function (e) {
			return !!t.data(e, r)
		},
		t[h] = t[h] || {},
		o = t[h][n],
		a = t[h][n] = function (t, n) {
			return this._createWidget ? (arguments.length && this._createWidget(t, n), e) : new a(t, n)
		},
		t.extend(a, o, {
			version : s.version,
			_proto : t.extend({}, s),
			_childConstructors : []
		}),
		l = new i,
		l.options = t.widget.extend({}, l.options),
		t.each(s, function (n, s) {
			return t.isFunction(s) ? (u[n] = function () {
				var t = function () {
					return i.prototype[n].apply(this, arguments)
				},
				e = function (t) {
					return i.prototype[n].apply(this, t)
				};
				return function () {
					var n,
					i = this._super,
					r = this._superApply;
					return this._super = t,
					this._superApply = e,
					n = s.apply(this, arguments),
					this._super = i,
					this._superApply = r,
					n
				}
			}
				(), e) : (u[n] = s, e)
		}),
		a.prototype = t.widget.extend(l, {
				widgetEventPrefix : o ? l.widgetEventPrefix : n
			}, u, {
				constructor : a,
				namespace : h,
				widgetName : n,
				widgetFullName : r
			}),
		o ? (t.each(o._childConstructors, function (e, n) {
				var i = n.prototype;
				t.widget(i.namespace + "." + i.widgetName, a, n._proto)
			}), delete o._childConstructors) : i._childConstructors.push(a),
		t.widget.bridge(n, a)
	},
	t.widget.extend = function (n) {
		for (var s, r, o = i.call(arguments, 1), a = 0, l = o.length; l > a; a++)
			for (s in o[a])
				r = o[a][s], o[a].hasOwnProperty(s) && r !== e && (n[s] = t.isPlainObject(r) ? t.isPlainObject(n[s]) ? t.widget.extend({}, n[s], r) : t.widget.extend({}, r) : r);
		return n
	},
	t.widget.bridge = function (n, s) {
		var r = s.prototype.widgetFullName || n;
		t.fn[n] = function (o) {
			var a = "string" == typeof o,
			l = i.call(arguments, 1),
			u = this;
			return o = !a && l.length ? t.widget.extend.apply(null, [o].concat(l)) : o,
			a ? this.each(function () {
				var i,
				s = t.data(this, r);
				return s ? t.isFunction(s[o]) && "_" !== o.charAt(0) ? (i = s[o].apply(s, l), i !== s && i !== e ? (u = i && i.jquery ? u.pushStack(i.get()) : i, !1) : e) : t.error("no such method '" + o + "' for " + n + " widget instance") : t.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'")
			}) : this.each(function () {
				var e = t.data(this, r);
				e ? e.option(o || {})._init() : t.data(this, r, new s(o, this))
			}),
			u
		}
	},
	t.Widget = function () {},
	t.Widget._childConstructors = [],
	t.Widget.prototype = {
		widgetName : "widget",
		widgetEventPrefix : "",
		defaultElement : "<div>",
		options : {
			disabled : !1,
			create : null
		},
		_createWidget : function (e, i) {
			i = t(i || this.defaultElement || this)[0],
			this.element = t(i),
			this.uuid = n++,
			this.eventNamespace = "." + this.widgetName + this.uuid,
			this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e),
			this.bindings = t(),
			this.hoverable = t(),
			this.focusable = t(),
			i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
					remove : function (t) {
						t.target === i && this.destroy()
					}
				}), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
			this._create(),
			this._trigger("create", null, this._getCreateEventData()),
			this._init()
		},
		_getCreateOptions : t.noop,
		_getCreateEventData : t.noop,
		_create : t.noop,
		_init : t.noop,
		destroy : function () {
			this._destroy(),
			this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
			this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
			this.bindings.unbind(this.eventNamespace),
			this.hoverable.removeClass("ui-state-hover"),
			this.focusable.removeClass("ui-state-focus")
		},
		_destroy : t.noop,
		widget : function () {
			return this.element
		},
		option : function (n, i) {
			var s,
			r,
			o,
			a = n;
			if (0 === arguments.length)
				return t.widget.extend({}, this.options);
			if ("string" == typeof n)
				if (a = {}, s = n.split("."), n = s.shift(), s.length) {
					for (r = a[n] = t.widget.extend({}, this.options[n]), o = 0; s.length - 1 > o; o++)
						r[s[o]] = r[s[o]] || {},
					r = r[s[o]];
					if (n = s.pop(), i === e)
						return r[n] === e ? null : r[n];
					r[n] = i
				} else {
					if (i === e)
						return this.options[n] === e ? null : this.options[n];
					a[n] = i
				}
			return this._setOptions(a),
			this
		},
		_setOptions : function (t) {
			var e;
			for (e in t)
				this._setOption(e, t[e]);
			return this
		},
		_setOption : function (t, e) {
			return this.options[t] = e,
			"disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")),
			this
		},
		enable : function () {
			return this._setOption("disabled", !1)
		},
		disable : function () {
			return this._setOption("disabled", !0)
		},
		_on : function (n, i, s) {
			var r,
			o = this;
			"boolean" != typeof n && (s = i, i = n, n = !1),
			s ? (i = r = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, r = this.widget()),
			t.each(s, function (s, a) {
				function l() {
					return n || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : e
				}
				"string" != typeof a && (l.guid = a.guid = a.guid || l.guid || t.guid++);
				var u = s.match(/^(\w+)\s*(.*)$/),
				h = u[1] + o.eventNamespace,
				c = u[2];
				c ? r.delegate(c, h, l) : i.bind(h, l)
			})
		},
		_off : function (t, e) {
			e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
			t.unbind(e).undelegate(e)
		},
		_delay : function (t, e) {
			function n() {
				return ("string" == typeof t ? i[t] : t).apply(i, arguments)
			}
			var i = this;
			return setTimeout(n, e || 0)
		},
		_hoverable : function (e) {
			this.hoverable = this.hoverable.add(e),
			this._on(e, {
				mouseenter : function (e) {
					t(e.currentTarget).addClass("ui-state-hover")
				},
				mouseleave : function (e) {
					t(e.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable : function (e) {
			this.focusable = this.focusable.add(e),
			this._on(e, {
				focusin : function (e) {
					t(e.currentTarget).addClass("ui-state-focus")
				},
				focusout : function (e) {
					t(e.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger : function (e, n, i) {
			var s,
			r,
			o = this.options[e];
			if (i = i || {}, n = t.Event(n), n.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), n.target = this.element[0], r = n.originalEvent)
				for (s in r)
					s in n || (n[s] = r[s]);
			return this.element.trigger(n, i),
			!(t.isFunction(o) && o.apply(this.element[0], [n].concat(i)) === !1 || n.isDefaultPrevented())
		}
	},
	t.each({
		show : "fadeIn",
		hide : "fadeOut"
	}, function (e, n) {
		t.Widget.prototype["_" + e] = function (i, s, r) {
			"string" == typeof s && (s = {
					effect : s
				});
			var o,
			a = s ? s === !0 || "number" == typeof s ? n : s.effect || n : e;
			s = s || {},
			"number" == typeof s && (s = {
					duration : s
				}),
			o = !t.isEmptyObject(s),
			s.complete = r,
			s.delay && i.delay(s.delay),
			o && t.effects && t.effects.effect[a] ? i[e](s) : a !== e && i[a] ? i[a](s.duration, s.easing, r) : i.queue(function (n) {
				t(this)[e](),
				r && r.call(i[0]),
				n()
			})
		}
	})
}
(jQuery), function (t) {
	var e = !1;
	t(document).mouseup(function () {
		e = !1
	}),
	t.widget("ui.mouse", {
		version : "1.10.3",
		options : {
			cancel : "input,textarea,button,select,option",
			distance : 1,
			delay : 0
		},
		_mouseInit : function () {
			var e = this;
			this.element.bind("mousedown." + this.widgetName, function (t) {
				return e._mouseDown(t)
			}).bind("click." + this.widgetName, function (n) {
				return !0 === t.data(n.target, e.widgetName + ".preventClickEvent") ? (t.removeData(n.target, e.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1) : undefined
			}),
			this.started = !1
		},
		_mouseDestroy : function () {
			this.element.unbind("." + this.widgetName),
			this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown : function (n) {
			if (!e) {
				this._mouseStarted && this._mouseUp(n),
				this._mouseDownEvent = n;
				var i = this,
				s = 1 === n.which,
				r = "string" == typeof this.options.cancel && n.target.nodeName ? t(n.target).closest(this.options.cancel).length : !1;
				return s && !r && this._mouseCapture(n) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
								i.mouseDelayMet = !0
							}, this.options.delay)), this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(n) !== !1, !this._mouseStarted) ? (n.preventDefault(), !0) : (!0 === t.data(n.target, this.widgetName + ".preventClickEvent") && t.removeData(n.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
						return i._mouseMove(t)
					}, this._mouseUpDelegate = function (t) {
						return i._mouseUp(t)
					}, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), n.preventDefault(), e = !0, !0)) : !0
			}
		},
		_mouseMove : function (e) {
			return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
		},
		_mouseUp : function (e) {
			return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
			this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)),
			!1
		},
		_mouseDistanceMet : function (t) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
		},
		_mouseDelayMet : function () {
			return this.mouseDelayMet
		},
		_mouseStart : function () {},
		_mouseDrag : function () {},
		_mouseStop : function () {},
		_mouseCapture : function () {
			return !0
		}
	})
}

(jQuery), function (t) {
	var e = 5;
	t.widget("ui.slider", t.ui.mouse, {
		version : "1.10.3",
		widgetEventPrefix : "slide",
		options : {
			animate : !1,
			distance : 0,
			max : 100,
			min : 0,
			orientation : "horizontal",
			range : !1,
			step : 1,
			value : 0,
			values : null,
			change : null,
			slide : null,
			start : null,
			stop : null
		},
		_create : function () {
			this._keySliding = !1,
			this._mouseSliding = !1,
			this._animateOff = !0,
			this._handleIndex = null,
			this._detectOrientation(),
			this._mouseInit(),
			this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"),
			this._refresh(),
			this._setOption("disabled", this.options.disabled),
			this._animateOff = !1
		},
		_refresh : function () {
			this._createRange(),
			this._createHandles(),
			this._setupEvents(),
			this._refreshValue()
		},
		_createHandles : function () {
			var e,
			n,
			i = this.options,
			s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
			r = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
			o = [];
			for (n = i.values && i.values.length || 1, s.length > n && (s.slice(n).remove(), s = s.slice(0, n)), e = s.length; n > e; e++)
				o.push(r);
			this.handles = s.add(t(o.join("")).appendTo(this.element)),
			this.handle = this.handles.eq(0),
			this.handles.each(function (e) {
				t(this).data("ui-slider-handle-index", e)
			})
		},
		_createRange : function () {
			var e = this.options,
			n = "";
			e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
					left : "",
					bottom : ""
				}) : (this.range = t("<div></div>").appendTo(this.element), n = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(n + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : this.range = t([])
		},
		_setupEvents : function () {
			var t = this.handles.add(this.range).filter("a");
			this._off(t),
			this._on(t, this._handleEvents),
			this._hoverable(t),
			this._focusable(t)
		},
		_destroy : function () {
			this.handles.remove(),
			this.range.remove(),
			this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),
			this._mouseDestroy()
		},
		_mouseCapture : function (e) {
			var n,
			i,
			s,
			r,
			o,
			a,
			l,
			u,
			h = this,
			c = this.options;
			return c.disabled ? !1 : (this.elementSize = {
					width : this.element.outerWidth(),
					height : this.element.outerHeight()
				}, this.elementOffset = this.element.offset(), n = {
					x : e.pageX,
					y : e.pageY
				}, i = this._normValueFromMouse(n), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) {
					var n = Math.abs(i - h.values(e));
					(s > n || s === n && (e === h._lastChangedValue || h.values(e) === c.min)) && (s = n, r = t(this), o = e)
				}), a = this._start(e, o), a === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, r.addClass("ui-state-active").focus(), l = r.offset(), u = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = u ? {
						left : 0,
						top : 0
					}
					 : {
					left : e.pageX - l.left - r.width() / 2,
					top : e.pageY - l.top - r.height() / 2 - (parseInt(r.css("borderTopWidth"), 10) || 0) - (parseInt(r.css("borderBottomWidth"), 10) || 0) + (parseInt(r.css("marginTop"), 10) || 0)
				}, this.handles.hasClass("ui-state-hover") || this._slide(e, o, i), this._animateOff = !0, !0))
		},
		_mouseStart : function () {
			return !0
		},
		_mouseDrag : function (t) {
			var e = {
				x : t.pageX,
				y : t.pageY
			},
			n = this._normValueFromMouse(e);
			return this._slide(t, this._handleIndex, n),
			!1
		},
		_mouseStop : function (t) {
			return this.handles.removeClass("ui-state-active"),
			this._mouseSliding = !1,
			this._stop(t, this._handleIndex),
			this._change(t, this._handleIndex),
			this._handleIndex = null,
			this._clickOffset = null,
			this._animateOff = !1,
			!1
		},
		_detectOrientation : function () {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse : function (t) {
			var e,
			n,
			i,
			s,
			r;
			return "horizontal" === this.orientation ? (e = this.elementSize.width, n = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, n = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
			i = n / e,
			i > 1 && (i = 1),
			0 > i && (i = 0),
			"vertical" === this.orientation && (i = 1 - i),
			s = this._valueMax() - this._valueMin(),
			r = this._valueMin() + i * s,
			this._trimAlignValue(r)
		},
		_start : function (t, e) {
			var n = {
				handle : this.handles[e],
				value : this.value()
			};
			return this.options.values && this.options.values.length && (n.value = this.values(e), n.values = this.values()),
			this._trigger("start", t, n)
		},
		_slide : function (t, e, n) {
			var i,
			s,
			r;
			this.options.values && this.options.values.length ? (i = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && n > i || 1 === e && i > n) && (n = i), n !== this.values(e) && (s = this.values(), s[e] = n, r = this._trigger("slide", t, {
							handle : this.handles[e],
							value : n,
							values : s
						}), i = this.values(e ? 0 : 1), r !== !1 && this.values(e, n, !0))) : n !== this.value() && (r = this._trigger("slide", t, {
						handle : this.handles[e],
						value : n
					}), r !== !1 && this.value(n))
		},
		_stop : function (t, e) {
			var n = {
				handle : this.handles[e],
				value : this.value()
			};
			this.options.values && this.options.values.length && (n.value = this.values(e), n.values = this.values()),
			this._trigger("stop", t, n)
		},
		_change : function (t, e) {
			if (!this._keySliding && !this._mouseSliding) {
				var n = {
					handle : this.handles[e],
					value : this.value()
				};
				this.options.values && this.options.values.length && (n.value = this.values(e), n.values = this.values()),
				this._lastChangedValue = e,
				this._trigger("change", t, n)
			}
		},
		value : function (t) {
			return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), undefined) : this._value()
		},
		values : function (e, n) {
			var i,
			s,
			r;
			if (arguments.length > 1)
				return this.options.values[e] = this._trimAlignValue(n), this._refreshValue(), this._change(null, e), undefined;
			if (!arguments.length)
				return this._values();
			if (!t.isArray(arguments[0]))
				return this.options.values && this.options.values.length ? this._values(e) : this.value();
			for (i = this.options.values, s = arguments[0], r = 0; i.length > r; r += 1)
				i[r] = this._trimAlignValue(s[r]), this._change(null, r);
			this._refreshValue()
		},
		_setOption : function (e, n) {
			var i,
			s = 0;
			switch ("range" === e && this.options.range === !0 && ("min" === n ? (this.options.value = this._values(0), this.options.values = null) : "max" === n && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (s = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
			case "orientation":
				this._detectOrientation(),
				this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
				this._refreshValue();
				break;
			case "value":
				this._animateOff = !0,
				this._refreshValue(),
				this._change(null, 0),
				this._animateOff = !1;
				break;
			case "values":
				for (this._animateOff = !0, this._refreshValue(), i = 0; s > i; i += 1)
					this._change(null, i);
				this._animateOff = !1;
				break;
			case "min":
			case "max":
				this._animateOff = !0,
				this._refreshValue(),
				this._animateOff = !1;
				break;
			case "range":
				this._animateOff = !0,
				this._refresh(),
				this._animateOff = !1
			}
		},
		_value : function () {
			var t = this.options.value;
			return t = this._trimAlignValue(t)
		},
		_values : function (t) {
			var e,
			n,
			i;
			if (arguments.length)
				return e = this.options.values[t], e = this._trimAlignValue(e);
			if (this.options.values && this.options.values.length) {
				for (n = this.options.values.slice(), i = 0; n.length > i; i += 1)
					n[i] = this._trimAlignValue(n[i]);
				return n
			}
			return []
		},
		_trimAlignValue : function (t) {
			if (this._valueMin() >= t)
				return this._valueMin();
			if (t >= this._valueMax())
				return this._valueMax();
			var e = this.options.step > 0 ? this.options.step : 1,
			n = (t - this._valueMin()) % e,
			i = t - n;
			return 2 * Math.abs(n) >= e && (i += n > 0 ? e : -e),
			parseFloat(i.toFixed(5))
		},
		_valueMin : function () {
			return this.options.min
		},
		_valueMax : function () {
			return this.options.max
		},
		_refreshValue : function () {
			var e,
			n,
			i,
			s,
			r,
			o = this.options.range,
			a = this.options,
			l = this,
			u = this._animateOff ? !1 : a.animate,
			h = {};
			this.options.values && this.options.values.length ? this.handles.each(function (i) {
				n = 100 * ((l.values(i) - l._valueMin()) / (l._valueMax() - l._valueMin())),
				h["horizontal" === l.orientation ? "left" : "bottom"] = n + "%",
				t(this).stop(1, 1)[u ? "animate" : "css"](h, a.animate),
				l.options.range === !0 && ("horizontal" === l.orientation ? (0 === i && l.range.stop(1, 1)[u ? "animate" : "css"]({
							left : n + "%"
						}, a.animate), 1 === i && l.range[u ? "animate" : "css"]({
							width : n - e + "%"
						}, {
							queue : !1,
							duration : a.animate
						})) : (0 === i && l.range.stop(1, 1)[u ? "animate" : "css"]({
							bottom : n + "%"
						}, a.animate), 1 === i && l.range[u ? "animate" : "css"]({
							height : n - e + "%"
						}, {
							queue : !1,
							duration : a.animate
						}))),
				e = n
			}) : (i = this.value(), s = this._valueMin(), r = this._valueMax(), n = r !== s ? 100 * ((i - s) / (r - s)) : 0, h["horizontal" === this.orientation ? "left" : "bottom"] = n + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](h, a.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
					width : n + "%"
				}, a.animate), "max" === o && "horizontal" === this.orientation && this.range[u ? "animate" : "css"]({
					width : 100 - n + "%"
				}, {
					queue : !1,
					duration : a.animate
				}), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
					height : n + "%"
				}, a.animate), "max" === o && "vertical" === this.orientation && this.range[u ? "animate" : "css"]({
					height : 100 - n + "%"
				}, {
					queue : !1,
					duration : a.animate
				}))
		},
		_handleEvents : {
			keydown : function (n) {
				var i,
				s,
				r,
				o,
				a = t(n.target).data("ui-slider-handle-index");
				switch (n.keyCode) {
				case t.ui.keyCode.HOME:
				case t.ui.keyCode.END:
				case t.ui.keyCode.PAGE_UP:
				case t.ui.keyCode.PAGE_DOWN:
				case t.ui.keyCode.UP:
				case t.ui.keyCode.RIGHT:
				case t.ui.keyCode.DOWN:
				case t.ui.keyCode.LEFT:
					if (n.preventDefault(), !this._keySliding && (this._keySliding = !0, t(n.target).addClass("ui-state-active"), i = this._start(n, a), i === !1))
						return
				}
				switch (o = this.options.step, s = r = this.options.values && this.options.values.length ? this.values(a) : this.value(), n.keyCode) {
				case t.ui.keyCode.HOME:
					r = this._valueMin();
					break;
				case t.ui.keyCode.END:
					r = this._valueMax();
					break;
				case t.ui.keyCode.PAGE_UP:
					r = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / e);
					break;
				case t.ui.keyCode.PAGE_DOWN:
					r = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / e);
					break;
				case t.ui.keyCode.UP:
				case t.ui.keyCode.RIGHT:
					if (s === this._valueMax())
						return;
					r = this._trimAlignValue(s + o);
					break;
				case t.ui.keyCode.DOWN:
				case t.ui.keyCode.LEFT:
					if (s === this._valueMin())
						return;
					r = this._trimAlignValue(s - o)
				}
				this._slide(n, a, r)
			},
			click : function (t) {
				t.preventDefault()
			},
			keyup : function (e) {
				var n = t(e.target).data("ui-slider-handle-index");
				this._keySliding && (this._keySliding = !1, this._stop(e, n), this._change(e, n), t(e.target).removeClass("ui-state-active"))
			}
		}
	})
}


(window.jQuery || window.Zepto), function (t) {
	"use strict";
	function e() {}

	function n(t, e) {
		if (s)
			return e.indexOf(t);
		for (var n = e.length; n--; )
			if (e[n] === t)
				return n;
		return -1
	}
	var i = e.prototype,
	s = Array.prototype.indexOf ? !0 : !1;
	i._getEvents = function () {
		return this._events || (this._events = {})
	},
	i.getListeners = function (t) {
		var e,
		n,
		i = this._getEvents();
		if ("object" == typeof t) {
			e = {};
			for (n in i)
				i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
		} else
			e = i[t] || (i[t] = []);
		return e
	},
	i.getListenersAsObject = function (t) {
		var e,
		n = this.getListeners(t);
		return n instanceof Array && (e = {}, e[t] = n),
		e || n
	},
	i.addListener = function (t, e) {
		var i,
		s = this.getListenersAsObject(t);
		for (i in s)
			s.hasOwnProperty(i) && -1 === n(e, s[i]) && s[i].push(e);
		return this
	},
	i.on = i.addListener,
	i.defineEvent = function (t) {
		return this.getListeners(t),
		this
	},
	i.defineEvents = function (t) {
		for (var e = 0; t.length > e; e += 1)
			this.defineEvent(t[e]);
		return this
	},
	i.removeListener = function (t, e) {
		var i,
		s,
		r = this.getListenersAsObject(t);
		for (s in r)
			r.hasOwnProperty(s) && (i = n(e, r[s]), -1 !== i && r[s].splice(i, 1));
		return this
	},
	i.off = i.removeListener,
	i.addListeners = function (t, e) {
		return this.manipulateListeners(!1, t, e)
	},
	i.removeListeners = function (t, e) {
		return this.manipulateListeners(!0, t, e)
	},
	i.manipulateListeners = function (t, e, n) {
		var i,
		s,
		r = t ? this.removeListener : this.addListener,
		o = t ? this.removeListeners : this.addListeners;
		if ("object" != typeof e || e instanceof RegExp)
			for (i = n.length; i--; )
				r.call(this, e, n[i]);
		else
			for (i in e)
				e.hasOwnProperty(i) && (s = e[i]) && ("function" == typeof s ? r.call(this, i, s) : o.call(this, i, s));
		return this
	},
	i.removeEvent = function (t) {
		var e,
		n = typeof t,
		i = this._getEvents();
		if ("string" === n)
			delete i[t];
		else if ("object" === n)
			for (e in i)
				i.hasOwnProperty(e) && t.test(e) && delete i[e];
		else
			delete this._events;
		return this
	},
	i.emitEvent = function (t, e) {
		var n,
		i,
		s,
		r = this.getListenersAsObject(t);
		for (i in r)
			if (r.hasOwnProperty(i))
				for (n = r[i].length; n--; )
					s = e ? r[i][n].apply(null, e) : r[i][n](), s === !0 && this.removeListener(t, r[i][n]);
		return this
	},
	i.trigger = i.emitEvent,
	i.emit = function (t) {
		var e = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(t, e)
	},
	"function" == typeof define && define.amd ? define(function () {
		return e
	}) : t.EventEmitter = e
}

(this), function (t) {
	"use strict";
	function e(t, e) {
		for (var n in e)
			t[n] = e[n];
		return t
	}
	function n(t) {
		return "[object Array]" === l.call(t)
	}
	function i(t) {
		var e = [];
		if (n(t))
			e = t;
		else if ("number" == typeof t.length)
			for (var i = 0, s = t.length; s > i; i++)
				e.push(t[i]);
		else
			e.push(t);
		return e
	}
	function s(t, n) {
		function s(t, n, o) {
			if (!(this instanceof s))
				return new s(t, n);
			"string" == typeof t && (t = document.querySelectorAll(t)),
			this.elements = i(t),
			this.options = e({}, this.options),
			"function" == typeof n ? o = n : e(this.options, n),
			o && this.on("always", o),
			this.getImages(),
			r && (this.jqDeferred = new r.Deferred);
			var a = this;
			setTimeout(function () {
				a.check()
			})
		}
		function l(t) {
			this.img = t
		}
		s.prototype = new t,
		s.prototype.options = {},
		s.prototype.getImages = function () {
			this.images = [];
			for (var t = 0, e = this.elements.length; e > t; t++) {
				var n = this.elements[t];
				"IMG" === n.nodeName && this.addImage(n);
				for (var i = n.querySelectorAll("img"), s = 0, r = i.length; r > s; s++) {
					var o = i[s];
					this.addImage(o)
				}
			}
		},
		s.prototype.addImage = function (t) {
			var e = new l(t);
			this.images.push(e)
		},
		s.prototype.check = function () {
			function t(t, s) {
				return e.options.debug && a && o.log("confirm", t, s),
				e.progress(t),
				n++,
				n === i && e.complete(),
				!0
			}
			var e = this,
			n = 0,
			i = this.images.length;
			if (this.hasAnyBroken = !1, !i)
				return this.complete(), void 0;
			for (var s = 0; i > s; s++) {
				var r = this.images[s];
				r.on("confirm", t),
				r.check()
			}
		},
		s.prototype.progress = function (t) {
			this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
			this.emit("progress", this, t),
			this.jqDeferred && this.jqDeferred.notify(this, t)
		},
		s.prototype.complete = function () {
			var t = this.hasAnyBroken ? "fail" : "done";
			if (this.isComplete = !0, this.emit(t, this), this.emit("always", this), this.jqDeferred) {
				var e = this.hasAnyBroken ? "reject" : "resolve";
				this.jqDeferred[e](this)
			}
		},
		r && (r.fn.imagesLoaded = function (t, e) {
			var n = new s(this, t, e);
			return n.jqDeferred.promise(r(this))
		});
		var u = {};
		return l.prototype = new t,
		l.prototype.check = function () {
			var t = u[this.img.src];
			if (t)
				return this.useCached(t), void 0;
			if (u[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth)
				return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
			var e = this.proxyImage = new Image;
			n.bind(e, "load", this),
			n.bind(e, "error", this),
			e.src = this.img.src
		},
		l.prototype.useCached = function (t) {
			if (t.isConfirmed)
				this.confirm(t.isLoaded, "cached was confirmed");
			else {
				var e = this;
				t.on("confirm", function (t) {
					return e.confirm(t.isLoaded, "cache emitted confirmed"),
					!0
				})
			}
		},
		l.prototype.confirm = function (t, e) {
			this.isConfirmed = !0,
			this.isLoaded = t,
			this.emit("confirm", this, e)
		},
		l.prototype.handleEvent = function (t) {
			var e = "on" + t.type;
			this[e] && this[e](t)
		},
		l.prototype.onload = function () {
			this.confirm(!0, "onload"),
			this.unbindProxyEvents()
		},
		l.prototype.onerror = function () {
			this.confirm(!1, "onerror"),
			this.unbindProxyEvents()
		},
		l.prototype.unbindProxyEvents = function () {
			n.unbind(this.proxyImage, "load", this),
			n.unbind(this.proxyImage, "error", this)
		},
		s
	}
	var r = t.jQuery,
	o = t.console,
	a = o !== void 0,
	l = Object.prototype.toString;
	"function" == typeof define && define.amd ? define(["eventEmitter", "eventie"], s) : t.imagesLoaded = s(t.EventEmitter, t.eventie)
}
(window), function (t) {
	t.extend(t.ui.slider.prototype.options, {
		dragAnimate : !0
	});
	var e = t.ui.slider.prototype._mouseCapture;
	t.widget("ui.slider", t.extend({}, t.ui.slider.prototype, {
			_mouseCapture : function () {
				return e.apply(this, arguments),
				this._animateOff = this.options.dragAnimate ? !1 : !0,
				!0
			}
		}))
}

(jQuery), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("easing.Back", ["easing.Ease"], function (t) {
		var e,
		n,
		i = window.GreenSockGlobals || window,
		s = i.com.greensock,
		r = 2 * Math.PI,
		o = Math.PI / 2,
		a = s._class,
		l = function (e, n) {
			var i = a("easing." + e, function () {}, !0),
			s = i.prototype = new t;
			return s.constructor = i,
			s.getRatio = n,
			i
		},
		u = t.register || function () {},
		h = function (t, e, n, i) {
			var s = a("easing." + t, {
					easeOut : new e,
					easeIn : new n,
					easeInOut : new i
				}, !0);
			return u(s, t),
			s
		},
		c = function (e, n) {
			var i = a("easing." + e, function (t) {
					this._p1 = t || 0 === t ? t : 1.70158,
					this._p2 = 1.525 * this._p1
				}, !0),
			s = i.prototype = new t;
			return s.constructor = i,
			s.getRatio = n,
			s.config = function (t) {
				return new i(t)
			},
			i
		},
		p = h("Back", c("BackOut", function (t) {
					return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
				}), c("BackIn", function (t) {
					return t * t * ((this._p1 + 1) * t - this._p1)
				}), c("BackInOut", function (t) {
					return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
				})),
		d = a("easing.SlowMo", function (t, e, n) {
				e = e || 0 === e ? e : .7,
				null == t ? t = .7 : t > 1 && (t = 1),
				this._p = 1 !== t ? e : 0,
				this._p1 = (1 - t) / 2,
				this._p2 = t,
				this._p3 = this._p1 + this._p2,
				this._calcEnd = n === !0
			}, !0),
		f = d.prototype = new t;
		return f.constructor = d,
		f.getRatio = function (t) {
			var e = t + (.5 - t) * this._p;
			return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
		},
		d.ease = new d(.7, .7),
		f.config = d.config = function (t, e, n) {
			return new d(t, e, n)
		},
		e = a("easing.SteppedEase", function (t) {
				t = t || 1,
				this._p1 = 1 / t,
				this._p2 = t + 1
			}, !0),
		f = e.prototype = new t,
		f.constructor = e,
		f.getRatio = function (t) {
			return 0 > t ? t = 0 : t >= 1 && (t = .999999999),
			(this._p2 * t >> 0) * this._p1
		},
		f.config = e.config = function (t) {
			return new e(t)
		},
		h("Bounce", l("BounceOut", function (t) {
				return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
			}), l("BounceIn", function (t) {
				return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
			}), l("BounceInOut", function (t) {
				var e = .5 > t;
				return t = e ? 1 - 2 * t : 2 * t - 1,
				t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375,
				e ? .5 * (1 - t) : .5 * t + .5
			})),
		h("Circ", l("CircOut", function (t) {
				return Math.sqrt(1 - (t -= 1) * t)
			}), l("CircIn", function (t) {
				return  - (Math.sqrt(1 - t * t) - 1)
			}), l("CircInOut", function (t) {
				return 1 > (t *= 2) ?  - .5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
			})),
		n = function (e, n, i) {
			var s = a("easing." + e, function (t, e) {
					this._p1 = t || 1,
					this._p2 = e || i,
					this._p3 = this._p2 / r * (Math.asin(1 / this._p1) || 0)
				}, !0),
			o = s.prototype = new t;
			return o.constructor = s,
			o.getRatio = n,
			o.config = function (t, e) {
				return new s(t, e)
			},
			s
		},
		h("Elastic", n("ElasticOut", function (t) {
				return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * r / this._p2) + 1
			}, .3), n("ElasticIn", function (t) {
				return  - (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * r / this._p2))
			}, .3), n("ElasticInOut", function (t) {
				return 1 > (t *= 2) ?  - .5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * r / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * r / this._p2) + 1
			}, .45)),
		h("Expo", l("ExpoOut", function (t) {
				return 1 - Math.pow(2, -10 * t)
			}), l("ExpoIn", function (t) {
				return Math.pow(2, 10 * (t - 1)) - .001
			}), l("ExpoInOut", function (t) {
				return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
			})),
		h("Sine", l("SineOut", function (t) {
				return Math.sin(t * o)
			}), l("SineIn", function (t) {
				return -Math.cos(t * o) + 1
			}), l("SineInOut", function (t) {
				return  - .5 * (Math.cos(Math.PI * t) - 1)
			})),
		a("easing.EaseLookup", {
			find : function (e) {
				return t.map[e]
			}
		}, !0),
		u(i.SlowMo, "SlowMo", "ease,"),
		u(e, "SteppedEase", "ease,"),
		p
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	window._gsDefine("plugins.BezierPlugin", ["plugins.TweenPlugin"], function (t) {
		var e = function () {
			t.call(this, "bezier", -1),
			this._overwriteProps.pop(),
			this._func = {},
			this._round = {}
		},
		n = e.prototype = new t("bezier", 1),
		i = 180 / Math.PI,
		s = Math.PI / 180,
		r = [],
		o = [],
		a = [],
		l = {},
		u = function u(t, e, n, i) {
			this.a = t,
			this.b = e,
			this.c = n,
			this.d = i,
			this.da = i - t,
			this.ca = n - t,
			this.ba = e - t
		},
		h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
		c = e.bezierThrough = function (t, e, n, i, s, u) {
			var c,
			p,
			m,
			g,
			v,
			_,
			y,
			b,
			x = {},
			w = [],
			T = u || t[0];
			s = "string" == typeof s ? "," + s + "," : h,
			null == e && (e = 1);
			for (p in t[0])
				w.push(p);
			if (t.length > 1) {
				for (b = t[t.length - 1], y = !0, c = w.length; --c > -1; )
					if (p = w[c], Math.abs(T[p] - b[p]) > .05) {
						y = !1;
						break
					}
				y && (t = t.concat(), u && t.unshift(u), t.push(t[1]), u = t[t.length - 3])
			}
			for (r.length = o.length = a.length = 0, c = w.length; --c > -1; )
				p = w[c], l[p] = -1 !== s.indexOf("," + p + ","), x[p] = d(t, p, l[p], u);
			for (c = r.length; --c > -1; )
				r[c] = Math.sqrt(r[c]), o[c] = Math.sqrt(o[c]);
			if (!i) {
				for (c = w.length; --c > -1; )
					if (l[p])
						for (m = x[w[c]], _ = m.length - 1, g = 0; _ > g; g++)
							v = m[g + 1].da / o[g] + m[g].da / r[g], a[g] = (a[g] || 0) + v * v;
				for (c = a.length; --c > -1; )
					a[c] = Math.sqrt(a[c])
			}
			for (c = w.length, g = n ? 4 : 1; --c > -1; )
				p = w[c], m = x[p], f(m, e, n, i, l[p]), y && (m.splice(0, g), m.splice(m.length - g, g));
			return x
		},
		p = function (t, e, n) {
			e = e || "soft";
			var i,
			s,
			r,
			o,
			a,
			l,
			h,
			c,
			p,
			d,
			f,
			m = {},
			g = "cubic" === e ? 3 : 2,
			v = "soft" === e,
			_ = [];
			if (v && n && (t = [n].concat(t)), null == t || g + 1 > t.length)
				throw "invalid Bezier data";
			for (p in t[0])
				_.push(p);
			for (l = _.length; --l > -1; ) {
				for (p = _[l], m[p] = a = [], d = 0, c = t.length, h = 0; c > h; h++)
					i = null == n ? t[h][p] : "string" == typeof(f = t[h][p]) && "=" === f.charAt(1) ? n[p] + Number(f.charAt(0) + f.substr(2)) : Number(f), v && h > 1 && c - 1 > h && (a[d++] = (i + a[d - 2]) / 2), a[d++] = i;
				for (c = d - g + 1, d = 0, h = 0; c > h; h += g)
					i = a[h], s = a[h + 1], r = a[h + 2], o = 2 === g ? 0 : a[h + 3], a[d++] = f = 3 === g ? new u(i, s, r, o) : new u(i, (2 * s + i) / 3, (2 * s + r) / 3, r);
				a.length = d
			}
			return m
		},
		d = function (t, e, n, i) {
			var s,
			a,
			l,
			h,
			c,
			p,
			d = [];
			if (i)
				for (t = [i].concat(t), a = t.length; --a > -1; )
					"string" == typeof(p = t[a][e]) && "=" === p.charAt(1) && (t[a][e] = i[e] + Number(p.charAt(0) + p.substr(2)));
			if (s = t.length - 2, 0 > s)
				return d[0] = new u(t[0][e], 0, 0, t[-1 > s ? 0 : 1][e]), d;
			for (a = 0; s > a; a++)
				l = t[a][e], h = t[a + 1][e], d[a] = new u(l, 0, 0, h), n && (c = t[a + 2][e], r[a] = (r[a] || 0) + (h - l) * (h - l), o[a] = (o[a] || 0) + (c - h) * (c - h));
			return d[a] = new u(t[a][e], 0, 0, t[a + 1][e]),
			d
		},
		f = function (t, e, n, i, s) {
			var l,
			u,
			h,
			c,
			p,
			d,
			f,
			g,
			v,
			_,
			y,
			b,
			x,
			w = t.length - 1,
			T = 0,
			C = t[0].a;
			for (l = 0; w > l; l++)
				p = t[T], u = p.a, h = p.d, c = t[T + 1].d, s ? (y = r[l], b = o[l], x = .25 * (b + y) * e / (i ? .5 : a[l] || .5), d = h - (h - u) * (i ? .5 * e : x / y), f = h + (c - h) * (i ? .5 * e : x / b), g = h - (d + (f - d) * (3 * y / (y + b) + .5) / 4)) : (d = h - .5 * (h - u) * e, f = h + .5 * (c - h) * e, g = h - (d + f) / 2), d += g, f += g, p.c = v = d, p.b = 0 !== l ? C : C = p.a + .6 * (p.c - p.a), p.da = h - u, p.ca = v - u, p.ba = C - u, n ? (_ = m(u, C, v, h), t.splice(T, 1, _[0], _[1], _[2], _[3]), T += 4) : T++, C = f;
			p = t[T],
			p.b = C,
			p.c = C + .4 * (p.d - C),
			p.da = p.d - p.a,
			p.ca = p.c - p.a,
			p.ba = C - p.a,
			n && (_ = m(p.a, C, p.c, p.d), t.splice(T, 1, _[0], _[1], _[2], _[3]))
		},
		m = e.cubicToQuadratic = function (t, e, n, i) {
			var s = {
				a : t
			},
			r = {},
			o = {},
			a = {
				c : i
			},
			l = (t + e) / 2,
			u = (e + n) / 2,
			h = (n + i) / 2,
			c = (l + u) / 2,
			p = (u + h) / 2,
			d = (p - c) / 8;
			return s.b = l + (t - l) / 4,
			r.b = c + d,
			s.c = r.a = (s.b + r.b) / 2,
			r.c = o.a = (c + p) / 2,
			o.b = p - d,
			a.b = h + (i - h) / 4,
			o.c = a.a = (o.b + a.b) / 2,
			[s, r, o, a]
		},
		g = function (t, e) {
			e = e >> 0 || 6;
			var n,
			i,
			s,
			r,
			o = [],
			a = [],
			l = 0,
			u = 0,
			h = e - 1,
			c = [],
			p = [];
			for (n in t)
				v(t[n], o, e);
			for (s = o.length, i = 0; s > i; i++)
				l += Math.sqrt(o[i]), r = i % e, p[r] = l, r === h && (u += l, r = i / e >> 0, c[r] = p, a[r] = u, l = 0, p = []);
			return {
				length : u,
				lengths : a,
				segments : c
			}
		},
		v = function (t, e, n) {
			for (var i, s, r, o, a, l, u, h, c, p, d, f = 1 / n, m = t.length; --m > -1; )
				for (p = t[m], r = p.a, o = p.d - r, a = p.c - r, l = p.b - r, i = s = 0, h = 1; n >= h; h++)
					u = f * h, c = 1 - u, i = s - (s = (u * u * o + 3 * c * (u * a + c * l)) * u), d = m * n + h - 1, e[d] = (e[d] || 0) + i * i
		};
		return n.constructor = e,
		e.API = 2,
		e._autoCSS = !0,
		e.quadraticToCubic = function (t, e, n) {
			return new u(t, (2 * e + t) / 3, (2 * e + n) / 3, n)
		},
		e._cssRegister = function () {
			var t = (window.GreenSockGlobals || window).com.greensock.plugins.CSSPlugin;
			if (t) {
				var n = t._internals,
				i = n._parseToProxy,
				r = n._setPluginRatio,
				o = n.CSSPropTween;
				n._registerComplexSpecialProp("bezier", null, function (t, n, a, l, u, h) {
					n instanceof Array && (n = {
							values : n
						}),
					h = new e;
					var c,
					p,
					d,
					f = n.values,
					m = f.length - 1,
					g = [],
					v = {};
					if (0 > m)
						return u;
					for (c = 0; m >= c; c++)
						d = i(t, f[c], l, u, h, m !== c), g[c] = d.end;
					for (p in n)
						v[p] = n[p];
					return v.values = g,
					u = new o(t, "bezier", 0, 0, d.pt, 2),
					u.data = d,
					u.plugin = h,
					u.setRatio = r,
					0 === v.autoRotate && (v.autoRotate = !0),
					v.autoRotate && (v.autoRotate instanceof Array || (c = v.autoRotate === !0 ? 0 : Number(v.autoRotate) * s, v.autoRotate = null != d.end.left ? [["left", "top", "rotation", c, !0]] : null != d.end.x ? [["x", "y", "rotation", c, !0]] : !1)),
					v.autoRotate && (l._transform || l._enableTransforms(!1), d.autoRotate = l._target._gsTransform),
					h._onInitTween(d.proxy, v, l._tween),
					u
				})
			}
		},
		n._onInitTween = function (t, e, n) {
			this._target = t,
			e instanceof Array && (e = {
					values : e
				}),
			this._props = [],
			this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
			var i,
			s,
			r,
			o,
			a,
			l = e.values || [],
			u = {},
			h = l[0],
			d = e.autoRotate || n.vars.orientToBezier;
			this._autoRotate = d ? d instanceof Array ? d : [["x", "y", "rotation", d === !0 ? 0 : Number(d) || 0]] : null;
			for (i in h)
				this._props.push(i);
			for (r = this._props.length; --r > -1; )
				i = this._props[r], this._overwriteProps.push(i), s = this._func[i] = "function" == typeof t[i], u[i] = s ? t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]() : parseFloat(t[i]), a || u[i] !== l[0][i] && (a = u);
			if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? c(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : p(l, e.type, u), this._segCount = this._beziers[i].length, this._timeRes) {
				var f = g(this._beziers, this._timeRes);
				this._length = f.length,
				this._lengths = f.lengths,
				this._segments = f.segments,
				this._l1 = this._li = this._s1 = this._si = 0,
				this._l2 = this._lengths[0],
				this._curSeg = this._segments[0],
				this._s2 = this._curSeg[0],
				this._prec = 1 / this._curSeg.length
			}
			if (d = this._autoRotate)
				for (d[0]instanceof Array || (this._autoRotate = d = [d]), r = d.length; --r > -1; )
					for (o = 0; 3 > o; o++)
						i = d[r][o], this._func[i] = "function" == typeof t[i] ? t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)] : !1;
			return !0
		},
		n.setRatio = function (t) {
			var e,
			n,
			s,
			r,
			o,
			a,
			l,
			u,
			h,
			c,
			p = this._segCount,
			d = this._func,
			f = this._target;
			if (this._timeRes) {
				if (h = this._lengths, c = this._curSeg, t *= this._length, s = this._li, t > this._l2 && p - 1 > s) {
					for (u = p - 1; u > s && t >= (this._l2 = h[++s]); );
					this._l1 = h[s - 1],
					this._li = s,
					this._curSeg = c = this._segments[s],
					this._s2 = c[this._s1 = this._si = 0]
				} else if (this._l1 > t && s > 0) {
					for (; s > 0 && (this._l1 = h[--s]) >= t; );
					0 === s && this._l1 > t ? this._l1 = 0 : s++,
					this._l2 = h[s],
					this._li = s,
					this._curSeg = c = this._segments[s],
					this._s1 = c[(this._si = c.length - 1) - 1] || 0,
					this._s2 = c[this._si]
				}
				if (e = s, t -= this._l1, s = this._si, t > this._s2 && c.length - 1 > s) {
					for (u = c.length - 1; u > s && t >= (this._s2 = c[++s]); );
					this._s1 = c[s - 1],
					this._si = s
				} else if (this._s1 > t && s > 0) {
					for (; s > 0 && (this._s1 = c[--s]) >= t; );
					0 === s && this._s1 > t ? this._s1 = 0 : s++,
					this._s2 = c[s],
					this._si = s
				}
				a = (s + (t - this._s1) / (this._s2 - this._s1)) * this._prec
			} else
				e = 0 > t ? 0 : t >= 1 ? p - 1 : p * t >> 0, a = (t - e * (1 / p)) * p;
			for (n = 1 - a, s = this._props.length; --s > -1; )
				r = this._props[s], o = this._beziers[r][e], l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._round[r] && (l = l + (l > 0 ? .5 :  - .5) >> 0), d[r] ? f[r](l) : f[r] = l;
			if (this._autoRotate) {
				var m,
				g,
				v,
				_,
				y,
				b,
				x,
				w = this._autoRotate;
				for (s = w.length; --s > -1; )
					r = w[s][2], b = w[s][3] || 0, x = w[s][4] === !0 ? 1 : i, o = this._beziers[w[s][0]][e], m = this._beziers[w[s][1]][e], g = o.a + (o.b - o.a) * a, _ = o.b + (o.c - o.b) * a, g += (_ - g) * a, _ += (o.c + (o.d - o.c) * a - _) * a, v = m.a + (m.b - m.a) * a, y = m.b + (m.c - m.b) * a, v += (y - v) * a, y += (m.c + (m.d - m.c) * a - y) * a, l = Math.atan2(y - v, _ - g) * x + b, d[r] ? d[r].call(f, l) : f[r] = l
			}
		},
		n._roundProps = function (t, e) {
			for (var n = this._overwriteProps, i = n.length; --i > -1; )
				(t[n[i]] || t.bezier || t.bezierThrough) && (this._round[n[i]] = e)
		},
		n._kill = function (e) {
			var n,
			i,
			s = this._props;
			for (n in this._beziers)
				if (n in e)
					for (delete this._beziers[n], delete this._func[n], i = s.length; --i > -1; )
						s[i] === n && s.splice(i, 1);
			return t.prototype._kill.call(this, e)
		},
		t.activate([e]),
		e
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t) {
		var e,
		n,
		i,
		s,
		r = function () {
			t.call(this, "css"),
			this._overwriteProps.length = 0
		},
		o = {},
		a = r.prototype = new t("css");
		a.constructor = r,
		r.version = "1.8.4",
		r.API = 2,
		r.defaultTransformPerspective = 0,
		a = "px",
		r.suffixMap = {
			top : a,
			right : a,
			bottom : a,
			left : a,
			width : a,
			height : a,
			fontSize : a,
			padding : a,
			margin : a,
			perspective : a
		};
		var l,
		u,
		h,
		c,
		p,
		d,
		f = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
		m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
		g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
		v = /[^\d\-\.]/g,
		_ = /(?:\d|\-|\+|=|#|\.)*/g,
		y = /opacity *= *([^)]*)/,
		b = /opacity:([^;]*)/,
		x = /alpha\(opacity *=.+?\)/i,
		w = /([A-Z])/g,
		T = /-([a-z])/gi,
		C = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
		E = function (t, e) {
			return e.toUpperCase()
		},
		S = /(?:Left|Right|Width)/i,
		N = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
		k = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
		I = Math.PI / 180,
		M = 180 / Math.PI,
		P = {},
		O = document,
		A = O.createElement("div"),
		L = O.createElement("img"),
		D = r._internals = {
			_specialProps : o
		},
		R = navigator.userAgent,
		H = function () {
			var t,
			e = R.indexOf("Android"),
			n = O.createElement("div");
			return h = -1 !== R.indexOf("Safari") && -1 === R.indexOf("Chrome") && (-1 === e || Number(R.substr(e + 8, 1)) > 3),
			p = h && 6 > Number(R.substr(R.indexOf("Version/") + 8, 1)),
			c = -1 !== R.indexOf("Firefox"),
			/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(R),
			d = parseFloat(RegExp.$1),
			n.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>",
			t = n.getElementsByTagName("a")[0],
			t ? /^0.55/.test(t.style.opacity) : !1
		}
		(),
		F = function (t) {
			return y.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
		},
		$ = function (t) {
			window.console && console.log(t)
		},
		j = "",
		z = "",
		X = function (t, e) {
			e = e || A;
			var n,
			i,
			s = e.style;
			if (void 0 !== s[t])
				return t;
			for (t = t.charAt(0).toUpperCase() + t.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], i = 5; --i > -1 && void 0 === s[n[i] + t]; );
			return i >= 0 ? (z = 3 === i ? "ms" : n[i], j = "-" + z.toLowerCase() + "-", z + t) : null
		},
		B = O.defaultView ? O.defaultView.getComputedStyle : function () {},
		V = r.getStyle = function (t, e, n, i, s) {
			var r;
			return H || "opacity" !== e ? (!i && t.style[e] ? r = t.style[e] : (n = n || B(t, null)) ? (t = n.getPropertyValue(e.replace(w, "-$1").toLowerCase()), r = t || n.length ? t : n[e]) : t.currentStyle && (n = t.currentStyle, r = n[e]), null == s || r && "none" !== r && "auto" !== r && "auto auto" !== r ? r : s) : F(t)
		},
		q = function (t, e, n) {
			var i,
			s,
			r = {},
			o = t._gsOverwrittenClassNamePT;
			if (o && !n) {
				for (; o; )
					o.setRatio(0), o = o._next;
				t._gsOverwrittenClassNamePT = null
			}
			if (e = e || B(t, null))
				if (i = e.length)
					for (; --i > -1; )
						r[e[i].replace(T, E)] = e.getPropertyValue(e[i]);
				else
					for (i in e)
						r[i] = e[i];
			else if (e = t.currentStyle || t.style)
				for (i in e)
					r[i.replace(T, E)] = e[i];
			return H || (r.opacity = F(t)),
			s = ye(t, e, !1),
			r.rotation = s.rotation * M,
			r.skewX = s.skewX * M,
			r.scaleX = s.scaleX,
			r.scaleY = s.scaleY,
			r.x = s.x,
			r.y = s.y,
			_e && (r.z = s.z, r.rotationX = s.rotationX * M, r.rotationY = s.rotationY * M, r.scaleZ = s.scaleZ),
			r.filters && delete r.filters,
			r
		},
		W = function (t, e, n, i) {
			var s,
			r,
			o,
			a = {},
			l = t.style;
			for (r in n)
				"cssText" !== r && "length" !== r && isNaN(r) && e[r] !== (s = n[r]) && -1 === r.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (a[r] = "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[r] || "" === e[r].replace(v, "") ? s : 0, void 0 !== l[r] && (o = new ae(l, r, l[r], o)));
			if (i)
				for (r in i)
					"className" !== r && (a[r] = i[r]);
			return {
				difs : a,
				firstMPT : o
			}
		},
		Y = {
			width : ["Left", "Right"],
			height : ["Top", "Bottom"]
		},
		U = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
		G = function (t, e, n) {
			var i = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
			s = Y[e],
			r = s.length;
			for (n = n || B(t, null); --r > -1; )
				i -= parseFloat(V(t, "padding" + s[r], n, !0)) || 0, i -= parseFloat(V(t, "border" + s[r] + "Width", n, !0)) || 0;
			return i
		},
		Q = function (t, e, n, i, s) {
			if ("px" === i || !i)
				return n;
			if ("auto" === i || !n)
				return 0;
			var r,
			o = S.test(e),
			a = t,
			l = A.style,
			u = 0 > n;
			return u && (n = -n),
			"%" === i && -1 !== e.indexOf("border") ? r = n / 100 * (o ? t.clientWidth : t.clientHeight) : (l.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;", "%" !== i && "em" !== i && a.appendChild ? l[o ? "borderLeftWidth" : "borderTopWidth"] = n + i : (a = t.parentNode || O.body, l[o ? "width" : "height"] = n + i), a.appendChild(A), r = parseFloat(A[o ? "offsetWidth" : "offsetHeight"]), a.removeChild(A), 0 !== r || s || (r = Q(t, e, n, i, !0))),
			u ? -r : r
		},
		Z = function (t, e) {
			(null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
			var n = t.split(" "),
			i = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0],
			s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
			return null == s ? s = "0" : "center" === s && (s = "50%"),
			("center" === i || isNaN(parseFloat(i))) && (i = "50%"),
			e && (e.oxp = -1 !== i.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === i.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(i.replace(v, "")), e.oy = parseFloat(s.replace(v, ""))),
			i + " " + s + (n.length > 2 ? " " + n[2] : "")
		},
		K = function (t, e) {
			return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
		},
		J = function (t, e) {
			return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
		},
		te = function (t, e) {
			if (null == t)
				return e;
			var n = -1 === t.indexOf("rad") ? I : 1,
			i = "=" === t.charAt(1);
			return t = Number(t.replace(v, "")) * n,
			i ? t + e : t
		},
		ee = function (t, e) {
			var n = "number" == typeof t ? t * I : te(t, e),
			i = (n - e) % (2 * Math.PI);
			return i !== i % Math.PI && (i += Math.PI * (0 > i ? 2 : -2)),
			e + i
		},
		ne = {
			aqua : [0, 255, 255],
			lime : [0, 255, 0],
			silver : [192, 192, 192],
			black : [0, 0, 0],
			maroon : [128, 0, 0],
			teal : [0, 128, 128],
			blue : [0, 0, 255],
			navy : [0, 0, 128],
			white : [255, 255, 255],
			fuchsia : [255, 0, 255],
			olive : [128, 128, 0],
			yellow : [255, 255, 0],
			orange : [255, 165, 0],
			gray : [128, 128, 128],
			purple : [128, 0, 128],
			green : [0, 128, 0],
			red : [255, 0, 0],
			pink : [255, 192, 203],
			cyan : [0, 255, 255],
			transparent : [255, 255, 255, 0]
		},
		ie = function (t) {
			if (!t || "" === t)
				return ne.black;
			if (ne[t])
				return ne[t];
			if ("number" == typeof t)
				return [t >> 16, 255 & t >> 8, 255 & t];
			if ("#" === t.charAt(0)) {
				if (4 === t.length) {
					var e = t.charAt(1),
					n = t.charAt(2),
					i = t.charAt(3);
					t = "#" + e + e + n + n + i + i
				}
				return t = parseInt(t.substr(1), 16),
				[t >> 16, 255 & t >> 8, 255 & t]
			}
			return t = t.match(f) || ne.transparent,
			t[0] = Number(t[0]),
			t[1] = Number(t[1]),
			t[2] = Number(t[2]),
			t.length > 3 && (t[3] = Number(t[3])),
			t
		},
		se = "(?:\\b(?:(?:rgb|rgba)\\(.+?\\))|\\B#.+?\\b";
		for (a in ne)
			se += "|" + a + "\\b";
		se = RegExp(se + ")", "gi");
		var re = function (t, e, n) {
			if (null == t)
				return function (t) {
					return t
				};
			var i = e ? (t.match(se) || [""])[0] : "",
			s = t.split(i).join("").match(g) || [],
			r = t.substr(0, t.indexOf(s[0])),
			o = ")" === t.charAt(t.length - 1) ? ")" : "",
			a = -1 !== t.indexOf(" ") ? " " : ",",
			l = s.length,
			u = l > 0 ? s[0].replace(f, "") : "";
			return e ? function (t) {
				"number" == typeof t && (t += u);
				var e = (t.match(se) || [i])[0],
				h = t.split(e).join("").match(g) || [],
				c = h.length;
				if (l > c--)
					for (; l > ++c; )
						h[c] = n ? h[(c - 1) / 2 >> 0] : s[c];
				return r + h.join(a) + a + e + o
			}
			 : function (t) {
				"number" == typeof t && (t += u);
				var e = t.match(g) || [],
				i = e.length;
				if (l > i--)
					for (; l > ++i; )
						e[i] = n ? e[(i - 1) / 2 >> 0] : s[i];
				return r + e.join(a) + o
			}
		},
		oe = function (t) {
			return t = t.split(","),
			function (e, n, i, s, r, o, a) {
				var l,
				u = (n + "").split(" ");
				for (a = {}, l = 0; 4 > l; l++)
					a[t[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
				return s.parse(e, a, r, o)
			}
		},
		ae = (D._setPluginRatio = function (t) {
			this.plugin.setRatio(t);
			for (var e, n, i, s, r = this.data, o = r.proxy, a = r.firstMPT, l = 1e-6; a; )
				e = o[a.v], a.r ? e = e > 0 ? e + .5 >> 0 : e - .5 >> 0 : l > e && e > -l && (e = 0), a.t[a.p] = e, a = a._next;
			if (r.autoRotate && (r.autoRotate.rotation = o.rotation), 1 === t)
				for (a = r.firstMPT; a; ) {
					if (n = a.t, n.type) {
						if (1 === n.type) {
							for (s = n.xs0 + n.s + n.xs1, i = 1; n.l > i; i++)
								s += n["xn" + i] + n["xs" + (i + 1)];
							n.e = s
						}
					} else
						n.e = n.s + n.xs0;
					a = a._next
				}
		}, function (t, e, n, i, s) {
			this.t = t,
			this.p = e,
			this.v = n,
			this.r = s,
			i && (i._prev = this, this._next = i)
		}),
		le = (D._parseToProxy = function (t, e, n, i, s, r) {
			var o,
			a,
			l,
			u,
			h,
			c = i,
			p = {},
			d = {},
			f = n._transform,
			m = P;
			for (n._transform = null, P = e, i = h = n.parse(t, e, i, s), P = m, r && (n._transform = f, c && (c._prev = null, c._prev && (c._prev._next = null))); i && i !== c; ) {
				if (1 >= i.type && (a = i.p, d[a] = i.s + i.c, p[a] = i.s, r || (u = new ae(i, "s", a, u, i.r), i.c = 0), 1 === i.type))
					for (o = i.l; --o > 0; )
						l = "xn" + o, a = i.p + "_" + l, d[a] = i.data[l], p[a] = i[l], r || (u = new ae(i, l, a, u, i.rxp[l]));
				i = i._next
			}
			return {
				proxy : p,
				end : d,
				firstMPT : u,
				pt : h
			}
		}, D.CSSPropTween = function (t, n, i, r, o, a, l, u, h, c, p) {
			this.t = t,
			this.p = n,
			this.s = i,
			this.c = r,
			this.n = l || "css_" + n,
			t instanceof le || s.push(this.n),
			this.r = u,
			this.type = a || 0,
			h && (this.pr = h, e = !0),
			this.b = void 0 === c ? i : c,
			this.e = void 0 === p ? i + r : p,
			o && (this._next = o, o._prev = this)
		}),
		ue = r.parseComplex = function (t, e, n, i, s, r, o, a, u, h) {
			o = new le(t, e, 0, 0, o, h ? 2 : 1, null, !1, a, n, i);
			var c,
			p,
			d,
			g,
			v,
			_,
			y,
			b,
			x,
			w,
			T,
			C,
			E = n.split(", ").join(",").split(" "),
			S = (i + "").split(", ").join(",").split(" "),
			N = E.length,
			k = l !== !1;
			for (N !== S.length && (E = (r || "").split(" "), N = E.length), o.plugin = u, o.setRatio = h, c = 0; N > c; c++)
				if (g = E[c], v = S[c], b = parseFloat(g), b || 0 === b)
					o.appendXtra("", b, K(v, b), v.replace(m, ""), k && -1 !== v.indexOf("px"), !0);
				else if (s && ("#" === g.charAt(0) || 0 === g.indexOf("rgb") || ne[g]))
					g = ie(g), v = ie(v), x = g.length + v.length > 6, x && !H && 0 === v[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(S[c]).join("transparent")) : (H || (x = !1), o.appendXtra(x ? "rgba(" : "rgb(", g[0], v[0] - g[0], ",", !0, !0).appendXtra("", g[1], v[1] - g[1], ",", !0).appendXtra("", g[2], v[2] - g[2], x ? "," : ")", !0), x && (g = 4 > g.length ? 1 : g[3], o.appendXtra("", g, (4 > v.length ? 1 : v[3]) - g, ")", !1)));
				else if (_ = g.match(f)) {
					if (y = v.match(m), !y || y.length !== _.length)
						return o;
					for (d = 0, p = 0; _.length > p; p++)
						T = _[p], w = g.indexOf(T, d), o.appendXtra(g.substr(d, w - d), Number(T), K(y[p], T), "", k && "px" === g.substr(w + T.length, 2), 0 === p), d = w + T.length;
					o["xs" + o.l] += g.substr(d)
				} else
					o["xs" + o.l] += o.l ? " " + g : g;
			if (-1 !== i.indexOf("=") && o.data) {
				for (C = o.xs0 + o.data.s, c = 1; o.l > c; c++)
					C += o["xs" + c] + o.data["xn" + c];
				o.e = C + o["xs" + c]
			}
			return o.l || (o.type = -1, o.xs0 = o.e),
			o.xfirst || o
		},
		he = 9;
		for (a = le.prototype, a.l = a.pr = 0; --he > 0; )
			a["xn" + he] = 0, a["xs" + he] = "";
		a.xs0 = "",
		a._next = a._prev = a.xfirst = a.data = a.plugin = a.setRatio = a.rxp = null,
		a.appendXtra = function (t, e, n, i, s, r) {
			var o = this,
			a = o.l;
			return o["xs" + a] += r && a ? " " + t : t || "",
			n || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = i || "", a > 0 ? (o.data["xn" + a] = e + n, o.rxp["xn" + a] = s, o["xn" + a] = e, o.plugin || (o.xfirst = new le(o, "xn" + a, e, n, o.xfirst || o, 0, o.n, s, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
						s : e + n
					}, o.rxp = {}, o.s = e, o.c = n, o.r = s, o)) : (o["xs" + a] += e + (i || ""), o)
		};
		var ce = function (t, e, n, i, s, r, a) {
			this.p = i ? X(t) || t : t,
			o[t] = o[this.p] = this,
			this.format = r || re(e, s),
			n && (this.parse = n),
			this.clrs = s,
			this.dflt = e,
			this.pr = a || 0
		},
		pe = D._registerComplexSpecialProp = function (t, e, n, i, s, r, o) {
			for (var a, l = t.split(","), u = e instanceof Array ? e : [e], h = l.length; --h > -1; )
				a = new ce(l[h], u[h], n, i && 0 === h, s, r, o)
		},
		de = function (t) {
			if (!o[t]) {
				var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
				pe(t, null, function (t, n, i, s, r, a, l) {
					var u = (window.GreenSockGlobals || window).com.greensock.plugins[e];
					return u ? (u._cssRegister(), o[i].parse(t, n, i, s, r, a, l)) : ($("Error: " + e + " js file not loaded."), r)
				})
			}
		};
		a = ce.prototype,
		a.parseComplex = function (t, e, n, i, s, r) {
			return ue(t, this.p, e, n, this.clrs, this.dflt, i, this.pr, s, r)
		},
		a.parse = function (t, e, n, s, r, o) {
			return this.parseComplex(t.style, this.format(V(t, n, i, !1, this.dflt)), this.format(e), r, o)
		},
		r.registerSpecialProp = function (t, e, n) {
			pe(t, null, function (t, i, s, r, o, a) {
				var l = new le(t, s, 0, 0, o, 2, s, !1, n);
				return l.plugin = a,
				l.setRatio = e(t, i, r._tween, s),
				l
			}, !1, !1, null, n)
		};
		var fe = ["scaleX", "scaleY", "scaleZ", "x", "y", "z", "skewX", "rotation", "rotationX", "rotationY", "perspective"],
		me = X("transform"),
		ge = j + "transform",
		ve = X("transformOrigin"),
		_e = null !== X("perspective"),
		ye = function (t, e, n) {
			var i,
			s,
			o,
			a,
			l,
			u,
			h,
			c,
			p,
			d,
			f,
			m,
			g = n ? t._gsTransform || {
				skewY : 0
			}
			 : {
				skewY : 0
			},
			v = 0 > g.scaleX,
			_ = 2e-5,
			y = 1e5,
			b = -Math.PI + 1e-4,
			x = Math.PI - 1e-4,
			w = _e ? parseFloat(V(t, ve, e, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0;
			for (me ? i = V(t, ge, e, !0) : t.currentStyle && (i = t.currentStyle.filter.match(N), i = i && 4 === i.length ? i[0].substr(4) + "," + Number(i[2].substr(4)) + "," + Number(i[1].substr(4)) + "," + i[3].substr(4) + "," + (g ? g.x : 0) + "," + (g ? g.y : 0) : null), s = (i || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = s.length; --o > -1; )
				a = Number(s[o]), s[o] = (a * y + (0 > a ?  - .5 : .5) >> 0) / y;
			if (16 === s.length) {
				var T = s[8],
				C = s[9],
				E = s[10],
				S = s[12],
				k = s[13],
				I = s[14];
				if (g.zOrigin && (I = -g.zOrigin, S = T * I - s[12], k = C * I - s[13], I = E * I + g.zOrigin - s[14]), !n || S !== g.x || k !== g.y || I !== g.z) {
					var M,
					P,
					O,
					A,
					L,
					D,
					R,
					H,
					F = s[0],
					$ = s[1],
					j = s[2],
					z = s[3],
					X = s[4],
					B = s[5],
					q = s[6],
					W = s[7],
					Y = s[11],
					U = g.rotationX = Math.atan2(q, E),
					G = b > U || U > x;
					U && (L = Math.cos(-U), D = Math.sin(-U), M = X * L + T * D, P = B * L + C * D, O = q * L + E * D, A = W * L + Y * D, T = X * -D + T * L, C = B * -D + C * L, E = q * -D + E * L, Y = W * -D + Y * L, X = M, B = P, q = O),
					U = g.rotationY = Math.atan2(T, F),
					U && (R = b > U || U > x, L = Math.cos(-U), D = Math.sin(-U), M = F * L - T * D, P = $ * L - C * D, O = j * L - E * D, A = z * L - Y * D, C = $ * D + C * L, E = j * D + E * L, Y = z * D + Y * L, F = M, $ = P, j = O),
					U = g.rotation = Math.atan2($, B),
					U && (H = b > U || U > x, L = Math.cos(-U), D = Math.sin(-U), F = F * L + X * D, P = $ * L + B * D, B = $ * -D + B * L, q = j * -D + q * L, $ = P),
					H && G ? g.rotation = g.rotationX = 0 : H && R ? g.rotation = g.rotationY = 0 : R && G && (g.rotationY = g.rotationX = 0),
					g.scaleX = (Math.sqrt(F * F + $ * $) * y + .5 >> 0) / y,
					g.scaleY = (Math.sqrt(B * B + C * C) * y + .5 >> 0) / y,
					g.scaleZ = (Math.sqrt(q * q + E * E) * y + .5 >> 0) / y,
					g.skewX = 0,
					g.perspective = Y ? 1 / (0 > Y ? -Y : Y) : 0,
					g.x = S,
					g.y = k,
					g.z = I
				}
			} else if (!_e || 0 === s.length || g.x !== s[4] || g.y !== s[5] || !g.rotationX && !g.rotationY) {
				var Q = s.length >= 6,
				Z = Q ? s[0] : 1,
				K = s[1] || 0,
				J = s[2] || 0,
				te = Q ? s[3] : 1;
				g.x = s[4] || 0,
				g.y = s[5] || 0,
				l = Math.sqrt(Z * Z + K * K),
				u = Math.sqrt(te * te + J * J),
				h = Z || K ? Math.atan2(K, Z) : g.rotation || 0,
				c = J || te ? Math.atan2(J, te) + h : g.skewX || 0,
				p = l - Math.abs(g.scaleX || 0),
				d = u - Math.abs(g.scaleY || 0),
				Math.abs(c) > Math.PI / 2 && Math.abs(c) < 1.5 * Math.PI && (v ? (l *= -1, c += 0 >= h ? Math.PI : -Math.PI, h += 0 >= h ? Math.PI : -Math.PI) : (u *= -1, c += 0 >= c ? Math.PI : -Math.PI)),
				f = (h - g.rotation) % Math.PI,
				m = (c - g.skewX) % Math.PI,
				(void 0 === g.skewX || p > _ || -_ > p || d > _ || -_ > d || f > b && x > f && 0 !== f * y >> 0 || m > b && x > m && 0 !== m * y >> 0) && (g.scaleX = l, g.scaleY = u, g.rotation = h, g.skewX = c),
				_e && (g.rotationX = g.rotationY = g.z = 0, g.perspective = parseFloat(r.defaultTransformPerspective) || 0, g.scaleZ = 1)
			}
			g.zOrigin = w;
			for (o in g)
				_ > g[o] && g[o] > -_ && (g[o] = 0);
			return n && (t._gsTransform = g),
			g
		},
		be = function (t) {
			var e,
			n,
			i = this.data,
			s = -i.rotation,
			r = s + i.skewX,
			o = 1e5,
			a = (Math.cos(s) * i.scaleX * o >> 0) / o,
			l = (Math.sin(s) * i.scaleX * o >> 0) / o,
			u = (Math.sin(r) * -i.scaleY * o >> 0) / o,
			h = (Math.cos(r) * i.scaleY * o >> 0) / o,
			c = this.t.style,
			p = this.t.currentStyle;
			if (p) {
				n = l,
				l = -u,
				u = -n,
				e = p.filter,
				c.filter = "";
				var f,
				m,
				g = this.t.offsetWidth,
				v = this.t.offsetHeight,
				b = "absolute" !== p.position,
				x = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + u + ", M22=" + h,
				w = i.x,
				T = i.y;
				if (null != i.ox && (f = (i.oxp ? .01 * g * i.ox : i.ox) - g / 2, m = (i.oyp ? .01 * v * i.oy : i.oy) - v / 2, w += f - (f * a + m * l), T += m - (f * u + m * h)), b)
					f = g / 2, m = v / 2, x += ", Dx=" + (f - (f * a + m * l) + w) + ", Dy=" + (m - (f * u + m * h) + T) + ")";
				else {
					var C,
					E,
					S,
					N = 8 > d ? 1 : -1;
					for (f = i.ieOffsetX || 0, m = i.ieOffsetY || 0, i.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * v)) / 2 + w), i.ieOffsetY = Math.round((v - ((0 > h ? -h : h) * v + (0 > u ? -u : u) * g)) / 2 + T), he = 0; 4 > he; he++)
						E = U[he], C = p[E], n = -1 !== C.indexOf("px") ? parseFloat(C) : Q(this.t, E, parseFloat(C), C.replace(_, "")) || 0, S = n !== i[E] ? 2 > he ? -i.ieOffsetX : -i.ieOffsetY : 2 > he ? f - i.ieOffsetX : m - i.ieOffsetY, c[E] = (i[E] = Math.round(n - S * (0 === he || 2 === he ? 1 : N))) + "px";
					x += ", sizingMethod='auto expand')"
				}
				c.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(k, x) : x + " " + e,
				(0 === t || 1 === t) && 1 === a && 0 === l && 0 === u && 1 === h && (b && -1 === x.indexOf("Dx=0, Dy=0") || y.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(") && c.removeAttribute("filter"))
			}
		},
		xe = function () {
			var t,
			e,
			n,
			i,
			s,
			r,
			o,
			a,
			l,
			u = this.data,
			h = this.t.style,
			p = u.perspective,
			d = u.scaleX,
			f = 0,
			m = 0,
			g = 0,
			v = 0,
			_ = u.scaleY,
			y = 0,
			b = 0,
			x = 0,
			w = 0,
			T = u.scaleZ,
			C = 0,
			E = 0,
			S = 0,
			N = p ? -1 / p : 0,
			k = u.rotation,
			I = u.zOrigin,
			M = ",",
			P = 1e5;
			c && (o = V(this.t, "top", null, !1, "0"), a = parseFloat(o) || 0, l = o.substr((a + "").length), u._ffFix = !u._ffFix, h.top = (u._ffFix ? a + .05 : a - .05) + ("" === l ? "px" : l)),
			(k || u.skewX) && (n = d * Math.cos(k), i = _ * Math.sin(k), k -= u.skewX, f = d * -Math.sin(k), _ *= Math.cos(k), d = n, v = i),
			k = u.rotationY,
			k && (t = Math.cos(k), e = Math.sin(k), n = d * t, i = v * t, s = T * -e, r = N * -e, m = d * e, y = v * e, T *= t, N *= t, d = n, v = i, x = s, E = r),
			k = u.rotationX,
			k && (t = Math.cos(k), e = Math.sin(k), n = f * t + m * e, i = _ * t + y * e, s = w * t + T * e, r = S * t + N * e, m = f * -e + m * t, y = _ * -e + y * t, T = w * -e + T * t, N = S * -e + N * t, f = n, _ = i, w = s, S = r),
			I && (C -= I, g = m * C, b = y * C, C = T * C + I),
			g += u.x,
			b += u.y,
			C = ((C + u.z) * P >> 0) / P,
			h[me] = "matrix3d(" + (d * P >> 0) / P + M + (v * P >> 0) / P + M + (x * P >> 0) / P + M + (E * P >> 0) / P + M + (f * P >> 0) / P + M + (_ * P >> 0) / P + M + (w * P >> 0) / P + M + (S * P >> 0) / P + M + (m * P >> 0) / P + M + (y * P >> 0) / P + M + (T * P >> 0) / P + M + (N * P >> 0) / P + M + (g * P >> 0) / P + M + (b * P >> 0) / P + M + C + M + (p ? 1 + -C / p : 1) + ")"
		},
		we = function () {
			var t,
			e,
			n,
			i,
			s,
			r,
			o,
			a,
			l = this.data,
			u = this.t;
			c && (t = V(u, "top", null, !1, "0"), e = parseFloat(t) || 0, n = t.substr((e + "").length), l._ffFix = !l._ffFix, u.style.top = (l._ffFix ? e + .05 : e - .05) + ("" === n ? "px" : n)),
			l.rotation || l.skewX ? (i = l.rotation, s = i - l.skewX, r = 1e5, o = l.scaleX * r, a = l.scaleY * r, u.style[me] = "matrix(" + (Math.cos(i) * o >> 0) / r + "," + (Math.sin(i) * o >> 0) / r + "," + (Math.sin(s) * -a >> 0) / r + "," + (Math.cos(s) * a >> 0) / r + "," + l.x + "," + l.y + ")") : u.style[me] = "matrix(" + l.scaleX + ",0,0," + l.scaleY + "," + l.x + "," + l.y + ")"
		};
		pe("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective", null, function (t, e, n, s, r, o, a) {
			if (s._transform)
				return r;
			var l,
			u,
			h,
			c,
			p,
			d,
			f,
			m = s._transform = ye(t, i, !0),
			g = t.style,
			v = 1e-6,
			_ = fe.length,
			y = a;
			for ("string" == typeof y.transform && me ? (c = g.cssText, g[me] = y.transform, g.display = "block", l = ye(t, null, !1), g.cssText = c) : "object" == typeof y && (u = null != y.rotation ? y.rotation : null != y.rotationZ ? y.rotationZ : m.rotation * M, l = {
						scaleX : J(null != y.scaleX ? y.scaleX : y.scale, m.scaleX),
						scaleY : J(null != y.scaleY ? y.scaleY : y.scale, m.scaleY),
						scaleZ : J(null != y.scaleZ ? y.scaleZ : y.scale, m.scaleZ),
						x : J(y.x, m.x),
						y : J(y.y, m.y),
						z : J(y.z, m.z),
						perspective : J(y.transformPerspective, m.perspective)
					}, l.rotation = null != y.shortRotation || null != y.shortRotationZ ? ee(y.shortRotation || y.shortRotationZ || 0, m.rotation) : "number" == typeof u ? u * I : te(u, m.rotation), _e && (l.rotationX = null != y.shortRotationX ? ee(y.shortRotationX, m.rotationX) : "number" == typeof y.rotationX ? y.rotationX * I : te(y.rotationX, m.rotationX), l.rotationY = null != y.shortRotationY ? ee(y.shortRotationY, m.rotationY) : "number" == typeof y.rotationY ? y.rotationY * I : te(y.rotationY, m.rotationY), v > l.rotationX && l.rotationX > -v && (l.rotationX = 0), v > l.rotationY && l.rotationY > -v && (l.rotationY = 0)), l.skewX = null == y.skewX ? m.skewX : "number" == typeof y.skewX ? y.skewX * I : te(y.skewX, m.skewX), l.skewY = null == y.skewY ? m.skewY : "number" == typeof y.skewY ? y.skewY * I : te(y.skewY, m.skewY), (h = l.skewY - m.skewY) && (l.skewX += h, l.rotation += h), v > l.skewY && l.skewY > -v && (l.skewY = 0), v > l.skewX && l.skewX > -v && (l.skewX = 0), v > l.rotation && l.rotation > -v && (l.rotation = 0)), d = m.z || m.rotationX || m.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, d || null == y.scale || (l.scaleZ = 1); --_ > -1; )
				n = fe[_], p = l[n] - m[n], (p > v || -v > p || null != P[n]) && (f = !0, r = new le(m, n, m[n], p, r), r.xs0 = 0, r.plugin = o, s._overwriteProps.push(r.n));
			return p = y.transformOrigin,
			(p || _e && d && m.zOrigin) && (me ? (f = !0, p = (p || V(t, n, i, !1, "50% 50%")) + "", n = ve, r = new le(g, n, 0, 0, r, -1, "css_transformOrigin"), r.b = g[n], r.plugin = o, _e ? (c = m.zOrigin, p = p.split(" "), m.zOrigin = (p.length > 2 ? parseFloat(p[2]) : c) || 0, r.xs0 = r.e = g[n] = p[0] + " " + (p[1] || "50%") + " 0px", r = new le(m, "zOrigin", 0, 0, r, -1, r.n), r.b = c, r.xs0 = r.e = m.zOrigin) : r.xs0 = r.e = g[n] = p) : Z(p + "", m)),
			f && (s._transformType = d || 3 === this._transformType ? 3 : 2),
			r
		}, !0),
		pe("boxShadow", "0px 0px 0px 0px #999", function (t, e, n, s, r, o) {
			var a = -1 !== (e + "").indexOf("inset") ? " inset" : "";
			return this.parseComplex(t.style, this.format(V(t, this.p, i, !1, this.dflt)) + a, this.format(e) + a, r, o)
		}, !0, !0),
		pe("borderRadius", "0px", function (t, e, s, r, o) {
			e = this.format(e);
			var a,
			l,
			u,
			h,
			c,
			p,
			d,
			f,
			m,
			g,
			v,
			_,
			y,
			b,
			x,
			w,
			T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
			C = t.style;
			for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), a = e.split(" "), l = 0; T.length > l; l++)
				this.p.indexOf("border") && (T[l] = X(T[l])), c = h = V(t, T[l], i, !1, "0px"), -1 !== c.indexOf(" ") && (h = c.split(" "), c = h[0], h = h[1]), p = u = a[l], d = parseFloat(c), _ = c.substr((d + "").length), y = "=" === p.charAt(1), y ? (f = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), f *= parseFloat(p), v = p.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(p), v = p.substr((f + "").length)), "" === v && (v = n[s] || _), v !== _ && (b = Q(t, "borderLeft", d, _), x = Q(t, "borderTop", d, _), "%" === v ? (c = 100 * (b / m) + "%", h = 100 * (x / g) + "%") : "em" === v ? (w = Q(t, "borderLeft", 1, "em"), c = b / w + "em", h = x / w + "em") : (c = b + "px", h = x + "px"), y && (p = parseFloat(c) + f + v, u = parseFloat(h) + f + v)), o = ue(C, T[l], c + " " + h, p + " " + u, !1, "0px", o);
			return o
		}, !0, !1, re("0px 0px 0px 0px", !1, !0)),
		pe("backgroundPosition", "0 0", function (t, e, n, s, r, o) {
			var a,
			l,
			u,
			h,
			c,
			p,
			f = "background-position",
			m = i || B(t, null),
			g = this.format((m ? d ? m.getPropertyValue(f + "-x") + " " + m.getPropertyValue(f + "-y") : m.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
			v = this.format(e);
			if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (p = V(t, "backgroundImage").replace(C, ""), p && "none" !== p)) {
				for (a = g.split(" "), l = v.split(" "), L.setAttribute("src", p), u = 2; --u > -1; )
					g = a[u], h = -1 !== g.indexOf("%"), h !== (-1 !== l[u].indexOf("%")) && (c = 0 === u ? t.offsetWidth - L.width : t.offsetHeight - L.height, a[u] = h ? parseFloat(g) / 100 * c + "px" : 100 * (parseFloat(g) / c) + "%");
				g = a.join(" ")
			}
			return this.parseComplex(t.style, g, v, r, o)
		}, !1, !1, Z),
		pe("backgroundSize", "0 0", null, !1, !1, Z),
		pe("perspective", "0px", null, !0),
		pe("perspectiveOrigin", "50% 50%", null, !0),
		pe("transformStyle", "preserve-3d", null, !0),
		pe("backfaceVisibility", "visible", null, !0),
		pe("margin", null, oe("marginTop,marginRight,marginBottom,marginLeft")),
		pe("padding", null, oe("paddingTop,paddingRight,paddingBottom,paddingLeft")),
		pe("clip", "rect(0px,0px,0px,0px)"),
		pe("textShadow", "0px 0px 0px #999", null, !1, !0),
		pe("autoRound,strictUnits", null, function (t, e, n, i, s) {
			return s
		}),
		pe("border", "0px solid #000", function (t, e, n, s, r, o) {
			return this.parseComplex(t.style, this.format(V(t, "borderTopWidth", i, !1, "0px") + " " + V(t, "borderTopStyle", i, !1, "solid") + " " + V(t, "borderTopColor", i, !1, "#000")), this.format(e), r, o)
		}, !1, !0, function (t) {
			var e = t.split(" ");
			return e[0] + " " + (e[1] || "solid") + " " + (t.match(se) || ["#000"])[0]
		});
		var Te = function (t) {
			var e,
			n = this.t,
			i = n.filter,
			s = this.s + this.c * t >> 0;
			100 === s && (-1 === i.indexOf("atrix(") && -1 === i.indexOf("radient(") ? (n.removeAttribute("filter"), e = !V(this.data, "filter")) : (n.filter = i.replace(x, ""), e = !0)),
			e || (this.xn1 && (n.filter = i = i || "alpha(opacity=100)"), -1 === i.indexOf("opacity") ? n.filter += " alpha(opacity=" + s + ")" : n.filter = i.replace(y, "opacity=" + s))
		};
		pe("opacity,alpha,autoAlpha", "1", function (t, e, n, s, r, o) {
			var a,
			l = parseFloat(V(t, "opacity", i, !1, "1")),
			u = t.style;
			return e = parseFloat(e),
			"autoAlpha" === n && (a = V(t, "visibility", i), 1 === l && "hidden" === a && 0 !== e && (l = 0), r = new le(u, "visibility", 0, 0, r, -1, null, !1, 0, 0 !== l ? "visible" : "hidden", 0 === e ? "hidden" : "visible"), r.xs0 = "visible", s._overwriteProps.push(r.n)),
			H ? r = new le(u, "opacity", l, e - l, r) : (r = new le(u, "opacity", 100 * l, 100 * (e - l), r), r.xn1 = "autoAlpha" === n ? 1 : 0, u.zoom = 1, r.type = 2, r.b = "alpha(opacity=" + r.s + ")", r.e = "alpha(opacity=" + (r.s + r.c) + ")", r.data = t, r.plugin = o, r.setRatio = Te),
			r
		});
		var Ce = function (t) {
			if (1 === t || 0 === t) {
				this.t.className = 1 === t ? this.e : this.b;
				for (var e = this.data, n = this.t.style, i = n.removeProperty ? "removeProperty" : "removeAttribute"; e; )
					e.v ? n[e.p] = e.v : n[i](e.p.replace(w, "-$1").toLowerCase()), e = e._next
			} else
				this.t.className !== this.b && (this.t.className = this.b)
		};
		pe("className", null, function (t, n, s, r, o, a, l) {
			var u,
			h,
			c = t.className,
			p = t.style.cssText;
			return o = r._classNamePT = new le(t, s, 0, 0, o, 2),
			o.setRatio = Ce,
			o.pr = -11,
			e = !0,
			o.b = c,
			o.e = "=" !== n.charAt(1) ? n : "+" === n.charAt(0) ? c + " " + n.substr(2) : c.split(n.substr(2)).join(""),
			r._tween._duration && (h = q(t, i, !0), t.className = o.e, u = W(t, h, q(t), l), t.className = c, o.data = u.firstMPT, t.style.cssText = p, o = o.xfirst = r.parse(t, u.difs, o, a)),
			o
		});
		var Ee = function (t) {
			if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration)
				for (var e, n = "all" === this.e, i = this.t.style, s = n ? i.cssText.split(";") : this.e.split(","), r = i.removeProperty ? "removeProperty" : "removeAttribute", a = s.length, l = o.transform.parse; --a > -1; )
					e = s[a], n && (e = e.substr(0, e.indexOf(":")).split(" ").join("")), o[e] && (e = o[e].parse === l ? me : o[e].p), e && i[r](e.replace(w, "-$1").toLowerCase())
		};
		for (pe("clearProps", null, function (t, n, i, s, r) {
				return r = new le(t, i, 0, 0, r, 2),
				r.setRatio = Ee,
				r.e = n,
				r.pr = -10,
				r.data = s._tween,
				e = !0,
				r
			}), a = "bezier,throwProps,physicsProps,physics2D".split(","), he = a.length; he--; )
			de(a[he]);
		return a = r.prototype,
		a._firstPT = null,
		a._onInitTween = function (t, o, a) {
			if (!t.nodeType)
				return !1;
			this._target = t,
			this._tween = a,
			this._vars = o,
			l = o.autoRound,
			e = !1,
			n = o.suffixMap || r.suffixMap,
			i = B(t, ""),
			s = this._overwriteProps;
			var c,
			d,
			f,
			m,
			g,
			v,
			_,
			y,
			x,
			w = t.style;
			if (u && "" === w.zIndex && (c = V(t, "zIndex", i), ("auto" === c || "" === c) && (w.zIndex = 0)), "string" == typeof o && (m = w.cssText, c = q(t, i), w.cssText = m + ";" + o, c = W(t, c, q(t)).difs, !H && b.test(o) && (c.opacity = parseFloat(RegExp.$1)), o = c, w.cssText = m), this._firstPT = d = this.parse(t, o, null), this._transformType) {
				for (x = 3 === this._transformType, me ? h && (u = !0, "" === w.zIndex && (_ = V(t, "zIndex", i), ("auto" === _ || "" === _) && (w.zIndex = 0)), p && (w.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (x ? "visible" : "hidden"))) : w.zoom = 1, f = d; f && f._next; )
					f = f._next;
				y = new le(t, "transform", 0, 0, null, 2),
				this._linkCSSP(y, null, f),
				y.setRatio = x && _e ? xe : me ? we : be,
				y.data = this._transform || ye(t, i, !0),
				s.pop()
			}
			if (e) {
				for (; d; ) {
					for (v = d._next, f = m; f && f.pr > d.pr; )
						f = f._next;
					(d._prev = f ? f._prev : g) ? d._prev._next = d : m = d,
					(d._next = f) ? f._prev = d : g = d,
					d = v
				}
				this._firstPT = m
			}
			return !0
		},
		a.parse = function (t, e, s, r) {
			var a,
			u,
			h,
			c,
			p,
			d,
			f,
			m,
			g,
			v,
			_ = t.style;
			for (a in e)
				d = e[a], u = o[a], u ? s = u.parse(t, d, a, this, s, r, e) : (p = V(t, a, i) + "", g = "string" == typeof d, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || g && !d.indexOf("rgb") ? (g || (d = ie(d), d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), s = ue(_, a, p, d, !0, "transparent", s, 0, r)) : !g || -1 === d.indexOf(" ") && -1 === d.indexOf(",") ? (h = parseFloat(p), f = h || 0 === h ? p.substr((h + "").length) : "", ("" === p || "auto" === p) && ("width" === a || "height" === a ? (h = G(t, a, i), f = "px") : (h = "opacity" !== a ? 0 : 1, f = "")), v = g && "=" === d.charAt(1), v ? (c = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), c *= parseFloat(d), m = d.substr((c + "").length - (0 > c ? 1 : 0)) || "") : (c = parseFloat(d), m = g ? d.substr((c + "").length) || "" : ""), "" === m && (m = n[a] || f), d = c || 0 === c ? (v ? c + h : c) + m : e[a], f !== m && "" !== m && (c || 0 === c) && (h || 0 === h) && (h = Q(t, a, h, f), "%" === m ? (h /= Q(t, a, 100, "%") / 100, h > 100 && (h = 100), e.strictUnits !== !0 && (p = h + "%")) : "em" === m ? h /= Q(t, a, 1, "em") : (c = Q(t, a, c, m), m = "px"), v && (c || 0 === c) && (d = c + h + m)), v && (c += h), !h && 0 !== h || !c && 0 !== c ? d || "NaN" != d + "" && null != d ? (s = new le(_, a, c || h || 0, 0, s, -1, "css_" + a, !1, 0, p, d), s.xs0 = "display" === a && "none" === d ? p : d) : $("invalid " + a + " tween value. ") : (s = new le(_, a, h, c - h, s, 0, "css_" + a, l !== !1 && ("px" === m || "zIndex" === a), 0, p, d), s.xs0 = m)) : s = ue(_, a, p, d, !0, null, s, 0, r)), r && s && !s.plugin && (s.plugin = r);
			return s
		},
		a.setRatio = function (t) {
			var e,
			n,
			i,
			s = this._firstPT,
			r = 1e-6;
			if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
				if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
					for (; s; ) {
						if (e = s.c * t + s.s, s.r ? e = e > 0 ? e + .5 >> 0 : e - .5 >> 0 : r > e && e > -r && (e = 0), s.type)
							if (1 === s.type)
								if (i = s.l, 2 === i)
									s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;
								else if (3 === i)
									s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
								else if (4 === i)
									s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4;
								else if (5 === i)
									s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5;
								else {
									for (n = s.xs0 + e + s.xs1, i = 1; s.l > i; i++)
										n += s["xn" + i] + s["xs" + (i + 1)];
									s.t[s.p] = n
								}
							else  - 1 === s.type ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(t);
						else
							s.t[s.p] = e + s.xs0;
						s = s._next
					}
				else
					for (; s; )
						2 !== s.type ? s.t[s.p] = s.b : s.setRatio(t), s = s._next;
			else
				for (; s; )
					2 !== s.type ? s.t[s.p] = s.e : s.setRatio(t), s = s._next
		},
		a._enableTransforms = function (t) {
			this._transformType = t || 3 === this._transformType ? 3 : 2
		},
		a._linkCSSP = function (t, e, n, i) {
			return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), n ? n._next = t : i || null !== this._firstPT || (this._firstPT = t), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next), t._next = e, t._prev = n),
			t
		},
		a._kill = function (e) {
			var n,
			i,
			s,
			r = e,
			o = !1;
			if (e.css_autoAlpha || e.css_alpha) {
				r = {};
				for (i in e)
					r[i] = e[i];
				r.css_opacity = 1,
				r.css_autoAlpha && (r.css_visibility = 1)
			}
			return e.css_className && (n = this._classNamePT) && (s = n.xfirst, s && s._prev ? this._linkCSSP(s._prev, n._next, s._prev._prev) : s === this._firstPT && (this._firstPT = null), n._next && this._linkCSSP(n._next, n._next._next, s._prev), this._target._gsOverwrittenClassNamePT = this._linkCSSP(n, this._target._gsOverwrittenClassNamePT), this._classNamePT = null, o = !0),
			t.prototype._kill.call(this, r) || o
		},
		t.activate([r]),
		r
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("plugins.CSSRulePlugin", ["plugins.TweenPlugin", "TweenLite", "plugins.CSSPlugin"], function (t, e, n) {
		var i = function () {
			t.call(this, "cssRule"),
			this._overwriteProps.length = 0
		},
		s = window.document,
		r = n.prototype.setRatio,
		o = i.prototype = new n;
		return o._propName = "cssRule",
		o.constructor = i,
		i.API = 2,
		i.getRule = function (t) {
			var e,
			n,
			i,
			r,
			o = s.all ? "rules" : "cssRules",
			a = s.styleSheets,
			l = a.length,
			u = ":" === t.charAt(0);
			for (t = (u ? "" : ",") + t.toLowerCase() + ",", u && (r = []); --l > -1; )
				for (n = a[l][o], e = n.length; --e > -1; )
					if (i = n[e], i.selectorText && -1 !== ("," + i.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(t)) {
						if (!u)
							return i.style;
						r.push(i.style)
					}
			return r
		},
		o._onInitTween = function (t, e, i) {
			if (void 0 === t.cssText)
				return !1;
			var r = s.createElement("div");
			return this._ss = t,
			this._proxy = r.style,
			r.style.cssText = t.cssText,
			n.prototype._onInitTween.call(this, r, e, i),
			!0
		},
		o.setRatio = function (t) {
			r.call(this, t),
			this._ss.cssText = this._proxy.cssText
		},
		t.activate([i]),
		i
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("plugins.ColorPropsPlugin", ["plugins.TweenPlugin"], function (t) {
		var e = function () {
			t.call(this, "colorProps", -1),
			this._overwriteProps.pop()
		},
		n = e.prototype = new t("colorProps", -1),
		i = /(\d|\.)+/g,
		s = function (t) {
			return "" === t || null == t || "none" === t ? r.transparent : r[t] ? r[t] : "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : "#" === t.charAt(0) ? (4 === t.length && (t = "#" + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2) + t.charAt(3) + t.charAt(3)), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : t.match(i) || r.transparent
		},
		r = {
			aqua : [0, 255, 255],
			lime : [0, 255, 0],
			silver : [192, 192, 192],
			black : [0, 0, 0],
			maroon : [128, 0, 0],
			teal : [0, 128, 128],
			blue : [0, 0, 255],
			navy : [0, 0, 128],
			white : [255, 255, 255],
			fuchsia : [255, 0, 255],
			olive : [128, 128, 0],
			yellow : [255, 255, 0],
			orange : [255, 165, 0],
			gray : [128, 128, 128],
			purple : [128, 0, 128],
			green : [0, 128, 0],
			red : [255, 0, 0],
			pink : [255, 192, 203],
			cyan : [0, 255, 255],
			transparent : [255, 255, 255, 0]
		};
		return n.constructor = e,
		e.API = 2,
		n._onInitTween = function (t, e) {
			this._target = t;
			var n,
			i,
			r,
			o;
			for (n in e)
				r = s(e[n]), this._firstPT = o = {
					_next : this._firstPT,
					p : n,
					f : "function" == typeof t[n],
					n : n,
					r : !1
				},
			i = s(o.f ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : t[n]),
			o.s = Number(i[0]),
			o.c = Number(r[0]) - o.s,
			o.gs = Number(i[1]),
			o.gc = Number(r[1]) - o.gs,
			o.bs = Number(i[2]),
			o.bc = Number(r[2]) - o.bs,
			(o.rgba = i.length > 3 || r.length > 3) && (o.as = 4 > i.length ? 1 : Number(i[3]), o.ac = (4 > r.length ? 1 : Number(r[3])) - o.as),
			o._next && (o._next._prev = o);
			return !0
		},
		n.setRatio = function (t) {
			for (var e, n = this._firstPT; n; )
				e = (n.rgba ? "rgba(" : "rgb(") + (n.s + t * n.c >> 0) + ", " + (n.gs + t * n.gc >> 0) + ", " + (n.bs + t * n.bc >> 0) + (n.rgba ? ", " + (n.as + t * n.ac) : "") + ")", n.f ? this._target[n.p](e) : this._target[n.p] = e, n = n._next
		},
		t.activate([e]),
		e
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("plugins.EaselPlugin", ["plugins.TweenPlugin"], function (t) {
		var e,
		n,
		i = function () {
			t.call(this, "easel", -1),
			this._overwriteProps.pop()
		},
		s = i.prototype = new t("easel", -1),
		r = /(\d|\.)+/g,
		o = ["redMultiplier", "greenMultiplier", "blueMultiplier", "alphaMultiplier", "redOffset", "greenOffset", "blueOffset", "alphaOffset"],
		a = function (t, n, i) {
			if (!e && (e = window.ColorFilter || window.createjs.ColorFilter, !e))
				throw "EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.";
			for (var s, r, a, l, u, h = t.filters || [], c = h.length; --c > -1; )
				if (h[c]instanceof e) {
					r = h[c];
					break
				}
			if (r || (r = new e, h.push(r), t.filters = h), a = r.clone(), null != n.tint)
				s = _(n.tint), l = null != n.tintAmount ? Number(n.tintAmount) : 1, a.redOffset = Number(s[0]) * l, a.greenOffset = Number(s[1]) * l, a.blueOffset = Number(s[2]) * l, a.redMultiplier = a.greenMultiplier = a.blueMultiplier = 1 - l;
			else
				for (u in n)
					"exposure" !== u && "brightness" !== u && (a[u] = Number(n[u]));
			for (null != n.exposure ? (a.redOffset = a.greenOffset = a.blueOffset = 255 * (Number(n.exposure) - 1), a.redMultiplier = a.greenMultiplier = a.blueMultiplier = 1) : null != n.brightness && (l = Number(n.brightness) - 1, a.redOffset = a.greenOffset = a.blueOffset = l > 0 ? 255 * l : 0, a.redMultiplier = a.greenMultiplier = a.blueMultiplier = 1 - Math.abs(l)), c = 8; --c > -1; )
				u = o[c], r[u] !== a[u] && i._addTween(r, u, r[u], a[u], "easel_colorFilter");
			if (i._overwriteProps.push("easel_colorFilter"), !t.cacheID)
				throw "EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t
		},
		l = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
		u = .212671,
		h = .71516,
		c = .072169,
		p = function (t, e) {
			if (!(t instanceof Array && e instanceof Array))
				return e;
			var n,
			i,
			s = [],
			r = 0,
			o = 0;
			for (n = 0; 4 > n; n++) {
				for (i = 0; 5 > i; i++)
					o = 4 === i ? t[r + 4] : 0, s[r + i] = t[r] * e[i] + t[r + 1] * e[i + 5] + t[r + 2] * e[i + 10] + t[r + 3] * e[i + 15] + o;
				r += 5
			}
			return s
		},
		d = function (t, e) {
			if (isNaN(e))
				return t;
			var n = 1 - e,
			i = n * u,
			s = n * h,
			r = n * c;
			return p([i + e, s, r, 0, 0, i, s + e, r, 0, 0, i, s, r + e, 0, 0, 0, 0, 0, 1, 0], t)
		},
		f = function (t, e, n) {
			isNaN(n) && (n = 1);
			var i = _(e),
			s = i[0] / 255,
			r = i[1] / 255,
			o = i[2] / 255,
			a = 1 - n;
			return p([a + n * s * u, n * s * h, n * s * c, 0, 0, n * r * u, a + n * r * h, n * r * c, 0, 0, n * o * u, n * o * h, a + n * o * c, 0, 0, 0, 0, 0, 1, 0], t)
		},
		m = function (t, e) {
			if (isNaN(e))
				return t;
			e *= Math.PI / 180;
			var n = Math.cos(e),
			i = Math.sin(e);
			return p([u + n * (1 - u) + i * -u, h + n * -h + i * -h, c + n * -c + i * (1 - c), 0, 0, u + n * -u + .143 * i, h + n * (1 - h) + .14 * i, c + n * -c + i *  - .283, 0, 0, u + n * -u + i *  - (1 - u), h + n * -h + i * h, c + n * (1 - c) + i * c, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], t)
		},
		g = function (t, e) {
			return isNaN(e) ? t : (e += .01, p([e, 0, 0, 0, 128 * (1 - e), 0, e, 0, 0, 128 * (1 - e), 0, 0, e, 0, 128 * (1 - e), 0, 0, 0, 1, 0], t))
		},
		v = function (t, e, i) {
			if (!n && (n = window.ColorMatrixFilter || window.createjs.ColorMatrixFilter, !n))
				throw "EaselPlugin error: The EaselJS ColorMatrixFilter JavaScript file wasn't loaded.";
			for (var s, r, o, a, u = t.filters || [], h = u.length; --h > -1; )
				if (u[h]instanceof n) {
					o = u[h];
					break
				}
			for (o || (o = new n(l.slice()), u.push(o), t.filters = u), a = o.clone(), r = s = a.matrix || l, null != e.colorize && (s = f(s, e.colorize, Number(e.colorizeAmount))), null != e.contrast && (s = g(s, Number(e.contrast))), null != e.hue && (s = m(s, Number(e.hue))), null != e.saturation && (s = d(s, Number(e.saturation))), h = s.length; --h > -1; )
				s[h] !== r[h] && i._addTween(r, h, r[h], s[h], "easel_colorMatrixFilter");
			if (i._overwriteProps.push("easel_colorMatrixFilter"), !t.cacheID)
				throw "EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t;
			i._matrix = r
		},
		_ = function (t) {
			return "" === t || null == t || "none" === t ? y.transparent : y[t] ? y[t] : "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : "#" === t.charAt(0) ? (4 === t.length && (t = "#" + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2) + t.charAt(3) + t.charAt(3)), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : t.match(r) || y.transparent
		},
		y = {
			aqua : [0, 255, 255],
			lime : [0, 255, 0],
			silver : [192, 192, 192],
			black : [0, 0, 0],
			maroon : [128, 0, 0],
			teal : [0, 128, 128],
			blue : [0, 0, 255],
			navy : [0, 0, 128],
			white : [255, 255, 255],
			fuchsia : [255, 0, 255],
			olive : [128, 128, 0],
			yellow : [255, 255, 0],
			orange : [255, 165, 0],
			gray : [128, 128, 128],
			purple : [128, 0, 128],
			green : [0, 128, 0],
			red : [255, 0, 0],
			pink : [255, 192, 203],
			cyan : [0, 255, 255],
			transparent : [255, 255, 255, 0]
		};
		return s.constructor = i,
		i.API = 2,
		i.version = "0.1.3",
		s._onInitTween = function (t, e) {
			this._target = t;
			var n,
			i,
			s,
			r;
			for (n in e)
				"colorFilter" === n || "tint" === n || "tintAmount" === n || "exposure" === n || "brightness" === n ? s || (a(t, e.colorFilter || e, this), s = !0) : "saturation" === n || "contrast" === n || "hue" === n || "colorize" === n || "colorizeAmount" === n ? r || (v(t, e.colorMatrixFilter || e, this), r = !0) : null != t[n] && (this._firstPT = i = {
						_next : this._firstPT,
						t : t,
						p : n,
						f : "function" == typeof t[n],
						n : n,
						pr : 0,
						type : 0
					}, i.s = i.f ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), i.c = "number" == typeof e[n] ? e[n] - i.s : "string" == typeof e[n] ? parseFloat(e[n].split("=").join("")) : 0, i._next && (i._next._prev = i));
			return !0
		},
		s.setRatio = function (t) {
			for (var e, n = this._firstPT, i = 1e-6; n; )
				e = n.c * t + n.s, n.r ? e = e + (e > 0 ? .5 :  - .5) >> 0 : i > e && e > -i && (e = 0), n.f ? n.t[n.p](e) : n.t[n.p] = e, n = n._next;
			this._target.cacheID && this._target.updateCache()
		},
		t.activate([i]),
		i
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("plugins.RaphaelPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t) {
		var e = function () {
			t.call(this, "raphael"),
			this._overwriteProps.pop()
		},
		n = e.prototype = new t("raphael");
		n.constructor = e,
		e.API = 2;
		var i = /[^\d\-\.]/g,
		s = Math.PI / 180,
		r = (180 / Math.PI, /(\d|\.)+/g),
		o = function (t) {
			return "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : "" === t || null == t || "none" === t || "string" != typeof t ? c.transparent : c[t] ? c[t] : "#" === t.charAt(0) ? (4 === t.length && (t = "#" + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2) + t.charAt(3) + t.charAt(3)), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : t.match(r) || c.transparent
		},
		a = {
			scaleX : 1,
			scaleY : 1,
			tx : 1,
			ty : 1,
			rotation : 1,
			shortRotation : 1,
			skewX : 1,
			skewY : 1,
			scale : 1
		},
		l = function (t, e) {
			var n = t.matrix,
			i = 1e-6,
			s = n.a,
			r = n.b,
			o = n.c,
			a = n.d,
			l = e ? t._gsTransform || {
				skewY : 0
			}
			 : {
				skewY : 0
			},
			u = 0 > l.scaleX;
			return l.tx = n.e - (l.ox || 0),
			l.ty = n.f - (l.oy || 0),
			l.scaleX = Math.sqrt(s * s + r * r),
			l.scaleY = Math.sqrt(a * a + o * o),
			l.rotation = s || r ? Math.atan2(r, s) : l.rotation || 0,
			l.skewX = o || a ? Math.atan2(o, a) + l.rotation : l.skewX || 0,
			Math.abs(l.skewX) > Math.PI / 2 && (u ? (l.scaleX *= -1, l.skewX += 0 >= l.rotation ? Math.PI : -Math.PI, l.rotation += 0 >= l.rotation ? Math.PI : -Math.PI) : (l.scaleY *= -1, l.skewX += 0 >= l.skewX ? Math.PI : -Math.PI)),
			i > l.rotation && l.rotation > -i && (s || r) && (l.rotation = 0),
			i > l.skewX && l.skewX > -i && (r || o) && (l.skewX = 0),
			e && (t._gsTransform = l),
			l
		},
		u = function (t, e) {
			return null == t ? e : "string" == typeof t && 1 === t.indexOf("=") ? parseInt(t.charAt(0) + "1") * Number(t.substr(2)) + e : Number(t)
		},
		h = function (t, e) {
			var n = -1 === t.indexOf("rad") ? s : 1,
			r = 1 === t.indexOf("=");
			return t = Number(t.replace(i, "")) * n,
			r ? t + e : t
		},
		c = {
			aqua : [0, 255, 255],
			lime : [0, 255, 0],
			silver : [192, 192, 192],
			black : [0, 0, 0],
			maroon : [128, 0, 0],
			teal : [0, 128, 128],
			blue : [0, 0, 255],
			navy : [0, 0, 128],
			white : [255, 255, 255],
			fuchsia : [255, 0, 255],
			olive : [128, 128, 0],
			yellow : [255, 255, 0],
			orange : [255, 165, 0],
			gray : [128, 128, 128],
			purple : [128, 0, 128],
			green : [0, 128, 0],
			red : [255, 0, 0],
			pink : [255, 192, 203],
			cyan : [0, 255, 255],
			transparent : [255, 255, 255, 0]
		};
		return n._onInitTween = function (t, e, n) {
			if (!t.attr)
				return !1;
			this._target = t,
			this._tween = n,
			this._props = t._gsProps = t._gsProps || {};
			var s,
			r,
			l,
			u,
			h,
			c,
			p;
			for (s in e)
				l = e[s], "transform" !== s ? a[s] || "pivot" === s ? this._parseTransform(t, e) : (r = t.attr(s), this._firstPT = u = {
						_next : this._firstPT,
						t : this._props,
						p : s,
						b : r,
						f : !1,
						n : "raphael_" + s,
						r : !1,
						type : 0
					}, "fill" === s || "stroke" === s ? (h = o(r), c = o(l), u.e = l, u.s = Number(h[0]), u.c = Number(c[0]) - u.s, u.gs = Number(h[1]), u.gc = Number(c[1]) - u.gs, u.bs = Number(h[2]), u.bc = Number(c[2]) - u.bs, h.length > 3 || c.length > 3 ? (u.as = 4 > h.length ? 1 : Number(h[3]), u.ac = (4 > c.length ? 1 : Number(c[3])) - u.as, u.type = 2) : u.type = 1) : (r = "string" == typeof r ? parseFloat(r.replace(i, "")) : Number(r), "string" == typeof l ? (p = "=" === l.charAt(1), l = parseFloat(l.replace(i, ""))) : p = !1, u.e = l || 0 === l ? p ? l + r : l : e[s], !r && 0 !== r || !l && 0 !== l || !(u.c = p ? l : l - r) ? (u.type = -1, u.i = e[s], u.s = u.c = 0) : u.s = r), this._overwriteProps.push("raphael_" + s), u._next && (u._next._prev = u)) : this._parseTransform(t, l);
			return !0
		},
		n._parseTransform = function (t, e) {
			if (!this._transform) {
				var n,
				i,
				r,
				o,
				c,
				p,
				d,
				f,
				m,
				g = this._transform = l(t, !0),
				v = 1e-6;
				if ("object" == typeof e) {
					if (n = {
							scaleX : u(null != e.scaleX ? e.scaleX : e.scale, g.scaleX),
							scaleY : u(null != e.scaleY ? e.scaleY : e.scale, g.scaleY),
							tx : u(e.tx, g.tx),
							ty : u(e.ty, g.ty)
						}, null != e.shortRotation) {
						n.rotation = "number" == typeof e.shortRotation ? e.shortRotation * s : h(e.shortRotation, g.rotation);
						var _ = (n.rotation - g.rotation) % (2 * Math.PI);
						_ !== _ % Math.PI && (_ += Math.PI * (0 > _ ? 2 : -2)),
						n.rotation = g.rotation + _
					} else
						n.rotation = null == e.rotation ? g.rotation : "number" == typeof e.rotation ? e.rotation * s : h(e.rotation, g.rotation);
					n.skewX = null == e.skewX ? g.skewX : "number" == typeof e.skewX ? e.skewX * s : h(e.skewX, g.skewX),
					n.skewY = null == e.skewY ? g.skewY : "number" == typeof e.skewY ? e.skewY * s : h(e.skewY, g.skewY),
					(i = n.skewY - g.skewY) && (n.skewX += i, n.rotation += i),
					v > n.skewY && n.skewY > -v && (n.skewY = 0),
					v > n.skewX && n.skewX > -v && (n.skewX = 0),
					v > n.rotation && n.rotation > -v && (n.rotation = 0),
					m = e.localPivot || e.globalPivot,
					"string" == typeof m ? (c = m.split(","), p = Number(c[0]), d = Number(c[1])) : "object" == typeof m ? (p = Number(m.x), d = Number(m.y)) : e.localPivot ? (c = t.getBBox(!0), p = c.width / 2, d = c.height / 2) : (c = t.getBBox(), p = c.x + c.width / 2, d = c.y + c.height / 2),
					e.localPivot ? (f = t.matrix, p += t.attr("x"), d += t.attr("y"), this._pxl = p, this._pyl = d, this._pxg = p * f.a + d * f.c + f.e - g.tx, this._pyg = p * f.b + d * f.d + f.f - g.ty) : (f = t.matrix.invert(), this._pxl = p * f.a + d * f.c + f.e, this._pyl = p * f.b + d * f.d + f.f, this._pxg = p - g.tx, this._pyg = d - g.ty)
				} else {
					if ("string" != typeof e)
						return;
					c = this._target.transform(),
					t.transform(e),
					n = l(t, !1),
					t.transform(c)
				}
				for (r in a)
					g[r] !== n[r] && "shortRotation" !== r && "scale" !== r && (this._firstPT = o = {
							_next : this._firstPT,
							t : g,
							p : r,
							s : g[r],
							c : n[r] - g[r],
							n : r,
							f : !1,
							r : !1,
							b : g[r],
							e : n[r],
							type : 0
						}, o._next && (o._next._prev = o), this._overwriteProps.push("raphael_" + r))
			}
		},
		n.setRatio = function (t) {
			for (var e, n = this._firstPT; n; )
				e = n.c * t + n.s, n.r && (e = e > 0 ? e + .5 >> 0 : e - .5 >> 0), n.type ? 1 === n.type ? n.t[n.p] = "rgb(" + (e >> 0) + ", " + (n.gs + t * n.gc >> 0) + ", " + (n.bs + t * n.bc >> 0) + ")" : 2 === n.type ? n.t[n.p] = "rgba(" + (e >> 0) + ", " + (n.gs + t * n.gc >> 0) + ", " + (n.bs + t * n.bc >> 0) + ", " + (n.as + t * n.ac) + ")" : -1 === n.type && (n.t[n.p] = n.i) : n.t[n.p] = e, n = n._next;
			if (this._target.attr(this._props), this._transform) {
				n = this._transform;
				var i = n.rotation,
				s = i - n.skewX,
				r = Math.cos(i) * n.scaleX,
				o = Math.sin(i) * n.scaleX,
				a = Math.sin(s) * -n.scaleY,
				l = Math.cos(s) * n.scaleY,
				u = 1e-6,
				h = this._pxl,
				c = this._pyl;
				u > o && o > -u && (o = 0),
				u > a && a > -u && (a = 0),
				n.ox = this._pxg - (h * r + c * a),
				n.oy = this._pyg - (h * o + c * l),
				this._target.transform("m" + r + "," + o + "," + a + "," + l + "," + (n.tx + n.ox) + "," + (n.ty + n.oy))
			}
		},
		t.activate([e]),
		e
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("plugins.RoundPropsPlugin", ["plugins.TweenPlugin"], function (t) {
		var e = function () {
			t.call(this, "roundProps", -1),
			this._overwriteProps.length = 0
		},
		n = e.prototype = new t("roundProps", -1);
		return n.constructor = e,
		e.API = 2,
		n._onInitTween = function (t, e, n) {
			return this._tween = n,
			!0
		},
		n._onInitAllProps = function () {
			for (var t, e, n, i = this._tween, s = i.vars.roundProps instanceof Array ? i.vars.roundProps : i.vars.roundProps.split(","), r = s.length, o = {}, a = i._propLookup.roundProps; --r > -1; )
				o[s[r]] = 1;
			for (r = s.length; --r > -1; )
				for (t = s[r], e = i._firstPT; e; )
					n = e._next, e.pg ? e.t._roundProps(o, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), n && (n._prev = e._prev), e._prev ? e._prev._next = n : i._firstPT === e && (i._firstPT = n), e._next = e._prev = null, i._propLookup[t] = a), e = n;
			return !1
		},
		n._add = function (t, e, n, i) {
			this._addTween(t, e, n, n + i, e, !0),
			this._overwriteProps.push(e)
		},
		t.activate([e]),
		e
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	_gsDefine("plugins.ScrollToPlugin", ["plugins.TweenPlugin"], function (t) {
		var e = function () {
			t.call(this, "scrollTo"),
			this._overwriteProps.pop()
		},
		n = e.prototype = new t("scrollTo"),
		i = document.documentElement,
		s = window,
		r = e.max = function (t, e) {
			var n = "x" === e ? "Width" : "Height",
			r = "scroll" + n,
			o = "client" + n,
			a = document.body;
			return t === s || t === i || t === a ? Math.max(i[r], a[r]) - Math.max(i[o], a[o]) : t[r] - t["offset" + n]
		},
		o = t.prototype.setRatio;
		return n.constructor = e,
		e.API = 2,
		n._onInitTween = function (t, e, n) {
			return this._wdw = t === s,
			this._target = t,
			this._tween = n,
			"object" != typeof e && (e = {
					y : e
				}),
			this._autoKill = e.autoKill !== !1,
			this.x = this.xPrev = this.getX(),
			this.y = this.yPrev = this.getY(),
			null != e.x ? this._addTween(this, "x", this.x, "max" === e.x ? r(t, "x") : e.x, "scrollTo_x", !0) : this.skipX = !0,
			null != e.y ? this._addTween(this, "y", this.y, "max" === e.y ? r(t, "y") : e.y, "scrollTo_y", !0) : this.skipY = !0,
			!0
		},
		n.getX = function () {
			return this._wdw ? null != s.pageXOffset ? s.pageXOffset : null != i.scrollLeft ? i.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
		},
		n.getY = function () {
			return this._wdw ? null != s.pageYOffset ? s.pageYOffset : null != i.scrollTop ? i.scrollTop : document.body.scrollTop : this._target.scrollTop
		},
		n._kill = function (e) {
			return e.scrollTo_x && (this.skipX = !0),
			e.scrollTo_y && (this.skipY = !0),
			t.prototype._kill.call(this, e)
		},
		n.setRatio = function (t) {
			o.call(this, t);
			var e = this._wdw || !this.skipX ? this.getX() : this.xPrev,
			n = this._wdw || !this.skipY ? this.getY() : this.yPrev,
			i = n - this.yPrev,
			r = e - this.xPrev;
			this._autoKill && (!this.skipX && (r > 7 || -7 > r) && (this.skipX = !0), !this.skipY && (i > 7 || -7 > i) && (this.skipY = !0), this.skipX && this.skipY && this._tween.kill()),
			this._wdw ? s.scrollTo(this.skipX ? e : this.x, this.skipY ? n : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)),
			this.xPrev = this.x,
			this.yPrev = this.y
		},
		t.activate([e]),
		e
	}, !0)
}), window._gsDefine && _gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("plugins.MyCustomPropertyPlugin", ["plugins.TweenPlugin"], function (t) {
		var e = function () {
			t.call(this, "myCustomProperty", 0)
		},
		n = e.prototype = new t("myCustomProperty", 0);
		return n.constructor = e,
		e.API = 2,
		n._onInitTween = function (t, e) {
			return this._target = t,
			this._addTween(t, "scaleX", t.scaleX, e, "scaleX", !1),
			this._addTween(t, "scaleY", t.scaleY, e, "scaleY", !1),
			this._alphaStart = t.alpha,
			this._alphaChange = e.alpha - t.alpha,
			!0
		},
		n.setRatio = function (e) {
			t.prototype.setRatio.call(this, e),
			this._target.alpha = this._alphaStart + this._alphaChange * e
		},
		t.activate([e]),
		e
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, n) {
		var i = function (t) {
			e.call(this, t),
			this._labels = {},
			this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
			this.smoothChildTiming = this.vars.smoothChildTiming === !0,
			this._sortChildren = !0,
			this._onUpdate = this.vars.onUpdate;
			for (var n, i, r = s.length; --r > -1; )
				if (i = this.vars[s[r]])
					for (n = i.length; --n > -1; )
						"{self}" === i[n] && (i = this.vars[s[r]] = i.concat(), i[n] = this);
			this.vars.tweens instanceof Array && this.add(this.vars.tweens, 0, this.vars.align, this.vars.stagger)
		},
		s = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
		r = [],
		o = function (t) {
			var e,
			n = {};
			for (e in t)
				n[e] = t[e];
			return n
		},
		a = i.prototype = new e;
		return i.version = "1.8.4",
		a.constructor = i,
		a.kill()._gc = !1,
		a.to = function (t, e, i, s) {
			return this.add(new n(t, e, i), s)
		},
		a.from = function (t, e, i, s) {
			return this.add(n.from(t, e, i), s)
		},
		a.fromTo = function (t, e, i, s, r) {
			return this.add(n.fromTo(t, e, i, s), r)
		},
		a.staggerTo = function (t, e, s, r, a, l, u, h) {
			var c,
			p,
			d = new i({
					onComplete : l,
					onCompleteParams : u,
					onCompleteScope : h
				});
			for ("string" == typeof t && (t = n.selector(t) || t), !(t instanceof Array) && "function" == typeof t.each && t[0] && t[0].nodeType && t[0].style && (p = [], t.each(function () {
						p.push(this)
					}), t = p), r = r || 0, c = 0; t.length > c; c++)
				null != s.startAt && (s.startAt = o(s.startAt)), d.add(new n(t[c], e, o(s)), c * r);
			return this.add(d, a)
		},
		a.staggerFrom = function (t, e, n, i, s, r, o, a) {
			return null == n.immediateRender && (n.immediateRender = !0),
			n.runBackwards = !0,
			this.staggerTo(t, e, n, i, s, r, o, a)
		},
		a.staggerFromTo = function (t, e, n, i, s, r, o, a, l) {
			return i.startAt = n,
			n.immediateRender && (i.immediateRender = !0),
			this.staggerTo(t, e, i, s, r, o, a, l)
		},
		a.call = function (t, e, i, s) {
			return this.add(n.delayedCall(0, t, e, i), s)
		},
		a.set = function (t, e, i) {
			return e.immediateRender = !1,
			this.add(new n(t, 0, e), i)
		},
		i.exportRoot = function (t, e) {
			t = t || {},
			null == t.smoothChildTiming && (t.smoothChildTiming = !0);
			var s,
			r,
			o = new i(t),
			a = o._timeline;
			for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, s = a._first; s; )
				r = s._next, e && s instanceof n && s.target === s.vars.onComplete || o.add(s, s._startTime - s._delay), s = r;
			return a.add(o, 0),
			o
		},
		a.add = function (s, r, o, a) {
			if ("number" != typeof r && (r = this._parseTimeOrLabel(r, 0, !0, s)), !(s instanceof t)) {
				if (s instanceof Array) {
					o = o || "normal",
					a = a || 0;
					var l,
					u,
					h = r,
					c = s.length;
					for (l = 0; c > l; l++)
						(u = s[l])instanceof Array && (u = new i({
									tweens : u
								})), this.add(u, h), "string" != typeof u && "function" != typeof u && ("sequence" === o ? h = u._startTime + u.totalDuration() / u._timeScale : "start" === o && (u._startTime -= u.delay())), h += a;
					return this._uncache(!0)
				}
				if ("string" == typeof s)
					return this.addLabel(s, r);
				if ("function" != typeof s)
					throw "Cannot add " + s + " into the TimelineLite/Max: it is neither a tween, timeline, function, nor a String.";
				s = n.delayedCall(0, s)
			}
			if (e.prototype.add.call(this, s, r), this._gc && !this._paused && this._time === this._duration && this._time < this.duration())
				for (var p = this; p._gc && p._timeline; )
					p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._enabled(!0, !1), p = p._timeline;
			return this
		},
		a.remove = function (e) {
			if (e instanceof t)
				return this._remove(e, !1);
			if (e instanceof Array) {
				for (var n = e.length; --n > -1; )
					this.remove(e[n]);
				return this
			}
			return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
		},
		a.append = function (t, e) {
			return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
		},
		a.insert = a.insertMultiple = function (t, e, n, i) {
			return this.add(t, e || 0, n, i)
		},
		a.appendMultiple = function (t, e, n, i) {
			return this.add(t, this._parseTimeOrLabel(null, e, !0, t), n, i)
		},
		a.addLabel = function (t, e) {
			return this._labels[t] = this._parseTimeOrLabel(e),
			this
		},
		a.removeLabel = function (t) {
			return delete this._labels[t],
			this
		},
		a.getLabelTime = function (t) {
			return null != this._labels[t] ? this._labels[t] : -1
		},
		a._parseTimeOrLabel = function (e, n, i, s) {
			var r;
			if (s instanceof t && s.timeline === this)
				this.remove(s);
			else if (s instanceof Array)
				for (r = s.length; --r > -1; )
					s[r]instanceof t && s[r].timeline === this && this.remove(s[r]);
			if ("string" == typeof n)
				return this._parseTimeOrLabel(n, i && "number" == typeof e && null == this._labels[n] ? e - this.duration() : 0, i);
			if (n = n || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e])
				null == e && (e = this.duration());
			else {
				if (r = e.indexOf("="), -1 === r)
					return null == this._labels[e] ? i ? this._labels[e] = this.duration() + n : n : this._labels[e] + n;
				n = parseInt(e.charAt(r - 1) + "1", 10) * Number(e.substr(r + 1)),
				e = r > 1 ? this._parseTimeOrLabel(e.substr(0, r - 1), 0, i) : this.duration()
			}
			return Number(e) + n
		},
		a.seek = function (t, e) {
			return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
		},
		a.stop = function () {
			return this.paused(!0)
		},
		a.gotoAndPlay = function (t, n) {
			return e.prototype.play.call(this, t, n)
		},
		a.gotoAndStop = function (t, e) {
			return this.pause(t, e)
		},
		a.render = function (t, e, n) {
			this._gc && this._enabled(!0, !1),
			this._active = !this._paused;
			var i,
			s,
			o,
			a,
			l = this._dirty ? this.totalDuration() : this._totalDuration,
			u = this._time,
			h = this._startTime,
			c = this._timeScale,
			p = this._paused;
			if (t >= l ? (this._totalTime = this._time = l, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && (n = !0)), this._rawPrevTime = t, t = l + 1e-6) : 0 >= t ? (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && this._rawPrevTime > 0) && (a = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && (n = !0)) : this._initted || (n = !0), this._rawPrevTime = t, t = -1e-6) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== u || n) {
				if (this._initted || (this._initted = !0), 0 === u && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || r)), this._time > u)
					for (i = this._first; i && (o = i._next, !this._paused || p); )
						(i._active || i._startTime <= this._time && !i._paused && !i._gc) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale, e, !1) : i.render((t - i._startTime) * i._timeScale, e, !1)), i = o;
				else
					for (i = this._last; i && (o = i._prev, !this._paused || p); )
						(i._active || u >= i._startTime && !i._paused && !i._gc) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale, e, !1) : i.render((t - i._startTime) * i._timeScale, e, !1)), i = o;
				this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || r)),
				a && (this._gc || (h === this._startTime || c != this._timeScale) && (0 === this._time || l >= this.totalDuration()) && (s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), e || this.vars[a] && this.vars[a].apply(this.vars[a + "Scope"] || this, this.vars[a + "Params"] || r)))
			}
		},
		a._hasPausedChild = function () {
			for (var t = this._first; t; ) {
				if (t._paused || t instanceof i && t._hasPausedChild())
					return !0;
				t = t._next
			}
			return !1
		},
		a.getChildren = function (t, e, i, s) {
			s = s || -9999999999;
			for (var r = [], o = this._first, a = 0; o; )
				s > o._startTime || (o instanceof n ? e !== !1 && (r[a++] = o) : (i !== !1 && (r[a++] = o), t !== !1 && (r = r.concat(o.getChildren(!0, e, i)), a = r.length))), o = o._next;
			return r
		},
		a.getTweensOf = function (t, e) {
			for (var i = n.getTweensOf(t), s = i.length, r = [], o = 0; --s > -1; )
				(i[s].timeline === this || e && this._contains(i[s])) && (r[o++] = i[s]);
			return r
		},
		a._contains = function (t) {
			for (var e = t.timeline; e; ) {
				if (e === this)
					return !0;
				e = e.timeline
			}
			return !1
		},
		a.shiftChildren = function (t, e, n) {
			n = n || 0;
			for (var i, s = this._first; s; )
				s._startTime >= n && (s._startTime += t), s = s._next;
			if (e)
				for (i in this._labels)
					this._labels[i] >= n && (this._labels[i] += t);
			return this._uncache(!0)
		},
		a._kill = function (t, e) {
			if (null == t && null == e)
				return this._enabled(!1, !1);
			for (var n = null == e ? this.getChildren(!0, !0, !1) : this.getTweensOf(e), i = n.length, s = !1; --i > -1; )
				n[i]._kill(t, e) && (s = !0);
			return s
		},
		a.clear = function (t) {
			var e = this.getChildren(!1, !0, !0),
			n = e.length;
			for (this._time = this._totalTime = 0; --n > -1; )
				e[n]._enabled(!1, !1);
			return t !== !1 && (this._labels = {}),
			this._uncache(!0)
		},
		a.invalidate = function () {
			for (var t = this._first; t; )
				t.invalidate(), t = t._next;
			return this
		},
		a._enabled = function (t, n) {
			if (t === this._gc)
				for (var i = this._first; i; )
					i._enabled(t, !0), i = i._next;
			return e.prototype._enabled.call(this, t, n)
		},
		a.progress = function (t) {
			return arguments.length ? this.totalTime(this.duration() * t, !1) : this._time / this.duration()
		},
		a.duration = function (t) {
			return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
		},
		a.totalDuration = function (t) {
			if (!arguments.length) {
				if (this._dirty) {
					for (var e, n, i = 0, s = this._last, r = 999999999999; s; )
						e = s._prev, s._dirty && s.totalDuration(), s._startTime > r && this._sortChildren && !s._paused ? this.add(s, s._startTime - s._delay) : r = s._startTime, 0 > s._startTime && !s._paused && (i -= s._startTime, this._timeline.smoothChildTiming && (this._startTime += s._startTime / this._timeScale), this.shiftChildren(-s._startTime, !1, -9999999999), r = 0), n = s._startTime + s._totalDuration / s._timeScale, n > i && (i = n), s = e;
					this._duration = this._totalDuration = i,
					this._dirty = !1
				}
				return this._totalDuration
			}
			return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t),
			this
		},
		a.usesFrames = function () {
			for (var e = this._timeline; e._timeline; )
				e = e._timeline;
			return e === t._rootFramesTimeline
		},
		a.rawTime = function () {
			return this._paused || 0 !== this._totalTime && this._totalTime !== this._totalDuration ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
		},
		i
	}, !0)
}), window._gsDefine && window._gsQueue.pop()(), function (t) {
	"use strict";
	var e,
	n,
	i,
	s,
	r = t.GreenSockGlobals || t,
	o = function (t) {
		var e,
		n = t.split("."),
		i = r;
		for (e = 0; n.length > e; e++)
			i[n[e]] = i = i[n[e]] || {};
		return i
	},
	a = o("com.greensock"),
	l = {},
	u = function (e, n, i, s) {
		this.sc = l[e] ? l[e].sc : [],
		l[e] = this,
		this.gsClass = null,
		this.func = i;
		var a = [];
		this.check = function (h) {
			for (var c, p, d, f, m = n.length, g = m; --m > -1; )
				(c = l[n[m]] || new u(n[m], [])).gsClass ? (a[m] = c.gsClass, g--) : h && c.sc.push(this);
			if (0 === g && i)
				for (p = ("com.greensock." + e).split("."), d = p.pop(), f = o(p.join("."))[d] = this.gsClass = i.apply(i, a), s && (r[d] = f, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + e.split(".").join("/"), [], function () {
							return f
						}) : "undefined" != typeof module && module.exports && (module.exports = f)), m = 0; this.sc.length > m; m++)
					this.sc[m].check()
		},
		this.check(!0)
	},
	h = t._gsDefine = function (t, e, n, i) {
		return new u(t, e, n, i)
	},
	c = a._class = function (t, e, n) {
		return e = e || function () {},
		h(t, [], function () {
			return e
		}, n),
		e
	},
	p = [0, 0, 1, 1],
	d = [],
	f = c("easing.Ease", function (t, e, n, i) {
			this._func = t,
			this._type = n || 0,
			this._power = i || 0,
			this._params = e ? p.concat(e) : p
		}, !0),
	m = f.map = {},
	g = f.register = function (t, e, n, i) {
		for (var s, r, o, l, u = e.split(","), h = u.length, p = (n || "easeIn,easeOut,easeInOut").split(","); --h > -1; )
			for (r = u[h], s = i ? c("easing." + r, null, !0) : a.easing[r] || {}, o = p.length; --o > -1; )
				l = p[o], m[r + "." + l] = m[l + r] = s[l] = t.getRatio ? t : t[l] || new t
	};
	for (i = f.prototype, i._calcEnd = !1, i.getRatio = function (t) {
		if (this._func)
			return this._params[0] = t, this._func.apply(null, this._params);
			var e = this._type,
			n = this._power,
			i = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
			return 1 === n ? i *= i : 2 === n ? i *= i * i : 3 === n ? i *= i * i * i : 4 === n && (i *= i * i * i * i),
			1 === e ? 1 - i : 2 === e ? i : .5 > t ? i / 2 : 1 - i / 2
		}, e = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = e.length; --n > -1; )i = e[n] + ",Power" + n, g(new f(null, null, 1, n), i, "easeOut", !0), g(new f(null, null, 2, n), i, "easeIn" + (0 === n ? ",easeNone" : "")), g(new f(null, null, 3, n), i, "easeInOut");
	m.linear = a.easing.Linear.easeIn,
	m.swing = a.easing.Quad.easeInOut;
	var v = c("events.EventDispatcher", function (t) {
			this._listeners = {},
			this._eventTarget = t || this
		});
	i = v.prototype,
	i.addEventListener = function (t, e, n, i, s) {
		s = s || 0;
		var r,
		o,
		a = this._listeners[t],
		l = 0;
		for (null == a && (this._listeners[t] = a = []), o = a.length; --o > -1; )
			r = a[o], r.c === e ? a.splice(o, 1) : 0 === l && s > r.pr && (l = o + 1);
		a.splice(l, 0, {
			c : e,
			s : n,
			up : i,
			pr : s
		})
	},
	i.removeEventListener = function (t, e) {
		var n,
		i = this._listeners[t];
		if (i)
			for (n = i.length; --n > -1; )
				if (i[n].c === e)
					return i.splice(n, 1), void 0
	},
	i.dispatchEvent = function (t) {
		var e = this._listeners[t];
		if (e)
			for (var n, i = e.length, s = this._eventTarget; --i > -1; )
				n = e[i], n.up ? n.c.call(n.s || s, {
					type : t,
					target : s
				}) : n.c.call(n.s || s)
	};
	var _ = t.requestAnimationFrame,
	y = t.cancelAnimationFrame,
	b = Date.now || function () {
		return (new Date).getTime()
	};
	for (e = ["ms", "moz", "webkit", "o"], n = e.length; --n > -1 && !_; )
		_ = t[e[n] + "RequestAnimationFrame"], y = t[e[n] + "CancelAnimationFrame"] || t[e[n] + "CancelRequestAnimationFrame"];
	c("Ticker", function (e, n) {
		var i,
		s,
		r,
		o,
		a,
		l = this,
		u = b(),
		h = n !== !1 && _,
		c = function () {
			null != r && (h && y ? y(r) : t.clearTimeout(r), r = null)
		},
		p = function (t) {
			l.time = (b() - u) / 1e3,
			(!i || l.time >= a || t === !0) && (l.frame++, a = l.time > a ? l.time + o - (l.time - a) : l.time + o - .001, l.time + .001 > a && (a = l.time + .001), l.dispatchEvent("tick")),
			t !== !0 && (r = s(p))
		};
		v.call(l),
		this.time = this.frame = 0,
		this.tick = function () {
			p(!0)
		},
		this.fps = function (t) {
			return arguments.length ? (i = t, o = 1 / (i || 60), a = this.time + o, s = 0 === i ? function () {}

				 : h && _ ? _ : function (t) {
				return setTimeout(t, 1e3 * (a - l.time) + 1 >> 0 || 1)
			}, c(), r = s(p), void 0) : i
		},
		this.useRAF = function (t) {
			return arguments.length ? (c(), h = t, l.fps(i), void 0) : h
		},
		l.fps(e),
		setTimeout(function () {
			h && !r && l.useRAF(!1)
		}, 1e3)
	}),
	i = a.Ticker.prototype = new a.events.EventDispatcher,
	i.constructor = a.Ticker;
	var x = c("core.Animation", function (t, e) {
			if (this.vars = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(this.vars.delay) || 0, this._timeScale = 1, this._active = this.vars.immediateRender === !0, this.data = this.vars.data, this._reversed = this.vars.reversed === !0, L) {
				s || (w.tick(), s = !0);
				var n = this.vars.useFrames ? A : L;
				n.add(this, n._time),
				this.vars.paused && this.paused(!0)
			}
		}),
	w = x.ticker = new a.Ticker;
	i = x.prototype,
	i._dirty = i._gc = i._initted = i._paused = !1,
	i._totalTime = i._time = 0,
	i._rawPrevTime = -1,
	i._next = i._last = i._onUpdate = i._timeline = i.timeline = null,
	i._paused = !1,
	i.play = function (t, e) {
		return arguments.length && this.seek(t, e),
		this.reversed(!1),
		this.paused(!1)
	},
	i.pause = function (t, e) {
		return arguments.length && this.seek(t, e),
		this.paused(!0)
	},
	i.resume = function (t, e) {
		return arguments.length && this.seek(t, e),
		this.paused(!1)
	},
	i.seek = function (t, e) {
		return this.totalTime(Number(t), e !== !1)
	},
	i.restart = function (t, e) {
		return this.reversed(!1),
		this.paused(!1),
		this.totalTime(t ? -this._delay : 0, e !== !1)
	},
	i.reverse = function (t, e) {
		return arguments.length && this.seek(t || this.totalDuration(), e),
		this.reversed(!0),
		this.paused(!1)
	},
	i.render = function () {},
	i.invalidate = function () {
		return this
	},
	i._enabled = function (t, e) {
		return this._gc = !t,
		this._active = t && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration,
		e !== !0 && (t && null == this.timeline ? this._timeline.add(this, this._startTime - this._delay) : t || null == this.timeline || this._timeline._remove(this, !0)),
		!1
	},
	i._kill = function () {
		return this._enabled(!1, !1)
	},
	i.kill = function (t, e) {
		return this._kill(t, e),
		this
	},
	i._uncache = function (t) {
		for (var e = t ? this : this.timeline; e; )
			e._dirty = !0, e = e.timeline;
		return this
	},
	i.eventCallback = function (t, e, n, i) {
		if (null == t)
			return null;
		if ("on" === t.substr(0, 2)) {
			if (1 === arguments.length)
				return this.vars[t];
			if (null == e)
				delete this.vars[t];
			else if (this.vars[t] = e, this.vars[t + "Params"] = n, this.vars[t + "Scope"] = i, n)
				for (var s = n.length; --s > -1; )
					"{self}" === n[s] && (n = this.vars[t + "Params"] = n.concat(), n[s] = this);
			"onUpdate" === t && (this._onUpdate = e)
		}
		return this
	},
	i.delay = function (t) {
		return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
	},
	i.duration = function (t) {
		return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
	},
	i.totalDuration = function (t) {
		return this._dirty = !1,
		arguments.length ? this.duration(t) : this._totalDuration
	},
	i.time = function (t, e) {
		return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this.totalTime(t, e)) : this._time
	},
	i.totalTime = function (t, e) {
		if (!arguments.length)
			return this._totalTime;
		if (this._timeline) {
			if (0 > t && (t += this.totalDuration()), this._timeline.smoothChildTiming && (this._dirty && this.totalDuration(), t > this._totalDuration && (t = this._totalDuration), this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - (this._reversed ? this._totalDuration - t : t) / this._timeScale, this._timeline._dirty || this._uncache(!1), !this._timeline._active))
				for (var n = this._timeline; n._timeline; )
					n.totalTime(n._totalTime, !0), n = n._timeline;
			this._gc && this._enabled(!0, !1),
			this._totalTime !== t && this.render(t, e, !1)
		}
		return this
	},
	i.startTime = function (t) {
		return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
	},
	i.timeScale = function (t) {
		if (!arguments.length)
			return this._timeScale;
		if (t = t || 1e-6, this._timeline && this._timeline.smoothChildTiming) {
			var e = this._pauseTime || 0 === this._pauseTime ? this._pauseTime : this._timeline._totalTime;
			this._startTime = e - (e - this._startTime) * this._timeScale / t
		}
		return this._timeScale = t,
		this._uncache(!1)
	},
	i.reversed = function (t) {
		return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._totalTime, !0)), this) : this._reversed
	},
	i.paused = function (t) {
		return arguments.length ? (t != this._paused && this._timeline && (!t && this._timeline.smoothChildTiming && (this._startTime += this._timeline.rawTime() - this._pauseTime, this._uncache(!1)), this._pauseTime = t ? this._timeline.rawTime() : null, this._paused = t, this._active = !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration), this._gc && (t || this._enabled(!0, !1)), this) : this._paused
	};
	var T = c("core.SimpleTimeline", function (t) {
			x.call(this, 0, t),
			this.autoRemoveChildren = this.smoothChildTiming = !0
		});
	i = T.prototype = new x,
	i.constructor = T,
	i.kill()._gc = !1,
	i._first = i._last = null,
	i._sortChildren = !1,
	i.add = function (t, e) {
		var n,
		i;
		if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), n = this._last, this._sortChildren)
			for (i = t._startTime; n && n._startTime > i; )
				n = n._prev;
		return n ? (t._next = n._next, n._next = t) : (t._next = this._first, this._first = t),
		t._next ? t._next._prev = t : this._last = t,
		t._prev = n,
		this._timeline && this._uncache(!0),
		this
	},
	i.insert = i.add,
	i._remove = function (t, e) {
		return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)),
		this
	},
	i.render = function (t, e) {
		var n,
		i = this._first;
		for (this._totalTime = this._time = this._rawPrevTime = t; i; )
			n = i._next, (i._active || t >= i._startTime && !i._paused) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale, e, !1) : i.render((t - i._startTime) * i._timeScale, e, !1)), i = n
	},
	i.rawTime = function () {
		return this._totalTime
	};
	var C = c("TweenLite", function (t, e, n) {
			if (x.call(this, e, n), null == t)
				throw "Cannot tween an undefined reference.";
			this.target = t = "string" != typeof t ? t : C.selector(t) || t,
			this._overwrite = null == this.vars.overwrite ? O[C.defaultOverwrite] : "number" == typeof this.vars.overwrite ? this.vars.overwrite >> 0 : O[this.vars.overwrite];
			var i,
			s,
			r = t.jquery || "function" == typeof t.each && t[0] && t[0].nodeType && t[0].style;
			if ((r || t instanceof Array) && "number" != typeof t[0])
				for (this._targets = r && !t.slice ? S(t) : t.slice(0), this._propLookup = [], this._siblings = [], i = 0; this._targets.length > i; i++)
					s = this._targets[i], s ? "string" != typeof s ? "function" == typeof s.each && s[0] && s[0].nodeType && s[0].style ? (this._targets.splice(i--, 1), this._targets = this._targets.concat(S(s))) : (this._siblings[i] = D(s, this, !1), 1 === this._overwrite && this._siblings[i].length > 1 && R(s, this, null, 1, this._siblings[i])) : (s = this._targets[i--] = C.selector(s), "string" == typeof s && this._targets.splice(i + 1, 1)) : this._targets.splice(i--, 1);
			else
				this._propLookup = {},
			this._siblings = D(t, this, !1),
			1 === this._overwrite && this._siblings.length > 1 && R(t, this, null, 1, this._siblings);
			(this.vars.immediateRender || 0 === e && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
		}, !0),
	E = function (t) {
		return "function" == typeof t.each && t[0] && t[0].nodeType && t[0].style
	},
	S = function (t) {
		var e = [];
		return t.each(function () {
			e.push(this)
		}),
		e
	},
	N = function (t, e) {
		var n,
		i = {};
		for (n in t)
			P[n] || n in e && "x" !== n && "y" !== n && "width" !== n && "height" !== n || !(!k[n] || k[n] && k[n]._autoCSS) || (i[n] = t[n], delete t[n]);
		t.css = i
	};
	i = C.prototype = new x,
	i.constructor = C,
	i.kill()._gc = !1,
	i.ratio = 0,
	i._firstPT = i._targets = i._overwrittenProps = null,
	i._notifyPluginsOfEnabled = !1,
	C.version = "1.8.4",
	C.defaultEase = i._ease = new f(null, null, 1, 1),
	C.defaultOverwrite = "auto",
	C.ticker = w,
	C.selector = t.$ || t.jQuery || function (e) {
		return t.$ ? (C.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
	};
	var k = C._plugins = {},
	I = C._tweenLookup = {},
	M = 0,
	P = {
		ease : 1,
		delay : 1,
		overwrite : 1,
		onComplete : 1,
		onCompleteParams : 1,
		onCompleteScope : 1,
		useFrames : 1,
		runBackwards : 1,
		startAt : 1,
		onUpdate : 1,
		onUpdateParams : 1,
		onUpdateScope : 1,
		onStart : 1,
		onStartParams : 1,
		onStartScope : 1,
		onReverseComplete : 1,
		onReverseCompleteParams : 1,
		onReverseCompleteScope : 1,
		onRepeat : 1,
		onRepeatParams : 1,
		onRepeatScope : 1,
		easeParams : 1,
		yoyo : 1,
		orientToBezier : 1,
		immediateRender : 1,
		repeat : 1,
		repeatDelay : 1,
		data : 1,
		paused : 1,
		reversed : 1,
		autoCSS : 1
	},
	O = {
		none : 0,
		all : 1,
		auto : 2,
		concurrent : 3,
		allOnStart : 4,
		preexisting : 5,
		"true" : 1,
		"false" : 0
	},
	A = x._rootFramesTimeline = new T,
	L = x._rootTimeline = new T;
	L._startTime = w.time,
	A._startTime = w.frame,
	L._active = A._active = !0,
	x._updateRoot = function () {
		if (L.render((w.time - L._startTime) * L._timeScale, !1, !1), A.render((w.frame - A._startTime) * A._timeScale, !1, !1), !(w.frame % 120)) {
			var t,
			e,
			n;
			for (n in I) {
				for (e = I[n].tweens, t = e.length; --t > -1; )
					e[t]._gc && e.splice(t, 1);
				0 === e.length && delete I[n]
			}
		}
	},
	w.addEventListener("tick", x._updateRoot);
	var D = function (t, e, n) {
		var i,
		s,
		r = t._gsTweenID;
		if (I[r || (t._gsTweenID = r = "t" + M++)] || (I[r] = {
					target : t,
					tweens : []
				}), e && (i = I[r].tweens, i[s = i.length] = e, n))
			for (; --s > -1; )
				i[s] === e && i.splice(s, 1);
		return I[r].tweens
	},
	R = function (t, e, n, i, s) {
		var r,
		o,
		a,
		l;
		if (1 === i || i >= 4) {
			for (l = s.length, r = 0; l > r; r++)
				if ((a = s[r]) !== e)
					a._gc || a._enabled(!1, !1) && (o = !0);
				else if (5 === i)
					break;
			return o
		}
		var u,
		h = e._startTime + 1e-10,
		c = [],
		p = 0,
		d = 0 === e._duration;
		for (r = s.length; --r > -1; )
			(a = s[r]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (u = u || H(e, 0, d), 0 === H(a, u, d) && (c[p++] = a)) : h >= a._startTime && a._startTime + a.totalDuration() / a._timeScale + 1e-10 > h && ((d || !a._initted) && 2e-10 >= h - a._startTime || (c[p++] = a)));
		for (r = p; --r > -1; )
			a = c[r], 2 === i && a._kill(n, t) && (o = !0), (2 !== i || !a._firstPT && a._initted) && a._enabled(!1, !1) && (o = !0);
		return o
	},
	H = function (t, e, n) {
		for (var i = t._timeline, s = i._timeScale, r = t._startTime; i._timeline; ) {
			if (r += i._startTime, s *= i._timeScale, i._paused)
				return -100;
			i = i._timeline
		}
		return r /= s,
		r > e ? r - e : n && r === e || !t._initted && 2e-10 > r - e ? 1e-10 : (r += t.totalDuration() / t._timeScale / s) > e ? 0 : r - e - 1e-10
	};
	i._init = function () {
		var t,
		e,
		n,
		i = this.vars,
		s = i.ease;
		if (i.startAt && (i.startAt.overwrite = 0, i.startAt.immediateRender = !0, C.to(this.target, 0, i.startAt)), this._ease = s ? s instanceof f ? i.easeParams instanceof Array ? s.config.apply(s, i.easeParams) : s : "function" == typeof s ? new f(s, i.easeParams) : m[s] || C.defaultEase : C.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
			for (t = this._targets.length; --t > -1; )
				this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], this._overwrittenProps ? this._overwrittenProps[t] : null) && (e = !0);
		else
			e = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps);
		if (e && C._onPluginEvent("_onInitAllProps", this), this._overwrittenProps && null == this._firstPT && "function" != typeof this.target && this._enabled(!1, !1), i.runBackwards)
			for (n = this._firstPT; n; )
				n.s += n.c, n.c = -n.c, n = n._next;
		this._onUpdate = i.onUpdate,
		this._initted = !0
	},
	i._initProps = function (t, e, n, i) {
		var s,
		r,
		o,
		a,
		l,
		u,
		h;
		if (null == t)
			return !1;
		this.vars.css || t.style && t.nodeType && k.css && this.vars.autoCSS !== !1 && N(this.vars, t);
		for (s in this.vars) {
			if (P[s]) {
				if (("onStartParams" === s || "onUpdateParams" === s || "onCompleteParams" === s || "onReverseCompleteParams" === s || "onRepeatParams" === s) && (l = this.vars[s]))
					for (r = l.length; --r > -1; )
						"{self}" === l[r] && (l = this.vars[s] = l.concat(), l[r] = this)
			} else if (k[s] && (a = new k[s])._onInitTween(t, this.vars[s], this)) {
				for (this._firstPT = u = {
						_next : this._firstPT,
						t : a,
						p : "setRatio",
						s : 0,
						c : 1,
						f : !0,
						n : s,
						pg : !0,
						pr : a._priority
					}, r = a._overwriteProps.length; --r > -1; )
					e[a._overwriteProps[r]] = this._firstPT;
				(a._priority || a._onInitAllProps) && (o = !0),
				(a._onDisable || a._onEnable) && (this._notifyPluginsOfEnabled = !0)
			} else
				this._firstPT = e[s] = u = {
					_next : this._firstPT,
					t : t,
					p : s,
					f : "function" == typeof t[s],
					n : s,
					pg : !1,
					pr : 0
				},
			u.s = u.f ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]),
			h = this.vars[s],
			u.c = "string" == typeof h && "=" === h.charAt(1) ? parseInt(h.charAt(0) + "1", 10) * Number(h.substr(2)) : Number(h) - u.s || 0;
			u && u._next && (u._next._prev = u)
		}
		return i && this._kill(i, t) ? this._initProps(t, e, n, i) : this._overwrite > 1 && this._firstPT && n.length > 1 && R(t, this, e, this._overwrite, n) ? (this._kill(e, t), this._initProps(t, e, n, i)) : o
	},
	i.render = function (t, e, n) {
		var i,
		s,
		r,
		o = this._time;
		if (t >= this._duration)
			this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (i = !0, s = "onComplete"), 0 === this._duration && ((0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && (n = !0), this._rawPrevTime = t);
		else if (0 >= t)
			this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === this._duration && this._rawPrevTime > 0) && (s = "onReverseComplete", i = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (n = !0), this._rawPrevTime = t)) : this._initted || (n = !0);
		else if (this._totalTime = this._time = t, this._easeType) {
			var a = t / this._duration,
			l = this._easeType,
			u = this._easePower;
			(1 === l || 3 === l && a >= .5) && (a = 1 - a),
			3 === l && (a *= 2),
			1 === u ? a *= a : 2 === u ? a *= a * a : 3 === u ? a *= a * a * a : 4 === u && (a *= a * a * a * a),
			this.ratio = 1 === l ? 1 - a : 2 === l ? a : .5 > t / this._duration ? a / 2 : 1 - a / 2
		} else
			this.ratio = this._ease.getRatio(t / this._duration);
		if (this._time !== o || n) {
			for (this._initted || (this._init(), !i && this._time && (this.ratio = this._ease.getRatio(this._time / this._duration))), this._active || this._paused || (this._active = !0), 0 === o && this.vars.onStart && (0 !== this._time || 0 === this._duration) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || d)), r = this._firstPT; r; )
				r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
			this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || d)),
			s && (this._gc || (i && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), e || this.vars[s] && this.vars[s].apply(this.vars[s + "Scope"] || this, this.vars[s + "Params"] || d)))
		}
	},
	i._kill = function (t, e) {
		if ("all" === t && (t = null), null == t && (null == e || e === this.target))
			return this._enabled(!1, !1);
		e = "string" != typeof e ? e || this._targets || this.target : C.selector(e) || e;
		var n,
		i,
		s,
		r,
		o,
		a,
		l,
		u;
		if ((e instanceof Array || E(e)) && "number" != typeof e[0])
			for (n = e.length; --n > -1; )
				this._kill(t, e[n]) && (a = !0);
		else {
			if (this._targets) {
				for (n = this._targets.length; --n > -1; )
					if (e === this._targets[n]) {
						o = this._propLookup[n] || {},
						this._overwrittenProps = this._overwrittenProps || [],
						i = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {}

						 : "all";
						break
					}
			} else {
				if (e !== this.target)
					return !1;
				o = this._propLookup,
				i = this._overwrittenProps = t ? this._overwrittenProps || {}

				 : "all"
			}
			if (o) {
				l = t || o,
				u = t !== i && "all" !== i && t !== o && (null == t || t._tempKill !== !0);
				for (s in l)
					(r = o[s]) && (r.pg && r.t._kill(l) && (a = !0), r.pg && 0 !== r.t._overwriteProps.length || (r._prev ? r._prev._next = r._next : r === this._firstPT && (this._firstPT = r._next), r._next && (r._next._prev = r._prev), r._next = r._prev = null), delete o[s]), u && (i[s] = 1)
			}
		}
		return a
	},
	i.invalidate = function () {
		return this._notifyPluginsOfEnabled && C._onPluginEvent("_onDisable", this),
		this._firstPT = null,
		this._overwrittenProps = null,
		this._onUpdate = null,
		this._initted = this._active = this._notifyPluginsOfEnabled = !1,
		this._propLookup = this._targets ? {}

		 : [],
		this
	},
	i._enabled = function (t, e) {
		if (t && this._gc)
			if (this._targets)
				for (var n = this._targets.length; --n > -1; )
					this._siblings[n] = D(this._targets[n], this, !0);
			else
				this._siblings = D(this.target, this, !0);
		return x.prototype._enabled.call(this, t, e),
		this._notifyPluginsOfEnabled && this._firstPT ? C._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
	},
	C.to = function (t, e, n) {
		return new C(t, e, n)
	},
	C.from = function (t, e, n) {
		return n.runBackwards = !0,
		n.immediateRender !== !1 && (n.immediateRender = !0),
		new C(t, e, n)
	},
	C.fromTo = function (t, e, n, i) {
		return i.startAt = n,
		n.immediateRender && (i.immediateRender = !0),
		new C(t, e, i)
	},
	C.delayedCall = function (t, e, n, i, s) {
		return new C(e, 0, {
			delay : t,
			onComplete : e,
			onCompleteParams : n,
			onCompleteScope : i,
			onReverseComplete : e,
			onReverseCompleteParams : n,
			onReverseCompleteScope : i,
			immediateRender : !1,
			useFrames : s,
			overwrite : 0
		})
	},
	C.set = function (t, e) {
		return new C(t, 0, e)
	},
	C.killTweensOf = C.killDelayedCallsTo = function (t, e) {
		for (var n = C.getTweensOf(t), i = n.length; --i > -1; )
			n[i]._kill(e, t)
	},
	C.getTweensOf = function (t) {
		if (null != t) {
			t = "string" != typeof t ? t : C.selector(t) || t;
			var e,
			n,
			i,
			s;
			if ((t instanceof Array || E(t)) && "number" != typeof t[0]) {
				for (e = t.length, n = []; --e > -1; )
					n = n.concat(C.getTweensOf(t[e]));
				for (e = n.length; --e > -1; )
					for (s = n[e], i = e; --i > -1; )
						s === n[i] && n.splice(e, 1)
			} else
				for (n = D(t).concat(), e = n.length; --e > -1; )
					n[e]._gc && n.splice(e, 1);
			return n
		}
	};
	var F = c("plugins.TweenPlugin", function (t, e) {
			this._overwriteProps = (t || "").split(","),
			this._propName = this._overwriteProps[0],
			this._priority = e || 0
		}, !0);
	if (i = F.prototype, F.version = 12, F.API = 2, i._firstPT = null, i._addTween = function (t, e, n, i, s, r) {
		var o,
		a;
		null != i && (o = "number" == typeof i || "=" !== i.charAt(1) ? Number(i) - n : parseInt(i.charAt(0) + "1", 10) * Number(i.substr(2))) && (this._firstPT = a = {
				_next : this._firstPT,
				t : t,
				p : e,
				s : n,
				c : o,
				f : "function" == typeof t[e],
				n : s || e,
				r : r
			}, a._next && (a._next._prev = a))
	}, i.setRatio = function (t) {
		for (var e, n = this._firstPT; n; )
			e = n.c * t + n.s, n.r && (e = e + (e > 0 ? .5 :  - .5) >> 0) , n.f ? n.t[n.p](e) : n.t[n.p] = e, n = n._next
		}, i._kill = function (t) {
			if (null != t[this._propName])
				this._overwriteProps = [];
			else
				for (var e = this._overwriteProps.length; --e > -1; )
					null != t[this._overwriteProps[e]] && this._overwriteProps.splice(e, 1);
			for (var n = this._firstPT; n; )
				null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
			return !1
		}, i._roundProps = function (t, e) {
			for (var n = this._firstPT; n; )
				(t[this._propName] || null != n.n && t[n.n.split(this._propName + "_").join("")]) && (n.r = e), n = n._next
		}, C._onPluginEvent = function (t, e) {
			var n,
			i = e._firstPT;
			if ("_onInitAllProps" === t) {
				for (var s, r, o, a; i; ) {
					for (a = i._next, s = r; s && s.pr > i.pr; )
						s = s._next;
					(i._prev = s ? s._prev : o) ? i._prev._next = i : r = i,
					(i._next = s) ? s._prev = i : o = i,
					i = a
				}
				i = e._firstPT = r
			}
			for (; i; )
				i.pg && "function" == typeof i.t[t] && i.t[t]() && (n = !0), i = i._next;
			return n
		}, F.activate = function (t) {
			for (var e = t.length; --e > -1; )
				t[e].API === F.API && (C._plugins[(new t[e])._propName] = t[e]);
			return !0
		}, e = t._gsQueue) {
			for (n = 0; e.length > n; n++)
				e[n]();
			for (i in l)
				l[i].func || t.console.log("GSAP encountered missing dependency: com.greensock." + i)
		}
	s = !1
}
(window), function (t) {
	function e(t, e, n, i, s) {
		this._listener = e,
		this._isOnce = n,
		this.context = i,
		this._signal = t,
		this._priority = s || 0
	}
	function n(t, e) {
		if ("function" != typeof t)
			throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", e))
	}
	function i() {
		this._bindings = [],
		this._prevParams = null
	}
	e.prototype = {
		active : !0,
		params : null,
		execute : function (t) {
			var e,
			n;
			return this.active && this._listener && (n = this.params ? this.params.concat(t) : t, e = this._listener.apply(this.context, n), this._isOnce && this.detach()),
			e
		},
		detach : function () {
			return this.isBound() ? this._signal.remove(this._listener, this.context) : null
		},
		isBound : function () {
			return !!this._signal && !!this._listener
		},
		getListener : function () {
			return this._listener
		},
		_destroy : function () {
			delete this._signal,
			delete this._listener,
			delete this.context
		},
		isOnce : function () {
			return this._isOnce
		},
		toString : function () {
			return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
		}
	},
	i.prototype = {
		VERSION : "0.8.1",
		memorize : !1,
		_shouldPropagate : !0,
		active : !0,
		_registerListener : function (t, n, i, s) {
			var r,
			o = this._indexOfListener(t, i);
			if (-1 !== o) {
				if (r = this._bindings[o], r.isOnce() !== n)
					throw Error("You cannot add" + (n ? "" : "Once") + "() then add" + (n ? "Once" : "") + "() the same listener without removing the relationship first.")
			} else
				r = new e(this, t, n, i, s), this._addBinding(r);
			return this.memorize && this._prevParams && r.execute(this._prevParams),
			r
		},
		_addBinding : function (t) {
			var e = this._bindings.length;
			do --e;
			while (this._bindings[e] && t._priority <= this._bindings[e]._priority);
			this._bindings.splice(e + 1, 0, t)
		},
		_indexOfListener : function (t, e) {
			for (var n, i = this._bindings.length; i--; )
				if (n = this._bindings[i], n._listener === t && n.context === e)
					return i;
			return -1
		},
		has : function (t, e) {
			return -1 !== this._indexOfListener(t, e)
		},
		add : function (t, e, i) {
			return n(t, "add"),
			this._registerListener(t, !1, e, i)
		},
		addOnce : function (t, e, i) {
			return n(t, "addOnce"),
			this._registerListener(t, !0, e, i)
		},
		remove : function (t, e) {
			n(t, "remove");
			var i = this._indexOfListener(t, e);
			return -1 !== i && (this._bindings[i]._destroy(), this._bindings.splice(i, 1)),
			t
		},
		removeAll : function () {
			for (var t = this._bindings.length; t--; )
				this._bindings[t]._destroy();
			this._bindings.length = 0
		},
		getNumListeners : function () {
			return this._bindings.length
		},
		halt : function () {
			this._shouldPropagate = !1
		},
		dispatch : function () {
			if (this.active) {
				var t,
				e = Array.prototype.slice.call(arguments),
				n = this._bindings.length;
				if (this.memorize && (this._prevParams = e), n) {
					t = this._bindings.slice(),
					this._shouldPropagate = !0;
					do
						n--;
					while (t[n] && this._shouldPropagate && t[n].execute(e) !== !1)
				}
			}
		},
		forget : function () {
			this._prevParams = null
		},
		dispose : function () {
			this.removeAll(),
			delete this._bindings,
			delete this._prevParams
		},
		toString : function () {
			return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
		}
	};
	var s = i;
	s.Signal = i,
	"function" == typeof define && define.amd ? define(function () {
		return s
	}) : "undefined" != typeof module && module.exports ? module.exports = s : t.signals = s
}
(this), this.Handlebars = {}, function (t) {
	t.VERSION = "1.0.0-rc.3",
	t.COMPILER_REVISION = 2,
	t.REVISION_CHANGES = {
		1 : "<= 1.0.rc.2",
		2 : ">= 1.0.0-rc.3"
	},
	t.helpers = {},
	t.partials = {},
	t.registerHelper = function (t, e, n) {
		n && (e.not = n),
		this.helpers[t] = e
	},
	t.registerPartial = function (t, e) {
		this.partials[t] = e
	},
	t.registerHelper("helperMissing", function (t) {
		if (2 === arguments.length)
			return void 0;
		throw Error("Could not find property '" + t + "'")
	});
	var e = Object.prototype.toString,
	n = "[object Function]";
	t.registerHelper("blockHelperMissing", function (i, s) {
		var r = s.inverse || function () {},
		o = s.fn,
		a = e.call(i);
		return a === n && (i = i.call(this)),
		i === !0 ? o(this) : i === !1 || null == i ? r(this) : "[object Array]" === a ? i.length > 0 ? t.helpers.each(i, s) : r(this) : o(i)
	}),
	t.K = function () {},
	t.createFrame = Object.create || function (e) {
		t.K.prototype = e;
		var n = new t.K;
		return t.K.prototype = null,
		n
	},
	t.logger = {
		DEBUG : 0,
		INFO : 1,
		WARN : 2,
		ERROR : 3,
		level : 3,
		methodMap : {
			0 : "debug",
			1 : "info",
			2 : "warn",
			3 : "error"
		},
		log : function (e, n) {
			if (e >= t.logger.level) {
				var i = t.logger.methodMap[e];
				"undefined" != typeof console && console[i] && console[i].call(console, n)
			}
		}
	},
	t.log = function (e, n) {
		t.logger.log(e, n)
	},
	t.registerHelper("each", function (e, n) {
		var i,
		s = n.fn,
		r = n.inverse,
		o = 0,
		a = "";
		if (n.data && (i = t.createFrame(n.data)), e && "object" == typeof e)
			if (e instanceof Array)
				for (var l = e.length; l > o; o++)
					i && (i.index = o), a += s(e[o], {
						data : i
					});
			else
				for (var u in e)
					e.hasOwnProperty(u) && (i && (i.key = u), a += s(e[u], {
							data : i
						}), o++);
		return 0 === o && (a = r(this)),
		a
	}),
	t.registerHelper("if", function (i, s) {
		var r = e.call(i);
		return r === n && (i = i.call(this)),
		!i || t.Utils.isEmpty(i) ? s.inverse(this) : s.fn(this)
	}),
	t.registerHelper("unless", function (e, n) {
		var i = n.fn,
		s = n.inverse;
		return n.fn = s,
		n.inverse = i,
		t.helpers["if"].call(this, e, n)
	}),
	t.registerHelper("with", function (t, e) {
		return e.fn(t)
	}),
	t.registerHelper("log", function (e, n) {
		var i = n.data && null != n.data.level ? parseInt(n.data.level, 10) : 1;
		t.log(i, e)
	})
}

var $, AbstractClass, Accessibility, AnimationPolyfill, ClassName, Cookie, DOM, FI, FontWatcher, Formatting, Helper, Input, LoadingIndicator, MAIN, Signal, Validation, log, moduleKeywords, namespace, optimizedTween, warn, __slice = [].slice, __indexOf = [].indexOf || function (t) {
	for (var e = 0, n = this.length; n > e; e++)
		if (e in this && this[e] === t)
			return e;
	return -1
}, __hasProp = {}

.hasOwnProperty, __extends = function (t, e) {
	function n() {
		this.constructor = t
	}
	for (var i in e)
		__hasProp.call(e, i) && (t[i] = e[i]);
	return n.prototype = e.prototype,
	t.prototype = new n,
	t.__super__ = e.prototype,
	t
}, __bind = function (t, e) {
	return function () {
		return t.apply(e, arguments)
	}
};
Helper = function () {
	function t() {}

	return t.type = function () {
		var t,
		e,
		n,
		i,
		s;
		for (n = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"], t = {}, i = 0, s = n.length; s > i; i++)
			e = n[i], t["[object " + e + "]"] = e.toLowerCase();
		return function (e) {
			var n;
			return n = Object.prototype.toString.call(e),
			t[n] || "object"
		}
	}
	(),
	t
}
(), 
log = function () {
	var t,
	e;
	e = arguments.length >= 1 ? __slice.call(arguments, 0) : [],
	t = "" + FI + " »",
	"undefined" != typeof DEBUG && DEBUG === !0 && null != console.log.apply && "undefined" != typeof console && null !== console && console.log.apply(console, [t].concat(__slice.call(e)))
}, 
namespace = function (t) {
	var e,
	n,
	i,
	s,
	r;
	if (n = FI, "string" == typeof t)
		for (r = t.split("."), i = 0, s = r.length; s > i; i++)
			e = r[i], n = null != n[e] ? n[e] : n[e] = {};
	return n
}, 
FI = this.foaw, null == FI && (FI = {}), $ = jQuery, Signal = signals.Signal, FI.PROJECT = namespace(""), FI.CORE = namespace("core"), FI.CLASSES = namespace("classes"), FI.CONTROLLERS = namespace("controllers"), FI.COMPONENTS = namespace("components"), FI.VIEWS = namespace("views"), FI.WIDGETS = namespace("widgets"), FI.ENUMS = namespace("enums"), FI.GLOBAL = namespace("global"), FI.MODELS = namespace("models"), FI.COLLECTIONS = namespace("collections"), FI.ROUTER = namespace("router"), FI.TEMPLATES = namespace("templates"), FI.UTILS = namespace("utils"), moduleKeywords = ["extended", "included", "class", "constructor"], AbstractClass = function () {
	function t() {}

	return t["class"] = "AbstractClass",
	t.prototype["class"] = function () {
		return this.constructor["class"]
	},
	t.extend = function (t) {
		var e,
		n,
		i;
		for (e in t)
			n = t[e], 0 > __indexOf.call(moduleKeywords, e) && (this[e] = n);
		return null != (i = t.extended) && i.apply(this),
		this
	},
	t.include = function (t) {
		var e,
		n,
		i;
		for (e in t)
			n = t[e], 0 > __indexOf.call(moduleKeywords, e) && (this.prototype[e] = n);
		return null != (i = t.included) && i.apply(this),
		this
	},
	t
}
(), 
FI.CORE.ComponentLoader = function (t) {
	function e() {
		e.__super__.constructor.apply(this, arguments),
		this.componentsInitialised = new Signal,
		this.scan()
	}
	return __extends(e, t),
	Signal = signals.Signal,
	e["class"] = "FI.CORE.ComponentLoader",
	e.prototype.componentsHash = {},
	e.prototype.availableComponents = [],
	e.prototype.registeredComponents = {},
	e.prototype.registeredForNotifications = [],
	e.prototype.visibleComponents = [],
	e.prototype.notifying = !1,
	e.prototype.componentsInitialised = null,
	e.prototype.scan = function (t) {
		var e,
		n,
		i,
		s,
		r,
		o,
		a,
		l,
		u,
		h,
		c,
		p,
		d,
		f;
		for (t = t || document.body, e = "component-", r = $("[class^='" + e + "']", t), h = 0, p = r.length; p > h; h++)
			if (s = r[h], u = "", o = $(s), !o.data("componentized"))
				for (n = o.attr("class").split(" "), c = 0, d = n.length; d > c; c++)
					i = n[c], l = i.indexOf(e), l > -1 && (u = i.slice(e.length), a = null != (f = this.componentsHash[u]) ? f : [], a.push(o), this.componentsHash[u] = a)
	},
	e.prototype.checkForNewComponents = function (t) {
		t = t || document.body,
		this.scan(t),
		this.initialiseComponents()
	},
	e.prototype.initialiseComponents = function () {
		var t,
		e,
		n,
		i,
		s,
		r,
		o,
		a,
		l,
		u,
		h,
		c;
		for (c = this.availableComponents, a = 0, u = c.length; u > a; a++)
			if (e = c[a], o = e.name, r = e.func, null != this.componentsHash[o])
				for (s = this.componentsHash[o], l = 0, h = s.length; h > l; l++)
					if (i = s[l], t = $(i), void 0 !== r && !t.data("componentized")) {
						if (t.data("componentized", !0), n = new r(i), this.registerComponentInstance(n, i), null == n.initialise || "function" !== Helper.type(n.initialise))
							throw "Component " + o + " does not have initialise method";
						n.initialise(),
						"function" === Helper.type(n.render) && (t.is(":visible") ? (n.render(), this.visibleComponents.push(n)) : this.registeredForNotifications.push(n))
					}
		this.componentsInitialised.dispatch()
	},
	e.prototype.registerComponentInstance = function (t, e) {
		var n,
		i;
		for (n = null, i = function () {
			return n = "foaw" + Math.floor(1e7 * Math.random())
		}, i(); null != this.registeredComponents[n]; )
			i();
		return t.id = n,
		t.context = e,
		$(e).data("componentId", n).attr("data-componentId", n),
		this.registeredComponents[n] = t,
		MAIN.sectionManager.monitorSection(t, e)
	},
	e.prototype.register = function (t, e) {
		if (null != this.availableComponents[t])
			throw "There is already a registered component named " + t;
		this.availableComponents.push({
			name : t,
			func : e
		})
	},
	e.prototype.findInstanceById = function (t) {
		return this.registeredComponents[t]
	},
	e.prototype.findInstanceByElement = function (t) {
		return this.registeredComponents[null != t ? t.data("componentId") : void 0]
	},
	e.prototype.getFunctionString = function (t, e) {
		return "GLOBAL.ComponentLoader.findInstanceById('" + e + "')." + t
	},
	e.prototype.notifyAll = function () {
		var t,
		e,
		n,
		i,
		s,
		r,
		o,
		a,
		l,
		u;
		if (!this.notifying) {
			for (this.notifying = !0, i = [], l = this.registeredForNotifications, n = s = 0, o = l.length; o > s; n = ++s)
				t = l[n], "function" === Helper.type(t.render) && $(t.context).is(":visible") && (t.render(), i.push(n), this.visibleComponents.push(t));
			for (; i.length; )
				this.registeredForNotifications.splice(i.pop(), 1);
			for (u = this.registeredComponents, r = 0, a = u.length; a > r; r++)
				t = u[r], e = this.visibleComponents.indexOf(t), $(t.context).is(":visible") && -1 === e ? (this.visibleComponents.push(t), "function" == typeof t.onShow && t.onShow()) : $(t.context).is(":hidden") && -1 !== e && (this.visibleComponents.splice(e, 1), "function" == typeof t.onHide && t.onHide());
			this.notifying = !1
		}
	},
	e
}
(AbstractClass), FontWatcher = function () {
	function t() {}

	var e,
	n,
	i;
	return e = "arial,'URW Gothic L',sans-serif",
	n = "Georgia,'Century Schoolbook L',serif",
	i = "BESbswy",
	t.REGISTERED = "registered",
	t.PROCESSING = "processing",
	t.RENDERED = "rendered",
	t.INACTIVE = "inactive",
	t.COMPLETE = "complete",
	t.fontStatus = new signals.Signal,
	t.globalStatus = new signals.Signal,
	t.fonts = {},
	t.register = function (e, n, i) {
		var s;
		return s = e.replace(/\s/, "") + n + i,
		null != t.fonts[s] ? (console.warn("[", e, n, i, "] has already been registered."), void 0) : (t.fonts[s] = {
				id : s,
				family : e,
				weight : n,
				style : i,
				started : !1,
				status : t.REGISTERED,
				serif : {
					initialSize : 0,
					previousSize : 0
				},
				sansSerif : {
					initialSize : 0,
					previousSize : 0
				}
			}, t.fontStatus.dispatch(t.REGISTERED, t.fonts[s]), void 0)
	},
	t.render = function () {
		var i,
		s,
		r;
		r = t.fonts;
		for (s in r)
			i = r[s], i.started === !1 && (i.started = (new Date).getTime(), i.status = t.PROCESSING, i.serif.element = t.createElement(i, "SERIF", n), i.sansSerif.element = t.createElement(i, "SANS_SERIF", e), i.serif.initialSize = i.serif.element.outerWidth(), i.sansSerif.initialSize = i.sansSerif.element.outerWidth(), t.fontStatus.dispatch(t.PROCESSING, i), t.checkFont(i))
	},
	t.checkFont = function (e) {
		var n,
		i,
		s,
		r,
		o;
		r = e.serif.element.outerWidth(),
		s = e.sansSerif.element.outerWidth(),
		n = e.sansSerif.initialSize !== s || e.serif.initialSize !== r,
		i = e.sansSerif.previousSize !== s && e.serif.previousSize !== r,
		o = (new Date).getTime(),
		n && i ? (e.serif.element.remove(), e.sansSerif.element.remove(), e.status = t.RENDERED, t.fontStatus.dispatch(t.RENDERED, e), t.processFonts()) : o - e.started >= 1e3 ? (e.serif.element.remove(), e.sansSerif.element.remove(), e.status = t.INACTIVE, t.fontStatus.dispatch(t.INACTIVE, e), t.processFonts()) : (e.sansSerif.previousSize = s, e.serif.previousSize = r, TweenLite.delayedCall(.025, t.checkFont, [e]))
	},
	t.processFonts = function () {
		var e,
		n,
		i,
		s;
		e = !0,
		s = t.fonts;
		for (i in s)
			n = s[i], (n.status === t.REGISTERED || n.status === t.PROCESSING) && (e = !1);
		e && t.globalStatus.dispatch(t.COMPLETE, t.fonts)
	},
	t.createElement = function (t, e, n) {
		var s;
		return s = $("<span id='" + e + "-" + t.id + "'>").text(i),
		s.css({
			margin : "0",
			padding : "0",
			left : "-200%",
			top : "-200%",
			width : "auto",
			height : "auto",
			position : "absolute",
			lineHeight : "normal",
			fontSize : "300px",
			fontVariant : "normal",
			fontFamily : "" + t.family + "," + n,
			fontWeight : t.weight,
			fontStyle : t.style
		}),
		$("body").prepend(s),
		s
	},
	t
}() 
Math.normalise = function (t, e, n) {
	return null == e && (e = 0),
	null == n && (n = 1),
	(t - e) / (n - e)
}, 
Math.normalize = Math.normalise, Math.interpolate = function (t, e, n) {
	return e + (n - e) * t
}, 
Math.map = function (t, e, n, i, s) {
	return Math.interpolate(Math.normalise(t, e, n), i, s)
}, 
FI.CORE.SectionManager = function (t) {
	function e(t, n) {
		this.context = t,
		this.options = n,
		this.onAnimationFrame = __bind(this.onAnimationFrame, this),
		this.onWindowScroll = __bind(this.onWindowScroll, this),
		this.onWindowLoad = __bind(this.onWindowLoad, this),
		this.hasScrolledIntoView = __bind(this.hasScrolledIntoView, this),
		this.stopSection = __bind(this.stopSection, this),
		this.startSection = __bind(this.startSection, this),
		this.checkVisibleSections = __bind(this.checkVisibleSections, this),
		this.updateSections = __bind(this.updateSections, this),
		this.addEventListeners = __bind(this.addEventListeners, this),
		this.monitorSection = __bind(this.monitorSection, this),
		e.__super__.constructor.apply(this, arguments),
		this.sectionVOs = [],
		this.addEventListeners()
	}
	return __extends(e, t),
	e["class"] = "CORE.SectionManager",
	e.prototype.previousScroll = null,
	e.prototype.sectionVOs = null,
	e.prototype.bodyHeight = null,
	e.prototype.bodyBottom = null,
	e.prototype.bodyTop = null,
	e.prototype.monitorSection = function (t, e) {
		var n,
		i,
		s,
		r;
		r = e.offset().top,
		i = e.height(),
		n = r + i,
		s = {
			instance : t,
			context : e,
			height : i,
			top : r,
			bottom : n,
			started : !1
		},
		this.sectionVOs.push(s),
		TweenLite.delayedCall(.1, this.updateSections)
	},
	e.prototype.addEventListeners = function () {
		$(window).on("scroll", this.onWindowScroll),
		$(window).on("load", this.onWindowLoad)
	},
	e.prototype.updateSections = function () {
		var t,
		e,
		n,
		i,
		s,
		r,
		o;
		for (o = this.sectionVOs, s = 0, r = o.length; r > s; s++)
			n = o[s], i = n.context.offset().top, e = n.context.height(), t = i + e, n.height = e, n.top = i, n.bottom = t
	},
	e.prototype.checkVisibleSections = function () {
		var t,
		e,
		n,
		i;
		for (i = this.sectionVOs, e = 0, n = i.length; n > e; e++)
			t = i[e], this.hasScrolledIntoView(t) ? this.startSection(t) : this.stopSection(t)
	},
	e.prototype.startSection = function (t) {
		null != t && (t.started || (log("start section:", t), t.instance.start(), t.started = !0, this.updateSections()))
	},
	e.prototype.stopSection = function (t) {
		null != t && t.started && (log("stop section:", t), t.instance.stop(), t.started = !1, this.updateSections())
	},
	e.prototype.hasScrolledIntoView = function (t) {
		var e;
		return e = Modernizr.touch ? 1e3 : 0,
		!(t.top > this.bodyBottom + e || t.bottom < this.bodyTop - e)
	},
	e.prototype.onWindowLoad = function () {
		TweenLite.delayedCall(.1, this.onWindowScroll)
	},
	e.prototype.onWindowScroll = function () {
		window.requestAnimationFrame(this.onAnimationFrame)
	},
	e.prototype.onAnimationFrame = function () {
		var t,
		e;
		t = null != (e = $(window).scrollTop()) ? e : null,
		t !== this.previousScroll && (this.previousScroll = t, this.bodyTop = $(window).scrollTop(), this.bodyHeight = parseInt(window.innerHeight), this.bodyBottom = this.bodyTop + this.bodyHeight, this.checkVisibleSections())
	},
	e
}
(AbstractClass), FI.CONTROLLERS.Controller = function (t) {
	function e(t) {
		this.context = t,
		this.controllerName = __bind(this.controllerName, this),
		this.initialise = __bind(this.initialise, this),
		e.__super__.constructor.apply(this, arguments),
		this.initialised = new Signal
	}
	return __extends(e, t),
	e["class"] = "FI.CONTROLLERS.Controller",
	e.controllerName = "abstract",
	e.prototype.context = null,
	e.prototype.initialised = null,
	e.prototype.initialise = function () {
		var t = this;
		log("controller initialised", "		name: " + this.controllerName()),
		Helper.delay(function () {
			return t.initialised.dispatch(t)
		})
	},
	e.prototype.controllerName = function () {
		return this.constructor.controllerName
	},
	e
}
(AbstractClass), FI.CONTROLLERS.Controllername = function (t) {
	function e(t) {
		this.context = t,
		this.addEventListeners = __bind(this.addEventListeners, this),
		this.onComponentsLoaded = __bind(this.onComponentsLoaded, this),
		this.layout = __bind(this.layout, this),
		this.initialise = __bind(this.initialise, this),
		e.__super__.constructor.apply(this, arguments)
	}
	return __extends(e, t),
	e["class"] = "FI.CONTROLLERS.Controllername",
	e.controllerName = "controllername",
	e.prototype.initialise = function () {
		e.__super__.initialise.apply(this, arguments),
		this.addEventListeners()
	},
	e.prototype.layout = function () {},
	e.prototype.onComponentsLoaded = function () {},
	e.prototype.addEventListeners = function () {},
	e
}
(FI.CONTROLLERS.Controller), AnimationPolyfill = function () {
	function t() {}

	return t.animate = function (t, e) {
		var n,
		i,
		s,
		r;
		for (s in e)
			r = e[s], i = "self" === s ? t : t.find(s), _.has(r, "start") && r.start(i), "none" !== r.method && (n = function () {
				switch (r.method) {
				case "from":
					return [r.from];
				case "to":
					return [r.to];
				case "fromTo":
					return [r.from, r.to];
				default:
					return []
				}
			}
				(), 0 !== n.length && TweenLite[r.method].apply(TweenLite, [i, r.time].concat(__slice.call(n))))
	},
	t.transitions = function (e, n) {
		t.cached = _.keys(n),
		e.on("addClass", function (e) {
			var i,
			s,
			r,
			o,
			a,
			l,
			u;
			for (i = $(e.target), l = t.cached, u = [], o = 0, a = l.length; a > o; o++)
				r = l[o], i.is(r) ? (s = n[r], u.push(t.animate(i, s))) : u.push(void 0);
			return u
		})
	},
	t.animations = function (t) {
		var e,
		n;
		for (e in t)
			n = t[e], n($(e))
	},
	t.events = function (t, e) {
		var n,
		i,
		s;
		null == e && (e = "mouseenter");
		for (s in t)
			i = t[s], n = $(s), n.on(e, i(n))
	},
	t
}
(), FI.CORE.Mediator = function (t) {
	function e(t) {
		this.context = t,
		this.unsubscribeAll = __bind(this.unsubscribeAll, this),
		this.unsubscribe = __bind(this.unsubscribe, this),
		this.subscribe = __bind(this.subscribe, this),
		e.__super__.constructor.apply(this, arguments)
	}
	return __extends(e, t),
	e["class"] = "FI.CORE.Mediator",
	e.prototype.messages = [],
	e.prototype.subscriptions = [],
	e.prototype.initialise = function () {},
	e.prototype.subscribe = function (t, e, n) {
		if (null != t && null != e && null != n)
			return this.subscriptions.push({
				observer : t,
				type : e,
				callback : n
			});
		throw log(t, e, n),
		new TypeError("Mediator: wrong subscription data")
	},
	e.prototype.unsubscribe = function (t, e, n) {
		var i;
		return null == n && (n = null),
		null != t ? this.subscriptions = function () {
			var n,
			s,
			r,
			o;
			for (r = this.subscriptions, o = [], n = 0, s = r.length; s > n; n++)
				i = r[n], (i.observer !== t || i.type !== e) && o.push(i);
			return o
		}
		.call(this) : void 0
	},
	e.prototype.unsubscribeAll = function (t) {
		var e;
		if (null != t)
			return this.subscriptions = function () {
				var n,
				i,
				s,
				r;
				for (s = this.subscriptions, r = [], n = 0, i = s.length; i > n; n++)
					e = s[n], e.observer !== t && r.push(e);
				return r
			}
		.call(this)
	},
	e.prototype.pushMessage = function (t, e) {
		var n,
		i,
		s,
		r,
		o;
		for (this.messages.push(e), r = this.subscriptions, o = [], i = 0, s = r.length; s > i; i++)
			n = r[i], n.type === t && o.push(n.callback(e));
		return o
	},
	e.prototype.popMessage = function () {
		return this.messages.pop()
	},
	e.prototype.getMessage = function (t) {
		return null != t && this.messages.length >= t ? this.messages[t] : void 0
	},
	e.prototype.getMessages = function () {
		return this.messages
	},
	e.prototype.getLastMessage = function () {
		return this.message
	},
	e
}
(AbstractClass), FI.PROJECT.Main = function (t) {
	function e() {
		this.onComponentsLoaded = __bind(this.onComponentsLoaded, this),
		this.addEventListeners = __bind(this.addEventListeners, this),
		this.onSharingLinkClick = __bind(this.onSharingLinkClick, this),
		this.initialiseComponents = __bind(this.initialiseComponents, this),
		this.initialise = __bind(this.initialise, this),
		e.__super__.constructor.apply(this, arguments),
		this.componentLoader = new FI.CORE.ComponentLoader,
		this.mediator = new FI.CORE.Mediator,
		this.sectionManager = new FI.CORE.SectionManager
	}
	return __extends(e, t),
	e["class"] = "PROJECT.Main",
	e.prototype.componentLoader = null,
	e.prototype.mediator = null,
	e.prototype.layoutManager = null,
	e.prototype.$header = null,
	e.prototype.$links = null,
	e.prototype.initialise = function () {
		log("initialised:", this["class"]()),
		this.$window = $(window),
		this.$body = $("body"),
		this.$header = $("#header"),
		this.$links = this.$header.find("li.social a"),
		this.$dummyLink = this.$body.find(".dummy-link"),
		this.addEventListeners(),
		this.initialiseComponents()
	},
	e.prototype.initialiseComponents = function () {
		this.componentLoader.initialiseComponents()
	},
	e.prototype.onSharingLinkClick = function (t) {
		var e,
		n,
		i,
		s,
		r,
		o,
		a,
		l,
		u,
		h;
		t.preventDefault(),
		e = $(t.currentTarget).parent(),
		u = encodeURIComponent(window.location),
		h = encodeURIComponent("The Future of Airline Websites by @F_i"),
		i = "",
		r = null,
		o = 600,
		n = 438,
		a = .5 * Math.round(screen.width - o),
		l = .4 * Math.round(screen.height - n),
		s = "personalbar=0,toolbar=0,status=0,scrollbars=1,resizable=1",
		s += ",left=" + a + ",top=" + l + ",width=" + o + ",height=" + n,
		e.hasClass("facebook") ? (r = "http://www.facebook.com/sharer.php", r += "?u=" + u, r += "&t=" + h) : e.hasClass("twitter") ? (r = "https://twitter.com/intent/tweet", r += "?original_referer=" + u, r += "&source=tweetbutton", r += "&text=" + h + ": ", r += "&url=" + u) : e.hasClass("google-plus") && (r = "http://plus.google.com/share", r += "?url=" + u, r += "&text=" + h),
		r && window.open(r, i, s)
	},
	e.prototype.addEventListeners = function () {
		this.$links.on("click", this.onSharingLinkClick),
		this.$dummyLink.on("click", function (t) {
			return t.preventDefault()
		}),
		this.componentLoader.componentsInitialised.add(this.onComponentsLoaded),
		Modernizr.csstransitions || (AnimationPolyfill.transitions(this.$body, FI.ENUMS.Transitions), AnimationPolyfill.animations(FI.ENUMS.Animations)),
		AnimationPolyfill.events(FI.ENUMS.Hovers)
	},
	e.prototype.onComponentsLoaded = function () {
		log("Components loaded"),
		this.$body.scrollTop(0)
	},
	e
}
(AbstractClass), MAIN = new FI.PROJECT.Main(document.body), FI.COMPONENTS.Component = function (t) {
	function e(t, n) {
		this.context = t,
		this.stop = __bind(this.stop, this),
		this.start = __bind(this.start, this),
		this.layout = __bind(this.layout, this),
		this.render = __bind(this.render, this),
		e.__super__.constructor.apply(this, arguments),
		this.initialised = new Signal,
		this.rendered = new Signal,
		this.options = $.extend(!0, {}, this.options),
		$(this.context).data("options") && (this.options = $.extend(!0, {}, this.options, $(this.context).data("options"))),
		n && (this.options = $.extend(!0, {}, this.options, n))
	}
	return __extends(e, t),
	e["class"] = "FI.COMPONENTS.Component",
	e.componentName = "abstract",
	e.prototype.id = "",
	e.prototype.context = null,
	e.prototype.options = null,
	e.prototype.initialised = null,
	e.prototype.rendered = null,
	e.prototype.hasStarted = null,
	e.prototype.componentName = function () {
		return this.constructor.componentName
	},
	e.prototype.initialise = function () {
		this.context.data("componentized") || MAIN.componentLoader.registerComponentInstance(this, this.context),
		this.addSignalListeners(),
		log("component initialised", "			name: " + this.componentName() + "		id: " + this.id)
	},
	e.prototype.addSignalListeners = function () {
		this.rendered.add(this.layout)
	},
	e.prototype.render = function () {
		log("component rendered", "			name: " + this.componentName() + "		id: " + this.id)
	},
	e.prototype.layout = function () {
		log("component layout", "			name: " + this.componentName() + "		id: " + this.id)
	},
	e.prototype.start = function () {
		this.hasStarted || (this.hasStarted = !0)
	},
	e.prototype.stop = function () {},
	e
}
(AbstractClass), FI.COMPONENTS.AbstractSlider = function (t) {
	function e(t) {
		this.context = t,
		this.stop = __bind(this.stop, this),
		this.start = __bind(this.start, this),
		this.scrollToTarget = __bind(this.scrollToTarget, this),
		this.addEventListeners = __bind(this.addEventListeners, this),
		this.onSlide = __bind(this.onSlide, this),
		e.__super__.constructor.apply(this, arguments),
		this.$slider = this.context.find(".slider"),
		this.max = this.context.data("max"),
		this.min = this.context.data("min"),
		this.step = this.context.data("step"),
		this.value = this.context.data("value"),
		this.range = this.context.data("range"),
		this.stepSize = this.context.data("step-size"),
		this.context.data("step-values") && (this.stepValues = this.context.data("step-values").split(",")),
		this.offsetTop = this.context.data("offset-top"),
		this.context.hasClass("vertical") && (this.direction = "vertical"),
		this.slider = this.$slider.slider({
				orientation : this.direction,
				value : this.value,
				min : this.min,
				max : this.max,
				step : this.step,
				range : this.range,
				stepValues : this.stepValues,
				animate : !0,
				slide : this.onSlide
			}),
		this.addEventListeners()
	}
	return __extends(e, t),
	e["class"] = "FI.COMPONENTS.AbstractSlider",
	e.componentName = "abstract-slider",
	e.prototype.slider = null,
	e.prototype.$slider = null,
	e.prototype.direction = "horizontal",
	e.prototype.signal = null,
	e.prototype.stepSize = 0,
	e.prototype.max = 0,
	e.prototype.min = 0,
	e.prototype.step = 1,
	e.prototype.offsetTop = 0,
	e.prototype.offsetBottom = 0,
	e.prototype.onSlide = function (t, e) {
		return "vertical" === this.direction ? this.scrollToTarget(this.max - e.value) : this.scrollToTarget(e.value)
	},
	e.prototype.addEventListeners = function () {},
	e.prototype.scrollToTarget = function () {},
	e.prototype.start = function () {
		var t = this;
		setTimeout(function () {
			return log("adding class"),
			t.context.addClass("is-active")
		}, 300)
	},
	e.prototype.stop = function () {
		this.context.removeClass("is-active")
	},
	MAIN.componentLoader.register(e.componentName, e),
	e
}
(FI.COMPONENTS.Component), FI.COMPONENTS.Section = function (t) {
	function e(t) {
		this.context = t,
		this.stop = __bind(this.stop, this),
		this.start = __bind(this.start, this),
		e.__super__.constructor.apply(this, arguments),
		this.$separator = this.context.find(".separator"),
		this.$separator.addClass("animate-start")
	}
	return __extends(e, t),
	e["class"] = "FI.COMPONENTS.Section",
	e.componentName = "section",
	e.prototype.$separator = null,
	e.prototype.arrowItems = null,
	e.prototype.start = function () {
		var t = this;
		this.context.addClass("is-active"),
		_.delay(function () {
			return t.$separator.addClass("animate-in").removeClass("animate-start")
		}, 500)
	},
	e.prototype.stop = function () {
		this.context.removeClass("is-active")
	},
	MAIN.componentLoader.register(e.componentName, e),
	e
}
(FI.COMPONENTS.Component), FI.COMPONENTS.AdvancedTrip = function (t) {
	function e(t) {
		this.context = t,
		this.animateOut = __bind(this.animateOut, this),
		this.animateIn = __bind(this.animateIn, this),
		this.loadImages = __bind(this.loadImages, this),
		this.render = __bind(this.render, this),
		this.stop = __bind(this.stop, this),
		this.start = __bind(this.start, this),
		this.initialise = __bind(this.initialise, this),
		e.__super__.constructor.apply(this, arguments),
		this.$advancedTrip = this.context.find(".advanced-trip"),
		this.$zoomShadow = this.context.find(".zoom-shadow"),
		this.$hoverState1 = this.context.find(".hover-state-1"),
		this.$cursor = this.context.find(".cursor"),
		this.$hoverState2 = this.context.find(".hover-state-2"),
		this.$arrow = this.context.find(".arrow-anim"),
		this.arrow = new FI.UTILS.ArrowAnim(this.context.find(".arrow-anim").eq(0))
	}
	var n,
	i,
	s,
	r,
	o,
	a,
	l;
	return __extends(e, t),
	e["class"] = "FI.COMPONENTS.AdvancedTrip",
	e.componentName = "advanced-trip",
	l = 0,
	n = null,
	o = null,
	s = null,
	i = null,
	r = null,
	a = null,
	e.prototype.initialise = function () {
		e.__super__.initialise.apply(this, arguments)
	},
	e.prototype.start = function () {
		e.__super__.start.apply(this, arguments),
		0 === this.numImagesToLoad ? this.animateIn() : this.loadImages()
	},
	e.prototype.stop = function (t) {
		null == t && (t = .5),
		e.__super__.stop.apply(this, arguments),
		this.numImagesToLoad = null,
		this.animateOut()
	},
	e.prototype.render = function () {
		e.__super__.render.apply(this, arguments),
		this.$advancedTrip.addClass("animate-start"),
		this.$zoomShadow.addClass("animate-start"),
		this.$hoverState1.addClass("animate-start"),
		this.$cursor.addClass("animate-start"),
		this.$hoverState2.addClass("animate-start")
	},
	e.prototype.loadImages = function () {
		var t,
		e,
		n,
		i,
		s,
		r,
		o = this;
		for (e = this.context.find(".component-lazyload"), this.numImagesToLoad = e.size(), s = 0, r = e.length; r > s; s++)
			n = e[s], t = $(n), i = MAIN.componentLoader.findInstanceById(t.data("componentid")), i.loadImage(function () {
				return o.numImagesToLoad--,
				0 === o.numImagesToLoad ? o.animateIn() : void 0
			})
	},
	e.prototype.animateIn = function () {
		this.context.addClass("animate-in"),
		this.$advancedTrip.removeClass("animate-start").addClass("animate-in"),
		this.$zoomShadow.removeClass("animate-start").addClass("animate-in"),
		this.$hoverState1.removeClass("animate-start").addClass("animate-in"),
		this.$cursor.removeClass("animate-start").addClass("animate-in"),
		this.$hoverState2.removeClass("animate-start").addClass("animate-in"),
		this.arrow.initialize(.5, 1.9)
	},
	e.prototype.animateOut = function () {
		this.$advancedTrip.addClass("animate-start").removeClass("animate-in"),
		this.$zoomShadow.addClass("animate-start").removeClass("animate-in"),
		this.$hoverState1.addClass("animate-start").removeClass("animate-in"),
		this.$cursor.addClass("animate-start").removeClass("animate-in"),
		this.$hoverState2.addClass("animate-start").removeClass("animate-in"),
		this.arrow.reset()
	},
	MAIN.componentLoader.register(e.componentName, e),
	e
}
(FI.COMPONENTS.Section), FI.COMPONENTS.Introduction = function (t) {
	function e(t) {
		this.context = t,
		this.animateIn = __bind(this.animateIn, this),
		this.loadImages = __bind(this.loadImages, this),
		this.stop = __bind(this.stop, this),
		this.start = __bind(this.start, this),
		e.__super__.constructor.apply(this, arguments),
		this.$componentBody = this.context.find(".component-body"),
		this.$componentLoader = this.context.find(".component-loader")
	}
	var n,
	i,
	s,
	r,
	o,
	a;
	return __extends(e, t),
	e["class"] = "FI.COMPONENTS.Introduction",
	e.componentName = "introduction",
	a = 0,
	n = null,
	i = null,
	o = 0,
	s = 0,
	r = 0,
	e.prototype.start = function () {
		e.__super__.start.apply(this, arguments),
		Modernizr.touch || (this.$componentLoader.css("opacity", 1), 0 === this.numImagesToLoad ? this.animateIn() : this.loadImages())
	},
	e.prototype.stop = function () {
		e.__super__.stop.apply(this, arguments)
	},
	e.prototype.loadImages = function () {
		var t,
		e,
		n,
		i,
		s,
		r,
		o = this;
		for (this.loadingStartTime = (new Date).getTime(), this.loadingMinTime = 1200, e = this.context.find(".component-lazyload"), this.numImagesToLoad = e.size(), s = 0, r = e.length; r > s; s++)
			n = e[s], t = $(n), i = MAIN.componentLoader.findInstanceById(t.data("componentid")), i.loadImage(function () {
				var t,
				e;
				return o.numImagesToLoad--,
				0 === o.numImagesToLoad ? (o.loadingEndTime = (new Date).getTime(), t = o.loadingEndTime - o.loadingStartTime, e = Math.round(Math.max(0, o.loadingMinTime - t)), o.animateIn(e)) : void 0
			})
	},
	e.prototype.animateIn = function (t) {
		this.$componentBody.css("-webkit-transition-delay", t + "ms").css("opacity", 1)
	},
	MAIN.componentLoader.register(e.componentName, e),
	e
}
(FI.COMPONENTS.Section), FI.COMPONENTS.LazyLoad = function (t) {
	function e(t) {
		this.$context = t,
		this.unloadImage = __bind(this.unloadImage, this),
		this.loadImage = __bind(this.loadImage, this),
		this.layout = __bind(this.layout, this),
		this.stop = __bind(this.stop, this),
		this.start = __bind(this.start, this),
		this.render = __bind(this.render, this),
		this.initialise = __bind(this.initialise, this),
		e.__super__.constructor.apply(this, arguments),
		this.src = this.$context.data("src"),
		this.alt = this.$context.data("alt"),
		this.autoLoad = this.$context.data("auto-load"),
		this.override = this.$context.data("override"),
		void 0 === this.override && (this.override = !1),
		this.hasLoadedImage = !1,
		this.override && this.start()
	}
	var n;
	return __extends(e, t),
	n = {
		duration : 1.5,
		css : {
			opacity : 1
		}
	},
	e["class"] = "FI.COMPONENTS.LazyLoad",
	e.componentName = "lazyload",
	e.prototype.src = null,
	e.prototype.alt = null,
	e.prototype.hasLoadedImage = !1,
	e.prototype.initialise = function () {
		e.__super__.initialise.apply(this, arguments),
		this.render()
	},
	e.prototype.render = function () {
		e.__super__.render.apply(this, arguments),
		this.$context.css({
			height : this.$context.data("height"),
			width : this.$context.data("width")
		})
	},
	e.prototype.start = function () {
		log("start lazy load"),
		this.autoLoad && this.loadImage()
	},
	e.prototype.stop = function () {
		this.override === !1 && this.unloadImage()
	},
	e.prototype.layout = function () {
		e.__super__.layout.apply(this, arguments)
	},
	e.prototype.loadImage = function (t) {
		var e,
		n = this;
		log("loadImage >>>>>>>> " + this.src),
		this.hasLoadedImage || (this.hasLoadedImage = !0, e = $("<div class='lazy'></div>"), e.css({
				"background-image" : "url(" + this.src + ")",
				"background-repeat" : "no-repeat",
				position : "relative",
				height : this.$context.data("height"),
				width : this.$context.data("width")
			}), this.$context.append(e)),
		this.$context.imagesLoaded(function () {
			return n.$context.addClass("loaded"),
			null != t ? t() : void 0
		})
	},
	e.prototype.unloadImage = function () {
		return this.hasLoadedImage = !1,
		this.$context.removeClass("loaded").empty()
	},
	MAIN.componentLoader.register(e.componentName, e),
	e
}
(FI.COMPONENTS.Component), FI.COMPONENTS.Marquee = function (t) {
	function e(t) {
		this.context = t,
		this.onResize = __bind(this.onResize, this),

		this.ex_alert = __bind(this.ex_alert, this),
		
		this.onTouchMouseEnd_start = __bind(this.onTouchMouseEnd_start, this),
		this.onTouchMouseMove_start = __bind(this.onTouchMouseMove_start, this),
		this.onTouchMouseDown_start = __bind(this.onTouchMouseDown_start, this),

		this.onTouchMouseEnd = __bind(this.onTouchMouseEnd, this),
		this.onTouchMouseMove = __bind(this.onTouchMouseMove, this),
		this.onTouchMouseDown = __bind(this.onTouchMouseDown, this),
		
		this.resetDestinationHandleText = __bind(this.resetDestinationHandleText, this),
		
		this.setDestinationTo = __bind(this.setDestinationTo, this),
		this.setDestinationTo_2 = __bind(this.setDestinationTo_2, this),

		this.intersects = __bind(this.intersects, this),
		this.getClosestDestination = __bind(this.getClosestDestination, this),
		this.drawRotatedImage = __bind(this.drawRotatedImage, this),
		this.animateAirplane = __bind(this.animateAirplane, this),
		this.animateArc = __bind(this.animateArc, this),
		this.destroyArc = __bind(this.destroyArc, this),

		this.op_map = __bind(this.op_map, this),
		this.map_zoomin = __bind(this.map_zoomin, this),
		this.map_zoomout = __bind(this.map_zoomout, this),

		this.move_ac1 = __bind(this.move_ac1, this),
		this.move_ac2 = __bind(this.move_ac2, this),

		this.setHandlePosition = __bind(this.setHandlePosition, this),
		this.setHandlePosition_2 = __bind(this.setHandlePosition_2, this),

		this.update = __bind(this.update, this),
		this.update_2 = __bind(this.update_2, this),

		this.stopRequestAnimationFrame = __bind(this.stopRequestAnimationFrame, this),
		this.startRequestAnimationFrame = __bind(this.startRequestAnimationFrame, this),
		this.stopRequestAnimationFrame_2 = __bind(this.stopRequestAnimationFrame_2, this),
		this.startRequestAnimationFrame_2 = __bind(this.startRequestAnimationFrame_2, this),

		this.addEventListeners = __bind(this.addEventListeners, this),
		this.stop = __bind(this.stop, this),
		this.start = __bind(this.start, this),
		this.layout = __bind(this.layout, this),
		this.render = __bind(this.render, this),
		this.cacheValues = __bind(this.cacheValues, this),
		this.assetsLoaded = __bind(this.assetsLoaded, this),
		this.initialise = __bind(this.initialise, this),
		e.__super__.constructor.apply(this, arguments),

		this.$introduction = $('#introduction'),
		this.$casestudy = $('#case-study'),
		this.$canvas = this.context.find("#marquee-line"),
		
		Modernizr.canvas && (this.ctx = this.$canvas.get(0).getContext("2d")),
		this.$departureHandle = this.context.find(".departure-handle"),

		this.$destinationHandle = this.context.find(".destination-handle"),
		this.$destinationHandle_2 = this.context.find(".destination-handle_2"),

		this.$destinationHandleContent = this.$destinationHandle.find(".destination-handle-content"),
		this.$destinationHandleContent_2 = this.$destinationHandle_2.find(".destination-handle-content_2"),

		this.$airplane = this.context.find(".marquee-airplane"),
		this.$destinations = this.context.find(".city"),

		this.origTextDestinationCity = this.$destinationHandle.find(".destination-city").data("default-value"),
		this.origTextDestinationCity_2 = this.$destinationHandle_2.find(".destination-city_2").data("default-value-start"),

		this.origTextDestinationPrice = this.$destinationHandle.find(".destination-price").data("default-value"),
		this.origTextDestinationPrice_2 = this.$destinationHandle_2.find(".destination-price_2").data("default-value"),

		this.cacheValues(),
		$("html").hasClass("ie8") || (this.airplane = this.$airplane.get(0), this.airplane.onLoad = this.assetsLoaded()),
		$("html").hasClass("ie9") && $(".component-marquee").on("selectstart", function (t) {
			return t.preventDefault(),
			!1
		}),
		log("Starting the Marquee component")
	}
	return __extends(e, t),
	e["class"] = "FI.COMPONENTS.Marquee",
	e.componentName = "marquee",
	e.prototype.doAnimate = !1,
	e.prototype.isMouseDown = !1,
	e.prototype.isMouseDragging = !1,
	e.prototype.isTouchDragging = !1,
	e.prototype.prefixedTransform = Modernizr.prefixed("transform"),
	e.prototype.handleHeight = null,
	e.prototype.handleWidth = null,
	e.prototype.mouseX = 0,
	e.prototype.mouseY = 0,
	e.prototype.mouseOffsetX = 0,
	e.prototype.mouseOffsetY = 0,

	e.prototype.destinationX = 0,
	e.prototype.destinationY = 0,
	e.prototype.destinationX_2 = 0,
	e.prototype.destinationY_2 = 0,
	
	e.prototype.destinationHandleXVal = 0,
	e.prototype.destinationHandleYVal = 0,
	e.prototype.destinationHandleXValPercent = 0,
	e.prototype.destinationHandleYValPercent = 0,
	e.prototype.destinationHandleXVal_2 = 0,
	e.prototype.destinationHandleYVal_2 = 0,
	e.prototype.destinationHandleXValPercent_2 = 0,
	e.prototype.destinationHandleYValPercent_2 = 0,

	e.prototype.desx_resize = 0,
	e.prototype.desy_resize = 0,
	e.prototype.map_oftop = 0,
	e.prototype.map_opleft = 0,
	// e.prototype.bd_map = 0,
	e.prototype.zo = 0,
	e.prototype.zo_map = [["map0", 1440, 1456],["map1", 1000, 1001],["map2", 500, 506]],
	
	e.prototype.departureX = 0,
	e.prototype.departureY = 0,
	e.prototype.tweenToPointX = 0,
	e.prototype.tweenToPointY = 0,
	e.prototype.translateCenter = null,
	e.prototype.radius = 20,
	e.prototype.dispatchedNewTarget = !0,
	e.prototype.dispatchedTextReset = !1,
	e.prototype.onTarget = !1,
	e.prototype.onTarget_2 = !1,
	e.prototype.origTextDestinationCity = null,
	e.prototype.origTextDestinationCity_2 = null,
	e.prototype.origTextDestinationPrice = null,
	e.prototype.origTextDestinationPrice_2 = null,
	e.prototype.lineAnimation = null,
	e.prototype.airplane = null,
	e.prototype.enableRequestAnimationFrame = !1,
	e.prototype.enableRequestAnimationFrame_2 = !1,
	e.prototype.ctx = null,
	e.prototype.$canvas = null,
	e.prototype.$destinations = null,
	e.prototype.$depatureHandle = null,

	e.prototype.$destinationHandle = null,
	e.prototype.$destinationHandle_2 = null,

	e.prototype.$closestDestination = null,
	e.prototype.$closestDestination_2 = null,

	e.prototype.$activeDestination = null,
	e.prototype.$activeDestination_2 = null,


	e.prototype.initialise = function () {
		e.__super__.initialise.apply(this, arguments),
		this.initialised.dispatch(this.id)
	},
	e.prototype.assetsLoaded = function () {
		log("Marquee assets loaded"),
		this.addEventListeners(),
		this.op_map()
	},
	
	e.prototype.op_map = function(){
		$('#zoomInButton').on('click',this.map_zoomin),
		$('#zoomOutButton').on('click',this.map_zoomout)
		
		// move map
			if(this.$casestudy.length > 0){
				nice_map = this.$casestudy.niceScroll({
					touchbehavior: true,
					cursorcolor: 'none',
					background: 'none',
					cursorborder: 'none'
				}).scrollend(function(info){
					map_oftop = info.current.y;
					map_opleft = info.current.x;
				});
				map_oftop = nice_map.getScrollTop();
				map_opleft = nice_map.getScrollLeft();
			}
		// end move map

	},
	e.prototype.map_zoomin = function (){
		var w1, h1, w, h, percen;
		w1 = this.$introduction.width(),
		h1 = this.$introduction.height(),
		this.zo>0 ? (
			this.zo--, 
			this.$introduction.css({width: this.zo_map[this.zo][1], height: this.zo_map[this.zo][2]}), 
			$('.bg img').attr('src','images/bg/'+this.zo_map[this.zo][0]+'.jpg'), 
			this.$casestudy.getNiceScroll().resize(), 
			w = this.$introduction.width(),	
			h = this.$introduction.height(),
			percen =(w*100/w1)
		) : void 0,
   		
   		this.zo_map[this.zo][1] < show_map_w ? this.$casestudy.width(this.zo_map[this.zo][1]) : this.$casestudy.width('100%'), 

   		this.bd_map = {
   			x : this.$casestudy.offset().left,
   			y : this.$casestudy.offset().top
   		},
   		this.move_ac1(percen), 
		this.move_ac2(percen)
	},
	e.prototype.map_zoomout = function (){
		console.log(this.$closestDestination);
		var w1, h1, w, h, percen;
		w1 = this.$introduction.width(),
		h1 = this.$introduction.height(),
   		
   		this.zo<2 ? (this.zo++, this.$introduction.css({width: this.zo_map[this.zo][1], height: this.zo_map[this.zo][2]}), $('.bg img').attr('src','images/bg/'+this.zo_map[this.zo][0]+'.jpg'), this.$casestudy.getNiceScroll().resize(), w = this.$introduction.width(),	h = this.$introduction.height(), percen =(w*100/w1)) : void 0,

   		this.zo_map[this.zo][1] < map_w ? this.$casestudy.width(this.zo_map[this.zo][1]) : void 0,
   		this.bd_map = {
   			x : this.$casestudy.offset().left,
   			y : this.$casestudy.offset().top
   		},
   		this.move_ac1(percen), 
   		this.move_ac2(percen)
        
	},
	e.prototype.move_ac1 = function (p){

		var t,
		e,
		n,
		i,
		s;
		this.$activeDestination == null ? (
				this.Offsets_ac1 = {
					x : this.$destinationHandle.offset().left,
					y : this.$destinationHandle.offset().top
				}, 
				this.setHandlePosition(
					(this.Offsets_ac1.x-this.bd_map.x)*(p/100), 
					this.Offsets_ac1.y*(p/100))
			) : (
				this.Offsets_ac1 = {
					x : this.$activeDestination.offset().left,
					y : this.$activeDestination.offset().top
				},
		
				this.doAnimate === !0 ? (
						this.destinationX=this.Offsets_ac1.x,
						this.destinationY=this.Offsets_ac1.y  + 15,
						n = this.$closestDestination.offset(),
						console.log(this.$closestDestination),
						
						t = n.left += this.destinationWidth / 2 - 3 + map_opleft, 
						e = n.top -= this.destinationHeight - 34 - map_oftop, 
						i = this.intersects(this.destinationX, this.destinationY, t, e, this.radius),
						console.log(i),
						i ? (this.destinationX = Math.round(t) - this.bd_map.x,
								this.destinationY = Math.round(e)-5,
								this.$destinationHandleContent.removeClass("is-active"),
								!this.dispatchedNewTarget || (this.$destinationHandleContent.addClass("is-on-destination"),
								this.$destinationHandleContent.removeClass("to-left"),
								this.setDestinationTo(this.$closestDestination),
								this.onTarget = !0,
								this.dispatchedNewTarget = !0,
								this.dispatchedTextReset = !1,
								this.setHandlePosition(this.destinationX, this.destinationY),
								((this.onTarget_2)?this.animateArc(this.destinationX, this.destinationY):"" ))
							) : void 0,
							(this.isMouseDragging || this.isTouchDragging) && this.setHandlePosition(this.destinationX, this.destinationY),
							this.enableRequestAnimationFrame ? requestAnimationFrame(this.update) : void 0) : void 0)
	},
	e.prototype.move_ac2 = function (p){
		var t,
		e,
		n,
		i,
		s;

		this.$activeDestination_2 == null ? (
				this.Offsets_ac2 = {
					x : this.$destinationHandle_2.offset().left,
					y : this.$destinationHandle_2.offset().top
				}, 
				this.setHandlePosition_2(
					(this.Offsets_ac2.x - this.bd_map.x)*(p/100), 
					this.Offsets_ac2.y*(p/100)
				)
			) : (
				this.Offsets_ac2 = {
					x : this.$activeDestination_2.offset().left,
					y : this.$activeDestination_2.offset().top
				},

				this.doAnimate === !0 ? (
						this.destinationX_2=this.Offsets_ac2.x,
						this.destinationY_2=this.Offsets_ac2.y + 15,
						n = this.$closestDestination_2.offset(),
						t = n.left += this.destinationWidth / 2 - 3 + map_opleft, 
						e = n.top -= this.destinationHeight - 34 - map_oftop, 
						i = this.intersects(this.destinationX_2, this.destinationY_2, t, e, this.radius),
						console.log(i),
						i ? (this.destinationX_2 = Math.round(t) - this.bd_map.x,
								this.destinationY_2 = Math.round(e)-5,
								this.$destinationHandleContent_2.removeClass("is-active"),
								!this.dispatchedNewTarget || (this.$destinationHandleContent_2.addClass("is-on-destination"),
								this.$destinationHandleContent_2.removeClass("to-left"),
								this.setDestinationTo_2(this.$closestDestination_2),
								this.onTarget_2 = !0,
								this.dispatchedNewTarget = !0,
								this.dispatchedTextReset = !1,
								this.setHandlePosition_2(this.destinationX_2, this.destinationY_2),
								this.departureX = this.destinationX_2,
								this.departureY = this.destinationY_2-3,
								this.translateCenter = {
									x : this.departureX,
									y : this.departureY
								},
								((this.onTarget)?this.animateArc(this.destinationX, this.destinationY):"" ))
							) : void 0,
							(this.isMouseDragging || this.isTouchDragging) && this.setHandlePosition_2(this.destinationX_2, this.destinationY_2),
							this.enableRequestAnimationFrame ? requestAnimationFrame(this.update) : void 0) : void 0)
	},
	e.prototype.cacheValues = function () {
		this.canvasOffsets = {
			x : this.$canvas.offset().left,
			y : this.$canvas.offset().top
		},
		this.handleHeight = this.$destinationHandle.height(),
		this.handleWidth = this.$destinationHandle.width(),

		this.handleHeight_2 = this.$destinationHandle_2.height(),
		this.handleWidth_2 = this.$destinationHandle_2.width(),

		this.destinationHeight = this.$destinations.eq(0).outerHeight(),
		this.destinationWidth = this.$destinations.eq(0).outerWidth()
	},
	e.prototype.render = function () {
		e.__super__.render.apply(this, arguments),
		this.rendered.dispatch(this.id)
	},
	e.prototype.layout = function () {
		return e.__super__.layout.apply(this, arguments)
	},
	e.prototype.start = function () {
		e.__super__.start.apply(this, arguments),
		log("#start"),
		$("html").hasClass("ie8") || (this.doAnimate = !0)
	},
	e.prototype.stop = function () {
		e.__super__.stop.apply(this, arguments),
		this.doAnimate = !1,
		log("#stop")
	},
	e.prototype.addEventListeners = function () {
		
		var t;
		log("addEventListeners: "),
		MAIN.$window.on("resize", this.onResize),

		this.$destinationHandle.on("mousedown", this.onTouchMouseDown),
		Modernizr.touch && (this.$destinationHandle.on("touchstart", this.onTouchMouseDown), this.$destinationHandle.on("touchend", this.onTouchMouseEnd)),

		this.$destinationHandle_2.on("mousedown", this.onTouchMouseDown_start),
		Modernizr.touch && (this.$destinationHandle_2.on("touchstart", this.onTouchMouseDown_start), this.$destinationHandle_2.on("touchend", this.onTouchMouseEnd_start)),
		this.setHandlePosition(300, 370),
		this.setHandlePosition_2(350, 228)
	},
	e.prototype.startRequestAnimationFrame = function () {
		return this.enableRequestAnimationFrame = !0,
		this.update()
	},
	e.prototype.stopRequestAnimationFrame = function () {
		return this.enableRequestAnimationFrame = !1
	},
	e.prototype.startRequestAnimationFrame_2 = function () {
		return this.enableRequestAnimationFrame_2 = !0,
		this.update_2()
	},
	e.prototype.stopRequestAnimationFrame_2 = function () {
		return this.enableRequestAnimationFrame_2 = !1
	},
	e.prototype.update = function () {
		this.bd_map = {
   			x : this.$casestudy.offset().left,
   			y : this.$casestudy.offset().top
   		}

		var t,
		e,
		n,
		i,
		s;
		if (this.doAnimate === !0)
			return this.$closestDestination = this.getClosestDestination(this.mouseX, this.mouseY), 
			n = this.$closestDestination.offset(), 
			t = n.left += this.destinationWidth / 2 - 3 + map_opleft - this.bd_map.x, 
			e = n.top -= this.destinationHeight - 34 - map_oftop, 
			i = this.intersects(this.mouseX, this.mouseY, t, e, this.radius), 
			i && this.isTouchDragging === !1 ? (
				this.destinationX = Math.round(t),
				this.destinationY = Math.round(e)-5,
				this.$destinationHandleContent.removeClass("is-active"), 
				this.dispatchedNewTarget || (this.$destinationHandleContent.addClass("is-on-destination"), 
				this.$destinationHandleContent.removeClass("to-left"), 
				this.setDestinationTo(this.$closestDestination),
				this.onTarget = !0,
				this.dispatchedNewTarget = !0,
				this.dispatchedTextReset = !1,
				this.setHandlePosition(this.destinationX, this.destinationY),
				((this.onTarget_2)?this.animateArc(this.destinationX, this.destinationY):"" ))) : (this.dispatchedNewTarget = !1, this.destinationX = this.mouseX, this.destinationY = this.mouseY, this.isTouchDragging ? this.destroyArc() : null != (s = this.lineAnimation) && s.reverse(), (this.isMouseDragging || this.isTouchDragging) && this.$destinationHandleContent.addClass("is-active"), this.$destinationHandleContent.removeClass("is-on-destination"), this.onTarget = !1, this.dispatchedTextReset || (this.resetDestinationHandleText(), this.dispatchedTextReset = !0)), (this.isMouseDragging || this.isTouchDragging) && this.setHandlePosition(this.destinationX, this.destinationY), this.enableRequestAnimationFrame ? requestAnimationFrame(this.update) : void 0
	},
	e.prototype.update_2 = function () {
		this.bd_map = {
   			x : this.$casestudy.offset().left,
   			y : this.$casestudy.offset().top
   		}

		var t,
		e,
		n,
		i,
		s;
		if (this.doAnimate === !0)
			return this.$closestDestination_2 = this.getClosestDestination(this.mouseX, this.mouseY),
				n = this.$closestDestination_2.offset(), 
				t = n.left += this.destinationWidth / 2 - 3 + map_opleft - this.bd_map.x, 
				e = n.top -= this.destinationHeight -34 - map_oftop, 
				i = this.intersects(this.mouseX, this.mouseY, t, e, this.radius), 
				i && this.isTouchDragging === !1 ? (this.destinationX_2 = Math.round(t),

				this.destinationY_2 = Math.round(e)-5,
				this.$destinationHandleContent_2.removeClass("is-active"), 
				this.dispatchedNewTarget || (this.$destinationHandleContent_2.addClass("is-on-destination"), 
				this.$destinationHandleContent_2.removeClass("to-left"),
				this.setDestinationTo_2(this.$closestDestination_2),
				this.onTarget_2 = !0,
				this.dispatchedNewTarget = !0,
				this.dispatchedTextReset = !1,
				this.setHandlePosition_2(this.destinationX_2, this.destinationY_2),
				this.departureX = this.destinationX_2,
				this.departureY = this.destinationY_2-3,
				this.translateCenter = {
					x : this.departureX,
					y : this.departureY
				},
				((this.onTarget)?this.animateArc(this.destinationX, this.destinationY):""))) : (this.dispatchedNewTarget = !1, this.destinationX_2 = this.mouseX, this.destinationY_2 = this.mouseY, this.isTouchDragging ? this.destroyArc() : null != (s = this.lineAnimation) && s.reverse(), (this.isMouseDragging || this.isTouchDragging) && this.$destinationHandleContent_2.addClass("is-active"), this.$destinationHandleContent_2.removeClass("is-on-destination"), this.onTarget_2 = !1, this.dispatchedTextReset || (this.resetDestinationHandleText(), this.dispatchedTextReset = !0)), (this.isMouseDragging || this.isTouchDragging) && this.setHandlePosition_2(this.destinationX_2, this.destinationY_2), this.enableRequestAnimationFrame_2 ? requestAnimationFrame(this.update_2) : void 0
	},
	e.prototype.setHandlePosition = function (t, e, n) {
		return null == n && (n = !1),
		this.destinationHandleXVal = t,
		this.destinationHandleYVal = e,
		this.destinationHandleXValPercent = this.destinationHandleXVal / this.context.width(),
		this.destinationHandleYValPercent = this.destinationHandleYVal / this.context.height(),
		Modernizr.csstransforms3d ? this.$destinationHandle.get(0).style[this.prefixedTransform] = "translate3d(" + this.destinationHandleXVal + "px," + this.destinationHandleYVal + "px,0px)" : Modernizr.csstransforms ? this.$destinationHandle.get(0).style[this.prefixedTransform] = "translate(" + this.destinationHandleXVal + "px," + this.destinationHandleYVal + "px)" : this.$destinationHandle.css({
				top : this.destinationHandleXVal,
				left : this.destinationHandleYVal
			})
	},
	e.prototype.setHandlePosition_2 = function (t, e, n) {
		return null == n && (n = !1),
		this.destinationHandleXVal_2 = t,
		this.destinationHandleYVal_2 = e,
		this.destinationHandleXValPercent_2 = this.destinationHandleXVal_2 / this.context.width(),
		this.destinationHandleYValPercent_2 = this.destinationHandleYVal_2 / this.context.height(),
		Modernizr.csstransforms3d ? this.$destinationHandle_2.get(0).style[this.prefixedTransform] = "translate3d(" + this.destinationHandleXVal_2 + "px," + this.destinationHandleYVal_2 + "px,0px)" : Modernizr.csstransforms ? this.$destinationHandle_2.get(0).style[this.prefixedTransform] = "translate(" + this.destinationHandleXVal_2 + "px," + this.destinationHandleYVal_2 + "px)" : this.$destinationHandle_2.css({
				top : this.destinationHandleXVal_2,
				left : this.destinationHandleYVal_2
			})
	},
	e.prototype.destroyArc = function () {
		return this.ctx && (this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.$canvas.get(0).width, this.$canvas.get(0).width), this.ctx.restore()),
		this.lineAnimation && (this.lineAnimation.pause(0), this.lineAnimation.kill(), this.lineAnimation = null),
		this.line ? (this.line.pause(0), this.line.kill(), this.line = null) : void 0
	},
	e.prototype.animateArc = function (t, e) {
		var n,
		i,
		s = this;
		n = {},
		n.x = t - this.canvasOffsets.x - this.desx_resize,
		n.y = e - this.canvasOffsets.y - this.desy_resize,
		n.progress = 1,
		n.startAngle = Math.PI / 180,
		n.endAngle = Math.PI / 180 * (360 - 180 * n.progress),
		n.distance = Math.sqrt((this.departureX - n.x) * (this.departureX - n.x) + (this.departureY - n.y) * (this.departureY - n.y)),
		n.radius = n.distance / 2,
		n.deltaY = this.departureY - n.y,
		n.deltaX = this.departureX - n.x,
		n.angleInDegrees = 180 * Math.atan2(n.deltaY, n.deltaX) / Math.PI, 120 > n.distance && this.$destinationHandleContent.addClass("to-left"),
		i = {
			angle : n.startAngle
		},
		this.lineAnimation && (this.lineAnimation.pause(0), this.lineAnimation.kill(), this.lineAnimation = null),
		this.lineAnimation = TweenLite.to(i, 1, {
			angle : n.endAngle,
			onUpdate : function () {
				return s.$canvas.get(0).width = s.$canvas.get(0).width,
				s.ctx.translate(s.translateCenter.x, s.translateCenter.y),
				s.ctx.rotate(n.angleInDegrees * Math.PI / 180),
				s.ctx.strokeStyle = "#000",
				s.ctx.setLineDash([2,2]),
				s.ctx.lineWidth = 2,
				s.ctx.beginPath(),
				s.ctx.arc(0 - n.radius, 0, n.radius, 0, -1 * i.angle, !0),
				s.ctx.stroke();
			},
			ease : Strong.easeIn,
			onComplete : function () {
				return s.animateAirplane(n)
			},
			onReverseComplete : function () {
				return s.destroyArc()
			}
		});
	},
	e.prototype.animateAirplane = function (t) {
		var e,
		n,
		i,
		s,
		r,
		o,
		a,
		l = this;
		null != t && (s = 1.45, e = Math.PI / 180 * (360 - 180 * s), o = t.endAngle, i = 30, r = Math.map(t.distance, 100, 520, .8, 1.1), n = (this.airplane.width + i) / t.radius * r / 2, a = {
				angle : t.startAngle
			}, this.line = TweenLite.to(a, 1.4, {
				angle : e,
				onUpdate : function () {
					var e,
					i,
					s;
					return l.$canvas.get(0).width = l.$canvas.get(0).width,
					l.ctx.strokeStyle = "#000",
					l.ctx.setLineDash([2,2]),
					l.ctx.lineWidth = 2,
					l.ctx.translate(l.translateCenter.x, l.translateCenter.y),
					l.ctx.rotate(t.angleInDegrees * Math.PI / 180),
					e = -1 * (a.angle - Math.PI / 2),
					i = t.radius * Math.sin(e) - t.radius,
					s = t.radius * -Math.cos(e),
					l.ctx.beginPath(),
					l.ctx.arc(0 - t.radius, 0, t.radius, o, -1 * (a.angle + n), !1),
					l.ctx.stroke(),
					0 > -1 * (a.angle - n) ? (l.ctx.beginPath(), l.ctx.arc(0 - t.radius, 0, t.radius, t.startAngle, -1 * (a.angle - n), !0), l.ctx.stroke(), l.drawRotatedImage(l.airplane, i, s, e, r)) : void 0
				},
				ease : Strong.easeOut
			}))
	},
	e.prototype.drawRotatedImage = function (t, e, n, i, s) {
		this.ctx.save(),
		this.ctx.translate(e, n),
		this.ctx.rotate(i),
		this.ctx.drawImage(t, -t.width * s / 2, -t.height * s / 2, t.width * s, t.height * s),
		this.ctx.restore()
	},
	e.prototype.getClosestDestination = function (t, e) {
		// console.log(this.$closestDestination);
		var n,
		i,
		s,
		r,
		o,
		a,
		l,
		u,
		h;
		for (n = null, h = this.$destinations, l = 0, u = h.length; u > l; l++){
			s = h[l],
			i = $(s), 
			a = i.offset(),
			a.left += this.destinationWidth / 2, 
			a.top += this.destinationHeight / 2, 
			r = Math.sqrt((a.left + map_opleft - t - this.bd_map.x) * (a.left + map_opleft - t - this.bd_map.x) + (a.top + map_oftop - e) * (a.top + map_oftop - e)), 
			(o > r || void 0 === o) && (o = r, n = i);
		}
		// console.log(a.left + map_opleft - t - this.bd_map.x, a.top + map_oftop - e, r);
		// console.log(n);
		return n
	},
	e.prototype.intersects = function (t, e, n, i, s) {
		var r,
		o;
		return r = t - n,
		o = e - i,
		s * s >= r * r + o * o
	},
	e.prototype.setDestinationTo = function (t) {
		var e,
		n,
		i;
		this.$activeDestination = t,
		n = t.data("city"),
		m = t.data("price"),
		this.$destinationHandleContent.find(".destination-city").text(n),
		this.$destinationHandleContent.find(".destination-price").html(m),
		this.$activeDestination.addClass("is-active")
	},
	e.prototype.setDestinationTo_2 = function (t) {
		var e,
		n,
		i;
		this.$activeDestination_2 = t,
		n = t.data("city"),
		m = t.data("price"),
		this.$destinationHandleContent_2.find(".destination-city_2").text(n),
		this.$destinationHandleContent_2.find(".destination-price_2").html(m),
		this.$activeDestination_2.addClass("is-active")
	},
	e.prototype.resetDestinationHandleText = function () {
		var t = this;
		_.delay(function () {
			return t.onTarget || (t.$destinationHandleContent.find(".destination-city").text(t.origTextDestinationCity), t.$destinationHandleContent.find(".destination-price").html(t.origTextDestinationPrice), null === t.$activeDestination) ? void 0 : t.$activeDestination.removeClass("is-active"),
			t.onTarget_2 || (t.$destinationHandleContent_2.find(".destination-city_2").text(t.origTextDestinationCity_2), t.$destinationHandleContent_2.find(".destination-price_2").html(t.origTextDestinationPrice_2), null === t.$activeDestination_2) ? void 0 : t.$activeDestination_2.removeClass("is-active")
		}, 300)
	},
	e.prototype.onTouchMouseDown = function (t) {
		if (log("touch mouse down" + t.pageX), t.originalEvent.touches)
			this.mouseOffsetX = this.$destinationHandle.offset().left - t.originalEvent.touches[0].pageX, this.mouseOffsetY = this.$destinationHandle.offset().top - t.originalEvent.touches[0].pageY;
		else if (this.mouseOffsetX = this.$destinationHandle.offset().left - t.pageX, this.mouseOffsetY = this.$destinationHandle.offset().top - t.pageY, 1 !== t.which)
			return;
		return this.context.on("mousemove", this.onTouchMouseMove),
		this.context.on("touchmove", this.onTouchMouseMove),
		MAIN.$body.on("mouseup", this.onTouchMouseEnd),
		this.onTouchMouseMove(t),
		this.startRequestAnimationFrame()
	},
	e.prototype.onTouchMouseDown_start = function (t) {
		if (log("touch mouse down" + t.pageX), t.originalEvent.touches)
			this.mouseOffsetX = this.$destinationHandle_2.offset().left - t.originalEvent.touches[0].pageX, this.mouseOffsetY = this.$destinationHandle_2.offset().top - t.originalEvent.touches[0].pageY;
		else if (this.mouseOffsetX = this.$destinationHandle_2.offset().left - t.pageX, this.mouseOffsetY = this.$destinationHandle_2.offset().top - t.pageY, 1 !== t.which)
			return;
		return this.context.on("mousemove", this.onTouchMouseMove),
		this.context.on("touchmove", this.onTouchMouseMove),
		MAIN.$body.on("mouseup", this.onTouchMouseEnd_start),
		this.onTouchMouseMove(t),
		this.startRequestAnimationFrame_2()
	},
	e.prototype.onTouchMouseMove = function (t) {
		t.stopPropagation();
		log('touch move');
		t.originalEvent.touches ? (this.isMouseDragging = !1, this.isTouchDragging = !0, this.mouseX = t.originalEvent.touches[0].pageX - this.context.offset().left + this.mouseOffsetX, this.mouseY = t.originalEvent.touches[0].pageY - this.context.offset().top + this.mouseOffsetY) : (this.isMouseDragging = !0, this.isTouchDragging = !1, this.mouseX = t.pageX - this.context.offset().left + this.mouseOffsetX, this.mouseY = t.pageY - this.context.offset().top + this.mouseOffsetY),
		t.originalEvent.touches && 1 === t.originalEvent.touches.length && (t.stopPropagation(), t.preventDefault()),
		log("@mouseY: " + this.mouseY)
	},
	e.prototype.onTouchMouseEnd = function () {
		var t;
		log("touch mouse end"),
		this.onTarget || (this.isTouchDragging ? this.destroyArc() : null != (t = this.lineAnimation) && t.reverse()),
		this.isMouseDragging = !1,
		this.isTouchDragging = !1,
		this.context.off("mousemove", this.onTouchMouseMove),
		this.context.off("touchmove", this.onTouchMouseMove),
		MAIN.$body.off("mouseup", this.onTouchMouseEnd),
		this.stopRequestAnimationFrame(),
		this.update(),
		this.$destinationHandleContent.removeClass("is-active"),
		this.onTarget || this.$destinationHandleContent.removeClass("to-left")
	},
	e.prototype.onTouchMouseEnd_start = function () {
		var t;
		log("touch mouse end"),
		this.onTarget_2 || (this.isTouchDragging ? this.destroyArc() : null != (t = this.lineAnimation) && t.reverse()),
		this.isMouseDragging = !1,
		this.isTouchDragging = !1,
		this.context.off("mousemove", this.onTouchMouseMove),
		this.context.off("touchmove", this.onTouchMouseMove),
		MAIN.$body.off("mouseup", this.onTouchMouseEnd_start),
		this.stopRequestAnimationFrame_2(),
		this.update_2(),
		this.$destinationHandleContent_2.removeClass("is-active"),
		this.onTarget_2 || this.$destinationHandleContent_2.removeClass("to-left")
	},
	e.prototype.onResize = function () {
		this.bd_map = {
   			x : this.$casestudy.offset().left,
   			y : this.$casestudy.offset().top
   		}
		
		this.desx_resize = map_opleft, 
		this.desy_resize = map_oftop
		
		var t,
		e;
		this.cacheValues(),
		t = this.context.width() * this.destinationHandleXValPercent,
		e = this.context.height() * this.destinationHandleYValPercent,
		w = this.context.width() * this.destinationHandleXValPercent_2,
		h = this.context.height() * this.destinationHandleYValPercent_2,

		this.onTarget && (t = Math.round(this.$activeDestination.offset().left + 7 + map_opleft), e = Math.round(this.$activeDestination.offset().top + 9 + map_oftop)),

		this.onTarget_2 && (w = Math.round(this.$activeDestination_2.offset().left + 7 + map_opleft), h = Math.round(this.$activeDestination_2.offset().top + 9 + map_oftop)),

		Modernizr.csstransforms3d ? this.$destinationHandle.get(0).style[this.prefixedTransform] = "translate3d(" + t + "px," + e + "px,0px)" : Modernizr.csstransforms ? this.$destinationHandle.get(0).style[this.prefixedTransform] = "translate(" + t + "px," + e + "px)" : this.$destinationHandle.css({
				top : e,
				left : t
			}),
		Modernizr.csstransforms3d ? this.$destinationHandle_2.get(0).style[this.prefixedTransform] = "translate3d(" + w + "px," + h + "px,0px)" : Modernizr.csstransforms ? this.$destinationHandle_2.get(0).style[this.prefixedTransform] = "translate(" + w + "px," + h + "px)" : this.$destinationHandle_2.css({
				top : h,
				left : w
			})
	},
	MAIN.componentLoader.register(e.componentName, e),
	e
}
(FI.COMPONENTS.Section), $(function () {
	return MAIN.initialise()
});