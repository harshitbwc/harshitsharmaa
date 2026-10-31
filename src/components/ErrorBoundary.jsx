import { Component } from "react";

import { styles } from "../styles";
import { socials } from "../constants";

// Class component because error boundaries are the one thing hooks still
// can't do — getDerivedStateFromError/componentDidCatch have no hook
// equivalent. Wraps the whole app in App.jsx, so a render crash anywhere
// (a bad product entry, a third-party embed throwing) shows this instead
// of React unmounting to a blank white page.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught render error:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className='min-h-screen bg-ink flex items-center justify-center px-6'>
        <div className={`${styles.section} text-center`}>
          <p className={styles.sectionEyebrow}>Something broke</p>
          <h1 className='font-serif text-paper leading-tight mt-4 mb-4 text-[clamp(28px,4vw,40px)] text-balance'>
            This page hit a snag.
          </h1>
          <p className={`${styles.body} text-sm mb-8`}>
            Not you, something on my end. Try going back home, or email me
            directly if it keeps happening.
          </p>
          <div className='flex items-center justify-center gap-4 flex-wrap'>
            <button
              onClick={this.handleReload}
              className='inline-flex items-center min-h-12 font-sans text-sm font-semibold text-black bg-accent rounded-full px-6 hover:bg-accent2 transition-colors'
            >
              Back to home
            </button>
            <a
              href={`mailto:${socials.email}`}
              className='font-sans text-sm text-paper border-b border-accent hover:text-accent transition-colors'
            >
              {socials.email}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
