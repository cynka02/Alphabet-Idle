const letters = {
    next(letter) {
        if (letter === "z") return "z";
        return String.fromCharCode(letter.charCodeAt(0) + 1);
    },

    buy(letter){
        if (player.points >= lettersCost[letter]*player.lettersPriceMult && player.letterQueue.length < player.queueLimit) {
            player.points -= lettersCost[letter]*player.lettersPriceMult;
            if (!player.unlockedLetters.includes(this.next(letter))){
                player.unlockedLetters.push(this.next(letter));
                updates.lettersCreate();
                updates.wordsCreate();
                updates.wordsCheck();
            }
            player.letterQueue.push({name: letter, productionTime: lettersProductionTime[letter]});
            updates.queueLettersDisplay();
            updates.queueTextDisplay();
            
            if (player.unlockedLetters.length >= 2){
                updates.productionShow();
            }
        }
    }
}