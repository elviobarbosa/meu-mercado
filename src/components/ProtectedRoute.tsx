"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { supabase } from '@/app/api/supabase/supabase-client';
import { ROUTES } from '@/config/routes';
import { MESSAGES } from '@/config/messages';
import { useSession } from '@/app/session-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {  
  const router = useRouter();  
  const { session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);  
  
  useEffect(() => {
    if (!session) {
      setIsAuthenticated(false); 
      router.push(ROUTES.LOGIN);
    } else {
      setIsAuthenticated(true); 
    }
  }, [session, router]);

  if (isAuthenticated === null) {  
    return <div>{MESSAGES.LOADING}</div>;
  }  

  if (!isAuthenticated) {  
    return null; 
  }  

  return <>{children}</>;  
};  

export default ProtectedRoute;
