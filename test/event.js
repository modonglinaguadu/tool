var event = require('../tool').event;
var assert = require('assert');

describe('event', function() {
	it('test on and emit', function() {
		event.on('one', function(res) {
			assert.ok(res[0]);
		});
		event.emit('one', true);
	});

	it('add subs,and emit', function() {
		event.on('two', function(res) {
			assert.ok(res[0]);
		});
		event.on('two', function(res) {
			assert.ok(res[0]);
		});
		event.emit('two', true);
	});

	it('add subs after emit', function() {
		event.on('three', function(res) {
			assert.ok(res[0]);
		});
		event.emit('three', true);
		event.on('three', function(res) {
			assert.ok(res[0]);
		});
		event.emit('three', true);
	});

	it('add a function which pass function name', function() {
		function haha(res) {
			assert.ok(res[0]);
		}
		event.on('four', haha);
		assert.ok(event.emit('four', true));
	});

	it('test removeListener', function() {
		function gaga(res) {
			assert.ok(res[0]);
		}

		function dudu(res) {
			assert.ok(res[0]);
		}
		event.on('five', gaga);
		event.on('five', dudu);
		event.on('five', function(res) {
			assert.ok(res[0]);
		})
		assert.ok(event.removeListener('five', gaga));
		assert.ok(event.removeListener('five', dudu));
		assert.ok(!event.removeListener('six', gaga));
		assert.ok(!event.removeListener('five', function() {}));
		event.emit('five', true);
	});

	it('test removeAllListener', function() {
		event.on('six', function() {});

		function a(res) {
			assert.equal(res[0], 'a')
		}
		event.on('six', a);
		event.emit('six', 'a');
		assert.ok(event.removeAllListener('six'));
		assert.ok(!event.emit('six'));
	});

});