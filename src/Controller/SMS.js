var springedge = require('springedge');

var params = {
  'apikey': '', // API Key
  'sender': 'Healthapp', // Sender Name
  'to': [
    '917845281504'  //Moblie Number
  ],
  'message': 'Hello, This is a test message from spring edge',
  'format': 'json'
};

springedge.messages.send(params, 5000, function (err, response) {
  if (err) {
    return console.log(err);
  }
  console.log(response);
});