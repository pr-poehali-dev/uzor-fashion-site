"""
Отправляет социальный запрос от организации на email владельца UZOR через Яндекс SMTP.
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Invalid JSON"})}

    required = ["orgName", "orgType", "socialLink", "request", "contactName", "email"]
    for field in required:
        if not body.get(field):
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": f"Поле '{field}' обязательно"}, ensure_ascii=False),
            }

    yandex_email = os.environ.get("YANDEX_EMAIL", "")
    yandex_password = os.environ.get("YANDEX_APP_PASSWORD", "")

    if not yandex_email or not yandex_password:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Email не настроен. Добавьте секреты YANDEX_EMAIL и YANDEX_APP_PASSWORD"}),
        }

    garments = body.get("garments", [])
    garments_str = ", ".join(garments) if garments else "не указано"

    html = f"""
<html><body style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto;">
  <div style="border-top: 3px solid #C8A96E; padding: 30px 0;">
    <h2 style="font-size: 24px; font-weight: 300; letter-spacing: 0.1em; color: #C8A96E;">
      UZOR — Новый социальный запрос
    </h2>
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

    <h3 style="font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; font-weight: 400;">Об организации</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 8px 0; color: #888; width: 40%; font-size: 13px;">Название</td><td style="padding: 8px 0; font-size: 13px; font-weight: 500;">{body.get('orgName')}</td></tr>
      <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Тип</td><td style="padding: 8px 0; font-size: 13px;">{body.get('orgType')}</td></tr>
      <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Соцсеть</td><td style="padding: 8px 0; font-size: 13px;"><a href="{body.get('socialLink')}" style="color: #C8A96E;">{body.get('socialLink')}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Аудитория</td><td style="padding: 8px 0; font-size: 13px;">{body.get('followers') or 'не указано'}</td></tr>
    </table>

    <h3 style="font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; font-weight: 400;">Запрос</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 8px 0; color: #888; width: 40%; font-size: 13px;">Изделия</td><td style="padding: 8px 0; font-size: 13px;">{garments_str}</td></tr>
      <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Количество</td><td style="padding: 8px 0; font-size: 13px;">{body.get('quantity') or 'не указано'}</td></tr>
    </table>
    <div style="background: #f9f9f9; padding: 16px; border-left: 3px solid #C8A96E; margin-bottom: 20px;">
      <p style="margin: 0; font-size: 13px; line-height: 1.6;">{body.get('request')}</p>
    </div>

    <h3 style="font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; font-weight: 400;">Контакты</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #888; width: 40%; font-size: 13px;">Имя</td><td style="padding: 8px 0; font-size: 13px; font-weight: 500;">{body.get('contactName')}</td></tr>
      <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Телефон</td><td style="padding: 8px 0; font-size: 13px;">{body.get('phone') or 'не указан'}</td></tr>
      <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:{body.get('email')}" style="color: #C8A96E;">{body.get('email')}</a></td></tr>
    </table>
  </div>
</body></html>
"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"UZOR: Социальный запрос от «{body.get('orgName')}»"
    msg["From"] = yandex_email
    msg["To"] = yandex_email
    msg["Reply-To"] = body.get("email", yandex_email)
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(yandex_email, yandex_password)
        server.sendmail(yandex_email, yandex_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "message": "Запрос успешно отправлен"}),
    }