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

  it('lists the contents of one file', done => {
    request
    .get('/boardsports/surfing')
    .end((err, res) => {
      let surfingContents = '{"name":"surfing","environment":"ocean","weather":"off shore winds","equipment":"surfboard"}\n';
      if (err) return done(err);
      assert.ok(!err);
      assert.deepEqual(res.text, surfingContents);
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
        .then(done);
    });
  });

  it('writes PUT on page', done => {
    putObject = {name: "skateboarding", environment: "urban", weather: "clear", equipment: "skateboard, shoes"};
    request
    .put('/')
    .send(putObject)
    .end((err, res) => {
      if (err) return done(err);

      sander.readFile(server.filePath)
        .then(function(data){
          var putSport = JSON.parse(data);
          assert.deepEqual(putSport, putObject);
        })
        .then(done);
    });
  });

  it('deletes a file', done => {
    deleteObject = {name: "skateboarding", environment: "urban", weather: "clear", equipment: "skateboard, shoes"};
    request
    .delete('/')
    .send(deleteObject)
    .end((err, res) => {
      console.log("I'm in end");
      if (err) return done(err);

      sander.readdir('./data/boardsports/')
        .then(function(data){
          var resultDir = [ 'snowskating.json', 'surfing.json' ];
          assert.deepEqual(data, resultDir);
        })
        .then(done)
        .catch(done);
    });
  });
});
