const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/http-server');
const fs = require('fs');
const sander = require('sander');

describe('My HTTP Server', () => {

  let request = chai.request(server.httpServer);

  it('lists all the boardsports', done => {
    request
      .get('/boardsports')
      .end((err, res) => {
        if (err) return done(err);
        var boardSports = 'snowskating.json<br>surfing.json<br>';
        assert.ok(!err);
        assert.deepEqual(res.text, boardSports);
        done();     
      });
  });


  it('posts POST on page', done => {
    postObject = {name: "skateboarding", environment: "city", weather: "clear", equipment: "skateboard, shoes"};
    request
      .post('/')
      .send(postObject)
      .end((err, res) => {
        if (err) return done(err);


        sander.readFile(server.filePath)
          .then(function(data){
            var newSport = JSON.parse(data);
            assert.deepEqual(newSport, postObject);
          })
          .then(sander.unlink(server.filePath))
          .then(done);


        // fs.readFile(server.filePath, 'utf-8', (err, data) => {
        //   if (err) throw err;
        //   var newSport = JSON.parse(data);
        //   console.log('newly saved object:', newSport);
        //   assert.deepEqual(newSport, postObject);
        //   done();
        // });       
      });
  });

});
