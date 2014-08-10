jQuery.registerPlugin()
=======================

jQuery plugin creation helper utility that binds to the root jQuery object. Create a object literal and use it directly to register it as a jQuery plugin

```
var ColorMeRed = {

    color: '#f00',

    init: function(hex) {
        this.$el.css('color', this.color);
    }

};
```

Register it as a jQuery plugin:

`$.registerPlugin('colorMeRed', ColorMeRed);`

Now `colorMeRed` is available as a standard jQuery plugin ready to be applied on DOM elements:

`$('div').colorMeRed();`

## Documentation

Please refer to the [wiki](https://github.com/walmik/jquery.register-plugin/wiki) to learn more about this utility or [read the article](http://www.walmik.com/2014/08/a-whole-new-way-of-writing-jquery-plugins/) that explains how this works.
