// form.js

// Vent på, at DOM'en er indlæst
document.addEventListener('DOMContentLoaded', function () {
    // Tilføj event listener til "Fortsæt"-knappen
    const continueButton = document.querySelector('.continue');
    if (continueButton) {
        continueButton.addEventListener('click', function (event) {
            event.preventDefault(); // Forhindrer formularen i at blive sendt

            // Hent værdierne fra inputfelterne
            const navn = document.querySelector('input[type="text"]').value;
            const efternavn = document.querySelectorAll('input[type="text"]')[1].value;
            const adresse = document.querySelectorAll('input[type="text"]')[2].value;
            const by = document.querySelectorAll('input[type="text"]')[3].value;
            const postnummer = document.querySelectorAll('input[type="text"]')[4].value;
            const land = document.querySelectorAll('input[type="text"]')[5].value;
            const telefon = document.querySelectorAll('input[type="text"]')[6].value;
            const email = document.querySelector('input[type="email"]').value;

            console.log('Navn:', navn);
            console.log('Efternavn:', efternavn);
            console.log('Adresse:', adresse);
            console.log('By:', by);
            console.log('Postnummer:', postnummer);
            console.log('Land:', land);
            console.log('Telefon:', telefon);
            console.log('Email:', email);

            // Tjek om alle felter er udfyldt
            if (navn && efternavn && adresse && by && postnummer && land && telefon && email) {
                console.log('Alle felter er udfyldt. Viser toast-notifikation.');

                // Vis toast-notifikation
                const toast = document.getElementById('toast-notification');
                if (toast) {
                    toast.classList.add('toast-visible');
                    console.log('Toast-notifikation blev vist.');

                    // Fjern notifikationen efter 3 sekunder
                    setTimeout(function () {
                        toast.classList.remove('toast-visible');
                        console.log('Toast-notifikation blev fjernet.');
                    }, 3000);
                } else {
                    console.error('Toast-notifikationen blev ikke fundet i DOM\'en.');
                }
            } else {
                console.log('Ikke alle felter er udfyldt. Viser alert-boks.');
                alert('Udfyld venligst alle felter.');
            }
        });
    } else {
        console.error('Knappen med klassen ".continue" blev ikke fundet i DOM\'en.');
    }
});