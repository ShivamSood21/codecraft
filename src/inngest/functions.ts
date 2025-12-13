import { inngest } from "./client";
import { createAgent, gemini } from '@inngest/agent-kit';
import { Sandbox } from '@e2b/code-interpreter';
import getSandbox from "./utils";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandBoxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create('codecraft-nextjs-test');
      return sandbox.sandboxId;
    })
    const summarizer = createAgent({
      name: 'Summarizer',
      system: 'You are an expert TypeScript programmer.  Given a set of asks, you think step-by-step to plan clean, idiomatic TypeScript code, with comments and tests as necessary.',
      model: gemini({ model: 'gemini-2.5-flash' }),
    });
    const { output } = await summarizer.run(`Create code for the following requirement: ${event.data.value}`);
    const sandboxUrl = await step.run('get-sandbox-url', async () => {
      const sandbox = await getSandbox(sandBoxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    })
    return { output ,sandboxUrl };
  },
);