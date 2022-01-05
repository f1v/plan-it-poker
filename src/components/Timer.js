import React, { Component, Fragment } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSeconds: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ totalSeconds: this.state.totalSeconds+1});
    }, 1000);
  }

  reset = () => {
    this.setState({totalSeconds: 0})
  }

  render() {
    const { totalSeconds } = this.state;

    return (
      <Fragment>
        <div className="timer">
          <span className="digits">
            {("0" + Math.floor((totalSeconds / 3600) % 60)).slice(-2)}:
          </span>
          <span className="digits">
            {("0" + Math.floor((totalSeconds / 60) % 60)).slice(-2)}:
          </span>
          <span className="digits">
            {("0" + Math.floor(totalSeconds % 60)).slice(-2)}
          </span>
      </div>
      <div className="row">
        <button className="button" onClick={this.reset}>
          Reset
        </button>
        </div>
      </Fragment>
    );
  }
}


export default Timer;
