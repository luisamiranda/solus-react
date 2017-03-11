import React, { Component } from 'react'
import { Link } from 'react-router'
import Solus from '../components/Solus'
import Time from '../components/Time'
import Admin from '../components/Admin'
import Weather from '../components/Weather'
/*----------- Web Speech API --------------- */
import { goodMoods, badMoods, ambivalent, grammar} from '../../public/solus'


export default class AppContainer extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div>
            <Time />            
            <h2>solus</h2>

                {/*<Weather />
                <Admin />
            <Player />*/}

            </div>
        )
    }
}