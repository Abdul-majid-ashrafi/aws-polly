const AWS = require("aws-sdk");
require('./auth.js')


let polly = new AWS.Polly();
// let param = { "LanguageCode": 'en-GB' }
let param = { "LanguageCode": 'en-US' }
polly.describeVoices(param, (err, data) => {
    if (err) console.log("EROrr", err);
    else console.log("DAta", data)
})