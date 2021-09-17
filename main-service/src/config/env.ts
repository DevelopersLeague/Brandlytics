import path from 'path';
import fs from 'fs';

export function loadEnv(filename: string): void {
  const rootPath = path.join(__dirname, '..', '..');
  const filePath = path.join(rootPath, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`file ${filePath} does not exists`);
  }
  const fileContent = fs.readFileSync(filePath).toString();
  const tokens = fileContent.split('\r\n');
  tokens.forEach((token) => {
    const [key, value] = token.split('=');
    process.env[key] = value;
  });
}
