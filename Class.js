var hasOwn = function (obj, prop){
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

var borrow = function (prototype) {
	function F(){};
	F.prototype = prototype;
	return new F();
};

var implement = function (proto, constructor){
	for (var prop in proto){
		if (!hasOwn(proto, prop) || prop === 'Extends' || prop === 'constructor') continue;
		constructor.prototype[prop] = proto[prop];
	}
};

var Class = function (objProto){
	var superClass = objProto.Extends, 
		superProto = {},
		constructor = null;

	if (superClass) superProto = superClass.prototype;

	if (hasOwn(objProto, 'constructor')) constructor = objProto.constructor;
	else if (superClass && superProto.constructor) {
		constructor = function () {
			superProto.constructor.apply(this, Array.prototype.slice.call(arguments));
		}
	}
	else {
		constructor = function(){};
	}

	if (superClass){
		constructor.prototype = borrow(superProto);
		constructor.__super = superProto;
		constructor.prototype.constructor = constructor;
	}

	implement(objProto, constructor);

	return constructor;
};