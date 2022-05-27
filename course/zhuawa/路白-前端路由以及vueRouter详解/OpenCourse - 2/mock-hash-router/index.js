class BaseRouter {
    constructor() {
        this.routes = {}; // 存储path以及callback的对应关系
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load', this.refresh); // 处理页面首次加载
        window.addEventListener('hashchange', this.refresh); // 处理页面hash的变化
    }

    /**
     * route
     * @param {string} path 路由路径
     * @param {function} callback 回调函数
     */
    route(path, callback) {
        // 向this.routes存储path以及callback的对应关系
        this.routes[path] = callback || function () {};
    }

    refresh() {
        // 刷新页面
        const path = `/${location.hash.slice(1) || ''}`;
        console.log(location.hash);
        this.routes[path]();
    }

}

// 期望看到的是，点击三个不同的a标签，页面的背景色会随之改变

const body = document.querySelector('body');

function changeBgColor(color) {
    body.style.backgroundColor = color;
}


const Router = new BaseRouter();

Router.route('/', function () {
    changeBgColor('white');
});
Router.route('/green', function () {
    changeBgColor('green');
});
Router.route('/gray', function () {
    changeBgColor('gray');
});