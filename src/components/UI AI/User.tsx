'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import type { User } from '@/types/User';

export function useCurrentUser(): User | null {
  const [user, setUser] = useState<User | null>(null);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data);
      } catch (error: unknown) {
        console.error((error as Error).message);
      }
    }

    // ⚡️ WAIT until Clerk auth is loaded before deciding anything
    if (!isLoaded) return; // don't do anything until Clerk is ready

    if (isSignedIn) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [isLoaded, isSignedIn]); // 👈 depends on isLoaded too!

  return user;
}
