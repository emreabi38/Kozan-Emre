// PayPal Integration für Kozan Emre - MIT PAYPAL.ME SYSTEM
// PayPal.me Link: https://www.paypal.com/paypalme/kozan885
console.log("💰 PayPal Integration mit PayPal.me geladen");

// Deine PayPal Client ID
const PAYPAL_CLIENT_ID = 'AcaqyDsXwMmP6-XZlpva2j3TH08kHYrznsxbHoyGTzwGt7BoNM1B804jweBylRrCLJUah83PEPqGzNRT';

// PayPal.me Handling
function handlePayPalPayment(planType, details) {
    console.log("💳 PayPal Zahlung abgeschlossen für:", planType);
    
    // 1. PayPal.me Link erstellen und anzeigen
    showPayPalMeSuccess(planType, details);
    
    // 2. Email an dich senden (Admin Notification)
    sendAdminNotification(planType, details);
    
    // 3. Analytics/Logging
    logPayment(planType, details);
}

// PayPal.me Erfolgsmeldung
function showPayPalMeSuccess(planType, details) {
    const monthlyAmount = planType === 'basic' ? 10 : (planType === 'standard' ? 10 : 15);
    const packageName = planType === 'basic' ? 'Basic Website' : (planType === 'standard' ? 'Standard Website' : 'Premium Website');
    const depositAmount = planType === 'basic' ? 50 : (planType === 'standard' ? 75 : 125);
    
    // PayPal.me Link
    const paypalMeLink = `https://www.paypal.com/paypalme/kozan885/${monthlyAmount}`;
    
    const successHTML = `
        <div style="background: rgba(0,255,0,0.1); border: 2px solid #00ff00; border-radius: 15px; padding: 30px; margin: 20px 0;">
            <div style="text-align: center; font-size: 50px; margin: 20px 0;">🎉</div>
            <h3 style="text-align: center; margin-bottom: 20px;">Anzahlung erfolgreich bezahlt!</h3>
            
            <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; margin: 20px 0;">
                <h4>Dein Paket: ${packageName}</h4>
                <p><strong>Anzahlung: ${depositAmount}€ ✅</strong></p>
                <p><strong>Monatlich ab jetzt: ${monthlyAmount}€</strong></p>
                
                <div style="margin: 25px 0;">
                    <h5>💳 PayPal.me Link für monatliche Zahlungen:</h5>
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <code style="color: #00ff88; word-break: break-all; display: block; margin-bottom: 10px; font-family: monospace; font-size: 14px;">${paypalMeLink}</code>
                        <button onclick="navigator.clipboard.writeText('${paypalMeLink}').then(() => alert('✅ PayPal.me Link kopiert!'))" 
                                style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                            📋 Link kopieren
                        </button>
                    </div>
                    
                    <p style="text-align: center;">
                        <a href="${paypalMeLink}" target="_blank" 
                          style="display: inline-block; padding: 12px 25px; background: linear-gradient(135deg, #0070ba, #009cde); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0;">
                            <i class="fab fa-paypal"></i> Direkt ${monthlyAmount}€ bezahlen
                        </a>
                    </p>
                    <p style="font-size: 14px; color: #888; text-align: center;">⚠️ Speichere diesen Link! Du brauchst ihn jeden Monat.</p>
                </div>
                
                <div style="margin-top: 25px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <h5>📅 Zahlungsplan:</h5>
                    <ul style="margin-left: 20px;">
                        <li><strong>Heute:</strong> Anzahlung bezahlt ✅</li>
                        <li><strong>In 24 Stunden:</strong> Du bekommst eine Email von mir</li>
                        <li><strong>${planType === 'basic' ? 'In 2-4 Tagen:' : (planType === 'standard' ? 'In 3-7 Tagen:' : 'In 5-10 Tagen:')}</strong> Deine ${packageName} ist fertig 🚀</li>
                        <li><strong>In 30 Tagen:</strong> Erste monatliche Zahlung (${monthlyAmount}€)</li>
                    </ul>
                </div>
                
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <h5>📞 Kontakt & Support:</h5>
                    <p><strong>Kozan Emre</strong></p>
                    <p>📱 <a href="tel:+436701908115" style="color: #00ff88;">+43 670 1908 115</a></p>
                    <p>✉️ <a href="mailto:kozan.emre@icloud.com" style="color: #00ff88;">kozan.emre@icloud.com</a></p>
                    <p style="font-size: 14px; color: #888;">Antwortzeit: Innerhalb 24 Stunden</p>
                </div>
                
                <div style="margin-top: 25px; padding: 15px; background: rgba(255,152,0,0.1); border: 1px solid #ff9800; border-radius: 8px;">
                    <h5>⚠️ Wichtige Info:</h5>
                    <ul style="margin-left: 20px; font-size: 14px;">
                        <li>• Bezahle jeden Monat über den PayPal.me Link</li>
                        <li>• Kündigung jederzeit mit 30 Tagen Frist möglich</li>
                        <li>• Rechnungen werden automatisch von PayPal erstellt</li>
                        <li>• Bei Problemen: Kontaktiere mich direkt</li>
                    </ul>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="window.location.href='contact.html'" 
                        style="padding: 10px 20px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    📞 Fragen stellen
                </button>
                <button onclick="window.print()" 
                        style="padding: 10px 20px; margin: 5px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; cursor: pointer;">
                    🖨️ Seite drucken
                </button>
            </div>
        </div>
    `;
    
    // Container finden und ersetzen
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
        
        // Scrollen
        setTimeout(() => {
            parent.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
    
    // Speichern
    const orderData = {
        planType: planType,
        packageName: packageName,
        deposit: depositAmount,
        monthly: monthlyAmount,
        customerName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
        customerEmail: details.payer.email_address,
        transactionId: details.id,
        paypalMeLink: paypalMeLink,
        nextPaymentDate: getNextMonthDate(),
        date: new Date().toISOString(),
        status: 'active'
    };
    
    localStorage.setItem('koz_last_order', JSON.stringify(orderData));
    
    // Erfolgs-Notification
    showTopNotification('success', '✅ Anzahlung erfolgreich! PayPal.me Link erstellt.');
}

// PayPal Buttons Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen - initialisiere PayPal Buttons...');
    
    if (typeof paypal === 'undefined') {
        console.error('PayPal SDK konnte nicht geladen werden');
        showPayPalError();
        return;
    }
    
    initPayPalButtons();
});

