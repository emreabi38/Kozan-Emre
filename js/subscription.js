// Kozan Emre - Subscription System
console.log("💰 Subscription System geladen");

// ===== 1. SUBSCRIPTION DATEN mit neuen Preisen =====
const SUBSCRIPTION_PLANS = {
    'basic': {
        name: 'Basic Website',
        deposit: 49,
        monthly: 9.90,
        features: [
            'Einfache 1-Seiten Website',
            'Responsive Design',
            'Hosting inklusive',
            'Kontaktformular',
            'Basis SEO',
            '10 Min/Monat Wartung'
        ]
    },
    'standard': {
        name: 'Standard Website',
        deposit: 74.90,
        monthly: 9.90,
        features: [
            'Moderne 1-3 Seiten Website',
            'Responsive Design',
            'Professionelles Hosting',
            'Kontaktformular',
            'Basis SEO',
            '15 Min/Monat Wartung'
        ]
    },
    'premium': {
        name: 'Premium Website',
        deposit: 124.90,
        monthly: 14.90,
        features: [
            'Alles aus Standard + mehr',
            'Bis zu 5 Seiten',
            'Kostenlose Domain (1 Jahr)',
            'Business Email',
            'Erweiterte SEO',
            '30 Min/Monat Premium-Wartung'
        ]
    }
};

// ===== 2. LOCAL STORAGE FUNCTIONS =====
function saveSubscription(data) {
    try {
        localStorage.setItem('koz_subscription', JSON.stringify(data));
        localStorage.setItem('koz_subscription_date', new Date().toISOString());
        console.log("✅ Subscription gespeichert:", data);
        return true;
    } catch (error) {
        console.error("❌ Fehler beim Speichern:", error);
        return false;
    }
}

function getSubscription() {
    try {
        const data = localStorage.getItem('koz_subscription');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("❌ Fehler beim Laden:", error);
        return null;
    }
}

function clearSubscription() {
    localStorage.removeItem('koz_subscription');
    localStorage.removeItem('koz_subscription_date');
    console.log("🗑️ Subscription gelöscht");
}

// ===== 3. PAYPAL PAYMENT HANDLING =====
function handleSubscriptionPayment(planType, paymentDetails) {
    console.log("💳 Verarbeite Zahlung für:", planType);
    
    const plan = SUBSCRIPTION_PLANS[planType];
    if (!plan) {
        console.error("❌ Unbekannter Plan:", planType);
        return false;
    }
    
    // PayPal.me Link erstellen
    const paypalMeLink = planType === 'premium' 
        ? 'https://www.paypal.com/paypalme/kozan885/14.90'
        : 'https://www.paypal.com/paypalme/kozan885/9.90';
    
    // Subscription Daten erstellen MIT PayPal.me
    const subscriptionData = {
        id: generateSubscriptionId(),
        plan: planType,
        planName: plan.name,
        customerName: paymentDetails.payer.name.given_name + ' ' + paymentDetails.payer.name.surname,
        customerEmail: paymentDetails.payer.email_address,
        deposit: plan.deposit,
        monthly: plan.monthly,
        startDate: new Date().toISOString(),
        nextBillingDate: getNextMonthDate(),
        status: 'active',
        paymentId: paymentDetails.id,
        features: plan.features,
        paypalMeLink: paypalMeLink
    };
    
    // Speichern
    if (saveSubscription(subscriptionData)) {
        // Erfolgsmeldung mit PayPal.me anzeigen
        showPayPalMeSuccess(planType, subscriptionData, paymentDetails);
        
        // Email Benachrichtigung (simuliert)
        sendSubscriptionEmail(subscriptionData);
        
        // Admin Benachrichtigung
        notifyAdmin(subscriptionData);
        
        return true;
    }
    
    return false;
}

