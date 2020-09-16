const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {

     constructor({ timestamp, lastHash, hash, data}){
         this.timestamp = timestamp;
         this.lastHash = lastHash;
         this.hash = hash;
         this.data = data;
     }

     /**
      * @author Neto Marques  <netoguitars@gmail.com>
      */

     static genesis() {
         return new this(GENESIS_DATA);
     }

     
     /**
      * @author Neto Marques  <netoguitars@gmail.com>
      */

     static minedBlock({lastBlock, data}){
         const timestamp = Date.now();
         const lastHash = lastBlock.hash;
         return new this({
             timestamp: Date.now(),
             lastHash: lastBlock.hash,
             data,
             hash: cryptoHash(timestamp, lastHash, data)
         })
     };
}
module.exports = Block;



