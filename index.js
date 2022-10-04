import { Client } from 'minio';

var client = nil;
var hasBeenConfigured = false;
var Endpoint, UseSSL, AccessKey, SecretKey;

function configure(endpoint, useSSL, accessKey, secretKey) {
    Endpoint = endpoint;
    UseSSL = useSSL;
    AccessKey = accessKey;
    SecretKey = secretKey;

    hasBeenConfigured = true;
}

function getClient() {
    if (client) {
        return client;
    }

    if (!hasBeenConfigured) {
        throw "FUCK";
    }

    let minioClient = new Client({
        endPoint: Endpoint,
        useSSL: UseSSL,
        accessKey: AccessKey,
        secretKey: SecretKey,
    });

    return minioClient;
}

function putString(path, text) {
    let stream = Readable.from(text);
    return getClient().putObject("stats", path + ".txt", stream, { "Content-Type": "plain/text" });
}

function putObject(path, obj) {
    let text = JSON.stringify(obj);
    let stream = Readable.from(text);
    return getClient().putObject("stats", path + ".json", stream, { "Content-Type": "application/json" });
}

function getString(path) {
    // TODO: Catch errors
    return getClient().getObject("stats", path + ".txt");
}

function getObject(path) {
    // TODO: Catch errors
    return getClient().getObject("stats", path + ".json")
        .then((object) => JSON.parse(object.read()));
}

export default {
    configure,
    putString,
    putObject,
    getString,
    getObject
};