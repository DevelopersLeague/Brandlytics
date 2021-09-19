import path from 'path';
import fs from 'fs';

export function loadEnv(filename: string): void {
  const rootPath = path.join(__dirname, '..', '..');
  const filePath = path.join(rootPath, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`file ${filePath} does not exists`);
  }
  const fileContent = fs.readFileSync(filePath).toString();
  const fileJson = JSON.parse(fileContent);
  Object.keys(fileJson).forEach((key) => {
    if (typeof fileJson[key] != "string") {
      throw new Error('value for each key must be a string in env json files');
    }
    process.env[key] = fileJson[key];
  });
}