function initPayPalButtons() {
    console.log('Initialisiere PayPal Buttons...');
    
    // ====== BASIC PAKET (NEU) ======
    try {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'pay',
                height: 50,
                tagline: false
            },
            
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: 'Basic Website - Anzahlung (50€)',
                        amount: {
                            value: '50.00',
                            currency_code: 'EUR'
                        }
                    }],
                    application_context: {
                        shipping_preference: 'NO_SHIPPING',
                        user_action: 'PAY_NOW',
                        brand_name: 'Kozan Emre IT Developer'
                    }
                });
            },
            
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    handlePayPalPayment('basic', details);
                });
            },
            
            onCancel: function(data) {
                showCancelMessage();
            },
            
            onError: function(err) {
                console.error('PayPal Fehler:', err);
                showErrorMessage(err);
            }
            
        }).render('#paypal-button-basic');
        
        console.log('PayPal Button für Basic gerendert');
    } catch (error) {
        console.error('Fehler beim PayPal Button (Basic):', error);
    }
    
    // ====== STANDARD PAKET ======
    try {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'pay',
                height: 50,
                tagline: false
            },
            
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: 'Standard Website - Anzahlung (75€)',
                        amount: {
                            value: '75.00',
                            currency_code: 'EUR'
                        }
                    }],
                    application_context: {
                        shipping_preference: 'NO_SHIPPING',
                        user_action: 'PAY_NOW',
                        brand_name: 'Kozan Emre IT Developer'
                    }
                });
            },
            
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    handlePayPalPayment('standard', details);
                });
            },
            
            onCancel: function(data) {
                showCancelMessage();
            },
            
            onError: function(err) {
                console.error('PayPal Fehler:', err);
                showErrorMessage(err);
            }
            
        }).render('#paypal-button-standard');
        
        console.log('PayPal Button für Standard gerendert');
    } catch (error) {
        console.error('Fehler beim PayPal Button (Standard):', error);
    }
    
    // ====== PREMIUM PAKET ======
    try {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'pay',
                height: 50,
                tagline: false
            },
            
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: 'Premium Website - Anzahlung (125€)',
                        amount: {
                            value: '125.00',
                            currency_code: 'EUR'
                        }
                    }],
                    application_context: {
                        shipping_preference: 'NO_SHIPPING',
                        user_action: 'PAY_NOW',
                        brand_name: 'Kozan Emre IT Developer'
                    }
                });
            },
            
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    handlePayPalPayment('premium', details);
                });
            },
            
            onCancel: function(data) {
                showCancelMessage();
            },
            
            onError: function(err) {
                console.error('PayPal Fehler:', err);
                showErrorMessage(err);
            }
            
        }).render('#paypal-button-premium');
        
        console.log('PayPal Button für Premium gerendert');
    } catch (error) {
        console.error('Fehler beim PayPal Button (Premium):', error);
    }
}

