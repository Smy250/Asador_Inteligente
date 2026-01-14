import { useState } from 'react'
import {
  Utensils,
  Beer,
  ShoppingBag,
  Clock,
  Plus,
  Minus,
  CreditCard,
  DollarSign,
  Smartphone
} from 'lucide-react'

const PointOfSale = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState('comida')
  const [carrito, setCarrito] = useState([])
  const [metodoPago, setMetodoPago] = useState('efectivo')
  const [ventasRealizadas, setVentasRealizadas] = useState([])

  const productos = {
    comida: [
      { id: 1, nombre: 'Bife de Chorizo 400g', precio: 3500 },
      { id: 2, nombre: 'Asado de Tira 500g', precio: 2800 },
      { id: 3, nombre: 'Entraña 350g', precio: 4200 },
      { id: 4, nombre: 'Vacio 450g', precio: 3200 },
      { id: 5, nombre: 'Costillas 600g', precio: 2500 },
      { id: 6, nombre: 'Matambre 400g', precio: 3800 },
      { id: 7, nombre: 'Papas Fritas', precio: 1200 },
      { id: 8, nombre: 'Ensalada Mixta', precio: 1500 }
    ],
    bebidas: [
      { id: 101, nombre: 'Coca Cola 500ml', precio: 800 },
      { id: 102, nombre: 'Agua Mineral 500ml', precio: 600 },
      { id: 103, nombre: 'Cerveza Quilmes', precio: 1200 },
      { id: 104, nombre: 'Vino Tinto Copa', precio: 1500 }
    ]
  }

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const modificarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCant = Math.max(0, item.cantidad + delta)
            return { ...item, cantidad: nuevaCant }
          }
          return item
        })
        .filter((item) => item.cantidad > 0)
    )
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const finalizarVenta = () => {
    if (carrito.length === 0) return

    const nuevaVenta = {
      id: Date.now(),
      items: [...carrito],
      total: total,
      metodo: metodoPago,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setVentasRealizadas([nuevaVenta, ...ventasRealizadas])
    setCarrito([])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800 select-none">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* PANEL IZQUIERDO: PRODUCTOS */}
        <div className="flex-1">
          <header className="mb-6">
            <h1 className="text-2xl font-bold italic">Punto de Venta</h1>
            <p className="text-gray-500 text-sm">Selecciona los productos para vender</p>
          </header>

          <div className="flex justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('comida')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'comida' ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-gray-400 border'}`}
            >
              <Utensils size={18} /> Comida
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bebidas')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'bebidas' ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-gray-400 border'}`}
            >
              <Beer size={18} /> Bebidas
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productos[activeTab].map((prod) => (
              <button
                type="button"
                key={prod.id}
                onClick={() => agregarAlCarrito(prod)}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-red-200 transition-all flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <ShoppingBag className="text-red-500" size={22} />
                </div>
                <h3 className="text-xs font-bold text-gray-600 mb-1 h-8 flex items-center leading-tight">
                  {prod.nombre}
                </h3>
                <span className="text-red-600 font-black text-lg">
                  ${prod.precio.toLocaleString('es-AR')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* PANEL DERECHO: CARRITO Y VENTAS */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          {/* SECCIÓN CARRITO */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="font-bold text-xl mb-6">Carrito Actual</h2>

            <div className="space-y-6 mb-8 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {carrito.length === 0 ? (
                <div className="py-10 text-center text-gray-300 flex flex-col items-center">
                  <ShoppingBag size={40} className="opacity-20 mb-2" />
                  <p className="text-sm font-bold uppercase tracking-widest">Carrito vacío</p>
                </div>
              ) : (
                carrito.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-700">{item.nombre}</h4>
                      <p className="text-xs text-gray-400">
                        ${item.precio.toLocaleString('es-AR')} c/u
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-4 bg-gray-50 p-1 rounded-xl">
                      <button
                        title="modificar"
                        type="button"
                        onClick={() => modificarCantidad(item.id, -1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-red-500 transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-black text-sm">{item.cantidad}</span>
                      <button
                        title="cantidad"
                        type="button"
                        onClick={() => modificarCantidad(item.id, 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-white transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-dashed pt-6 mb-8 flex justify-between items-end">
              <span className="text-gray-400 font-bold text-xs uppercase">Total:</span>
              <span className="text-4xl font-black text-red-600">
                ${total.toLocaleString('es-AR')}
              </span>
            </div>

            <div className="mb-8">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                Método de Pago
              </p>
              <div className="grid grid-cols-3 gap-3">
                {['efectivo', 'tarjeta', 'transfer'].map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMetodoPago(m)}
                    className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all ${metodoPago === m ? 'border-red-500 bg-red-50 text-red-600 shadow-sm' : 'border-gray-50 text-gray-400'}`}
                  >
                    {m === 'efectivo' ? (
                      <DollarSign size={20} />
                    ) : m === 'tarjeta' ? (
                      <CreditCard size={20} />
                    ) : (
                      <Smartphone size={20} />
                    )}
                    <span className="text-[10px] mt-2 font-black uppercase tracking-tighter">
                      {m}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={finalizarVenta}
              disabled={carrito.length === 0}
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-30 shadow-xl shadow-red-100"
            >
              COMPLETAR VENTA
            </button>
          </div>

          {/* SECCIÓN VENTAS DE HOY CON SCROLL */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-gray-400" />
              <h2 className="font-bold text-gray-700">Ventas de Hoy</h2>
            </div>

            {/* Contenedor con Scroll */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {ventasRealizadas.length === 0 ? (
                <div className="text-center py-8 text-gray-300 text-sm font-medium">
                  Sin ventas registradas hoy
                </div>
              ) : (
                ventasRealizadas.map((venta) => (
                  <div
                    key={venta.id}
                    className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center animate-in fade-in zoom-in-95 duration-300"
                  >
                    <div>
                      <p className="text-xs font-black text-gray-700 leading-tight">
                        {venta.items[0].nombre}{' '}
                        {venta.items.length > 1 && (
                          <span className="text-red-500">+{venta.items.length - 1}</span>
                        )}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                        {venta.hora} • {venta.metodo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-red-600">
                        ${venta.total.toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Estilo para ocultar barra de scroll pero mantener funcionalidad */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `
        }}
      />
    </div>
  )
}

export default PointOfSale
