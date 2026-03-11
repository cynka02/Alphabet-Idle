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

upgrade.addEventListener("mouseenter", () => {
    if (player.points >= upgrades.fasterProductionCost()) {
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



const updates = {
    points() {
        pointsText.textContent = "Points: " + utils.formatNumber(player.points, "points");
    },

    pps(){
        ppsInfo.innerHTML = "";
        if (player.pps === basePPS) {
            let item = document.createElement("div");
            item.className = "pps-item";

            item.innerHTML = `
                <div class="pps-letter"></div>
                <div class="pps-value">+${utils.formatNumber(player.pps)}/s</div>
            `;
            ppsInfo.appendChild(item);
        }
        else {
            let item = document.createElement("div");
            item.className = "pps-item";

            item.innerHTML = `
                <div class="pps-letter"></div>
                <div class="pps-value" style="font-size: 20px;">+${utils.formatNumber(player.pps)}/s</div>
            `;
            ppsInfo.appendChild(item);
            item = document.createElement("div");
            item.className = "pps-x";
            item.innerHTML = "=";
            ppsInfo.appendChild(item);

            item = document.createElement("div");
            item.className = "pps-item";

            item.innerHTML = `
                <div class="pps-letter">base</div>
                <div class="pps-value">${basePPS}</div>
            `;
            ppsInfo.appendChild(item);

            for (let letter in player.letters) {
                if (player.letters[letter] > 0) {
                    item = document.createElement("div");
                    item.className = "pps-x";
                    item.innerHTML = "×";
                    ppsInfo.appendChild(item);

                    item = document.createElement("div");
                    item.className = "pps-item";
                    item.innerHTML = `
                        <div class="pps-letter">${letter}</div>
                        <div class="pps-value">${utils.formatNumber(1 + player.letters[letter] * letterMult[letter])}</div>
                    `;
                    ppsInfo.appendChild(item);
                }
            }
        }
    },

    showProduce(){
        produceInfo.style.visibility = "visible";
        productionContainer.style.visibility = "visible";
    },

    showOutput(){
        outputContainer.style.visibility = "visible";
    },

    showProductionUpgrade(){
        upgrade.style.visibility = "visible";
    },

    showQueue(){
        queueContainer.style.visibility = "visible";
    },

    lettersCreateDivs(){
        let unlocked = player.unlockedLetters;
        for (let i = 0; i < unlocked.length; i++) {
            if (!document.getElementById("Letter_" + unlocked[i])){
                let nextLetter = document.createElement("div");
                nextLetter.id = "Letter_" + unlocked[i];
                nextLetter.classList.add("letters");
                nextLetter.onclick = () => letters.buy(unlocked[i]);
                nextLetter.innerHTML = "<b style='font-size: 30px'>" + unlocked[i] + "</b><br>Cost: " + utils.formatNumber(letterCosts[unlocked[i]]);
                nextLetter.addEventListener("mouseenter", () => {
                    if (player.points >= letterCosts[unlocked[i]]) {
                        nextLetter.classList.add("Hover");
                    }
                });
                nextLetter.addEventListener("mouseleave", () => {
                    nextLetter.classList.remove("Hover");
                });
                
                buyBox.appendChild(nextLetter);
                
            }
        }
    },

    lettersBuyCheck(){
        let unlocked = player.unlockedLetters;
        for (let i = 0; i < unlocked.length; i++) {
            let letterDiv = document.getElementById("Letter_" + unlocked[i]);
            if (player.points >= letterCosts[unlocked[i]]) {
                letterDiv.style.boxShadow = "0 0 3px #43a047";
                letterDiv.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
                letterDiv.style.cursor = "pointer";
                
            } else {
                letterDiv.style.background = "linear-gradient(145deg, #777777ff, #3b3b3bff)";
                letterDiv.style.boxShadow = "0 4px 10px #00000066";
                letterDiv.style.cursor = "default";
                letterDiv.classList.remove("Hover");
            }
        }
    },

    upgradeProductionCheck(){
        if (player.points >= upgrades.fasterProductionCost()) {
            upgrade.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
            upgrade.style.cursor = "pointer";
            upgrade.style.boxShadow = "0 0 3px #43a047";
        } else {
            upgrade.style.background = "linear-gradient(145deg, #af934c, #7d5c2e)";
            upgrade.style.boxShadow = "0 0 3px #a07c43";
            upgrade.style.cursor = "default";
            upgrade.classList.remove("Hover");
        }
    },

    upgradeProduction(){
        upgrade.innerHTML = `2x faster production<br>Cost: ${utils.formatNumber(upgrades.fasterProductionCost())}`;
    },

    produce(letter, progress){
        if (letter !== "") {
            produce.innerHTML = "";
            const canvas = utils.createLetterCanvas(letter, progress);
            produce.appendChild(canvas);
        }
    },

    produceReset(){
        produce.innerHTML = "Buy more<br>letters";
        produce.style.background = "linear-gradient(to top, #585858 0%, #585858 100%)";
        produce.style.backgroundClip = 'text';
    },

    queueDisplay(current, max){
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

    queueResetStyle(num){
        const queue = document.getElementById("queue" + num);
        queue.innerHTML = "";
        queue.classList.remove("Hover");
        queue.style.background = "radial-gradient(circle, #333333, #262626)";
        queue.style.boxShadow = "0 0 10px #0a0a0a";
        queue.style.cursor = "default";
    },

    queueLetters(letterQueue){
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

    queueLocked(){
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
                    
                    queueSlot.style.background = "radial-gradient(circle, #4caf50, #2e7d32)";
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

    output(text){
        if (text.length <= 30){
            output.textContent = "> " + text;
        }
        else{
            output.textContent = "> " + text.slice(0, 30) + "...";
        }
    },

    updateAll() {
        this.points();
        this.lettersBuyCheck();
        this.upgradeProductionCheck();
        this.queueBuyCheck();
        this.produce(player.letterQueue.length > 0 ? player.letterQueue[0].name : "", player.letterQueue.length > 0 ? 1 - player.letterQueue[0].productionTime / letterProductionTime[player.letterQueue[0].name] : 0);
    }
}