import { NextRequest, NextResponse } from 'next/server';
import { getAuth, currentUser } from '@clerk/nextjs/server';
import type { User } from '@clerk/nextjs/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { userId, sessionId, orgId } = getAuth(req);

  // Block unauthenticated users
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user: User | null = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const response = {
    userId: user.id,
    fullName: [user.firstName, user.lastName].filter(Boolean).join(' ') || null,
    email: user.emailAddresses?.[0]?.emailAddress ?? null,
    sessionId,
    organizationId: orgId ?? null,
  };

  return NextResponse.json(response);
}
