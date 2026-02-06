// ULTRA SIMPLE TRANSLATE - Kozan Emre
console.log("🌍 Translate loaded");

// 1. GOOGLE TRANSLATE EINFACH LADEN
function loadGoogleTranslate() {
    // Prüfen ob bereits geladen
    if (document.getElementById('google_translate_element')) {
        console.log("Translate bereits geladen");
        return;
    }
    
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
    
    // Google Script laden (nur wenn nicht bereits vorhanden)
    if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
        document.head.appendChild(script);
    }
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
        hideGoogleBanner();
        
        // Nach kurzer Zeit prüfen ob Widget da ist
        setTimeout(checkTranslateWidget, 500);
        setTimeout(checkTranslateWidget, 1500);
    }
}

// 3. GOOGLE BANNER AUSBLENDEN
function hideGoogleBanner() {
    const banner = document.querySelector('.goog-te-banner-frame');
    if (banner) banner.style.display = 'none';
    
    const banner2 = document.querySelector('.goog-te-banner');
    if (banner2) banner2.style.display = 'none';
    
    // Body Position korrigieren
    document.body.style.top = '0';
    
    // Alle skiptranslate Elemente ausblenden
    document.querySelectorAll('.skiptranslate').forEach(el => {
        if (!el.querySelector('.goog-te-combo')) {
            el.style.display = 'none';
        }
    });
}

// 4. WIDGET PRÜFEN UND SPRACHE SETZEN
function checkTranslateWidget() {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        console.log("✅ Translate Widget gefunden");
        
        // Event Listener für Sprachwechsel
        select.addEventListener('change', function() {
            console.log("Sprache geändert zu:", this.value);
            updateButtons(this.value);
            saveLanguage(this.value);
            hideGoogleBanner();
        });
        
        // Gespeicherte Sprache laden und anwenden
        const savedLang = getSavedLanguage();
        if (savedLang && savedLang !== 'de' && select.value !== savedLang) {
            console.log("Setze gespeicherte Sprache:", savedLang);
            select.value = savedLang;
            select.dispatchEvent(new Event('change'));
        }
        
        // Buttons aktualisieren
        updateButtons(select.value || 'de');
        
        // Banner nochmal ausblenden (manchmal erscheint er verzögert)
        setTimeout(hideGoogleBanner, 100);
        setTimeout(hideGoogleBanner, 500);
    } else {
        console.log("❌ Translate Widget nicht gefunden, versuche erneut...");
        setTimeout(checkTranslateWidget, 1000);
    }
}

// 5. BUTTONS UPDATEN
function updateButtons(lang) {
    if (!lang) lang = 'de';
    
    // Flaggen-Buttons aktualisieren
    document.querySelectorAll('.flag-btn').forEach(btn => {
        // data-lang Attribut prüfen (neuer Standard)
        const btnLang = btn.getAttribute('data-lang');
        // oder aus onclick extrahieren (alter Standard)
        const onclickLang = btn.onclick ? btn.onclick.toString().match(/'(\w+)'/)?.[1] : null;
        
        const currentLang = btnLang || onclickLang;
        
        if (currentLang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Mobile Select aktualisieren
    const mobileSelect = document.querySelector('.language-selector-mobile select');
    if (mobileSelect && mobileSelect.value !== lang) {
        mobileSelect.value = lang;
    }
    
    // RTL für Arabisch
    if (lang === 'ar') {
        document.body.style.direction = 'rtl';
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.style.direction = 'ltr';
        document.body.setAttribute('dir', 'ltr');
    }
}

// 6. SPRACHE WECHSELN
function translateTo(lang) {
    console.log("Changing to:", lang);
    
    // Google Translate verwenden
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
        saveLanguage(lang);
        updateButtons(lang);
        hideGoogleBanner();
    } else {
        console.log("Select nicht gefunden, warte...");
        // Widget noch nicht da, warten und nochmal versuchen
        setTimeout(() => translateTo(lang), 500);
    }
}

// 7. SPRACHE SPEICHERN (Cookie + localStorage)
function saveLanguage(lang) {
    // Cookie setzen
    document.cookie = `googtrans=/de/${lang};path=/;domain=${window.location.hostname}`;
    document.cookie = `googtrans=/de/${lang};path=/`;
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
    
    // localStorage als Backup
    try {
        localStorage.setItem('koz_selected_lang', lang);
    } catch(e) {}
    
    console.log("Sprache gespeichert:", lang);
}

// 8. GESPEICHERTE SPRACHE LADEN
function getSavedLanguage() {
    // Zuerst Cookie prüfen
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'googtrans') {
            const match = value.match(/\/de\/(\w+)/);
            if (match) return match[1];
        }
        if (name === 'lang') {
            return value;
        }
    }
    
    // Dann localStorage
    try {
        const stored = localStorage.getItem('koz_selected_lang');
        if (stored) return stored;
    } catch(e) {}
    
    return 'de';
}

// 9. EVENT LISTENER FÜR BUTTONS SETZEN
function setupEventListeners() {
    // Flaggen-Buttons
    document.querySelectorAll('.flag-btn').forEach(btn => {
        // Entferne alte Event Listener (falls vorhanden)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Neuen Listener hinzufügen
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang') || 
                        this.onclick?.toString().match(/'(\w+)'/)?.[1];
            if (lang) translateTo(lang);
        });
    });
    
    // Mobile Select
    const mobileSelect = document.querySelector('.language-selector-mobile select');
    if (mobileSelect) {
        // Entferne alte Listener
        const newSelect = mobileSelect.cloneNode(true);
        mobileSelect.parentNode.replaceChild(newSelect, mobileSelect);
        
        // Neuen Listener
        newSelect.addEventListener('change', function() {
            translateTo(this.value);
        });
    }
}

// 10. INITIALISIERUNG
function initTranslate() {
    console.log("Starting translate...");
    
    // Event Listener für Buttons setzen
    setupEventListeners();
    
    // Google Translate laden
    loadGoogleTranslate();
    
    // Prüfen ob Google Translate bereits initialisiert ist
    if (typeof google !== 'undefined' && google.translate) {
        googleTranslateInit();
    }
    
    // Mehrfache Prüfung für zuverlässigkeit
    setTimeout(checkTranslateWidget, 1000);
    setTimeout(checkTranslateWidget, 2000);
    setTimeout(hideGoogleBanner, 500);
    setTimeout(hideGoogleBanner, 1500);
    setTimeout(hideGoogleBanner, 3000);
}

// STARTEN
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslate);
} else {
    initTranslate();
}

// Bei Navigation (für Single Page Applications oder schnelle Wechsel)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Seite wurde aus dem Cache geladen
        console.log("Seite aus Cache geladen, reinitialisiere...");
        setTimeout(initTranslate, 100);
    }
});

// MutationObserver für dynamische Änderungen
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            // Prüfen ob Google Translate Elemente hinzugefügt wurden
            const banner = document.querySelector('.goog-te-banner-frame');
            if (banner && banner.style.display !== 'none') {
                hideGoogleBanner();
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Globale Funktionen
window.translateTo = translateTo;
window.googleTranslateInit = googleTranslateInit;

console.log("✅ Translate System bereit");
