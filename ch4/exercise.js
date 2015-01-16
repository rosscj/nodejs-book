"use strict";
const
  cluster = require('cluster'),
  zmq = require('zmq');

if (cluster.isMaster) {
  
  // master process
  // - create PUSH and PULL sockets, bind TCP endpoints
  let
    pusher = zmq.socket('push').bind('tcp://127.0.0.1:5433'),
    puller = zmq.socket('pull').bind('tcp://127.0.0.1:5444'),
    
    readyCount = 0,
    
    sendWork = function(){
      // all workers are ready, send out thirty jobs
      for (let i = 0; i < 30; i++) {
        pusher.send(JSON.stringify({index: i}));
      }
    };
  
  // listen for worker messages
  puller.on('message', function(data) {
    
    let message = JSON.parse(data);
    
    if (message.ready) {
      readyCount += 1;
      if (readyCount === 3) {
        sendWork();
      }
    } else if (message.result) {
      console.log('received: ' + data); 
    }
    
  });
  
  // fork three worker processes
  for (let i = 0; i < 3; i++) {
    cluster.fork();
  }
  
  // listen for workers to come online
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online.');
  });
  
} else {
  
  // worker process
  // - create PULL socket, connect to master's PUSH
  // - create PUB socket, connect to master's SUB
  let
    puller = zmq.socket('pull').connect("tcp://127.0.0.1:5433"),
    pusher = zmq.socket('push').connect("tcp://127.0.0.1:5444");
  
  puller.on('message', function(data) {
    
    // parse incoming message
    let job = JSON.parse(data);
    console.log(process.pid + " received job: " + job.index);
    
    // publish response
    pusher.send(JSON.stringify({
      index: job.index,
      pid: process.pid,
      result: 'success'
    }));
    
  });
  
  // signal ready
  pusher.send(JSON.stringify({
    ready: true,
    pid: process.pid
  }));
  
}
