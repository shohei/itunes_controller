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
 
execCmd(play);

