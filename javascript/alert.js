// alert.js


document.addEventListener('DOMContentLoaded', function () {
   
    const continueButton = document.querySelector('.continue');
    if (continueButton) {
        continueButton.addEventListener('click', function (event) {
            event.preventDefault(); 

            
            const navn = document.querySelector('input[type="text"]').value;
            const efternavn = document.querySelectorAll('input[type="text"]')[1].value;
            const adresse = document.querySelectorAll('input[type="text"]')[2].value;
            const by = document.querySelectorAll('input[type="text"]')[3].value;
            const postnummer = document.querySelectorAll('input[type="text"]')[4].value;
            const land = document.querySelectorAll('input[type="text"]')[5].value;
            const telefon = document.querySelectorAll('input[type="text"]')[6].value;
            const email = document.querySelector('input[type="email"]').value;

           
            if (navn && efternavn && adresse && by && postnummer && land && telefon && email) {
                console.log('Alle felter er udfyldt. Viser toast-notifikation.');

               
                const toast = document.getElementById('toast-notification');
                if (toast) {
                    toast.textContent = "TAK FOR DIT KØB - SAMMENHOLD ER VIGTIGERE END ALKOHOL"; 
                    toast.classList.add('toast-visible');
                    console.log('Toast-notifikation blev vist.');

                    
                    setTimeout(function () {
                        toast.classList.remove('toast-visible');
                        console.log('Toast-notifikation blev fjernet.');
                    }, 4000);
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