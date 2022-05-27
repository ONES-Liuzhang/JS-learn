class BaseRouter {
    constructor() {
        this.routes = {};
        // location.hash; hash的方式
        this.init(location.pathname);
        this._bindPopState();
    }

    init(path) {
        window.history.replaceState({
            path
        }, null, path);
        const cb = this.routes[path];
        // cb && cb();
        if (cb) {
            cb();
        }
    }

    route(path, callback) {
        this.routes[path] = callback || function () {};
    }

    go(path) {
        // 跳转并执行对应的callback
        window.history.pushState({
            path
        }, null, path);
        const cb = this.routes[path];
        // cb && cb();
        if (cb) {
            cb();
        }
    }

    _bindPopState() {
        // 演示一下popstate事件触发后，会发生什么
        window.addEventListener('popstate', (e) => {
            const path = e.state && e.state.path;
            console.log(`in popstate listener path=${path}`);
            this.routes[path] && this.routes[path]();
        })
    }
}

const Router = new BaseRouter();

const body = document.querySelector('body');
const container = document.querySelector('.container');

function changeBgColor(color) {
    body.style.backgroundColor = color;
}

Router.route('/', function () {
    changeBgColor('white');
});
Router.route('/gray', function () {
    changeBgColor('gray');
});
Router.route('/green', function () {
    changeBgColor('green');
});

container.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        Router.go(e.target.getAttribute('href'));
    }
});