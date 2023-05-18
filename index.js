const cron = require('node-cron')
const limit = 31
let counter = 0

const myPromise = () => new Promise((resolve, reject) => {
	console.log(`The promise ${counter} is running...`)

	if (counter % 2 === 0) {
		resolve(`Counter ${counter} is even`)
	} else {
		reject(`Counter ${counter} is odd`)
	}
})

cron.schedule('*/1 * * * *', async () => {
	counter = 0
})

cron.schedule('* * * * * *', async () => {
	if (counter < limit) {
		counter++
		try {
			const result = await myPromise()
			console.log(`The promise ${counter} return :`, result)
		} catch (error) {
			console.error(`Error in the promise ${counter} is :`, error)
		}
	} else {
		console.log('Limit exceeded of the 1 minute range. Better luck next time!')
	}
})


