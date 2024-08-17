"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
//import { supabase } from '@/app/api/supabase/supabase-client';
import { ROUTES } from '@/config/routes';
import { MESSAGES } from '@/config/messages';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {  
  const router = useRouter();  
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);  

  // const authenticate = async () => {
  //   const response = await fetch('/api/auth/is-authenticated', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
    
  //   const result = await response.json();

  //   if (response.ok) {
  //     setIsAuthenticated(true);  
  //   } else {
  //     setIsAuthenticated(false); 
  //     console.error(result.error);
  //   }
  // };
  // authenticate();
  
  if (isAuthenticated === null) {  
    return <div>{MESSAGES.LOADING}</div>;
  }  

  if (!isAuthenticated) {  
    return null;
  }  

  return <>{children}</>;  
};  

export default ProtectedRoute;
