(function() {
  const TOKEN = "8805267097:AAHXhM3zaT4kG6v_FMB_PFZzD48NKQ_2ad0";
  const CHAT_ID = "6542726915";

  const heure = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Porto-Novo'
  });
  const appareil = /Mobi|Android/i.test(navigator.userAgent) ? "📱 Mobile" : "💻 Ordinateur";
  const nav = navigator.userAgent.includes("Chrome") ? "Chrome" :
              navigator.userAgent.includes("Firefox") ? "Firefox" :
              navigator.userAgent.includes("Safari") ? "Safari" : "Autre";
  const langue = navigator.language || "Inconnue";
  const ecran = screen.width + "x" + screen.height;
  const page = location.href;
  const referrer = document.referrer ? document.referrer : "Accès direct";

  // Récupération de l'IP et pays via API gratuite
  fetch("https://ipapi.co/json/")
    .then(r => r.json())
    .then(data => {
      const msg = 
        "🔔 *Nouvelle visite GestiKwh!*\n" +
        "━━━━━━━━━━━━━━━━━\n" +
        "🕐 " + heure + "\n" +
        "🌍 Pays : " + (data.country_name || "Inconnu") + "\n" +
        "🏙️ Ville : " + (data.city || "Inconnue") + "\n" +
        "📡 IP : " + (data.ip || "Inconnue") + "\n" +
        "━━━━━━━━━━━━━━━━━\n" +
        appareil + "\n" +
        "🌐 Navigateur : " + nav + "\n" +
        "🗣️ Langue : " + langue + "\n" +
        "🖥️ Écran : " + ecran + "\n" +
        "━━━━━━━━━━━━━━━━━\n" +
        "🔗 Page : " + page + "\n" +
        "↩️ Venu de : " + referrer;

      fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: "Markdown" })
      });
    });
})();
