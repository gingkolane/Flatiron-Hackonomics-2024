from openai import OpenAI
import time
import os
# from users import User
# from achievements import Achievement
from flask import Flask, jsonify, request
from app_setup import app, api
from flask_restful import request, Resource

# Use an environment variable for the API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

api_key = OPENAI_API_KEY
client = OpenAI()

# user = User(
#         first_name='Alberto',
#         last_name='Sierra',
#         email='Alberto@Sierra.com',
#         zipcode='94903'
#     )
# achievement = Achievement(
#         description='Go on vacation'
# )

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


users = {}
achievements = {}


def get_openai_response(user, achievement):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON."},

            {"role": "user", "content": "My name is {'Alberto'}, and I live in {'94903'}. My goal is to: {'go on vacation'} I have $200 extra after my monthly expenses.  How should I spend that?"} ])
    return response

class OpenAiResponse(Resource):
    def post(self, user_id):
    
        user_details = request.json.get('user')
        achievement_details = request.json.get('achievement')
        users[user_id] = user_details
        achievements[user_id] = achievement_details

        # Get response from OpenAI (simulated here)
        openai_response = get_openai_response(user_details, achievement_details)

        # Return the OpenAI response as JSON
        return openai_response, 200























#Chat-bot instructions and model
# assistant = client.beta.assistants.create(
#   name="Budget Manager",
#   instructions="You are a budget manager. Provide budgeting advice to save money or investing extra money. Return only JSON ",
#   tools=[{"type": "code_interpreter"}], 
#   model="gpt-4-turbo-preview",
# )

# thread = client.beta.threads.create()

# #User's message to the chat-bot
# message = client.beta.threads.messages.create(
#     thread_id=thread.id,
#     role="user",
#     content="I have $200 extra, after my monthly expenses.  I wants to invest the extra money in the S&P 500. Return the calculated  amount in 30 years from now. return only JSON"
# )

# #Chat-bot response:
# #Plus second set of instructions -- provide users goals
# run = client.beta.threads.runs.create(
#   thread_id=thread.id,
#   assistant_id=assistant.id,
#   instructions="Please address the user as Alberto. Return only JSON"
# )

# while run.status in ['queued', 'in_progress', 'cancelling']:
#   time.sleep(1) # Wait for 1 second
#   run = client.beta.threads.runs.retrieve(
#     thread_id=thread.id,
#     run_id=run.id
#   )
# if run.status == 'completed': 
#     messages = client.beta.threads.messages.list(
#     thread_id=thread.id
#   )
#     #Chat-bot response
#     print(messages.data[0].content[0].text.value)
# else:
#     print(run.status)
    
    
    