// ===== 4. PAYPAL.ME ERFOLGSMELDUNG =====
function showPayPalMeSuccess(planType, subscriptionData, paymentDetails) {
    const plan = SUBSCRIPTION_PLANS[planType];
    const nextDate = new Date(subscriptionData.nextBillingDate);
    const formattedDate = nextDate.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    const developmentTime = planType === 'basic' ? '2-4 Tage' : (planType === 'standard' ? '3-7 Tage' : '5-10 Tage');
    const formattedDeposit = planType === 'basic' ? '49' : plan.deposit.toFixed(2);
    const formattedMonthly = plan.monthly.toFixed(2);
    
    // PayPal.me Link je nach Paket
    const paypalMeLink = planType === 'premium' 
        ? 'https://www.paypal.com/paypalme/kozan885/14.90'
        : 'https://www.paypal.com/paypalme/kozan885/9.90';
    
    const successHTML = `
        <div class="paypalme-success-container">
            <div class="success-header">
                <div class="success-icon">🎉</div>
                <h3>Willkommen im ${plan.name} Abonnement!</h3>
                <p>Deine Anzahlung wurde erfolgreich bezahlt.</p>
            </div>
            
            <div class="order-summary-box">
                <h4>📋 Bestelldetails</h4>
                <div class="details-grid">
                    <div class="detail-item">
                        <span class="label">Paket:</span>
                        <span class="value">${plan.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Anzahlung:</span>
                        <span class="value">${formattedDeposit}€ ✅</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Monatlich:</span>
                        <span class="value highlight">${formattedMonthly}€</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Kunde:</span>
                        <span class="value">${subscriptionData.customerName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Email:</span>
                        <span class="value">${subscriptionData.customerEmail}</span>
                    </div>
                </div>
            </div>
            
            <!-- PAYPAL.ME LINK SECTION -->
            <div class="paypalme-section">
                <h4>💳 Monatliche Zahlung mit PayPal.me</h4>
                
                <div class="paypalme-card">
                    <p><strong>Dein persönlicher Zahlungslink:</strong></p>
                    
                    <div class="link-display">
                        <div class="link-box">
                            <input type="text" readonly value="${paypalMeLink}" id="paypalme-link">
                            <button onclick="copyPayPalMeLinkToClipboard()" class="copy-btn">
                                <i class="fas fa-copy"></i> Kopieren
                            </button>
                        </div>
                        <small>Speichere diesen Link! Du brauchst ihn jeden Monat.</small>
                    </div>
                    
                    <div class="direct-pay">
                        <p><strong>Oder klicke direkt:</strong></p>
                        <a href="${paypalMeLink}" target="_blank" class="paypalme-btn">
                            <i class="fab fa-paypal"></i> Jetzt ${formattedMonthly}€ bezahlen
                        </a>
                    </div>
                </div>
                
                <div class="payment-schedule">
                    <h5>📅 Zahlungsplan</h5>
                    <div class="timeline">
                        <div class="timeline-item done">
                            <div class="timeline-icon">✅</div>
                            <div class="timeline-content">
                                <div class="timeline-title">Heute</div>
                                <div class="timeline-desc">Anzahlung bezahlt</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">📧</div>
                            <div class="timeline-content">
                                <div class="timeline-title">In 24h</div>
                                <div class="timeline-desc">Email mit Details</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">🚀</div>
                            <div class="timeline-content">
                                <div class="timeline-title">${developmentTime}</div>
                                <div class="timeline-desc">Website fertig</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">💰</div>
                            <div class="timeline-content">
                                <div class="timeline-title">${formattedDate}</div>
                                <div class="timeline-desc">Erste ${formattedMonthly}€ Zahlung</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- SUPPORT SECTION -->
            <div class="support-section">
                <h4>📞 Support & Kontakt</h4>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-user"></i>
                        <div>
                            <div class="contact-label">Dein Ansprechpartner</div>
                            <div class="contact-value">Kozan Emre</div>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <div>
                            <div class="contact-label">Telefon</div>
                            <a href="tel:+436701908115" class="contact-value">+43 670 1908 115</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <div class="contact-label">Email</div>
                            <a href="mailto:kozan.emre@icloud.com" class="contact-value">kozan.emre@icloud.com</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- IMPORTANT INFO -->
            <div class="important-info">
                <h5>⚠️ Wichtige Informationen</h5>
                <ul>
                    <li>• Dein Abonnement läuft <strong>monatlich</strong></li>
                    <li>• Du bezahlst jeden Monat über den PayPal.me Link</li>
                    <li>• Kündigung jederzeit mit 30 Tagen Frist</li>
                    <li>• Rechnungen werden automatisch von PayPal erstellt</li>
                    <li>• Bei Problemen: Kontaktiere mich direkt</li>
                </ul>
            </div>
            
            <!-- ACTIONS -->
            <div class="success-actions">
                <button onclick="sendLinkByEmail('${subscriptionData.customerEmail}', '${paypalMeLink}', ${plan.monthly})" class="action-btn email-btn">
                    <i class="fas fa-paper-plane"></i> Link per Email senden
                </button>
                <button onclick="window.print()" class="action-btn print-btn">
                    <i class="fas fa-print"></i> Seite drucken
                </button>
                <a href="contact.html" class="action-btn contact-btn">
                    <i class="fas fa-comment"></i> Fragen stellen
                </a>
            </div>
        </div>
    `;
    
    // Finde den richtigen Container
    let buttonContainer;
    if (planType === 'basic') {
        buttonContainer = document.querySelector('#paypal-button-basic');
    } else if (planType === 'standard') {
        buttonContainer = document.querySelector('#paypal-button-standard');
    } else {
        buttonContainer = document.querySelector('#paypal-button-premium');
    }
    
    if (buttonContainer) {
        const parent = buttonContainer.parentElement;
        parent.innerHTML = successHTML;
        
        // Scrollen zur Erfolgsmeldung
        setTimeout(() => {
            parent.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
    
    // Erfolgs-Notification
    showNotification('success', '✅ Abonnement erfolgreich aktiviert! PayPal.me Link erstellt.');
}

// ===== 5. HELPER FUNCTIONS =====
function generateSubscriptionId() {
    return 'SUB-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function getNextMonthDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function calculateMonthlyPrice(planType) {
    const plan = SUBSCRIPTION_PLANS[planType];
    return plan ? plan.monthly : 0;
}

// ===== 6. PAYPAL.ME HELPER FUNCTIONS =====
function copyPayPalMeLinkToClipboard() {
    const input = document.getElementById('paypalme-link');
    if (input) {
        input.select();
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value).then(() => {
            showNotification('success', '✅ PayPal.me Link kopiert!');
        });
    }
}

function sendLinkByEmail(email, link, amount) {
    const formattedAmount = amount.toFixed(2);
    const subject = `Dein PayPal.me Link - ${formattedAmount}€/Monat`;
    const body = `
Hallo!

Hier ist dein persönlicher PayPal.me Link für die monatlichen Zahlungen:

🔗 ${link}

So funktioniert's:
1. Klicke auf den Link oben
2. Bezahle ${formattedAmount}€
3. Das war's! Wiederhole dies jeden Monat

📅 Nächste Zahlung: In 30 Tagen
💶 Betrag: ${formattedAmount}€ pro Monat

Bei Fragen:
📞 +43 670 1908 115
📧 kozan.emre@icloud.com

Viele Grüße,
Kozan Emre
`;
    
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    showNotification('success', '📧 Email-Vorlage geöffnet - einfach senden!');
}

// ===== 7. EMAIL FUNCTIONS (Simuliert) =====
function sendSubscriptionEmail(subscription) {
    console.log("📧 Sende Bestätigungs-Email an:", subscription.customerEmail);
    
    const formattedDeposit = subscription.plan === 'basic' ? '49' : subscription.deposit.toFixed(2);
    const formattedMonthly = subscription.monthly.toFixed(2);
    
    // PayPal.me Link je nach Paket
    const paypalMeLink = subscription.plan === 'premium' 
        ? 'https://www.paypal.com/paypalme/kozan885/14.90'
        : 'https://www.paypal.com/paypalme/kozan885/9.90';
    
    // In einer echten Implementierung würde hier eine Email API aufgerufen
    const emailData = {
        to: subscription.customerEmail,
        subject: `Willkommen im ${subscription.planName} Abonnement!`,
        body: `
            Hallo ${subscription.customerName},
            
            Vielen Dank für deine Bestellung des ${subscription.planName} Pakets!
            
            📋 Bestelldetails:
            - Abo-ID: ${subscription.id}
            - Paket: ${subscription.planName}
            - Anzahlung: ${formattedDeposit}€
            - Monatlich: ${formattedMonthly}€
            - Nächste Zahlung: ${formatDate(subscription.nextBillingDate)}
            
            🔗 PAYPAL.ME LINK:
            ${paypalMeLink}
            
            ⚡ Nächste Schritte:
            1. Wir melden uns innerhalb von 24 Stunden mit einem Fragebogen
            2. Du erhältst Zugang zum Website-Editor
            3. Deine Website wird in ${subscription.plan === 'basic' ? '2-4' : (subscription.plan === 'standard' ? '3-7' : '5-10')} Tagen fertiggestellt
            
            📞 Bei Fragen:
            Telefon: +43 670 1908 115
            Email: kozan.emre@icloud.com
            
            Viele Grüße,
            Kozan Emre
            IT Developer
        `
    };
    
    console.log("Email würde gesendet werden:", emailData);
}

// ===== 8. NOTIFICATION SYSTEM =====
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `subscription-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 999999;
        background: ${type === 'success' ? 'rgba(0,255,0,0.1)' : type === 'error' ? 'rgba(255,0,0,0.1)' : 'rgba(0,123,255,0.1)'};
        border: 1px solid ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ===== 9. ADMIN NOTIFICATION =====
function notifyAdmin(subscription) {
    console.log("🔔 NEUE SUBSCRIPTION - ADMIN BENACHRICHTIGUNG");
    console.log("Abo-ID:", subscription.id);
    console.log("Kunde:", subscription.customerName);
    console.log("Email:", subscription.customerEmail);
    console.log("Paket:", subscription.planName);
    console.log("Monatlich:", subscription.monthly.toFixed(2) + "€");
    console.log("PayPal.me Link:", subscription.paypalMeLink);
}

// ===== 10. INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("💰 Subscription System initialisiert");
    
    // Check for existing subscription
    const subscription = getSubscription();
    if (subscription) {
        console.log("✅ Aktives Abonnement gefunden:", subscription.plan);
        
        // Show subscription badge if on pricing page
        if (window.location.pathname.includes('pricing.html')) {
            showSubscriptionBadge();
        }
    }
});

function showSubscriptionBadge() {
    const subscription = getSubscription();
    if (!subscription) return;
    
    const badge = document.createElement('div');
    badge.className = 'subscription-badge';
    badge.innerHTML = `
        <div class="badge-content">
            <span class="badge-icon">✅</span>
            <span class="badge-text">Aktives ${subscription.planName} Abonnement (${subscription.monthly.toFixed(2)}€/Monat)</span>
            <button onclick="showSubscriptionInfo()" class="badge-btn">Details</button>
        </div>
    `;
    
    badge.style.cssText = `
        background: rgba(0, 123, 255, 0.1);
        border: 1px solid #007bff;
        border-radius: 8px;
        padding: 15px;
        margin: 20px 0;
        text-align: center;
    `;
    
    const pricingHeader = document.querySelector('.pricing-header');
    if (pricingHeader) {
        pricingHeader.parentNode.insertBefore(badge, pricingHeader.nextSibling);
    }
}

function showSubscriptionInfo() {
    const subscription = getSubscription();
    if (!subscription) return;
    
    const paypalMeLink = subscription.plan === 'premium' 
        ? 'https://www.paypal.com/paypalme/kozan885/14.90'
        : 'https://www.paypal.com/paypalme/kozan885/9.90';
    
    alert(`
📋 Dein Abonnement:

Paket: ${subscription.planName}
Monatlich: ${subscription.monthly.toFixed(2)}€
PayPal.me Link: ${paypalMeLink}
Gestartet: ${formatDate(subscription.startDate)}
Nächste Zahlung: ${formatDate(subscription.nextBillingDate)}

📞 Kontakt:
+43 670 1908 115
kozan.emre@icloud.com
    `);
}

// ===== 11. GLOBAL FUNCTIONS =====
window.handleSubscriptionPayment = handleSubscriptionPayment;
window.copyPayPalMeLinkToClipboard = copyPayPalMeLinkToClipboard;
window.sendLinkByEmail = sendLinkByEmail;
window.showSubscriptionInfo = showSubscriptionInfo;

console.log("✅ Subscription System vollständig geladen");