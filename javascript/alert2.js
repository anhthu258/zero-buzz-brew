document.addEventListener('DOMContentLoaded', function() {
    console.log('alert2.js is running!'); // Bekræft, at filen kører

    // Finder formularen
    const form = document.getElementById('myForm');
    if (!form) {
        console.error('Form not found!'); // Fejl, hvis formularen ikke findes
        return;
    }

    // Finder inline-beskeden
    const inlineMessage = document.getElementById('inline-message');
    if (!inlineMessage) {
        console.error('Inline message div not found!'); // Fejl, hvis inline-beskeden ikke findes
        return;
    }

    // Lytter efter, når formularen indsendes
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Forhindrer standardformularindsendelse
        console.log('Form submitted!'); // Bekræft, at submit-hændelsen udløses

        // Finder alle inputfelter (tekst og email)
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
        let allFilled = true;

        // Tjekker, om alle felter er udfyldt
        inputs.forEach(input => {
            if (!input.value.trim()) { // Hvis feltet er tomt
                allFilled = false;
                console.log('Empty field:', input); // Log tomme felter
            }
        });

        // Hvis alle felter er udfyldt, vis inline-beskeden
        if (allFilled) {
            console.log('All fields are filled!'); // Bekræft, at alle felter er udfyldt
            inlineMessage.style.display = 'block'; // Vis beskeden
            setTimeout(() => {
                inlineMessage.style.display = 'none'; // Skjul beskeden efter 3 sekunder
            }, 3000);
        } else {
            console.log('Some fields are missing!'); // Bekræft, at felter mangler
        }
    });
});