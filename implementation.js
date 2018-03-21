'use strict';

var ES = require('es-abstract/es2017');

var ThrowCompletion = function Throw(error) {
	throw error;
};

module.exports = function fromEntries(iterable) {
	var obj = {};
	var iter = ES.GetIterator(iterable);

	while (true) { // eslint-disable-line no-constant-condition
		var next = ES.IteratorStep(iter);
		if (next === false) {
			return obj;
		}

		var nextItem = ES.IteratorValue(next);
		if (ES.Type(nextItem) !== 'Object') {
			var error = new TypeError('iterator returned a non-object');
			return ES.IteratorClose(iter, ThrowCompletion(error));
		}

		try {
			var key = ES.Get(nextItem, '0');
			var value = ES.Get(nextItem, '1');
			var propertyKey = ES.ToPropertyKey(key);
			ES.CreateDataPropertyOrThrow(obj, propertyKey, value);
		} catch (e) {
			return ES.IteratorClose(iter, ThrowCompletion(e));
		}
	}
};
