from flask import Flask, request, jsonify, send_from_directory
import subprocess
import os
import sys
import threading

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/launch-app', methods=['POST'])
def launch_app():
    try:
        # Get the path to the Python executable
        python_executable = sys.executable
        
        # Get the path to the DrawToDesign.py script
        script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'DrawToDesign.py')
        
        # Launch the application in a separate thread to avoid blocking
        def run_app():
            subprocess.Popen([python_executable, script_path], 
                            stdout=subprocess.PIPE, 
                            stderr=subprocess.PIPE)
        
        threading.Thread(target=run_app).start()
        
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/launch-tryon', methods=['POST'])
def launch_tryon():
    try:
        # Get the path to the Python executable
        python_executable = sys.executable
        
        # Get the path to the ClothTryOnpredict.py script
        script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ClothTryOnpredict.py')
        
        # Check if there are any generated designs to try on
        designs_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'generated_designs')
        garment_path = None
        
        if os.path.exists(designs_dir) and os.listdir(designs_dir):
            # Use the most recent design as the default garment
            designs = sorted(
                [os.path.join(designs_dir, f) for f in os.listdir(designs_dir) if f.endswith(('.png', '.jpg'))],
                key=os.path.getmtime,
                reverse=True
            )
            if designs:
                garment_path = designs[0]
        
        # If no generated designs found, use a default t-shirt image if available
        if not garment_path:
            default_garment = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'default_tshirt.png')
            if os.path.exists(default_garment):
                garment_path = default_garment
            else:
                return jsonify({"success": False, "error": "No garment images found. Please create a design first or run create_default_tshirt.py to generate a default t-shirt."})
        
        # Launch the try-on application in a separate thread to avoid blocking
        def run_tryon():
            subprocess.Popen([
                python_executable, 
                script_path, 
                '--garment', garment_path
            ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        threading.Thread(target=run_tryon).start()
        
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True) 