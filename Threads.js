import OpenAI from "openai";
import fs from "fs";
let keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const openai = new OpenAI({apiKey: keys["to-use"]});

export async function create(configuration) {
    // if(configuration == null){
    //     console.log("Конфигурация пуста, создаем пустой тред.")
    //     return await openai.beta.threads.create();
    // }
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