import '../../../static/stylesheets/style';
import Home from './components/studentDetails.js';
import NotFound from './components/notFound';
import App from './app.js';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var history = ReactRouter.useRouterHistory(History.createHashHistory)({ queryKey: false });
const logger = createLogger();
export const store = createStore(reducer,applyMiddleware(thunk,logger));

ReactDOM.render((
    <Provider store = {store}>
        <Router history={history}>
            <div>
                <Route path="/" component ={App} />
                <Route path="/home/" name="home" component = {Home} />
                <Route path="*" component = {NotFound}/>
            </div>
        </Router>
    </Provider>    
), document.getElementById("container"));
