import css from './element.sss';

(function () {
  'use strict';

  CubxComponent({
    is: '/* @echo elementName */',

    /**
     * Manipulate an element’s local DOM when the element is created. {{artifactId}}
     */
    created: function () {

    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
      const input = this.querySelector('#slotMessage');
      input.addEventListener('change', function (event) {
        this.setMessage(event.target.value);
      }.bind(this));
    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    connected: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is dettached to the document.
     */
    disconnected: function () {
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function () {
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'slotName' has changed ...
     */
    modelMessageChanged: function (newValue) {
      console.log(`${newValue} changed`);
      const input = this.querySelector('#slotMessage');
      input.value = newValue;
    }
  });
}());
