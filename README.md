# API Development and Documentation Final Project

## Trivia App

Trivia is a quiz game. It provides the below funtionalities to users

1. Display questions - both all questions and by category. Questions should show the question, category and difficulty rating by default and can show/hide the answer.
2. Delete questions.
3. Add questions and require that they include question and answer text.
4. Search for questions based on a text query string.
5. Play the quiz game, randomizing either all questions or within a specific category.

## Getting Started

## About the Stack

It is designed with some key functional areas:

### Backend

### Install Dependencies

1. **Python 3.7** - Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

2. **Virtual Environment** - We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organized. Instructions for setting up a virual environment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

3. **PIP Dependencies** - Once your virtual environment is setup and running, install the required dependencies by navigating to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

#### Key Pip Dependencies

- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use to handle the lightweight SQL database. You'll primarily work in `app.py`and can reference `models.py`.

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross-origin requests from our frontend server.

### Set up the Database

With Postgres running, create a `trivia` database:

```bash
createbd trivia
```

Populate the database using the `trivia.psql` file provided. From the `backend` folder in terminal run:

```bash
psql trivia < trivia.psql
```

### Run the Server

From within the `backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```bash
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```

### Frontend

The frontend app was built using create-react-app. In order to run the app in development mode use npm start. Then open http://localhost:3000 to view it in the browser.

Also you need to create a .env file using the .env-example file. Then set REACT_APP_API_BASE_URL to point to you backend base URL

## API Reference

### Getting Started 
Base URL: This application is only hosted locally. The base URL depends on local server host.
Authentication: This version does not require authentication or API keys.

### API Payload

The API Payload consist of four attributes which are
- status - Display request status e.g 200, 400
- message - Display status message e.g Question created successfully, resource not found
- error - Display form errors. Default is none
- data - Display response data

### Error Handling

There are four types of errors the API will return
- 404 - Resource not found
- 400 - Bad request
- 422 - Request not processable
- 500 - Internal Server Error

### Endpoints

#### GET '/categories'
- Fetches all available categories.
- Sample: `curl http://127.0.0.1:5000/categories`
```
{                                                                                                                                                                                            
  "data": {                                                                                                                                                                                  
    "categories": {                                                                                                                                                                          
      "1": "Science",                                                                                                                                                                        
      "2": "Art",                                                                                                                                                                            
      "3": "Geography",                                                                                                                                                                      
      "4": "History",                                                                                                                                                                        
      "5": "Entertainment",                                                                                                                                                                  
      "6": "Sports"                                                                                                                                                                          
    }                                                                                                                                                                                        
  },                                                                                                                                                                                         
  "error": null,                                                                                                                                                                             
  "message": "Categories fetch successfully",                                                                                                                                                
  "status": 200                                                                                                                                                                              
}     
```

#### GET '/questions'
- Returns a list of questions
  - Includes a list of categories
  - Paginated in groups of 10
  - Pagination is passed using page query parameter
