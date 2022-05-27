import React, { Component } from "react";
import Context from './context';

export default class BrowserRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                pathname: window.location.pathname || "/",
                search: undefined,
            },
            match: {

            }
        }
    }
    componentWillMount() {
        window.addEventListener("popstate", () => {
            this.setState({
                location: {
                    pathname: window.location.pathname
                }
            })
        })
    }
    render() {
        const currentRoute = {
            location: this.state.location,
            match: this.state.match,
            history: {
                push: (to) => {
                    // 根据当前to 去匹配不同的路由 实现路由切换
                    if (typeof to === 'object') {
                        let { pathname, query } = to;
                        // 只是改变当前state的数据， 不触发reRender
                        this.setState({
                            location: {
                                query: to.query,
                                pathname: to.pathname
                            }
                        });
                        window.history.pushState({}, {}, pathname)
                    } else {
                        // 如果是字符串
                        this.setState({
                            location: {
                                pathname: to
                            }
                        })
                        window.history.pushState({}, {}, to)
                    }

                }
            }
        }
        return (
            <Context.Provider value={currentRoute}>{this.props.children}</Context.Provider>
        )
    }
}