import React,{Component} from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{margin:"0px"}}>
          <h1>
            WELCOME TO HISAB KITAB
          </h1>
      </div>
    );
  }
}

export default Header;
