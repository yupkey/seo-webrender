var webrender = require('../lib/app');

describe('webrender', function () {
  describe('#get()', function () {
    it('should has get method', function (done) {
      if (typeof webrender.get !== 'function') {
        throw 'No get method';
      }
      done();
    });

    it('first arg should be an url, string', function (done) {
      this.timeout(10000);
      webrender.get({}, null, function (err) {
        if (!err)
          throw 'Should return an error !!!';
        done();
      });
    });

    it('should get data without error', function (done) {
      this.timeout(10000);
      webrender.get('http://www.foxnews.com/travel', function (data) {
        if (!data)
          throw 'No data from url !!!';
        done();
      });
    });

    it('should not get data', function (done) {
      this.timeout(10000);
      webrender.get('test###', null, function (err) {
        if (!err)
          throw 'Should return an error !!!';
        done();
      });
    });
  });
});
