export function configure(endpoint: string, useSSL: bool, accessKey: string, secretKey: string);
export function putString(path: string, text: string): Promise;
export function putObject(path: string, obj: object): Promise;
export function getString(path: string): Promise;
export function getObject(path: string): Promise;
