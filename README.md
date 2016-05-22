# 概要
複数の路線についての情報を、それぞれ通知したいチャットワークのルームに通知できるようにしています。  
遅延情報のデータには　<https://rti-giken.jp/fhc/api/train_tetsudo/>　様で提供していただいている情報を使っています。  
nodeJsで書いているので、nodeJsをインストールする必要があります。

# 使い方
githubからcloneしたのち targetTrainInfo.json に、通知したい路線についての情報を記述します。
## targetTrainInfo.jsonに記載する項目について
### name
路線の名前。  
ここで設定しないといけないのは　<https://rti-giken.jp/fhc/api/train_tetsudo/> の路線名に合致する命名でなければなりません。
### link
詳細情報が載っているリンクを設定します。  
<https://www.tetsudo.com/traffic/> にあるリンク先を設定するなどして使ったらいいかと思ってます。  
ここの値はなくてもかまわないので、その場合は空文字列''などを入れてください。
### roomId
通知先のチャットワークのroomIdを設定します。  
roomIdについては、ブラウザでルームを開きURL末尾の #!ridxxxxxxx となっているxxxxxxxの部分です。  


## 実行方法
実行は  
`node main.js`  
とコマンドを打ちます。実行時に遅延している路線があれば、チャットワークに通知が飛びます。  
実行を cron で設定し、例えば家を出る1時間前や会社を出る1時間に通知を飛ばすような使い方を想定しています。  
現在、nodeのバージョンは v4.4.4 で正常に動いていることを確認しています。

# nodeJsのインストールについて
こちらの記事が参考になります  
http://qiita.com/akippiko/items/3708016fc43da088021c
