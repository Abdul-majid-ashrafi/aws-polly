const AWS = require("aws-sdk");
const File_System = require("fs");

// Create an Polly client
const Polly = new AWS.Polly({
    region: 'us-east-1'
})

let params = {
    "OutputFormat": "mp3",
    "Text": `<speak>
    <emphasis level="moderate">Hello, <prosody volume="soft" rate="x-slow">this is Majid Ashraf.</prosody> and,</emphasis>
    <prosody rate="x-slow" volume="soft">
       I am sorry, to inform you. that the items you requested,  are back-ordered  We apologize for the inconvenience.
    </prosody>
    </speak>`,
    "TextType": "ssml",
    "VoiceId": "Joanna"
}


Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
        console.log(err.code)
    } else if (data) {
        if (data.AudioStream instanceof Buffer) {
            File_System.writeFile("./speech.mp3", data.AudioStream, function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log("The file was saved!")
            })
        }
    }
})