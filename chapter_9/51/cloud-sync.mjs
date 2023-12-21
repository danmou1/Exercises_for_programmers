import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue, Filter } from "firebase-admin/firestore";
import * as fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync("../../SERVICE_ACCOUNT_KEY.json"));

const app = initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore(app);