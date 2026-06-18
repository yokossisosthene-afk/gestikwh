// ============================================
// ALGORITHME DE TRACKING DES VISITES
// À insérer dans ton index.html de GestiKwh
// ============================================

const TELEGRAM_TOKEN = "8805267097:AAHXhM3zaT4kG6v_FMB_PFZzD48NKQ_2ad0";
const CHAT_ID = "6542726915";

async function envoyerAlerte() {
  // Collecte des infos du visiteur
  const maintenant = new Date();
  const heure = maintenant.toLocaleString('fr-FR', {
    timeZone: 'Africa/Porto-Novo',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  const appareil = /Mobi|Android/i.test(navigator.userAgent) ? "📱 Mobile" : "💻 Ordinateur";
  const navigateur = navigator.userAgent.includes("Chrome") ? "Chrome" :
                     navigator.userAgent.includes("Firefox") ? "Firefox" :
                     navigator.userAgent.includes("Safari") ? "Safari" : "Autre";
  const langue = navigator.language || "Inconnue";
  const page = window.location.href;

  const message = `
🔔 *Nouvelle visite sur GestiKwh !*

🕐 *Heure :* ${heure}
${appareil} *Appareil :* ${appareil}
🌐 *Navigateur :* ${navigateur}
🗣️ *Langue :* ${langue}
🔗 *Page :* ${page}
  `.trim();

  // Envoi vers Telegram
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  });
}

// L'algorithme se déclenche dès que la page est chargée
window.addEventListener('load', envoyerAlerte);
