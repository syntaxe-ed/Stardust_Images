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
import Natural_World from './views/Gallery/NaturalWorld'
import axios from 'axios'
import GalleryPage from './views/Gallery/galleryPage';

class App extends Component {
  render(){
     return (
      <React.Fragment >
        <NavigationBar />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/gallery" render={(props) => <GalleryPage {...props} page='Gallery'/>}/>
                    <Route exact path="/gallery/*" render={(props) => <GalleryPage {...props} page='Gallery'/>}/>
                    <Route exact path="/gallery/events" render={(props) => <GalleryPage {...props} page='Events'/>} />
                    <Route exact path="/gallery/landscapes" render={(props) => <GalleryPage {...props} page='Landscapes'/>} />
                    <Route exact path="/gallery/events/dancing" render={(props) => <GalleryPage {...props} page='Dancing'/>} />
                    <Route exact path="/gallery/events/weddings" render={(props) => <GalleryPage {...props} page='Weddings'/>} />
                    <Route exact path="/gallery/events/trampolining" render={(props) => <GalleryPage {...props} page='Trampolining'/>} />
                    <Route exact path="/gallery/events/exhibitions" render={(props) => <GalleryPage {...props} page='Exhibitions'/>} />
                    <Route exact path="/gallery/events/comissions" render={(props) => <GalleryPage {...props} page='Comissions'/>} />
                    <Route exact path="/gallery/events/private_events" render={(props) => <GalleryPage {...props} page='Private Events'/>} />
                    <Route exact path="/gallery/events/exhibitions/Natural_World" render={(props) => <GalleryPage {...props} page='Natural World'/>} />
                    <Route path="/about" component={About} />
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
