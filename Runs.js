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
    ["thread_id", "assistant_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    let thread_id = configuration.thread_id;
    delete configuration.thread_id;
    return await openai.beta.threads.runs.create(
        thread_id,
        configuration
    );
}
export async function retrieve(configuration) {
    ["thread_id","run_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    console.log(configuration);
    return await openai.beta.threads.runs.retrieve(
        configuration.thread_id,
        configuration.run_id
    );
}
export async function toolOutputs(configuration) {
    ["thread_id","run_id","tool_outputs"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    console.log(configuration);
    let thread_id = configuration.thread_id;
    delete configuration.thread_id;
    let run_id = configuration.run_id;
    delete configuration.run_id;
    return await openai.beta.threads.runs.submitToolOutputs(
        thread_id,
        run_id,
        configuration
    );
}