// Admin Notification mit PayPal.me
function sendAdminNotification(planType, details) {
    const monthlyAmount = planType === 'basic' ? 10 : (planType === 'standard' ? 10 : 15);
    const packageName = planType === 'basic' ? 'Basic' : (planType === 'standard' ? 'Standard' : 'Premium');
    const paypalMeLink = `https://www.paypal.com/paypalme/kozan885/${monthlyAmount}`;
    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 30);
    const nextDateFormatted = nextDate.toLocaleDateString('de-DE');
    
    const emailBody = `
🚀 NEUE WEBSITE BESTELLUNG! 🚀

PAKET: ${packageName} Website
KUNDE: ${details.payer.name.given_name} ${details.payer.name.surname}
EMAIL: ${details.payer.email_address}
ANZAHLUNG: ${planType === 'basic' ? '50€' : (planType === 'standard' ? '75€' : '125€')} ✅
MONATLICH: ${monthlyAmount}€

🔗 PAYPAL.ME LINK FÜR KUNDEN:
${paypalMeLink}

📋 DEM KUNDEN MITTEILEN:
"Speichern Sie diesen Link! Bezahlen Sie jeden Monat hier."

📅 ZAHLUNGSPLAN:
- Heute: Anzahlung bezahlt
- ${nextDateFormatted}: Erste monatliche Zahlung (${monthlyAmount}€)
- Dann: Monatlich zum gleichen Datum

⚡ ENTWICKLUNGSZEIT:
- Basic: 2-4 Tage
- Standard: 3-7 Tage
- Premium: 5-10 Tage

📞 KONTAKTINFO:
Name: ${details.payer.name.given_name} ${details.payer.name.surname}
Email: ${details.payer.email_address}
PayPal Transaktion: ${details.id}

---
Kozan Emre
+43 670 1908 115
kozan.emre@icloud.com
`;
    
    console.log('📧 Admin Email:\n', emailBody);
    
    // Email öffnen
    const subject = `NEUE BESTELLUNG: ${details.payer.name.given_name} - ${packageName} - ${monthlyAmount}€/Monat`;
    window.open(`mailto:kozan.emre@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`);
}

// Hilfsfunktion für nächstes Monatsdatum
function getNextMonthDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString();
}

