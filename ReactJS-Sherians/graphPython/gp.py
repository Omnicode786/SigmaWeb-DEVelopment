from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/generate_graph')
def generate_graph():
    # Example data
    x = [1, 2, 3, 4]
    y = [1, 4, 9, 16]
    
    # Create the plot
    plt.plot(x, y)
    plt.xlabel('X Axis')
    plt.ylabel('Y Axis')
    plt.title('Sample Graph')

    # Save to a BytesIO object
    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    plt.close()

    # Encode the image to base64
    img_base64 = base64.b64encode(img_bytes.getvalue()).decode('utf-8')
    
    # Data to return
    data = {
        'x': x,
        'y': y,
        'graph': img_base64
    }
    
    # Return the data and graph as JSON
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
