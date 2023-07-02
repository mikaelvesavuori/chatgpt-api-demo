import fs from 'fs';
import { ChatGPTAPI } from 'chatgpt';

const API_KEY = '';
const FILE_PATH = 'src/example.puml';

const prompts = {
  summarizeDiagram: (fileContents) => `Can you summarize the following diagram?\n"""${fileContents}"""`,
  plantumlDemo: `Make me a PlantUML diagram of a highly resilient AWS Lambda service that uses CQRS semantics to store conference room reservations.`
}

const getContents = (filePath) => fs.readFileSync(`${process.cwd()}/${filePath}`, 'utf-8');

async function askChatGPT(fileContents) {
  const api = new ChatGPTAPI({
    apiKey: API_KEY,
    completionParams: {
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      top_p: 0.8
    }
  });

  const res = await (async () => {
    if (fileContents) return await api.sendMessage(prompts['summarizeDiagram'](fileContents));
    else return await api.sendMessage(prompts['plantumlDemo'])
  })();

  console.log(res.text);
}

askChatGPT(getContents(FILE_PATH));