import React from 'react';
import YouTube from 'react-youtube';
import moviedb from '../apis/moviedb';
import Modal from './Modal';

class Video extends React.Component{
    state = {
        movieId: null,
        videoKey: null,
        isModalOpen: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.movieId !== prevState.movieId){
            return { movieId: nextProps.movieId }
        }
        else return null;
    }

    componentDidMount(){
        if(this.props.movieId){
            this.getYoutubeVideoKey(this.props.movieId);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.movieId !== this.props.movieId){
            this.setState({ movieId: this.props.movieId });
            this.getYoutubeVideoKey(this.state.movieId);
        }
    }
    
    getYoutubeVideoKey = async (id) => {
        const res = await moviedb.get(`/movie/${id}/videos`, {
            params:{
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'sv-SE'
            }
        })

        if(res.data.results.length > 0){
            const key = res.data.results[0].key;
            this.setState({ videoKey: key });
        } else {
            this.getEnYoutubeVideoKey(id);
        }
    }

    getEnYoutubeVideoKey = async (id) => {
        const res = await moviedb.get(`/movie/${id}/videos`, {
            params:{
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'en-US'
            }
        })

        if(res.data.results.length > 0){
            const key = res.data.results[0].key;
            this.setState({ videoKey: key })
        }
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    stopYoutubeVideo = (key) => {
        const videoEL = document.querySelector('iframe');
        const video = document.querySelector('iframe').src;
        const newKey = video.replace('rh5HoEae0Zg', key);
        videoEL.setAttribute('src', '');
        videoEL.setAttribute('src', newKey); 
    }

    openModal = () => this.setState({ isModalOpen: true });

    closeModal = () => {
        this.setState({ isModalOpen: false });
        this.stopYoutubeVideo(this.state.videoKey);
    }

    render(){
        const opts = {
            height: '360',
            width: '640'
            // playerVars: {
            //     autoplay: 1
            // }
        }

        const { videoKey, isModalOpen } = this.state;

        return(
            <React.Fragment>
            {
                videoKey &&
                <div>
                    <button className="btn--play" onClick={() => {this.openModal()}}>
                        <i className="play icon"></i><span>Trailer</span> 
                    </button>
                    <Modal
                        isModalOpen={isModalOpen}
                        closeModal={this.closeModal}
                    >                  
                        <YouTube 
                            videoId={videoKey}
                            opts={opts}
                            onReady={this._onReady}
                        />
                    </Modal>
                </div>
            }
            </React.Fragment>
        )
    }
}

export default Video;