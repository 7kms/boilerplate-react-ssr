import { $get } from '~utils/api'

// export const SET_ARTICLE_LIST =  Symbol()
export const SET_ARTICLE_LIST =  'SET_ARTICLE_LIST'


const setArticleList = ({data})=>{
    return {
        type: SET_ARTICLE_LIST,
        pyload: {
            list:data
        }
    }
}

export const fetchList = (params)=>{
    return async (dispatch)=>{
        try{
            const res = await $get('/article/list',params)
            dispatch(setArticleList(res))
        }catch(e){
            console.log('======================================================================================================')
            console.log('======================================================================================================')
            console.error(e)
            console.log('======================================================================================================')
        }
    }
}