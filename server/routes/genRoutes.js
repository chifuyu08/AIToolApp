import express, { response } from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch'


dotenv.config();

const router=express.Router()

router.route("/").post(async(req,res)=>{
  const {prompt} = req.body;
  const resp = await fetch(
    "https://api.limewire.com/api/image/generation",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': 'v1',
        Accept: 'application/json',
        Authorization:` Bearer ${process.env.LIMEWIRE_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: '1:1',
        samples: 1
      })
    }
  );

  const data = await resp.json();
  console.log(data);
  return res.json(data);
})





export default router;