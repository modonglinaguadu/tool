/*
	author:modonglin
	email:modonglinagua.163.com
	version:1.0.0
	time:2017-8-4
*/

(function(global, fn) {

	"use strict";

	if (typeof module === "object" && typeof module.exports === "object") {
		exports = module.exports = fn(global, true);
	} else {
		fn(global, false);
	}

	//如果没有window对象，可以通过this调用fn
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

	//常用变量
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

	var tool = {
		/*
			判断类型
			@param {any} sender
			@return {string}
		*/
		type: function(sender) {
			return Object.prototype.toString.call(sender).toLowerCase().match(/\s([^\]]+)/)[1];
		},

	};
	/*
		往tool上挂载方法
		@param {object} obj
	*/
	tool.extend = function() {
		var obj = arguments[0];
		if (this.type(obj) !== 'object') return this;
		for (copy in obj) {
			tool[copy] = obj[copy];
		}
	}


	//数组类型方法
	tool.extend({
		/*
			是否是数组
			@param {any} sender
			@return {boolean}
		*/
		isArray: function(sender) {
			return this.type(sender) === 'array';
		},
		/*
			是否是伪数组
			@param {any} sender
			@return {boolean}
		*/
		isArrayLike: function(sender) {
			var len = sender.length;
			return sender && !this.isArray(sender) && typeof len === 'number' && len >= 0 && len <= MAX_ARRAY_INDEX;
		},
		/*
			伪数组转换成数组
			@param {any} sender
			@return {array}
		*/
		toArray: function(sender) {
			try {
				return [].slice.call(sender);
			} catch (err) {
				var i = 0,
					len = sender.length,
					list = [];
				for (i; i < len; i++) {
					list.push(sender[i]);
				}
				return list;
			}

		},
		/*
			遍历sender中的所有元素，按顺序用遍历输出每个元素
			@param {any} sender
			@param {function} cb
		*/
		forEach: function(sender, cb, ec) {
			var flag = this.isArray(sender) || this.isArrayLike(sender);
			if (this.type(cb) === 'function') {
				if (flag) {
					var i = 0,
						len = sender.length;
					for (i; i < len; i++) {
						cb.call(ec, sender[i], i, sender);
					}
				} else {
					var i;
					for (i in sender) {
						cb.call(ec, sender[i], i, sender);
					}
				}
			}
		},
		/*
			通过转换函数(cb迭代器)映射列表中的每个值产生价值的新数组
			@param {array} sender
			@param {function} cb
			@return {array}
		*/
		map: function(sender, cb, ec) {
			var flag = this.isArray(sender) || this.isArrayLike(sender);
			if (!flag) {
				throw new Error('参数必须为数组或伪数组');
			}
			if (this.type(cb) === 'function') {
				var i = 0,
					len = sender.length,
					result,
					arr = [];
				for (i; i < len; i++) {
					result = cb.call(ec, sender[i], i, sender);
					arr.push(result);
				}
				return arr;
			}
		},
		/*	
			遍历sender中的每个值，返回包含所有通过cb真值检测的元素值
			@param {array} sender
			@param {function} cb
			@return {array}
		*/
		filter: function(sender, cb) {
			var flag = this.isArray(sender) || this.isArrayLike(sender);
			if (!flag) {
				throw new Error('参数必须为数组或伪数组');
			}
			if (this.type(cb) === 'function') {
				var i = 0,
					len = sender.length,
					result,
					arr = [];
				for (i; i < len; i++) {
					result = !!cb.call(sender[i], sender[i], i, sender);
					if (result) {
						arr.push(sender[i]);
					}
				}
				return arr;
			}
		},
		/*
			返回array中没有通过cb真值检测的元素集合，与filter相反。
		*/
		reject: function(sender, cb) {
			var flag = this.isArray(sender) || this.isArrayLike(sender);
			if (!flag) {
				throw new Error('参数必须为数组或伪数组');
			}
			if (this.type(cb) === 'function') {
				var i = 0,
					len = sender.length,
					result,
					arr = [];
				for (i; i < len; i++) {
					result = !!cb.call(sender[i], sender[i], i, sender);
					if (!result) {
						arr.push(sender[i]);
					}
				}
				return arr;
			}
		},
		/*
			如果sender中有任何一个元素通过 cb 的真值检测就返回true。一旦找到了符合条件的元素, 就直接中断对sender的遍历.
			@param {array} sender
			@param {function} cb
			@return {boolean}
		*/
		some: function(sender, cb) {
			var flag = this.isArray(sender) || this.isArrayLike(sender);
			var pass = false;
			if (!flag) {
				throw new Error('参数必须为数组或伪数组');
			}
			if (this.type(cb) === 'function') {
				var i = 0,
					len = sender.length;
				for (i; i < len; i++) {
					pass = !!cb.call(sender[i], sender[i], i, sender);
					if (pass === true) break;
				}
			}
			return pass;
		},
		/*
			如果array中的所有元素都通过cb的真值检测就返回true。
			@param {array} sender
			@param {function} cb
			@return {boolean}
		*/
		every: function(sender, cb) {
			var flag = this.isArray(sender) || this.isArrayLike(sender);
			var pass = false;
			if (!flag) {
				throw new Error('参数必须为数组或伪数组');
			}
			if (this.type(cb) === 'function') {
				var i = 0,
					len = sender.length;
				for (i; i < len; i++) {
					pass = !!cb.call(sender[i], sender[i], i, sender);
					if (pass === false) break;
				}
			}
			return pass;
		}
	});
	tool.each = tool.forEach;


	//添加其他方法
	tool.extend({
		/*
			添加event方法(sub/pub)
			提供五个方法:
				resume：重新开始
				on: 创建任务
				emit: 执行任务
				removeListener: 删除指定任务名的指定任务
				removeAllListener：删除指定任务名的全部任务
			@return 
		*/
		event: {
			tool: tool,
			resume: function() {
				this._events = {};
			},
			on: function(name, cbk) {
				this._events = this._events || {};
				this._events[name] = this._events[name] || [];
				this._events[name].push(cbk);
			},
			emit: function(name) {
				this._events = this._events || {};
				var args = [].slice.call(arguments, 1);
				if (this._events[name]) {
					tool.map(this._events[name], function(ck, i) {
						ck.call(this, args);
					}, this);
					return true;
				} else {
					return false;
				}
			},
			removeListener: function(name, cbk) {
				this._events = this._events || {};
				if (this._events[name]) {
					var flag = false;
					tool.map(this._events[name], function(fn, i) {
						if (fn === cbk) {
							this._events[name].splice(i, 1);
							flag = true;
						}
					}, this)
					return flag;
				} else {
					return false;
				}
			},
			removeAllListener: function(name) {
				this._events = this._events || {};
				if (this._events[name]) {
					this._events[name] = null;
					return true;
				} else {
					return false;
				}

			}
		},
		/*
			把几个对象的方法复制到target对象中
			@param {object} target
			@param {object}	other
		*/
		merge: function(target) {
			if (typeof target === 'undefined') {
				return
			}
			var args = [].slice.call(arguments, 1);
			var parent;
			for (var i = 0; i < args.length; i++) {
				parent = args[i];
				for (var prop in parent) {
					target[prop] = parent[prop];
				}
			}
		},
		/*
			获取对象的属性
			@param {object} obj
			@return {array}
		*/
		keys: function(obj) {
			var arr = [];
			if (this.type(obj) !== 'object') return arr;
			if (Object.keys) {
				return Object.keys(obj);
			}
			for (var prop in obj) {
				arr.push(prop);
			}
			return arr;
		},
		/*
			判断对象或数组内的值是否相等/判断传入的两个参数是否相等(严格相等,即===)
			@param {array/object} target
			@param {array/object} compare
			@return {boolean}
		*/
		equal: function(target, compare) {
			if (compare == void(0) || target == void(0)) return (compare === target);
			var targetType = (this.isArray(target) || this.isArrayLike(target));
			var compareType = (this.isArray(compare) || this.isArrayLike(compare));
			if (targetType && compareType) {
				var flag = true,
					i,
					len = target.length > compare.length ? target.length : compare.length;
				for (i = 0; i < len; i++) {
					if (target[i] !== compare[i]) {
						flag = false;
						return flag;
					}
				}
				return flag;
			} else if (this.type(target) === 'object' && this.type(compare) === 'object') {
				var tarProp = this.keys(target),
					comProp = this.keys(compare),
					flag = true;
				if (!this.equal(tarProp, comProp)) return false;
				this.every(tarProp, function(item) {
					if (target[item] === compare[item]) {
						return true;
					} else {
						flag = false;
						return false;
					}
				});
				return flag;
			} else {
				return (target === compare);
			}
		}
	});



	/*
		兼容各个环境
	*/
	if (typeof define === "function" && define.amd) {
		define("tool", [], function() {
			return tool;
		});
	}



	//自定义名字
	var _tool = window.tool,
		__ = window._;
	tool.noConflict = function(deep) {
		if (window._ === tool) {
			window._ = __;
		}

		if (deep && window.tool === tool) {
			window.tool = _tool;
		}

		return tool;
	};


	if (!noGlobal) {
		window.tool = window._ = tool;
	}

	return tool;
})