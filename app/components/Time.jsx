import React, {Component} from 'react'

export default class Time extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    componentDidMount () {
        this._interval = setInterval(function () {
        this.setState({
            hours: new Date().getHours(),
            minutes: ('0' + new Date().getMinutes()).slice(-2)
        })
        }.bind(this), 1000);
    }
  
    componentWillUnmount () {
        clearInterval(this._interval);
    }

    render () {
        return (
            <div>
                <h1>{this.state.hours}:{this.state.minutes}</h1>
            </div>
      )
    }
}