- Sample: `curl http://127.0.0.1:5000/questions?page=1`
```
{                                                                                                                                                                                            
  "data": {                                                                                                                                                                                  
    "categories": [                                                                                                                                                                          
      "Science",                                                                                                                                                                             
      "Art",                                                                                                                                                                                 
      "Geography",                                                                                                                                                                           
      "History",                                                                                                                                                                             
      "Entertainment",                                                                                                                                                                       
      "Sports"                                                                                                                                                                               
    ],                                                                                                                                                                                       
    "questions": [                                                                                                                                                                           
      {                                                                                                                                                                                      
        "answer": "Apollo 13",                                                                                                                                                               
        "category": 5,                                                                                                                                                                       
        "difficulty": 4,                                                                                                                                                                     
        "id": 2,                                                                                                                                                                             
        "question": "What movie earned Tom Hanks his third straight Oscar nomination, in 1996?"                                                                                              
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Maya Angelou",                                                                                                                                                            
        "category": 4,                                                                                                                                                                       
        "difficulty": 2,                                                                                                                                                                     
        "id": 5,                                                                                                                                                                             
        "question": "Whose autobiography is entitled 'I Know Why the Caged Bird Sings'?"                                                                                                     
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Edward Scissorhands",                                                                                                                                                     
        "category": 5,                                                                                                                                                                       
        "difficulty": 3,                                                                                                                                                                     
        "id": 6,                                                                                                                                                                             
        "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?"                                                          
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Muhammad Ali",                                                                                                                                                            
        "category": 4,                                                                                                                                                                       
        "difficulty": 1,                                                                                                                                                                     
        "id": 9,                                                                                                                                                                             
        "question": "What boxer's original name is Cassius Clay?"                                                                                                                            
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Brazil",                                                                                                                                                                  
        "category": 6,                                                                                                                                                                       
        "difficulty": 3,                                                                                                                                                                     
        "id": 10,                                                                                                                                                                            
        "question": "Which is the only team to play in every soccer World Cup tournament?"                                                                                                   
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Uruguay",                                                                                                                                                                 
        "category": 6,                                                                                                                                                                       
        "difficulty": 4,                                                                                                                                                                     
        "id": 11,                                                                                                                                                                            
        "question": "Which country won the first ever soccer World Cup in 1930?"                                                                                                             
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "George Washington Carver",                                                                                                                                                
        "category": 4,                                                                                                                                                                       
        "difficulty": 2,                                                                                                                                                                     
        "id": 12,                                                                                                                                                                            
        "question": "Who invented Peanut Butter?"                                                                                                                                            
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Lake Victoria",                                                                                                                                                           
        "category": 3,                                                                                                                                                                       
        "difficulty": 2,                                                                                                                                                                     
        "id": 13,                                                                                                                                                                            
        "question": "What is the largest lake in Africa?"                                                                                                                                    
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "The Palace of Versailles",                                                                                                                                                
        "category": 3,                                                                                                                                                                       
        "difficulty": 3,                                                                                                                                                                     
        "id": 14,                                                                                                                                                                            
        "question": "In which royal palace would you find the Hall of Mirrors?"                                                                                                              
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Agra",                                                                                                                                                                    
        "category": 3,                                                                                                                                                                       
        "difficulty": 2,                                                                                                                                                                     
        "id": 15,                                                                                                                                                                            
        "question": "The Taj Mahal is located in which Indian city?"                                                                                                                         
      }                                                                                                                                                                                      
    ],                                                                                                                                                                                       
    "total_questions": 31                                                                                                                                                                    
  },                                                                                                                                                                                         
  "error": null,                                                                                                                                                                             
  "message": "Questions fetch successfully",                                                                                                                                                 
  "status": 200                                                                                                                                                                              
}
```

#### POST '/questions'
- Creates a new question using application/json in content-type header
- Return form errors in the Payload error attribute if there is an error
- Sample: `curl http://127.0.0.1:5000/questions -X POST -H "Content-Type: application/json" -d '{"question": "What is name of the fastest land animal?", "answer": "Cheetah", "difficulty": 3, "category": "3" }'`
```
{                                                                                                                                                                                            
  "data": {                                                                                                                                                                                  
    "question": {                                                                                                                                                                            
      "answer": "Cheetah",                                                                                                                                                                   
      "category": 3,                                                                                                                                                                         
      "difficulty": 3,                                                                                                                                                                       
      "id": 38,                                                                                                                                                                              
      "question": "What is name of the fastest land animal?"                                                                                                                                 
    }                                                                                                                                                                                        
  },                                                                                                                                                                                         
  "error": null,                                                                                                                                                                             
  "message": "Question created successfully",                                                                                                                                                
  "status": 200                                                                                                                                                                              
}   
```
- Sample Error: `curl http://127.0.0.1:5000/questions -X POST -H "Content-Type: application/json" -d '{"question": "What is name of the fastest land animal?","difficulty": 3, "category": "3" }'`
```
{                                                                                                                                                                                            
  "data": null,                                                                                                                                                                              
  "error": {                                                                                                                                                                                 
    "answer": [                                                                                                                                                                              
      "This field is required."                                                                                                                                                              
    ]                                                                                                                                                                                        
  },                                                                                                                                                                                         
  "message": "Bad request",                                                                                                                                                                  
  "status": 400                                                                                                                                                                              
} 
```

