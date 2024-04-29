import * as POKIE from 'pokie';
import {ZOMBIE_LAND_SLOTS} from "../consts.js";
export class ZombielandConfigConstructor {

    constructor() {
        this._config = new POKIE.VideoSlotConfig();
    }

    get config(){
        this.setReelAndRows(this._config)
        this.set5x5Paylines(this._config);
        this.setSlotSymbols(this._config);
        this.setWildSymbol(this._config);
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

    setWildSymbol = (config) => {
        config.setWildSymbols([ZOMBIE_LAND_SLOTS.WILD])
    }

    setScatterSymbol  = (config) => {
        config.setScatterSymbols([ZOMBIE_LAND_SLOTS.SCATTER])
    }

    setPaytable = (config)=> {
        const pt = new POKIE.Paytable( config.getAvailableBets(), config.getAvailableSymbols() );

        const { BRAIN, SKELETON, ZOMBIE, QUEEN, KING, ACE, JACK, EYE, LADY_ZOMBIE, UNDEAD, SCATTER } = ZOMBIE_LAND_SLOTS;

        //LOW TIER
        pt.setPayoutForSymbol(BRAIN, 3, 0.4);
        pt.setPayoutForSymbol(BRAIN, 4, 1);
        pt.setPayoutForSymbol(BRAIN, 5, 1.5);

        pt.setPayoutForSymbol(SKELETON, 3, 0.4);
        pt.setPayoutForSymbol(SKELETON, 4, 1);
        pt.setPayoutForSymbol(SKELETON, 5, 1.5);

        pt.setPayoutForSymbol(ZOMBIE, 3, 0.4);
        pt.setPayoutForSymbol(ZOMBIE, 4, 1);
        pt.setPayoutForSymbol(ZOMBIE, 5, 1.5);

        pt.setPayoutForSymbol(EYE, 3, 0.4);
        pt.setPayoutForSymbol(EYE, 4, 1);
        pt.setPayoutForSymbol(EYE, 5, 1.5);

        pt.setPayoutForSymbol(UNDEAD, 3, 0.4);
        pt.setPayoutForSymbol(UNDEAD, 4, 1);
        pt.setPayoutForSymbol(UNDEAD, 5, 1.5);

        pt.setPayoutForSymbol(LADY_ZOMBIE, 3, 0.4);
        pt.setPayoutForSymbol(LADY_ZOMBIE, 4, 1);
        pt.setPayoutForSymbol(LADY_ZOMBIE, 5, 1.5);


        //MIDDLE TIER
        pt.setPayoutForSymbol(JACK, 3, 1);
        pt.setPayoutForSymbol(JACK, 4, 2);
        pt.setPayoutForSymbol(JACK, 5, 3);

        pt.setPayoutForSymbol(QUEEN, 3, 2);
        pt.setPayoutForSymbol(QUEEN, 4, 3);
        pt.setPayoutForSymbol(QUEEN, 5, 4);

        pt.setPayoutForSymbol(KING, 3, 3);
        pt.setPayoutForSymbol(KING, 4, 4);
        pt.setPayoutForSymbol(KING, 5, 5);

        //TOP TIER
        pt.setPayoutForSymbol(ACE, 3, 5);
        pt.setPayoutForSymbol(ACE, 4, 7);
        pt.setPayoutForSymbol(ACE, 5, 10);

        pt.setPayoutForSymbol(SCATTER, 15, 100);

        config.setPaytable(pt);
    }

    setSymbolSequence = (config)=> {
        const symbolsNumbers = this.getNumberOfSymbols();
        const sequence = new POKIE.SymbolsSequence().fromNumbersOfSymbols(symbolsNumbers);
        const sequences = [
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
            new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
        ]

        sequences[1].addSymbol("SCATTER", config.getReelsSymbolsNumber(), Math.floor(sequences[1].getSize() / 2));
        sequences[2].addSymbol("SCATTER", config.getReelsSymbolsNumber(), Math.floor(sequences[2].getSize() / 2));
        sequences[3].addSymbol("SCATTER", config.getReelsSymbolsNumber(), Math.floor(sequences[3].getSize() / 2));

        sequences[1].addSymbol("SCATTER", config.getReelsSymbolsNumber());
        sequences[2].addSymbol("SCATTER", config.getReelsSymbolsNumber());
        sequences[3].addSymbol("SCATTER", config.getReelsSymbolsNumber());

        this.shuffleUntilNoAdjacentScatter(sequence);

        config.setSymbolsSequences(sequences);
    }

    getNumberOfSymbols = ()=> {
        const { BRAIN, SKELETON,  ZOMBIE,  QUEEN, KING, ACE, JOKER, WILD, EYE, LADY_ZOMBIE, UNDEAD } = ZOMBIE_LAND_SLOTS;
        return {
            [EYE]: 3,
            [LADY_ZOMBIE]: 3,
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