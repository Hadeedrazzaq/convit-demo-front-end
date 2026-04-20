import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { CatalogProvider } from '../context/CatalogContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BRAND } from '../config/brand';

export const metadata = {
  title: `${BRAND.name} — A COD Fashion Store`,
  description: 'Curated fashion, delivered Cash on Delivery.',
  icons: { icon: BRAND.logo },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CatalogProvider>
            <CartProvider>
              <Navbar />
              <main className="max-w-7xl mx-auto px-6">{children}</main>
              <Footer />
            </CartProvider>
          </CatalogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
