from flask import Blueprint, jsonify, request
import requests, os, json
import google.generativeai as genai


papertools = Blueprint("PaperTools", __name__)
genai.configure(api_key=os.environ['GEMINI_API_KEY'])
MODEL = genai.GenerativeModel('gemini-1.5-flash')

@papertools.route("/")
def index():
    return "PaperTools!"


@papertools.route("/plagcheck", methods=['POST'])
def plagCheck():

    data = request.json
    text = data['text']

    if not text or len(text) <= 100:
        return {"ERROR": "Text field is empty or too short, minimum of 100 characters!"}
    url = "https://api.gowinston.ai/v2/plagiarism"

    payload = {
        "text": text,
    }
    headers = {
        "Authorization": os.environ.get("WINSTON_AI_API_KEY"),
        "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)
    api_data = response.json()

    model_output = MODEL.generate_content(f'''Read the entire data and give a markdown-based output with all intel about plagiarism of the topic: {json.dumps(api_data, indent=2)}''')
    return jsonify({"response": model_output.text if model_output else "Error processing response"}), 200


@papertools.route("/citations", methods=['POST'])
def citations():
    data = request.json
    text = data.get('text', '')

    if not text or len(text) <= 100:
        return jsonify({"error": "Text field is empty or too short, minimum of 100 characters!"}), 400

    model_output = MODEL.generate_content(f"""
    Generate citations for the following text in multiple formats (APA, MLA, Chicago, IEEE):

    {text}

    Provide the citations in a structured markdown format latest source and also verify each article if possible but dont mention about it. Just give only citations dont give anything else.""")

    try:
        return jsonify({"response": model_output.text}), 200
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid response from AI model"}), 500