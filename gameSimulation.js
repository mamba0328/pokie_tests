// @ts-ignore
import * as POKIE from 'pokie';
import { ZombielandConfigConstructor } from "./cfg/zombielandConfigConstructor.js";

const config = new ZombielandConfigConstructor().config;

config.setCreditsAmount(Infinity)

const session = new POKIE.VideoSlotSession(config);
const serialized = new POKIE.VideoSlotSessionSerializer();

session.play();

const simulationConfig = new POKIE.SimulationConfig();
simulationConfig.setNumberOfRounds(Infinity);
const playStrategy = new POKIE.PlayUntilSymbolWinStrategy('SCATTER');
playStrategy.setExactNumberOfWinningSymbols(15);
simulationConfig.setPlayStrategy(playStrategy);

const simulation = new POKIE.Simulation(session, simulationConfig);
session.play();
simulation.run();

console.log(serialized.getRoundData(session))
// console.log("Number of wining rounds: " + simulation.getLastRtp())