// Add this script to your existing JavaScript files

document.addEventListener('DOMContentLoaded', function() {
    // Create overlay and popup container elements
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 1000;';
    
    const popupContainer = document.createElement('div');
    popupContainer.className = 'video-popup-container';
    popupContainer.style.cssText = 'display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; max-width: 900px; z-index: 1001;';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-video-popup';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer;';
    
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    videoContainer.style.cssText = 'position: relative; padding-bottom: 56.25%; height: 0; background-color: #000;';
    
    const videoFrame = document.createElement('iframe');
    videoFrame.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';
    videoFrame.setAttribute('frameborder', '0');
    videoFrame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    videoFrame.setAttribute('allowfullscreen', '');
    
    videoContainer.appendChild(videoFrame);
    popupContainer.appendChild(closeBtn);
    popupContainer.appendChild(videoContainer);
    
    document.body.appendChild(overlay);
    document.body.appendChild(popupContainer);
    
    // Add click event listeners to all video iframes in the gallery
    const videoItems = document.querySelectorAll('.factory-item iframe');
    videoItems.forEach(iframe => {
        // Create a wrapper div to make the iframe clickable
        const wrapper = document.createElement('div');
        wrapper.className = 'iframe-wrapper';
        wrapper.style.cssText = 'position: relative; cursor: pointer;';
        
        // Create play button overlay
        const playButton = document.createElement('div');
        playButton.className = 'play-button-overlay';
        playButton.innerHTML = '<svg width="68" height="48" viewBox="0 0 68 48"><path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>';
        playButton.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.2); transition: background-color 0.3s;';
        
        // Get the parent element and insert the wrapper before the iframe
        const parent = iframe.parentNode;
        parent.insertBefore(wrapper, iframe);
        
        // Move the iframe into the wrapper and add the play button
        wrapper.appendChild(iframe);
        wrapper.appendChild(playButton);
        
        // Add hover effect
        wrapper.addEventListener('mouseenter', () => {
            playButton.style.backgroundColor = 'rgba(0,0,0,0.4)';
        });
        
        wrapper.addEventListener('mouseleave', () => {
            playButton.style.backgroundColor = 'rgba(0,0,0,0.2)';
        });
        
        // Add click event to the wrapper
        wrapper.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get video URL from the iframe
            let videoSrc = iframe.getAttribute('src');
            
            // Ensure autoplay if it's YouTube
            if (videoSrc.includes('youtube.com')) {
                // Remove any existing autoplay parameter
                videoSrc = videoSrc.replace(/(&|\?)autoplay=1/, '');
                
                // Add autoplay parameter
                if (videoSrc.includes('?')) {
                    videoSrc += '&autoplay=1';
                } else {
                    videoSrc += '?autoplay=1';
                }
            }
            
            // Set the source for the popup video
            videoFrame.setAttribute('src', videoSrc);
            
            // Show the overlay and popup
            overlay.style.display = 'block';
            popupContainer.style.display = 'block';
            
            // Add animation
            overlay.style.opacity = '0';
            popupContainer.style.opacity = '0';
            popupContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';
            
            setTimeout(() => {
                overlay.style.transition = 'opacity 0.3s ease';
                popupContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                overlay.style.opacity = '1';
                popupContainer.style.opacity = '1';
                popupContainer.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
        });
    });
    
    // Close popup when clicking the close button or overlay
    function closePopup() {
        videoFrame.setAttribute('src', '');
        
        overlay.style.opacity = '0';
        popupContainer.style.opacity = '0';
        popupContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';
        
        setTimeout(() => {
            overlay.style.display = 'none';
            popupContainer.style.display = 'none';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    
    // Close popup when pressing escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.style.display === 'block') {
            closePopup();
        }
    });
});