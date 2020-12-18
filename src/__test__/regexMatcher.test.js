
const aprMatcher = require('../aprMatcher');
describe('the regex matcher', ()=>{

  it('should return null if input is null', ()=>{
    const input = null;
    expect(aprMatcher.match(input)).toBeNull();
  });


  it('should return null if the there is no numbers', ()=>{
    const input = 'abc';
    expect(aprMatcher.match(input)).toBeNull();
  });

  it('should return null if there is no % sign attched in the end', ()=>{
    const input = "88.90";
    expect(aprMatcher.match(input)).toBeNull();
  });

  it('should return correct number if there is no % sign attched in the end', ()=>{
    const input = "88.90% adganc";
    expect(aprMatcher.match(input)).toEqual('88.90%');
  });
});