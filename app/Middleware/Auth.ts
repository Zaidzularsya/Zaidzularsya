import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle ({ response, session}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let Authenticated = Boolean(session.sessionId === session.get('SESSION_ID'))
    if(!Authenticated){
      response.send({ 
        guid: 1,
        code: 1,
        info: 'Error authentication issue',
        message: 'Must be logged in' })
    }
    await next()
  }
}
