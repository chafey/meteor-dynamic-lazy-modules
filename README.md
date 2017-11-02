# meteor-dynamic-lazy-modules
Example of using meteor's dynamic-import package with lazy modules with meteor 1.6+.  Combining these two
meteor features enables large projects to be split into separate modules that are loaded on demand. The benefit
of this is faster load times for users and faster build times for developers.

Try it out
----------

Startup the application in either dev or production mode:

Development Mode
----------------

 > export METEOR_PACKAGE_DIRS='../Packages'; meteor run

Production Mode
---------------

> export METEOR_PACKAGE_DIRS='../Packages'; meteor run --production


Using chrome, navigate to localhost:3000, open the developer window in chrome, select the network tab and
then the websocket connection and then the "frames" tab.  Press the button "click to dynamically load my-ui-component",
observe the bits for the my-ui-library are sent over the DDP channel.  When run in production mode, the bits are only
sent over the DDP channel the first time, after that they are pulled from the IndexedDB cache (click the application tab)

How To
------
1) Make sure your meteor package is using modules (api.mainModule() in package.js).  Configure it for lazy loading:
```javascript
  api.mainModule('client.js','client', {lazy:true});
```

2) Wrap the template that will be dynamically loaded in an if statement controlled by a reactive variable:
```html
  {{#if myUiComponentLoaded}}
    {{> myUiComponent}}
  {{/if}}
```
```javascript
const myUiComponentLoaded = new ReactiveVar(false);

Template.hello.helpers({
  myUiComponentLoaded() {
    return myUiComponentLoaded.get();
  }
});
```

3) Use dynamic-import to load the module when you want and toggle the reactive var that controls the rendering of
   the template in the dynamically loaded module.
```javascript
  import('meteor/my-ui-component').then(myUiComponent => {
      // use my-ui-component exports if desired.  in this example, it exports the Template so we log
      // that to verify it was indeed loaded
      console.log(myUiComponent);
      // toggle the reactive var so the template can be rendered
      myUiComponentLoaded.set(true);
    });
  },
```

Notes
-----

1) The meteor server automatically builds a graph of the module dependencies and efficiently transmits only what
   is needed over the DDP channel
2) The dependency graph eliminates double loading/sending of bits
3) The server does not evaluate the bits until they are requested in both dev and production mode.  This means
   you will not see syntax errors until the code is requested!!  Unfortunately there doesn't appear to be a way
   to force meteor to evaluate all code like it did before.
4) Meteor appears to cache individual source files as separate entries in IndexedDB.

References
----------
1) [Blog on Dynamic Imports with Meteor 1.5](https://blog.meteor.com/dynamic-imports-in-meteor-1-5-c6130419c3cd)
2) [Meteor 1.6 documentation on lazy loading modules from a package](https://docs.meteor.com/packages/modules.html#Lazy-loading-modules-from-a-package)
3) [Meteor 1.6 documentation on dynamic-import package](https://docs.meteor.com/packages/dynamic-import.html)
