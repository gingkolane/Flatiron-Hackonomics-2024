from openai import OpenAI
import time
import os

# Use an environment variable for the API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

api_key = OPENAI_API_KEY
client = OpenAI()


#Chat-bot instructions and model
assistant = client.beta.assistants.create(
  name="Budget Manager",
  instructions="You are a budget manager. Provide budgeting advice to save money or investing extra money.",
  tools=[{"type": "code_interpreter"}],
  model="gpt-3.5-turbo",
)

thread = client.beta.threads.create()

#User's message to the chat-bot
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="I have $200 extra, after my monthly expenses. What should I do with that money?"
)

#Chat-bot response:
#Plus second set of instructions -- provide users goals
run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id,
  instructions="Please address the user as Alberto. The user has goals to: Go on vacation, Buy a new laptop, Save for retirement."
)


while run.status in ['queued', 'in_progress', 'cancelling']:
  time.sleep(1) # Wait for 1 second
  run = client.beta.threads.runs.retrieve(
    thread_id=thread.id,
    run_id=run.id
  )
if run.status == 'completed': 
    messages = client.beta.threads.messages.list(
    thread_id=thread.id
  )
    print(messages)
else:
    print(run.status)