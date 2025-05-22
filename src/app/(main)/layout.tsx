import '../../styles/globals.css';
import InteractiveLayout from '../../components/InteractiveLayout/InteractiveLayout';
import {
  ClerkProvider,
} from '@clerk/nextjs'

import { ReactScan } from '../../utils/reactScan';

export const metadata = {
  title: 'Endpoint Evidence | Home',
  description: 'Welcome to on-demand RWE',
  icons: {
    icon: '/endpoint-logo.svg', // Favicon
  },
  openGraph: { // For social media previews
    title: 'Endpoint Evidence',
    description: 'Welcome to on-demand RWE',
    images: '/endpoint-logo.svg',
  },
  // Other options: keywords, robots, themeColor, etc.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/sign-in"
      >

      <html lang="en">
        <ReactScan />
        <body>
          <InteractiveLayout>
            {children}
          </InteractiveLayout>
        </body>
      </html>

    </ClerkProvider>
  );
}