// Fehlermeldung anzeigen
function showErrorMessage(error) {
    console.error('PayPal Fehler:', error);
    
    const errorHTML = `
        <div class="payment-error-message">
            <div class="error-icon">❌</div>
            <h3>Zahlung fehlgeschlagen</h3>
            <p>Bitte versuche es erneut oder kontaktiere mich.</p>
            <div class="error-actions">
                <button onclick="location.reload()" class="btn retry-btn">Erneut versuchen</button>
                <a href="contact.html" class="btn contact-btn">Kontakt aufnehmen</a>
            </div>
        </div>
    `;
    
    showTopNotification('error', '❌ Zahlung fehlgeschlagen');
}

// Abbruchmeldung anzeigen
function showCancelMessage() {
    showTopNotification('info', 'ℹ️ Zahlung wurde abgebrochen');
}

// PayPal Fehler anzeigen
function showPayPalError() {
    const errorHTML = `
        <div class="paypal-error">
            <h4>⚠️ PayPal nicht verfügbar</h4>
            <p>Alternative Zahlungsmethoden:</p>
            <div class="alternative-options">
                <a href="contact.html" class="btn">📞 Per Telefon bestellen</a>
                <a href="mailto:kozan.emre@icloud.com" class="btn">✉️ Per Email bestellen</a>
            </div>
        </div>
    `;
    
    const containers = ['#paypal-button-basic', '#paypal-button-standard', '#paypal-button-premium'];
    containers.forEach(selector => {
        const container = document.querySelector(selector);
        if (container) {
            container.parentElement.innerHTML = errorHTML;
        }
    });
}

// Top Notification anzeigen
function showTopNotification(type, message) {
    const existing = document.querySelector('.top-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `top-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">×</button>
        </div>
    `;
    
    // Styles für die Notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999999;
        width: 90%;
        max-width: 600px;
        animation: slideDown 0.3s ease;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    if (notificationContent) {
        notificationContent.style.cssText = `
            background: ${type === 'success' ? 'rgba(0,255,0,0.1)' : type === 'error' ? 'rgba(255,0,0,0.1)' : 'rgba(0,123,255,0.1)'};
            border: 1px solid ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#007bff'};
            border-left: 5px solid ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#007bff'};
            border-radius: 8px;
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(10px);
            background: rgba(20, 20, 20, 0.95);
            color: white;
        `;
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Zahlung protokollieren
function logPayment(planType, details) {
    const amount = planType === 'basic' ? 50 : (planType === 'standard' ? 75 : 125);
    const paymentLog = {
        plan: planType,
        amount: amount,
        customer: `${details.payer.name.given_name} ${details.payer.name.surname}`,
        email: details.payer.email_address,
        date: new Date().toISOString()
    };
    
    const payments = JSON.parse(localStorage.getItem('koz_payments') || '[]');
    payments.push(paymentLog);
    localStorage.setItem('koz_payments', JSON.stringify(payments));
}

// ====== STARTUP ======
(function init() {
    console.log("💰 PayPal System gestartet");
    
    // CSS für Animationen hinzufügen
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { top: -100px; opacity: 0; }
            to { top: 80px; opacity: 1; }
        }
        
        .paypal-error {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 193, 7, 0.1);
            border: 2px solid #ffc107;
            border-radius: 12px;
        }
        
        .alternative-options {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
            flex-wrap: wrap;
        }
        
        .btn {
            display: inline-block;
            padding: 0.8rem 1.5rem;
            background: #007bff;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }
        
        .payment-error-message {
            background: rgba(255, 0, 0, 0.05);
            border: 2px solid #ff0000;
            border-radius: 12px;
            padding: 2rem;
            margin: 1rem 0;
            text-align: center;
        }
        
        .error-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .error-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
        }
        
        .retry-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        
        .contact-btn {
            background: rgba(255,255,255,0.1);
            color: white;
            border: 1px solid rgba(255,255,255,0.2);
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0 0.5rem;
        }
    `;
    document.head.appendChild(style);
})();

// Globale Funktionen
window.retryPayment = function() { location.reload(); };
window.handlePayPalPayment = handlePayPalPayment;

console.log('✅ PayPal System bereit');