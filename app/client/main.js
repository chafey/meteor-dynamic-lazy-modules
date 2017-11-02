import { Template } from 'meteor/templating';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
});

const myUiComponentLoaded = new ReactiveVar(false);

Template.hello.helpers({
  myUiComponentLoaded() {
    return myUiComponentLoaded.get();
  }
});

Template.hello.events({
  'click button'(event, instance) {

  // dynamically load via the dynamic-import package.
  import('meteor/my-ui-component').then(myUiComponent => {
      // use my-ui-component exports if desired.  in this example, it exports the Template so we log
      // that to verify it was indeed loaded
      console.log(myUiComponent);
      // toggle the reactive var so the template can be rendered
      myUiComponentLoaded.set(true);
    });
  },
});