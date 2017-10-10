import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import axios from 'axios';
// import request from 'superagent';

class Header extends React.Component {
	render() {
		return (
			<div className="mainTitle">
			<h1>Gif<span>search</span></h1>
    		</div>
		);
	}
}

class SearchForm extends React.Component {
	constructor() {
		super();
		this.state = {
			searchText: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	onSearchChange(e) {
		this.setState({
			searchText: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSearch(this.state.searchText);
		e.currentTarget.reset();
	}


	render() {
		return (
			<form className="searchForm" onSubmit={this.handleSubmit}>
				<label htmlFor="search" className="hidden">Search</label>
				<input type="search"
						onChange={this.onSearchChange}
						name="searchText"

						placeholder="Search for Gifs Here!" />
				<button type="submit" id="submit" className="searchBtn">Submit</button>
			</form>
		);
	}
}


const GifGallery = props => {

	const results = props.data;
	let gifs = results.map(gif => 
		<Gif url={gif.images.fixed_height.url} key={gif.id}/>
	);

	return (

		<ul className='gifGallery'>
			{gifs}
		</ul>
	);
}

const Gif = props => (
		<li className='gifContainer'>
			<img src={props.url} alt=""/>
		</li>
	)


class App extends React.Component {
	constructor() {
		super();
		this.state= {
			gifs: [],
			searchText: ''
		};
		this.search = this.search.bind(this);
	}

	componentDidMount() {
		// this.search();
	}

	search(query) {
				axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=10FVTMijac0PRGpgEUDcmxrTdhqUORRu&limit=24&rating=G`)
		.then((res) => {
			console.log(res);
			this.setState({
				gifs: res.data.data
			});
		})	
	}

    render() {
    	console.log(this.state.gifs);
      return (
      	<div>
	        <header>
	        	<div className="wrapper">
		        	<Header />
		        	<SearchForm onSearch={this.search}/>
	        	</div>
	        </header>
	        <div className="wrapper">
        	<GifGallery data={this.state.gifs} />
        	</div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

	// <form onSubmit={this.handleSearchInputChange, event => event.preventDefault()}>
