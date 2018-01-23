import React from 'react';
import ReactDOM from 'react-dom';
import './common/common.css';
import './common/reset.css'
import App from './App';
import MusicList from './page/musicList'
import Player from './page/player'
import { Router, IndexRoute,  Route, hashHistory} from 'react-router'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(

   <Router history={hashHistory}>
       <Route path="/" component={App}>
           <IndexRoute component={Player}/>
           <Route path="/list" component={MusicList}/>
       </Route>
   </Router>, document.getElementById('root'));
registerServiceWorker();
