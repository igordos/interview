import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Poll from '../components/Poll';

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Poll}/>
        </div>
    </Router>
);

export default App;
