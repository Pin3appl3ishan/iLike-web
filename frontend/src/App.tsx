import { BrowserRouter as Router, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from "@/context/AuthProvider";
import AppRoutes from '@/routes/AppRoutes';

// Component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
