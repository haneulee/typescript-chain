import * as CryptoJS from "crypto-js"

// class Human {
//   public name: string;
//   public age: number; //private
//   public gender: string;
//   constructor(name: string, age: number, gender: string) {
//     this.name = name;
//     this.age = age;
//     this.gender = gender;
//   }
// }

// const haneul = new Human("Haneul", 30, "female");

// // const sayHi = (name: string, age: number, gender: string): string => {
// const sayHi = (person: Human): string => {
//     return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
//   };

//   console.log(sayHi(haneul));

//   export {};

class Block {
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string => CryptoJS.SHA256(index + previousHash + data + timestamp).toString();


  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number"


  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

}


const genesisBlock: Block = new Block(0, "2020202020202", "", "hello", 12345);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data: string): Block => {

  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    newTimestamp
  )
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  )

  addBlock(newBlock);
  return newBlock
}


// console.log(createNewBlock("hello"));
// console.log(createNewBlock("bye bye"));

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.data,
    aBlock.timestamp
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock) ||
    previousBlock.index + 1 !== candidateBlock.index ||
    previousBlock.hash !== candidateBlock.previousHash || 
    getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  }

  return true;
}

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock)
  }
}

createNewBlock("second block")
createNewBlock("third block")
createNewBlock("fourth block")

console.log(blockChain)

export {}