from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)

MAILJET_API_KEY = os.getenv("MAILJET_API_KEY")
MAILJET_SECRET_KEY = os.getenv("MAILJET_SECRET_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")  # must be verified in Mailjet

@app.route("/")
def home():
    return "Mailjet backend is running 🚀"

@app.route("/send-email", methods=["POST"])
def send_email():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return jsonify({"error": "All fields are required"}), 400

        url = "https://api.mailjet.com/v3.1/send"

        payload = {
            "Messages": [
                {
                    "From": {
                        "Email": SENDER_EMAIL,
                        "Name": "Website Contact"
                    },
                    "To": [
                        {
                            "Email": SENDER_EMAIL,
                            "Name": "Site Owner"
                        }
                    ],
                    "Subject": f"New message from {name}",
                    "TextPart": f"""
Name: {name}
Email: {email}
Message:
{message}
"""
                }
            ]
        }

        response = requests.post(
            url,
            auth=(MAILJET_API_KEY, MAILJET_SECRET_KEY),
            json=payload
        )

        if response.status_code == 200:
            print("✅ Email sent via Mailjet")
            return jsonify({"success": True, "message": "Email sent"})
        else:
            print("❌ Mailjet Error:", response.text)
            return jsonify({"error": response.text}), 500

    except Exception as e:
        print("❌ ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
