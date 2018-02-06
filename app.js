class Blockchain {
  constructor() {
    super();
    this.chain = [];
    this.current_transactions = [];
  }
  
  new_block() {
    
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
  
  static hash() {
    
  }
  
  get last_block() {
    
  }
}