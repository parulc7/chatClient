var request = require('request');
describe('get messages', ()=>{
    it('should return 200 ok', (done)=>{
        request.get('http://127.0.0.1:3000/messages', (err, res)=>{
            expect(res.statusCode).toEqual(200);
            done()
        })
    })
    it('should return a non-empty list', (done)=>{
        request.get('http://127.0.0.1:3000/messages', (err, res)=>{
            expect(JSON.parse(res.body).length).toBeGreaterThanOrEqual(2);
            done()
        })
    })
})