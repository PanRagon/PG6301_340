const express_ws = require('express-ws');


let ews;

function init(app) {

    ews = express_ws(app);

    app.ws('/', function (socket, req) {
        console.log('Established a new WS connection');
        const data = JSON.stringify({additionalPack: true});
        socket.on("open", function open() {
            console.log("connected to WS gift machine")
            socket.setInterval(function addPack() {
                socket.send(data);
            }, 1000);
    });
})};


module.exports = {init};