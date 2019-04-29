import React, { Component } from 'react'
import './ExampleContact.css';
import contactData1 from '../data/contact-data-1.json';
import samplePhoto from '../data/sample-photo.png';

import { FilterableContent } from 'react-filterable-content'

export default class ExampleContact extends Component {

  constructor(props){
    super(props);
    this.state = {
      keyword: '',
    }  
    this.onChange = this.onChange.bind(this);

  }

  onChange(event) {
    if (event && event.target) {
      const { value } = event.target;
      this.setState({keyword:value});
    }
  }

  buildContact(contact, dataGroup){
    let name = `${contact.first_name} ${contact.last_name}`;

    return(
      <li key={`${dataGroup}-${contact.id}`} filterable-group='true'>
        <div className="photo-profile">
          <img src={samplePhoto} />
        </div>
        <div className="identity">
          <div>
            <h3>{name}</h3>
            <p className="school">{contact.school}</p>
          </div>
          <div>
            <p><span filterable-ignore='true'>Email : </span>{contact.email}</p>
            <p><span filterable-ignore='true'>Phone : </span>{contact.phone}</p>
          </div>
        </div>
      </li>
    )
  }

  renderContact(){
    let result = [];

    contactData1.forEach(  contact =>{
      result.push(this.buildContact(contact, 1))
    });

    return result;
  }

  render () {
    let { keyword } = this.state;

    return (
      <div className="example-contact-container">
        <h2>List Of Contact</h2>

        <input
          type={'text'}
          value={keyword}
          placeholder={'Filter Contact Here'}
          onChange={this.onChange}
        />

        {keyword && <p className="keyword-name">{`Content that has "${keyword}" keyword`}</p>}
        
        <div>
          <FilterableContent keyword={keyword}>
            <ul>
              {this.renderContact()}
            </ul>
          </FilterableContent>
        </div>
      </div>
    )
  }
}
