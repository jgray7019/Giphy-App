import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import request from 'superagent';

class Header extends React.Component {
	render() {
		return (
			<header>
				<h1>Gif Thing</h1>
			</header>
		);
	}
}

class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			searchInput: ''
			};
		}


		onInputChange(searchInput) {
			this.setState({searchInput});
			this.props.onSearchInputChange(searchInput);
		}

		render() {
			return (
				<div className="searchBar">
					<input onChange={event => this.onInputChange(event.target.value)} type="text" />
				</div>
			);
	}
}

const GifGallery = (props) => {
	const gifItems = props.gifs.map((image) => {
		return <GifItem key={image.id} gif={image} />
	});

	return (
		<ul>{gifItems}</ul>
	);
};

const GifItem = (image) => {
	return (
		<li>
			<img src={image.gif.images.downsized.url} />
		</li>
	)
}




class App extends React.Component {
	constructor() {
		super();
		this.state= {
			gifs: []
		};

		this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
	}

	handleSearchInputChange(searchInput) {
		const url = `https://api.giphy.com/v1/gifs/search?api_key=10FVTMijac0PRGpgEUDcmxrTdhqUORRu&q=${searchInput.replace(/\s/g, '+')}&limit=25&offset=0&rating=G&lang=en`;

		request.get(url, (err, res) => {
			// console.log(res.body.data[0]);
			this.setState(
				{ gifs: res.body.data }
			);
		});
	}
    render() {
      return (
        <div>
        	<Header />
        	<Search onSearchInputChange={this.handleSearchInputChange} />
        	<GifGallery gifs={this.state.gifs}/>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
