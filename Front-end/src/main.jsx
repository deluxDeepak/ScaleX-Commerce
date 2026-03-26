import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import AuthProvider from './context/AuthContext.jsx'
import { LayoutProvider } from './context/LayoutContext.jsx'
import AddressProvider from './features/user/context/AdressContext.jsx'

import CategoryProvider from './context/CategoryContext.jsx'
import ProductProvider from './context/ProductContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <AuthProvider>

        <LayoutProvider>

          <CategoryProvider>

            <CartProvider>

              <AddressProvider>

                <App />

              </AddressProvider>

            </CartProvider>

          </CategoryProvider>

        </LayoutProvider>

      </AuthProvider>
    </ProductProvider>

  </StrictMode>
)