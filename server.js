let messages = require('./chat_pb');
let services = require('./chat_grpc_pb');

let grpc = require('grpc');

/*
login = (call, callback) =>{
    console.log(call.request);
    let reply = new messages.LoginSuccess();
    reply.setSuccess(true);
    reply.setUsername(call.request.getUsername());
    callback(null, reply);
}


const server = new grpc.Server();
server.addService(services.MyChatService, {login: login});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();*/



//------------------------------------------------------------------


//Global Variables
var userList = [];
var channellList = {};
var inbox = {};
var anonymousCount = 0;

// Implementasi endpoint

//Login
function Login(call, callback){
    var user = "hyn ";
    if (call.request.getUsername() === ''){
        anonymousCount++;
        user = "user" + anonymousCount;
        userList.push(user);
    } else {
        anonymousCount++;
        user = call.request.getUsername()+anonymousCount;
        userList.push(user);
    }

    console.log("User " + user + ' logged in.');

    let reply = new messages.LoginSuccess();
    reply.setSuccess(true);
    reply.setUsername(user);

    callback(null, reply);
}

//Join channel
function Join(call, callback){
    var username = call.request.getUsername();
    if (userList.indexOf(username) == -1)
    {
        callback(null, {success: false});
    } else {
        var channel = call.request.getChannel();
        if (!(channel in channellList)) {
            channellList[channel] = [];
        }

        channellList[channel].push(call.request.getUsername());

        let reply = new messages.IsSuccess();
        reply.setSuccess(true);

        callback(null, reply);
        console.log("User " + username + " joined channel " + channel);
    }
}

//Leave channel
function Leave(call, callback){
    var username = call.request.getUsername();
    var channel = call.request.getChannel();

    if ((userList.indexOf(username) == -1) || !(channel in channellList))
    {
        callback(null, {success: false});
    } else {
        var channel = call.request.getChannel();

        var i = channellList[channel].indexOf(username);
        if (i != -1){
            channellList[channel].splice(i, 1);
        }

        let reply = new messages.IsSuccess();
        reply.setSuccess(true);
    
        callback(null, reply);
    }
}

//Send message to a channel
function Send(call, callback){
    var username = call.request.getUsername();
    var channel = call.request.getChannel();
    var msg = call.request.getMsg();

    if ((userList.indexOf(username) == -1) || !(channel in channellList)){
        callback(null, {success: false});
    } else {
        var members = channellList[channel];
        for (var i = 0; i < members.length; i++){
            if (!(members[i] in inbox)){
                inbox[members[i]] = [];
            }
            inbox[members[i]].push("@" + channel + " " + username + " : " + msg);
        }
        let reply = new messages.IsSuccess();
        reply.setSuccess(true);
        callback(null, reply);
    }
}

//Get message for an user
function getMessages(call, callback){
    var user = call.request.getUsername();

    if (userList.indexOf(user) == -1) {
        let reply = new messages.Messages();
       // reply.setMessagesList("null");
        reply.setSuccess(false);
        callback(null, reply);
    
    } else {
        if (!(user in inbox)){
            inbox[user] = [];
        }

        
        var temp = inbox[user];
        inbox[user] = [];

        let reply = new messages.Messages();
        reply.setMessagesList(temp);
        reply.setSuccess(true);

        callback(null, reply);
    }
}

//Broadcast message to all channel user subscribed
function broadcastMessage(call, callback){
    var username = call.request.getUsername();
    var message = call.request.getMsg();

    if (userList.indexOf(username) == -1){
        callback(null, {success: false});
    } else {
        for (var channel in channellList) {
            var members = channellList[channel];
            if (members.indexOf(username) != -1) {
                for (var i = 0; i < members.length; i++) {
                    if (members[i] != username) {
                        if (!(members[i] in inbox)) {
                            inbox[members[i]] = [];
                        }
                        inbox[members[i]].push("@" + channel + " " + username + " : " + message);
                    }
                }
            }
        }
        let reply = new messages.IsSuccess();
        reply.setSuccess(true);
        callback(null, reply);
    }
}


//Main
var server = new grpc.Server();
server.addService(services.MyChatService, {
    login : Login,
    join : Join,
    leave : Leave,
    sendMessage : Send,
    getMessages : getMessages,
    broadcastMessage : broadcastMessage
});

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();
