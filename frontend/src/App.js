// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import {Nav, Navbar, Container} from 'react-bootstrap'
import {Link, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Movie from './components/movie'
import AddReview from './components/add-review'
import Login from './components/login'
import MoviesList from './components/movies-list';

function App() {

  const [user, setUser] = useState('Usman')

  async function login (user = null) {

    setUser(user)
  }

  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand>Movie Reviews</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link>
                  {
                    user ? <a href= "/" onClick={() => setUser(null)} >Logout</a> : <Link to={'/login'}>Login</Link> 
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/" element={<MoviesList/>}/>
          <Route exact path="/movies" element={<MoviesList />}/>
          <Route path="/movies/:id/review" render={(props) => <AddReview {...props} user={user} />} />
          <Route path="/movies/:id/" render={(props) => <Movie {...props} user={user} />} />
          <Route path="/login" render={(props) => <Login {...props} login={login} />} element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
