var exec = require('child_process').exec;
var commandJSON = {
	"play" : 'osascript playMusic.scpt',
	"pause" : 'osascript pauseMusic.scpt',
	"stop" : 'osascript stopMusic.scpt',
	"up": 'osascript upVolume.scpt',
	"down" : 'osascript downVolume.scpt'
}
 
execCmd = function(cmd) {
    return exec(cmd, {timeout: 1000},
        function(error, stdout, stderr) {
            //console.log('stdout: '+(stdout||'none'));
        	console.log("execCmd fired to"+cmd);
            if(error !== null) {
                console.log('exec error: '+error);
            }
        }
    )
};

var serialport = require('serialport');
var portName = '/dev/tty.usbmodemfa131'; // Mac
var sp = new serialport.SerialPort(portName, {
	baudRate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,
	parser: serialport.parsers.readline("\n")   // ※修正：パースの単位を改行で行う
    });

sp.on('data', function(input) {
	console.log(input);
	var buffer = new Buffer(input, 'utf8');
	var jsonData;
	try {
	    jsonData = JSON.parse(buffer);
	    console.log('code: ' + jsonData.cmd);
	} catch(e) {
	    return;
	}
 execCmd(commandJSON[jsonData.cmd]);
 });

