var bObj = {

	/**
	 * The init function is called by default (if it exists)
	 * You can remove it if you don't need it.
	 */
	init: function() {

		//We will need the value for `this` in the on click event handler
		//to reference this object's properties
		var self = this;

		//Initialize action on click of button 1
		this.$('.btn1').on('click', function(){
			self.methodB();
		});

		//Initialize action on click of button 2
		//and call a function from the other DIV's plugin
		this.$('.btn2').on('click', function(){
			$('.a').aPlug('methodA');
		});

	},


	methodB: function() {
		alert('Hello from B!');
	}

};

$.registerPlugin('bPlug', bObj);