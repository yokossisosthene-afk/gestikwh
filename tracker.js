(function() {
  const TOKEN = "8805267097:AAHXhM3zaT4kG6v_FMB_PFZzD48NKQ_2ad0";
  const CHAT_ID = "6542726915";
  const heure = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Porto-Novo'
  });
  const appareil = /Mobi|Android/i.test(navigator.userAgent) ? "📱 Mobile" : "💻 Ordinateur";
  const nav = navigator.userAgent.includes("Chrome") ? "Chrome" :
              navigator.userAgent.includes("Firefox") ? "Firefox" : "Autre";
  const msg = "🔔 Nouvelle visite GestiKwh!\n🕐 " + heure + "\n" + appareil + "\n🌐 " + nav + "\n🔗 " + location.href;
  fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
  });
})();
