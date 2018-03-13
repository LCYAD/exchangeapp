const redis = require('redis');
const MasterListener = require('./master_listener');

class Master {

    constructor() {
        this.master = redis.createClient();
        this.master.on("error", ((err)=>{
            console.log("Error" + err);
        }));
    }

    processReq(req, id) {
        return new Promise((resolve, reject)=>{
            let input = JSON.stringify({
                req: req,
                id: id
            });
            this.master.RPUSH('ask_exchange', input , (err)=>{
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log('Pushing data into Redis');
                // Create a listener which subscribe to the uuid and wait for the response
                let master_listener = new MasterListener();
                master_listener.subscribe(id).then((message)=>{
                    master_listener.unsubscribe(id);
                    master_listener = null;
                    resolve(JSON.parse(message));
                }).catch((err)=>{
                    console.log('Got an err');
                    master_listener.unsubscribe(id);
                    master_listener = null;
                    reject(err);
                })
            });
        });
    }
}

module.exports = Master;
