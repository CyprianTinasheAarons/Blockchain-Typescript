import * as crpypto from 'crypto'

class Block {
    readonly hash: string
    readonly nounce: number

    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: string,
    ) {
        const { nounce, hash } = this.mine()
        this.nounce = nounce
        this.hash = hash
    }
    
    private calculateHash(nounce: number): string {
        const data = this.index + this.previousHash + this.timestamp + this.data + nounce
        return crpypto.createHash('sha256').update(data).digest('hex')
    }

    private mine(): { nounce: number, hash: string } {
        let hash: string
        let nounce = 0

        do {
            hash = this.calculateHash(++nounce)
            
        } while (hash.startsWith('00000') === false)
        
        return { nounce, hash }
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

console.log('Adding first block...')
blockchain.addBlock('First Block')

console.log('Adding second block...')
blockchain.addBlock('Second Block')

console.log(JSON.stringify(blockchain, null, 2))