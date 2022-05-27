import React, { Component } from "react";
import Context from "./context";
import { pathToRegexp, match } from "path-to-regexp";
import context from "./context";
export default class Route extends Component {
    static contextType = context;
    render() {
        const currenRoutePath = this.context.location.pathname; // 从上下文context中获取到当前路由
        const { path, component: Component, exact = false } = this.props; // 获取Route组件props的路由
        const paramsRegexp = match(path, { end: exact }); // 生成获取params的表达式
        const matchResult = paramsRegexp(currenRoutePath);
        console.log("路由匹配结果", matchResult);
        this.context.match.params = matchResult.params;
        const props = {
            ...this.context
        }
        const pathRegexp = pathToRegexp(path, [], { end: exact }); // 生成路径匹配表达式
        if (pathRegexp.test(currenRoutePath)) {
            return (<Component {...props}></Component>) // 将蛋清概念上下文路由信息当作props传递给组件
        }
        return null;
    }
}