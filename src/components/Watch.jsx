import React from 'react';
import moment from 'moment';

class Watch extends React.Component {
  constructor ({watch, utc, handleDel}) {
    super();
    this.watch = watch;
    this.utc = utc;
    this.handleDel = handleDel;
    this.state  = {
      clock: ''
    }
  }

  clocks () {
    this.setState({clock: moment.utc(moment()).utcOffset(this.utc * 60).format('HH:mm:ss')});
  }

  componentDidMount() {
    this.clocks();
    this.timerId = setInterval(() => {
      this.clocks();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <tr key={this.watch}>
        <td>{this.watch}</td>
        <td>UTC {Math.sign(this.utc) === 1 ? '+' : ''}{this.utc}</td>
        <td>{this.state.clock}</td>
        <td><span onClick={(e) => this.handleDel(e, this.watch)}>&#10007;</span></td>
      </tr>
    );
  } 
}


export default Watch;