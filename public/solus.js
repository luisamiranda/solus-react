/*----------- Web Speech API --------------- */
/*---------- Add Chrome Prefixes ----------- */
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

/*------------ My custom moods ------------- */
var moods = [ 'great' , 'awesome' , 'hyper', 'stoked', 'well', 'fine', 'ok', 'alive', 'bummed', 'sad', 'crappy', 'sick', 'stressed', 'depressed' ];
var grammar = '#JSGF V1.0; grammar moods; public <moods> = ' + moods.join(' | ') + ' ;'

/*----------- Start Speech Rec ------------- */
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onload = function() {
  recognition.start();
  console.log('Ready to receive.');
}

/*------- Use Results to Change UI ---------- */
recognition.onresult = function(event) {
  var last = event.results.length - 1;
  var mood = event.results[last][0].transcript;
  
  diagnostic.textContent = 'Result received: ' + mood + '.';
  if (mood === ('sad')){
    bg.style.background="url('images/solace-1.jpg')";
  } 
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  //recognition.stop(); // may not want
  //recognition.start();// start again after a sentence?
  // maybe start should be after response
}

/*---------- Error Handling ------------ */
recognition.onnomatch = function(event) {
  diagnostic.textContent = 'I didnt recognise that color.';
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

/*---------- Create Response ------------ */
// placeholder for actual interpretive logic
//var response = interpreter(results);

/*---------- Speech Synthesis ------------ */
var synth = window.speechSynthesis;
var voices = synth.getVoices();
var voice = voices.fiona;

function talkbalk (response) {
  var utterance = new SpeechSynthesisUtterance(response);
  utterance.voice = voice;
  utterance.pitch = 9;
  utterance.rate = 9;
  synth.speak(utterThis);
// may be useful for debugging
  utterance.onpause = function(event) {
    var char = event.utterance.text.charAt(event.charIndex);
    console.log('Speech paused at character ' + event.charIndex + ' of "' +
    event.utterance.text + '", which is "' + char + '".');
    }
}

