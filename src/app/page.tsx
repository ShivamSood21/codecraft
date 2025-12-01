"use client"
import { useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const Page = () => {
  const [value, setValue] = useState("")
  const trpc = useTRPC()
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background process started!")
    }
  }))

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter your name" className="mb-4" />
      <Button disabled={invoke.isPending} onClick={() => {
        invoke.mutate({ value: value })
      }}>
        Invoke Inngest Function
      </Button>
    </div>
  )
}

export default Page
