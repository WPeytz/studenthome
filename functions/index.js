const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.addToWaitlist = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body;

      await admin.firestore().collection('waitlist').add({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).send('Success');
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      res.status(500).send('Error saving data');
    }
  });
});