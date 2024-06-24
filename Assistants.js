import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получите текущий каталог файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keysPath = path.join(__dirname, 'keys.json');
let keys = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
console.log(keys);
const openai = new OpenAI({apiKey: keys["to-use"]});

export async function create(configuration) {
    ["model", "name", "instructions"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    console.log(configuration);
    return await openai.beta.assistants.create(configuration);
}

export async function edit(configuration) {
    let assistant_id = configuration.assistant_id;
    delete configuration.assistant_id;
    console.log(assistant_id);
    console.log(configuration);
    try{
        return await openai.beta.assistants.update(assistant_id,configuration);
    }catch (e){
        console.log(e);
    }
}

export async function retrieve(configuration) {
    ["assistant_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    return await openai.beta.assistants.retrieve(configuration.assistant_id);
}

export async function list(configuration) {
    return await openai.beta.assistants.list({
        order: "desc",
        limit: "100",
    });
}

export async function modelList(configuration) {
    console.log(openai);
    let res = await openai.models.list();
    console.log("Список моделей");
    console.log(res);
    return res;
}