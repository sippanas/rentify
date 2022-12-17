<h1><p align="center">Rentify</p></h1>

>Projekto tikslas – sukurti platformą, kuri apjungtų ir palengvintų nekilnojamo turto (butų/namų/garažų) ilgalaikės nuomos administravimą.

>Taikomosios srities objektai: Objekto tipas < Objektas < Kambarys/Patalpa

Platformoje nebus talpinami nuomos skelbimai, viskas orientuota į pačios nuomos administravimą. Išskiriamos trys rolės – nuomotojas, nuomininkas, administratorius. Užsiregistravęs naudotojas platformoje gaus tiek nuomotojo, tiek nuomininko roles ir galės atlikti šių rolių veiksmus vienoje paskyroje. Rolės bus išskiriamos pačiam objektui (nekilnojamam turtui), kur vienas objektas turės vieną nuomotoją bei vieną nuomininką. Pati platforma veiks pakvietimo principu, kur nuomotojas galės pakviesti nuomininką prisijungti prie konkretaus objekto, kur galės atlikti su objekto nuoma susijusius veiksmus.

## Funkciniai reikalavimai
*Neregistruoto sistemos naudotojo galimybės:*
1. Peržiūrėti pradinį platformos puslapį
2. Užsiregistruoti platformoje

*Nuomotojo galimybės:*
1. Prisijungti prie platformos
2. Atsijungti nuo platformos
3. Redaguoti savo profilio informaciją
4. Sukurti naują objektą:
     - Pridėti nuomos kainą ir laikotarpį, už kurį mokama
     - Pridėti komunalinių paslaugų tarifus (vanduo/elektra/dujos)
     - Aprašyti kitą aktualią informaciją teksto formatu
5. Peržiūrėti objekto mokėjimų (nuomos + komunalinių) istoriją
6. Peržiūrėti nuomininkų gedimų pranešimus
7. Sukurti pakvietimą naujam nuomininkui

*Nuomininko galimybės:*
1. Priimti nuomotojo kvietimą
2. Peržiūrėti nuomojamų objektų informaciją
3. Atlikti mokėjimą už nuomą:
     - Suvesti skaitiklių rodmenis
     - Patvirtinti skaitklių rodmenis
     - Atlikti mokėjimą
4. Pranešti apie gedimą pasirinktame objekte

*Administratoriaus galimybės:*
1. Šalinti naudotojus
2. Peržiūrėti objektų informaciją
3. Siųsti pranešimus nuomotojams


## Pasirinktos technologijos projekto įgyvendinimui
- Kliento pusė (angl. Front-end) - **React.js**
- Serverio pusė (angl. Back-end) - **C# (ASP.NET Core)**
- Duomenų bazė - **MySQL**


## API specifikacija
### Objekto tipas
```http
GET /api/object-types/
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 200 - OK

```http
GET /api/object-types/{id}
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 404 - Not Found
- 200 - OK

```http
POST /api/object-types/
```
Body:
```json
{
    "name": "Objekto tipo pavadinimas"
}
```
Galimi atsako kodai:
- 401 - Unauthorized
- 201 - Created

```http
PUT /api/object-types/{id}
```
Body:
```json
{
    "name": "Naujas pavadinimas"
}
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 404 - Not Found
- 200 - OK

```http
DELETE /api/object-types/{id}
```
Galimi atsako kodai:
- 401 - Unauthorized
- 404 - Not Found
- 204 - No Content


## Objektas
```http
GET /api/object-types/{typeId}/objects/
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 404 - Not Found
- 200 - OK

```http
GET /api/object-types/{typeId}/objects/{id}
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 404 - Not Found
- 200 - OK

```http
POST /api/object-types/{typeId}/objects/{id}
```
Body:
```json
{
    "Address": "Objekto adresas",
    "Price": 310,
    "RelevantInformation": "Papildoma informacija"
}
```
Galimi atsako kodai:
- 401 - Unauthorized
- 404 - Not Found
- 201 - Created

```http
PUT /api/object-types/{typeId}/objects/{id}
```
Body:
```json
{
    "address": "Kauno g. 112, Kalvarija",
    "price": 95,
    "relevantinformation": "Signalizacijos kodas: 22211"
}
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 200 - OK

```http
DELETE /api/object-types/{typeId}/objects/{id}
```
Galimi atsako kodai:
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 204 - No Content


## Kambarys/Patalpa
```http
GET /api/object-types/{typeId}/objects/{objectId}/rooms/
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 404 - Not Found
- 200 - OK

```http
GET /api/object-types/{typeId}/objects/{objectId}/rooms/{id}
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 404 - Not Found
- 200 - OK

```http
POST /api/object-types/{typeId}/objects/{objectId}/rooms/
```
Body:
```json
{
    "Name": "Svetainė",
    "Size": 15
}
```
Galimi atsako kodai:
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 201 - Created

```http
PUT /api/object-types/{typeId}/objects/{objectId}/rooms/{id}
```
Body:
```json
{
    "name": "Darbo kambarys",
    "size": 16
}
```
Galimi atsako kodai: 
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 200 - OK

```http
DELETE /api/object-types/{typeId}/objects/{id}
```
Galimi atsako kodai:
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 204 - No Content
