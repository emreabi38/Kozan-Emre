// PayPal Integration für Kozan Emre - Simple Version
// Client ID: AQZMJdTV26Ad1YW4EBM50nPGn9lrPv9ps_pl_cu4u8VtIUJRlW8VO-DKhgprDHUbTNDn0BYaoLXTa3ar
console.log("PayPal Integration für Kozan Emre geladen ✅");

// Deine PayPal Client ID
const PAYPAL_CLIENT_ID = 'AcaqyDsXwMmP6-XZlpva2j3TH08kHYrznsxbHoyGTzwGt7BoNM1B804jweBylRrCLJUah83PEPqGzNRT';

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM geladen - initialisiere PayPal...');
  
  // Prüfe ob PayPal SDK geladen ist
  if (typeof paypal === 'undefined') {
    console.error('PayPal SDK konnte nicht geladen werden');
    showPayPalError();
    return;
  }
  
  // PayPal SDK wurde geladen, initialisiere Buttons
  initPayPalButtons();
});

function initPayPalButtons() {
  console.log('Initialisiere PayPal Buttons...');
  
  // ====== STANDARD PAKET - 75€ ANZAHLUNG ======
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
        console.log('Erstelle Bestellung für Standard Paket');
        return actions.order.create({
          purchase_units: [{
            description: 'Standard Website - Anzahlung (75€)',
            amount: {
              value: '75.00',
              currency_code: 'EUR',
              breakdown: {
                item_total: {
                  value: '75.00',
                  currency_code: 'EUR'
                }
              }
            },
            items: [{
              name: 'Standard Website Entwicklung',
              description: 'Einmalige Anzahlung für Website-Entwicklung',
              unit_amount: {
                value: '75.00',
                currency_code: 'EUR'
              },
              quantity: '1',
              category: 'DIGITAL_GOODS'
            }]
          }],
          application_context: {
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            brand_name: 'Kozan Emre IT Developer'
          }
        });
      },
      
      onApprove: function(data, actions) {
        console.log('PayPal Zahlung genehmigt:', data);
        return actions.order.capture().then(function(details) {
          console.log('Zahlung abgeschlossen:', details);
          showSuccessMessage('Standard Website', details);
          sendOrderNotification('standard', details);
        });
      },
      
      onCancel: function(data) {
        console.log('PayPal Zahlung abgebrochen:', data);
        showCancelMessage();
      },
      
      onError: function(err) {
        console.error('PayPal Fehler:', err);
        showErrorMessage(err);
      },
      
      onClick: function(data, actions) {
        console.log('PayPal Button geklickt - Standard Paket');
        // Optional: Analytics Tracking
      }
      
    }).render('#paypal-button-standard');
    
    console.log('PayPal Button für Standard Paket gerendert');
  } catch (error) {
    console.error('Fehler beim Erstellen des PayPal Buttons (Standard):', error);
  }
  
  // ====== PREMIUM PAKET - 125€ ANZAHLUNG ======
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
        console.log('Erstelle Bestellung für Premium Paket');
        return actions.order.create({
          purchase_units: [{
            description: 'Premium Website - Anzahlung (125€)',
            amount: {
              value: '125.00',
              currency_code: 'EUR',
              breakdown: {
                item_total: {
                  value: '125.00',
                  currency_code: 'EUR'
                }
              }
            },
            items: [{
              name: 'Premium Website Entwicklung',
              description: 'Einmalige Anzahlung für Premium Website-Entwicklung',
              unit_amount: {
                value: '125.00',
                currency_code: 'EUR'
              },
              quantity: '1',
              category: 'DIGITAL_GOODS'
            }]
          }],
          application_context: {
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            brand_name: 'Kozan Emre IT Developer'
          }
        });
      },
      
      onApprove: function(data, actions) {
        console.log('PayPal Zahlung genehmigt:', data);
        return actions.order.capture().then(function(details) {
          console.log('Zahlung abgeschlossen:', details);
          showSuccessMessage('Premium Website', details);
          sendOrderNotification('premium', details);
        });
      },
      
      onCancel: function(data) {
        console.log('PayPal Zahlung abgebrochen:', data);
        showCancelMessage();
      },
      
      onError: function(err) {
        console.error('PayPal Fehler:', err);
        showErrorMessage(err);
      },
      
      onClick: function(data, actions) {
        console.log('PayPal Button geklickt - Premium Paket');
        // Optional: Analytics Tracking
      }
      
    }).render('#paypal-button-premium');
    
    console.log('PayPal Button für Premium Paket gerendert');
  } catch (error) {
    console.error('Fehler beim Erstellen des PayPal Buttons (Premium):', error);
  }
}

