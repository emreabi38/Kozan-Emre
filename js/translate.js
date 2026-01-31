// ULTRA SIMPLE TRANSLATE - Kozan Emre
console.log("🌍 Translate loaded");

// 1. GOOGLE TRANSLATE EINFACH LADEN
function loadGoogleTranslate() {
    // Widget Container erstellen
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none'; // Versteckt halten
    
    // In Navigation einfügen
    const nav = document.querySelector('.nav-links');
    if (nav) {
        const li = document.createElement('li');
        li.appendChild(div);
        nav.appendChild(li);
    }
    
    // Google Script laden
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
    document.head.appendChild(script);
}

// 2. GOOGLE INIT
function googleTranslateInit() {
    console.log("Google Translate ready");
    
    if (typeof google !== 'undefined' && google.translate) {
        new google.translate.TranslateElement({
            pageLanguage: 'de',
            includedLanguages: 'de,en,tr,hr,sr,bs,ar,fr,es',
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false
        }, 'google_translate_element');
        
        // Banner ausblenden
        const banner = document.querySelector('.goog-te-banner-frame');
        if (banner) banner.style.display = 'none';
        
        // Nach 2 Sekunden prüfen ob Widget da ist
        setTimeout(checkTranslateWidget, 2000);
    }
}

// 3. WIDGET PRÜFEN
function checkTranslateWidget() {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        console.log("✅ Translate Widget gefunden");
        // Event Listener für Sprachwechsel
        select.addEventListener('change', function() {
            console.log("Sprache geändert zu:", this.value);
            updateButtons(this.value);
        });
        
        // Gespeicherte Sprache laden
        loadSavedLanguage();
    } else {
        console.log("❌ Translate Widget nicht gefunden");
        // Nochmal versuchen
        setTimeout(checkTranslateWidget, 1000);
    }
}

// 4. BUTTONS UPDATEN
function updateButtons(lang) {
    // Flaggen-Buttons
    document.querySelectorAll('.flag-btn').forEach(btn => {
        const btnLang = btn.onclick.toString().match(/'(\w+)'/)?.[1];
        if (btnLang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Mobile Select
    const mobileSelect = document.querySelector('.language-selector-mobile select');
    if (mobileSelect) {
        mobileSelect.value = lang;
    }
    
    // Cookie speichern
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
}

// 5. SPRACHE WECHSELN
function translateTo(lang) {
    console.log("Changing to:", lang);
    
    // Google Translate verwenden
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
    } else {
        console.log("Select nicht gefunden, warte...");
        // Widget noch nicht da, warten
        setTimeout(() => translateTo(lang), 500);
    }
    
    // RTL für Arabisch
    if (lang === 'ar') {
        document.body.style.direction = 'rtl';
    } else {
        document.body.style.direction = 'ltr';
    }
}

// 6. GESPEICHERTE SPRACHE LADEN
function loadSavedLanguage() {
    // Aus Cookie lesen
    const cookies = document.cookie.split(';');
    let savedLang = 'de';
    
    for (let cookie of cookies) {
        if (cookie.includes('lang=')) {
            savedLang = cookie.split('=')[1].trim();
            break;
        }
    }
    
    // Anwenden wenn nicht Deutsch
    if (savedLang !== 'de') {
        console.log("Loading saved language:", savedLang);
        translateTo(savedLang);
    }
}

// 7. STARTEN
document.addEventListener('DOMContentLoaded', function() {
    console.log("Starting translate...");
    
    // 1. Google Translate laden
    loadGoogleTranslate();
    
    // 2. Event Listener für Buttons
    document.querySelectorAll('.flag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.onclick.toString().match(/'(\w+)'/)?.[1];
            if (lang) translateTo(lang);
        });
    });
    
    // 3. Event Listener für Mobile Select
    const mobileSelect = document.querySelector('.language-selector-mobile select');
    if (mobileSelect) {
        mobileSelect.addEventListener('change', function() {
            translateTo(this.value);
        });
    }
    
    // 4. Nach 3 Sekunden prüfen ob alles läuft
    setTimeout(function() {
        const select = document.querySelector('.goog-te-combo');
        if (!select) {
            console.log("⚠️ Translate not working, showing manual buttons");
            showManualButtons();
        }
    }, 3000);
});

// 8. FALLBACK WENN GOOGLE NICHT FUNKTIONIERT
function showManualButtons() {
    console.log("Showing manual translation options");
    
    // Einfachen Text anzeigen
    const warning = document.createElement('div');
    warning.style.cssText = `
        background: #ffeb3b;
        color: #000;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        text-align: center;
    `;
    warning.innerHTML = `
        <p>🌍 Für Übersetzung: Rechtsklick → "Übersetzen mit Google"</p>
        <p>Oder besuche: <a href="https://translate.google.com" target="_blank">translate.google.com</a></p>
    `;
    
    document.querySelector('.content').prepend(warning);
}

// Globale Funktion
window.translateTo = translateTo;
window.googleTranslateInit = googleTranslateInit;