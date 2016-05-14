'use strict'
const exec = require('child_process').exec
    , fs = require('fs')
    , cmdGetTrainDelayInfo = 'curl https://rti-giken.jp/fhc/api/train_tetsudo/delay.json' 
    , lineMaster = JSON.parse(fs.readFileSync(__dirname + '/targetLineInfo.json', 'utf8'))
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
    delayTrainInfo.forEach((infoRow) => {
      lineMaster.forEach((masterRow) => {
        if (infoRow.name === masterRow.name) {
          postChatWork(masterRow.name, masterRow.link, masterRow.roomId);
        }
      });
    });
  }
);

function postChatWork(name, link, id) {
  const msg = name + 'に遅延が出てます。詳しくは詳細情報を確認してください。\n' + link
      , cmdPostChatWork = 'curl -X POST -H "X-ChatWorkToken: ' + process.env.CHATWORK_TOKEN + '" -d "body=' + msg + '" "https://api.chatwork.com/v1/rooms/' + id + '/messages"'
      ;
 
  exec(cmdPostChatWork,
    function (err, stdout, stderr) {
      if (err){
        writeLog('err.log', err);
        return;
      }

      writeLog('stdout.log', stdout);
      writeLog('stderr.log', stderr);
    }
  );
};

function writeLog(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
