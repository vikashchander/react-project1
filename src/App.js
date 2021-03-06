import React from 'react'
import * as BooksAPI from './BooksAPI';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BooksShelf from './components/BooksShelf/BooksShelf';
import BooksSearch from './components/BooksSearch/BooksSearch'
import './App.css'
class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shelvesObject: {}
    }

  }

  componentDidMount() {
    this.shelvesObjects();
  }

  shelvesObjects = () => {
    BooksAPI
      .update({ id: 'data' }, 'none')
      .then((shelvesObject) => this.updateShelf({ shelvesObject }))
      .catch((e) => {
        console.log(e);
        return []
      })
  }
  updateShelf = (shelvesObject) => {
    this.setState({ ...shelvesObject })
  }



  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <BooksShelf shelfData={this.state.shelvesObject} updateBookShelf={this.updateShelf} />
            </Route>
            <Route exact path="/search">
              <BooksSearch updateBookShelf={this.updateShelf} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp;
