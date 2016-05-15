exports.publish = function(message) {
    clients.forEach(function(res) {
        res.end(message);
    });
    clients = [];
}

clients = [];
clientsName = [];
clientsColor = [];
var nowClient;



function isIn(obj1, obj2) {
    var ans = false;
    for (i=0;i<obj2.length;i++) {
        if (obj2[i] == obj1) {
            ans = true;
        }
    }
    return ans;
}
exports.save = function(message) {
    clientsName.push(message);
    console.log('name was pushed');
    clients.forEach(function(res) {
        res.end(message);
    });
    clients = [];

}
exports.subscribe = function(req, res) {
    clients.push(res);
    console.log('clientsName.length is', clientsName.length, "clientsName.top is", clientsName.top);
    if (clientsName.length >= 1) {
        if (!(isIn(req.client, clientsName))) {
            clientsName.push(req.client);
            console.log("YESYESYES!!!")
        }
    } else {
        clientsName.push(req.client);
    }
    nowClient = req.client;
}
exports.clients = clientsName;
