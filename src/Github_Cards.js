import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const testData = [
			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook", id: 1},
      {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu", id: 2},
  		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook", id: 3},
	];

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <div key={profile.id}><Card key={profile.id} {...profile} /></div>)}
  </div>
);

class Form extends React.Component {
  //userNameInput = React.createRef();
  state = { userName: ''};
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    console.log(resp.data);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' })
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" className="mt-2" placeholder="Github username" value={this.state.userName}  
          onChange={event => this.setState({ userName: event.target.value })} required />
        <button>Add Card</button>
      </form>
    );
  }
}

class Card extends React.Component {
	render() {
    const profile = this.props;
  	return (
    	<div className="github-profile mt-3">
    	  <img src={profile.avatar_url} alt="github profile" height="150px" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
        <hr />
    	</div>
    );
  }
}

export default class GithubCardsApp extends React.Component {
  
  /*
  constructor(props) {
    super(props);
    this.state = {
      profiles: testData
    };
  } */
  
  state = {
    profiles: testData
  };
  
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  }
  
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}

/*
ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
); */

