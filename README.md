node-red-contrib-airtable
========================

[**Japanese**](./README_ja.md)

A collection of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for <a href="https://airtable.com/" target="_new">Airtable</a>.

[![NPM](https://nodei.co/npm/node-red-contrib-airtable.png?downloads=true)](https://nodei.co/npm/node-red-contrib-airtable/)

Pre-requisites
-------

The node-red-contrib-airtable requires <a href="http://nodered.org" target="_new">Node-RED</a> to be installed.

Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-airtable

Restart your Node-RED instance, the airtable node appears in the palette and ready for use.

Overview
-------

node-red-contrib-airtable performs the following processing.

- **select** - Get a list of tables.

- **find** - Get the specified record in the table.

- **create** - Create a new record in the table.

- **update** - Update a record in a table. `update` will only update the fields you specify, leaving the rest as they were.

- **replace** - Update a record in a table. `replace` will only update the fields you specify and clear all unspecified field values.

- **delete** - Delete a record in a table.


Acknowledgements
----------------

The node-red-contrib-airtable uses the following open source software:

- [Airtable](https://github.com/Airtable/airtable.js): Simplified Airtable client.

License
-------

See [license](https://github.com/joeartsea/node-red-contrib-airtable/blob/master/LICENSE) (Apache License Version 2.0).

Contributing
-------

Both submitting issues to [GitHub issues](https://github.com/joeartsea/node-red-contrib-airtable/issues) and Pull requests are welcome to contribute.


Developers
-------

If the developer wants to modify the source of node-red-contrib-airtable, run the following code to create a clone.

```
cd ~\.node-red\node_modules
git clone https://github.com/joeartsea/node-red-contrib-airtable.git
cd node-red-contrib-airtable
npm install
```
