// Kozan Emre Website - Übersetzungsfunktion mit Google Translate
console.log("🌍 Übersetzungsfunktion geladen");

// Unterstützte Sprachen (9 Sprachen)
const SUPPORTED_LANGUAGES = {
    'de': { name: 'Deutsch', flag: '🇩🇪' },
    'en': { name: 'English', flag: '🇬🇧' },
    'tr': { name: 'Türkçe', flag: '🇹🇷' },
    'hr': { name: 'Hrvatski', flag: '🇭🇷' },
    'sr': { name: 'Српски', flag: '🇷🇸' },
    'bs': { name: 'Bosanski', flag: '🇧🇦' },
    'ar': { name: 'العربية', flag: '🇸🇦' },
    'fr': { name: 'Français', flag: '🇫🇷' },
    'es': { name: 'Español', flag: '🇪🇸' }
};

// Cookie-Funktionen
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

// Google Translate Initialisierung
function googleTranslateElementInit() {
    console.log("Google Translate wird initialisiert...");
    
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'de,en,tr,hr,sr,bs,ar,fr,es',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        disableAutoTranslation: true
    }, 'google_translate_element');
    
    // Sprachpräferenz aus Cookie laden
    setTimeout(() => {
        loadSavedLanguage();
        setupTranslationEvents();
    }, 1000);
}

// Sprache per JavaScript setzen
function translateTo(language) {
    console.log("Wechsle Sprache zu:", language);
    
    if (typeof google !== 'undefined' && google.translate) {
        const selectField = document.querySelector(".goog-te-combo");
        if (selectField) {
            selectField.value = language;
            selectField.dispatchEvent(new Event('change'));
            updateFlagButtons(language);
            saveLanguagePreference(language);
            applyRTL(language);
        }
    } else {
        console.error("Google Translate nicht geladen");
        // Fallback: Cookie setzen
        saveLanguagePreference(language);
    }
}

// Flag-Buttons aktualisieren
function updateFlagButtons(language) {
    document.querySelectorAll('.flag-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnLang = btn.getAttribute('data-lang') || 
                       btn.onclick?.toString().match(/translateTo\('(\w+)'\)/)?.[1];
        
        if (btnLang === language) {
            btn.classList.add('active');
        }
    });
}

// Sprachpräferenz speichern
function saveLanguagePreference(language) {
    setCookie('preferred_language', language, 365);
    setCookie('translation_cookie_accepted', 'true', 365);
}

// RTL für Arabisch anwenden
function applyRTL(language) {
    if (language === 'ar') {
        document.body.style.direction = 'rtl';
        document.body.classList.add('rtl-text');
    } else {
        document.body.style.direction = 'ltr';
        document.body.classList.remove('rtl-text');
    }
}

// Gespeicherte Sprache laden
function loadSavedLanguage() {
    const savedLang = getCookie('preferred_language');
    const browserLang = navigator.language?.split('-')[0];
    
    if (savedLang && savedLang !== 'de') {
        console.log("Lade gespeicherte Sprache:", savedLang);
        translateTo(savedLang);
    } else if (browserLang && browserLang !== 'de' && SUPPORTED_LANGUAGES[browserLang]) {
        console.log("Browser-Sprache erkannt:", browserLang);
        // Kein automatischer Wechsel, nur Cookie setzen
        saveLanguagePreference(browserLang);
    }
}

// Events für Übersetzungsänderungen einrichten
function setupTranslationEvents() {
    // Polling für Sprachänderungen
    let lastLang = '';
    setInterval(() => {
        const select = document.querySelector('.goog-te-combo');
        if (select && select.value !== lastLang) {
            lastLang = select.value;
            updateFlagButtons(lastLang);
            applyRTL(lastLang);
            saveLanguagePreference(lastLang);
        }
    }, 500);
}

// Cookie-Banner für Übersetzung (DSGVO)
function showCookieBanner() {
    // Prüfen ob bereits akzeptiert wurde
    if (getCookie('translation_cookie_accepted')) return;
    
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <p>🌍 Diese Website verwendet Google Translate für Übersetzungen.</p>
        <div class="cookie-buttons">
            <button onclick="acceptTranslationCookies()" class="cookie-btn primary">Akzeptieren</button>
            <button onclick="declineTranslationCookies()" class="cookie-btn">Ablehnen</button>
        </div>
    `;
    
    document.body.appendChild(banner);
}

function acceptTranslationCookies() {
    setCookie('translation_cookie_accepted', 'true', 365);
    const banner = document.querySelector('.cookie-banner');
    if (banner) banner.remove();
}

function declineTranslationCookies() {
    setCookie('translation_cookie_accepted', 'false', 365);
    const banner = document.querySelector('.cookie-banner');
    if (banner) banner.remove();
    // Google Translate Widget ausblenden
    const translateDiv = document.getElementById('google_translate_element');
    if (translateDiv) translateDiv.style.display = 'none';
}

// Initialisierung beim Laden
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initialisiere Übersetzungsfunktion...");
    
    // Cookie-Banner anzeigen (optional, kann auskommentiert werden)
    // showCookieBanner();
    
    // Google Translate Script dynamisch laden
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
    
    // Flag-Buttons erstellen (falls nicht in HTML vorhanden)
    createFlagButtonsIfNeeded();
    
    // CSS für Animationen hinzufügen
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

// Flag-Buttons erstellen (falls nicht in HTML vorhanden)
function createFlagButtonsIfNeeded() {
    // Prüfen ob bereits Flag-Buttons existieren
    if (document.querySelector('.language-flags')) return;
    
    // Container finden (z.B. in der Navigation oder im Content)
    const content = document.querySelector('.content');
    
    if (content && !document.querySelector('.language-flags')) {
        const flagsContainer = document.createElement('div');
        flagsContainer.className = 'language-flags fade-in';
        flagsContainer.innerHTML = `
            <p style="width:100%; margin-bottom:10px; color:var(--muted);">Sprache wählen:</p>
            ${Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => `
                <button class="flag-btn" onclick="translateTo('${code}')">
                    <span class="flag">${lang.flag}</span>
                    <span>${lang.name}</span>
                </button>
            `).join('')}
        `;
        
        content.insertBefore(flagsContainer, content.firstChild.nextSibling);
    }
}

// Globale Funktionen verfügbar machen
window.translateTo = translateTo;
window.acceptTranslationCookies = acceptTranslationCookies;
window.declineTranslationCookies = declineTranslationCookies;