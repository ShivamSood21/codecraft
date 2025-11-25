"use client"
import { useSuspenseQuery, useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export const Client = () => {
    const trpc = useTRPC()
    const invoke = useMutation(trpc.invoke.mutationOptions({
        onSuccess: () => {
            toast.success("Background process started!")
        }
    }))
    const { data } = useSuspenseQuery(trpc.hello.queryOptions({ text: 'from TRPC' }))

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <Button disabled={invoke.isPending} onClick={() => {
                invoke.mutate({ text: "emailAddress" })
            }}>
                Invoke Inngest Function
            </Button>
            {JSON.stringify(data)}
        </div>
    )
}

