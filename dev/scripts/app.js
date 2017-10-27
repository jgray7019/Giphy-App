import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import axios from 'axios';
import InvalidSearch from './InvalidSearch.js';
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
		this.props.onSearch(this.query.value);
		e.currentTarget.reset();
	}

	render() {
		return (
			<form className="searchForm" onSubmit={this.handleSubmit}>
				<label htmlFor="search" className="hidden">Search</label>
				<input type="search"
						onChange={this.onSearchChange}
						name="searchText"
						ref={(input) => this.query = input}
						placeholder="Search for Gifs Here!" />
				<button type="submit" id="submit" className="searchBtn">Submit</button>
			</form>
		);
	}
}

class LoadMore extends React.Component {
	render() {
		return (
			<button className="loadMoreBtn">Load More</button>
		)
	}
}

const GifGallery = props => {

	const results = props.data;
	let gifs;
	if (results.length > 0) {
		gifs = results.map(gif => 
			<Gif url={gif.images.fixed_height.url} key={gif.id}/>
		);
		} else {
			gifs = <InvalidSearch />
		}
	

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
			searchText: '',
			loading: true,
			limit: 24
		};
		this.search = this.search.bind(this);
	}

	componentDidMount() {
		this.search();
	}

	search(query = 'welcome', limit = 24) {
				axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=10FVTMijac0PRGpgEUDcmxrTdhqUORRu&limit=${limit}&rating=G`)
		.then((res) => {
			console.log(res);
			this.setState({
				gifs: res.data.data,
				loading: false
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
	        	{
	        		(this.state.loading)
	        		? 
	        		<p>Loading...</p>
	        		:
	        		<GifGallery data={this.state.gifs} />
	        		// <LoadMore />
	        	}
        	</div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

	// <form onSubmit={this.handleSearchInputChange, event => event.preventDefault()}>
