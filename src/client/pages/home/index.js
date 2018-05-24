import React,{ Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
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
        return (<div>
            {list.map((item,index)=>{
                return <div key={index}>{item.title}</div>
            })}
        </div>)
    }
}


export default Home