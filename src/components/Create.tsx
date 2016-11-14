import * as React from 'react'
import * as _ from 'lodash'
declare var require: Function
const QRCode = require('qrcode.react')
import hunt = require('bitcoin-treasure-hunt')


type phase = 'init' | 'funding' | 'broadcastingTreasureHunt' | 'showingTokens'

const treasureTokens = (hunt: hunt.TreasureHunt) => {
  return hunt.tokens.map(token => {
    return (JSON.stringify({
      token: token.toWIF(),
      prizeAddress: hunt.prizeAddress.toString(),
      transactionId: hunt.transacation.id,
      publicKeys: hunt.tokens.map(token => token.toPublicKey().toString()),
      amount: hunt.prizeAmount,
      requiredTokens: hunt.requiredTokens,
    }))
  })
}

class Create extends React.Component<{}, { totalTokens: number, requiredTokens: number, phase: phase, funding?: hunt.Funding, hunt?: hunt.TreasureHunt }> {
  constructor(props: any) {
    super(props)
    this.state = {
      totalTokens: 3,
      requiredTokens: 2,
      phase: 'init'
    }
  }

  componentWillMount() {
    if (this.state.phase === 'init') {
      const funding = hunt.createFunding()
      this.setState(prevState => _.assign({}, prevState, {
        phase: 'funding',
        funding: funding,
      }))

      hunt.waitForTransaction(funding.address)
        .then(utxos => {
          const treasureHunt = hunt.createTreasureHunt(utxos, this.state.funding, { tokens: { total: this.state.totalTokens, required: this.state.requiredTokens }})
          this.setState(prevState => _.assign({}, prevState, {
            phase: 'broadcastingTreasureHunt',
            hunt: treasureHunt
          }))

          return Promise.resolve(treasureHunt)
        }).then(treasureHunt => {
          hunt.broadcastTreasureHunt(treasureHunt)
        }).then(() => {
          this.setState(prevState => _.assign({}, prevState, {
            phase: 'showingTokens',
          }))
        })
    }
  }

  handleTotalTokensChange(total: number) {
    this.setState(prevState => _.assign({}, prevState, {
      totalTokens: total,
    }))
  }

  handleRequiredTokensChange(required: number) {
    this.setState(prevState => _.assign({}, prevState, {
      requiredTokens: required,
    }))
  }

  render() {
    let element : JSX.Element
    switch(this.state.phase) {
      case 'funding':
        element = <div>
          Required
          <input
            type="number"
            value={this.state.requiredTokens}
            onChange={ev => this.handleRequiredTokensChange(parseInt((ev.target as HTMLInputElement).value))}
          />
          Total
          <input
            type="number"
            value={this.state.totalTokens}
            onChange={ev => this.handleTotalTokensChange(parseInt((ev.target as HTMLInputElement).value))}
          />
          <QRCode 
            value={this.state.funding.address.toString()} 
            level="H"
          />
          </div>
        break
      case 'broadcastingTreasureHunt':
        break;
      case 'showingTokens':
        element = <div>{
          treasureTokens(this.state.hunt).map(token => {
            return <div
              key={token}
            >
              {token}
              <div
               style={{padding: 40}}
              >
              <QRCode 
                size={300}
                level="L"
                value={token} 
              />
              </div>
            </div>
          })
        }</div>
      break;
    }

    return <div>
      <h1>Create treasure hunt</h1>
      {element}
      <button
        className="btn btn-defult"
      >
        Create
      </button>
    </div>
  }
}

export default Create
