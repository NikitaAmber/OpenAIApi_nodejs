import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получите текущий каталог файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keysPath = path.join(__dirname, 'keys.json');
let keys = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
const openai = new OpenAI({apiKey: keys["to-use"]});

export async function fileUpload(configuration) {
    ["file", "purpose"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    let res =  await openai.files.create(configuration);
    return res;
}

export async function fileRetrieve(configuration) {
    ["file_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    return await openai.files.retrieve(configuration.file_id);

}

export async function fileDelete(configuration) {
    ["file_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    return await openai.files.del(configuration.file_id);
}

export async function vsCreate(configuration) {
    ["file_ids","name","expires_after"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    return await openai.beta.vectorStores.create(configuration);
}
export async function vsAddFile(configuration) {
    ["file_id","vector_store_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    let vsId = configuration.vector_store_id;
    delete configuration.vector_store_id;
    return await openai.beta.vectorStores.create(vsId,configuration);
}
export async function vsRetrieve(configuration) {
    ["vector_store_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    return await openai.beta.vectorStores.retrieve(configuration.vector_store_id);
}
export async function vsFileList(configuration) {
    ["vector_store_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    if(configuration.limit == null){
        configuration["limit"] = 100;
    }
    let vsId = configuration.vector_store_id;
    delete configuration.vector_store_id;
    return await openai.beta.vectorStores.files.list(vsId,configuration);
}
export async function vsDeleteFile(configuration) {
    ["vector_store_id","file_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    return await openai.beta.vectorStores.files.del(
        configuration.vector_store_id,
        configuration.file_id
    );
}

