const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;


    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();

        originalChain = blockchain.chain;
    });

    it('contains a chain Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());


    });

    it('adds a new block to the chain', () => {
        const newData = 'foo-bar';
        blockchain.addBlock({ data: newData });
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe('isValidChain()', () => {
        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis' };

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain, addBlock({ data: 'Bears' });
                blockchain, addBlock({ data: 'Beets' });
                blockchain, addBlock({ data: 'Battlestar Galactica' });

                // });
                describe('and a lastHash reference has changed', () => {
                    it('returns false', () => {


                        blockchain.chain[2].lastHash = 'broken-lastHash';

                        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                    });
                });
                describe('and the chain copntains a block with an invalid field', () => {
                    it('returns false', () => {


                        blockchain.chain[2].data = 'some-bad-and-evil-data';

                        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                    });
                });
                describe('and the chain dos not contain any invalid blocks', () => {
                    it('returns true', () => {




                        expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);


                    });
                });
            });
        });
    });

    describe('replaceChain()', () => {
        let error, log;

        beforeEach(() => {
            error = jest.fn();
            log = jest.fn();

            global.console.error = error;
            global.console.error = log;
        });




        describe('when the new chain is not longer', () => {

            beforeEach(() => {
                newChain.chain[0] = { new: 'chain' };
                blockchain.replaceChain(newChain.chain);
            })

            it('does not replace the chain', () => {

                newChain.chain[0] = { new: 'chain' };

                blockchain.replaceChain(newChain.chain);

                expect(blockchain.chain).toEqual(originalChain);

            });

            it('logs an error', () => {
                console.log(error);
                expect(error).toHaveBeenCalled();
            });

        });
        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'Bears' });
                newChain.addBlock({ data: 'Beets' });
                newChain.addBlock({ data: 'Battlestar Galactica' });


            });
            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'some-fake-hash';
                    blockchain.replaceChain(newChain.chain);

                });
            });
            it('does not replace the chain', () => {

                expect(blockchain.chain).toEqual(originalChain);
            });

        });
        describe('and the chain is valid', () => {
            beforeEach(() => {
                blockchain.replaceChain(newChain.chain);
            });
        });
        it('replaces the chain', () => {
            blockchain.replaceChain(newChain.chain);

            expect(blockchain.chain).toEqual(newChain.chain);
        });


    });


});