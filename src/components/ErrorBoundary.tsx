import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Top-level error boundary. Catches unhandled rendering errors anywhere in
 * the tree and shows a friendly fallback instead of a blank screen.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught rendering error:', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-bg">
          <p className="text-[0.85rem] font-medium text-accent uppercase tracking-[0.15em] mb-4">
            Error
          </p>
          <h1
            className="font-bold tracking-[-0.03em] text-text mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Something went wrong.
          </h1>
          <p className="text-text-muted text-[1.05rem] max-w-[480px] mb-10">
            An unexpected error occurred. Try reloading the page -if the
            problem persists, please contact us.
          </p>
          <button
            onClick={this.handleReload}
            className="px-9 py-3.5 bg-accent text-white font-semibold rounded-[12px] cursor-pointer transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5"
          >
            Reload page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
