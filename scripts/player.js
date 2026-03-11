const player = {
    points: 0,
    pps: basePPS,
    unlockedLetters: ["a"],
    letters: {a:0, b:0, c:0, d:0, e:0, f:0, g:0, h:0, i:0, j:0, k:0, l:0, m:0, n:0, o:0, p:0, q:0, r:0, s:0, t:0, u:0, v:0, w:0, x:0, y:0, z:0},
    // do poprawy pps: letters: {a:1, b:1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l:1, m:1, n:1, o:1, p:1, q:1, r:1, s:1, t:1, u:1, v:1, w:1, x:1, y:1, z:1},
    letterQueue: [],
    queueLimit: 1,
    productionSpeed: 1,
    fasterProductionLevel: 0,
    output: "",
    
    calculatePPS() {
        let pps = basePPS;
        for (let letter in this.letters) {
            pps *= (1 + this.letters[letter] * letterMult[letter]);
        }
        this.pps = pps;
    }
};