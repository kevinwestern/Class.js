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