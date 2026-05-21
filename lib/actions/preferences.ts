"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type Preferences = {
    theme: "light" | "dark" | "system";
};

export async function savePreferences(prefs: Preferences) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) throw new Error("Unauthorized");

    await prisma.userPreferences.upsert({
        where: { userId: session.user.id },
        update: prefs,
        create: { userId: session.user.id, ...prefs },
    });

    revalidatePath("/settings/appearance");
}