const pointsText = document.getElementById("points-text");
const ppsInfo = document.getElementById("pps-info");
const buyBox = document.getElementById("buy");
const produceInfo = document.getElementById("produce-info");
const productionContainer = document.getElementById("production-container");
const produce = document.getElementById("produce-now");
const produceContainer = document.getElementById("produce-now-container");
const upgrade = document.getElementById("produce-upgrade");
const queueContainer = document.getElementById("queue-container");
const queueDisplay = document.getElementById("queue-display");
const queue1 = document.getElementById("queue1");
const queue2 = document.getElementById("queue2");
const queue3 = document.getElementById("queue3");
const queue4 = document.getElementById("queue4");
const queue5 = document.getElementById("queue5");
const outputContainer = document.getElementById("output-container");
const output = document.getElementById("output");
const tooltip = document.getElementById("tooltip");
const sections = document.getElementById("sections");
const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const section3 = document.getElementById("section3");
const section4 = document.getElementById("section4");
const wordsContainer = document.getElementById("words-container");
const wordsHint = document.getElementById("words-hint");
const words1 = document.getElementById("words-bonus1-container");
const words2 = document.getElementById("words-bonus2-container");
const words3 = document.getElementById("words-bonus3-container");
const words4 = document.getElementById("words-bonus4-container");
const words5 = document.getElementById("words-bonus5-container");



upgrade.addEventListener("mouseenter", () => {
    if (player.points >= upgrades.productionSpeedCost()) {
        upgrade.classList.add("Hover");
    }
});
upgrade.addEventListener("mouseleave", () => {
    upgrade.classList.remove("Hover");
});
queue1.addEventListener("mouseenter", () => {
    if (player.points >= queueUnlockCost[0] && player.queueLimit <= 1) {
        queue1.classList.add("Hover");
    }
});
queue1.addEventListener("mouseleave", () => {
    queue1.classList.remove("Hover");
});
queue2.addEventListener("mouseenter", () => {
    if (player.points >= queueUnlockCost[1] && player.queueLimit <= 2) {
        queue2.classList.add("Hover");
    }
});
queue2.addEventListener("mouseleave", () => {
    queue2.classList.remove("Hover");
});
queue3.addEventListener("mouseenter", () => {
    if (player.points >= queueUnlockCost[2] && player.queueLimit <= 3) {
        queue3.classList.add("Hover");
    }
});
queue3.addEventListener("mouseleave", () => {
    queue3.classList.remove("Hover");
});
queue4.addEventListener("mouseenter", () => {
    if (player.points >= queueUnlockCost[3] && player.queueLimit <= 4) {
        queue4.classList.add("Hover");
    }
});
queue4.addEventListener("mouseleave", () => {
    queue4.classList.remove("Hover");
});
queue5.addEventListener("mouseenter", () => {
    if (player.points >= queueUnlockCost[4] && player.queueLimit <= 5) {
        queue5.classList.add("Hover");
    }
});
queue5.addEventListener("mouseleave", () => {
    queue5.classList.remove("Hover");
});
wordsHint.addEventListener("mouseenter", () => {
    if (player.points >= words.hintCost()) {
        wordsHint.classList.add("Hover");
    }
});
wordsHint.addEventListener("mouseleave", () => {
    wordsHint.classList.remove("Hover");
});


