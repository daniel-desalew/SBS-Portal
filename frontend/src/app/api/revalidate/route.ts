import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  path: z.string().startsWith('/').max(500).refine((path) => !path.startsWith('//')),
});

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || expected.length < 32) {
    return NextResponse.json({ message: 'Revalidation is not configured' }, { status: 503 });
  }
  const provided = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length || !timingSafeEqual(expectedBuffer, providedBuffer)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Request body must be valid JSON' }, { status: 400 });
  }
  const result = requestSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json({ message: 'Invalid revalidation path', details: result.error.flatten() }, { status: 400 });
  }

  revalidatePath(result.data.path);
  return NextResponse.json({ revalidated: true, path: result.data.path });
}