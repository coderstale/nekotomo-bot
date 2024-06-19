const scenarios = require('../config/scenarios');
const ganyuResponses = require('../responses/ganyuResponses');

function selectResponse(messageContent) {
    const lowerCaseContent = messageContent.toLowerCase();

    if (lowerCaseContent.includes('greet')) {
        return scenarios.greet[Math.floor(Math.random() * scenarios.greet.length)];
    } else if (lowerCaseContent.includes('help')) {
        return scenarios.help[Math.floor(Math.random() * scenarios.help.length)];
    } else if (lowerCaseContent.includes('farewell')) {
        return scenarios.farewell[Math.floor(Math.random() * scenarios.farewell.length)];
    }

    if (lowerCaseContent.includes('hello') || lowerCaseContent.includes('hi')) {
        return ganyuResponses.greetings[Math.floor(Math.random() * ganyuResponses.greetings.length)];
    } else if (lowerCaseContent.includes('bye') || lowerCaseContent.includes('goodbye') || lowerCaseContent.includes('farewell')) {
        return ganyuResponses.farewells[Math.floor(Math.random() * ganyuResponses.farewells.length)];
    } else if (lowerCaseContent.includes('quote') || lowerCaseContent.includes('wisdom')) {
        return ganyuResponses.quotes[Math.floor(Math.random() * ganyuResponses.quotes.length)];
    } else if (lowerCaseContent.includes('meow') || lowerCaseContent.includes('miau') || lowerCaseContent.includes('cat')) {
        return ganyuResponses.catSounds[Math.floor(Math.random() * ganyuResponses.catSounds.length)];
    } else if (lowerCaseContent.includes('ganyu')) {
        return ganyuResponses.ganyuResponses[Math.floor(Math.random() * ganyuResponses.ganyuResponses.length)];
    } else if (lowerCaseContent.includes('play')) {
        return ganyuResponses.playful[Math.floor(Math.random() * ganyuResponses.playful.length)];
    } else if (lowerCaseContent.includes('pet')) {
        return ganyuResponses.petResponses[Math.floor(Math.random() * ganyuResponses.petResponses.length)];
    }

    return null; 
}

module.exports = selectResponse;
