import React, {Component} from 'react'
import Progress from '../component/progress'
import $ from 'jquery'
import jPlayer from 'jplayer'
import './player.css'
import {Link} from 'react-router';
import PubSub from 'pubsub-js'
class Player extends Component {
    constructor(props) {
        super(props),
            this.state = {
                progress: '0',
                duration: null,
                volume: 0,
                play: true,
                leftTime: 0
            }
    }
    componentDidMount() {
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                duration:e.jPlayer.status.duration,
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100,
                leftTime: this.formatTime(this.state.duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        });
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate)
    }
    play() {
        if (this.state.play) {
            $("#player").jPlayer("pause");
        } else {
            $("#player").jPlayer("play");
        }
        this.setState({
            play: !this.state.play
        });
    }

    changeVolumeHandler(progress) {
        $("#player").jPlayer("volume", progress);
    }
    changeProgressHandler(progress) {
        $('#player').jPlayer('play', this.state.duration * progress)
        this.setState({
            play: true
        });
    }


    next() {
        PubSub.publish('PLAY_NEXT');
    }

    prev() {
        PubSub.publish('PLAY_PREV');
    }

    changeRepeat() {
        PubSub.publish('CHANAGE_REPEAT');
    }

    formatTime(time) {
        time = Math.floor(time);
        let miniute = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的音乐 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div   className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler}
                                        barColor='#aaa'>
                                    </Progress>
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.changeProgressHandler.bind(this)}
                            >
                            </Progress>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.prev}></i>
                                <i className={`icon ml20 ${this.state.play ? 'pause' : 'play'}`}
                                   onClick={this.play.bind(this)}></i>
                                <i className="icon next ml20" onClick={this.next}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;