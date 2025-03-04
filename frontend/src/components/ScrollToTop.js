import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever the route changes
  }, [location]);

  return children;
};

export default ScrollToTop;