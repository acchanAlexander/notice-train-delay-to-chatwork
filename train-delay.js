'use strict'
const request = require('request');

const trainDelayInfo = {

  get: () => {
    const options = {
      uri: 'https://tetsudo.rti-giken.jp/free/delay.json',
      json: true
    };

    return new Promise((resolve, reject) => {
      request.get(options, (error, response, body) => {
        if (!error) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

}

module.exports = trainDelayInfo;
