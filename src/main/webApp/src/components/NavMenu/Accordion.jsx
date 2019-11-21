import React from 'react'
import './NavMenu.css'

export default class Section extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      class: "section"
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    if(this.props.children)
    if(this.state.open) {
      this.setState({
        open: false,
        class: "section"
      });
    }else{
      this.setState({
        open: true,
        class: "section open"
      });
    }
  } 

  render() {
    return (
      <div className={this.state.class}>
       { this.props.children?<button className="navBarToggleButton">toggle</button>:''}
        <div className="sectionhead" onClick={this.handleClick}>
        {/* <FormattedMessage id={this.props.name} /> */}
        {this.props.name}
        </div>
        <div className="articlewrap">
          <div className="article">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
