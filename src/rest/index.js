import { checkRequest } from '../services/checkrequest';
const restify = require("restify");

const server = restify.createServer({
    name: 'rate-limiter-service',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/check-request', function (req, res, next) {
    return checkRequest(req.body).then((response) => {
        res.send(200,{newValue:response.value, available:response.available});
        return next();
    });
});

server.listen(3001, () => {
    console.log('%s listening at %s', server.name, server.url);
});