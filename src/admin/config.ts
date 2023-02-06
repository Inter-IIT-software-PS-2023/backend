import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import serviceAccount from "./serviceAccountKey.json"

export default initializeApp({
    credential: credential.cert(serviceAccount as ServiceAccount),
})