# Lernperiode-9

## 3 Technologien

### Node.js
Node.js steht in meiner Auswahl, weil ich schon weis, wie man ein Backend in C# programmiert, aber ich noch nicht weis, wie man das in Javascript macht.

### Express.js
Dieses Framework steht in meiner Auswahl, da es sehr beliebt ist und gut zu einem Javascript-Backend passt.

### MongoDB
Diese Datenbank steht in meiner Auswahl, weil Datenbanken sehr wichtig sind und da kann es nicht schaden, verschiedene zu kennen.

## Meine Auswahl
Ich habe mich für eine Kombination aus den drei Technologien entschieden, da diese drei perfekt zusammen passen. Auch mit der Technologie aus der letzten Lernperiode (Electron).

## 20.02.2026
Heute habe ich ein Toutorial zu Node.js angeschaut und nachgemacht. Das Ergebnis war ein simples Backend, welches zwei GET und eine POST-Anfrage verarbeitet. Die erste GET-Anfrage besitzt den Endpunkt "/" und wird beim Aufrufen der API im Browser direkt angezeigt. Die zweite GET-Anfrage gibt einen Player im JSON-Format zurück und mit der POST-Anfrage kann man Gold hinzufügen. Das ganze habe ich dann mit Postman noch getestet und eigene Dinge hinzugefügt. Zum Beispiel wird jetzt "Hello World!" angezeigt. Den Server startet man dann mit `node server.js`.


## 27.02.2026

- [x] Backend mit MongoDB verbinden
- [x] Einen DELETE Endpunkt hinzufügen
- [x] PUT Endpunkt hinzufügen

Heute habe ich mein Backend mit der MongoDB verbunden. Das ging ziehmlich gut und hat schnell funktioniert. Danach habe ich noch einen DELETE- und PUT-Endpunkt hinzugefügt. Danach habe ich noch die Ordnerstruktur angepasst. Ich habe z.B. einen models-Ordner für alle Klassen und einen routes-Ordner für die Endpunkte. Als nächstes habe ich noch Swagger hinzugefügt. Das war komplizierter als in C#, da ich SwaggerUI sozusagen selbst "zusammenbauen" musste. Das habe ich gemacht, indem ich für jeden Endpunkt einen Komentar mit der Methode, Erklärungen und der Übergabestruktur hinzugefügt habe. Es wird nähmlich nicht automatisch erkannt, dass das z.B. ein GET-Endpunkt ist und es wird auch nicht erkannt, dass dort z.B. eine Id mitgegeben werden muss. Das muss man alles selbst festlegen. Dann habe ich noch einen Counter programmiert, welche die kleinste freie userId herausfindet. Das wird benötigt, weil MongoDB selbst richtig lange Ids erstellt und nicht Dezimalzahlen von 1 aufwärts.

## 06.03.2026

- [ ] Die POST-Anfrage gegen falsche Daten absichern
- [ ] Eine Authentifizierungsroute programmieren
- [ ] Einen Register-Endpunkt hinzufügen
- [ ] Einen Login-Endpunkt hinzufügen
