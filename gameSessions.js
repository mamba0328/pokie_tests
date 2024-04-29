// @ts-ignore
import * as POKIE from 'pokie';
import { ZombielandConfigConstructor } from "./cfg/zombielandConfigConstructor.js";

const config = new ZombielandConfigConstructor().config;
const session = new POKIE.VideoSlotSession(config);
const customGameSessionSerializer = new POKIE.VideoSlotSessionSerializer();
session.getCreditsAmount(); // initial player's balance
session.setBet(10); // set player's bet amount

session.play()


const symbolComb = session.getSymbolsCombination(); // symbols combination
const linesWinning = session.getLinesWinning();
const winingLines = session.getWinningLines(); // winning lines data

const winAmount = session.getWinAmount(); // total round win amount
const creditsAmount = session.getCreditsAmount(); // players balance after the game round

console.log(symbolComb);
console.log(linesWinning)
console.log(winingLines)

console.table({
    winAmount,
    creditsAmount,
})