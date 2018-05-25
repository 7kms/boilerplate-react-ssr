export default (template,pageInfo)=>{
    const {title,meta,link} = pageInfo.helmet;
    const html = template
    .replace(/<title>.*<\/title>/,title.toString() + meta.toString() + link.toString())
    .replace('<div id="root"></div>',`<div id="root">${pageInfo.html}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(pageInfo.finalState).replace(/</g, '\\u003c')}</script>`)
    return html
}