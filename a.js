var aObj = {


	events: {
		'click>.btn': 'methodA'
	},


	/**
	 * Any functionality you need to add can be a propery in this object
	 */
	methodA: function() {

		alert('Hello from A');

	}

};

$.registerPlugin('aPlug', aObj);