const redis = require('redis');

class MasterListener {

    constructor() {
        this.masterlistener = redis.createClient();
        this.masterlistener.on("error", ((err) => {
            console.log("Error" + err);
        }));
    }

    subscribe(id) {
        return new Promise ((resolve, reject)=>{
            this.masterlistener.SUBSCRIBE(id, (err)=>{
                if (err) reject(err);
            });
            this.masterlistener.on('message', (channel, message)=>{
                console.log('Resolving from ' + channel + ' of message ' + message);
                resolve(message);
            });
        });
    }

    unsubscribe(id) {
        this.masterlistener.UNSUBSCRIBE(id, (err)=>{
            if (err) console.log('Failure to Unsubscribe' + err);
        });
        this.masterlistener.QUIT();
    }

}

module.exports = MasterListener;
