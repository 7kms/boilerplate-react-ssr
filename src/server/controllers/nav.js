import {responseData} from '../utils'

export const navList = (req,res)=>{
    const list = [
        {name:'前端',key:'frontend'},
        {name:'Ios',key:'ios'},
        {name:'Server',key:'server'},
        {name:'其他',key:'other'}
    ]
    res.json(responseData(200,list))
}