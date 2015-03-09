var mlog = require('cloud/mlog');
var muser=require('cloud/muser');
var util=require('util');
var mutil=require('cloud/mutil');

var msgTypeText=0;
var msgTypeImage=1;
var msgTypeAudio=2;
var msgTypeLocation=3;

function messageReceived(req, res) {
  //mlog.logObject(req.params,true);
  res.success();
}

function getPushMessage(params,user){
  var contentStr=params.content;
  var json={
    badge:"Increment",
    sound:"default"
  };
  var msg=JSON.parse(contentStr);
  var msgDesc=getMsgDesc(msg);
  var name=user.get('username');
  json.alert=name+' : '+msgDesc;
  return JSON.stringify(json);
}

function getMsgDesc(msg){
  if(msg.type==msgTypeText){
    if(/\\u1f[a-z0-9]{3}/.test(msg.content)){
      return "表情";
    }else{
      return msg.content;
    }
  }else if(msg.type==msgTypeImage){
    return "图片";
  }else if(msg.type==msgTypeAudio){
    return "声音";
  }else if(msg.type==msgTypeLocation){
    return msg.content;
  }else{
    return msg.content;
  }
}

function _receiversOffLine(params){
  var p=new AV.Promise();
  muser.findUserById(params.fromPeer).then(function(user){
    var msg=getPushMessage(params,user);
    p.resolve({pushMessage:msg});
  },mutil.rejectFn(p));
  return p;
}

function receiversOffline(req, res) {
  _receiversOffLine(req.params).then(function(result){
    res.success(result);
  },function(error){
    console.log(error.message);
    res.success();
  });
}

exports.messageReceived = messageReceived;
exports.receiversOffline = receiversOffline; // used by main.js
exports._receiversOffLine=_receiversOffLine;
exports.getPushMessage=getPushMessage;
