import {checkRequest} from '../services/checkrequest';
const grpc = require('grpc');
const PROTO_PATH = __dirname + '/../../rate-limiter.proto';

const rateLimiterProto = grpc.load(PROTO_PATH).ratelimiter;

const checkRequestService = (call, callback) => {
    checkRequest(call.request).then((response) => {        
        callback(null, {
            available: response.available,
            newValue: response.value
        });
    });
    
};

const server = new grpc.Server();
server.addService(rateLimiterProto.RateLimiter.service, {
    checkRequest:checkRequestService
});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

const startServer = () => {
    server.start();
};

const stopServer = () => {
    server.forceShutdown();
};

startServer();
