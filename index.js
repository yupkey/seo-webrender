/**
 * The MIT License (MIT)
 * Copyright (c) 2016 yupk <yupk@yupk.pl>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function () {
  'use strict';
  /* globals require, process, __dirname, module */

  var fs = require('fs');
  var phantom = require('phantom');

  var SeoWebRender = function () {};

  SeoWebRender.prototype.getSource = function (url, callback) {
    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.open(url, function (status) {
          console.log("opened " + url, status);
          page.evaluate(function () {
            return document.getElementsByTagName('html')[0].innerHTML;
          }, function (result) {
            result = result.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            callback(result);
            ph.exit();
          });
        });
      });
    });
  };

  SeoWebRender.prototype.savePage = function (url) {
    this.getSource(url, function (source) {
      var fileName = 'seo-webrender-tmp.html';
      fs.writeFile(fileName, source, 'utf8', function (err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File ' + fileName + ' has been created succesfully');
      }.bind(this));
    });
  };

  /**
   * SeoWebRender instance exported as a module
   * @module seo-webrender
   * @type SeoWebRender
   */
  var webrender = new SeoWebRender();
//  webrender.savePage('http://www.bbc.com/');

  module.exports = webrender;
})();
