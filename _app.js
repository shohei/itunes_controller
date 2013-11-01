var serialPort = require("serialport")
serialPort = new serialPort.SerialPort("/dev/tty.usbmodemfa131", {
  baudrate: 9600
});
var exec = require('child_process').exec;
var play = 'osascript playMusic.scpt';
var pause = 'osascript pauseMusic.scpt';
var stop = 'osascript stopMusic.scpt';
var up = 'osascript upVolume.scpt';
var down = 'osascript downVolume.scpt';
 
execCmd = function(cmd) {
    return exec(cmd, {timeout: 1000},
        function(error, stdout, stderr) {
            //console.log('stdout: '+(stdout||'none'));
            //console.log('stderr: '+(stderr||'none'));
            if(error !== null) {
                console.log('exec error: '+error);
            }
        }
    )
};
 
//execCmd(play);

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(input) {
    console.log(input);
	  var buffer = new Buffer(input, 'utf8');
	  var jsonData;
	  try {
	      jsonData = JSON.parse(buffer);
	      console.log('code: ' + jsonData.cmd);
	  } catch(e) {
	      // データ受信がおかしい場合無視する
	      return;
	  }
	  //console.log('data received: ' +);
	  //execCmd(jsonData.cmd);
  });  
});
