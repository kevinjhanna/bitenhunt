import * as React from 'react'
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
    }))
  })
}

class Create extends React.Component<{}, { phase: phase, funding?: hunt.Funding, hunt?: hunt.TreasureHunt }> {
  constructor(props: any) {
    super(props)
    this.state = {
      phase: 'init'
    }
  }

  componentWillMount() {
    if (this.state.phase === 'init') {
      const funding = hunt.createFunding()
      this.setState({
        phase: 'funding',
        funding: funding,
      })

      hunt.waitForTransaction(funding.address)
        .then(utxos => {
          const treasureHunt = hunt.createTreasureHunt(utxos, this.state.funding, { tokens: { total: 3, required: 2 }})
          this.setState({
            phase: 'broadcastingTreasureHunt',
            hunt: treasureHunt
          })
          return Promise.resolve(treasureHunt)
        }).then(treasureHunt => {
          hunt.broadcastTreasureHunt(treasureHunt)
        }).then(() => {
          this.setState({
            phase: 'showingTokens',
          })
        })
    }
  }

  render() {
    let element : JSX.Element
    switch(this.state.phase) {
      case 'funding':
        element = <QRCode 
          value={this.state.funding.address.toString()} 
          level="H"
        />
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
              <div>
              {btoa(token)}
              </div>
              <QRCode 
                size={500}
                value={btoa(token)} 
              />
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
