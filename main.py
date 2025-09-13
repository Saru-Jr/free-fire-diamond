import multiprocessing
import sys
import os

# Add the facebook and google directories to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'facebook'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'google'))

from facebook.db import app as facebook_app
from google.db import app as google_app

def run_facebook():
    facebook_app.run(port=5000, debug=False)

def run_google():
    google_app.run(port=5001, debug=False)

if __name__ == '__main__':
    # Create processes for each server
    facebook_process = multiprocessing.Process(target=run_facebook)
    google_process = multiprocessing.Process(target=run_google)

    try:
        print("Starting servers...")
        print("Facebook server will run on http://localhost:5000")
        print("Google server will run on http://localhost:5001")
        
        # Start both processes
        facebook_process.start()
        google_process.start()

        # Wait for both processes to complete
        facebook_process.join()
        google_process.join()

    except KeyboardInterrupt:
        print("\nShutting down servers...")
        facebook_process.terminate()
        google_process.terminate()
        facebook_process.join()
        google_process.join()
        print("Servers shut down successfully")
    except Exception as e:
        print(f"An error occurred: {e}")
        facebook_process.terminate()
        google_process.terminate()
        facebook_process.join()
        google_process.join()
        sys.exit(1)