const updates = {
    /* 
        ...Display() -> updates particular currency/numbers
        ...Show() -> enables visibility of particular section
        ...Create() -> appends divs or creates canvas
        ...Check() -> checks if player can afford smth
        ...Reset() -> resets to default
    */

    pointsDisplay() {
        pointsText.textContent = "Points: " + utils.formatNumber(player.points, "points");
    },
    ppsDisplay(){
        let pps = player.pps;
        ppsInfo.innerHTML = "";

        let item = document.createElement("div");
        item.className = "pps-item"
        item.innerHTML = `
            <div class="pps-letter"></div>
            <div class="pps-value" style="font-size: 20px;">+${utils.formatNumber(pps)}/s</div>`;
        ppsInfo.appendChild(item);

        item = document.createElement("div");
        item.className = "pps-x";
        item.innerHTML = "=";
        ppsInfo.appendChild(item);

        item = document.createElement("div");
        item.className = "pps-item";
        item.innerHTML = `
            <div class="pps-letter">base</div>
            <div class="pps-value">${basePPS}</div>`;
        ppsInfo.appendChild(item);

        let wordsMult = 1;
        for (let word in player.wordsCrafted){
            if (words.getBonusNum(word) == 1){
                wordsMult *= words.getMult(word);
            }
        }
        if (wordsMult !== 1){
            item = document.createElement("div");
            item.className = "pps-x";
            item.innerHTML = "×";
            ppsInfo.appendChild(item);

            item = document.createElement("div");
            item.className = "pps-item";
            item.innerHTML = `
                <div class="pps-letter">words</div>
                <div class="pps-value">${utils.formatNumber(wordsMult)}</div>`;
            ppsInfo.appendChild(item);
        }

        for (let i=0; i < player.unlockedLetters.length; i++) {
            let letter = player.unlockedLetters[i];
            if (player.letters[letter] > 0 || player.unlockedLetters.length == 1) {
                item = document.createElement("div");
                item.className = "pps-x";
                item.innerHTML = "×";
                ppsInfo.appendChild(item);

                item = document.createElement("div");
                item.className = "pps-item";
                item.innerHTML = `
                    <div class="pps-letter">${letter}</div>
                     <div class="pps-value">${utils.formatNumber(1 + player.letters[letter] * lettersMultiplier[letter])}</div>`;
                ppsInfo.appendChild(item);
            }
        }
    },
    lettersDisplay(){
        let unlocked = player.unlockedLetters;
        for (let i = 0; i < unlocked.length; i++) {
            let letter = unlocked[i];
            if (document.getElementById("Letter_" + letter)){
                let letterDiv = document.getElementById("Letter_" + letter);
                letterDiv.innerHTML = "<b style='font-size: 30px'>" + letter + "</b><br>Cost: " + utils.formatNumber(lettersCost[letter]*player.lettersPriceMult, "letterCost");
            }
        }
    },
    productionDisplay(letter, progress){
        if (letter !== "") {
            produce.innerHTML = "";
            const canvas = utils.createLetterCanvas(letter, progress);
            produce.appendChild(canvas);

            const timeText = document.createElement("span");
            timeText.textContent = utils.formatNumber((1-progress)*lettersProductionTime[letter]/player.productionSpeed/1000, "timeProd");
            timeText.style.fontSize = "22px";
            timeText.style.color = "#dbdbdb";
            timeText.style.marginTop = "-35px";
            produce.appendChild(timeText);
        }
    },
    productionUpgradeDisplay(){
        upgrade.innerHTML = `2x faster production<br>Cost: ${utils.formatNumber(upgrades.productionSpeedCost())}`;
    },
    queueTextDisplay(){
        let max = player.queueLimit;
        let current = player.letterQueue.length;
        if (current <= 1 && max-1 != 1){
            queueDisplay.innerHTML = `<b>Production Queue</b><br>${max-1} slots free`;
        }
        else if (current <= 1 && max-1 == 1){
            queueDisplay.innerHTML = `<b>Production Queue</b><br>1 slot free`;
        }
        else if (current > 1 && max-current == 1){
            queueDisplay.innerHTML = `<b>Production Queue</b><br>1 slot free`;
        }
        else{
            queueDisplay.innerHTML = `<b>Production Queue</b><br>${max-current} slots free`;
        }
        
    },
    queueLettersDisplay(){
        let letterQueue = player.letterQueue;
        for (let i = 1; i <= player.queueLimit-1; i++) {
            const queueSlot = document.getElementById("queue" + i);
            queueSlot.innerHTML = "";
            queueSlot.style.cursor = "default";
        }
        if (letterQueue.length > 1) {
            for (let i = 1; i < letterQueue.length; i++) {
                const queueSlot = document.getElementById("queue" + i);
                const canvas = utils.displayLetterQueue(letterQueue[i].name);
                queueSlot.appendChild(canvas);
            }
        }
    },
    outputDisplay(){
        const text = player.output;
        const wordsList = words.getUnlocked();

        let ranges = [];

        // wysrywy z chata ale chyba dzialaja
        for (const pattern of wordsList) {
            let start = 0;
            while (true) {
                const index = text.indexOf(pattern, start);
                if (index === -1) break;
                const end = index + pattern.length;

                const overlaps = ranges.some(r => !(end <= r.start || index >= r.end));
                if (!overlaps) ranges.push({ start: index, end });

                start = index + 1;
            }
        }
        const suffixStart = ranges.length ? Math.max(...ranges.map(r => r.end)) : 0;
        const suffixText = text.slice(suffixStart);

        let bestMatch = null;
        for (const pattern of wordsList) {
            const maxCheck = Math.min(pattern.length, suffixText.length);
            for (let n = 1; n <= maxCheck; n++) {
                const suffix = suffixText.slice(-n);
                const prefix = pattern.slice(0, n);
                if (suffix === prefix) {
                    const start = text.length - n;
                    const end = text.length;
                    if (!bestMatch || n > bestMatch.length) {
                        bestMatch = { start, end, length: n };
                    }
                }
            }
        }

        if (bestMatch) {
            const overlaps = ranges.some(r => !(bestMatch.end <= r.start || bestMatch.start >= r.end));
            if (!overlaps) ranges.push({ start: bestMatch.start, end: bestMatch.end });
        }
        if (bestMatch) {
            const overlaps = ranges.some(r => !(bestMatch.end <= r.start || bestMatch.start >= r.end));
            if (!overlaps) ranges.push({ start: bestMatch.start, end: bestMatch.end });
        }
        ranges.sort((a, b) => a.start - b.start || a.end - b.end);
        const merged = [];
        for (const r of ranges) {
            const last = merged[merged.length - 1];
            if (!last || r.start >= last.end) merged.push({ ...r });
            else last.end = Math.max(last.end, r.end);
        }
        const visibleStart = Math.max(0, text.length - 25);
        let visibleText = text.slice(visibleStart);
        if (text.length > 25) visibleText = "..." + visibleText;

        const visibleRanges = merged
            .filter(r => r.end > visibleStart)
            .map(r => ({
                start: Math.max(r.start, visibleStart) - visibleStart + (text.length > 25 ? 3 : 0),
                end: r.end - visibleStart + (text.length > 25 ? 3 : 0)
            }));
        
        let result = "";
        let pos = 0;
        for (const r of visibleRanges) {
            result += visibleText.slice(pos, r.start);
            result += `<span style="color:#58b1ff;font-weight:bold">${visibleText.slice(r.start, r.end)}</span>`;
            pos = r.end;
        }
        result += visibleText.slice(pos);
        result = result + "<";
        output.innerHTML = result;
    },
    wordsDisplay(word){
        if (document.getElementById("word"+word)){
            let wordDiv = document.getElementById("word"+word);
            let spanHTML = "";
            if (Object.keys(player.wordsCrafted).includes(word)){
                for (let i = 0; i < word.length; i++) {
                    spanHTML += `<span>${word[i]}</span>`;
                }
            }
            else{
                for (let i = 0; i < player.wordsReveal[word].length; i++){
                    spanHTML += `<span>${player.wordsReveal[word][i]}</span>`;
                }
                for (let i = player.wordsReveal[word].length; i < word.length; i++) {
                    spanHTML += `<span>•</span>`;
                }
            }
            
            for (let i = 0; i < word.length; i++) {
                spanHTML += `<span class="word-line"></span>`;
            }

            let num = words.getBonusNum(word);
            if (num == 1){
                document.getElementById("words-bonus1-desc").innerHTML = `<b>Multiplier bonus</b><br><span style="font-size: 14px;"><b>×${utils.formatNumber(words.getMultOverall(word), "wordBonus")}</b> overall bonus</span>`;
            }
            else if (num == 2){
                document.getElementById("words-bonus2-desc").innerHTML = `<b>Faster production</b><br><span style="font-size: 14px;"><b>×${utils.formatNumber(words.getMultOverall(word), "wordBonus")}</b> overall bonus</span>`;
            }
            else if (num == 3){
                document.getElementById("words-bonus3-desc").innerHTML = `<b>Cheaper letters</b><br><span style="font-size: 14px;"><b>×${utils.formatNumber(words.getMultOverall(word), "wordBonus")}</b> overall bonus</span>`;
            }
            else if (num == 4){
                document.getElementById("words-bonus4-desc").innerHTML = `<b>Faster automation</b><br><span style="font-size: 14px;"><b>×${utils.formatNumber(words.getMultOverall(word), "wordBonus")}</b> overall bonus</span>`;
            }
            else if (num == 5){
                document.getElementById("words-bonus5-desc").innerHTML = `<b>Groups multiplier</b><br><span style="font-size: 14px;"><b>×${utils.formatNumber(words.getMultOverall(word), "wordBonus")}</b> overall bonus</span>`;
            }

            if (player.wordsCrafted[word] == 1){
                wordDiv.innerHTML = `<div class="word-desc">${spanHTML}</div>
                <div class="word-info"><span>Crafted</span><span><b>${utils.formatNumber(player.wordsCrafted[word], "count")}</b> time</span><span>Bonus</span><span><b>×${utils.formatNumber(words.getMult(word), "wordBonus")}</b></span></div>`;
            }
            else if (player.wordsCrafted[word]){
                wordDiv.innerHTML = `<div class="word-desc">${spanHTML}</div>
                <div class="word-info"><span>Crafted</span><span><b>${utils.formatNumber(player.wordsCrafted[word], "count")}</b> times</span><span>Bonus</span><span><b>×${utils.formatNumber(words.getMult(word), "wordBonus")}</b></span></div>`;
            }
            else{
                wordDiv.innerHTML = `<div class="word-desc">${spanHTML}</div>
                <div class="word-info"><span>Crafted</span><span><b>0</b> times</span><span>Bonus</span><span><b>×1.00</b></span></div>`;
            }

            wordDiv.querySelector(".word-desc").style.gridTemplateColumns = `repeat(${word.length}, ${Math.max(31-word.length*2.5,10.5)}%`;
            wordDiv.querySelector(".word-desc").style.fontSize = `${Math.max(40-word.length*2.3,10)}px`;
            wordDiv.querySelectorAll(".word-line").forEach(el =>{
                el.style.width = `${23-word.length*1.6}px`;
            })
        }
    },
    wordsHintDisplay(){
        wordsHint.innerHTML = `Buy hint for random word<br>Cost: ${utils.formatNumber(words.hintCost())}`;
    },


    queueShow(){
        queueContainer.style.visibility = "visible";
    },
    productionShow(){
        produceInfo.style.visibility = "visible";
        productionContainer.style.visibility = "visible";
    },
    productionUpgradeShow(){
        upgrade.style.visibility = "visible";
    },
    outputShow(){
        outputContainer.style.visibility = "visible";
    },
    sectionsShow(num){
        sections.style.display = "flex";
        if (num == 1){
            section1.style.display = "inline-block";
            this.sectionsWordsShow();
        }
        else if (num == 2){
            section2.style.display = "inline-block";
        }
        else if (num == 3){
            section3.style.display = "inline-block";
        }
        else if (num == 4){
            section4.style.display = "inline-block";
        }
    },
    sectionsWordsShow(){
        // przy dodawaniu kolejnych sekcji tutaj również je dodać na display none i zmieniać style
        wordsContainer.style.display = "flex";
    },
    

    lettersCreate(){
        let unlocked = player.unlockedLetters;
        for (let i = 0; i < unlocked.length; i++) {
            let letter = unlocked[i];
            if (!document.getElementById("Letter_" + letter)){
                let nextLetter = document.createElement("div");
                nextLetter.id = "Letter_" + letter;
                nextLetter.classList.add("letters");
                nextLetter.onclick = () => letters.buy(letter);
                nextLetter.addEventListener("mouseenter", () => {
                    tooltip.innerHTML = `Multiplier&nbsp;&nbsp;&nbsp;<b>+${utils.formatNumber(lettersMultiplier[letter])}</b><br>Prod. time&nbsp;&nbsp;&nbsp;<b>${utils.formatNumber(lettersProductionTime[letter]/1000/player.productionSpeed, "time")}</b>`;
                    tooltip.style.opacity = 0.85;
                    if (player.points >= lettersCost[letter]*player.lettersPriceMult) {
                        nextLetter.classList.add("Hover");
                    }
                });
                nextLetter.addEventListener("mouseleave", () => {
                    nextLetter.classList.remove("Hover");
                    tooltip.style.opacity = 0;
                });
                nextLetter.addEventListener("mousemove", e => {
                    tooltip.style.left = (e.clientX + 14) + "px";
                    tooltip.style.top = (e.clientY + 14) + "px";
                });
        
                buyBox.appendChild(nextLetter);
            }
        }
        this.lettersDisplay();
    },
    queueLockedCreate(){
        for (let i = 5; i >= player.queueLimit; i--) {
            const queueSlot = document.getElementById("queue" + i);
            const lockCanvas = utils.createLockCanvas();
            queueSlot.appendChild(lockCanvas);
        
            const costText = document.createElement("span");
            costText.textContent = "Cost: " + utils.formatNumber(queueUnlockCost[i - 1]);
            costText.style.fontSize = "12px";
            costText.style.color = "#dbdbdb";
            costText.style.marginTop = "-20px";
            queueSlot.appendChild(costText);
            
            queueSlot.onclick = () => upgrades.unlockQueue(i);
        }
    },
    wordsCreate(){
        let basicWords = words.getBasicList();
        for (let word of basicWords){
            if (!document.getElementById("word" + word)){
                let wordDiv = document.createElement("div");
                wordDiv.classList.add("word");
                wordDiv.id = "word" + word;
                wordDiv.style.background = "linear-gradient(145deg, #777777, #3b3b3b)";

                let bonusNum = words.getBonusNum(word);
                if (bonusNum == 1){
                    words1.appendChild(wordDiv);
                    document.getElementById("words-bonus1").style.display = "flex";
                }
                else if (bonusNum == 2){
                    words2.appendChild(wordDiv);
                    document.getElementById("words-bonus2").style.display = "flex";
                }
                else if (bonusNum == 3){
                    words3.appendChild(wordDiv);
                    document.getElementById("words-bonus3").style.display = "flex";
                }
                else if (bonusNum == 4){
                    words4.appendChild(wordDiv);
                    document.getElementById("words-bonus4").style.display = "flex";
                }
                else if (bonusNum == 5){
                    words5.appendChild(wordDiv);
                    document.getElementById("words-bonus5").style.display = "flex";
                }
                this.wordsDisplay(word);
            }
        }

        for (let word of words.getUnlocked()){
            if (!document.getElementById("word" + word)){
                let wordDiv = document.createElement("div");
                wordDiv.classList.add("word");
                wordDiv.id = "word" + word;
                wordDiv.style.background = "linear-gradient(145deg, #777777, #3b3b3b)";

                let bonusNum = words.getBonusNum(word);
                if (bonusNum == 1){
                    words1.appendChild(wordDiv);
                    document.getElementById("words-bonus1").style.display = "flex";
                }
                else if (bonusNum == 2){
                    words2.appendChild(wordDiv);
                    document.getElementById("words-bonus2").style.display = "flex";
                }
                else if (bonusNum == 3){
                    words3.appendChild(wordDiv);
                    document.getElementById("words-bonus3").style.display = "flex";
                }
                else if (bonusNum == 4){
                    words4.appendChild(wordDiv);
                    document.getElementById("words-bonus4").style.display = "flex";
                }
                else if (bonusNum == 5){
                    words5.appendChild(wordDiv);
                    document.getElementById("words-bonus5").style.display = "flex";
                }
            }
            this.wordsDisplay(word);
        }

        let lettersList = [...player.unlockedLetters];
        lettersList.push(letters.next(lettersList.at(-1)));
        for (let word of words.getUnlocked(lettersList)){
            if (!document.getElementById("word" + word)){
                let wordDiv = document.createElement("div");
                wordDiv.classList.add("word");
                wordDiv.id = "word" + word;
                wordDiv.style.background = "linear-gradient(145deg, #777777, #3b3b3b)";

                let bonusNum = words.getBonusNum(word);
                if (bonusNum == 1){
                    words1.appendChild(wordDiv);
                    document.getElementById("words-bonus1").style.display = "flex";
                }
                else if (bonusNum == 2){
                    words2.appendChild(wordDiv);
                    document.getElementById("words-bonus2").style.display = "flex";
                }
                else if (bonusNum == 3){
                    words3.appendChild(wordDiv);
                    document.getElementById("words-bonus3").style.display = "flex";
                }
                else if (bonusNum == 4){
                    words4.appendChild(wordDiv);
                    document.getElementById("words-bonus4").style.display = "flex";
                }
                else if (bonusNum == 5){
                    words5.appendChild(wordDiv);
                    document.getElementById("words-bonus5").style.display = "flex";
                }
            }
            this.wordsDisplay(word);
        }
    },


    lettersCheck(){
        let unlocked = player.unlockedLetters;
        for (let i = 0; i < unlocked.length; i++) {
            let letterDiv = document.getElementById("Letter_" + unlocked[i]);
            if (player.points >= lettersCost[unlocked[i]]*player.lettersPriceMult) {
                if (player.letterQueue.length >= player.queueLimit){
                    letterDiv.style.boxShadow = "0 0 3px #a09343";
                    letterDiv.style.background = "linear-gradient(145deg, #afa54c, #7d792e)";
                    letterDiv.style.cursor = "not-allowed";
                    letterDiv.classList.remove("Hover");
                }
                else{
                    letterDiv.style.boxShadow = "0 0 3px #43a047";
                    letterDiv.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
                    letterDiv.style.cursor = "pointer";
                }
            } else {
                letterDiv.style.background = "linear-gradient(145deg, #777777ff, #3b3b3bff)";
                letterDiv.style.boxShadow = "0 4px 10px #00000066";
                letterDiv.style.cursor = "default";
                letterDiv.classList.remove("Hover");
            }
        }
    },
    productionUpgradeCheck(){
        if (player.points >= upgrades.productionSpeedCost()) {
            upgrade.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
            upgrade.style.cursor = "pointer";
            upgrade.style.boxShadow = "0 0 3px #43a047";
        } else {
            upgrade.style.background = "linear-gradient(145deg, #af914c, #7d6d2e)";
            upgrade.style.boxShadow = "0 0 3px #a07c43";
            upgrade.style.cursor = "default";
            upgrade.classList.remove("Hover");
        }
    },
    queueBuyCheck(){
        for (let i = 5; i >= player.queueLimit; i--) {
            const queueSlot = document.getElementById("queue" + i);
            if (player.points >= queueUnlockCost[i-1]){
                if (queueSlot.style.cursor != "pointer"){
                    queueSlot.innerHTML = "";
                    const lockCanvas = utils.createLockCanvas("#4caf50");
                    queueSlot.appendChild(lockCanvas);

                    const costText = document.createElement("span");
                    costText.textContent = "Cost: " + utils.formatNumber(queueUnlockCost[i - 1]);
                    costText.style.fontSize = "12px";
                    costText.style.color = "#dbdbdb";
                    costText.style.marginTop = "-20px";
                    queueSlot.appendChild(costText);
                    
                    queueSlot.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
                    queueSlot.style.cursor = "pointer";
                    queueSlot.style.boxShadow = "0 0 3px #43a047";
                }
            }
            else {
                if (queueSlot.style.cursor == "pointer"){
                    queueSlot.innerHTML = "";
                    const lockCanvas = utils.createLockCanvas();
                    queueSlot.appendChild(lockCanvas);

                    const costText = document.createElement("span");
                    costText.textContent = "Cost: " + utils.formatNumber(queueUnlockCost[i - 1]);
                    costText.style.fontSize = "12px";
                    costText.style.color = "#dbdbdb";
                    costText.style.marginTop = "-20px";
                    queueSlot.appendChild(costText);

                    queueSlot.style.background = "radial-gradient(circle, #333333, #262626)";
                    queueSlot.style.boxShadow = "0 4px 10px #0a0a0a";
                    queueSlot.style.cursor = "default";
                    queueSlot.classList.remove("Hover");
                }
            }
        }
    },
    wordsCheck(){
        let wordsList = document.querySelectorAll('div.word');
        let unlocked = words.getUnlocked();

        wordsList.forEach(el => {
            let word = el.id.slice(4);
            
            if (el.style.background == "linear-gradient(145deg, rgb(119, 119, 119), rgb(59, 59, 59))" || el.style.background == "linear-gradient(145deg, #777777, #3b3b3b)") {
                if (unlocked.includes(word)){
                    el.style.background = "linear-gradient(145deg, #af914c, #7d6d2e)";
                }
            }
            if (el.style.background == "linear-gradient(145deg, rgb(175, 145, 76), rgb(125, 109, 46))" || el.style.background == "linear-gradient(145deg, #af914c, #7d6d2e)"){
                if (player.wordsCrafted[word]){
                    el.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
                }
            }
        });
    },
    wordsHintCheck(){
        let candidates = Object.keys(player.wordsReveal).filter(word => 
            words.getUnlocked().includes(word) && player.wordsReveal[word] !== word);
        if (candidates.length === 0){
            wordsHint.style.background = "linear-gradient(145deg, #af914c, #7d6d2e)";
            wordsHint.style.boxShadow = "0 0 3px #a07c43";
            wordsHint.style.cursor = "default";
            wordsHint.classList.remove("Hover");
        }
        else if (player.points >= words.hintCost()) {
            wordsHint.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
            wordsHint.style.cursor = "pointer";
            wordsHint.style.boxShadow = "0 0 3px #43a047";
        } else {
            wordsHint.style.background = "linear-gradient(145deg, #af914c, #7d6d2e)";
            wordsHint.style.boxShadow = "0 0 3px #a07c43";
            wordsHint.style.cursor = "default";
            wordsHint.classList.remove("Hover");
        }
    },


    productionReset(){
        produce.innerHTML = "Buy more<br>letters";
        produce.style.background = "linear-gradient(to top, #585858 0%, #585858 100%)";
        produce.style.backgroundClip = 'text';
    },
    queueReset(num){
        const queue = document.getElementById("queue" + num);
        queue.innerHTML = "";
        queue.classList.remove("Hover");
        queue.style.background = "radial-gradient(circle, #333333, #262626)";
        queue.style.boxShadow = "0 0 10px #0a0a0a";
        queue.style.cursor = "default";
    }
}