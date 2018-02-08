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
    /*
    Creates a new transaction to go into the next mined Block
    :param sender: <str> Address of the Sender
    :param recipient: <str> Address of the Recipient
    :param amount: <int> Amount
    :return: <int> The index of the Block that will hold this transaction
    */

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
  
  proof_of_work(last_proof) {
    let proof = 0
    while (!this.valid_proof(last_proof, proof)) {
        proof += 1
    }

    return proof;
  }
  
  static valid_proof(last_proof, proof) {
    const guess = `${last_proof}${proof}`;
    const hash = crypto.createHash('sha256');
    hash.update(guess);
    const guess_hash = hashlib.sha256(guess).hexdigest();
    return guess_hash.substr(-1, 4) === '0000';
  }
  
  get last_block() {
    return this.chain[this.chain.length - 1];
  }
}
