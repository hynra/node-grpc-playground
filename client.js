let messages = require('./chat_pb');
let services = require('./chat_grpc_pb');

const grpc = require('grpc');

/*
main = () => {
    var client = new services.MyChatClient('localhost:50051',
        grpc.credentials.createInsecure());
    var request = new messages.Username();
    var user = "Hendra";
    request.setUsername(user);
    client.login(request, function (err, response) {
        if (err) {
            console.log(err);
        } {
            console.log('Greeting:'+ response.getUsername());
        }
    });
}

//Retreive message every interval from server
getMessages = () => {
    client.getMessages({username: username}, function(err, response){
        if (err){
            console.log("Failed to connect to server");
            process.exit()
        } else {
            for (var i = 0; i < response.messages.length; i++) {
                console.log(response.messages[i]);
            }

            timeoutId = setTimeout(getMessages, GET_MESSAGES_INTERVAL);
        }
    });
}

main(); */



var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Constant
var GET_MESSAGES_INTERVAL = 500;

//Global Variables
var client = new services.MyChatClient('localhost:50051',grpc.credentials.createInsecure());
var username;
var timeoutId;

//Get random userneam first
var request = new messages.Username();
var user = "hyn ";
request.setUsername(user);

client.login(request, function(err, response){
   if (err){
       console.log("Error login in");
       console.log(err);
   }  else {
       if (response.getSuccess() == false){
           console.log("Error login in");
       } else {
           console.log("Welcome to GRPC Chat");
           console.log("===============================================");
           console.log("Command List:");
           console.log("/JOIN <channel name>: Join channel");
           console.log("/LEAVE <channel name>: Leave channel");
           console.log("/NICK <your nick>: Change your nick name. Note: Everytime you change your nick, you must rejoin your subscribed channel");
           console.log("/EXIT: Exit from application");
           console.log('');
           console.log('To send message:');
           console.log("@<channel name>: Send message to a channel");
           console.log("To broadcast to all channel you have joined, just type your message and press enter");
           console.log("===============================================");
           console.log("You are logged in as " + response.getUsername());
           console.log("");
           username = response.getUsername();
           timeoutId = setTimeout(getMessages, GET_MESSAGES_INTERVAL);
           readCommand();
       }
   }
});

//Register event on user input, and process it
function readCommand(){
    rl.on('line', function(line){
        //Process command

        //Join Channel
        if (line.indexOf('/JOIN') == 0){
            var request0 = new messages.ChannelName();
            request0.setUsername(username);
            request0.setChannel(line.substr(6));
            client.join(request0, function (err, response) {
                if (err){
                    console.log("Failed to join channel");
                    console.log(err);
                } else{
                    if (response.getSuccess() == false){
                        console.log("Failed to join channel");
                    } else {
                        console.log("Success joining channel");
                    }
                }
            });
        //Leave channel
        } else if (line.indexOf('/LEAVE') == 0){
            var channel = line.substr(7);
            if (channel == ''){
                return;
            }
            var request2 = new messages.ChannelName();
            request2.setUsername(username);
            request2.setChannel(line.substr(7));
            client.leave(request2, function (err, response) {
                if (err){
                    console.log("Failed to leave channel");
                } else{
                    if (response.getSuccess() == false){
                        console.log("Failed to leave channel");
                    } else {
                        console.log("Success leaving channel");
                    }
                }
            });
            console.log("Leaving channel");
        //Change nikcname
        } else if (line.indexOf('/NICK') == 0){
            request.setUsername(line.substr(6));
            client.login(request, function(err, response){
                if (err){
                    console.log("Error login in");
                }  else {
                    if (response.getSuccess() == false){
                        console.log("Error login in");
                    } else {
                        console.log("Welcome, " + response.getUsername());
                        username = response.getUsername();
                    }
                }
            });
        //Send message to a channel
        } else if (line.indexOf('@') == 0){
            var i = line.indexOf(' ');
            var channel = line.substr(1, i - 1);
            var msg = line.substr(i + 1);

            var reqMsg = new messages.Message();
            reqMsg.setUsername(username);
            reqMsg.setChannel(channel);
            reqMsg.setMsg(msg);

            client.sendMessage(reqMsg, function(err, response){
                if (err){
                    console.log("Connection error");
                }  else {
                    if (response.getSuccess() == false){
                        console.log("Error sending message");
                    } else {
                        console.log("Message sent");
                    }
                }
            });
        //Exit from application
        } else if (line.indexOf('/EXIT') == 0){
            rl.close();
            clearTimeout(timeoutId);
            process.exit();
        //Broadcast message
        } else {
            var reqBroad = new messages.BroadcastMsg();
            reqBroad.setUsername(username);
            reqBroad.setMsg(line);
            client.broadcastMessage(reqBroad, function (err, response) {
                if (err){
                    console.log("Connection error");
                } else {
                    console.log("Message sent");
                }
            });
        }
    });
}

//Retreive message every interval from server
function getMessages(){

    client.getMessages(request, function(err, response){
        if (err){
            console.log("Failed to connect to server");
            console.log(err);
            process.exit()
        } else {
            for (var i = 0; i < response.getMessagesList().length; i++) {
                console.log(response.getMessagesList()[i]);
            }

            timeoutId = setTimeout(getMessages, GET_MESSAGES_INTERVAL);
        }
    });
}