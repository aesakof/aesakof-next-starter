import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import UsersTable from "./UsersTable";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/sign-in");

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-medium mb-6">Dashboard</h1>
            <UsersTable users={users} />
        </div>
    );
}