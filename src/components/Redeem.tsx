import * as React from 'react'
import * as _ from 'lodash'
declare var require: Function
import hunt = require('bitcoin-treasure-hunt')
const qrReader = require('qrcode-reader')
const bitcore = require('bitcore-lib')

interface RedeemState {
  amount: number
  transactionId: string
  prizeAddress: string
  publicKeys: any[]
  tokens: any[]
  address: string
}

class Redeem extends React.Component<{}, RedeemState> {
  componentWillMount() {
    this.state = {
      amount: 0,
      transactionId: '',
      prizeAddress: '',
      publicKeys: [],
      tokens: [],
      address: 'n49hbHgynpRK3eZdas1p52DCt8bHrY51oD',
    }
  }

  reedem() {
      console.log(this.state)
    if (this.state.tokens.length == 2) {
      hunt.redeem({
        transactionId: this.state.transactionId,
        prizeAddress: this.state.prizeAddress,
        amount: this.state.amount,
        publicKeys: this.state.publicKeys,
        tokens: this.state.tokens,
        address: this.state.address,
      }).then(_ => console.log('redeemed'))
    }
  }

  handleImageUpload(files: FileList) {
    const reader = new FileReader()
    reader.onload = (output: any) => {
      const qr = new qrReader()
      qr.callback = (result: string, err: any) => {
        if(result){
          const content  = JSON.parse(atob(result))

          const newToken = bitcore.PrivateKey.fromWIF(content.token)
          const publicKeys = content.publicKeys.map((publicKey: any) => bitcore.PublicKey(publicKey))

          this.setState(prevState => _.assign({}, prevState, {
            transactionId: content.transactionId,
            prizeAddress: bitcore.Address.fromString(content.prizeAddress),
            amount: content.amount,
            publicKeys: publicKeys,
            tokens: this.state.tokens.concat(newToken),
          }), this.reedem)

        } else {
          console.log(err)
        }
      }
      qr.decode(output.target.result)
    }

    reader.readAsDataURL(files[0])
  }

  handleOnChangeAddress(address: string) {
    this.setState(prevState => _.assign({}, prevState, {
      address: address
    }))
  }
  
  render() {
    return <div>
      <h1>Redeem</h1>
      <div
        className="form-group"
      >
        <label
          htmlFor="address"
        >
          Your address
        </label>
        <input 
          type="text"
          className="form-control" 
          id="address"
          onChange={ev => this.handleOnChangeAddress((ev.target as HTMLInputElement).value)}
          value={this.state.address}
        />
      </div>
      <input 
        type="file" 
        name="image" 
        accept="image/*" 
        capture
        onChange={ev => this.handleImageUpload((ev.target as HTMLInputElement).files)}
      />

      {this.state.tokens.map(token => {
        return <div
          key={token.toWIF()}
        >
          {token.toWIF()}
        </div>
      })}
    </div>
  }
}

export default Redeem