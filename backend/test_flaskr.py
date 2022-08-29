import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app
from models import setup_db, Question, Category


class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "trivia_test"
        self.database_path = "postgresql://{}/{}".format('postgres:postgres321@localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()
            self.new_question = {
                            'question': "What is the world's  fastest lad animal?",
                            'answer': 'Cheetahs',
                            'category': 5,
                            'difficulty': 2,
                        }
            self.bad_question = {
                            'question': "What is the world's  fastest lad animal?",
                            'category': 5,
                            'difficulty': 2,
                        }
    
    def tearDown(self):
        """Executed after reach test"""
        pass

    """
    TODO
    Write at least one test for each test for successful operation and for expected errors.
    """
    def test_paginated_questions(self):
        res = self.client().get('/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['status'], 200)
        self.assertTrue(data['data']['questions'])
        self.assertTrue(len(data['data']['questions']))
        self.assertLessEqual(len(data['data']['questions']), 10, 'Question pagination is greater than 10')

    def test_get_categories(self):
        res = self.client().get('/categories')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['status'], 200)
        self.assertTrue(data['data']['categories'])
        self.assertTrue(len(data['data']['categories']))
        self.assertEqual(data['message'], 'Categories fetch successfully')


    def test_get_questions_by_category(self):
        res = self.client().get('categories/1/questions')
        data = json.loads(res.data)

        self.assertEqual(data['status'], 200)
        self.assertTrue(data['data']['questions'])
        self.assertTrue(data['data']['categories'])
        self.assertTrue(data['data']['total_questions'])
        self.assertTrue(data['data']['current_category'])

    def test_add_question(self):
        res = self.client().post('/questions', json=self.new_question)
        self.assertTrue(res.status_code, 200)

        data = json.loads(res.data)
        self.assertEqual(data['status'], 200)
        self.assertEqual(data['message'], 'Question added successfully')

    def test_400_add_question(self):
        res = self.client().post('/questions', json=self.bad_question)
        self.assertTrue(res.status_code, 400)

        data = json.loads(res.data)
        self.assertEqual(data['status'], 400)
        self.assertNotEqual(data['error'], None)

    # def test_delete_question(self):
    #     res = self.client().delete('/questions/11')
    #     data = json.loads(res.data)

    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data['status'], 200)

    def test_422_if_question_to_delete_does_not_exist(self):
        res = self.client().delete('/questions/5000')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['status'], 422)
        self.assertEqual(data['message'], 'Request not processable')

    def test_search_question(self):
        res = self.client().post('/questions', json={'searchTerm': 'the'})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['data']['questions'])
        self.assertEqual(len(data['data']['questions']), 10)

    def test_get_quiz(self):
        res = self.client().post('/quizzes',
                                 json={'previous_questions': [],
                                       'quiz_category':
                                       {'id': '5', 'type': 'Entertainment'}})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['data']['question'])

# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()