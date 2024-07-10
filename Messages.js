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
    ["role", "thread_id", "content"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    let thread_id = await configuration.thread_id;
    await delete configuration.thread_id;
    return await openai.beta.threads.messages.create(
        thread_id,
        configuration
    );
}
export async function list(configuration) {
    ["thread_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    return await openai.beta.threads.messages.list(configuration.thread_id);
}
export async function retrieve(configuration) {
    ["thread_id","message_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    return await openai.beta.threads.messages.retrieve(
        configuration.thread_id,
        configuration.message_id
    );
}