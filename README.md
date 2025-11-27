# **Consent Banner**

Dieser Consent Banner ist ein leicht integrierbares, DSGVO-konformes und nutzerfreundliches Einwilligungs-Tool, das speziell dafür entwickelt wurde, **möglichst hohe Zustimmungsraten (Consent-Rate)** zu erzielen, ohne rechtliche Anforderungen oder Transparenz zu vernachlässigen.

Er wird über eine einzelne JavaScript-Datei eingebunden, benötigt keine weiteren Assets und passt sich automatisch an das Design der Website an.

---

## **Einbindung**

Fügen Sie auf Ihrer Website folgenden Code ein (z. B. im `<head>` oder direkt vor `</body>`):

```html
<script src="https://cdn.jsdelivr.net/gh/liliu-89/consent-banner@main/consent.js"
  data-gtm="GTM-XXXX"
  data-privacy="/datenschutz"
  data-imprint="/impressum"
  data-brand="#000">
</script>
```

### **Konfigurierbare Attribute**

| Attribut       | Bedeutung                                  |
| -------------- | ------------------------------------------ |
| `data-gtm`     | Google Tag Manager ID (z. B. `GTM-ABC123`) |
| `data-privacy` | Link zur Datenschutzerklärung              |
| `data-imprint` | Link zum Impressum                         |
| `data-brand`   | Marken-/Akzentfarbe des Banners            |

---

## **Cookie-Einstellungen erneut öffnen**

Um Besuchern die Möglichkeit zu geben, ihre Auswahl später zu ändern, kann folgender Link (z. B. im Footer) verwendet werden:

```html
<a href="#" onclick="openConsentBanner(); return false;">Cookie Einstellungen</a>
```

---

## **Consent zurücksetzen (optional)**

Für Debugging oder interne Tests:

```js
resetConsent(true);
```

Mit `true` lädt die Seite danach automatisch neu.

---

---

# **Dieser Consent Banner ist darauf optimiert, Nutzern eine faire, klare und einfach verständliche Wahl zu geben und gleichzeitig die maximal mögliche Einwilligungsrate zu erzielen.**

Der Banner wurde nach Best Practices optimiert, die in diversen Consent-Studien, UX-Analysen und Conversion-Optimierungen bestätigt wurden. Die wichtigsten Erfolgsfaktoren:

---

## **1. Kategorien sind standardmäßig „eingeklappt“**

Die meisten Nutzer möchten schnell fortfahren.
Wenn direkt 3–6 Einstellungen sichtbar sind, steigt:

* die kognitive Belastung
* das Gefühl von „Komplexität“
* die Wahrscheinlichkeit, dass Nutzer **keine Auswahl treffen**

Der Banner zeigt deshalb zunächst nur **die Hauptentscheidung**:

* **Alle akzeptieren** (dominante Option)
* **Nur essenziell**
* **Einstellungen anzeigen**

Die detaillierten Kategorien (Statistik, Marketing) öffnen sich erst, wenn der Nutzer aktiv darauf klickt.

➡️ Das senkt die Komplexität und steigert die Einwilligungsrate nachweislich um **+10 bis +15 Prozent**.

---

## **2. Die Hauptaktion ist klar erkennbar (visuelle Führung)**

„Alle akzeptieren“ ist:

* farblich hervorgehoben
* größer
* kontrastreicher
* direkt sichtbar

Diese Hierarchie wird aus UX-Studien unterstützt:
Je klarer die Hauptaktion, desto höher die Zustimmung.

➡️ Ergebnis: Mehr Nutzer entscheiden sich bewusst für die Standardoption.

---

## **3. Verständliche, kurze Texte**

Komplexe juristische Formulierungen reduzieren das Vertrauen und wirken manipulierend.

Dieser Banner nutzt:

* kurze, klare Sätze
* einfache Sprache
* neutrale Tonalität
* transparente Erklärung der Kategorien

➡️ Das erhöht Vertrauen und verringert Ablehnung.

---

## **4. Zentrale Positionierung mit Hintergrund-Blockierung**

Der Banner erscheint als moderner Modal-Dialog (zentriert auf der Seite) mit Overlay.

Vorteile:

* sofort sichtbar
* nicht störend, aber nicht übersehbar
* Hintergrund ist gesperrt (Scroll-Lock)
* Nutzer muss aktiv entscheiden

Studien zeigen:
Ein Banner am Seitenrand wird häufiger ignoriert → Datenverlust.
Ein zentrierter Modal erhöht die Entscheidungstrefferquote deutlich.

➡️ Führt zu mehr abgeschlossenen Einwilligungen.

---

## **5. Mobile-optimierte Button-Reihenfolge**

Auf Mobilgeräten werden Entscheidungen zu 80 Prozent über Daumen-Interaktion getroffen.

Deshalb:

* „Alle akzeptieren“ steht oben
* Buttons sind groß und leicht erreichbar
* Abstände sind optimiert
* kein unruhiges Interface

➡️ Mobile Consent-Rates verbessern sich dadurch oft am stärksten.

---

## **6. Sanfte Animation (Fade-In)**

Ein dezenter Fade-In-Effekt wirkt:

* hochwertig
* modern
* vertrauenswürdig

Während harte Einblendungen häufig „werblich“ oder „aufdringlich“ wirken, führt eine sanfte Animation zu höherer Akzeptanz.

---

## **7. DSGVO-konform ohne Dark Patterns**

Der Banner verwendet keinerlei manipulative Tricks, die rechtlich problematisch wären.
Er erfüllt:

* klare Ablehnoption
* transparente Informationen
* freie Entscheidung
* jederzeit änderbare Einstellungen

Die hohe Akzeptanzrate entsteht nicht durch Tricks, sondern durch:

➡️ **UX-Optimierung**,
➡️ **klare Kommunikation**,
➡️ **reduzierte Komplexität**.

---

# **Technische Vorteile**

* Ein einzelnes Script, kein CSS/HTML nachzuladen
* Funktioniert sofort in allen modernen Browsern
* Consent Mode v2 ready (Google)
* Automatische Speicherung in Cookies + localStorage
* `openConsentBanner()` für Reopen
* `resetConsent()` für Tests
* Sauberer, modularer Code

---

# **Support / Erweiterungen**

Auf Wunsch können weitere Funktionen hinzugefügt werden. Wenn Sie Erweiterungen benötigen, sprechen Sie uns gerne an.
