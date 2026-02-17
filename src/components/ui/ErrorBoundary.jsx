import React from 'react'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }
    
    // In production, you could send this to an error reporting service
    // Example: errorReportingService.captureException(error, { extra: errorInfo })
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, level = 'page' } = this.props

      // Custom fallback component
      if (Fallback) {
        return <Fallback 
          error={this.state.error} 
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
          onReload={this.handleReload}
        />
      }

      // Default fallback based on error level
      if (level === 'component') {
        return (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
              <p className="text-red-700 mb-4">This component encountered an error and couldn&apos;t render properly.</p>
              <Button 
                variant="secondary" 
                size="small"
                onClick={this.handleRetry}
                className="bg-red-100 text-red-700 hover:bg-red-200"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )
      }

      // Page-level error
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <Card className="border-red-200 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl text-red-900">Oops! Something went wrong</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-red-700">
                  We encountered an unexpected error while loading this page. 
                  This has been automatically reported to our team.
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left bg-red-50 p-4 rounded-lg border border-red-200">
                    <summary className="cursor-pointer font-medium text-red-800 mb-2">
                      Error Details (Development Only)
                    </summary>
                    <div className="text-sm font-mono text-red-700 whitespace-pre-wrap">
                      {this.state.error.toString()}
                      {this.state.errorInfo.componentStack}
                    </div>
                  </details>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="primary"
                    onClick={this.handleRetry}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Try Again
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={this.handleReload}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Reload Page
                  </Button>
                </div>
                
                <div className="text-sm text-red-600 mt-6">
                  <p>If this problem persists, please contact support.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Functional wrapper for easier use
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}

export default ErrorBoundary