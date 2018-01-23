import React,{Component} from 'react'
import './progress.css'

class Progress extends Component {
    constructor(props) {
        super(props),
        this.state = {
            // barColor:'#40d5bc'
            barColor:'pink'
        }
      }
    changeProgress(e){
        console.log(this.props.onProgressChange)
        let progressBar=this.refs.progressBar
        let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth
        console.log(this.props.progress)
        this.props.onProgressChange&&this.props.onProgressChange(progress)
    }
    render() {
        return (
            <div className='components-progress' ref='progressBar' onClick={this.changeProgress.bind(this)}>
                <div className='progress' style={{width:`${this.props.progress}%`,background:this.state.barColor}} ></div>
            </div>
                );
    }
}

export default Progress;