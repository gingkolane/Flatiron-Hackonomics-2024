from openai import OpenAI
import time
import os
from users import User
from achievements import Achievement
# Use an environment variable for the API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

api_key = OPENAI_API_KEY
client = OpenAI()

user = User(
        first_name='Alberto',
        last_name='Sierra',
        email='Alberto@Sierra.com',
        zipcode='94903'
    )
achievement = Achievement(
        description='Go on vacation'
)

# # JSON Mode for frontend
response = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
        
        # {"role": "user", "content": "I have $200 extra, after my monthly expenses.  I wants to invest the extra money in the S&P 500. Return the calculated  amount in 10 years from now"}
        
        # {"role": "user", "content": "Give me a list of retirement accounts and their performance in the past 10 years in APR"}
        
        # {"role": "user", "content": "I have $5000 in my Roth IRA account, if i put in $200 a month, how much will it be in 30 years?"}
        
        # {"role": "user", "content": "Help me to create a monthly budget with $1000 in 10005. With 10 major spending categories."}
        
        # {"role": "user", "content": "Find what the average person per month in 94903 spends in healthcare. "}
        
        {"role": "user", "content": "My name is {user.first_name}, and I live in {user.zipcode}. My goal is to: {achievement.description} I have $200 extra after my monthly expenses.  How should I spend that?"} 
    ]
)
print(response.choices[0].message.content)

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
    
    
    