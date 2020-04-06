const Say = require('say').Say;
const say = new Say('win32');
var http = require('http');

say.speak("make sure youur headphones are on");
// Create a function to handle every HTTP request
function handler(req, res) {

    if (req.method == 'POST') {
        console.log("post request recived\n");

        req.on('data', function(chuck) {
            console.log("data recieved");

            var message = chuck.toString();
            console.log(message);
            var from = message.substring(message.indexOf("&sig="));
            from = from.replace("&sig=","");
            console.log("from: " + from);
            message = message.substring(0, message.indexOf("&sig="));
            message = message.toLowerCase();
            message = message.replace("msg=", "");

            while (message.indexOf("+") > -1) {
                message = message.replace("+", " ");
            }

            console.log("message: " + message);

            // fill this array with strings that you want the Text-to-speech to replace with the word "REMOVED" when saying the message aloud.
            var bannedWordsArray = ["fill this array with words you do not want the bot to say!"];

            // loop through banned words array, if a word is present it removes all instances of it.
            bannedWordsArray.forEach(element => {
                while (message.indexOf(element) > -1) {
                    message = message.replace(element, "REMOVED");
                }
            });

            console.log("message (filtered): " + message);
            console.log("Message About to be spoken!\n");
            if (from != "" && bannedWordsArray.indexOf(from.toLowerCase()) < 0){
              say.speak("Message from " + from + " .   .    .    .    . " + message);
            } else {
              say.speak("Message from unknown .   .    .    .    . " + message);
            }

            console.log("Message Spoken");
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(`<html><head><link rel="shortcut icon" href="http://www.iconj.com/ico/t/z/tzrcmrpiyt.ico" type="image/x-icon" /></head><title>Annoyed Jack!</title><body><center><h1>Success! Message was played on Jack's Speakers!</h1></center></body></html>`);
        });
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);



        var siteCode= '<html>'+
        '<style>'+
        '  input[type="submit"] {'+
        '    background-color: #3bfffc;'+
        '    font-size: 15px;'+
        '    border: 2px solid black;'+
        '    color: black;'+
        '    padding: 16px 32px;'+
        '    text-decoration: none;'+
        '    margin: 4px 2px;'+
        '    cursor: pointer;'+
        '  }'+
        ''+
        '  img {'+
        '    border: 4px solid white;'+
        '    margin: 4px 2px;'+
        '    padding: 2px 4px;'+
        '  }'+
        ''+
        '  body {'+
        '    background-color: #b95ff5;'+
        '    border: none;'+
        '    color: black;'+
        '    height: auto;'+
        '    width: auto;'+
        '    overflow: hidden;'+
        '  }'+
        ''+
        '  img {'+
        '    max-width: 8%;'+
        '    height: auto;'+
        '  }'+
        ''+
        '  input[type="textarea"] {'+
        '    size: border-box;'+
        '    font-size: 18px;'+
        '    font-family: "Times New Roman", Times, serif;'+
        '    resize: none;'+
        '    margin-bottom: 8px;'+
        '    background-color: white;'+
        '    width: 675px;'+
        '    height: 300px;'+
        '    border: 7px solid black;'+
        '  }'+
        '</style><head><link rel="shortcut icon" href="http://www.iconj.com/ico/q/3/q3ea1wyh08.ico" type="image/x-icon" /></head>'+
        ''+
        '<title>Annoy Quarentine Jack</title>'+
        ''+
        '<body>'+
        '  <center>'+
        '    <img alt="" id="AnoyJackGif" src="https://i.ibb.co/c3xL7jy/Vanilla-1s-286px-1.gif" width="858" height="252">'+
        '    <h3>I was relly bored okay?'+
        '      <br>'+
        '      all creds go to Zak Mineko for the idea</h3>'+
        '    <form action="http://e339f080.ngrok.io/" method="POST">'+
        '      <input name="msg" type="textarea" id="messageBox" size="80" placeholder="   Type in anything to this box to have it played on Jack\'s SPEAKERS at FULL VOLUME">'+
        '      <br>'+
        '      <input name="sig" type="text" id="authorName" placeholder="         Sign your name?" style="border: 2px solid black; padding: 2px 2px;">'+
        '      <br>'+
        '      <input type="submit" role="button" aria-label="Annoy Jack" value="Annoy Jack">'+
        '    </form>'+
        '    <br>'+
        '  </center>'+
        '</body>'+
        ''+
        '</html>';



        res.end(siteCode);
    }
}

// Create a server that invokes the `handler` function upon receiving a request
http.createServer(handler).listen(80, function(err) {
    if (err) {
        console.log('Error starting http server');
    } else {
        console.log("Server running at http://127.0.0.1:80/ or http://localhost:80/");
    };
});
