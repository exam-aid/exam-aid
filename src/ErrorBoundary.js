import React, { Component } from 'react';
import Layout from 'components/Layout';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.log(error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI if an error occurs
      return (
        <div>
          <h2>Something went wrong. Please try again later.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;