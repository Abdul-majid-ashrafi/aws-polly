const AWS = require("aws-sdk");
require('./auth.js')
const fs = require('fs');

let polly = new AWS.Polly();

var params = {
    // "LexiconNames": ["string"],
    "OutputFormat": "mp3",
    // "SpeechMarkTypes": ["string"],
    "Text": `<speak>
    <emphasis level="moderate">Hello, <prosody volume="soft" rate="x-slow">this is Majid Ashraf.</prosody> and,</emphasis>
    <prosody rate="x-slow">I am  <break time="300ms"/> Hasan Idress .</prosody>
    <prosody rate="x-slow" volume="soft">
    I am sorry, to inform you. that the items you requested
    <say-as interpret-as="Apology" >
       I am sorry, to inform you. that the items you requested,  are back-ordered  We apologize for the inconvenience.</say-as>
    </prosody>
    </speak>`,
    "TextType": "ssml",
    "VoiceId": "Joanna"
}

let synthCB = function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log("DATA------- ", data.AudioStream)
        fs.writeFile("speech.mp3", data.AudioStream, (err, data) => {
            if (err) {
                console.log("Error saving File", err)
            }
            console.log("FILE SAVE!")
        })
    }
}

polly.synthesizeSpeech(params, synthCB)