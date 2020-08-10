import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import Gallery from './views/Gallery';
import NoMatch from './views/NoMatch';
import {Layout} from './components/Layout';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Events from './views/Gallery/Events';
import Landscapes from './views/Gallery/Landscapes.js'
import Search from './components/Search'
import Dancing from './views/Gallery/Dancing'
import Weddings from './views/Gallery/Weddings'
import Trampolining from './views/Gallery/Trampolining'
import Exhibitions from './views/Gallery/Exhibitions'
import Comissions from './views/Gallery/Comissions'
import Private_Events from './views/Gallery/Private_Events'
import axios from 'axios'

class App extends Component {
  render(){
     return (
      <React.Fragment >
        <NavigationBar />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/gallery/events" component={Events} />
                    <Route exact path="/gallery/landscapes" component={Landscapes} />
                    <Route exact path="/gallery/events/dancing" component={Dancing} />
                    <Route exact path="/gallery/events/weddings" component={Weddings} />
                    <Route exact path="/gallery/events/trampolining" component={Trampolining} />
                    <Route exact path="/gallery/events/exhibitions" component={Exhibitions} />
                    <Route exact path="/gallery/events/comissions" component={Comissions} />
                    <Route exact path="/gallery/events/private_events" component={Private_Events} />
                    <Route path="/about" component={About} />
                    <Route exct path="/gallery" component={Gallery} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/search/:id" children={<Search />} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
          <Footer />
      </React.Fragment>
    );
  }
}

export default App;
