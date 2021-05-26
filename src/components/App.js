import React, { Component } from 'react';
import Web3 from 'web3'
//import logo from '../logo.png';
import './App.css';
import Color from '../abis/Color.json'



class App extends Component {

  async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
    }
  //Integrate Web3 with Metamask
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      //can use metamask
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')  //it should give us alert
      }
    }
    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
      //  console.log(accounts);
        this.setState({ account: accounts[0] })
          const networkId = await web3.eth.net.getId()
          const networkData = Color.networks[networkId]
          if(networkData) {
            const abi = Color.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            this.setState({ contract })
            const totalSupply = await contract.methods.totalSupply().call()
            this.setState({ totalSupply })
            // Load Colors
            for (var i = 1; i <= totalSupply; i++) {
              const color = await contract.methods.colors(i - 1).call()

              this.setState({
                colors: [...this.state.colors, color]                       //Assign the value to local varible
              })
            }
          } else {
            window.alert('Smart contract not deployed to detected network.')
          }

      }
      mint = (color) => {
          this.state.contract.methods.mint(color).send({ from: this.state.account })
          .once('receipt', (receipt) => {
            this.setState({
              colors: [...this.state.colors, color]
            })
          })
        }
      store = (shareV) => {
        this.state.contract.methods.store(shareV).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          this.setState({
            sharesValue: [...this.state.sharesValue, shareV]

          })
        })
      }
      constructor(props) {
        super(props)
        this.state = {
          account: '',
          contract: null,
          totalSupply: 0,
          colors: []
        }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Maker Mint
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <h6>Welcome to Music-NFTs</h6>
              <h2> Issue Token </h2>

              <form onSubmit={(event) => {
                                event.preventDefault()
                                const color = this.color.value
                                const shareV = this.shareV.value
                              //  const initialP = this.initialP.value
                              //  const subpart = this.subpart.value
                                this.mint(color)
                          }}>
                                <input
                                  type='text'
                                  className='form-control mb-1'
                                  placeholder='e.g. #FFFFFF'
                                  ref={(input) => { this.color = input }}
                                />
                                <input
                                  type='text'
                                  className='form-control mb-1'
                                  placeholder='e.g. SharesValue'
                                  ref={(input) => { this.shareV = input }}
                                />
                                <input
                                  type='text'
                                  className='form-control mb-1'
                                  placeholder='e.g. initialPrice'
                                  //ref={(input) => { this.color = input }}
                                />

                                <input
                                  type='submit'
                                  className='btn btn-block btn-primary'
                                  value='MINT'
                                />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.colors.map((color, key) => {
              return(
                  <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: color }}></div>
                  <div>{color} </div>

                  <p> Artist: Akon </p>
                  <p> Song : Smack That </p>
                  <p> views: 123439339</p>
                  <small className="text-black"><span id="account">{this.state.account}</span></small>
                </div>
              )
            })}

            </div>
        </div>
      </div>
    );
  }
}

export default App;
