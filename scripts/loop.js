const loop = {
    generate(deltaTime) {
        player.points += player.pps * deltaTime / 1000;
    },

    produceLetters(deltaTime){
        if (player.letterQueue.length > 0) {
            let letter = player.letterQueue[0];
            if (letter.productionTime <= 0) {
                player.letterQueue.shift();
                player.letters[letter.name]++;
                player.output = letter.name + player.output;
                player.calculatePPS();
                if (player.letterQueue.length === 0) {
                    updates.produceReset();
                }
                if (letter.name == "b"){
                    updates.showProductionUpgrade();
                }
                if (player.output.length >= 5){
                    updates.showOutput();
                }
                updates.pps();
                updates.queueDisplay(player.letterQueue.length, player.queueLimit);
                updates.queueLetters(player.letterQueue);
                updates.output(player.output);
            } else {
                letter.productionTime -= deltaTime * player.productionSpeed;
            }
        }
    }
}