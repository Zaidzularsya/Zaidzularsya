/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
// import auth from '@adonisjs/auth'
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


Route.get('/', async () => {
  let aplication_version = Application.version!.toString()
  let adonis_version = Application.adonisVersion!.toString()
  let node_environment = Application.nodeEnvironment
  return { hello: 'world', 
           aplication_version: aplication_version, 
           adonis_version:adonis_version,
           node_environment: node_environment,
           app_key: Application.env.get('APP_KEY'),
           aplication_running: Application.isReady
  }
})
// API USERS
Route.group(() => {
  Route.resource('users','UsersController')
}).prefix('api').middleware('auth')

Route.group(() => {
  Route.resource('user','UsersController')
}).prefix('dashboard').middleware('auth')

Route.group(()=>{
  Route.resource('backend','BackendsController')
  Route.on('profil').redirect('/backend')
}).middleware('auth')


Route.group(() => {
  Route.post('auth','UsersController.login')
  Route.get('logout','UsersController.logout')
  Route.get('verify','UsersController.verify')
  Route.get('isSessionExpired','UsersController.isSessionExpired')
}).prefix('users')

Route.get('login', async ({ view }) => {
  return view.render('login')
})

Route.get('/battery-status','UsersController.batteryStatus')
// Route.get('test',async ()=>{
//   return Route.builder()
//   .params({ email: 'foo@bar.com' })
//   .prefixUrl('http://localhost')
//   .makeSigned('/users/verify', { expiresIn: '1m' })
// })



// Devices Controller
Route.group(()=>{
  Route.resource('arduino','DevicesController')
}).prefix('api')
