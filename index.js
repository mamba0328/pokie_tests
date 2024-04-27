// @ts-ignore
import * as POKIE from 'pokie';
import { ZOMBIE_LAND_SLOTS } from "./consts.js";

export class ZombielandConfigConstructor {

    constructor() {
        this._config = new POKIE.VideoSlotConfig();
    }

    get config(){
        this.setReelAndRows(this._config)
        this.set5x5Paylines(this._config);
        this.setSlotSymbols(this._config);
        this.setScatterSymbol(this._config);
        this.setPaytable(this._config);
        this.setSymbolSequence(this._config)
        return this._config;
    }

    setReelAndRows = (config)=> {
        config.setReelsNumber(5);
        config.setReelsSymbolsNumber(5);
    }

    set5x5Paylines = (config)=> {
        const customLinesDefinitions = new POKIE.CustomLinesDefinitions();
        this.setCommonPaylinesFrom5x4(customLinesDefinitions);
        this.setMissingPaylinesFor5x5(customLinesDefinitions);
        config.setLinesDefinitions(customLinesDefinitions)
    }

    setCommonPaylinesFrom5x4 = (customLinesDefinitions)=> {
        const linesDefinitions = new POKIE.LinesDefinitionsFor5x4();
        customLinesDefinitions.setLineDefinition("0", linesDefinitions.getLineDefinition("0"));
        customLinesDefinitions.setLineDefinition("1", linesDefinitions.getLineDefinition("1"));
        customLinesDefinitions.setLineDefinition("2", linesDefinitions.getLineDefinition("2"));
        customLinesDefinitions.setLineDefinition("3", linesDefinitions.getLineDefinition("3"));
        customLinesDefinitions.setLineDefinition("4", linesDefinitions.getLineDefinition("4"));
        customLinesDefinitions.setLineDefinition("5", linesDefinitions.getLineDefinition("5"));
        customLinesDefinitions.setLineDefinition("6", linesDefinitions.getLineDefinition("6"));
        customLinesDefinitions.setLineDefinition("7", linesDefinitions.getLineDefinition("7"));
    }

    setMissingPaylinesFor5x5 = (customLinesDefinitions)=> {
        const missingPaylinesOf5x5 = [
            [4, 4, 4, 4, 4],
            [2, 3, 4, 3, 2],
            [4, 3, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [4, 3, 2, 1, 0]
        ]
        // @ts-ignore
        const lastPaylineIndex = +Object.keys(customLinesDefinitions.linesDefinitionsMap).at(-1);

        missingPaylinesOf5x5.forEach(((payline, index) => {
            customLinesDefinitions.setLineDefinition(`${lastPaylineIndex + index + 1}`, payline);
        }))
    }


    setSlotSymbols =  (config) => {
        config.setAvailableSymbols(Object.values(ZOMBIE_LAND_SLOTS));
    }

    setScatterSymbol  = (config) => {
        config.setScatterSymbols([ZOMBIE_LAND_SLOTS.WILD])
    }

    setPaytable = (config)=> {
        const pt = new POKIE.Paytable( config.getAvailableBets(), config.getAvailableSymbols() );

        const { BRAIN, SKELETON, ZOMBIE, QUEEN, KING, ACE, JOKER, WILD, EYE, LADY_ZOMBIE, UNDEAD } = ZOMBIE_LAND_SLOTS;

        //LOW TIER
        pt.setPayoutForSymbol(BRAIN, 3, 0.75);
        pt.setPayoutForSymbol(BRAIN, 4, 1);
        pt.setPayoutForSymbol(BRAIN, 5, 2);

        pt.setPayoutForSymbol(SKELETON, 3, 0.75);
        pt.setPayoutForSymbol(SKELETON, 4, 1);
        pt.setPayoutForSymbol(SKELETON, 5, 2);

        pt.setPayoutForSymbol(ZOMBIE, 3, 0.75);
        pt.setPayoutForSymbol(ZOMBIE, 4, 1);
        pt.setPayoutForSymbol(ZOMBIE, 5, 2);

        pt.setPayoutForSymbol(EYE, 3, 0.75);
        pt.setPayoutForSymbol(EYE, 4, 1);
        pt.setPayoutForSymbol(EYE, 5, 2);

        pt.setPayoutForSymbol(UNDEAD, 3, 0.75);
        pt.setPayoutForSymbol(UNDEAD, 4, 1);
        pt.setPayoutForSymbol(UNDEAD, 5, 2);

        // pt.setPayoutForSymbol(LADY_ZOMBIE, 3, 0.4);
        // pt.setPayoutForSymbol(LADY_ZOMBIE, 4, 0.8);
        // pt.setPayoutForSymbol(LADY_ZOMBIE, 5, 1.2);


        //MIDDLE TIER
        pt.setPayoutForSymbol(QUEEN, 3, 1.25);
        pt.setPayoutForSymbol(QUEEN, 4, 2.5);
        pt.setPayoutForSymbol(QUEEN, 5, 5);

        pt.setPayoutForSymbol(KING, 3, 1.5);
        pt.setPayoutForSymbol(KING, 4, 3);
        pt.setPayoutForSymbol(KING, 5, 6);

        pt.setPayoutForSymbol(ACE, 3, 2.5);
        pt.setPayoutForSymbol(ACE, 4, 5);
        pt.setPayoutForSymbol(ACE, 5, 10);

        //TOP TIER
        pt.setPayoutForSymbol(JOKER, 3, 5);
        pt.setPayoutForSymbol(JOKER, 4, 10);
        pt.setPayoutForSymbol(JOKER, 5, 15);

        pt.setPayoutForSymbol(WILD, 5, 25);

        config.setPaytable(pt);
    }

    setSymbolSequence = (config)=> {
        const symbolsNumbers = this.getNumberOfSymbols();
        const sequence = new POKIE.SymbolsSequence().fromNumbersOfSymbols(symbolsNumbers);

        this.shuffleUntilNoAdjacentScatter(sequence);

        config.setSymbolsSequences([
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
        ]);
    }

    getNumberOfSymbols = ()=> {
        const { BRAIN, SKELETON,  ZOMBIE,  QUEEN, KING, ACE, JOKER, WILD, EYE, LADY_ZOMBIE, UNDEAD } = ZOMBIE_LAND_SLOTS;
        return {
            [EYE]: 3,
            // [LADY_ZOMBIE]: 3,
            [UNDEAD]: 3,
            [BRAIN]: 3,
            [SKELETON]: 3,
            [ZOMBIE]: 3,

            [QUEEN]: 2,
            [KING]: 2,
            [ACE]: 2,

            [JOKER]:1,
            [WILD]:1,
        };
    }

    shuffleUntilNoAdjacentScatter = (sequence)=> {
        const { WILD } = ZOMBIE_LAND_SLOTS; //WILD is SCATTER symbol
        for (let i = 0; i < sequence.getSize(); i++) {
            const symbols = sequence.getSymbols(i, this._config.getReelsSymbolsNumber());
            const indexOfS = symbols.indexOf(WILD);
            const lastIndexOfS = symbols.lastIndexOf(WILD);
            if (indexOfS !== lastIndexOfS) {
                i = 0;
                sequence.shuffle();
            }
        }
    }
}

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