import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TrueSpot Uncaught React Exception:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
    } catch (e) {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070A10] text-[#E2E8F0] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full bg-[#0C101A] border border-red-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold tracking-tight text-white mb-2">
              TrueSpot Oracle Restored
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              A state synchronization conflict was detected in local cache. TrueSpot has protected your session. Click below to clear cache and restart.
            </p>

            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] hover:from-[#00F5FF]/90 hover:to-[#00A3FF]/90 text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#00F5FF]/20"
            >
              Reset Session & Reload App
            </button>

            {this.state.error && (
              <p className="mt-4 text-[10px] text-slate-500 font-mono truncate">
                {this.state.error.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
