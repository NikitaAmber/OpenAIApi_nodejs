import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.OPEN_API_KEY;
// Получите текущий каталог файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({apiKey: apiKey});

export async function create(configuration) {
    // if(configuration == null){
    //     console.log("Конфигурация пуста, создаем пустой тред.")
    //     return await openai.beta.threads.create();
    // }
    console.log(configuration.tool_resources.file_search.vector_store_ids)
    return await openai.beta.threads.create(configuration);
}
export async function retrieve(configuration) {
    configuration["thread_id"].forEach(function(element){
        if (!(element in configuration)) {
            throw new Error(element+" cannot be empty");
        }
    });
    return await openai.beta.threads.retrieve(configuration.thread_id);
}