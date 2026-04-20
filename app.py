from flask import Flask, request, jsonify
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

EMAIL_USER = os.environ.get("EMAIL_USER")
EMAIL_PASS = os.environ.get("EMAIL_PASS")

@app.route("/")
def home():
    return {"status": "API is running"}

@app.route("/send-email", methods=["POST"])
def send_email():
    data = request.json

    recipient = data.get("to")
    subject = data.get("subject")
    body = data.get("message")

    if not recipient or not subject or not body:
        return jsonify({"error": "Missing fields"}), 400

    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_USER
        msg["To"] = recipient
        msg["Subject"] = subject

        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)
        server.quit()

        return jsonify({"message": "Email sent successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Render provides PORT env variable
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)