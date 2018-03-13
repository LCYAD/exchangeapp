const redis = require('redis');
const axios = require('axios');
require('dotenv').config();

class Worker {

    constructor() {
        this.worker = redis.createClient();
        this.getData();
        this.appID = process.env.APP_ID;
    }

    getData(){
        return this.worker.BLPOP(["ask_exchange", 0], (err, data)=>{
            if (data) {
                let response = JSON.parse(data[1]);
                let symbols = (response.req.symbols === '') ? '' : '&symbols=' + response.req.symbols;
                let date = (response.req.type === 'historical') ? '/'+response.req.date: '';
                // call the openExchange API based on the incoming request
                axios.get(  'https://openexchangerates.org/api/'+response.req.type+date+'.json'+
                            '?app_id='+this.appID+
                             symbols
                         )
                .then((result)=>{
                    console.log(result.data);
                    this.worker.PUBLISH(response.id, JSON.stringify(result.data) , (err)=>{
                        if (err) {
                            console.log(err);
                            this.getData();
                        } else {
                            console.log('Pushed Result back to Master');
                            this.getData();
                        }
                    });
                }).catch((err)=>{
                    this.getData();
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                });
            } else {
                this.getData();
            }
        });
    }
    
}

const worker = new Worker();
