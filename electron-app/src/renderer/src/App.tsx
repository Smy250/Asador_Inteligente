import React, { useState } from 'react'
import PointOfSale from './components/PointOfSale'
import SideBar from './components/Sidebar'
import StockManagement from './components/StockManagement'

function App(): React.JSX.Element {
  // El estado de la navegación principal vive aquí
  const [currentView, setCurrentView] = useState('pos')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pasamos el estado y la función al SideBar */}
      <SideBar activeTab={currentView} setActiveTab={setCurrentView} />
      <main>
        {/* Renderizado condicional de las vistas */}
        {currentView === 'pos' && <PointOfSale />}

        {/* Vistas próximamente disponibles */}
        {[/* 'stock', */ 'ia', 'resources'].includes(currentView) && (
          <div className="p-20 text-center font-bold text-gray-400">
            Próximamente:{' '}
            {(() => {
              switch (currentView) {
                /*                 case 'stock':
                  return 'Gestión de Stock' */
                case 'ia':
                  return 'Funcionalidades de IA'
                case 'resources':
                  return 'Gestión de Recursos'
                default:
                  return ''
              }
            })()}
          </div>
        )}

        {/* Agrega aquí las demás vistas según el ID */}
        {currentView === 'stock' && <StockManagement />}
      </main>
    </div>
  )
}

export default App
