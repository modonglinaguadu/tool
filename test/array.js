var _ = require('../tool');
var assert = require('assert');

describe('test array properties', function() {

	it('test isArray', function() {
		var arr = [];
		var arrlike = {
			0: 1,
			1: 'xx',
			length: 2
		};
		assert.ok(_.isArray(arr));
		assert.ok(!_.isArray(arrlike));
		assert.ok(!_.isArray(arguments));
	});

	it('test isArrayLike', function() {
		var arr = [];
		var arrlike = {
			0: 1,
			1: 'xx',
			length: 2
		};
		assert.ok(!_.isArrayLike(arr));
		assert.ok(_.isArrayLike(arrlike));
		assert.ok(_.isArrayLike(arguments));
	});

	it('test toArray', function() {
		var arrlike = {
			0: 1,
			1: 'xx',
			length: 2
		};
		assert.ok(_.isArray(_.toArray(arrlike)));
		assert.ok(_.isArray(_.toArray(arguments)));
	});



	it('test forEach or each', function() {
		var arr = [1, 2, 3];
		_.forEach(arr, function(item, index) {
			assert.equal(_.type(item), 'number');
			assert.equal(this, global);
		});
		var a = {};
		a.test = function() {
			assert.equal(this, a);
			_.forEach(arr, function() {
				assert.equal(this, global);
			});
		}
		a.test();
		a.test1 = function() {
			_.forEach(arr, function() {
				assert.equal(this, a);
			}, this)
		}
	});

	it('test map', function() {
		var arr = [1, 2, 3];
		var newArr = _.map(arr, function(item) {
			return item * 2;
		});
		assert.ok(_.equal(newArr, [2, 4, 6]));
	});

	it('test filter', function() {
		var arr = [1, 2, 3, 4];
		var newArr = _.filter(arr, function(item) {
			if (item % 2) {
				return true;
			}
		});
		assert.ok(_.equal(newArr, [1, 3]));
	});

	it('test reject', function() {
		var arr = [1, 2, 3, 4];
		var newArr = _.reject(arr, function(item) {
			if (item % 2) {
				return true;
			}
		});
		assert.ok(_.equal(newArr, [2, 4]));
	});

	it('test some', function() {
		var arr = [1, 2, 3, 4];
		var res = _.some(arr, function(item) {
			if (item === 2) {
				return true;
			}
		});
		assert.ok(res);
	});

	it('test every', function() {
		var arr = [1, 2, 3, 4];
		var res = _.every(arr, function(item) {
			return !!item;

		});
		assert.ok(res);
		var arr1 = [1, 2, 0, 4];
		var res1 = _.every(arr1, function(item) {
			return !!item;
		});
		assert.ok(!res1);
	});
});