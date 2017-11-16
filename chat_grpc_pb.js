// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var chat_pb = require('./chat_pb.js');

function serialize_Chat_BroadcastMsg(arg) {
  if (!(arg instanceof chat_pb.BroadcastMsg)) {
    throw new Error('Expected argument of type Chat.BroadcastMsg');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Chat_BroadcastMsg(buffer_arg) {
  return chat_pb.BroadcastMsg.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Chat_ChannelName(arg) {
  if (!(arg instanceof chat_pb.ChannelName)) {
    throw new Error('Expected argument of type Chat.ChannelName');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Chat_ChannelName(buffer_arg) {
  return chat_pb.ChannelName.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Chat_IsSuccess(arg) {
  if (!(arg instanceof chat_pb.IsSuccess)) {
    throw new Error('Expected argument of type Chat.IsSuccess');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Chat_IsSuccess(buffer_arg) {
  return chat_pb.IsSuccess.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Chat_LoginSuccess(arg) {
  if (!(arg instanceof chat_pb.LoginSuccess)) {
    throw new Error('Expected argument of type Chat.LoginSuccess');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Chat_LoginSuccess(buffer_arg) {
  return chat_pb.LoginSuccess.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Chat_Message(arg) {
  if (!(arg instanceof chat_pb.Message)) {
    throw new Error('Expected argument of type Chat.Message');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Chat_Message(buffer_arg) {
  return chat_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Chat_Messages(arg) {
  if (!(arg instanceof chat_pb.Messages)) {
    throw new Error('Expected argument of type Chat.Messages');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Chat_Messages(buffer_arg) {
  return chat_pb.Messages.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Chat_Username(arg) {
  if (!(arg instanceof chat_pb.Username)) {
    throw new Error('Expected argument of type Chat.Username');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Chat_Username(buffer_arg) {
  return chat_pb.Username.deserializeBinary(new Uint8Array(buffer_arg));
}


var MyChatService = exports.MyChatService = {
  login: {
    path: '/Chat.MyChat/login',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.Username,
    responseType: chat_pb.LoginSuccess,
    requestSerialize: serialize_Chat_Username,
    requestDeserialize: deserialize_Chat_Username,
    responseSerialize: serialize_Chat_LoginSuccess,
    responseDeserialize: deserialize_Chat_LoginSuccess,
  },
  join: {
    path: '/Chat.MyChat/join',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.ChannelName,
    responseType: chat_pb.IsSuccess,
    requestSerialize: serialize_Chat_ChannelName,
    requestDeserialize: deserialize_Chat_ChannelName,
    responseSerialize: serialize_Chat_IsSuccess,
    responseDeserialize: deserialize_Chat_IsSuccess,
  },
  leave: {
    path: '/Chat.MyChat/leave',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.ChannelName,
    responseType: chat_pb.IsSuccess,
    requestSerialize: serialize_Chat_ChannelName,
    requestDeserialize: deserialize_Chat_ChannelName,
    responseSerialize: serialize_Chat_IsSuccess,
    responseDeserialize: deserialize_Chat_IsSuccess,
  },
  sendMessage: {
    path: '/Chat.MyChat/sendMessage',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.Message,
    responseType: chat_pb.IsSuccess,
    requestSerialize: serialize_Chat_Message,
    requestDeserialize: deserialize_Chat_Message,
    responseSerialize: serialize_Chat_IsSuccess,
    responseDeserialize: deserialize_Chat_IsSuccess,
  },
  broadcastMessage: {
    path: '/Chat.MyChat/broadcastMessage',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.BroadcastMsg,
    responseType: chat_pb.IsSuccess,
    requestSerialize: serialize_Chat_BroadcastMsg,
    requestDeserialize: deserialize_Chat_BroadcastMsg,
    responseSerialize: serialize_Chat_IsSuccess,
    responseDeserialize: deserialize_Chat_IsSuccess,
  },
  getMessages: {
    path: '/Chat.MyChat/getMessages',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.Username,
    responseType: chat_pb.Messages,
    requestSerialize: serialize_Chat_Username,
    requestDeserialize: deserialize_Chat_Username,
    responseSerialize: serialize_Chat_Messages,
    responseDeserialize: deserialize_Chat_Messages,
  },
};

exports.MyChatClient = grpc.makeGenericClientConstructor(MyChatService);
