document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarContent = document.querySelector('.navbar-content');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarContent.classList.toggle('active');
    });
    
    // For mobile: make dropdown work with click instead of hover
    if (window.innerWidth <= 900) {
        const dropdowns = document.querySelectorAll('.dropdown');
        const subDropdowns = document.querySelectorAll('.sub-dropdown');
        
        dropdowns.forEach(dropdown => {
            dropdown.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
        
        subDropdowns.forEach(subDropdown => {
            subDropdown.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                subDropdown.classList.toggle('active');
                
                // Close other sub-dropdowns
                subDropdowns.forEach(item => {
                    if (item !== subDropdown) {
                        item.classList.remove('active');
                    }
                });
            });
        });
    }
});