import React from 'react';
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';
import { match } from 'path-to-regexp';

const history = createHashHistory();

function matchPath(path) {
  return path === window.location.pathname;
}

export class Route extends React.Component {
  componentWillMount() {
    const unlisten = history.listen((action, location) => {
      console.log(action);
      this.forceUpdate();
    });
    this.unlisten = unlisten;
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }

  render() {
    const {
      path,
      children,
      component: ChildCompnent,
      render,
    } = this.props;

    // const match = matchPath(path);
    const matcher = match(path);
    const matchDetail = matcher(window.location.hash.replace("#", ""));

    if (!matchDetail) return null;

    if (ChildCompnent) {
      return (<ChildCompnent match={matchDetail} />);
    }

    return render?.({ match: matchDetail }) ?? children;
  }
}

export class Link extends React.Component {
  handleClick = e => {
    const {
      to
    } = this.props;
    e.preventDefault();
    history.push(to);
  }

  render() {
    const {
      children
    } = this.props;
    return (
      <div>
        <a onClick={this.handleClick}>{children}</a>
      </div>
    );
  }
}