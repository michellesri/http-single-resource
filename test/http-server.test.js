const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/http-server');
const fs = require('fs');
const sander = require('sander');

describe('My HTTP Server', () => {

  let request = chai.request(server.httpServer);


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
            console.log('newly saved object:', newSport);
            assert.deepEqual(newSport, postObject);
          })
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
