import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Header from '../pages/section/header/Header';
import Footer from '../pages/section/footer';

// Importar páginas
import GastronomiaHome from '../pages/index';
import IngredientesHome from '../pages/ingredientes';
import Proteina from '../pages/ingredientes/proteina';
import FrutasPage from '../pages/ingredientes/frutas';

export default function AppWithHeader() {
  const { currentPage, navigateTo, goBack, canGoBack } = useNavigation();

  console.log('AppWithHeader - currentPage:', currentPage);

  // Función para renderizar el contenido según la página actual
  const renderPageContent = () => {
    switch (currentPage) {
      case 'proteina':
        console.log('Renderizando página de proteína');
        return <Proteina />;
      
      case 'frutas':
        console.log('Renderizando página de frutas');
        return <FrutasPage />;
      
      case 'ingredientes':
        console.log('Renderizando página de ingredientes');
        return <IngredientesHome />;
      
      case 'home':
      default:
        console.log('Renderizando página principal');
        return <GastronomiaHome />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header centralizado con navegación */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onBack={canGoBack ? goBack : undefined}
        showBackButton={canGoBack}
        showCategories={true}
      />
      
      {/* Contenido principal */}
      <main className="flex-1">
        {renderPageContent()}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
