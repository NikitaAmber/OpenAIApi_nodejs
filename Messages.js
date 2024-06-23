import OpenAI from "openai";
import fs from "fs";
let keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const openai = new OpenAI({apiKey: keys["to-use"]});

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