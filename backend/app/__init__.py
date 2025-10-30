from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .database import db
from .models import Task
from .routes import api
from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)

    app.register_blueprint(api)

    @app.route('/')
    def home():
        return jsonify({'ok': True, 'message': 'Task Tracker API'})

    return app
