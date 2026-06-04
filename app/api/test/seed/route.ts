import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
    }

    const { email, password, username, name } = await request.json();

    const ctx = await auth.$context;
    const hashedPassword = await ctx.password.hash(password);

    await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            id: crypto.randomUUID(),
            email,
            name,
            username,
            emailVerified: true,
            accounts: {
                create: {
                    id: crypto.randomUUID(),
                    accountId: email,
                    providerId: 'credential',
                    password: hashedPassword,
                },
            },
        },
    });

    return NextResponse.json({ success: true });
}