import fs from 'fs'
import path from 'path'
import pathConfig from '../build/pathConfig'

export default (() => {
    const templatePath = path.resolve(pathConfig.clientOutput,'./index.html');
    const templateHtml = fs.readFileSync(templatePath,'utf8');

    return (html)=>{
        return templateHtml.replace('<div id="root"></div>',`<div id="root">${html}</div>`)
    }
})()