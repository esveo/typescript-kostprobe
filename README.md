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
- [7. Typ- und Value-Welt](#7-typ--und-value-welt)
- [8. Generic Type alias](#8-generic-type-alias)
- [9. never, any](#9-never-any)
- [10. Mapped Types + Conditional Types](#10-mapped-types--conditional-types)
- [11. Weiterführung](#11-weiterführung)
  - [11.1. Web-Framework](#111-web-framework)
  - [11.2. Persistenz](#112-persistenz)

# TypeScript — Eine Kostprobe

**Kurzzusammenfassung**

TypeScript erobert die Welt und vielleicht auch dein Herz. In diesem Workshop bekommst du eine kleine Kostprobe davon, wie du selbst ein TypeScript Projekt aufsetzen kannst, was TypeScript so besonders macht und welche Tricks und Kniffe es gibt, den Schreib- und Wartungsaufwand in deinem TypeScript-Projekt so gering wie möglich zu halten.

Alles was du dafür brauchst, ist eine IDE, die TypeScript versteht (ich persönlich nutze VS Code, Alternativen wie die JetBrains-Produkte oder Atom gehen auch, da kann ich aber weniger Support geben) und eine Installation von einer halbwegs aktuellen Version von Node.js/npm [Wiki-Eintrag](https://wiki.queo-group.com/display/QUEOCAMPUS/G+-+nodejs-switch-script).

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

🎓 Wissen: In einem npm-Projekt, sind alle Dependencies lokal installiert (im `node_modules` Ordner). Vorteil davon ist, dass es keine Konflikte mit globalen Installationen geben kann und, dass der Source Code der Pakete direkt verfügbar und damit debug und veränder bar ist. Als Nachteil liegen Pakete dadurch pro Projekt einmal auf der Festplatte, wodurch viel Speicherplatz verbraucht wird.

🎓 Wissen: Zusätzlich zur `package.json` benötigt ein TypeScript-Projekt noch eine weitere Konfigurationsdatei, die `tsconfig.json`. Hier werden Konfiguriationen für den TypeScript-Compiler abgelegt.

🎯 Ziel: Der TypeScript-Compiler ist installiert und konfiguriert, sodass du TypeScript Code entwickeln und ausführen kannst.

1. 💪 Führe im Terminal `npm i --save-dev typescript ts-node`. `npm i ` steht dafür für `install`, `--save-dev` sagt npm, dass die Pakete nur für die Entwicklung unseres Projektes nötig sind, es sind keine Laufzeitabhängigkeiten. Die Einteilung in dependencies und devDependencies ist bei Applikationen aber eher Convention, nur bei der Entwicklung von Bibliotheken ist diese Trennung absolut wichtig.
2. 💪 Lege im Root deines Projektes eine neue Datei an: `tsconfig.json` und befülle sie mit folgendem Inhalt:

```json
{
  "compilerOptions": {
    "moduleResolution": "Node",
    "target": "ES2021",
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

🎓 Wissen: Durch die Inferenz von TypeScript verbreitet sich any, wenn es einmal da ist, wie ein Lauffeuer im System. Du solltest beim Entwickeln stets darauf achten. dass `any` nur innerhalb eines Modules/einer Funktion benutzt wird. Die Grenzen zwischen Modulen/System sollten immer richtig typisiert sein.

🎓 Wissen: Seit 2015 unterstützt JavaScript sein eigenes Modul-System ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)). Mit diesen Modulen können wir unseren Code auf mehrere Dateien aufteilen und klar-definierte Grenzen zwischen diesen Dateien schaffen. TypeScript unterstützt dieses Modulsystem auch vollständig:

```ts
// src/lib/library.js

export const pi = 3;

export function circumference(radius: number) {
  return 2 * radius * pi;
}
```

```ts
// src/app.js

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

6. 💪 Schreibe Tests für `calculateVAT` und decke dabei mindestens die folgenden Fälle ab:
   1. `10` -> `1.9`
   2. `12` -> `2.28`
   3. `"test"` -> ⚡ - soll nicht gehen
   4. `null` -> ⚡ - Soll nicht gehen

💣 Problem: Das ist ja erstmal schon nicht schlecht. Mich stört aber, dass wir den null-Fall quasi bei jeder Funktion abdecken müssten. Glücklicherweise hat TypeScript dafür eine Lösung!

## 5. strict mode

🎓 Wissen: Aktuell erlaubt uns TypeScript die Typannotationen weg zu lassen und inferiert einfach `any`. Zudem erlaubt TypeScript aktuell auch `null` an jeden Typen zu übergeben. Das tut TypeScript aber nur, weil es so konfiguriert ist. In Projekten, in denen wir von Anfang an auf TypeScript setzen, können wir uns aber auch für den strikten Modus entscheiden. So kann TypeScript wesentlich mehr Fehler entdecken, schränkt uns aber auch etwas ein, bzw. zwingt uns dazu, explizit zu werden.

🎯 Ziel: Wir möchten von Anfang an im strict mode arbeiten, da TypeScript so wesentlich mehr Fehler finden kann und uns dazu zwingt, unsere Typen genauer zu definieren.

1. 💪 Öffne `tsconfig.json` und füge in die `compilerOptions` ein: `"string": true`
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
   5. getPriceDetails (berechnet anhand der Kategorie und des Netto-Preises die Steuer-Details)
3. 💪 Definiere eine Funktion `createProduct`, die als Argumente Name, Preis & Kategorie erhält und ein Produkt-Objekt erzeugt. Für die ID soll eine zufällige Zahl zwischen 100.000 und 999.999 generiert werden.
4. 💪 Schreibe Tests für `createProduct` und die resultierenden Produkte

## 7. Typ- und Value-Welt

- typeof
- as const
- indexed access type
- Laufzeit und Typwerte gleichzeitig definieren

Category und VATs aus Laufzeitwerten generieren

Dummy Data File bauen:

erzeuge 10 Produkte, mit zufälliger Kategorie, zufälligem Preis (zwischen 1 und 15€) und automatisch generiertem Name (Produkt 1, Produkt 2, etc.)

Schreibe Funktion findProduct(products: Product[], partialProduct: {...})
partialProduct: Hat alle Datenfelder (also nicht die Funktionen) von Product, Werte sind aber Optional

und schreibe Tests

## 8. Generic Type alias

- Product.description hinzufügen (müssen wir an zwei Stellen machen, das ist blöd...)
- typeof + ReturnType
- ReturnType Generic um aus dem Typ einer Funktion, den Typ des Rückgabewerts zu erhalten

- Aufgabe

Das partialProduct Argument von findProduct soll nicht manuell zusammengebastelt werden, sondern abgeleitet werden.

https://www.typescriptlang.org/docs/handbook/utility-types.html

## 9. never, any

Add VAT: TEMPORARY_COVID_VAT

Bevor wir das machen, wollen wir einen Test schreiben, der Sicherstellt, dass VAT einen Fehlerschmeißt, bei unbekanntem VAT-Type
--> Exhaustivenes checks

## 10. Mapped Types + Conditional Types

## 11. Weiterführung

### 11.1. Web-Framework

Fastify: https://github.com/fastify/fastify/blob/HEAD/README.md#install
https://www.fastify.io/

### 11.2. Persistenz

https://www.npmjs.com/package/better-sqlite3
