import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Torre Assessment',
  description: 'A minimal Next.js 15 project for interview assessment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
