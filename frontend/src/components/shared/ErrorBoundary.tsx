'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI rendering failed', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container section">
          <h1>Something went wrong</h1>
          <button className="button button-primary" onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}