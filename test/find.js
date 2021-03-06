'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('find function test', () => {
    it('should return false no txid', async () => {
        var result = await index.find();
        expect(result).to.eql({
            success: false,
            message: "field required"
        });
    });

    it('should return true with latest file for an address', async () => {
        var result = await index.find({
            address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz"
        });
        expect(result.success).to.equal(true);
        expect(result.data.length > 0).to.equal(true);

    });

    it('should return true with latest file with first and second tags set', async () => {
        var result = await index.find({
            address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            tags: [
                'tag1',
                'https://www.bitcoinfiles.org#super-%24-$422-9/#'
            ]
        });
        expect(result).to.eql({
            success: true,
            data: [
                {
                    txid: '83f5820560a6e33369d47f5c6e8fda8cd03e0660941dea1053bd8891e4882e39',
                    url: 'https://media.bitcoinfiles.org/83f5820560a6e33369d47f5c6e8fda8cd03e0660941dea1053bd8891e4882e39'
                }
            ]
        });
    });

    it('should return true with latest file with first tag set', async () => {
        var result = await index.find({
            address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            tags: [
                'tag1',
            ]
        });
        expect(result).to.eql({
            success: true,
            data: [
                {
                    txid: '369d78ee889e8ffd538c89a514539bff2211a254a89ed9643ed07e0fd3909026',
                    url: 'https://media.bitcoinfiles.org/369d78ee889e8ffd538c89a514539bff2211a254a89ed9643ed07e0fd3909026'
                }
            ]
        });
    });

    it('should return true with file containing hex formatted tag', async () => {
        var result = await index.find({
            tags: [
                'this is a test tag',
                '0x61', // letter 'a'
            ]
        });
        expect(result).to.eql({
            success: true,
            data: [
                {
                    txid: 'a9cc49be9666444345698e356ff985e997c7ee40f10197ebd4aacb3a5f88b6ae',
                    url: 'https://media.bitcoinfiles.org/a9cc49be9666444345698e356ff985e997c7ee40f10197ebd4aacb3a5f88b6ae'
                }
            ]
        });
    });

    it('should return true with last few application/test+json', async () => {
        var result = await index.find({
            address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            contentType: "application/test+json",
            limit: 5,
            sort: { 'blk.i': -1 }
        });
        expect(result).to.eql({
            success: true,
            data: [
                {
                    txid: '821a1cf59160b08a5e2805c33d19381a0124ea8291808ad23e306b4f9e7782bd',
                    url: 'https://media.bitcoinfiles.org/821a1cf59160b08a5e2805c33d19381a0124ea8291808ad23e306b4f9e7782bd'
                },
                {
                    "txid": "05ad1708371a03e17688859211e6460c10a87bfc01127ae9d33dd0c93f3db444",
                    "url": "https://media.bitcoinfiles.org/05ad1708371a03e17688859211e6460c10a87bfc01127ae9d33dd0c93f3db444"
                },
                {
                    "txid": "e1ac85aaec68947b41270ba3f1ef68e7782533855eb102e561fde3b0181fac57",
                    "url": "https://media.bitcoinfiles.org/e1ac85aaec68947b41270ba3f1ef68e7782533855eb102e561fde3b0181fac57"
                },
                {
                    "txid": "8657f139afbce31c038b852c8d6fb602b71f265d44421e357e02d602f0e4b8a3",
                    "url": "https://media.bitcoinfiles.org/8657f139afbce31c038b852c8d6fb602b71f265d44421e357e02d602f0e4b8a3"
                }
            ]
        });
    });


    it('should return true with a specific tx', async () => {
        var result = await index.get('0e3bd6077c1da1e564c36dd18c71d4d45c00369cd1badcfa303a88b867809c99');
        expect(result).to.eql({
            success: true,
            data: [
                {
                    txid: '0e3bd6077c1da1e564c36dd18c71d4d45c00369cd1badcfa303a88b867809c99',
                    url: 'https://media.bitcoinfiles.org/0e3bd6077c1da1e564c36dd18c71d4d45c00369cd1badcfa303a88b867809c99'
                }
            ]
        });
    });
})
