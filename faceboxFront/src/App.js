
import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Facebox from './Components/Facebox/Facebox';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}

const initialState ={
  input: '',
    imageUrl: '',
    box: {},
    route: 'landing',
    signedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: '',
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
 
  calcBox = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      l: clarifaiFace.left_col*width,
      t: clarifaiFace.top_row*height,
      r: width - (clarifaiFace.right_col*width),
      b: height - (clarifaiFace.bottom_row*height)
    }
  }

  displayBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmitImage = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3001/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.displayBox(this.calcBox(response))
    })
    .catch(err => console.log(err));
  }

  onImagePressEnter = (event) => (event.charCode === 13) ? this.onSubmitImage() : 'null'

  onRouteChange = (route) => {
    if (route === 'landing') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({signedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const { signedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
       <Particles className="particles"
                params={particlesOptions}
              />
        <Navigation signedIn={signedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmitImage={this.onSubmitImage}
                onImagePressEnter={this.onImagePressEnter}
              />
              <Facebox box={box} imageUrl={imageUrl} />
            </div>
          : route === 'landing' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App;
