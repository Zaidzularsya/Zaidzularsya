import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import Encryption from '@ioc:Adonis/Core/Encryption'
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Session from '@ioc:Adonis/Session/Session'
import batteryLevel from 'battery-level';
// import isCharging from 'is-charging';
import isCharging from 'is-charging';
import axios from 'axios';
// const notifier = require('node-notifier');


/*
│ HEAD, GET  │ /api/users              │ UsersController.index            │ auth       │ users.index     │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ HEAD, GET  │ /api/users/create       │ UsersController.create           │ auth       │ users.create    │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ POST       │ /api/users              │ UsersController.store            │ auth       │ users.store     │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ HEAD, GET  │ /api/users/:id          │ UsersController.show             │ auth       │ users.show      │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ HEAD, GET  │ /api/users/:id/edit     │ UsersController.edit             │ auth       │ users.edit      │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ PUT, PATCH │ /api/users/:id          │ UsersController.update           │ auth       │ users.update    │
├────────────┼─────────────────────────┼──────────────────────────────────┼────────────┼─────────────────┤
│ DELETE     │ /api/users/:id          │ UsersController.destroy          │ auth       │ users.destroy   │
*/


export default class UsersController {
	
	// Default resource of method 
	// UsersController.index
	// UsersController.create
	// UsersController.store
	// UsersController.show
	// UsersController.edit
	// UsersController.update
	// UsersController.destroy


	public async index(){
		// parameter index {request, response, params, auth}
		// console.log(request.ips())
		let users 	= Database
						.from('ZT_USERS')
						.leftJoin('ZT_PROFILS','ZT_USERS.USER_ID','=','ZT_PROFILS.USER_ID')
						.select('*')
		console.log("Index of controller is runnign..")
		
		return users
	}

	public async create(){
		// parameter index {request, response, params, auth}
		return "create"
	}

	public async store({request}){
		let _data 	= request.all()
		let _input 	= JSON.parse(_data.data)
		_input.PASSWORD = Encryption.encrypt(_input.PASSWORD)
		// let store_data = await Database.table('ZT_USERS').insert(_input)
		let _verify_email = this.getVerifyUrl("Yulianto@neuronworks.co.id")
		let result 	= {
			status: 'success',
			input: _input,
			verify_email: _verify_email,
			// plaintxt: Encryption.decrypt(_input.PASSWORD)
		}
		return result
	}

	public async show({params}){
		// return session.get('username')
		// Get detail Profil 
		let username: string = params.id
		let profil = await Database
						.from('ZT_USERS')
						.leftJoin('ZT_PROFILS','ZT_USERS.USER_ID','=','ZT_PROFILS.USER_ID')
						.where('username',username)
		return profil[0]
	}

	public async edit(){
		return "edit"
	}

	public async update(){
		return "update"
	}

	public async destroy(){
		return "destroy"
	}

	public async login({request, session}){
		let param = request.only(['username','password'])
		// console.log(param.username,':',param.password)
		let getPass = await this.getPassword(param.username)
		let checkPass = Boolean(getPass.find(e => Encryption.decrypt(e.password) === param.password))
		// console.log(checkPass)
		let result : Array<any> =[]
		if (checkPass){
			let users = await Database
						.from('ZT_USERS')
						.leftJoin('ZT_PROFILS','ZT_USERS.USER_ID','=','ZT_PROFILS.USER_ID')
						.where((query)=>{
							query.where('username',param.username)
						})
			// Set Session 
			session.put('USER_ID',users[0].USER_ID)
			session.put('USERNAME',users[0].USERNAME)
			session.put('NAME',users[0].NAME)
			session.put('EMAIL',users[0].EMAIL)
			session.put('USER_STATUS_ID',users[0].USER_STATUS_ID)
			session.put('USER_LEVEL',users[0].USER_LEVEL)
			session.put('IS_VERIFY',users[0].IS_VERIFY)
			session.put('SESSION_ID',session.sessionId )
			users[0].SESSION_ID = session.sessionId;

			// result = users[0]
			result.push({guid:1,code:1,info:'Login success',session:session.get('SESSION_ID'), session_id : session.sessionId, users: users[0]})
		}else{
			result.push({guid:1,code:1,info:'invalid username or password',session:session.get('SESSION_ID')})
		}
		
		return result
	}

	public async logout({session}){
		session.clear()
		// session.delete(session.sessionId)
		session.initiate(false)
		let result: any = {guid:0, code:0, info:'You are logout'}
		return result
	}

	public async verify({request}){
		if(request.hasValidSignature()){
			return request.input('signature')
		}else{
			return 'url not valid'
		}
	}

	public async isSessionExpired({response, session}){
		let Authenticated = Boolean(session.sessionId === session.get('SESSION_ID'))
	    if(!Authenticated){
	      response.send({ 
	        guid: 1,
	        code: 1,
	        info: 'Error authentication issue',
	        message: 'Must be logged in',
	        data: null,
	        result: true })
	    }else{
	    	response.send({ 
		        guid: 0,
		        code: 0,
		        info: 'Session valid',
		        message: 'Your session still valid',
	        	data: session.all(),
		        result: false })
	    }
	}

	public async batteryStatus({response}){
		const level = await batteryLevel();
		let lagi_dicas = await
		isCharging().then(result => {
			// console.log(result);
			return result;
			//=> true
		});
		if (lagi_dicas && level >= 0.94){
			axios.get('https://api.telegram.org/bot1274045743:AAH7E0RuZ_55prc5C1aQmG9aqpyWJkftmPM/sendMessage',
						{params:{
							chat_id: 156429203,
							text: 'Bettery sudah penuh mohon untuk lepas charger'
						}}
				).then(function(_response){
					// console.log(_response.data);
				}).catch(function(_error){
					// console.log(_error);
				}).then(function(){
					// console.log('completed');
				});
		}
		let result = { 
	        guid: 1,
	        code: 1,
	        info: 'Check battery status and is charge or not',
	        batter_level: level,
	        is_charge : lagi_dicas };
	    // this.sendNotif();
		response.send(result);
	}

	protected getVerifyUrl(_email: string){
		let url =Route.builder()
				  // .params({ email: _email })
				  .prefixUrl('http://localhost')
				  .makeSigned('/users/verify', { expiresIn: '15m' })
		return url
		// return Route.makeSignedUrl('/users/verify',{email:email})

	}

	protected getPassword(_username: string){
		let password = Database.from('ZT_USERS').select('password').where('username',_username)
		return password
	}


	// public sendNotif(){
	// 	notifier.notify(
	// 		{
	// 			title: 'Charging notification',
	// 			message: 'Hello from node, Mr. User!',
	// 			// icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
	// 			sound: true, // Only Notification Center or Windows Toasters
	// 			wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
	// 		},
	// 		function (err, response, metadata) {
	// 		// Response is response from notification
	// 		// Metadata contains activationType, activationAt, deliveredAt
	// 		}
	// 		);

	// 		notifier.on('click', function (notifierObject, options, event) {
	// 		// Triggers if `wait: true` and user clicks notification
	// 		});

	// 		notifier.on('timeout', function (notifierObject, options) {
	// 		// Triggers if `wait: true` and notification closes
	// 		});
	// }
}
