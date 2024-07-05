import {surpriseMePrompts} from "../constants"
export function getrandomPrompt(prompt){
    const rndmIndex=Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt=surpriseMePrompts[rndmIndex];
    if(randomPrompt===prompt)return getrandomPrompt(prompt);
    return randomPrompt;
}