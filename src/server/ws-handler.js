const express_ws = require('express-ws');


let ews;

function init(app) {

    ews = express_ws(app);

    app.ws('/', function (socket, req) {
        socket.on("open", function open() {
            console.log("Connected to Websocket session");
            socket.send(Date.now());

            socket.setInterval(function timeout() {
                socket.ping();
                socket.send({newPack: true})
            }, 5000);
        });
    });
}


module.exports = {init};