// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')

/*

│ HEAD, GET  │ /api/arduino            │ DevicesController.index          │            │ arduino.index   │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ HEAD, GET  │ /api/arduino/create     │ DevicesController.create         │            │ arduino.create  │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ POST       │ /api/arduino            │ DevicesController.store          │            │ arduino.store   │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ HEAD, GET  │ /api/arduino/:id        │ DevicesController.show           │            │ arduino.show    │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ HEAD, GET  │ /api/arduino/:id/edit   │ DevicesController.edit           │            │ arduino.edit    │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ PUT, PATCH │ /api/arduino/:id        │ DevicesController.update         │            │ arduino.update  │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ DELETE     │ /api/arduino/:id        │ DevicesController.destroy        │            │ arduino.destroy │
*/

export default class DevicesController {

	// public  index(){
	// 	let message = null;
	// 	let isPortOpen = false;
	// 	const parser = new Readline()
	// 	const port = new SerialPort('COM3',
	// 		{baudRate:9600} ,
	// 		function (err) {
	// 			if (err) {

	// 				return console.log("[ "+colours.fg.yellow+"arduino"+colours.reset+" ]  COM3 not found, please plug arduino device...")

	// 			}
	// 		}
	// 		)
	// 	port.pipe(parser)
	// 	parser.on('data', (_data)=>{
	// 		if(_data != ''){
	// 			// console.log("message from device: ",_data)
	// 			message = _data
	// 		}
	// 	})

	// 	port.on('open',function(err){
	// 		if(err){
	// 			isPortOpen = false;
	// 			message = err
	// 		}
	// 		isPortOpen = true;

	// 		port.write("LED ON")
	// 		message = "trying to led on "
	// 	})

	// 	if(isPortOpen){
	// 		port.write("LED ON")
	// 	}
		
	// 	return {code:0, guid:0, info:"Index method", message:message}
	// }
	// public async create(){
	// 	return {code:0, guid:0, info:"create method", message:"You access create method by get requests"}
	// }
	// public async store(){
	// 	return {code:0, guid:0, info:"store method", message:"You access store method by get requests"}
	// }
	// public async show(){
	// 	return {code:0, guid:0, info:"show method", message:"You access show method by get requests"}
	// }
	// public async edit(){
	// 	return {code:0, guid:0, info:"edit method", message:"You access edit method by get requests"}
	// }
	// public async update(){
	// 	return {code:0, guid:0, info:"update method", message:"You access update method by get requests"}
	// }
	// public async destroy(){
	// 	return {code:0, guid:0, info:"destroy method", message:"You access destroy method by get requests"}
	// }
}
