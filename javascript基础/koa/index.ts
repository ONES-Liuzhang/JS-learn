class Koa {
	middlewares = [];

	use(middleware) {
		this.middlewares.push(middleware);
	}

	start({ req }) {
		const composed = composeMiddleware(this.middlewares);
		const ctx = { req, res: undefined };
		composed(ctx);
	}
}
function composeMiddleware(middlewares) {
	return function wrapMiddlewares(ctx) {
		function dispatch(i) {
			const fn = middlewares[i];
			return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
		}
		return dispatch(0);
	};
}
