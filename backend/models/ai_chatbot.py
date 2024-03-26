from openai import OpenAI
import os
from flask_restful import request, Resource

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

api_key = OPENAI_API_KEY
client = OpenAI()

users = {'Alberto'}
achievements = {"retire"}


# json_schema = {
#     "name": "Alberto",
#     "location": "94903",
#     "goal": "go on vacation",
#     "extraIncome": 200,
#     "suggestions": [
#         "Save the extra money for your vacation fund",
#         "Consider putting the extra money towards booking a flight or accommodation for your vacation",
#         "Use the extra money for activities and experiences during your vacation"
#     ]
# }

def get_openai_response(user, achievement):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": "You are a helpful assistant, return JSON."},

            {"role": "user", "content": f"My name is Alberto', and I live in '94903'. My goal is to: 'go on vacation' I have $200 extra after my monthly expenses.  How should I spend that? "} ])
    return response.choices[0].message.content



class GetResponse(Resource):
    def get(self):
        return get_openai_response(users, achievements)