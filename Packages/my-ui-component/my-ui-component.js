import "./my-ui-component.html"

console.log('my-ui-component - my-ui-component.js');

Template.myUiComponent.onCreated(() => {
  console.log('my-ui-component.onCreated');
});

Template.myUiComponent.helpers({
  message() {
    return "This is my-ui-component!";
  }
});

export default Template.myUiComponent;
