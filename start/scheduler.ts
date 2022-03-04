const schedule = require('node-schedule');
const notifier = require('node-notifier');
import axios from 'axios';

const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

console.log("[ "+colours.fg.blue+"info"+colours.reset+" ]  running scheduler...")

const job = schedule.scheduleJob('* * * * *', function(){
	// console.log("log run")
	let charging_check = axios.get("http://starclickncx.telkom.local:8000/battery-status")
	.then((_completed)=>{
		if(_completed.data.is_charge && _completed.data.batter_level > 0.95){
			// console.log(_completed.data)
			sendNotif('Chargin notification',"Please unplag cable power")
		}
	})
	.catch((_err)=>{
		console.log("[ "+colours.fg.yellow+"scheduler"+colours.reset+" ]  Failed get http://localhost:8000/battery-status...")
		console.log(_err)
	})
	.then((_completed)=>{ 
		// Always executed hire
		
	})
});
function sendNotif(_tittle, _message){
		notifier.notify(
			{
				title: _tittle,
				message: _message,
				// icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
				sound: true, // Only Notification Center or Windows Toasters
				wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
			},
			function (err, response, metadata) {
			// Response is response from notification
			// Metadata contains activationType, activationAt, deliveredAt
			}
			);

			// notifier.on('click', function (notifierObject, options, event) {
			// // Triggers if `wait: true` and user clicks notification
			// });

			// notifier.on('timeout', function (notifierObject, options) {
			// // Triggers if `wait: true` and notification closes
			// });
}