import csv
import requests

def read_csv_and_call_api(csv_file_path, api_url, auth_token):
    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        # Iterate over each row in the CSV
        for row in reader:
            # Extract specific columns from CSV
            column1 = row.get('column1')  # Adjust these column names based on your CSV structure
            column2 = row.get('column2')
            column3 = row.get('column3')

            # Prepare the payload for the API request
            payload = {
                "amount": column1,
                "reason": column2,
                "field3": column3,
            }

            # Set up the headers including the Authorization token
            headers = {
                "Authorization": f"Bearer {auth_token}",
                "Content-Type": "application/json",
            }

            # Make the POST request to the API
            try:
                response = requests.post(api_url, json=payload, headers=headers)
                
                # Check the response status
                if response.status_code == 200:
                    print(f"Success for row {row}: {response.json()}")
                else:
                    print(f"Failed for row {row}: Status Code {response.status_code}, Response: {response.text}")
            
            except requests.RequestException as e:
                print(f"Error for row {row}: {str(e)}")

# Define the file path, API URL, and the auth token
csv_file_path = 'data.csv'  # Path to your CSV file
api_url = 'https://example.com/api/endpoint'  # Replace with your actual API endpoint
auth_token = 'your_auth_token_here'  # Replace with your actual authentication token

# Call the function
read_csv_and_call_api(csv_file_path, api_url, auth_token)
