//  npm install mocha --global

var assert = require('assert');
const funktiot = require('./funktiot');

describe('Toinen potenssi', function(){
    it('5^2 = 25', function() {
        assert.strictEqual(25, funktiot.potenssitoinen(5));
    })
    it('3^2 = 9', function() {
        assert.strictEqual(9, funktiot.potenssitoinen(3));
    })
    it('7^2 != 21', function() {
        assert.notStrictEqual(21, funktiot.potenssitoinen(7))
    })
    it('1^2 != 2', function() {
        assert.notStrictEqual(2, funktiot.potenssitoinen(1))
    })
    it('10^2 = 100', function() {
        assert.strictEqual(100, funktiot.potenssitoinen(10));
    })
});
describe('Henkilötunnus tarkistaminen', function() {
    it('010101-0101 == true', function() {
        assert.strictEqual(true, funktiot.validhlotunnus('010101-0101'))
    })
    it('280199-972S == true', function() {
        assert.strictEqual(true, funktiot.validhlotunnus('280199-972S'))
    })
    it('280199-978Y == true', function() {
        assert.strictEqual(true, funktiot.validhlotunnus('280199-978Y'))
    })
    it('222222-2222 == true', function() {
        assert.strictEqual(true, funktiot.validhlotunnus('222222-2222'))
    })
    it('22222222222 != true', function() {
        assert.notStrictEqual(true, funktiot.validhlotunnus('22222222222'))
    })
    it('aaaaaa-aaaa != true', function() {
        assert.notStrictEqual(true, funktiot.validhlotunnus('aaaaaa-aaaa'))
    })
    it('123456-aaaa != true', function() {
        assert.notStrictEqual(true, funktiot.validhlotunnus('123456-aaaa'))
    })
    it('12345a-333a != true', function() {
        assert.notStrictEqual(true, funktiot.validhlotunnus('aaaaaa-aaaa'))
    })
    it('!!!!!!-!!!! != true', function() {
        assert.notStrictEqual(true, funktiot.validhlotunnus('!!!!!!-!!!!'))
    })
})