const letters = {
    next(letter) {
        if (letter === "z") return "z";
        return String.fromCharCode(letter.charCodeAt(0) + 1);
    },

    buy(letter){
        if (player.points >= letterCosts[letter] && player.letterQueue.length < player.queueLimit) {
            player.points -= letterCosts[letter];
            if (!player.unlockedLetters.includes(this.next(letter))){
                if (player.unlockedLetters.length == 1){
                    updates.showProduce();
                }
                player.unlockedLetters.push(this.next(letter));
                updates.lettersCreateDivs();
            }
            player.letterQueue.push({name: letter, productionTime: letterProductionTime[letter]});
            updates.queueDisplay(player.letterQueue.length, player.queueLimit);
            updates.queueLetters(player.letterQueue);
            updates.updateAll();
        }
    }
}