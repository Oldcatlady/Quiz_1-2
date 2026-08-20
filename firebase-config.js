// ============================================================
// firebase-config.js
// ------------------------------------------------------------
// Zentrale Firebase-Konfiguration.
// Diese Datei enthält nur die Konfiguration.
// Firebase selbst wird in login.html bzw. quiz.html gestartet.
// ============================================================

export const firebaseConfig = {
    apiKey: "AIzaSyD7z0I4FKP9r4tBA8bLIwfznhuaXCMxKUg",
    authDomain: "quiz-1-1be57.firebaseapp.com",
    projectId: "quiz-1-1be57",
    storageBucket: "quiz-1-1be57.firebasestorage.app",
    messagingSenderId: "378158677393",
    appId: "1:378158677393:web:a7ec0f15a229a321072e30"
};

// Site-Key für Firebase App Check.
// Falls App Check noch nicht eingerichtet ist, lassen wir
// diesen Platzhalter zunächst bestehen.
export const recaptchaSiteKey = "6Lf2NIEtAAAAAKx2qnXJrOc5cy0DlEkKe3JlcfCl";