'use strict'
const exec = require('child_process').exec
    , fs = require('fs')
    , cmdGetTrainDelayInfo = 'curl https://rti-giken.jp/fhc/api/train_tetsudo/delay.json' 
    , targetTrainInfo = JSON.parse(fs.readFileSync(__dirname + '/targetTrainInfo.json', 'utf8'))
    ;

exec(cmdGetTrainDelayInfo,
  (err, stdout, stderr) => {
    if (err) {
      writeLog('err.log', err);
      return;
    }

    writeLog('stdout.log', stdout);
    writeLog('stderr.log', stderr);

    const delayTrainInfo = JSON.parse(stdout);
    delayTrainInfo.forEach((delayRow) => {
      targetTrainInfo.forEach((targetRow) => {
        if (delayRow.name === targetRow.name) {
          postChatWork(targetRow.name, targetRow.link, targetRow.roomId);
        }
      });
    });
  }
);

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
