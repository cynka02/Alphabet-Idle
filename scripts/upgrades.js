const upgrades = {
    productionSpeedBuy() {
        if (player.points >= this.productionSpeedCost()) {
            player.points -= this.productionSpeedCost();
            player.productionSpeed *= 2;
            player.productionSpeedLevel++;
            updates.productionUpgradeDisplay();
        }
    },

    productionSpeedCost(){
        return upgradeProductionSpeedCost*Math.pow(upgradeProductionSpeedCostScaling, player.productionSpeedLevel);
    },

    unlockQueue(num){
        if (player.points >= queueUnlockCost[num-1] && player.queueLimit == num){
            player.points -= queueUnlockCost[num-1];
            player.queueLimit += 1;
            updates.queueReset(num);
            updates.queueTextDisplay();
        }
    }
}