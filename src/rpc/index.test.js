import {startServer, stopServer} from './index';
const grpc = require('grpc');
const PROTO_PATH = __dirname + '/../../rate-limiter.proto';
const rateLimiterProto = grpc.load(PROTO_PATH).ratelimiter;

describe('rpc server', () => {    
    const client = new rateLimiterProto.RateLimiter('localhost:50051', grpc.credentials.createInsecure());

    it('should verify url to be true', (done) => {
        client.checkRequest({
            'key': 'mykey',
            'expire': '60'
        }, (err, response) => {            
            console.log(response);
            done();
        });
    });

});