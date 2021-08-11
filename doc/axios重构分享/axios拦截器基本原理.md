# axios 拦截器原理分析

下面是 axios 拦截器官方使用方法：

```javascript
// axios.interceptors.request.use(resolve, reject)
// new Promise(resolve, reject)
axios.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// axios.interceptors.response.use(resolve, reject)
// new Promise(resolve, reject)
// Add a response interceptor
axios.interceptors.response.use(
	function(response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function(error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);
```

这里可以来实现一个简单的 axios 拦截器
大致思路：

- `interceptors`可以添加多个`request`、`response`拦截器，可以使用队列(数组)，调用`use`方法时，将拦截器推入到队列中
- axios 执行`request`方法时，依次执行队列中的函数
- 利用`Promise`链式调用的特点顺序执行拦截器

```javascript
// 使用数组保存拦截器
const requests = [];
const responses = [];
const Axios = function() {
	return function(instanceConfig) {
		this.defaultConfig = instanceConfig;

		this.interceptors = {
			request: {},
			response: {},
		};
		// 定义interceptors.request.use 和interceptors.response.use
		// 调用use时将回调函数加入队列
		this.interceptors.request.use = function(fulfilled, rejected) {
			requests.push({ fulfilled, rejected });
		};
		this.interceptors.response.use = function(fulfilled, rejected) {
			requests.push({ fulfilled, rejected });
		};
	};
};

// 设计模式：适配器模式（request使用适配器模式，适配http和xhr请求，统一调用时的入参和出参）
Axios.prototype.request = function(config) {
	//	...省略处理config逻辑

	let chain = [
		{
			fulfilled: dispatchRequest, //请求执行的本体，也是进行适配的切入点
			rejected: undefined,
		},
	];

	// 往队列前推入request拦截器
	this.requests.forEach((request) => {
		chain.unshift(request);
	});
	// 在队列后推入response拦截器
	this.response.forEach((response) => {
		chain.push(response);
	});

	// 因为请求是异步的 需要借助Promise，生成一个执行链
	let promise = Promise.resolve(config);
	while (chain.length) {
		const { fulfilled, rejected } = chain.unshift();
		promise = promise.then(fulfilled, rejected);
	}
	return promise;
};

// 下面是axios对不同类型请求进行封装的源码
// Provide aliases for supported request methods
// 统一各个请求的入参
utils.forEach(
	["delete", "get", "head", "options"],
	function forEachMethodNoData(method) {
		/*eslint func-names:0*/
		Axios.prototype[method] = function(url, config) {
			return this.request(
				mergeConfig(config || {}, {
					method: method,
					url: url,
					data: (config || {}).data,
				})
			);
		};
	}
);

utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
	/*eslint func-names:0*/
	Axios.prototype[method] = function(url, data, config) {
		return this.request(
			mergeConfig(config || {}, {
				method: method,
				url: url,
				data: data,
			})
		);
	};
});
```

Axios 暴露出拦截器的 use 方法
使用：

```javascript
let axios = new Axios({});
axios.interceptors.request.use(
	(config) => {
		console.log("发送请求前，做点什么");
	},
	(err) => {}
);
axios.interceptors.response.use(
	(res) => {
		console.log("得到服务器返回的数据，可以在这里做点什么");
	},
	(err) => {}
);

// 发送请求
axios.request({});
```
