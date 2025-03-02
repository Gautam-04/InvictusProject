from flask import Blueprint, request
import google.generativeai as genai
import os

genai.configure(api_key=os.environ['GEMINI_API_KEY'])
MODEL = genai.GenerativeModel('gemini-1.5-flash')

LLMTemplate = Blueprint("LLMTemplate", __name__)

@LLMTemplate.route("/")
def index():
    return "LLMTemplate!"

@LLMTemplate.route('/generate', methods=['POST'])
def generateContent():
    if request.method == 'POST':

        data = request.json
        # print(f"New request received! {data}")

        response = MODEL.generate_content(f'''This is a sample prompt.
                                          Return a random sentence. {data}''')
        
        return {"response": response.text}

    else:
        return "Hit this endpoint with a POST request | LLMTemplate"