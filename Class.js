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

var Person = Class({

	name: 'empty',

	constructor: function (name){
		this.name = name || this.name;
	},

	speak: function () {
		console.log('person:speak:' + this.name);
	}
});

var Adult = Class({
	Extends: Person,

	age: 20,

	constructor: function (name, age) {
		Adult.__super.constructor.call(this, name);
		this.age = age || this.age;
	},

	speak: function () {
		Adult.__super.speak.call(this);
		console.log('adult:speak:' + this.age);
	}
});

var WorkingAdult = Class({
	Extends: Adult,

	job: 'nojob',

	constructor: function (name, age, job) {
		WorkingAdult.__super.constructor.call(this, name, age);
		this.job = job || this.job;
	},

	speak: function () {
		WorkingAdult.__super.speak.call(this);
		console.log('workingadult:speak:' + this.job);
	}
});