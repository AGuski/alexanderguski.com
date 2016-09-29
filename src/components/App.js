import React from 'react';
import ReactDOM from 'react-dom';
import LightSwitch from './LightSwitch';
import MenuCube from './MenuCube';
import TextContent from './TextContent';

const contentStates = {
  LANDING: {},
  WORK_CODE: {
    text: `work<br>
      I am currently working as Front-End Developer at CROSSENGAGE. 
      Occasionally I also freelance on other software projects. 
      If you’d like to send me a request or proposition, please feel free to CONTACT me.`
  },
  WORK_AUDIO: {
    text: `music/audio<br>
      In the past I have composed and produced music for commercials, television and other media.
      I am planning to combine my musical passion and experience with my software development skills. 
      Yeah, it’s going to be synthastic.
      If you have a project or idea I might be interested in, I’d be happy if you CONTACT me.`
  },
  CONTACT: {
    text: 
      `Pork belly art party quis poutine cillum  roof party bicycle rights.  Pop-up single-origin coffee celiac, ethical wolf intelligentsia neutra YOLO laboris  nisi +1 commodo before they sold out typewriter.  90's squid leggings disrupt mollit.  Selfies eiusmod cardigan 90's, kitsch kale chips cray godard art party do banh mi.  Nulla  magna mlkshk austin tilde meh, kombucha flannel fap direct trade  man braid keytar.  Echo park non  quinoa taxidermy kale chips.  Authentic etsy lomo, chambray green juice skateboard street art vinyl ullamco freegan.`
  },
  ABOUT: {
    text: `Flexitarian aesthetic eu  small batch.  Veniam vegan plaid voluptate  PBR&amp;B sustainable.  Voluptate  elit drinking vinegar, disrupt id  occupy humblebrag gluten-free squid blog quis locavore farm-to-table laborum.  90's chambray artisan, schlitz man braid etsy aesthetic sunt selvage cornhole synth pitchfork next level.  Esse  reprehenderit  quinoa, seitan pitchfork pour-over 8-bit voluptate  chicharrones dreamcatcher kitsch pickled.  Forage readymade biodiesel, celiac PBR&amp;B small batch artisan banh mi slow-carb schlitz actually.  Proident deep v aute, try-hard craft beer ethical placeat.`
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      contentState: 'LANDING',
      lightsOn: false
    }

    this.setContentState = this.setContentState.bind(this);

  }

  render() {
    return (
      <div>
        <header>
          <h1 id="brand" >Alexander <br/><span className="indent">Guski</span></h1>
        </header>

        <main>
          <MenuCube ref="menuCube"
            contentState={this.state.contentState} 
            setContentState={this.setContentState} />
          <div id="text-area" />
        </main>

        <footer>
          <a id="imprint-link" href="">imprint</a>
          <LightSwitch toggle={this.switchLight.bind(this)} />
        </footer>
      </div>
    );
  }

  setContentState(contentState, callback) {
    this.setState({ contentState: contentState});
    switch (contentState) {
      case 'LANDING':
        break;
      case 'WORK_CODE':
      case 'ABOUT':
      case 'WORK_AUDIO':
      case 'CONTACT':
        ReactDOM.render(<TextContent text={contentStates[contentState].text} />, document.getElementById('text-area'));
        break;
      default:
    }
    if(callback) {
      callback();
    }
  }

  switchLight() {
    TweenMax.to($('body'), 3.5, {
      backgroundColor: this.state.lightsOn ? '#2b2b2b' : '#a7d5e2',
    });
    this.setState({ lightsOn: !this.state.lightsOn});
  }
  
}

export default App;