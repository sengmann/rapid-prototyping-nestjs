# Rapid Prototyping NestJS und Angular

## Was ist Rapid Prototyping?

## Technologie-Entscheidung

Wir möchten Code zwischen Backend, Frontend und Bibliotheken teilen können.
Eine gemeinsame Sprache in allen Teilprojekten zu verwenden bietet sich an.
Auch soll die Einstiegshürde für neue Team-Mitglieder möglichst niedrig sein.
Als Sprache bietet sich Typescript an, da es
a) Entwicklern die bisher nur Javascript Erfahrung haben sich leicht einzuarbeiten
b) Entwicklern die bisher OOP mit z.B.: Java entwicklet haben ein solides Typsystem bereitstellt

Für das Frontend setzen wir auf Angular. Andere Frameworks wären genau so möglich.
Angular bietet ein sehr gutes Gesamtpaket und wird in der bestehenden Umgebung
von mehreren Anwendungen erfolgreich eingesetzt.

Das Backend wird mit dem Framework NestJS entwickelt, das viele Konzepte analog
zu Angular implementiert.

Zur Anbindung an bestehende Microsoft SQL Server Datenbanken nutzen wir TypeORM.
Diese Bibliothek ist ungefähr das, was JDBC im Java Umfeld ist. Es kann zu
verschiedenen Datenbank-Systemen eine Verbindung herstellen. Zusätzlich gibt
es Unterstützung für die Versionierung und automatisierte Datenbankschema-Migration.

## Das Tool Nx

### Was ist NX?

Nx ist eine Erweiterung und Aufsatz auf das Angular Command Line Interface.
Es stellt einen Workspace bereit und bietet Werkzeuge um zum Beispiel Code zu generieren,
das Build-System zu bedienen, oder aber auch Tests zu starten.

Zusätzlich bietet Nx Werkzeuge um Abhängigkeiten innerhalb des Projekts zu steuern
und eine Möglichkeit die Verwendungen von Abhängigkeiten mit Constraints einzuschränken.

### Was ist ein Monorepo?

Anstatt jedes Projekt in ein eigenes Repository zu legen, werden mehrere Projekte in
dem selben Repository abgelegt. Dieses Vorgehen hat mehrere Vorteile:

- Einfachere Wiederverwendung von Quellcode, da keine Versionen als Artefakt veröffentlicht werden müssen.
- Bessere Verwaltung von Abhängigkeiten auf Fremd-Bibliotheken da diese für alle Teilprojekte gleich sind
- Atomare Commits, bei denen Änderungen über alle Teilprojekte hinweg durchgeführt werden
- Teamübergreifende Zusammenarbeit über Projektgrenzen hinweg

Es existieren aber auch Nachteile:

- Sichtbarkeit kann nicht pro Teilprojekt gesteuert werden. Zugriff aufs Repository bedeutet Zugriff auf den gesamten Quellcode
- Nicht alle Build-Systeme unterstützen Monorepos und werden langsamer als separat gebaute Projekte.

### Monorepo mit NX

Für das Prototyping existieren mindestens zwei Projekte, das Backend und das Frontend. Zusätzlich
möchten wir Code für beide Teilprojekte wiederverwenden können. Mit einem NX Workspace können wir
genau das tun.

## Umgebung mit NX einrichten

```bash
npx create-nx-workspace@latest
```

Vergebe den Workspace Namen `tss` und den Application Namen `workshop-prototype`. Wähle das Preset
`Angular-Nest` aus und die Style Extension Sass.

Sobald die Generierung abgeschlossen ist verschiebe den Inhalt des Verzeichnis `tss` in die Project-Root.

Ergänze die `prototype/package.json` den Eintrag `scripts` um ein Script zum Starten des Backends.

```json
{
  "scripts": {
    "start": "ng serve prototype",
    "start:api": "ng serve api"
  }
}
```

## Bibliothek für geteilten Code zwischen Backend und Frontend einrichten

Um Code zwischen Backend und Frontend teilen zu können, schreiben wir geteilten Code
in ein oder mehrere Bibliothek-Projekte. Zu diesem Zweck bietet sich die Verwendung
des `@nrwl/workspace` Schematic an.

```bash
ng g @nrwl/workspace:lib shared
```

## Abgrenzungen von Abhängigkeiten

Um zu vermeiden das jedes Teilprojekt beliebig Code aus fremden Teilprojekten importieren kann,
können wir Constraints setzen. Jedes Projekt kann in der `nx.json` Datei Tags besitzen. In 
der `ts-lint.json` können diese genutzt werden um den Import auf bestimmte Tags zu beschränken.

Füge in der nx.json zu jedem Teilprojekt ein Tag ein. Für das Frontend Projekt verwende den Tag
`scope:frontend`, für das API Projekt den Tag `scope:backend` und für die beiden Bibliotheken
den Tag `scope:lib`.

