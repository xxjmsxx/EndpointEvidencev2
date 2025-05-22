'use client'

import { ClerkProvider } from '@clerk/nextjs'
import '../../styles/globals.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/sign-in"
    >
      <html lang="en">
        <body className="bg-gray-50 flex items-center justify-center min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
