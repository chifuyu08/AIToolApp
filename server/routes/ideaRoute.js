import express, { response } from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router=express.Router()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.route("/").post(async(req,res)=>{
    const {keywords} = req.body;
   
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = `Give me a single but different then before prompt for image generation related to these keywords:${keywords} it should be small 1 line without any comma  `
      
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
      return res.json(text);
  });

  export default router;