Erweitere in der `ts-lint.json` die Einschränkung der Imports so, dass Projekte mit dem Tag `scope:lib`
nur aus anderen Projekten mit dem Tag `scope:lib` importieren dürfen. Frontend-Projekte dürfen aus
anderen Frontend-Projekten importieren und aus Bibliotheken. Analog dazu dürfen Backend Projekte andere
Backend Projekte und Bibliotheken verwenden.


## Datengetriebene Entwicklung

In vielen Fällen wird die Umsetzung einer Idee von schon vorhandenen Daten getrieben. In unserem
Beispiel verwenden wir eine bestehende Microsoft SQL Server Datenbank um unseren Prototyp und unsere
UseCases zu beschreiben.

Im Ordner `docker/db` befindet sich die Datei `create_db.sql` in der sich die DDL und einige
Beispiel-Daten finden. Sofern Docker installiert ist kann im Verzeichnis `docker` einfach
mittels docker-compose ein Container mit Datenbank gestartet werden.

```bash
docker-compose up -d
```

Sollte kein Docker verwendet werden können, muss eine Datenbank entweder im Netzwerk oder einer
lokalen Installation erzeugt werden.

![Datenbank Schema](schema.png)

## Entwicklung Backend

### Installieren TypeORM und typeorm-model-generator

Aus einer bestehenden Datenbank möchten wir uns die Klassen des ORM-Mappings generieren lassen.
Dazu nutzen wir im nächsten Schritt den `typeorm-model-generator`. Wir installieren die 
Abhängigkeiten dazu gleich mit. Zusätzlich wird auch der Datenbank-Treiber für die Verbindung
zum Microsoft SQL Server installiert.

```bash
npm install typeorm @nestjs/typeorm typeorm-model-generator mssql
```

In `apps/api/src/AppModule` muss im Decorator unter `imports` TypeormModule eingefügt werden.
Sollte nicht die Datenbank über die `docker-compose.yml` verwendet werden, müssen eventuell 
die Zugangsdaten angepasst werden.

```typescript
@Module({
  imports: [TypeOrmModule.forRoot({
    name: "default",
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "s4fePassword",
    database: "workshop_prototype",
    schema: "dbo",
    synchronize: false,
    entities: []
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```


### Generierung der Entity

Um nun die Entities direkt aus der Datenbank erzeugen zu lassen, nutzen wir den 
`typeorm-model-generator`. Sollte nicht die Datenbank über die `docker-compose.yml`
verwendet werden, müssen eventuell die Zugangsdaten angepasst werden.

```bash
npx typeorm-model-generator -h localhost -d "workshop_prototype" -u sa -x s4fePassword -e mssql -o ./apps/api/src
```

Der Weg wie die Entities generiert werden führt dazu, dass wir in der Datei `apps/api/tsconfig.json`
das Modul-system auf CommonJS umstellen müssen. 

In `apps/api/src/app/app.module.ts` müssen die generierten Entity Klassen in das Array der `entries`
eingetragen werden.

### Definition Schnittstelle zwischen Backend und Frontend

Es ist sinnvoll die Entities nicht 1:1 vom Backend zum Frontend zu senden. Um diese Trennung besser umsetzbar
zu machen wird im `api-interfaces` Projekt ein Vertrag in Form von Interfaces geschlossen.

```typescript
export interface IStandort {
  id: number;
  autolineId: string;
  name: string;
}

export interface INiederlassung {
  id: number;
  gssn: string
  name: string | null;
  standorte: IStandort[]
}

export interface IKfz {
  id: number;
  regno: string | null;
  besitzer: string | null;
}

export type IReperaturStatus = 'Termin' | 'Annahme' | 'Service' | 'Werkstatt' | 'Wäsche' | 'Abholung' | 'Abgeschlossen';

export interface IReperatur {
  id: number;
  auftrag: string | null;
  standort: IStandort,
  kfz: IKfz,
  reperaturStatus: IReperaturStatus
}
```

### API Endpunkte für Stammdaten

Die Datenbank Zugriffe sollen in einem eigenen Service gekapselt sein. Mittels Angular CLI lässt sich ein neuer NestJS
Service generieren. Im Datenbankservice kann per Injection die Connection injiziert werden.

```bash
ng generate @nestjs/schematics:service db --sourceRoot=apps/api/src/app --flat=true
```

In `apps/api/src/app/app.controller.ts` werden neue REST Endpunkte für GET Requests der Stammdaten eingefügt.

```typescript
@Get('niederlassung')
  async getNiederlassungen(): Promise<Niederlassung[]> {
    return this.dbService.loadAllNiederlassungen();
  }
```

### API Endpunkt für Reparaturen

### Anpassen der Datenbank mittels Migration
