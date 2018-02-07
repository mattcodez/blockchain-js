// https://hackernoon.com/learn-blockchains-by-building-one-117428612f46

const crypto = require('crypto');

class Blockchain {
  constructor() {
    super();
    this.chain = [];
    this.current_transactions = [];
  }
  
  new_block(proof, previous_hash) {
    //     Create a new Block in the Blockchain
    //     :param proof: <int> The proof given by the Proof of Work algorithm
    //     :param previous_hash: (Optional) <str> Hash of previous Block
    //     :return: <dict> New Block

    const block = {
        'index': this.chain.length + 1,
        'timestamp': Date.now(),
        'transactions': this.current_transactions,
        'proof': proof,
        'previous_hash': previous_hash || this.hash(this.chain[this.chain.length - 1]),
    };

    // Reset the current list of transactions
    this.current_transactions = []

    this.chain.append(block)
    return block;
  }
  
  new_transaction(sender, recipient, amount) {
    this.current_transactions.push({
        'sender': sender,
        'recipient': recipient,
        'amount': amount,
    });

    return this.last_block.index + 1;
  }
  
  static hash(block) {
    // We must make sure that the Dictionary is Ordered, or we'll have inconsistent hashes
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(block, Object.keys(block).sort()));
    return hash.digest('hex');
  }
  
  get last_block() {
    return this.chain[this.chain.length - 1];
  }
}
