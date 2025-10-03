import type { Metadata } from 'next'
import { Inter, Poppins, Lato } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins' 
})
const lato = Lato({ 
  subsets: ['latin'], 
  weight: ['300', '400', '700'],
  variable: '--font-lato' 
})

export const metadata: Metadata = {
  title: 'Éclat Salon - Premium Beauty & Wellness',
  description: 'Experience luxury beauty treatments at Éclat Salon. Expert stylists, premium services, and exceptional quality in a sophisticated atmosphere.',
  keywords: 'beauty salon, haircut, styling, nail art, facial treatments, massage, cosmetics, luxury',
  authors: [{ name: 'Éclat Salon Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ec4899',
  openGraph: {
    title: 'Éclat Salon - Premium Beauty & Wellness',
    description: 'Experience luxury beauty treatments at Éclat Salon',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${lato.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
