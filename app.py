from flask import Flask, render_template, jsonify, request
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
import matplotlib.pyplot as plt
import sqlite3
import base64
from io import BytesIO
import pickle

# Create an SQLAlchemy engine and session
engine = create_engine("sqlite:///data/DataBAse.db")
Base = automap_base()
Base.prepare(engine, reflect=True)
Table1 = Base.classes.DataBase


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

    unique_makes = [results[0] for results in top_makes_and_models]
    unique_models = [results[1] for results in top_makes_and_models]

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

@app.route("/model", methods=["POST"])
def model():
    try:
        # Get the selected values from the AJAX request
        selected_make = request.form.get("make")
        selected_model = request.form.get("model")
        selected_year = request.form.get("year")
        selected_mileage = request.form.get("mileage")

        # Perform any necessary processing with the selected values
        # For example, use them in your machine learning model or database queries

        X = [[selected_make, selected_model, selected_year, selected_mileage]]
        print(X)
        
        # Add this line to see if the server is receiving the data correctly
        print(f"Received data: {selected_make}, {selected_model}, {selected_year}, {selected_mileage}")

        filename = 'data/gb_regressor_final_model.sav'
        loaded_model = pickle.load(open(filename, 'rb'))

        prediction = loaded_model.predict(X)[0][0]
        prediction = "${0:,.2f}".format(prediction)
        print(prediction)

        # Return the prediction in the JSON response
        return jsonify({"status": "success", "message": "Data received successfully", "prediction": prediction})

    except Exception as e:
        # Print the exception to the console for debugging
        print(f"An error occurred: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500  # Return a 500 Internal Server Error status
    

@app.route("/data")
def data():

    return render_template("/data.html")

@app.route("/index")
def index():

    return render_template("/index.html")

@app.route('/about')
def about():


    # Render the HTML template and pass the data for Chart.js
    return render_template("/about.html", chart_data=data)


if __name__ == '__main__':
    app.run(debug=True)