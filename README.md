- [1. Präambel](#1-präambel)
  - [1.1. Wie ist dieser Workshop aufgebaut?](#11-wie-ist-dieser-workshop-aufgebaut)
  - [1.2. Was ist TypeScript?](#12-was-ist-typescript)
  - [1.3. Wieso TypeScript?](#13-wieso-typescript)
- [2. Einführung in npm und Node.js](#2-einführung-in-npm-und-nodejs)
  - [2.1. Installationen prüfen](#21-installationen-prüfen)
  - [2.2. Projekt aufsetzen](#22-projekt-aufsetzen)
  - [2.3. TypeScript einrichten](#23-typescript-einrichten)
- [3. Theoretischer Hintergrund zu TypeScript (und JavaScript)](#3-theoretischer-hintergrund-zu-typescript-und-javascript)
  - [3.1. Grundlagen der Typisierung](#31-grundlagen-der-typisierung)
- [4. Tests schreiben](#4-tests-schreiben)
  - [4.1. Infrastruktur aufsetzen](#41-infrastruktur-aufsetzen)
- [5. strict mode](#5-strict-mode)
- [6. Die ersten besonderen Typen: Union Types & Literal Types](#6-die-ersten-besonderen-typen-union-types--literal-types)
- [7. Type- und Value-Welt](#7-type--und-value-welt)
- [8. Generic Type alias](#8-generic-type-alias)
- [9. any @ts-ignore und @ts-expect-error](#9-any-ts-ignore-und-ts-expect-error)
- [10. Exhaustivenes checks](#10-exhaustivenes-checks)
- [11. Abschluss](#11-abschluss)

# TypeScript — Eine Kostprobe

**Kurzzusammenfassung**

TypeScript erobert die Welt und vielleicht auch dein Herz. In diesem Workshop bekommst du eine kleine Kostprobe davon, wie du selbst ein TypeScript Projekt aufsetzen kannst, was TypeScript so besonders macht und welche Tricks und Kniffe es gibt, den Schreib- und Wartungsaufwand in deinem TypeScript-Projekt so gering wie möglich zu halten.

Alles was du dafür brauchst, ist eine IDE, die TypeScript versteht (ich persönlich nutze VS Code, Alternativen wie die JetBrains-Produkte oder Atom gehen auch, da kann ich aber weniger Support geben) und eine Installation von einer halbwegs aktuellen Version von Node.js/npm.

JavaScript-Grundlagen können außerdem nicht schaden, sind aber nicht vorrausgesetzt [MDN-JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide).

## 1. Präambel

### 1.1. Wie ist dieser Workshop aufgebaut?

Diese Unterlagen wurden so konzipiert, dass du dich auch selbständig durch den Workshop arbeiten kannst. In jeder Sektion wird zunächst etwas Wissen vermittelt, welches du benötigst, um die folgende Aufgabe zu lösen. Im `\src` Order findest du zudem Lösungen zu den einzelnen Aufgaben.

### 1.2. Was ist TypeScript?

TypeScript ist die meist-verwendete "Compile-to-JS" Programmiersprache. Das heißt, wir schreiben zwar TypeScript Code, dieser wird aber nie direkt ausgeführt, sondern immer erst zu JavaScript umgewandelt, um dann ausgeführt zu werden. Ziel von TypeScript ist es, statische Typisierung zur dynamischen Sprache JavaScript hinzuzufügen. TypeScript ist damit ein simpler Aufsatz auf JavaScript bis auf die Typannotationen, sieht TypeScript genauso aus wie JavaScript.

### 1.3. Wieso TypeScript?

TypeScript macht aus JavaScript eine Programmiersprache, mit der auch größere komplexere Projekte implementiert werden können. Extrem viele Fehler, die bei JavaScript erst zu Laufzeit auftreten würden, findet der TypeScript Compiler bevor wir eine Zeile Code ausführen müssen. Damit sind dann auch größere Refactorings oder Funktionen wie "Find References" oder "Find implementations" möglich.

Diese Vorteile sind auch durch Community-Umfragen sichtbar: 93% der Nutzer:innen würden im nächsten Webprojekt wieder zu TypeScript greifen [State of JS 2020](https://2020.stateofjs.com/en-US/technologies/javascript-flavors/) und die Stack Overflow Developer Survey platziert TypeScript hinter Rust und Clojure auf Platz 3 der meist geliebten Programmiersrpachen [Loved vs. Dreaded](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-programming-scripting-and-markup-languages)

## 2. Einführung in npm und Node.js

Wir wollen uns in diesem Workshop TypeScript erstmal isoliert anschauen, also ohne Framework, Bibliothek oder Browser. Dafür richten wir ein Node.js-Projekt ein, sodass wir den resultierenden JavaScript Code direkt auf dem Rechner ausführen können.

🎯 Ziel: Ein Node.js Projekt ist richtig eingerichtet und du kannst JavaScript Code auf deinem Rechner ausführen

### 2.1. Installationen prüfen

🎓 Wissen: npm ist der **N**ode **P**ackage **M**anager und ist damit das Analog zu nuget bzw. maven. Du wirst heute npm nutzen, um das Projekt aufzusetzen, Pakete zu installieren und Start-Skripte zu definieren.

🎯 Ziel: Wir sind sicher, dass Node.js und npm auf deinem Rechner installiert und eingerichtet ist.

1. 💪 Öffne einen Terminal
2. 💪 Führe `node --version` aus. Als Ergebnis solltest du eine Versionsnummer auf der Konsole erhalten hier sollte min. 12.X eingerichtet sein.
3. 💪 Führe `npm --version` aus. Auch hier sollte eine Versionsnummer erscheinen. (min. 6.X)

### 2.2. Projekt aufsetzen

🎓 Wissen: Der Einstiegspunkt in jedes Node.js-Projekt ist immer die `package.json`-Datei. Sie definiert Abhängigkeiten, relevante Entwicklungsskripte und weitere Metainformationen über das Projekt.

🎯 Ziel: Wir haben ein Projekt, wo wir Code ausführen und Pakete installieren können.

1. 💪 Lege einen neuen Ordner für unser Spielprojekt an
2. 💪 Öffne einen Terminal in diesem Ordner
3. 💪 Führe `npm init --yes` aus. Dadurch wird eine neue Datei `package.json` angelegt, die das Projekt beschreibt. Durch `--yes` werden die defaults akzeptiert, die uns aktuell reichen.
4. 💪 Lege eine neue Datei an: `src/index.js` und schreibe `console.log('Hello World');` in diese Datei
5. 💪 Führe über den Terminal `node src/index.js` aus. (Passe den Dateipfad an dein Betriebssystem an, unter Windows: `src\index.js`)

💣 Problem: Auch wenn das bereits funktioniert, können andere Entwickler:innen nicht wissen, wie das Projekt gestartet wird. Deswegen nutzen wir npm-Skripte, um bestimmte Routinen für den Entwicklungsprozess festzuhalten.

🎯 Ziel: Ein npm Skript für das Starten des Projektes ist definiert

1. 💪 Öffne die `package.json`-Datei.
2. 💪 Je nach npm Version ist in diesem JSON bereits ein Bereich `scripts` vorhanden, wenn nicht, definiere diesen und definiere ein neues Feld: `start`.
3. 💪 In den Wert des Feldes legst du den String `"node src/index.js"`. Das Ergebnis sollte ungefähr so aussehen:

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

4. 💪 Starte im Terminal `npm run start`, um unser start-Skript anzuwerfen.

💣 Problem: Wir haben jetzt ein lauffähiges Node.js Projekt. Node.js selbst kann aber nur JavaScript aussführen, wir wollen aber ja TypeScript schreiben. Im nächsten Schritt müssen wir also den TypeScript-Compiler konfigurieren.

### 2.3. TypeScript einrichten

🎓 Wissen: In einem npm-Projekt, sind alle Dependencies lokal installiert (im `node_modules` Ordner). Vorteil davon ist, dass es keine Konflikte mit globalen Installationen geben kann und, dass der Source Code der Pakete direkt verfügbar und damit debug und veränderbar ist. Als Nachteil liegen Pakete dadurch pro Projekt einmal auf der Festplatte, wodurch viel Speicherplatz verbraucht wird.

🎓 Wissen: Zusätzlich zur `package.json` benötigt ein TypeScript-Projekt noch eine weitere Konfigurationsdatei, die `tsconfig.json`. Hier werden Konfiguriationen für den TypeScript-Compiler abgelegt.

🎯 Ziel: Der TypeScript-Compiler ist installiert und konfiguriert, sodass du TypeScript Code entwickeln und ausführen kannst.

1. 💪 Bevor wir mit den Aufgaben anfangen, wollen wir unser Projekt mit git Versionieren. Führe dazu im Terminal `git init` aus. Füge zudem den `node_modules/` Ordner zu `.gitignore` hinzu und commite den aktuellen Stand.
2. 💪 Führe im Terminal `npm i --save-dev typescript ts-node`. `npm i ` steht dafür für `install`, `--save-dev` sagt npm, dass die Pakete nur für die Entwicklung unseres Projektes nötig sind, es sind keine Laufzeitabhängigkeiten. Die Einteilung in dependencies und devDependencies ist bei Applikationen aber eher Convention, nur bei der Entwicklung von Bibliotheken ist diese Trennung absolut wichtig.
3. 💪 Lege im Root deines Projektes eine neue Datei an: `tsconfig.json` und befülle sie mit folgendem Inhalt:

```json
{
  "compilerOptions": {
    "moduleResolution": "Node",
    "target": "ES2019",
    "noEmit": true,
    "esModuleInterop": true
  }
}
```

Eine genaue Referenz über die verschiedenen Felder der tsconfig gibt es hier: https://www.typescriptlang.org/tsconfig

3. 💪 Benenne die Datei `index.js` um in `index.ts`
4. 💪 Ändere das Start-Skript in der `package.json` in `node -r ts-node/register ./src/index.ts`
5. 💪 Führe den Code aus mit `npm run start` und prüfe, ob das Programm noch ordentlich läuft.

🎓 Wissen: Zum Ausführen des TypeScript Codes verwenden wir [ts-node](https://typestrong.org/ts-node/). Dieses Tool wandelt beim Start der Applikation jeglichen TypeScript Code um in JavaScript und leitet den Code dann weiter an Node.js für die Ausführung.

💣 Problem: Immerhin können wir jetzt TypeScript-Code ausführen. ts-node prüft vor dem Ausführen auch, ob wir irgendwo Typfehler im Projekt haben, diese Prüfung wollen wir aber auch durchführen, ohne das Projekt selbst starten zu müssen.

6. 💪 Definiere ein neues npm-Skript in der `package.json` mit dem Namen `tsc-watch` mit dem folgenden Inhalt `"tsc --watch"`. Dadurch startet der TypeScript-Compiler und prüft bei jeder Änderung in einer Source Code Datei ob unser Projekt noch richtig kompiliert. Diesen Prozess lässt du bei der Entwicklung einfach im Terminal offen.

## 3. Theoretischer Hintergrund zu TypeScript (und JavaScript)

### 3.1. Grundlagen der Typisierung

🎓 Wissen: Wie bereits erwähnt, ist TypeScript ein Aufsatz auf JavaScript, dementsprechend sieht unser Code fast genauso aus wie JavaScript, nur können an vielen Stellen Typangaben gemacht werden.

🎓 Wissen: TypeScript verfügt über eine ausgeprägte **Inferenz**-Logik. Der Compiler versaucht selbständig herauszufinden, welchen Typ unsere Variablen haben:

```ts
// TypeScript infers type 'number'
let x = 5;

// Type 'string' is not assignable to type 'number'.
x = "string";
```

🎓 Wissen: Die Inferenz funktioniert auch genauso bei Rückgabewerten von Funktionen.

```ts
// TypeScript infers return type 'number'
function randomNumber() {
  // Determined by dice throw.
  return 4;
}

// TypeScript infers type 'string'
let x = "test";

// Type 'number' is not assignable to type 'string'.
x = randomNumber();
```

🎓 Wissen: Die einzigen Stellen, wo wir Typen also selbst angeben müssen sind Funktionsparameter und die Fälle, in denen wir die Inferenz überschreiben wollen oder besonders explizit sein wollen.

```ts
// Long and complex function
// signature should directly show return type string
function sum(a: number, b: string): string {
  // ...
  return b.repeat(a);
}

// Unnecessary type annotation
let x: number = 5;
```

🎓 Wissen: TypeScript kann dabei mit den folgenden Typen umgehen:

```ts
// No distinction between Int, Float etc.
let a: number = 5.5;

let b: string = "Test";

// Arrays/lists with dynamic length
let c: number[] = [1, 2, 3];
c.push(4);

// Shapes for arbitrary objects.
// We don't have to define interfaces but can annotate these types inline.
let d: { name: string; age: number } = { name: "Hans", age: 48 };

// Can only contain null
let e: null = null;

// Can only contain undefined
let f: undefined = undefined;
```

🎓 Wissen: Eine Besonderheit von TypeScript ist, dass Typen immer strukturell verglichen werden und nicht nach Namen ([structural vs nominal typing](https://medium.com/@thejameskyle/type-systems-structural-vs-nominal-typing-explained-56511dd969f4))

```ts
let x = { a: 1, b: 2, c: 3 };

function logA(arg: { a: 1 }) {
  // ...
}

// Works. Because TypeScript does not care about
// the names or origins of a type, only about
// the structure.
// TypeScript checks if x has all properties
// required by logA and says, that this call
// is fine.
logA(x);
```

🎓 Wissen: Eines der Designprinzipien von TypeScript ist die nahtlose Interoperabilität von JavaScript Code. Dafür gibt es in TypeScript den `any`-Typ. Werte, die mit `any` typisiert sind, erlauben zu Compile-Zeit alles!

```ts
let x: any = null;

// Will not show a compile error
// but will crash at runtime.
x.some.field.that.does.not.exist(123);
```

🎓 Wissen: Durch die Inferenz von TypeScript verbreitet sich any, wenn es einmal da ist, wie ein Lauffeuer im System. Du solltest beim Entwickeln stets darauf achten. dass `any` nur innerhalb eines Modules/einer Funktion benutzt wird. Die Grenzen zwischen Modulen/Systemen sollten immer richtig typisiert sein.

🎓 Wissen: Seit 2015 unterstützt JavaScript sein eigenes Modul-System ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)). Mit diesen Modulen können wir unseren Code auf mehrere Dateien aufteilen und klar-definierte Grenzen zwischen diesen Dateien schaffen. TypeScript unterstützt dieses Modulsystem auch vollständig:

```ts
// src/lib/library.ts

export const pi = 3;

export function circumference(radius: number) {
  return 2 * radius * pi;
}
```

```ts
// src/app.ts

// Paths to own modules must start with .
// Otherwise installed packages from node_modules
// taken
import { circumference } from "./lib/library";

console.log(circumference(10));
```

🎓 Wissen: Gute IDEs können so konfiguriert werden, dass sie sich selbständig um die Imports kümmern. Ziel muss eigentlich sein, dass wir die Imports nie per Hand anpassen müssen. Wir schreiben im Code einfach `circu...` und nutzen das Autocomplete der IDE, um den Import zu verwenden.

🎓 Wissen: Auch wenn wir im Code Typinformationen hinzufügen können, werden diese Annotaionen vom Compiler restlos entfernt. Zur Laufzeit ist es nicht möglich herauszufinden, welcher Typ an einer Variablen definiert war. Das heißt auch, dass JavaScript-Code unseren TypeScript-Code benutzen und falsch aufrufen kann. Wenn wir also eine Bibliothek entwickeln, die auch in JavaScript-Projekten genutzt wird, müssen wir damit rechnen, dass unser Code auch mal "falsch" aufgerufen wird.

🌌 Umfeld: Stell dir vor, du arbeitest an einem System zur Verwaltung eines Online-Shops. In diesem Umfeld wollen wir ab jetzt diverse kleine Übungen durchgehen, um TypeScript besser kennenzulernen

🎯 Ziel: Ersten Code schreiben, verstehen und zum Laufen bringen

1. 💪 Lege einen neuen Ordner an: `domain`
2. 💪 Lege darin einen neuen Ordner an `vat` (für Value Added Tax - Mehrwertsteuer)
3. 💪 Erstelle eine neue Datei `src/domain/vat/calculations.ts`
   1. 💪 Implementiere die folgenden drei Funktionen:
      1. `calculateVAT` - Bekommt den Netto-Preis als Argument und berechnet die Mehrwertsteuer (erstmal mit 19%)
      2. `calculateTotalPrice` - Bekommt den Netto-Preis als Argument und berechnet den Brutto-Preis
      3. `calculatePriceDetails` - Bekommt den Netto-Preis als Argument und gibt ein Objekt mit 3 Feldern zurück: `net`, `total` und `vat`
4. Importiere die Funktionen in `index.ts` und logge dir mit `console.log` ein Paar Preise mit Netto, Brutto und Steuer auf die Konsole.

💣 Problem: Du hast jetzt erfolgreich dein erstes TypeScript-Modul entwickelt! Aber bist du dir wirklich sicher, ob alles funktioniert? Eine gute Lösung um das zu prüfen und auch sicherzustellen, dass das so bleibt, sind automatisierte Tests, um die schreiben zu können, brauchen wir noch etwas Infrastruktur.

## 4. Tests schreiben

### 4.1. Infrastruktur aufsetzen

🎓 Wissen: In der JavaScript-Welt gibt es viele verbreitete Test-Runner und Test-Frameworks. In diesem Workshop möchten wir [Jest](https://jestjs.io/) benutzen. Jest ist sehr einfach einzurichten, sehr umfangreich, dafür aber etwas langsam beim Aufbau der Testumgebung.

🎯 Ziel: Dein erster Test ist geschrieben und kann ausgeführt werden.

1. 💪 Führe den Befehl im Terminal aus: `npm i --save-dev jest ts-jest @types/jest`
2. 💪 Lege im Root deines Projektes eine neue Datei an: `jest.config.js` und befülle sie mit dem folgenden Inhalt:

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```

3. 💪 Füge ein neues npm-Skript in der `package.json` mit dem Namen `test` und dem Befehl `"jest"` hinzu.
4. 💪 Lege eine neue Datei an: `src/domain/vat/calculations.test.ts` und übernimm den folgenden Test-Test:

```ts
test("True should be true", () => {
  expect(true).toBe(true);
});
```

5. 💪 Starte die Tests mit `npm run test`

🎓 Wissen: Du kannst einem npm-Skript auch weitere Command-Line-Arguments mitgeben, indem du die Argumente für das Skript mit `--` von den Argumenten für npm abtrennst. Du kannst zum Beispiel: `npm run test -- --watch` benutzen, um den Watch-Modus von Jest zu aktivieren.

6. 💪 Schreibe Tests ([Dokumentation zu Matching-Funktionen](https://jestjs.io/docs/using-matchers)) für `calculateVAT` und decke dabei mindestens die folgenden Fälle ab:
   1. `10` -> `1.9`
   2. `12` -> `2.28`
   3. `null` -> ⚡ - Soll Laufzeitfehler werfen.

💣 Problem: Das ist ja erstmal schon nicht schlecht. Mich stört aber, dass wir den null-Fall quasi bei jeder Funktion abdecken müssten. Glücklicherweise hat TypeScript dafür eine Lösung!

## 5. strict mode

🎓 Wissen: Aktuell erlaubt uns TypeScript die Typannotationen weg zu lassen und inferiert einfach `any`. Zudem erlaubt TypeScript aktuell auch `null` an jeden Typen zu übergeben. Das tut TypeScript aber nur, weil es so konfiguriert ist. In Projekten, in denen wir von Anfang an auf TypeScript setzen, können wir uns aber auch für den strikten Modus entscheiden. So kann TypeScript wesentlich mehr Fehler entdecken, schränkt uns aber auch etwas ein, bzw. zwingt uns dazu, explizit zu werden.

🎯 Ziel: Wir möchten von Anfang an im strict mode arbeiten, da TypeScript so wesentlich mehr Fehler finden kann und uns dazu zwingt, unsere Typen genauer zu definieren.

1. 💪 Öffne `tsconfig.json` und füge in die `compilerOptions` ein: `"strict": true`
2. 💪 Starte das `tsc-watch`-Skript erneut und behebe alle Compile-Fehler

💣 Problem: Großartig, du musst nun nie wieder auf null prüfen! TypeScript erlaubt es nicht mehr, Funktionen mit `null` aufzurufen! Das heißt aber nicht, dass wir null überhaupt nicht mehr nutzen dürfen. Wenn wir es benutzen wollen, müssen wir nur mit angeben, dass Variablen oder Parameter auch null sein dürfen. In diesen Fällen wird TypeScript uns dann zwingen, erst die Null-Variante zu prüfen, bevor wir mit Werten arbeiten.

## 6. Die ersten besonderen Typen: Union Types & Literal Types

🎓 Wissen: In TypeScript können wir in eine Variable nicht nur einen Typen legen. Wir können sogenannte [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) verwenden, um anzugeben, dass in einer Variable der eine oder der andere Typ enthalten ist:

```ts
function repeat(x: number | string, times: number) {
  if (typeof x === "string") {
    // Here, TypeScript knows, that x is of type string
    return x.repeat(times);
  }

  // Here, TypeScript knows that x is of type number
  // since the string case already returned.
  return x.toFixed(1).repeat(times);
}

repeat(5, 2); // -> 5.05.0
repeat("5", 2); // -> 55
```

🎓 Wissen: Neben den allgemeinen Typen für string und number, kann TypeScript auch sog. [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) verstehen:

```ts
// x can contain either the string "ON" or the string "OFF"
let x: "ON" | "OFF" = "ON";

// TypeScript can combine any two or more types with |
let y: number | "T" | null | { x: 5 } = null;
```

💣 Problem: So können wir schon relativ komplexe Typen zusammenbauen. Aktuell schreiben wir die Typen aber immer entweder direkt an Variablen oder an Funktionsparameter. Wir müssen sie aber immer wieder schreiben 😟

🎓 Wissen: Um unnötige Wiederholung zu vermeiden, können wir sog. [Typ Aliase](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) verwenden, um definierte Typen zu referenzieren:

```ts
type Switch = 'ON' | 'OFF';

function x(switch: Switch) {
  if (switch === 'ON') {

  } else {

  }
}

// Type aliases can also be used as interfaces!
type PriceDetails = {
  vat: number;
  net: number;
  total: number:
}
```

🎯 Ziel: Wir wollen unsere Steuer-Funktionen jetzt so anpassen, dass angegeben werden kann, ob der normale Steuersatz oder der reduzierte Steuersatz verwendet werden soll. Wo in anderen Programmiersprachen ein enum benutzt würden müsste, können wir in TypeScript String Literals mit einem Union Type kombinieren, um dieses Problem zu lösen.

1. 💪 Definiere einen Union Type `VATType` mit den Werten `DEFAULT` (19%) und `"REDUCED"` (7%)
2. 💪 Alle VAT Funktionen sollen als zusätzliches Argument einen VATType bekommen, und diesen in der Berechnung mit einbeziehen.
3. 💪 Erweitere deine Tests.

🎓 Wissen: In JavaScript sind Funktionen "first-class-citizens". Das heißt, sie können wie jeder andere Datentyp auch verwendet werden: Du kannst Funktionen in Variablen legen, Funktionen als Argumente übergeben oder auch Funktionen von anderen Funktionen zurück geben lassen. Daher muss auch TypeScript in der Lage sein, den Typ einer Funktion zu definieren:

```ts
// Function without arguments that returns nothing
type F1 = () => void;

type F2 = (a: number, b: string) => number;

// Function with arbitrary arguments and arbitrary return type.
type F3 = (...args: any[]) => any;

function computeNumbers(
  arr: number[],
  compute: (num: number) => number
): number[] {
  // TypeScript cannot infer the type of the empty array.
  const result: number[] = [];

  for (const item of arr) {
    result.push(compute(item));
  }

  return result;
}

// returns 2, 4, 6
computeNumbers([1, 2, 3], (n) => n * 2);
```

🎯 Ziel: Weitere Domänen-Konzepte sind definiert

1. 💪 Definiere einen Union Type für die Produktkategorie mit den Werten:
   1. `"ELECTRONICS"`
   2. `"FOOD"` (reduzierter Steuersatz)
   3. `"PARTY_SUPPLIES"`
2. 💪 Definiere einen Typen `Product` mit den folgenden Feldern:
   1. id (Zahl)
   2. name
   3. productCategory
   4. netPrice
   5. getPriceDetails (berechnet anhand der Kategorie und des Netto-Preises die Steuer-Details) - Rückgabewert soll analog zu `calculatePriceDetails` gebaut werden.
3. 💪 Definiere eine Funktion `createProduct`, die als Argumente Name, Preis & Kategorie erhält und ein Produkt-Objekt erzeugt. Für die ID soll eine zufällige Zahl zwischen 100.000 und 999.999 generiert werden.
4. 💪 Schreibe Tests für `createProduct` und die resultierenden Produkte

## 7. Type- und Value-Welt

🎓 Wissen: In TypeScript sind die Typ-Ebene und die Wert-Ebene erstmal strikt voneinander getrennt. Es kann in beiden Welten den gleichen Identifier geben, ohne, dass es zu Konflikten kommt, da bei jeder Referenz eindeutig ist, ob diese in der Typ-Ebene oder der Wert-Ebene gilt.

```ts
// Type and value can share same name.
type Identifier = { a: number };
let Identifier = { a: 1 };

// After ":", a type is expected, after "a" a value
let x: Identifier = Identifier;
```

🎓 Wissen: Einen Wert von der Typ-Ebene in die Wert-Ebene zu verschieben ist nicht möglich. Andersherum allerdings schon! Wir können aus bestimmten Werten den inferierten Typ extrahieren und auf Typ-Ebene heben:

```ts
const person = { name: "Peter", age: 58 };

// Using typeof on type level lifts a value
// into the type level.
type Person = typeof person;

// Person is now { name: string, age: number }
```

🎓 Wissen: TypeScript inferiert bei string und number literals immer den "geweiteten" Typ string oder number, also in unserem Beispiel von oben nicht den literal Type `"Peter"` sondern `string`. Dieses Verhalten können wir mit Hilfe von const-Assertions noch weiter einschränken:

```ts
let x = { switch: "ON" as const };

// X = { switch: "ON"; }
type X = typeof x;

let y = ["A", "B", "C"] as const;

// Y = readonly ["A", "B", "C"]
type Y = typeof y;
```

🎓 Wissen: TypeScript erlaubt uns nicht nur, Typen aus Laufzeitwerten heraus zu generieren, wir können auch Typen aus anderen Typen extrahieren, kombinieren und so viel Schreib- und Wartungsarbeit sparen:

```ts
type BaseEntity = {
  id: string;
};

// Always gets the type of the id field
// When we change BaseEntity.id at a later point in time
// EntityId will adapt automatically.
type EntityId = BaseEntity["id"];

// Whenever we need a new value for our switches
// We add it here and the Type of a SwitchValue will
// automatically adapt.
const switchValues = ["ON", "OFF", "INDETERMINATE"] as const;

// SwitchValues = readonly ["ON", "OFF", "INDETERMINATE"]
type SwitchValues = typeof switchValues;

// [number] extracts the union type of all indexes
// of an array
// SwitchValue = "ON" | "OFF" | "INDETERMINATE"
type SwitchValue = SwitchValues[number];
```

🎯 Ziel: Wir möchten jetzt automatisiert einige Mock-Produkte erzeugen. Damit das geht, brauchen wir zur Laufzeit eine Liste aller möglichen Werte für den VAT-Type und die Produktkategorie. Um Werte nicht doppelt pflegen zu müssen, wollen wir die Typen aus Laufzeitwerten ableiten.

1. 💪 Nutze const-assertions und den typeof Operator, um die Union-Types für `VATType` und `ProductCategory` aus Laufzeit-Werten zu extrahieren.
2. 💪 Schreibe eine Funktion `generateMockProduct`, welche ein zufälliges Produkt (zufällige Kategorie, zufälliger Preis zwischen 1 und 15€ auf 2 Dezimalstellen gerundet) und automatisch generierten Name (Produkt - Zufallszahl) erzeugt.
3. 💪 Nutze `generateMockProduct`, um 10 zufällige Produkte zu erzeugen.
4. 💪 Definiere eine neue Funktion `filterProducts`. Ziel dieser Funktion ist es, aus der Liste der Produkte alle Produkte zu extrahieren, die die gleichen Felder wie Argument 2 haben. Die Funktion soll dafür 2 Argumente bekommen:
   1. eine Liste von Produkten
   2. ein Objekt, auf dem **[OPTIONAL](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties)** alle Datenfelder (name, id, productCategory & netPrice) aber NICHT die Funktion angegeben werden kann.
5. 💪 Schreibe Tests für `filterProducts`, du kannst dich dabei an den folgenden Beispielen orientieren:

```ts
let products: Product[] = [
  /* ... */
];

// returns all food products
let filtered1 = filterProducts(products, { productCategory: "FOOD" });

// returns all products that have the id 123456 AND have a price of 10
let filtered2 = filterProducts(products, { id: 123456, price: 10 });

// Should throw a TypeScript error, since getPriceDetails is not a valid
// field to filter by (only data fields can be used)
let filtered3 = filterProducts(products, { getPriceDetails: () => 1 });
```

💣 Problem: Wir haben jetzt eine schön dynamische Filterfunktion gebaut, wenn wir bei Produkten allerdings ein neues Feld hinzufügen, müssen wir selbst daran denken, die Filterfunktion anzupassen. Damit müssen wir wieder zwei Stellen im Code manuell synchron halten. Mit TypeScript kann das allerdings in den meisten Fällen vermieden werden!

## 8. Generic Type alias

🎓 Wissen: TypeScripts Fähigkeit, Typen aus anderen Typen zu erzeugen ist einer der USPs der Programmiersprache. ([Ja, TypeScript Typen sind Turing-Vollständig](https://github.com/microsoft/TypeScript/issues/14833)) Eine ganze Sektion der Dokumentation widmet sich diesem Thema: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
Die Basics sind in folgendem Beispiel dargestellt:

```ts
type T1 = { a: number; b: string };
// T2 = 'a' | 'b'
type T2 = keyof T1;

// number | string, same as T1[keyof T1]
type T3 = T1[T2];

// Creates a new type T4, where every key
// of T1 is optional. The values have the same types
type T4 = {
  [Key in keyof T1]?: T1[Key];
};
```

💣 Problem: Damit können wir Typen sehr flexibel Transformieren. Diese Transformationen sind so aber nicht wiederverwendbar. Was wir brauchen, sind "Funktionen" die auf Typen arbeiten. Und genau das sind Generics:

```ts
type ValueOf<TObject> = TObject[keyof TObject];

type T1 = { a: number; b: string };

// string | number
type ValuesOfT1 = ValueOf<T1>;

type PartialObject<TObject> = {
  [Key in keyof TObject]?: TObject[Key];
};

// PartialT1 = {
//    a?: number | undefined;
//    b?: string | undefined;
// }
type PartialT1 = PartialObject<T1>;
```

🎓 Wissen: Viele dieser Typ-Transformationen sind bereits in TypeScript eingebaut und global verfügbar (wie z.B. `Partial`, eine eingebaute Implementierung des `PartialObject` Beispiels). Eine Liste dieser eingebauten Typen findet sich in der [Dokumentation](https://www.typescriptlang.org/docs/handbook/utility-types.html).

1. 💪 Füge auf dem Produkt ein weiteres Feld `description` hinzu und behebe alle Compile-Fehler. **Hinweis:** Nutze das tsc-Script was wir definiert haben.
2. 💪 Nachdem du die Typfehler beseitigt hast, überlege, an welchen Stellen das neue Feld jetzt noch hinzugefügt werden muss...
3. 💪 Anstatt den `Product` Typ selbst zu definieren, wollen wir diesen aus dem Rückgabewert von `createProduct` extrahieren. Nutze dazu `typeof` + weitere [Hilfstypen](https://www.typescriptlang.org/docs/handbook/utility-types.html)
4. 💪 Anstatt das Partielle Produkt von `filterProducts` manuell anzugeben, soll dieses aus dem ursprünglichen `Product` Typ generiert werden. Achte daruaf, dass das Feld `getPriceDetails` nicht enthalten ist.
5. 💯 Zusatzaufgabe für Experten: Schreibe den Typ für das partielle Produkt so, dass automatisch nur die Felder angegeben werden können, in denen KEINE Funktionen liegt. Wenn also auf `Product` eine weitere Funktion z.B. `serialize` gepflegt wird, soll danach nicht gefiltert werden dürfen (ohne Anpassungen an `filterProducts`) und wenn ein weiteres Datenfeld dazukommt, soll es automatisch mit gefiltert werden können.

## 9. any @ts-ignore und @ts-expect-error

💣 Problem: Aktuell verlassen wir uns darauf, dass die Typen in unserem System immer zur Implementierung passen. Es ist uns gerade nicht möglich, Funktionen auch mal "Falsch" aufzurufen, um z.B. Fehlerbehandlung zu testen. Dafür brauchen wir Lösungen:

```ts
function sum(a: number, b: number): number {
  return a + b;
}

test("sum should throw an error when called with anything but numbers", () => {
  // TypeScript will complain here and will always show an error :(
  expect(() => sum(1, "two")).toThrow();

  // Solution 1: any
  let arg: any = "two";
  expect(() => sum(1, arg)).toThrow();
  expect(() => sum(1, "two" as any)).toThrow();

  // Solution 2: @ts-ignore

  // @ts-ignore we want to test this behavior
  expect(() => sum(1, "two")).toThrow();

  // Solution 3: @ts-expect-error. Will throw a type error,
  // When the following line DOES NOT throw an error.

  // @ts-expect-error
  expect(() => sum(1, "two")).toThrow();
});
```

1. 💪 Schreibe einen Test, der prüft, ob `calculateVAT` einen Fehler wirft, wenn sie mit einem unbekannten VAT-Type aufgerufen werden.
2. 💪 Füge bei `VATType` einen neuen Wert hinzu: `TEMPORARY_COVID_VAT`

💣 Problem: Immerhin können wir jetzt einen Test für unbekannte VAT-Typen schreiben. Beim Hinzufügen eines neuen Wertes müssen wir aber immer noch selbst wissen, ob wir diesen neuen Wert überall hinzugefügt haben. Unter Umständen hast du die letzte Aufgabe schon so interpretiert, dass natürlich die Berechnungsfunktionen auch mit diesem neuen Wert umgehen können müssen. Hätte jemand anderes das auch gewusst? Hätte jemand das gewusst, der gerade neu ins Projekt gekommen ist? Irgendwie müssten wir eine Möglichkeit finden, den Compiler dazu zu nutzen, alle Stellen zu finden, wo wir ALLE Optionen abprüfen wollen...

## 10. Exhaustivenes checks

🎓 Wissen: Wir können uns hier ein Feature von TypeScript zu nutzen machen, was wir ganz am Anfang schon mal abgedeckt hatten: Die Control-Flow-Analyse von TypeScript

```ts
function repeat(x: number | string, times: number) {
  if (typeof x === "string") {
    // Here, TypeScript knows, that x is of type string
    return x.repeat(times);
  }

  if (typeof x === "number") {
    // Here, TypeScript knows that x is of type number
    // since the string case already returned.
    return x.toFixed(1).repeat(times);
  }

  // TypeScript KNOWS that we can never reach this spot,
  // since x can only be of type string or number.
  // TypeScript annotates this variable with the never type.
  // This line will only NOT throw a type error, when x is also of type never.
  let result: never = x;

  // To help non-TS users of our code, we can additionally throw an error.
  throw new Error(`x has unexpected type ${typeof x}`);
}
```

💣 Problem: Diese zwei Zeilen sind schon sehr nützlich, aber du musst dich immer an diese Kombination erinnern... Wir sollten das in eine eigene Funktion schreiben:

```ts
// This function never returns a value,
// since it always throws an error.
// Only use this in places that will never
// get executed under normal circumstances.
function assertNever(x: never): never {
  throw new Error(`x has unexpected type ${typeof x}`);
}

function repeat(x: number | string, times: number) {
  if (typeof x === "string") {
    return x.repeat(times);
  }

  if (typeof x === "number") {
    return x.toFixed(1).repeat(times);
  }

  assertNever(x);
}
```

1. 💪 Passe deine Berechnungsfunktionen so an, dass sie alle Optionen des `VATType` abdecken und einen Type-Fehler zeigen, wenn irgendwann ein weitere Typ hinzugefügt wird.
2. 💪 Erzeuge eine Lookup-Map von ProductCategory-Werten auf `VATTypes`, sodass wir an einer zentralen Stelle gepflegt haben, welche Steuer bei welcher Produktkategorie verwendet wird. Schreibe hier zuerst ein Typ-Alias für ein Objekt, welches alle Werte von `ProductCategory` als Schlüssel hat und jedem dieser Schlüssel `VATType` zuordnet. Danach können wir die Laufzeitvariable mit den richtigen Werten definieren. So sind wir wieder abgesichert, dass wir für jede Produktkategorie definiert haben, welcher Steuersatz relevant ist.

## 11. Abschluss

🎉 Gratuliere, du hast es geschafft! Du bist mit dem Kerninhalt des Workshops durch und hast einen ersten Einblick in die Arbeit mit TypeScript erhalten. Wie geht es jetzt weiter?
Am besten mit der Arbeit an einem richtigen Projekt. Installiere zum Beispiel [Fastify](https://github.com/fastify/fastify/blob/HEAD/README.md#install), um dein Projekt um eine REST-Schnittstelle zu erweitern. Die Validierung von Inputs könntest du dabei mit [Zod](https://github.com/colinhacks/zod) so implementieren, dass auch direkt der richtige Typ für die Inputs herauspurzelt. Für eine erste Persitenz von Daten, kannst du dir die [FileSystem-API](https://nodejs.org/api/fs.html#fs_file_system) von Node.js anschauen und die Daten erstmal in eine JSON-Datei speichern.
