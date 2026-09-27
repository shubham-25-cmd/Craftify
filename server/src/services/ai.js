import { createOpenAI } from '@ai-sdk/openai'


const Model = process.env.OPENROUTER_MODEL||"openrouter/free"
const MAX_CONCURRENCY = parseInt(process.env.AI_MAX_CONCURRENCY||"6",10)

const openrouter =  createOpenAI({
  baseURL:"https:openrouter.ai/api/v1",
  apiKey:process.env.OPENROUTER_API_KEY,

})

const model = openRouter(MODEL);


async function generateSingleFile(file,allfiles,prompt,allreadyGeneratedFiles){

}

export async function generateProject(prompt,callbacks){

}

export async function reviseProject(prompt,manifest,relevantFiles,recentMessages){
  
}