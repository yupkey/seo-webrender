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

  function parseData (data) {
    data.source = data.source.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    data.source = data.source.replace(/href="\.\//g, 'href="' + data.location.origin + '/');
    data.source = data.source.replace(/href="\/\//g, 'href="' + data.location.protocol);
    data.source = data.source.replace(/href="\//g, 'href="' + data.location.origin + '/');
    data.source = data.source.replace(/src="\.\//g, 'src="' + data.location.origin + '/');
    data.source = data.source.replace(/src="\/\//g, 'src="' + data.location.protocol);
    data.source = data.source.replace(/src="\//g, 'src="' + data.location.origin + '/');
    return data;
  }
  /**
   * @class WebRender
   */
  var WebRender = function () {};

  /**
   * @function getSource
   * @param {string} url - url to website (http://www.foxnews.com)
   * @param {function} callback
   */
  WebRender.prototype.get = function (url, callback) {
    var path = __dirname + '/node_modules/phantomjs/bin/';
    callback = callback || function () {};

    phantom.create({path: path}, function (ph) {
      ph.createPage(function (page) {
        page.open(url, function (status) {
          console.log("opened " + url, status);
          page.evaluate(function () {
            return {
              source: document.getElementsByTagName('html')[0].innerHTML,
              title: document.title,
              location: {
                href: location.href,
                host: location.host,
                protocol: location.protocol,
                pathname: location.pathname,
                origin: location.origin
              }
            };
          }, function (data) {
            data = parseData(data);
            callback(data);
            ph.exit();
          });
        });
      });
    });
  };

  /**
   * @function save
   * @param {string} url - url to website (http://www.foxnews.com)
   * @param {string} [fileName] - File name of saved page
   */
  WebRender.prototype.save = function (url, fileName) {
    this.get(url, function (data) {
      fileName = fileName || data.location.host.replace(/\./g, '-') + data.location.pathname.replace(/\//g, '-') + '.html';
      fs.writeFile(fileName, data.source, 'utf8', function (err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File ' + fileName + ' has been created succesfully');
      }.bind(this));
    });
  };

  /**
   * @function help
   */
  WebRender.prototype.help = function () {
    console.log('Usage: \twebrender save url\n');
    console.log('Example: webrender save http://www.foxnews.com');
  };

  /**
   * WebRender instance exported as a module
   * @module seo-webrender
   * @type WebRender
   */
  module.exports = new WebRender();
})();
