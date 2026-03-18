const basePPS = 1,
    lettersCost = {
        a: 10,
        b: 80,
        c: 700,
        d: 5000,
        e: 20000,
        f: 100000,
        g: 10000000,
        h: 1000000000,
        i: 100000000000,
        j: 10000000000000,
        k: 1000000000000000,
        l: 100000000000000000,
        m: 10000000000000000000,
        n: 100000000000000000000000,
        o: 100000000000000000000000,
        p: 100000000000000000000000,
        q: 100000000000000000000000,
        r: 100000000000000000000000,
        s: 100000000000000000000000,
        t: 100000000000000000000000,
        u: 100000000000000000000000,
        v: 100000000000000000000000,
        w: 1000000000000000000000000,
        x: 10000000000000000000000000,
        y: 100000000000000000000000000,
        z: 1000000000000000000000000000
    },
    lettersMultiplier = {
        a: 1,
        b: 0.5,
        c: 0.4,
        d: 0.3,
        e: 0.2,
        f: 0.15,
        g: 0.1,
        h: 0.09,
        i: 0.08,
        j: 0.06,
        k: 0.05,
        l: 0.03,
        m: 0.00002,
        n: 0.00001,
        o: 0.000005,
        p: 0.000002,
        q: 0.000001,
        r: 0.0000005,
        s: 0.0000002,
        t: 0.0000001,
        u: 0.00000005,
        v: 0.00000002,
        w: 0.00000001,
        x: 0.000000005,
        y: 0.000000002,
        z: 0.000000001
    },
    lettersProductionTime = {
        a: 2000,
        b: 5000,
        c: 8000,
        d: 15000,
        e: 40000,
        f: 110000,
        g: 200000,
        h: 400000,
        i: 1500000,
        j: 8000000,
        k: 30000000,
        l: 100000000,
        m: 1000000000,
        n: 10000000000000,
        o: 10000000000000,
        p: 10000000000000,
        q: 10000000000000,
        r: 10000000000000,
        s: 10000000000000,
        t: 10000000000000,
        u: 10000000000000,
        v: 10000000000000,
        w: 10000000000000,
        x: 10000000000000,
        y: 10000000000000,
        z: 10000000000000
    },
    upgradeProductionSpeedCost = 300,
    upgradeProductionSpeedCostScaling = 80,
    queueUnlockCost = [1000, 100000, 10000000, 1000000000, 100000000000],
    wordsDict = {
        // Żadne słowa nie mogą być częścią innych
        // max. dlugosc 10
        // bonusNum 1 -> pps mult. (>=1)
        // bonusNum 2 -> faster prod. (>=1)
        // bonusNum 3 -> cheaper letters (>=1)
        bad: {
            bonusNum: 1,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.3 + crafted * 0.3;
                }
                else{
                    return 1;
                }
                
            }
        },
        cade: {
            bonusNum: 2,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.2 + crafted * 0.15;
                }
                else{
                    return 1;
                }
            }
        },
        bedge: {
            bonusNum: 3,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.1 + crafted * 0.2;
                }
                else{
                    return 1;
                }
            }
        },
        feed: {
            bonusNum: 1,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.3 + crafted * 0.3;
                }
                else{
                    return 1;
                }
                
            }
        },
        geafed: {
            bonusNum: 2,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.2 + crafted * 0.15;
                }
                else{
                    return 1;
                }
            }
        },
        cabled: {
            bonusNum: 3,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.1 + crafted * 0.2;
                }
                else{
                    return 1;
                }
            }
        },
        heigh: {
            bonusNum: 1,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.3 + crafted * 0.3;
                }
                else{
                    return 1;
                }
                
            }
        },
        jacked: {
            bonusNum: 2,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.2 + crafted * 0.15;
                }
                else{
                    return 1;
                }
            }
        },
        maiden: {
            bonusNum: 3,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.1 + crafted * 0.2;
                }
                else{
                    return 1;
                }
            }
        },
        nicea: {
            bonusNum: 1,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.3 + crafted * 0.3;
                }
                else{
                    return 1;
                }
                
            }
        },
        poison: {
            bonusNum: 2,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.2 + crafted * 0.15;
                }
                else{
                    return 1;
                }
            }
        },
        saddest: {
            bonusNum: 3,
            bonusMult(crafted){
                if (crafted >= 1){
                    return 1.1 + crafted * 0.2;
                }
                else{
                    return 1;
                }
            }
        }
    };