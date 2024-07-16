import {surpriseMePrompts} from "../constants"
import filesaver from 'file-saver'
export function getrandomPrompt(prompt){
    const rndmIndex=Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt=surpriseMePrompts[rndmIndex];
    if(randomPrompt===prompt)return getrandomPrompt(prompt);
    return randomPrompt;
}

export async function downloadImage(_id,photo) {
filesaver.saveAs(photo,`download-${_id}.jpg`)
}