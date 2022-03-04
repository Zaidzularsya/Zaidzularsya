import { notifier } from 'node-notifier'

class WinNotifier{
	public notifier: notifier


	this.notifier = new notifier()
	console.log("Instance Windows Notifier")
}

export default new WinNotifier()