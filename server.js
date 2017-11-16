let messages = require('./chat_pb');
let services = require('./chat_grpc_pb');

let grpc = require('grpc');

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
server.start();