from openai import OpenAI
import time
import os
# from users import User
# from achievements import Achievement
from flask import Flask, jsonify, request
# from app_setup import app, api
from flask_restful import request, Resource

# Use an environment variable for the API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

api_key = OPENAI_API_KEY
client = OpenAI()


# # JSON Mode for frontend
# response = client.chat.completions.create(
#     model="gpt-3.5-turbo-0125",
#     response_format={ "type": "json_object" },
#     messages=[
#         {"role": "system", "content": "You are a helpful assistant designed to output JSON."},

#         {"role": "user", "content": "My name is {user.first_name}, and I live in {user.zipcode}. My goal is to: {achievement.description} I have $200 extra after my monthly expenses.  How should I spend that?"} 
#     ]
# )
# print(response.choices[0].message.content)



users = {'Alberto'}
achievements = {"retire"}


def get_openai_response(user, achievement):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON."},

            {"role": "user", "content": "My name is Alberto', and I live in '94903'. My goal is to: 'go on vacation'} I have $200 extra after my monthly expenses.  How should I spend that?"} ])
    return response.choices[0].message.content



class GetResponse(Resource):
    def get(self):
        return get_openai_response(users, achievements)