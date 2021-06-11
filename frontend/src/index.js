import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import logo from './images/slime_it_logo.gif';
import ranking from './images/ranking.png';
import twitchLogo from './images/twitch_logo.png';
import githubLogo from './images/github_logo.png';
import slimeEarth from './images/slime_earth.gif';
import slimeGrass from './images/slime_grass.gif';
import slimeNormal from './images/slime_normal.gif';

class Navbar extends React.Component {
  render() {
    return (
      <div id="navbar">
        <a href="#logo">Home</a>
        <a href="#search">Search</a>
        <a href="#ranking">Ranking</a>
        <a href="#about">About</a>
      </div>
    );
  }
}

class Logo extends React.Component {
  render() {
    return (
      <div id="logo" class="slime-logo">
        <img src={logo} alt="A animated slime with the caption Slime It! the Game under it" />
      </div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      slimeData: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSlimeStats = this.getSlimeStats.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  async getSlimeStats(username) {
    try {
      const slime = await axios.get(`https://8hgsgu5bab.execute-api.us-east-1.amazonaws.com/dev/slimes/${username}`);

      if (slime.data.currentlyPlayingAt) {
        this.setState({
          slimeData: slime.data,
        });
        return;
      }
    } catch (error) {
      console.log(error.message);
    }

    alert(`Cannot found slime for ${username} twitch username`);
  }

  handleSubmit(event) {
    this.getSlimeStats(this.state.username);
    event.preventDefault();
  }

  render() {
    const slimesImgs = {
      'earth': slimeEarth,
      'grass': slimeGrass,
      'normal': slimeNormal,
    };

    return (
      <div id="search">
        <h1># Search</h1>
        <div class="search-form">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter your twitch username to find your slime!" />
            <input type="submit" value="Submit" style={{ 'margin-left': '12px' }} />
          </form>
        </div>
        {this.state.slimeData &&
          <div class="search-card-container">
            <div class="search-card">
              <img src={slimesImgs[this.state.slimeData.slimeData.race]} class="search-img" alt="A slime bouncing on the screen" />
              <ul>
                <li>Playing at: {this.state.slimeData.currentlyPlayingAt}</li>
                <li>Exp: {this.state.slimeData.slimeData.experience}</li>
                <li>Nutrients: {JSON.stringify(this.state.slimeData.slimeData.nutrients)}</li>
              </ul>
            </div>
          </div>
        }
      </div>
    );
  }
}

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: null,
    };

    this.showRanking = this.showRanking.bind(this);

    this.showRanking();
  }

  async getRanking() {
    try {
      const ranking = await axios.get('https://8hgsgu5bab.execute-api.us-east-1.amazonaws.com/dev/slimes/ranking');
      return ranking.data;
    } catch {
      alert('Cannot load the current ranking.');
      return null;
    }
  }

  async showRanking() {
    const rankingData = await this.getRanking();
    if (!rankingData) {
      return;
    }

    const ranking = rankingData.map((value) => <li>{value}</li>);
    this.setState({ ranking });
  }

  render() {
    return (
      <div id="ranking">
        <h1># Ranking</h1>
        <div class="ranking-content">
          <img src={ranking} class="ranking-img" alt="A trophy with the caption Ranking under it" />
          {this.state.ranking
            ? <ul>{this.state.ranking}</ul>
            : <div class="loader"></div>
          }
        </div>
      </div>
    );
  }
}

class About extends React.Component {
  render() {
    return (
      <div id="about">
        <h1># About</h1>
        <div class="about-content">
          <div class="about-logos">
            <a href="https://github.com/mundodehads">
              <img src={twitchLogo} class="footer-logo-imgs" alt="Twitch website logo" />
            </a>
            <a href="https://www.twitch.tv/mundodehads">
              <img src={githubLogo} class="footer-logo-imgs" alt="Github website logo" />
            </a>
          </div>
          <div class="about-texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper id eros in pulvinar. Aenean maximus turpis nec dolor gravida, tincidunt tempus neque commodo. Cras et velit imperdiet, volutpat lectus vitae, dapibus velit. Nulla massa dui, tempor in aliquet vel, tincidunt eu odio. Ut pellentesque mauris porttitor eros molestie, et tincidunt arcu egestas. Nulla imperdiet in dui sed placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p style={{ float: 'right' }}>© 2021 mundodehads</p>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="logo">
          <Logo />
        </div>
        <div className="search">
          <Search />
        </div>
        <div className="ranking">
          <Ranking />
        </div>
        <div className="about">
          <About />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
