'use strict'
const fs = require('fs')
    , trainDelayInfo = require('./train-delay')
    , targetTrainInfo = JSON.parse(fs.readFileSync(__dirname + '/targetTrainInfo.json', 'utf8'))
    ;

trainDelayInfo.get()
  .then((data) => {
    data.forEach((delayRow) => {
      targetTrainInfo.forEach((targetRow) => {
        if (delayRow.name === targetRow.name) {
          postChatWork(targetRow.name, targetRow.link, targetRow.roomId);
        }
      });
    });
  })
  .catch((data) => {
    writeLog('err.log', err);
  });

function postChatWork(name, link, id) {
  const chatwork = require('chatwork-client');
 
  const chatworkParams = {
        chatworkToken: process.env.CHATWORK_TOKEN,
        roomId: id,
        msg: name + 'に遅延が出てます。詳しくは詳細情報を確認してください。\n' + link
      };

  chatwork.init(chatworkParams);
  chatwork.postRoomMessages()
    .then()
    .catch((err) => {
      writeLog('err.log', err);
    });
};

function writeLog(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
