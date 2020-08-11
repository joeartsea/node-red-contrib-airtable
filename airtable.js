/**
 * Copyright 2018 Atsushi Kojo.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function (RED) {
  'use strict';
  var Airtable = require('airtable');

  function AirtableNode(n) {
    RED.nodes.createNode(this, n);
    var node = this;
    var credentials = RED.nodes.getCredentials(n.id);
  }

  RED.nodes.registerType('airtable', AirtableNode, {
    credentials: {
      apiKey: { type: 'password' },
      baseId: { type: 'text' }
    }
  });

  function AirtableOutNode(n) {
    RED.nodes.createNode(this, n);
    this.airtable = n.airtable;
    this.table = n.table;
    this.operation = n.operation;
	this.outputType = n.outputType;
    this.airtableConfig = RED.nodes.getNode(this.airtable);
    if (this.airtableConfig) {
      var node = this;
      var credentials = RED.nodes.getCredentials(this.airtable);
      node.convType = function (payload, targetType) {
        if (typeof payload !== targetType) {
          if (targetType == 'string') {
            payload = JSON.stringify(payload);
          } else {
            payload = JSON.parse(payload);
          }
        }
        return payload;
      };
      node.on('input', function (msg) {
        node.sendMsg = function (err, result) {
          if (err) {
            node.error(err.toString(), msg);
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });
          } else {
            msg.payload = { 'id': result.id, 'fields': result.fields };
            node.status({});
          }
          node.send(msg);
        };
        if(credentials.apiKey == '' || credentials.apiKey == null){
          node.sendMsg('API key Not found');
          return;
        }
        var base = new Airtable({apiKey: this.airtableConfig.credentials.apiKey}).base(this.airtableConfig.credentials.baseId);
        var table = msg.table || node.table;
        var operation = msg.operation || node.operation;
		var outputType = msg.outputType || node.outputType;
        switch (operation) {
          case 'select':
            let records = [];
            msg.payload = node.convType(msg.payload, 'object');
            base(table).select(msg.payload)
               .eachPage(function page(records, fetchNextPage) {
                records.forEach(function(record) {
                    //node.sendMsg(null, record);
                });
                fetchNextPage();
				switch (outputType) {
					case 'multiple':
					for (var i = 0; i < records.length; i++){
						msg = {'payload':{'id':records[i].id, 'fields': records[i].fields}};
						node.send(msg);
					}
					break;
					case 'array':
					msg = {"payload": records}
					for (var i = 0; i < records.length; i++){
						msg.payload[i] = {'id':records[i].id, 'fields': records[i].fields};
					}
					node.send(msg);
					break;
				}
			          
              }, function done(err) {
                  if (err) { 
                    node.error(err.toString(), msg);
                    console.error(err); 
                    return; 
                  }
              });
            break;
          case 'find':
            msg.payload = node.convType(msg.recId, 'string');
            base(table).find(msg.recId, node.sendMsg);
            break;
          case 'create':
            msg.payload = node.convType(msg.payload, 'object');
            base(table).create(msg.payload, node.sendMsg);
            break;
          case 'update':
            msg.payload = node.convType(msg.payload, 'object');
            base(table).update(msg.recId, msg.payload, node.sendMsg);
            break;
          case 'replace':
            msg.payload = node.convType(msg.payload, 'object');
            base(table).replace(msg.recId, msg.payload, node.sendMsg);
            break;
          case 'delete':
            msg.payload = node.convType(msg.payload, 'object');
            base(table).destroy(msg.recId, node.sendMsg);
            break;
          default:
            node.error('unknown operation', msg);
            console.error('unknown operation');
        }
      });
    } else {
      this.error('missing airtable configuration');
    }
  }
  RED.nodes.registerType('airtable out', AirtableOutNode);
}
