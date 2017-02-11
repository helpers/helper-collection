'use strict';

module.exports = function(name) {
  var args = [].slice.call(arguments);

  if (typeof name === 'string') {
    name = args.shift();
  } else {
    name = this.view.options.collection;
  }

  var app = this && this.app;
  if (typeof app === 'undefined') {
    throw new Error('expected an instance of "templates" (see https://github.com/jonschlinkert/templates for more information)');
  }

  var collection = app[name];
  if (typeof collection === 'undefined') {
    throw new Error(`cannot find collection ${name}`);
  }

  // get the pluralized name of the collection
  var plural = collection.options.plural;

  // every collection has two helpers, one for getting a single
  // item, and one that exposes all of the collection items to
  // a block. we want the (plural) collection helper
  var helper = this.app.getHelper(plural);
  return helper.apply(this, args);
};
