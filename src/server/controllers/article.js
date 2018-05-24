import {responseData} from '../utils'

export const articleList = (req,res)=>{
    const list = [
        {
        title: 'tes1',
        createTime: '2018-06-01 08:00:32'
        },
        {
        title: 'tes1',
        createTime: '2018-06-01 08:00:32'
        }
    ]
    console.log(list)
    res.json(responseData(200,list))
}


export const articleDetail = (req,res)=>{
   let {id} = req.params;

   res.send(responseData(200,{id}))
}