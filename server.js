import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import multer from 'multer';
import * as assistantFunctions from './Assistants.js';
import * as threadFunctions from './Threads.js';
import * as messageFunctions from './Messages.js';
import * as runFunctions from './Runs.js';
import * as filesFunctions from './Files.js';
import path from 'path';
import fs from "fs";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const jwtToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImFkbWluIjp0cnVlfQ.nNAzmMIy45jwYOsN-HKqILn3nVoi82MPPCYid5SUrQUdIN_P5M9G8GwkpqIVr77s5r_esBQ_Cm-L8ACjmBAlvg";
const uploadDirectory = path.join(__dirname, '/uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
});
const upload = multer({ storage: storage });
// Middleware для парсинга JSON и URL-encoded данных в теле запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Маршрут для POST-запроса
app.post('/assistants', async (req, res) => {
    console.log("Метод assistants")
    console.log('Получен POST запрос');
    console.log('Тело запроса:', req.body);
    console.log('Параметры запроса:', req.query);

    const authHeader = req.headers['authorization'] || req.get('Authorization');
    
    if (!authHeader) {
        console.log('Authorization header not found');
        return res.status(401).send('Authorization header not found');
    }
    if(authHeader !== jwtToken){
        return res.status(401).send('Authorization failed');
    }


    let method = req.query.method;
    // Обработка POST данных
    const configuration = req.body;
    let allowed = ["create","edit","retrieve","list","modelList"];
    if(!allowed.includes(method)){
        res.send("Неизвестный метод");
        return;
    }
    try{
        let response = await assistantFunctions[method](configuration);
        console.log(response);
        res.send(response);
    }catch (e){
        res.status(500).send(e);
    }
});
app.post('/threads', async (req, res) => {
    console.log("Метод threads")
    console.log('Получен POST запрос');
    console.log('Тело запроса:', req.body);
    console.log('Параметры запроса:', req.query);

    const authHeader = req.headers['authorization'] || req.get('Authorization');
    
    if (!authHeader) {
        console.log('Authorization header not found');
        return res.status(401).send('Authorization header not found');
    }
    if(authHeader !== jwtToken){
        return res.status(401).send('Authorization failed');
    }

    let method = req.query.method;
    // Обработка POST данных
    const configuration = req.body;
    console.log(configuration);
    let allowed = ["create","retrieve",];
    if(!allowed.includes(method)){
        res.send("Неизвестный метод");
        return;
    }
    try{
        let response = await threadFunctions[method](configuration);
        console.log(response);
        res.send(response);

    }catch (e){
        res.status(500).send(e);
    }
});
app.post('/messages', async (req, res) => {
    console.log("Метод messages")
    console.log('Получен POST запрос');
    console.log('Тело запроса:', req.body);
    console.log('Параметры запроса:', req.query);

    const authHeader = req.headers['authorization'] || req.get('Authorization');
    
    if (!authHeader) {
        console.log('Authorization header not found');
        return res.status(401).send('Authorization header not found');
    }
    if(authHeader !== jwtToken){
        return res.status(401).send('Authorization failed');
    }

    let method = req.query.method;
    // Обработка POST данных
    const configuration = req.body;
    let allowed = ["create","list","retrieve",];
    if(!allowed.includes(method)){
        res.send("Неизвестный метод");
        return;
    }
    try{
        let response = await messageFunctions[method](configuration);
        console.log(response);
        res.send(response);

    }catch (e){
        res.status(500).send(e);
    }
});
app.post('/runs', async (req, res) => {
    console.log("Метод runs")
    console.log('Получен POST запрос');
    console.log('Тело запроса:', req.body);
    console.log('Параметры запроса:', req.query);

    const authHeader = req.headers['authorization'] || req.get('Authorization');
    
    if (!authHeader) {
        console.log('Authorization header not found');
        return res.status(401).send('Authorization header not found');
    }
    if(authHeader !== jwtToken){
        return res.status(401).send('Authorization failed');
    }

    let method = req.query.method;
    // Обработка POST данных
    const configuration = req.body;
    console.log(configuration);
    let allowed = ["create","retrieve","toolOutputs"];
    if(!allowed.includes(method)){
        res.send("Неизвестный метод");
        return;
    }
    try{
        let response = await runFunctions[method](configuration);
        console.log(response);
        res.send(response);
    }catch (e){
        res.status(500).send(e);
    }
});
app.post('/files', upload.single('file'), async (req, res) => {
    try {
        console.log("Метод upload")
        console.log('Получен POST запрос');
        console.log('Тело запроса:', req.body);
        console.log('Параметры запроса:', req.query);
        const authHeader = req.headers['authorization'] || req.get('Authorization');
        if (!authHeader) {
            console.log('Authorization header not found');
            return res.status(401).send('Authorization header not found');
        }
        if(authHeader !== jwtToken){
            return res.status(401).send('Authorization failed');
        }
        // Получение файла
        const file = req.file;
        let method = req.query.method;
        // Обработка POST данных
        const configuration = req.body;
        if (file && method === "fileUpload") {
            console.log('Файл успешно загружен:', file);
            configuration.file = fs.createReadStream(file.path);
        }
        let allowed = [
            "fileUpload",
            "fileRetrieve",
            "fileDelete",
            "vsCreate",
            "vsAddFile",
            "vsRetrieve",
            "vsFileList",
            "vsDeleteFile",
            "vsCreateFile",
        ];
        if(!allowed.includes(method)){
            res.send("Неизвестный метод");
            return;
        }
        try{
            let response = await filesFunctions[method](configuration);
            console.log(response);
            if(file){
                DeleteFile(file.path);
            }
            res.send(response);
        }catch (e){
            res.status(500).send();
        }
    } catch (error) {
        console.error('Ошибка при обработке файла:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
    getIpAndLocation();
});

async function getIpAndLocation() {
    try {
        console.log("Получаем инфу");
        // Получаем IP-адрес
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ip = ipResponse.data.ip;

        console.log(`Ваш IP-адрес: ${ip}`);

        // Получаем информацию о местоположении по IP-адресу
        const locationResponse = await axios.get(`https://ipinfo.io/${ip}/json`);
        const locationData = locationResponse.data;

        console.log(`Местоположение: ${locationData.city}, ${locationData.region}, ${locationData.country}`);
        console.log(`Координаты: ${locationData.loc}`);
    } catch (error) {
        console.error('Ошибка при получении информации:', error);
    }
}
async function DeleteFile(filePath){
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Файл успешно удален');
    });
}

