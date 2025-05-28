import {useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // simulation
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return loading ? <LoadingScreen /> : <AppContent />;