// pages/api/cors.ts  
export const corsHeaders = {  
    'Access-Control-Allow-Origin': '*', // Permite todas as origens  
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',  
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', // Métodos permitidos  
  }