var _ = require('../tool');
var event = _.event;
var assert = require('assert');


describe('test other', function() {
	it('merge one', function() {
		var a = {
			name: 'haha'
		};
		var b = {
			test: function() {
				return true;
			}
		}
		var c = {
			dada: function() {
				return true;
			}
		}
		_.merge(a, b, c);
		assert.ok(a.test());
		assert.ok(a.dada());
		assert.equal(a.name, 'haha');
	});

	it('merge two', function() {
		var a = {
			name: 'a'
		};
		var b = {
			name: 'b'
		}
		_.merge(a, b);
		assert.equal(a.name, 'b');
	});

	it('test merge and event', function() {
		function Server() {
			this.on('play', function(op) {
				assert.equal(op[0], 'music');
			});
		}
		_.merge(Server.prototype, event);

		var server = new Server();

		server.emit('play', 'music');

		assert.ok(!server.emit('haha'));


	});

	it('test type', function() {
		var a = 123;
		var b = '123';
		var c = true;
		var d = function() {};
		var e = {};
		var f = undefined;
		var g = null;
		assert.equal(_.type(a), 'number');
		assert.equal(_.type(b), 'string');
		assert.equal(_.type(c), 'boolean');
		assert.equal(_.type(d), 'function');
		assert.equal(_.type(e), 'object');
		assert.equal(_.type(f), 'undefined');
		assert.equal(_.type(g), 'null');
	});

	it('test keys', function() {
		var res = _.keys({
			name: 'xxx'
		});
		var arr = ['name'];
		assert.ok(_.equal(res, arr));
	});

	it('test equal', function() {
		var a = [1, 2, 3, 4];
		var b = [1, 2, 3, 4];
		var c = [1, 2, 5];
		assert.ok(_.equal(a, b));
		assert.ok(!_.equal(a, c));
		assert.ok(!_.equal(c, a));

		var obj = {
			name: 'xxx'
		};
		var obj1 = {
			name: 'xxx'
		}
		var obj2 = {
			name: 'ddd'
		};
		var obj3 = {
			dada: 'xxx'
		}
		var obj4 = {
			name: 'xxx',
			papa: 123
		}
		assert.ok(_.equal(obj, obj1));
		assert.ok(!_.equal(obj, obj2));
		assert.ok(!_.equal(obj3, obj2));
		assert.ok(!_.equal(obj, obj4));

		assert.ok(_.equal(1, 1));
		assert.ok(!_.equal(1, 3));
		assert.ok(!_.equal(1, '1'));
		assert.ok(_.equal('a', 'a'));
		assert.ok(!_.equal(true, 1));
		assert.ok(!_.equal(undefined, null));
		assert.ok(_.equal(undefined, undefined));
		assert.ok(_.equal(null, null));

	});
});