#### POST '/questions/search'
- Searches for questions using a search term, 
- Returns paginated questions matching the search term
- Sample: `curl http://127.0.0.1:5000/questions/search -X POST -H "Content-Type: application/json" -d '{"searchTerm": "artist"}'`
```
{                                                                                                                                                                                            
  "data": {                                                                                                                                                                                  
    "questions": [                                                                                                                                                                           
      {                                                                                                                                                                                      
        "answer": "Escher",                                                                                                                                                                  
        "category": 2,                                                                                                                                                                       
        "difficulty": 1,                                                                                                                                                                     
        "id": 16,                                                                                                                                                                            
        "question": "Which Dutch graphic artist\u2013initials M C was a creator of optical illusions?"                                                                                       
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Jackson Pollock",                                                                                                                                                         
        "category": 2,                                                                                                                                                                       
        "difficulty": 2,                                                                                                                                                                     
        "id": 19,                                                                                                                                                                            
        "question": "Which American artist was a pioneer of Abstract Expressionism, and a leading exponent of action painting?"                                                              
      }                                                                                                                                                                                      
    ],                                                                                                                                                                                       
    "total_questions": 2                                                                                                                                                                     
  },                                                                                                                                                                                         
  "error": null,                                                                                                                                                                             
  "message": "Question searched successfully",                                                                                                                                               
  "status": 200                                                                                                                                                                              
}            
```
#### GET '/categories/<int:id>/questions'
- Gets all questions in a specified category by id using url parameters
- Sample: `curl http://127.0.0.1:5000/categories/3/questions`
```
{                                                                                                                                                                                            
  "data": {                                                                                                                                                                                  
    "categories": [                                                                                                                                                                          
      "Science",                                                                                                                                                                             
      "Art",                                                                                                                                                                                 
      "Geography",                                                                                                                                                                           
      "History",                                                                                                                                                                             
      "Entertainment",                                                                                                                                                                       
      "Sports"                                                                                                                                                                               
    ],                                                                                                                                                                                       
    "current_category": {                                                                                                                                                                    
      "id": 3,                                                                                                                                                                               
      "type": "Geography"                                                                                                                                                                    
    },                                                                                                                                                                                       
    "questions": [                                                                                                                                                                           
      {                                                                                                                                                                                      
        "answer": "Lake Victoria",                                                                                                                                                           
        "category": 3,                                                                                                                                                                       
        "difficulty": 2,                                                                                                                                                                     
        "id": 13,                                                                                                                                                                            
        "question": "What is the largest lake in Africa?"                                                                                                                                    
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "The Palace of Versailles",                                                                                                                                                
        "category": 3,                                                                                                                                                                       
        "difficulty": 3,                                                                                                                                                                     
        "id": 14,                                                                                                                                                                            
        "question": "In which royal palace would you find the Hall of Mirrors?"                                                                                                              
      },                                                                                                                                                                                     
      {                                                                                                                                                                                      
        "answer": "Agra",                                                                                                                                                                    
        "category": 3,                                                                                                                                                                       
        "difficulty": 2,                                                                                                                                                                     
        "id": 15,                                                                                                                                                                            
        "question": "The Taj Mahal is located in which Indian city?"                                                                                                                         
      }                                                                                                                                                                                      
    ],                                                                                                                                                                                       
    "total_questions": 3                                                                                                                                                                     
  },                                                                                                                                                                                         
  "error": null,                                                                                                                                                                             
  "message": "Question searched successfully",                                                                                                                                               
  "status": 200                                                                                                                                                                              
}      
```

#### POST '/quizzes'
- Allows user to play the trivia game
- Requires category and previous questions
- Returns random available questions which are not among previous used questions
- Sample: `curl http://127.0.0.1:5000/quizzes -X POST -H "Content-Type: application/json" -d '{"previous_questions": [7, 8], "quiz_category": {"type": "Geography", "id": "3"}}'`
```
{                                                                                                                                                                                            
  "data": {                                                                                                                                                                                  
    "question": {                                                                                                                                                                            
      "answer": "Lake Victoria",                                                                                                                                                             
      "category": 3,                                                                                                                                                                         
      "difficulty": 2,                                                                                                                                                                       
      "id": 13,                                                                                                                                                                              
      "question": "What is the largest lake in Africa?"                                                                                                                                      
    }                                                                                                                                                                                        
  },                                                                                                                                                                                         
  "error": null,                                                                                                                                                                             
  "message": "Quizzes fetch successfully",                                                                                                                                                   
  "status": 200                                                                                                                                                                              
}            
```

#### DELETE '/questions/<int:id>'
- Deletes a question by id using url parameters
- Returns id of deleted questions if successful
- Sample: `curl http://127.0.0.1:5000/questions/3 -X DELETE`
```
  {                                                                                                                                                                                            
  "data": null,                                                                                                                                                                              
  "error": null,                                                                                                                                                                             
  "message": "Question deleted successfully",                                                                                                                                                
  "status": 200                                                                                                                                                                              
}  
```