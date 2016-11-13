import * as React from 'react'
declare var require: Function
const QRCode = require('qrcode.react')
import hunt = require('bitcoin-treasure-hunt')


class Create extends React.Component<{}, { funding: hunt.Funding }> {
  constructor(props: any) {
    super(props)
    this.state = {
      funding: null,
    }
  }

  componentWillMount() {
    if (!this.state.funding) {
      const funding = hunt.createFunding()
      this.setState({
        funding: funding
      })

      // await hunt.waitForTransaction(funding.address)
    }
  }

  render() {
    return <div>
      <h1>Create treasure hunt</h1>
      <div
        className="form-group"
      >
        <label
          htmlFor="exampleInputEmail1"
        >
          Email address
        </label>
        <input 
          type="email"
          className="form-control" 
          id="exampleInputEmail1"
        />
        <small 
          id="emailHelp" 
          className="form-text text-muted"
        >
          We'll never share your email with anyone else.
        </small>
      </div>
      <div>
        <QRCode 
          value={this.state.funding.address.toString()} 
        />
      </div>
      <button
        className="btn btn-defult"
      >
        Create
      </button>
    </div>
  }
}

export default Create
