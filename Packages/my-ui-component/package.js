Package.describe({
  name: 'my-ui-component',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6');
  api.use('ecmascript');
  api.use('modules');
  api.use('meteor-base');
  api.use('blaze-html-templates');
  api.mainModule('client.js','client', {lazy:true});
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('core');
  api.mainModule('my-ui-component-tests.js');
});
