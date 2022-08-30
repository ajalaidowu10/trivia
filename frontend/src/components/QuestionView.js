import React, { Component } from 'react';
import '../stylesheets/App.css';
import Question from './Question';
import Search from './Search';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
class QuestionView extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      page: 1,
      totalQuestions: 0,
      categories: {},
      currentCategory: null,
      searchError: {},
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    fetch(`${API_BASE_URL}/questions?page=${this.state.page}`)
    .then( resp => resp.json())
    .then(questions => {
      const result = questions.data;
      this.setState({
        questions: result.questions,
        totalQuestions: result.total_questions,
        categories: result.categories,
        currentCategory: result.current_category,
      });
    })
    .catch(error => {
      alert('Unable to load questions. Please try your request again');
    });
  };

  selectPage(num) {
    this.setState({ page: num }, () => this.getQuestions());
  }

  createPagination() {
    let pageNumbers = [];
    let maxPage = Math.ceil(this.state.totalQuestions / 10);
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`page-num ${i === this.state.page ? 'active' : ''}`}
          onClick={() => {
            this.selectPage(i);
          }}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  }

  getByCategory = (id) => {
    fetch(`${API_BASE_URL}/categories/${id}/questions`)
    .then( resp => resp.json())
    .then(questions => {
      const result = questions.data;
      this.setState({
        questions: result.questions,
        totalQuestions: result.total_questions,
        currentCategory: result.current_category,
      });
    })
    .catch(error => {
      alert('Unable to load questions. Please try your request again');
    })
  };

  submitSearch = (searchTerm) => {
    fetch(`${API_BASE_URL}/questions/search`, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({ searchTerm: searchTerm })
    })
    .then( resp => resp.json())
    .then(result => {
      if(result.status === 200){
        this.setState({
          questions: result.data.questions,
          totalQuestions: result.data.total_questions
        });
      }else{
        this.setState({searchError: result.error})
      }
    })
    .catch(error => {
      alert('Unable to load questions. Please try your request again');
    })
  };

  questionAction = (id) => (action) => {
    if (action === 'DELETE') {
      if (window.confirm('are you sure you want to delete the question?')) {
        fetch(`${API_BASE_URL}/questions/${id}`, {
          'method': 'DELETE',
        })
        .then( resp => resp.json())
        .then(result => {
          this.getQuestions();
        })
        .catch(error => {
          alert('Unable to load questions. Please try your request again');
        })
      }
    }
  };

  render() {
    return (
      <div className='question-view'>
        <div className='categories-list'>
          <h2
            onClick={() => {
              this.getQuestions();
            }}
          >
            Categories
          </h2>
          <ul>
            {Object.keys(this.state.categories).map((id) => (
              <li
                key={id}
                onClick={() => {
                  this.getByCategory(Number(id) + 1);
                }}
              >
                {this.state.categories[id]}
                <img
                  className='category'
                  alt={`${this.state.categories[id].toLowerCase()}`}
                  src={`${this.state.categories[id].toLowerCase()}.svg`}
                />
              </li>
            ))}
          </ul>
          <Search submitSearch={this.submitSearch} searchError={this.state.searchError} />
        </div>
        <div className='questions-list'>
          <h2>Questions</h2>
          {this.state.questions.map((q, ind) => (
            <Question
              key={q.id}
              question={q.question}
              answer={q.answer}
              category={this.state.categories[q.category - 1]}
              difficulty={q.difficulty}
              questionAction={this.questionAction(q.id)}
            />
          ))}
          <div className='pagination-menu'>{this.createPagination()}</div>
        </div>
      </div>
    );
  }
}

export default QuestionView;
