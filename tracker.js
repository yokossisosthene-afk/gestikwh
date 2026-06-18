(function() {
  const TOKEN = "8805267097:AAHXhM3zaT4kG6v_FMB_PFZzD48NKQ_2ad0";
  const CHAT_ID = "6542726915";

  // Anti-spam : une seule alerte par session
  if (sessionStorage.getItem('visite_envoyee')) return;
  sessionStorage.setItem('visite_envoyee', '1');

  const heure = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Porto-Novo'
  });
  const appareil = /Mobi|Android/i.test(navigator.userAgent) ? "📱 Mobile" : "💻 Ordinateur";
  const nav = navigator.userAgent.includes("Chrome") ? "Chrome" :
              navigator.userAgent.includes("Firefox") ? "Firefox" :
              navigator.userAgent.includes("Safari") ? "Safari" : "Autre";
  const langue = navigator.language || "Inconnue";
  const ecran = screen.width + "x" + screen.height;
  const referrer = document.referrer ? document.referrer : "Accès direct";

  fetch("https://freeipapi.com/api/json/")
    .then(r => r.json())
    .then(data => {
      const msg =
        "🔔 Nouvelle visite GestiKwh!\n" +
        "━━━━━━━━━━━━━━━━━\n" +
        "🕐 " + heure + "\n" +
        "🌍 Pays : " + (data.countryName || "Inconnu") + "\n" +
        "🏙️ Ville : " + (data.cityName || "Inconnue") + "\n" +
        "📡 IP : " + (data.ipAddress || "Inconnue") + "\n" +
        "━━━━━━━━━━━━━━━━━\n" +
        appareil + "  |  " + nav + "\n" +
        "🗣️ Langue : " + langue + "\n" +
        "🖥️ Écran : " + ecran + "\n" +
        "↩️ Venu de : " + referrer;

      fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
      });
    })
    .catch(() => {
      // Si l'API IP échoue, on envoie quand même sans IP
      const msg =
        "🔔 Nouvelle visite GestiKwh!\n" +
        "🕐 " + heure + "\n" +
        appareil + "  |  " + nav + "\n" +
        "🗣️ " + langue + "  |  🖥️ " + ecran + "\n" +
        "↩️ " + referrer;

      fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
      });
    });
})();
