var aObj = {

	/**
	 * The init function is called by default (if it exists)
	 * You can remove it if you don't need it.
	 */
	init: function() {

		//We will need the value for `this` in the on click event handler
		//to reference this object's properties
		var self = this;

		//Initialize action on click of button
		this.$('.btn').on('click', function(){
			self.methodA();
		});

	},


	/**
	 * Any functionality you need to add can be a propery in this object
	 */
	methodA: function() {

		alert('Hello from A');

	}

};

$.registerPlugin('aPlug', aObj);