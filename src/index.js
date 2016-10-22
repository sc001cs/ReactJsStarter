import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDU0tUn-v-26UkX4QC2QZTAd32VRfZxmt8';

// Create a new component, this component produce some HTML
// Declaring the function in ES6 can be () =>
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('albania');
    }

    videoSearch(term) {

        YTSearch({key: API_KEY, term: term}, (videos) => {

            // it's equals with: this.setState({ videos: videos });
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
            console.log( 'Videos on array below: ' );
            console.log( videos );
        });

    }

    render() {

        const videoSearch = _.debounce( (term) => { this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={ videoSearch } />

                <div className="row">

                    <VideoDetail video={ this.state.selectedVideo } />

                    <VideoList
                        onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                        videos={this.state.videos} />

                </div>
            </div>
        );
    }
}

// Take this component and put it on the page (in the DOM)
ReactDOM.render( <App />,  document.querySelector('.container'));