import React, {Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Facebox from './Components/Facebox/Facebox';
import './App.css';

const app = new Clarifai.App({
  apiKey: '4ef10abb9b1a4907b4d560d06edf9b2d'
})

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      signedIn: false
    }
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

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
        this.state.input)
    .then(response => this.displayBox(this.calcBox(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({signedIn: false})
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
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit}
              />
              <Facebox box={box} imageUrl={imageUrl} />
            </div>
          : route === 'signin' 
            ? <SignIn onRouteChange={this.onRouteChange}/> 
            : <Register onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App;
