document.addEventListener("DOMContentLoaded", function() {
let last = performance.now()

updates.pps();
updates.lettersCreateDivs();
updates.upgradeProduction();
updates.queueLocked();
updates.queueDisplay(player.letterQueue.length, player.queueLimit);

    function main(){
        const now = performance.now()
        let delta = now - last // in milliseconds
        last = now
        
        loop.generate(delta)
        loop.produceLetters(delta)

        updates.updateAll()

        requestAnimationFrame(main)
    }

    main()
});