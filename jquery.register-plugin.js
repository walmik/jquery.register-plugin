(function($){

	var obj2Func = function(obj) {

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
		var PluginFunction = obj2Func(PluginObject);

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
