const words = {
    checkOutput(){
        let output = player.outputLast;
        let wordsList = this.getList();

        for (let i=0; i <= wordsList.length; i++){
            let word = wordsList[i];
            if (output.includes(word)){
                if (!player.wordsCrafted[word]){
                    player.wordsCrafted[word] = 1;
                    player.wordsReveal[word] = word;
                }
                else{
                    player.wordsCrafted[word] += 1;
                }
                if (this.getBonusNum(word) == 2){
                    player.productionSpeed /= this.getMult(word, -1);
                    player.productionSpeed *= this.getMult(word);
                }
                else if (this.getBonusNum(word) == 3){
                    player.lettersPriceMult *= this.getMult(word, -1);
                    player.lettersPriceMult /= this.getMult(word);
                    updates.lettersDisplay();
                }
                player.outputLast = "";
                updates.wordsCreate();
                updates.wordsDisplay(word);
                return;
            }
        }
    },

    unreveal(){
        let output = player.outputLast;
        let words = this.getUnlocked();

        for (let i = 0; i < output.length; i++) {
            for (let word of words) {
                let matchLength = 0;
                while (
                    matchLength < word.length &&
                    i + matchLength < output.length &&
                    output[i + matchLength] === word[matchLength]
                ) {
                    matchLength++;
                }

                if (matchLength > 0) {
                    let prefix = output.slice(i, i + matchLength);
                    if (player.wordsReveal[word].length < prefix.length){
                        player.wordsReveal[word] = prefix;
                        updates.wordsDisplay(word);
                    }
                }
            }
        }
    },

    getList(){
        return Object.keys(wordsDict);
    },

    getNum(word){
        return Object.keys(wordsDict).indexOf(word)+1;
    },

    getBonusNum(word){
        return wordsDict[word].bonusNum;
    },

    getMult(word, level=0){
        if (player.wordsCrafted[word]){
            return wordsDict[word].bonusMult(player.wordsCrafted[word]+level);
        }
        else{
            return 1;
        }
    },

    getUnlocked(letters = player.unlockedLetters){
        let list = [];
        for (let word in wordsDict){
            let unlocked = [...word].every(letter => letters.includes(letter));
            if (unlocked){
                list.push(word);
            }
        }
        return list;
    },

    getMultOverall(word){
        let bonusNum = this.getBonusNum(word);
        let mult = 1;
        for (let w in wordsDict){
            if (wordsDict[w].bonusNum == bonusNum){
                mult *= this.getMult(w);
            }
        }
        return mult;
    },

    getBasicList(){
        let list = [];
        let listNum= [];
        for (let word of this.getList()){
            let num = wordsDict[word].bonusNum;
            if (!listNum.includes(num)){
                list.push(word);
                listNum.push(num);
            }
        }
        return list;
    },

    getNextByBonus(word){
        let wordsList = this.getList();
        let bonusNum = this.getBonusNum(word);

        let sameBonusWords = wordsList.filter(key => this.getBonusNum(key) === bonusNum);
        let index = sameBonusWords.indexOf(word);

        if (index === sameBonusWords.length - 1) {
            return word;
        } 
        else {
            return sameBonusWords[index + 1];
        }
    },

    hintCost(){
        return player.pps * 12;
    },

    buyHint(){
        let cost = this.hintCost();
        if (player.points >= cost){
            let candidates = Object.keys(player.wordsReveal).filter(word => 
                this.getUnlocked().includes(word) && player.wordsReveal[word] !== word);
            if (candidates.length === 0) return null;

            player.points -= cost;
            let chosen = candidates[Math.floor(Math.random() * candidates.length)];

            let currentValue = player.wordsReveal[chosen];
            player.wordsReveal[chosen] += chosen[currentValue.length];
            updates.wordsHintCheck();
            updates.wordsDisplay(chosen);
        }
    }
}