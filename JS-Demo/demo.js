let p = new Promise(resolve => {
	console.log('第一层')
	setTimeout(() => {
		resolve(
			{a: 123}
		// 	new Promise(resolve => {
			
		// 	setTimeout(() => {
		// 		resolve(11)
		// 		console.log('第三层')}, 1000)
		// })
		)
	}, 1000)
	
}).then(res => {
	console.log(res)
})