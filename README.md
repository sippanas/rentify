<h1><p align="center">Rentify</p></h1>

>Projekto tikslas – sukurti platformą, kuri apjungtų ir palengvintų nekilnojamo turto (butų/namų/garažų) ilgalaikės nuomos administravimą.

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
