(function($){

	var getPluginFunction = function(obj) {

		// Return a function which takes two params: DOM element and options. 
		return function(element, options) {

			/*
			 * jQuery plugins has a provision to inject default properties
			 * In our method, we'll simply allow users to create this default object in
			 * the pluginObject itself
			 * @typeof {Object}
			 */
			this.options = $.extend({}, obj.defaults || {}, options);


			/**
			 * this.$el references the DOM element on which this Plugin Function will be initialized
			 * @type {jQueryObject}
			 */
			this.$el = $(element);



			// Shorthand for this.$el.find() to help people find elements within the element
			this.$ = function(el) {
				return this.$el.find(el);
			}


			
			// Import all properties of the obj inside 'this'
			for (var item in obj) {
				this[item] = obj[item]; 
			}


			// Wire up events and event handlers
			for (var action in this.events) {
				
				//the action will be in the format: 'click>.someClass'
				//split it on > and bind the second item(element) to respond to the first item(event)
				var split = action.split('>');	//split on a greater than sign
				var evt = $.trim(split[0]);
				var element = $.trim(split[1]);

				/**
				 * The value of the action could be a reference to a function or a function itself
				 * If it's a reference, it'll be a string like this:
				 * 'click>.someClass' : 'onClickSomeClass'
				 * ^ which means, onClickSomeClass exists as a function in the object
				 * OR
				 * The value of the action could be the function directly, 
				 * in which case we will bind it without directly without trying to look for it in the obj
				*/
				if(typeof this.events[action] == 'string') {
					//check if the function refered to by the string exists and use it
					if (this[this.events[action]]) {
						//proceeding in favor of bind directly on element (passing 'this' as self in the data object of the event)
						this.$(element).on(evt, {self: this}, this[this.events[action]].bind(this));
						//the following will bind on this.$el and reference it to element
						//this.$el.on(evt, element, this.events[action].bind(this));
					} else {
						console.log('Eventmap Action "' + this.events[action] + '" is a string but cannot be found in the obj as a function.');
					}
				} else {
					//the action value is a function
					//proceeding in favor of bind directly on element
					this.$(element).on(evt, this[this.events[action]].bind(this));
					//the following will bind on this.$el and reference it to element
					//this.$el.on(evt, element, this.events[action].bind(this));
				}
			}

		  
			/*
				Call an init method if it exists
				This way we can write one in the extended fn
				and pass in whatever we want to kickstart the plugin with
			 */
			if(this['init']) 
				this.init();
			
		};
	}

	$.registerPlugin = function(pluginName, PluginObject){

		/*
		 * Expand the Object literal into a plugin function 
		 * usually created using the factory design pattern
		 */
		var PluginFunction = getPluginFunction(PluginObject);

		$.fn[pluginName] = function(options, params) {
			return this.each(function() {

				// Get the plugin instance if it exists
				var instance = $.data(this, 'plugin_' + pluginName);
				
				
				// If the plugin isn't already initialized on that DOM element
				if (!(instance instanceof PluginFunction)) {

					// Instanciate the plugin Function
					instance = new PluginFunction(this, options);
					
					// Save a record to the DOM elements data-attr so it doesn't happen again in the future
					$.data(this, 'plugin_' + pluginName, instance); 
				}
	
	
				/*
				 *	Allow executing individual actions from the plugin
				 *	These can be called by other plugins as such:
				 *	$('.dom-element').pluginName('action');	// will call PluginFunction.action
				 */
				if (typeof options == 'string') {
					if (typeof instance[options] == 'function') {
						
						// Allow passing params to the action (if required)
						instance[options].call(instance, params);
					}
				}
			});
		}
	}

}(jQuery))
