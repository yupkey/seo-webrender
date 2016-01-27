# seo-webrender

SEO friendly web render.  
Search engines tries to crawl your page, but they see only JavaScript?  
Webrender save the webpage as static HTML, which you can return it to the crawlers!

## install

```
$ npm install seo-webrender -g
```

## example

```javascript
$ seo-webrender server //start running server http://localhost:3000/
$ seo-webrender save http://www.foxnews.com //save webpage to www-foxnews-com-.html
$ seo-webrender get http://www.foxnews.com //get webpage source
```
