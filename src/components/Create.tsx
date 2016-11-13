import * as React from 'react'

class Create extends React.Component<{}, any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    if (!this.state.fundingAddress) {
      this.setState({
        fundingAddress: 'dummy-funding-address',
        fundingPrivateKey: 'dummy-funding-private-key',
      })
    }
  }

  render() {
    return <div>
      <h1>Create treasure hunt</h1>
      {this.state.fundingAddress}
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
      <button
        className="btn btn-defult"
      >
        Create
      </button>
    </div>
  }
}

export default Create