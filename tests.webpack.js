require('babel-polyfill');
var context = require.context('./test', true, /_spec\.jsx?$/); // make sure you have your directory and regex test set correctly!
context.keys().forEach(context);