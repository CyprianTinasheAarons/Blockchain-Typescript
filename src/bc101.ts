import * as crpypto from 'crypto'

class Block {
    readonly hash: string

    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: string,
    ) {
        this.hash = this.calculateHash()
    }
    
    private calculateHash(): string {
        const data = this.index + this.previousHash + this.timestamp + this.data
        return crpypto.createHash('sha256').update(data).digest('hex')
    }
}

class Blockchain {
    private readonly chain: Block[] = []

    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1]
    }

    constructor() {
        this.chain.push( new Block(0, '0', Date.now(), 'Genesis Block') )
    }

    addBlock(data: string): void {
        const block = new Block(
            this.latestBlock.index + 1,
            this.latestBlock.hash,
            Date.now(),
            data,
        )
        this.chain.push(block)
    }
}

console.log('Creating the blockchain with the genesis block...')
const blockchain = new Blockchain()

console.log('Adding blocks to the blockchain...')
blockchain.addBlock('First Block')

console.log('Adding second block...')
blockchain.addBlock('Second Block')

console.log(JSON.stringify(blockchain, null, 2))