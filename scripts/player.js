const player = {
    points: 1000000000000000000000000000000,
    pps: basePPS,
    unlockedLetters: ["a"],
    letters: {a:0, b:0, c:0, d:0, e:0, f:0, g:0, h:0, i:0, j:0, k:0, l:0, m:0, n:0, o:0, p:0, q:0, r:0, s:0, t:0, u:0, v:0, w:0, x:0, y:0, z:0},
    letterQueue: [],
    lettersPriceMult: 1,
    queueLimit: 1,
    productionSpeed: 1000,
    productionSpeedLevel: 0,
    output: "",
    outputLast: "",
    wordsCrafted: [],
    wordsReveal: Object.fromEntries(Object.keys(wordsDict).map(word => [word, word[0]])),

    

    calculatePPS() {
        let pps = basePPS;
        // literki
        for (let letter in this.letters) {
            pps *= (1 + this.letters[letter] * lettersMultiplier[letter]);
        }
        // słowa
        for (let word in this.wordsCrafted){
            if (words.getBonusNum(word) == 1){
                pps *= words.getMult(word);
            }
        }
        this.pps = pps;
    },

    shortenOutputs(){
        if (this.output.length > 35){
            this.output = this.output.slice(-35);
        }
        if (this.outputLast.length > 35){
            this.outputLast = this.outputLast.slice(-35);
        }
    }
};