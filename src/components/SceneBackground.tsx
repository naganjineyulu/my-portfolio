import { Component, lazy, Suspense, useEffect, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

const ThreeScene = lazy(() => import('@/components/ThreeScene'));

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unable to initialize the 3D background.', error, info);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function canRenderWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export default function SceneBackground() {
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [webGLAvailable, setWebGLAvailable] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setMotionAllowed(!motionPreference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);

    updateMotion();
    updateVisibility();
    setWebGLAvailable(canRenderWebGL());
    motionPreference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      motionPreference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  const fallback = <div className="scene-fallback" aria-hidden="true" />;

  if (!webGLAvailable || !motionAllowed) return fallback;

  return (
    <SceneErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <ThreeScene active={pageVisible} />
      </Suspense>
    </SceneErrorBoundary>
  );
}
