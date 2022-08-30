from flask_wtf import FlaskForm as Form
from wtforms import StringField
from wtforms.validators import DataRequired, optional

class QuestionForm(Form):
    question = StringField(
        'question',
        validators=[DataRequired()],
    )
    answer = StringField(
        'answer',
        validators=[DataRequired()],
    )
    category = StringField(
        'category',
        validators=[DataRequired()],
    )
    difficulty = StringField(
        'difficulty',
        validators=[DataRequired()],
    )

class SearchForm(Form):
    searchTerm = StringField(
        'searchTerm',
        validators=[DataRequired()],
    )


