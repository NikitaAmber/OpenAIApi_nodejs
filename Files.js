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
    ["name","expires_after"].forEach(function (element) {
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
    return await openai.beta.vectorStores.files.list(configuration.vector_store_id);
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
export async function vsCreateFile(configuration) {
    ["vector_store_id","file_id"].forEach(function (element) {
        if (!(element in configuration)) {
            throw new Error(element + " cannot be empty");
        }
    });
    let vector_store_id = configuration.vector_store_id;
    delete configuration.vector_store_id;
    return await openai.beta.vectorStores.files.create(
        vector_store_id,
        configuration
    );
}

