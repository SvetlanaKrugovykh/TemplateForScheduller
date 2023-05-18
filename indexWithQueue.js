const cron = require('node-cron');
const limit = 31;
let counter = 0;
let promiseQueue = [];

const myPromise = () => new Promise((resolve, reject) => {
	console.log(`The promise ${counter} is running...`)

	if (counter % 2 === 0) {
		resolve(`Counter ${counter} is even`)
	} else {
		reject(`Counter ${counter} is odd`)
	}
});

const executePromiseQueue = async () => {
	while (promiseQueue.length > 0) {
		try {
			counter++
			const result = await myPromise()
			promiseQueue.shift()
			console.log(`The promise ${counter} returned:`, result)
		} catch (error) {
			console.error(`Error in the promise ${counter}:`, error)
		}
	}
};

cron.schedule('*/1 * * * *', async () => {
	counter = 0;
	executePromiseQueue();
});

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
		promiseQueue.push(myPromise);
		console.log(`Limit exceeded of the 1 minute range. The promise ${counter} queued:`)
	}
});
