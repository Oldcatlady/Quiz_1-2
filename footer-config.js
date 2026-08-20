/**
 * footer-config.js — Konfiguration für den globalen Footer
 * -----------------------------------------------------------
 * Diese Datei enthält NUR Daten, keine Logik. Wenn sich ein Link
 * ändert oder ein neuer Punkt (z. B. "Kontakt") dazukommt, wird
 * NUR diese Datei angepasst — footer-app.js bleibt unberührt.
 *
 * Muss VOR footer-app.js geladen werden (siehe footer-readme.md).
 */
window.FOOTER_CONFIG = {
    seitenname: 'Lern-Hub',

    // Absolute Pfade ab Domain-Root — funktionieren unabhängig davon,
    // aus welchem Unterpfad die aktuelle Seite aufgerufen wird.
    links: [
        { text: 'Impressum', href: '/footer-impressum.html' },
        { text: 'AGB', href: '/footer-agb.html' },
        { text: 'Datenschutzerklärung', href: '/footer-datenschutz.html' }
    ]

    // Erweiterung später z. B.:
    // { text: 'Kontakt', href: '/footer-kontakt.html' }
};