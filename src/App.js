import React, { Component } from 'react';
import InputSection from "./view/Input";
import OutputSection from "./view/Output";

import "./asset/css/uikit.min.css"
import "uikit"

class App extends Component {
    // TODO use redux instead of passing data indiscriminately

    constructor(props){
        super(props);

        this.state = { package: "" };
    };

    setPackageName = (name) => { this.setState({ package: name })};

  render() {

      const {package: packageName} = this.state;

    return (
      <div className="uk-container uk-margin-large-top">
          <div className="uk-flex uk-flex-wrap uk-flex-wrap-around">

          <div className="uk-width-1-2">
          <InputSection/>
          </div>

          <div className="uk-width-1-2">
          <OutputSection package={packageName}/>
          </div>

          </div>
      </div>
    );
  }
}

export default App;
