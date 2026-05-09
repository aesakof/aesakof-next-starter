import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccount from "./DeleteAccount";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Account() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/sign-in")
    }

    return (
        <div className="flex flex-col gap-6">
            <ChangePasswordForm />
            <DeleteAccount />
        </div>
    )
}