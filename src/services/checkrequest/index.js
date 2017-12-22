import redis from '../../shared/redis';

export function checkRequest(descriptor){    
    return new Promise((resolve, reject) => {
        const transaction = redis.multi();
        transaction.incr(descriptor.key);
        transaction.expire(descriptor.key, descriptor.expire);
        transaction.exec((err, results) => {            
            const newValue = results[0][1];
            console.log("i am coming all the way here", descriptor);
            resolve({
                value: newValue,
                available: newValue < 1000
            });
        });    
    });
}