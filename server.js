/**
 * Created by margaritiko on 15.05.16.
 */
var http = require('http');
var chat = require('./wiki');
var fs = require('fs');

http.createServer(function(req, res) {
        switch(req.url) {
            case '/':
                sendFile('index.html', res);
                break;
            case '/publish':
                var body = "";
                req.on("readable", function() {
                    data = req.read();
                    if (data) {
                        body += data;
                    }
                })
                    .on("end", function() {
                        body = JSON.parse(body);
                        chat.publish(body.message);
                        res.end("ok");
                    })
                break;
            case '/subscribe':
                chat.subscribe(req, res);
        }
    }
).listen(process.env.PORT || 3000);

function sendFile(fileName, res) {
    var fileContent = fs.readFileSync(fileName);
    res.end(fileContent);
}