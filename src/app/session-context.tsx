import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SessionContextProps {
  session: any;
  setSession: (session: any) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSessionState] = useState(null);

  // useEffect para recuperar a sessão do localStorage quando o componente é montado
  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSessionState(JSON.parse(storedSession)); // Atualiza o estado do contexto com a sessão recuperada
    }
  }, []);

  const setSession = (session: any) => {
    setSessionState(session);
    if (session) {
      localStorage.setItem('session', JSON.stringify(session)); // Salva a sessão no localStorage
    } else {
      localStorage.removeItem('session'); // Remove a sessão do localStorage
    }
  };

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