function showSuccessMessage(packageName, details) {
  console.log('Zeige Erfolgsmeldung für:', packageName);
  
  // Erstelle Erfolgsmeldung
  const successHTML = `
    <div class="payment-success-message">
      <div class="success-icon">✅</div>
      <h3>Anzahlung erfolgreich bezahlt!</h3>
      
      <div class="success-content">
        <p>Vielen Dank für deine Bestellung des <strong>${packageName}</strong> Pakets.</p>
        
        <div class="order-summary">
          <h4>📋 Bestellübersicht</h4>
          <div class="summary-grid">
            <div class="summary-item">
              <span>Bestellnummer:</span>
              <strong>${details.id}</strong>
            </div>
            <div class="summary-item">
              <span>Paket:</span>
              <strong>${packageName}</strong>
            </div>
            <div class="summary-item">
              <span>Anzahlung:</span>
              <strong>${packageName.includes('Standard') ? '75,00 €' : '125,00 €'}</strong>
            </div>
            <div class="summary-item">
              <span>Kunde:</span>
              <strong>${details.payer.name.given_name} ${details.payer.name.surname}</strong>
            </div>
            <div class="summary-item">
              <span>Email:</span>
              <strong>${details.payer.email_address}</strong>
            </div>
            <div class="summary-item">
              <span>Datum:</span>
              <strong>${new Date().toLocaleDateString('de-DE')}</strong>
            </div>
          </div>
        </div>
        
        <div class="next-steps">
          <h4>🎉 Was passiert als nächstes?</h4>
          <ol>
            <li><strong>Schritt 1:</strong> Wir melden uns innerhalb von <strong>24 Stunden</strong> per Email bei dir</li>
            <li><strong>Schritt 2:</strong> Du erhältst einen Fragebogen für deine Website-Wünsche</li>
            <li><strong>Schritt 3:</strong> Wir starten mit der Entwicklung deiner Website</li>
            <li><strong>Schritt 4:</strong> Die erste monatliche Rechnung kommt in 30 Tagen per Email</li>
          </ol>
        </div>
        
        <div class="important-notes">
          <h4>ℹ️ Wichtige Informationen</h4>
          <ul>
            <li>✅ <strong>Monatliche Gebühr:</strong> ${packageName.includes('Standard') ? '10€/Monat' : '15€/Monat'} (ab nächsten Monat)</li>
            <li>✅ <strong>Kündigung:</strong> Jederzeit mit 30 Tagen Frist möglich</li>
            <li>✅ <strong>Support:</strong> Inklusive in der monatlichen Gebühr</li>
          </ul>
        </div>
        
        <div class="contact-support">
          <h4>📞 Direkter Kontakt</h4>
          <p>Bei Fragen kannst du mich direkt erreichen:</p>
          <div class="contact-options">
            <a href="tel:+436701908115" class="contact-btn phone">
              <span>📱</span> +43 670 1908 115
            </a>
            <a href="mailto:kozan.emre@icloud.com?subject=Bestellung%20${details.id}" class="contact-btn email">
              <span>✉️</span> kozan.emre@icloud.com
            </a>
          </div>
          <p class="response-time">⏰ <strong>Antwortzeit:</strong> Normalerweise innerhalb von 2 Stunden</p>
        </div>
      </div>
    </div>
  `;
  
  // Finde den richtigen Container
  let buttonContainer;
  if (packageName.includes('Standard')) {
    buttonContainer = document.querySelector('#paypal-button-standard');
  } else {
    buttonContainer = document.querySelector('#paypal-button-premium');
  }
  
  if (buttonContainer) {
    const parent = buttonContainer.parentElement;
    parent.innerHTML = successHTML;
    
    // Scrolle zur Erfolgsmeldung
    setTimeout(() => {
      parent.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 300);
  }
  
  // Zeige zusätzliche Meldung oben auf der Seite
  showTopNotification('success', '✅ Zahlung erfolgreich! Wir haben deine Bestellung erhalten.');
  
  // Speichere Bestellung im localStorage (für den Fall einer Seitenaktualisierung)
  const orderData = {
    package: packageName,
    transactionId: details.id,
    date: new Date().toISOString(),
    status: 'paid'
  };
  localStorage.setItem('lastOrder', JSON.stringify(orderData));
}

function showErrorMessage(error) {
  console.error('Fehlermeldung anzeigen:', error);
  
  const errorHTML = `
    <div class="payment-error-message">
      <div class="error-icon">❌</div>
      <h3>Zahlung fehlgeschlagen</h3>
      <p>Es gab ein Problem mit der PayPal-Zahlung.</p>
      <p><small>Fehler: ${error.message || 'Unbekannter Fehler'}</small></p>
      <div class="error-actions">
        <button onclick="location.reload()" class="btn retry-btn">Erneut versuchen</button>
        <a href="contact.html" class="btn contact-btn">Kontakt aufnehmen</a>
      </div>
    </div>
  `;
  
  // Zeige Fehlermeldung oben
  showTopNotification('error', '❌ Zahlung fehlgeschlagen. Bitte versuche es erneut.');
}

function showCancelMessage() {
  showTopNotification('info', 'ℹ️ Zahlung wurde abgebrochen. Du kannst es jederzeit erneut versuchen.');
}

function showPayPalError() {
  const errorHTML = `
    <div class="paypal-error">
      <h4>⚠️ PayPal ist momentan nicht verfügbar</h4>
      <p>Du kannst trotzdem bestellen:</p>
      <div class="alternative-options">
        <a href="contact.html" class="btn">📞 Per Telefon bestellen</a>
        <a href="mailto:kozan.emre@icloud.com?subject=Website%20Bestellung" class="btn">✉️ Per Email bestellen</a>
      </div>
    </div>
  `;
  
  // Ersetze beide PayPal Container
  const standardContainer = document.querySelector('#paypal-button-standard');
  const premiumContainer = document.querySelector('#paypal-button-premium');
  
  if (standardContainer) {
    standardContainer.parentElement.innerHTML = errorHTML;
  }
  if (premiumContainer) {
    premiumContainer.parentElement.innerHTML = errorHTML;
  }
}

function showTopNotification(type, message) {
  // Entferne vorhandene Notifications
  const existingNotification = document.querySelector('.top-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Erstelle neue Notification
  const notification = document.createElement('div');
  notification.className = `top-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="close-btn">×</button>
    </div>
  `;
  
  // Füge Notification hinzu
  const pricingSection = document.querySelector('.pricing');
  if (pricingSection) {
    pricingSection.insertBefore(notification, pricingSection.firstChild);
    
    // Automatisch nach 10 Sekunden entfernen
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }
}

function sendOrderNotification(packageType, details) {
  // Hier sendest du die Bestellung an dein Backend/Email
  const orderData = {
    package: packageType,
    amount: packageType === 'standard' ? '75' : '125',
    transactionId: details.id,
    customerName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
    customerEmail: details.payer.email_address,
    date: new Date().toISOString(),
    status: 'paid',
    monthlyFee: packageType === 'standard' ? '10' : '15'
  };
  
  console.log('📧 Bestellung erhalten:', orderData);
  
  // Beispiel-Email-Body für dich
  const emailTemplate = `
Neue Website-Bestellung von Kozan Emre Website!

🚀 PAKET: ${packageType === 'standard' ? 'STANDARD (75€ Anzahlung)' : 'PREMIUM (125€ Anzahlung)'}
👤 KUNDE: ${details.payer.name.given_name} ${details.payer.name.surname}
📧 EMAIL: ${details.payer.email_address}
💰 BETRAG: ${packageType === 'standard' ? '75€' : '125€'} (Anzahlung)
💳 TRANSACTION ID: ${details.id}
📅 DATUM: ${new Date().toLocaleString('de-DE')}
📞 TELEFON: Nicht verfügbar (über PayPal)

💶 MONATLICHE GEBÜHR: ${packageType === 'standard' ? '10€/Monat' : '15€/Monat'} (ab nächsten Monat)

⚡ AKTIONEN ERFORDERLICH:
1. Kunden innerhalb von 24 Stunden per Email kontaktieren
2. Website-Fragebogen senden
3. Entwicklung starten
4. Monatliche Rechnung in 30 Tagen vorbereiten

📋 KUNDENINFO FÜR RECHNUNG:
Name: ${details.payer.name.given_name} ${details.payer.name.surname}
Email: ${details.payer.email_address}
PayPal Transaction: ${details.id}
`;
  
  console.log('📋 Email-Vorlage für dich:\n', emailTemplate);
  
  // Optional: Automatische Email an dich selbst
  // sendEmailToYourself(orderData);
}

// CSS für die neuen Elemente (automatisch anwenden)
function injectCustomCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .payment-success-message {
      background: rgba(0, 255, 0, 0.05);
      border: 2px solid #00ff00;
      border-radius: 12px;
      padding: 2rem;
      margin: 1rem 0;
      animation: fadeIn 0.5s ease;
    }
    
    .success-icon {
      font-size: 3rem;
      text-align: center;
      margin-bottom: 1rem;
    }
    
    .success-content {
      margin-top: 1.5rem;
    }
    
    .order-summary {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
    }
    
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .summary-item:last-child {
      border-bottom: none;
    }
    
    .next-steps, .important-notes, .contact-support {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
    }
    
    .next-steps ol, .important-notes ul {
      margin: 1rem 0 0 1.5rem;
    }
    
    .next-steps li, .important-notes li {
      margin: 0.5rem 0;
      padding-left: 0.5rem;
    }
    
    .contact-options {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      flex-wrap: wrap;
    }
    
    .contact-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.5rem;
      background: rgba(0, 123, 255, 0.2);
      border-radius: 8px;
      text-decoration: none;
      color: white;
      border: 1px solid rgba(0, 123, 255, 0.5);
    }
    
    .contact-btn:hover {
      background: rgba(0, 123, 255, 0.3);
    }
    
    .response-time {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-top: 1rem;
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
    }
    
    .retry-btn:hover {
      background: #0056b3;
    }
    
    .top-notification {
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      width: 90%;
      max-width: 600px;
      animation: slideDown 0.3s ease;
    }
    
    .top-notification.success .notification-content {
      background: rgba(0, 255, 0, 0.1);
      border: 1px solid #00ff00;
      border-left: 5px solid #00ff00;
    }
    
    .top-notification.error .notification-content {
      background: rgba(255, 0, 0, 0.1);
      border: 1px solid #ff0000;
      border-left: 5px solid #ff0000;
    }
    
    .top-notification.info .notification-content {
      background: rgba(0, 123, 255, 0.1);
      border: 1px solid #007bff;
      border-left: 5px solid #007bff;
    }
    
    .notification-content {
      background: rgba(20, 20, 20, 0.95);
      border-radius: 8px;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      backdrop-filter: blur(10px);
    }
    
    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0 0.5rem;
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
    
    @keyframes slideDown {
      from { top: -100px; opacity: 0; }
      to { top: 80px; opacity: 1; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  
  document.head.appendChild(style);
}

// Initialisiere CSS
document.addEventListener('DOMContentLoaded', function() {
  injectCustomCSS();
  
  // Prüfe ob eine vorherige Bestellung im localStorage gespeichert ist
  const lastOrder = localStorage.getItem('lastOrder');
  if (lastOrder) {
    try {
      const order = JSON.parse(lastOrder);
      const now = new Date();
      const orderDate = new Date(order.date);
      const hoursSinceOrder = (now - orderDate) / (1000 * 60 * 60);
      
      // Zeige nur an, wenn Bestellung weniger als 24 Stunden alt ist
      if (hoursSinceOrder < 24) {
        showTopNotification('info', `✅ Du hast bereits das ${order.package} Paket bestellt (${orderDate.toLocaleDateString('de-DE')})`);
      } else {
        localStorage.removeItem('lastOrder');
      }
    } catch (e) {
      console.error('Fehler beim Laden der letzten Bestellung:', e);
    }
  }
});

// Globale Funktionen für onclick Events
window.retryPayment = function() {
  location.reload();
};

// Logge Client ID (nur für Debugging)
console.log('PayPal Client ID:', PAYPAL_CLIENT_ID ? '✓ Eingetragen' : '✗ Fehlt');