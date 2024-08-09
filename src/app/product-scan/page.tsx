import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute'

const ProductScan: React.FC = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Esta é uma página protegida</h1>
        {/* O conteúdo protegido vai aqui */}
      </div>
    </ProtectedRoute>
  );
};

export default ProductScan;