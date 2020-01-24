node-red-contrib-airtable
========================

このノードは、<a href="https://airtable.com/" target="_new">Airtable</a> の<a href="http://nodered.org" target="_new">Node-RED</a> ノードのコレクションです。

[![NPM](https://nodei.co/npm/node-red-contrib-airtable.png?downloads=true)](https://nodei.co/npm/node-red-contrib-airtable/)

前提条件
-------

node-red-contrib-airtableは、<a href="http://nodered.org" target="_new">Node-RED</a>のインストールが必要です。

インストール
-------

Node-REDをインストールしたルートディレクトリで以下のコマンドを実行します。

    npm install node-red-contrib-airtable

Node-REDインスタンスを再起動すると、パレットにairtableノードが表示されて使用可能になります。

概要
-------

node-red-contrib-airtableは、以下の処理を行います。

- **select** - テーブルの一覧を取得します。

- **find** - テーブルの指定したレコードを取得します。

- **create** - テーブルに新しいレコードを作成します。

- **update** - テーブルのレコードを更新します。`update`は、指定した項目の値のみ更新され、他の項目の値は維持されます。

- **replace** - テーブルのレコードを更新します。`replace`は、指定した項目の値を更新し、他の項目の値はクリアされます。

- **delete** - テーブルのレコードを削除します。


謝辞
-------

node-red-contrib-airtableは、次のオープンソースソフトウェアを使用しています。

- [Airtable](https://github.com/Airtable/airtable.js): 簡素化されたAirtableクライアント

ライセンス
-------

こちらを参照してください。 [license](https://github.com/joeartsea/node-red-contrib-airtable/blob/master/LICENSE) (Apache License Version 2.0).

貢献
-------

[GitHub issues](https://github.com/joeartsea/node-red-contrib-airtable/issues)への問題提起、Pull requestsのどちらもあなたの貢献を歓迎します。


開発者
-------

開発者がnode-red-contrib-airtableのソースを改変する場合、以下のコードを実行してクローンを作成します。

```
cd ~\.node-red\node_modules
git clone https://github.com/joeartsea/node-red-contrib-airtable.git
cd node-red-contrib-airtable
npm install
```
