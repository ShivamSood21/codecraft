import { inngest } from "./client";
import { createAgent, gemini } from '@inngest/agent-kit';



export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const summarizer = createAgent({
      name: 'Summarizer',
      system: 'You are an expert TypeScript programmer.  Given a set of asks, you think step-by-step to plan clean, idiomatic TypeScript code, with comments and tests as necessary.',
      model: gemini({ model: 'gemini-2.5-pro' }),
    });
    const { output } = await summarizer.run(`Create code for the following requirement: ${event.data.value}`);
    return { output };
  },
);