import App from './app'
import Home from './home/index'
import Article from './article/index'

const routes = [    
    {
        component: App,
        routes: [
            { 
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/article/:id',
                exact: true,
                component: Article
            }
        ]
    }
]

export default routes