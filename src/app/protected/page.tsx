'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../lib/auth-context";
function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (<h1>Only logged in users can view this page</h1>);
}

export default Page;