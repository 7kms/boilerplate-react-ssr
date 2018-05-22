import React,{ Component,Fragment } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import '~less/app.less'

export default class App extends Component{
    static propTypes = {
        route: PropTypes.object.isRequired
    }
    render(){
        return (
            <Fragment>
                <div className="app-header">blog?</div>
                {renderRoutes(this.props.route.routes)}
            </Fragment>
        )
    }
}
