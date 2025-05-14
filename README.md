# StudentHome

StudentHome is a web-based platform that helps university students find housing more easily by connecting them with relevant housing opportunities based on preferences like budget, type of housing, and university affiliation.

## 🚀 Features

- Waitlist form with fields for:
  - Email
  - University
  - Housing type
  - Budget
  - Additional preferences
- Firebase backend with Firestore for data storage
- Firebase Cloud Function to handle form submissions
- Responsive landing page built with Vue.js
- Deployed on Google Cloud Run
- Custom domain support (e.g. `studenthome.dk`)

## 🧑‍💻 Tech Stack

- **Frontend**: Vue.js (with optional TailwindCSS)
- **Backend**: Firebase Functions + Firestore
- **Hosting**: Google Cloud Run + Docker
- **Domain**: studenthome.dk

## 📦 Project Structure
StudentHome/
├── frontend/          # Vue.js app
├── functions/         # Firebase backend functions
├── firebase.json
├── .firebaserc
└── README.md

## 🛠 Local Development

### Frontend
'''bash
cd frontend
npm install
npm run dev
'''

### Firebase Functions
'''bash
cd functions
npm install
firebase emulators:start
'''

## Deploy Functions
'''bash
firebase deploy --only functions
'''

## Build & Deploy Frontend to Cloud Run
'''bash
cd frontend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/frontend
gcloud run deploy frontend --image gcr.io/YOUR_PROJECT_ID/frontend --platform managed --region europe-west1
'''

✉️ Contributing

Feel free to fork the repo and submit PRs with improvements, fixes, or new features!

📄 License

MIT — do what you want, but don’t blame me if it breaks.


Made by @WPeytz