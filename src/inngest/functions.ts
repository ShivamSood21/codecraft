import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("Download", "20s");
    await step.sleep("Transcribe", "5s");
    await step.sleep("Summarise", "5s");
    return { message: `Hello ${event.data.email}!` };
  },
);