import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import NoMatch from './views/NoMatch';
import {Layout} from './components/Layout';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Search from './components/Search'
import axios from 'axios'
import GalleryPage from './views/Gallery/galleryPage';
import Upload from './views/Upload';
import Login from './views/Login';

class App extends Component {
  render(){
     return (
      <React.Fragment >
        <NavigationBar />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/gallery/:galleryTitle?/:subGalleryTitle?/:eventTitle?" render={(props) => <GalleryPage {...props} page='Gallery'/>}/>
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/search/:id" children={Search} />
                    <Route path="/upload" component={Upload} />
                    <Route path="/login" component={Login} /> 
                    <Route component={NoMatch} />
                </Switch>
            </Router>
          <Footer />
      </React.Fragment>
    );
  }
}

export default App;
