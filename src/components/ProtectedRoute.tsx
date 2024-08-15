"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client'
import { ROUTES } from '@/config/routes';
import { MESSAGES } from '@/config/messages';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {  
  const router = useRouter();  
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);  

  React.useEffect(() => {  
    const checkSession = async () => {  
      const { data: { session } } = await supabase.auth.getSession();  
      if (session) {  
        setIsAuthenticated(true);  
      } else {  
        setIsAuthenticated(false);  
        router.push(ROUTES.LOGIN);  
      }  
    };  

    checkSession();  
  }, [router]);  

  if (isAuthenticated === null) {  
    return <div>{MESSAGES.LOADING}</div>;
  }  

  if (!isAuthenticated) {  
    return null;
  }  

  return <>{children}</>;  
};  

export default ProtectedRoute;
