import React, { Component } from 'react'
import { CardColumns } from 'react-bootstrap';
import News1 from './News/News1'
import News2 from './News/News2';
import News3 from './News/News3';

const MAX_ITEMS = 3;

export default class More extends Component {
    componentWillMount() {
        this.state = {
          isOpen: false,
        };
        this.items = [
                <News3 />,
                <News2 />,
                <News1 />,
                <News3 />,
                <News2 />,
                <News1 />,
        ];
      }
      
      toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
      
      getRenderedItems() {
        if (this.state.isOpen) {
          return this.items;
        }
        return this.items.slice(0, MAX_ITEMS);
      }
    
      render() {
        return(
          <div>
            {this.getRenderedItems().map((item, id) => (
              <div key={id}>{item}</div>
            ))}
            <div>
            <button onClick={this.toggle}>
              {this.state.isOpen ? 'less' : 'more'}
            </button>
            </div>
          </div>
        );
      }
    }