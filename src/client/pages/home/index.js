import React,{ Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import KM7Page from '~components/KM7Page'
import {fetchList} from '~actions/article'



const mapStateToProps = ({articleInfo:{list}})=>{
    return {
        list
    }
}

@connect(mapStateToProps)
class Home extends Component{
    static propTypes = {
        list: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    header = {
        title: 'ssr title',
        metas: [{
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:site',
            content: '@newsdogapp'
        },
        {
            property: 'fb:app_id',
            content: '508207026019625'
        }],
        links: [{
            rel: 'image_src',
            href: 'ahdoadaj'
        }]
    }
    state = {
        params: {
            page: 0,
            size: 20
        }
    }
    static loadInitialData = (store)=>{
        // const {params} = this.state;
        return store.dispatch(fetchList({
            page: 0,
            size: 20
        }))
    }
    componentDidMount(){
        console.log('home componentDidMount')
    }
    render(){
        const {list} = this.props;
        return (<KM7Page header={this.header}>
            {list.map((item,index)=>{
                return <div key={index}>{item.title}</div>
            })}
        </KM7Page>)
    }
}


export default Home