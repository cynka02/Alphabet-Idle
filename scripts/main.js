document.addEventListener("DOMContentLoaded", function() {
    let last = performance.now()

    updates.ppsDisplay();
    updates.lettersCreate();
    updates.productionUpgradeDisplay();
    updates.queueLockedCreate();
    updates.queueTextDisplay();
    updates.queueLettersDisplay();
    updates.wordsHintDisplay();

    function main(){
        const now = performance.now()
        let delta = now - last // in milliseconds
        last = now
        
        // Loop
        loop.generatePoints(delta)
        loop.produceLetters(delta)

        // Check for unlocks
        if (player.unlockedLetters.includes("c") && window.getComputedStyle(document.getElementById("produce-upgrade")).visibility == "hidden"){
            updates.productionUpgradeShow();
        }
        if (player.output.length >= 3 && window.getComputedStyle(document.getElementById("output-container")).visibility == "hidden"){
            updates.outputShow();
        }
        if (player.productionSpeedLevel == 1 && window.getComputedStyle(document.getElementById("queue-container")).visibility == "hidden"){
            updates.queueShow();
        }
        if (player.unlockedLetters.includes("d") && window.getComputedStyle(document.getElementById("sections")).display == "none"){
            updates.sectionsShow(1);
            updates.wordsCreate();
        }

        // All updates that have to be done every tick
        updates.pointsDisplay();
        updates.lettersCheck();
        updates.productionUpgradeCheck();
        updates.queueBuyCheck();
        updates.wordsHintCheck();


        requestAnimationFrame(main)
    }

    main()
});