# Rapid Prototyping NestJS und Angular 

## Umgebung mit NX einrichten

```bash
npx create-nx-workspace@latest prototype
```

Ergänze die `prototype/package.json` um einen Eintrag zum Starten des Backends.

```json
{
    "scripts": {
        "start": "ng serve prototype",
        "start:api": "ng serve api",
    }
}
```

## Bibliothek für geteilten Code zwischen Backend und Frontend einrichten

```bash
ng g @nrwl/workspace:lib shared
```
