// Function to change content based on selected machine with animation
function changeContent(machineName) {
    // Get all machine content sections
    const allMachineContents = document.querySelectorAll('.machine-content');
    
    // Add slide-out animation class to all sections
    allMachineContents.forEach(content => {
        if (content.style.display === 'flex') {
            content.classList.add('slide-out');
        }
    });
    
    // Wait for animation to complete before changing content
    setTimeout(() => {
        // Hide all content sections
        allMachineContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('slide-out');
            content.classList.remove('slide-in');
        });
        
        // Show the selected machine content
        const selectedContent = document.querySelector(`.machine-content[data-machine="${machineName}"]`);
        if (selectedContent) {
            selectedContent.style.display = 'flex';
            selectedContent.classList.add('slide-in');
            
            // Clear slide-in class after animation completes
            setTimeout(() => {
                selectedContent.classList.remove('slide-in');
            }, 500);
        }
    }, 300);
    
    // Update active class on navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.textContent === machineName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Add event listeners when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to each nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            // Only change if not already active
            if (!this.classList.contains('active')) {
                changeContent(this.textContent);
            }
        });
    });
    
    // Set initial active item
    const initialItem = document.querySelector('.nav-item');
    initialItem.classList.add('active');
    
    // Make sure the first content is displayed
    const firstContent = document.querySelector('.machine-content');
    if (firstContent) {
        firstContent.style.display = 'flex';
    }
    
    // Add click handlers for arrows
    document.querySelector('.arrow-left').addEventListener('click', function() {
        const activeItem = document.querySelector('.nav-item.active');
        const prevItem = activeItem.previousElementSibling || 
                        document.querySelectorAll('.nav-item')[document.querySelectorAll('.nav-item').length - 1];
        if (prevItem) {
            changeContent(prevItem.textContent);
        }
    });
    
    document.querySelector('.arrow-right').addEventListener('click', function() {
        const activeItem = document.querySelector('.nav-item.active');
        const nextItem = activeItem.nextElementSibling || 
                        document.querySelectorAll('.nav-item')[0];
        if (nextItem) {
            changeContent(nextItem.textContent);
        }
    });
});