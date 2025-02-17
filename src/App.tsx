import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { FeaturePopup } from '@/components/FeaturePopup';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load pages with prefetch
const LaunchPage = lazy(() => import('@/pages/LaunchPage').then(module => ({ default: module.LaunchPage })));
const StartupListPage = lazy(() => import('@/pages/StartupListPage').then(module => ({ default: module.StartupListPage })));
const StartupDetailPage = lazy(() => import('@/pages/StartupDetailPage').then(module => ({ default: module.StartupDetailPage })));
const BoostPage = lazy(() => import('@/pages/BoostPage').then(module => ({ default: module.BoostPage })));
const SharedLaunchPage = lazy(() => import('@/pages/SharedLaunchPage').then(module => ({ default: module.SharedLaunchPage })));

// Prefetch routes
const prefetchRoutes = () => {
  const routes = [
    () => import('@/pages/LaunchPage'),
    () => import('@/pages/StartupListPage'),
    () => import('@/pages/StartupDetailPage'),
    () => import('@/pages/BoostPage'),
    () => import('@/pages/SharedLaunchPage')
  ];

  routes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'script';
    link.href = route.toString();
    document.head.appendChild(link);
  });
};

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <div className="space-y-4 w-full max-w-3xl px-4">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    prefetchRoutes();
  }, []);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <LaunchPage />
                </Suspense>
              </PageTransition>
            } />
            <Route path="/startups" element={
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <StartupListPage />
                </Suspense>
              </PageTransition>
            } />
            <Route path="/startup/:id" element={
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <StartupDetailPage />
                </Suspense>
              </PageTransition>
            } />
            <Route path="/boost" element={
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <BoostPage />
                </Suspense>
              </PageTransition>
            } />
            <Route path="/launch/:id" element={
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <SharedLaunchPage />
                </Suspense>
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <FeaturePopup />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ScrollToTop />
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;