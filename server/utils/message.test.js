const expect= require('expect');
var {generateMessage}= require('./message');
describe('generateMessage',()=>{
  it('generateMessage should work prperly', ()=>{
var from= 'Admin';
var text= 'hey';
var m= generateMessage(from, text);
expect(m.createdAt).toBeA('number');
expect(m).toInclude({from,text});


  });
});
