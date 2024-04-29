// @ts-ignore
import * as POKIE from 'pokie';
import { ZombielandConfigConstructor } from "./cfg/zombielandConfigConstructor.js";


const config = new ZombielandConfigConstructor().config;

const allReelsCombinations =
  POKIE.SymbolsCombinationsAnalyzer.getAllPossibleSymbolsCombinations(
    config.getSymbolsSequences(), config.getReelsSymbolsNumber()
    );

    const allWinsData = [];
let totalPayout = 0;
allReelsCombinations.forEach(combination => {
    const wc = new POKIE.VideoSlotWinCalculator(config);
    wc.calculateWin(config.getBet(), new POKIE.SymbolsCombination().fromMatrix(combination));
    if (wc.getWinAmount() > 0) {
        allWinsData.push(wc);
        totalPayout += wc.getWinAmount();
    }
});


console.log("Total winning combinations number: " + allWinsData.length);
console.log("Total payout: " + totalPayout);
console.log("Hit frequency: " + allWinsData.length / allReelsCombinations.length);
console.log("RTP: " + totalPayout / allReelsCombinations.length);