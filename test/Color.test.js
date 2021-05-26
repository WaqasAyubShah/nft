const Color = artifacts.require('./Color.sol')             //// we are calling the smart contract over here

require('chai')
  .use(require('chai-as-promised'))
  .should()                     ///we wil use chai library to deploy our contract

contract('Color', (accounts) => {
  let contract

    before(async () => {
    contract = await Color.deployed()   /// wait for contract to deploy
  })

  describe('deployment', async () => {
        it('deploys successfully', async () => {       //if deploy successfully
          const address = contract.address             ///assign  contract address to address variable.
          //console.log(address)
          assert.notEqual(address, 0x0)                //is not 0
          assert.notEqual(address, '')                  ////to make sure that it is not empty
          assert.notEqual(address, null)               /// is not null
          assert.notEqual(address, undefined)         // is not undefined
        })
        it('has a name', async () => {                ///to check for the name of contract
            const name = await contract.name()
            assert.equal(name, 'Color')
        })
        it('has a symbol', async () => {                 //to check for symbol
            const symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
        })
      })


  describe('minting', async () => {

      it('creates a new token', async () => {
        const result = await contract.mint('#EC058E')
        const totalSupply = await contract.totalSupply()
        // SUCCESS test
        assert.equal(totalSupply, 1)
        // console.log(result)
        const event = result.logs[0].args
        assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
        assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
        assert.equal(event.to, accounts[0], 'to is correct')

        // FAILURE: cannot mint same color twice
        await contract.mint('#EC058E').should.be.rejected;
        //const reject = await contract.mint('#EC058E').should.be.rejected;
        //console.log(reject)

      })
    })

    describe('indexing', async () => {
        it('lists colors', async () => {
            // Mint 3 more tokens
            await contract.mint('#5386E4')
            await contract.mint('#FFFFFF')
            await contract.mint('#000000')
            const totalSupply = await contract.totalSupply()

            let color
            let result = []

            for (var i = 1; i <= totalSupply; i++) {
                color = await contract.colors(i - 1)
                result.push(color)
              }

              let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
              assert.equal(result.join(','), expected.join(','))
            })
          })
  })
