let messages = require('./chat_pb');
let services = require('./chat_grpc_pb');

const grpc = require('grpc');

main = () => {
  var client = new services.MyChatClient('localhost:50051',
                                          grpc.credentials.createInsecure());
  var request = new messages.Username();
  var user = "Hendra";
  request.setUsername(user);
  client.login(request, function(err, response) {
    console.log('Greeting:', response.getUsername());
  });
}

main();