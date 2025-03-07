document.addEventListener('DOMContentLoaded', function() {
    let listCart = JSON.parse(localStorage.getItem('listCart')) || {};
    console.log(listCart);

    // Opdater totalQuantityElement på alle sider
    function updateTotalQuantity() {
        let totalQuantityElement = document.querySelector('.totalQuantity');
        if (totalQuantityElement) {
            let totalQuantity = 0;

            Object.values(listCart).forEach(product => {
                if (product) {
                    totalQuantity += product.quantity;
                }
            });

            totalQuantityElement.innerText = totalQuantity;
        }
    }

    // Kald updateTotalQuantity, når siden indlæses
    updateTotalQuantity();

    // Lyt efter ændringer i localStorage
    window.addEventListener('storage', updateTotalQuantity);
});
