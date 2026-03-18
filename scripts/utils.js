const utils = {
    createLetterCanvas(letter, progress) {
        const WIDTH = 190;
        const HEIGHT = 250;
        const dpr = window.devicePixelRatio || 1;
        const canvas = document.createElement('canvas');
        canvas.width = WIDTH * dpr;
        canvas.height = HEIGHT * dpr;
        canvas.style.width = WIDTH + 'px';
        canvas.style.height = HEIGHT + 'px';
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        if (letter == "j"){
            ctx.font = '190px Copperplate';
        }
        else{
            ctx.font = '240px Copperplate';
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const metrics = ctx.measureText(letter);
        const ascent = metrics.actualBoundingBoxAscent;
        const descent = metrics.actualBoundingBoxDescent;
        const letterHeight = ascent + descent;

        ctx.beginPath();
        const clipY = HEIGHT / 2 + 0.5 * letterHeight - progress * letterHeight;
        const clipHeight = progress * letterHeight;
        ctx.rect(0, clipY, WIDTH, clipHeight);
        ctx.clip();
        ctx.fillStyle = '#dbdbdb';
        ctx.fillText(letter, WIDTH / 2, (HEIGHT + ascent - descent) / 2);
        return canvas;   
    },

    displayLetterQueue(letter){
        const WIDTH = 70;
        const HEIGHT = 70;
        const dpr = window.devicePixelRatio || 1;

        const canvas = document.createElement('canvas');
        canvas.width = WIDTH * dpr;
        canvas.height = HEIGHT * dpr;
        canvas.style.width = WIDTH + 'px';
        canvas.style.height = HEIGHT + 'px';

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.font = '60px Copperplate';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const metrics = ctx.measureText(letter);
        const ascent = metrics.actualBoundingBoxAscent;
        const descent = metrics.actualBoundingBoxDescent;
        ctx.fillStyle = '#7c7c7c';
        ctx.fillText(letter, WIDTH / 2, (HEIGHT + ascent - descent) / 2);
        return canvas; 
    },

    formatNumber(num, type) {
        if (type == "points"){
            if (num < 100) {
                return num.toFixed(1).toString();
            }
            else if (num >= 100 && num < 10000) {
                return num.toFixed(0).toString();
            }
            else{
                return num.toExponential(2).replace('e+', 'e');
            }
        }
        else if (type == "letterCost"){
            if (num < 10) {
                return num.toFixed(1).toString();
            }
            else if (num >= 10 && num < 10000) {
                return num.toFixed(0).toString();
            }
            else{
                return num.toExponential(2).replace('e+', 'e');
            }
        }
        else if (type == "wordBonus"){
            if (num < 10) {
                return num.toFixed(2).toString();
            }
            else if (num >= 10 && num < 100) {
                return num.toFixed(1).toString();
            }
            else if (num >= 100 && num < 10000) {
                return num.toFixed(0).toString();
            }
            else{
                return num.toExponential(2).replace('e+', 'e');
            }
        }
        else if (type == "count"){
            if (num < 10000) {
                return Math.round(num);
            }
            else{
                return num.toExponential(2).replace('e+', 'e');
            }
        }
        else if (type == "time"){
            if (num <= 0.01) {
                return "instant";
            }
            else if (num < 1) {
                return num.toFixed(2).toString() + "s";
            }
            else if (num < 15) {
                return num.toFixed(1).toString() + "s";
            }
            else if (num < 10000) {
                return num.toFixed(0).toString() + "s";
            }
            else{
                return num.toExponential(2).replace('e+', 'e') + " s";
            }
        }
        else if (type == "timeProd"){
            if (num < 10) {
                return num.toFixed(1).toString() + "s";
            }
            else if (num < 10000) {
                return num.toFixed(0).toString() + "s";
            }
            else{
                return num.toExponential(2).replace('e+', 'e') + " s";
            }
        }
        else{
            if (num === 1){
                return num.toFixed(1);
            }
            if (num < 0.01) {
                return num.toExponential(2).replace('e+', 'e');
            }
            if (num < 0.1) {
                return num.toFixed(2).toString();
            }
            if (num < 1.5) {
                const PREC = 12;
                let str = num.toFixed(PREC);
                let [intPart, frac = ''] = str.split('.');
                if (!frac) return intPart;

                let zeroCount = 0;
                while (zeroCount < frac.length && frac[zeroCount] === '0') {
                    zeroCount++;
                }

                let keep;
                if (intPart === '1') {
                    keep = zeroCount + 2;
                } else {
                    keep = 2;
                }
                keep = Math.min(keep, frac.length);

                const factor = Math.pow(10, keep);
                let rounded = Math.round(num * factor) / factor;
                let out = rounded.toFixed(keep);
                return out.replace(/\.?0+$/, '');
            }
            if (num < 100) {
                return num.toFixed(1).toString();
            } else if (num >= 100 && num < 10000) {
                return num.toFixed(0).toString();
            }

            return num.toExponential(2).replace('e+', 'e');
        }
    },

    createLockCanvas(color="#2e2e2e") {
        const WIDTH = 70;
        const HEIGHT = 70;
        const dpr = window.devicePixelRatio || 1;

        const canvas = document.createElement('canvas');
        canvas.width = WIDTH * dpr;
        canvas.height = HEIGHT * dpr;
        canvas.style.width = WIDTH + 'px';
        canvas.style.height = HEIGHT + 'px';

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        
        ctx.fillStyle = '#535353';
        ctx.beginPath();
        ctx.roundRect(21.5, 20, 27, 28, 3);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(35, 16, 10, 0, Math.PI, true);
        ctx.arc(35, 16, 7, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(25, 15, 3, 7, 1);
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(42, 15, 3, 7, 1);
        ctx.fill();
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(35, 32, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(33.5, 35, 3, 5);
        ctx.fill();
        
        return canvas;
    }
}