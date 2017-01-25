'use strict';

module.exports = function(name, options, cb) {
  var args = [].slice.call(arguments);

  if (typeof name === 'string') {
    args = args.slice(1);
  } else {
    options = name;
    cb = options;
    name = this.view.options.collection;
  }

  var collection = this.app[name];
  if (typeof collection === 'undefined') {
    cb(new Error(`cannot find collection ${name}`));
    return;
  }

  // get the pluralized name of the collection
  var plural = collection.options.plural;
  // every collection has two helpers, one for getting a single
  // item, and one that exposes all of the collection items to
  // a block. we want the (plural) collection helper
  var helper = this.app.getAsyncHelper(plural);
  helper.apply(this, args);
};
