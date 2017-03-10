import React, { Component } from 'react'
import { Link } from 'react-router'
import Solus from '../components/Solus'
import Time from '../components/Time'
import Admin from '../components/Admin'
import Weather from '../components/Weather'

/*----------- Web Speech API --------------- */
/*---------- Add Chrome Prefixes ----------- */
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

/*---------- Start Speech Synthesis ------------ */
var synth = window.speechSynthesis;
var voices = synth.getVoices();
var voice = voices.fiona;

/*---------- Start Speech Recognition ------------ */
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
// recognition.continuous = true;
// recognition.interimResults = true;
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('.output');
const bg = document.querySelector('html');

export default class AppContainer extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount () {
        say("How are you?");
        setTimeout(() =>{recognition.start()}, 1000);
        console.log('Ready to receive.');
    }
    say (response) {
        var utterance = new SpeechSynthesisUtterance(response);
        utterance.voice = voice;
        utterance.pitch = 1;
        utterance.rate = .9;
        synth.speak(utterance);
    }

    render () {
        return (
            <div>
                <Solus />
                {/*<Time />
                <Weather />
                <Admin />
                <Player />*/}
            </div>
        )
    }
}