import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FormErrors } from './FormErrors';

import './addProperty.scss';

class AddProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyTitle: '',
      propertyTypeSelect: '',
      bedroomInput: '',
      bathroomInput: '',
      price: '',
      citySelect: '',
      email: '',
      formErrors: {
        propertyTitle: '',
        propertyTypeSelect: '',
        bedroomInput: '',
        bathroomInput: '',
        price: '',
        citySelect: '',
        email: '',
      },
      propertyTitleValid: false,
      propertyTypeSelectValid: false,
      bedroomInputValid: false,
      bathroomInputValid: false,
      priceValid: false,
      citySelectValid: false,
      emailValid: false,
      formValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState(
      {
        [id]: value,
      },
      () => { this.validateField(id, value); },
    );
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let propertyTitleValid = this.state.propertyTitleValid;
    let propertyTypeSelectValid = this.state.propertyTypeSelectValid;
    let bedroomInputValid = this.state.bedroomInputValid;
    let bathroomInputValid = this.state.bathroomInputValid;
    let priceValid = this.state.priceValid;
    let citySelectValid = this.state.citySelectValid;
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case 'propertyTitle':
        propertyTitleValid = value.length >= 10;
        fieldValidationErrors.propertyTitle = propertyTitleValid ? '' : 'Property title must be longer that 80 characters';
        break;
      case 'propertyTypeSelect':
        propertyTypeSelectValid = value !== 'none';
        fieldValidationErrors.propertyTypeSelect = propertyTypeSelectValid ? '' : ' Please select a property type';
        break;
      case 'bedroomInput':
        bedroomInputValid = value > 0;
        fieldValidationErrors.bedroomInput = bedroomInputValid ? '' : ' Please enter a positive number of bedrooms';
        break;
      case 'bathroomInput':
        bathroomInputValid = value > 0;
        fieldValidationErrors.bathroomInput = bathroomInputValid ? '' : ' Please enter a positive number of bathrooms';
        break;
      case 'price':
        priceValid = (value >= 100000) && (value <= 250000);
        fieldValidationErrors.price = priceValid ? '' : ' Please enter a price between 100k and 250k';
        break;
      case 'citySelect':
        citySelectValid = value !== 'none';
        fieldValidationErrors.citySelect = citySelectValid ? '' : ' Please select a city';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' Email is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      propertyTitleValid,
      propertyTypeSelectValid,
      bedroomInputValid,
      bathroomInputValid,
      priceValid,
      citySelectValid,
      emailValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid:
      this.state.propertyTitleValid &&
      this.state.propertyTypeSelectValid &&
      this.state.bedroomInputValid &&
      this.state.bathroomInputValid &&
      this.state.priceValid &&
      this.state.citySelectValid &&
      this.state.emailValid,
    });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:3000/api/v1/PropertyListing', {
      title: this.state.propertyTitle,
      type: this.state.propertyTypeSelect,
      bedrooms: this.state.bedroomInput,
      bathrooms: this.state.bathroomInput,
      price: this.state.price,
      city: this.state.citySelect,
      email: this.state.email,
    })
      .then(() => {
        this.props.history.push('/');
        /* console.log(res);
        console.log(res.data); */
      });
  }

  render() {
    return (
      <div className="add-property-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="propertyTitle" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${this.errorClass(this.state.formErrors.propertyTitle)}`}
                id="propertyTitle"
                placeholder="A catchy title for your listing"
                value={this.state.propertyTitle}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="propertyTypeSelect" className="col-sm-2 col-form-label">Type</label>
            <div className="col-sm-10">
              <select
                className={`form-control ${this.errorClass(this.state.formErrors.propertyTypeSelect)}`}
                id="propertyTypeSelect"
                value={this.state.propertyTypeSelect}
                onChange={this.handleChange}
              >
                <option value="none">Select one option</option>
                <option value="Flat">Flat</option>
                <option value="Detached">Detached</option>
                <option value="Semi-Detached">Semi-Detached</option>
                <option value="Terraced">Terraced</option>
                <option value="End of Terrace">End of Terrace</option>
                <option value="Cottage">Cottage</option>
                <option value="Bungalow">Bungalow</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="bedroomInput" className="col-sm-2 col-form-label">Bedrooms</label>
            <div className="col-sm-10">
              <input
                type="number"
                className={`form-control ${this.errorClass(this.state.formErrors.bedroomInput)}`}
                id="bedroomInput"
                placeholder="No of bedrooms"
                value={this.state.bedroomInput}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="bathroomInput" className="col-sm-2 col-form-label">Bathrooms</label>
            <div className="col-sm-10">
              <input
                type="number"
                className={`form-control ${this.errorClass(this.state.formErrors.bathroomInput)}`}
                id="bathroomInput"
                placeholder="No of bathrooms"
                value={this.state.bathroomInput}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
            <div className="col-sm-10">
              <input
                type="number"
                className={`form-control ${this.errorClass(this.state.formErrors.price)}`}
                id="price"
                placeholder="Price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="citySelect" className="col-sm-2 col-form-label">City</label>
            <div className="col-sm-10">
              <select
                className={`form-control ${this.errorClass(this.state.formErrors.citySelect)}`}
                id="citySelect"
                value={this.state.citySelect}
                onChange={this.handleChange}
              >
                <option value="none">Select city</option>
                <option value="Manchester">Manchester</option>
                <option value="Sheffield">Sheffield</option>
                <option value="Liverpool">Liverpool</option>
                <option value="Leeds">Leeds</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className={`form-control ${this.errorClass(this.state.formErrors.email)}`}
                id="email"
                placeholder="Contact email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button disabled={!this.state.formValid} type="submit" className="btn btn-primary">Add Listing</button>
            </div>
          </div>
          {
            !this.state.formValid &&
              <div className="alert alert-warning" role="alert">
                <FormErrors formErrors={this.state.formErrors} />
              </div>
          }
          <div className="alert alert-danger" role="alert">
            Sorry, something went wrong. Please try again. (API Error)
          </div>
          <div className="alert alert-success" role="alert">
            Property saved.
          </div>
        </form>
      </div>
    );
  }
}

AddProperty.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default AddProperty;
