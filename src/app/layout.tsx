import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { ToastProvider } from '@/components/Toast';

export const metadata: Metadata = {
  title: '文迹 - 非遗文化体验旅行',
  description: '探索中国非物质文化遗产，体验独特的文化旅行',
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FDF8F0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-100 flex justify-center h-screen overflow-hidden">
        <ToastProvider>
          <div className="phone-container relative shadow-2xl h-screen overflow-hidden">
            <main className="h-full">
              {children}
            </main>
            <BottomNav />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
