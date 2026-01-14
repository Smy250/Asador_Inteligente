import { useState } from 'react'

const initialStock = [
  {
    nombre: 'Bife de Chorizo Premium',
    categoria: 'Carnes',
    cantidad: '25 kg',
    compra: 1000,
    unitario: 1200
  },
  {
    nombre: 'Asado de Tira',
    categoria: 'Carnes',
    cantidad: '18 kg',
    compra: 800,
    unitario: 950
  },
  {
    nombre: 'Entraña',
    categoria: 'Carnes',
    cantidad: '12 kg',
    compra: 1200,
    unitario: 1400
  },
  {
    nombre: 'Papas',
    categoria: 'Guarniciones',
    cantidad: '50 kg',
    compra: 60,
    unitario: 80
  },
  {
    nombre: 'Coca Cola 500ml',
    categoria: 'Bebidas',
    cantidad: '48 kg',
    compra: 500,
    unitario: 800
  },
  {
    nombre: 'Agua Mineral 500ml',
    categoria: 'Bebidas',
    cantidad: '60 kg',
    compra: 350,
    unitario: 600
  },
  {
    nombre: 'Cerveza Quilmes',
    categoria: 'Bebidas',
    cantidad: '36 kg',
    compra: 800,
    unitario: 1200
  },
  {
    nombre: 'Vino Tinto Botella',
    categoria: 'Bebidas',
    cantidad: '15 kg',
    compra: 2500,
    unitario: 3500
  },
  {
    nombre: 'Fernet Branca 750ml',
    categoria: 'Bebidas',
    cantidad: '12 kg',
    compra: 3200,
    unitario: 4500
  }
]

function getCategorias(stock: { categoria: unknown }[]): unknown[] {
  return [
    'Todas las categorías',
    ...Array.from(new Set(stock.map((i: { categoria: unknown }) => i.categoria)))
  ]
}

function StockManagement(): React.JSX.Element {
  const [stock, setStock] = useState(initialStock)
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas las categorías')
  const [showModal, setShowModal] = useState(false)
  const [nuevo, setNuevo] = useState({
    nombre: '',
    categoria: '',
    cantidad: '',
    compra: '',
    unitario: ''
  })

  const categorias = getCategorias(stock)
  const filtrados = stock.filter(
    (i) =>
      (categoria === 'Todas las categorías' || i.categoria === categoria) &&
      i.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )
  const totalCompra = filtrados.reduce((acc, i) => acc + i.compra, 0)

  function abrirModal(): void {
    setNuevo({ nombre: '', categoria: '', cantidad: '', compra: '', unitario: '' })
    setShowModal(true)
  }

  function cerrarModal(): void {
    setShowModal(false)
  }

  function guardarNuevo(e: { preventDefault: () => void }): void {
    e.preventDefault()
    setStock([
      ...stock,
      {
        nombre: nuevo.nombre,
        categoria: nuevo.categoria,
        cantidad: nuevo.cantidad + ' kg',
        compra: Number(nuevo.compra),
        unitario: Number(nuevo.unitario)
      }
    ])
    setShowModal(false)
  }

  return (
    <>
      <div className={showModal ? 'p-8 blur-sm pointer-events-none select-none' : 'p-8'}>
        <h2 className="text-2xl font-bold mb-1">Gestión de Stock</h2>
        <p className="text-gray-500 mb-6">Administra el inventario de insumos</p>
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <input
            className="flex-1 min-w-[250px] border rounded-lg px-4 py-2 bg-gray-50"
            placeholder="Buscar por nombre de insumo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="border rounded-lg px-4 py-2 bg-gray-50"
            value={categoria}
            title={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={String(cat)} value={String(cat)} title={String(cat)}>
                {String(cat)}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="ml-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
            onClick={abrirModal}
          >
            + Registrar Insumo
          </button>
        </div>
        <div className="mb-2 text-gray-500 text-sm">
          Mostrando {filtrados.length} de {stock.length} insumos
        </div>
        <div className="bg-white rounded-xl shadow p-2 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 font-semibold">Insumo</th>
                <th className="py-3 px-4 font-semibold">Categoría</th>
                <th className="py-3 px-4 font-semibold">Cantidad</th>
                <th className="py-3 px-4 font-semibold">Precio de Compra</th>
                <th className="py-3 px-4 font-semibold">Precio Unitario</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((i, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-2 px-4">{i.nombre}</td>
                  <td className="py-2 px-4">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {i.categoria}
                    </span>
                  </td>
                  <td className="py-2 px-4">{i.cantidad}</td>
                  <td className="py-2 px-4">${i.compra.toLocaleString()}</td>
                  <td className="py-2 px-4">${i.unitario.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end items-center mt-4">
            <span className="font-semibold mr-2">Inversión Total en Compra:</span>
            <span className="text-red-600 text-lg font-bold">${totalCompra.toLocaleString()}</span>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
            <button
              type="button"
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={cerrarModal}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Registrar Nuevo Insumo</h3>
            <form onSubmit={guardarNuevo} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Nombre del Insumo</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50"
                  placeholder="Ej: Bife de Chorizo"
                  value={nuevo.nombre}
                  onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Categoría</label>
                <select
                  title="categoria"
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50"
                  value={nuevo.categoria}
                  onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Seleccionar categoría
                  </option>
                  {categorias
                    .filter((c) => c !== 'Todas las categorías')
                    .map((cat) => (
                      <option key={String(cat)} value={String(cat)} title={String(cat)}>
                        {String(cat)}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Cantidad (kg)</label>
                <input
                  title="cantidad"
                  type="number"
                  min="0"
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50"
                  value={nuevo.cantidad}
                  onChange={(e) => setNuevo({ ...nuevo, cantidad: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Precio de Compra ($)</label>
                <input
                  title="precioCompra"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50"
                  value={nuevo.compra}
                  onChange={(e) => setNuevo({ ...nuevo, compra: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Costo Unitario ($)</label>
                <input
                  title="costo"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50"
                  value={nuevo.unitario}
                  onChange={(e) => setNuevo({ ...nuevo, unitario: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  className="flex-1 border border-gray-300 rounded-lg py-2 font-semibold hover:bg-gray-100"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-2"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default StockManagement
