(function() {
  const TOKEN = "8805267097:AAHXhM3zaT4kG6v_FMB_PFZzD48NKQ_2ad0";
  const CHAT_ID = "6542726915";

  if (sessionStorage.getItem('v')) return;
  sessionStorage.setItem('v', '1');

  const heure = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Porto-Novo'
  });
  const appareil = /Mobi|Android/i.test(navigator.userAgent) ? "📱 Mobile" : "💻 Ordinateur";
  const nav = navigator.userAgent.includes("Chrome") ? "Chrome" :
              navigator.userAgent.includes("Firefox") ? "Firefox" : "Autre";
  const langue = navigator.language || "?";
  const ecran = screen.width + "x" + screen.height;
  const referrer = document.referrer || "Accès direct";

  function envoyer(pays, ville, ip) {
    const msg =
      "🔔 Nouvelle visite GestiKwh!\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      "🕐 " + heure + "\n" +
      "🌍 " + pays + "  🏙️ " + ville + "\n" +
      "📡 IP : " + ip + "\n" +
      "━━━━━━━━━━━━━━━━━\n" +
      appareil + "  |  " + nav + "\n" +
      "🗣️ " + langue + "  |  🖥️ " + ecran + "\n" +
      "↩️ " + referrer;

    fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
    });
  }

  fetch("https://ipwho.is/")
    .then(r => r.json())
    .then(d => envoyer(d.country || "?", d.city || "?", d.ip || "?"))
    .catch(() => envoyer("Inconnu", "Inconnue", "Inconnue"));
})();
