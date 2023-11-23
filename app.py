from flask import Flask, render_template,jsonify 
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
import matplotlib.pyplot as plt
import base64
from io import BytesIO

# Create an SQLAlchemy engine and session
engine = create_engine("sqlite:///data/DataBAse.db")
Base =automap_base()
Base.prepare(engine,reflect=True)
Table1=Base.classes.DataBase

#---------------------------------------------------------------------------------------
# Create the Flask app
app = Flask(__name__)

    # Render the HTML template and pass the data for Chart.js
    #return render_template("index.html", chart_data=data)
@app.route('/')
def home():
    # Render the HTML template and pass the data for Chart.js
    return render_template("index.html")

@app.route('/api/cars')
def cars():
    session = Session(engine)

    # Query the top 10 tracks by streams
    top_makes_and_models = session.query(Table1.Make, Table1.Model) \
                        .order_by(Table1.Make.desc()) \
                        .distinct()
    results = [list(t) for t in top_makes_and_models]

    table_results = {
        "table": results
    }

    session.close()
    return jsonify(table_results)







def prices():
    session = Session(engine)
    # Query the top 10 tracks by streams
    top_makes = session.query(Table1.Make)\
                        .order_by(Table1.Make.desc()) \
                        .all()
    top_models = session.query(Table1.Model)\
                        .order_by(Table1.Model.desc()) \
                        .all()
    print(top_models)
    #results = [list(t) for t in top_makes]
    #table_results = {
    #    "table": results
    #}
    session.close()
    #return jsonify(table_results)
    return render_template("index.html")

@app.route("/data")
def data():

    return render_template("/data.html")

@app.route('/about')
def about():


    # Render the HTML template and pass the data for Chart.js
    return render_template("/about.html", chart_data=data)


if __name__ == '__main__':
    app.run(debug=True)