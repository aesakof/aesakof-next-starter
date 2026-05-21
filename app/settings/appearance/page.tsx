import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AppearanceForm from "./AppearanceForm";

export default async function Appearance() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) redirect("/sign-in");

    const prefs = await prisma.userPreferences.findUnique({
        where: { userId: session.user.id },
    });

    return (
        <AppearanceForm
            initialTheme={(prefs?.theme as "light" | "dark" | "system") ?? "system"}
        />
    );
}