'use strict';

var Client = require('azure-iothub').Client;
var http = require('http');

var connectionString = "HostName=Nexford--test.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=QYTrG6QXgv1DT/oXuyNt9xXmTnW1TCT8SAIoTJ3TaEI=";
var client = Client.fromConnectionString(connectionString);
var deviceToReboot = 'lovee';

var startRebootDevice = function () {
  var methodName = "reboot";
  var methodParams = {
    methodName: methodName,
    timeoutInSeconds: 10000
  };

  client.invokeDeviceMethod(deviceToReboot, methodParams, function (err, result) {
    if (err) {
      console.error("Direct method error: " + err.message);
    } else {
      console.log("Successfully invoked the device to reboot.", result);
      // res.send(result)
    }
  });
};

// Set up an HTTP server
var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// Listen on port 3000
server.listen(4000, '127.0.0.1', function (req, res) {
  // Schedule the periodic task

  console.log(res)
  setInterval(startRebootDevice, 2000);
  console.log('Server running at http://127.0.0.1:4000/');
});
