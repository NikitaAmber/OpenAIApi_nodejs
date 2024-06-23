import OpenAI from "openai";
import fs from "fs";
let keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const openai = new OpenAI({apiKey: keys["to-use"]});

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