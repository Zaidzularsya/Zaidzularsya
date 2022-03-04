// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BackendsController {
	public  index( {view} ){
		return view.render('backend')
	}
	public async create(){
		return {code:0, guid:0, info:"create method", message:"You access create method by get requests"}
	}
	public async store(){
		return {code:0, guid:0, info:"store method", message:"You access store method by get requests"}
	}
	public async show(){
		return {code:0, guid:0, info:"show method", message:"You access show method by get requests"}
	}
	public async edit(){
		return {code:0, guid:0, info:"edit method", message:"You access edit method by get requests"}
	}
	public async update(){
		return {code:0, guid:0, info:"update method", message:"You access update method by get requests"}
	}
	public async destroy(){
		return {code:0, guid:0, info:"destroy method", message:"You access destroy method by get requests"}
	}
}
