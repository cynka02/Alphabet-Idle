const upgrades = {
    fasterProduction() {
        if (player.points >= this.fasterProductionCost()) {
            player.points -= this.fasterProductionCost();
            player.productionSpeed *= 2;
            if (player.fasterProductionLevel == 0) {
                updates.showQueue();
            }
            player.fasterProductionLevel++;
            updates.points();
            updates.upgradeProductionCheck();
            updates.upgradeProduction();
        }
    },

    fasterProductionCost(){
        return upgradeProductionCost*Math.pow(upgradeProductionCostScaling, player.fasterProductionLevel);
    },

    unlockQueue(num){
        if (player.points >= queueUnlockCost[num-1] && player.queueLimit == num){
            player.points -= queueUnlockCost[num-1];
            player.queueLimit += 1;
            updates.queueDisplay(player.letterQueue.length, player.queueLimit);
            updates.queueResetStyle(num);
            updates.updateAll();
        }
    }
}