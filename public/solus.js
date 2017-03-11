/*----------- Web Speech API --------------- */
/*---------- Add Chrome Prefixes ----------- */
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

/*------------ My custom moods ------------- */
export const goodMoods = [ 
  'I\'m in a good mood', 'I\'m in a good mood', 'I\'m feeling pretty good', 
  'great', 'I\'m great', 'I feel great', 'doing great',
  'awesome', 'hyper', 'excited', 'stoked', 'rad',
  'well', 'I\'m well', 'very well', 'very well, thank you'
  ]
export const ambivalent = [ 
  'fine', 'I\'m fine', 'fine, thanks', 'fine, thank you', 
  'okay', 'I\'m okay', 'been better', 'I\'ve been better', 
  'not bad', 'I\'m tired', 'I\'m exhausted', 'I\'m nackered'
  ]
export const badMoods = [ 
  'I\'m alive', 'I\m still here', 'I\'m holding on', 
  'bummed', 'I\'m bummed', 'I\'m kinda bummed', 
  'sad', 'I\'m sad', 'I\'m really sad', 'not good', 
  'crappy', 'I feel like crap', 'I feel horrible', 'I\'m sick', 
  'stressed', 'stressed out', 'I\'m so stressed', 'I\'m still stressed', 
  'depressed', 'I\'m depressed', 'I\'m really depressed' 
  ]
export const grammar = '#JSGF V1.0; grammar goodMoods; public <goodMood> = ' + goodMoods.join(' | ') + 
' ; #JSGF V1.0; grammar ambivalent; public <ambivalent> = ' + ambivalent.join(' | ') + 
' ; #JSGF V1.0; grammar badMood; public <badMood> = ' + badMoods.join(' | ') + ' ;'

/*---------- Start Speech Synthesis ------------ */
var synth = window.speechSynthesis;
var voices = synth.getVoices();
var voice = voices.fiona;

/*---------- Start Speech Recognition ------------ */
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
console.log(recognition.serviceURI);
/*------------ Speech Synthesis ------------ */
function say (response) {
  var utterance = new SpeechSynthesisUtterance(response);
  utterance.voice = voice;
  utterance.pitch = 1;
  utterance.rate = .9;
  synth.speak(utterance);
}

/*----------- Begin Converstation ----------- */
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('body');

document.body.onload = function() {
  say("How are you?");
  setTimeout(() => { recognition.start() }, 1500);
  console.log('Ready to receive.');
}

/*------- Use Results to Change UI ---------- */
recognition.onresult = function (event) {
  var last = event.results.length - 1;
  var input = event.results[last][0].transcript;
  
  diagnostic.textContent = 'I heard you say: ' + input + '.';
  /*---------- Create Bot Response ------------ */
  function interpret(input) {
    if (goodMoods.includes(input)){
      bg.style.background = "url('images/dusk-1.jpg')";
      return;
    } else if (badMoods.includes(input)){
      bg.style.background = "url('images/sunrise-1.jpg')";
      return;
    } else if (ambivalent.includes(input)) {
      bg.style.background = "url('images/midday-1.jpg')";
      say("Tell me more.");
      // setTimeout(() =>{recognition.start()}, 2000);
      // recognition.onresult = function(event) {
      //   var last = event.results.length - 1;
      //   var input = event.results[last][0].transcript;
      //   diagnostic.textContent = 'Result received: ' + input + '.';
      //   interpret(input);
      // }
    }
  }
  interpret(input);
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop(); // may not want
}

/*---------- Error Handling ------------ */
recognition.onnomatch = function(event) {
  say('I didnt understand your mood.');
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

// may be useful for debugging
  // utterance.onpause = function(event) {
  //   var char = event.utterance.text.charAt(event.charIndex);
  //   console.log('Speech paused at character ' + event.charIndex + ' of "' +
  //   event.utterance.text + '", which is "' + char + '".');
  //   }