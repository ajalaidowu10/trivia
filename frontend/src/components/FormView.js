import React, { Component } from 'react';
import '../stylesheets/FormView.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
class FormView extends Component {
  constructor(props) {
    super();
    this.state = {
      question: '',
      answer: '',
      difficulty: 1,
      category: 1,
      categories: {},
      errors: {},
      message: ''
    };
  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/categories`)
    .then( resp => resp.json())
    .then(result => {
      this.setState({ categories: result.data.categories });
    })
    .catch(error => {
      alert('Unable to load questions. Please try your request again');
    });
  }

  submitQuestion = (event) => {
    event.preventDefault();
    fetch(`${API_BASE_URL}/questions`, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        question: this.state.question,
        answer: this.state.answer,
        difficulty: this.state.difficulty,
        category: this.state.category,
      })
    })
    .then( resp => resp.json())
    .then(result => {
        if(result.status === 200){
          this.setState({message: result.message})
          document.getElementById('add-question-form').reset();
        }else{
          this.setState({errors: result.error})
        }
    })
    .catch(error => {
      alert('Unable to load questions. Please try your request again');
    })
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div id='add-form'>
        <div className="alert-success">{this.state.message}</div>
        <h2>Add a New Trivia Question</h2>
        <form
          className='form-view'
          id='add-question-form'
          onSubmit={this.submitQuestion}
        >
          <label>
            Question
            <input type='text' name='question' onChange={this.handleChange} />
            <div className="alert-danger">{this.state.errors["question"]}</div>
          </label>
          <label>
            Answer
            <input type='text' name='answer' onChange={this.handleChange} />
            <div className="alert-danger">{this.state.errors["answer"]}</div>
          </label>
          <label>
            Difficulty
            <select name='difficulty' onChange={this.handleChange}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <div className="alert-danger">{this.state.errors["difficulty"]}</div>
          </label>
          <label>
            Category
            <select name='category' onChange={this.handleChange}>
              {Object.keys(this.state.categories).map((id) => {
                return (
                  <option key={id} value={id}>
                    {this.state.categories[id]}
                  </option>
                );
              })}
            </select>
            <div className="alert-danger">{this.state.errors["category"]}</div>
          </label>
          <input type='submit' className='button' value='Submit' />
        </form>
      </div>
    );
  }
}

export default FormView;
