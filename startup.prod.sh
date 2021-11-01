export USE_MOCK_ANALYSIS_SERVICE="false"
source ./sentiment-service/venv/Scripts/activate
/c/Users/anike/AppData/Roaming/npm/concurrently "cd react-client && npm start" "cd main-service && npm start" "cd sentiment-service && python main.py"
