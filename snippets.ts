import * as fs from 'fs';

const generateFunctions = (count: number) => {
  const filePath = './App.tsx';

  for (let i = 0; i <= count; i++) {
    const functionName = `consoleLogger${i}`;
    const functionCode = `
      const ${functionName} = (text: string) => {
        console.log(text);
      };
    `;

    fs.appendFileSync(filePath, functionCode);
  }

  let globalFunctionCode = `
  const callAllConsoleLoggers = (text: string) => {`;
  for (let i = 0; i <= count; i++) {
    globalFunctionCode = globalFunctionCode.concat(`
    consoleLogger${i}(text);`);
  }
  globalFunctionCode = globalFunctionCode.concat(`
  }`);

  fs.appendFileSync(filePath, globalFunctionCode);
};

generateFunctions(300000);
