'use strict';

require('mocha');
var each = require('handlebars-helper-each');
var helpers = require('handlebars-helpers');
var assemble = require('assemble');
var assert = require('assert');
var helper = require('..');
var app;

describe('helper-collection', function() {
  beforeEach(function() {
    app = assemble();
    app.create('posts');

    app.helper('each', require('handlebars-helper-each'));
    app.helper('collection', helper);

    app.helper('sortBy', function(items, prop) {
      return items.sortBy(prop);
    });

    app.helper('paginate', function(list, options) {
      var pages = list.paginate(list, options.hash);
      if (typeof options.fn === 'function') {
        return options.fn(pages);
      }
      return pages;
    });

    app.helper('filterIndex', function(items) {
      return items.filter(function(item) {
        return item.stem !== 'index';
      });
    });

    app.post('aaa.hbs', {content: 'this is aaa', data: {title: 'AAA'}});
    app.post('bbb.hbs', {content: 'this is bbb', data: {title: 'BBB'}});
    app.post('ccc.hbs', {content: 'this is ccc', data: {title: 'CCC'}});

    app.page('foo.hbs', {content: 'this is foo', data: {title: 'Foo'}});
    app.page('bar.hbs', {content: 'this is bar', data: {title: 'Bar'}});
    app.page('baz.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz1.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz2.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz3.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz4.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz5.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz6.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz7.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz8.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz9.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz10.hbs', {content: 'this is baz', data: {title: 'Baz'}});
    app.page('baz11.hbs', {content: 'this is baz', data: {title: 'Baz'}});
  });

  it('should iterate over views in the the current collection', function(cb) {
    app.page('index.hbs', {
      content: [
        '{{#collection}}',
        '{{#each (paginate (filterIndex items)) as |page|}}',
        '{{#each page.items as |item|}}',
        '<li>{{item.stem}}</li>',
        '{{/each}}',
        '{{/each}}',
        '{{/collection}}',
      ].join('\n'), data: {title: 'ABC'}});

    app.render('index.hbs', function(err, view) {
      if (err) {
        cb(err);
        return;
      }

      assert(view.content);
      assert(/foo/.test(view.content));
      assert(/baz11/.test(view.content));
      assert(!/index/.test(view.content));
      cb();
    });
  });

  it('should iterate over views in a specified collection', function(cb) {
    app.page('index.hbs', {
      content: [
        '{{#collection "posts"}}',
        '{{#each items as |item|}}',
        '<li>{{item.data.title}}</li>',
        '{{/each}}',
        '{{/collection}}',
      ].join('\n'), data: {title: 'ABC'}});

    app.render('index.hbs', function(err, view) {
      if (err) {
        cb(err);
        return;
      }
      assert.equal(view.content.trim(), '<li>AAA</li>\n<li>BBB</li>\n<li>CCC</li>');
      cb();
    });
  });
});
