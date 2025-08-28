from flask import Flask, render_template, request, redirect, url_for
import uuid
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


# Load environment variables from .env file


app = Flask(__name__)


# Gmail SMTP configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SENDER_EMAIL = "abhiamith2000@gmail.com"
SENDER_PASSWORD = "wjod mwop hjao loqw"

@app.route('/')
def portofolio():
    return render_template("new.html")

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    message = request.form['message']

    # Save form data to the database
    # try:
    #     conn = mysql.connector.connect(**db_config)
    #     cursor = conn.cursor()
    #     cursor.execute(
    #         "INSERT INTO contact (name, email, phone, message) VALUES (%s, %s, %s, %s)",
    #         (name, email, phone, message)
    #     )
    #     conn.commit()
    #     cursor.close()
    #     conn.close()
    # except mysql.connector.Error as err:
    #     print("Database error:", err)
    #     return f"Something went wrong: {err}", 500

    # Send email using Gmail SMTP
    try:
        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = 'abhiamith2000@gmail.com'  # Your email to receive form submissions
        msg['Subject'] = f'New Contact Form Submission from {name}'
        
        body = f"""
        Name: {name}
        Email: {email}
        Phone: {phone if phone else 'Not provided'}
        Message: {message}
        """
        msg.attach(MIMEText(body, 'plain'))

        # Connect to Gmail SMTP server
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Enable TLS
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(SENDER_EMAIL, 'abhiamith2000@gmail.com', msg.as_string())
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")
        return "An error occurred while sending the email.", 500

    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
