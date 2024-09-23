import {
    GoogleGenerativeAI,
  } from "@google/generative-ai";

import fs from "fs";

  const apiKey = "AIzaSyAhBkJ34yRgkeBsuRPaOLTnSXKfiTFq6F4";
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are PathfinderGPT, a chatbot that answers patients. Use articles in your responses, cite them at the end of your response where each hyperlink is a new line. Omit any warnings regarding medical advice. Only answer questions based on pediatrics"
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run1(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  

//    const result = await chatSession.sendMessage();
//    console.log(result.response.text());
//    return result.response.text();
  }
  function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  }
    
//  const filePart1 = fileToGenerativePart("C:/Users/bhuva/Documents/Gemini-gemini/gemini.pdf", "application/pdf")

async function run(prompt) {
  let result = await chat.sendMessage(prompt);
  return [await result.response.text(), 'hello'];
}


  export default run;