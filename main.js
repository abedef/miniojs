import { Client } from 'minio';
import { Readable } from 'stream';

var client;
var config;

export function configure(endpoint, useSSL, accessKey, secretKey) {
    config = {
        endpoint,
        useSSL,
        accessKey,
        secretKey,
    };
}

function getClient() {
    if (client) {
        return client;
    }

    if (!config) {
        throw "FUCK";
    }

    let minioClient = new Client({
        endPoint: config.endpoint,
        useSSL: config.useSSL,
        accessKey: config.accessKey,
        secretKey: config.secretKey,
    });

    return minioClient;
}

export function putString(path, text) {
    let stream = Readable.from(text);
    return getClient().putObject("stats", path + ".txt", stream, { "Content-Type": "text/plain" });
}

export function putObject(path, obj) {
    let text = JSON.stringify(obj);
    let stream = Readable.from(text);
    return getClient().putObject("stats", path + ".json", stream, { "Content-Type": "application/json" });
}

export function getString(path) {
    // TODO: Catch errors
    return getClient().getObject("stats", path + ".txt");
}

export function getObject(path) {
    // TODO: Catch errors
    return getClient().getObject("stats", path + ".json")
        .then((object) => JSON.parse(object.read()));
}
