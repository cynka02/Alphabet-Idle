const loop = {
    generatePoints(deltaTime) {
        player.points += player.pps * deltaTime / 1000;
    },

    produceLetters(deltaTime){
        if (player.letterQueue.length > 0) {
            let letter = player.letterQueue[0];
            letter.productionTime -= deltaTime * player.productionSpeed;
            if (letter.productionTime <= 0) {
                player.letterQueue.shift();
                player.letters[letter.name]++;
                player.output = player.output + letter.name;
                player.outputLast = player.outputLast + letter.name;
                player.shortenOutputs();
                words.checkOutput();
                player.calculatePPS();
                words.unreveal();
                
                updates.ppsDisplay();
                updates.outputDisplay();
                updates.productionReset(); 
                updates.queueLettersDisplay();
                updates.queueTextDisplay();
                updates.wordsHintDisplay();
                updates.wordsCheck();
            }
            else{
                updates.productionDisplay(letter.name, 1-letter.productionTime/lettersProductionTime[letter.name]);
            }
        }
    }
}