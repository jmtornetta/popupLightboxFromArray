/* Sample configuration
const lightbox_selectors = {
   queryMedia : ".staff-gallery figure", // The media that contains the URL for the video iframe
   queryLink : "a", // The element that has the attribute (eg: href) that we want to grab
   hoverClass : "show-hover-effect" // The class to apply to the media to set hover styles
};
*/

 const lightbox_selectors = {
     queryMedia : "", // The media that contains the URL for the video iframe
     queryLink : "", // The element that has the attribute (eg: href) that we want to grab
     hoverClass : "" // The class to apply to the media to set hover styles
 };

 /* Prepare iframe, popup, and medial urls*/
 (function lightbox_init(queryMedia,queryLink,hoverClass) {
    /* Guard clause for config */
    if(queryMedia == "" || queryLink == "" || hoverClass == "") throw "Error: Must complete configuration for selectors for popupLightboxFromArray script!"

    /* Cause escape key to close popup */
    document.addEventListener("keydown", (e)=>{if(e.key == "Escape") lightbox_close()})

    /* Build the popup HTML */
    const popupContainer = document.createElement('div')
    popupContainer.setAttribute('id', 'popup-container')
    popupContainer.innerHTML = '<div id="fadeback" onclick="lightbox_close();"><div id="lightbox"><a class="boxclose" id="boxclose" onclick="lightbox_close();"></a><div id="videoPlayer"></div></div></div>'
    document.body.append(popupContainer)

    /* Build media urls and set unique styles */
    const regexYoutube = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    const els = document.querySelectorAll(queryMedia)
    for (const el of els) {
        const link = el.querySelector(queryLink)
        if (link == null) continue // Skips images without links
        const arr = link.href.match(regexYoutube) // Stores YouTube video idea in first capturing group located at 'arr[1]'
        if (arr == null) {console.log(`Error: Link '${link.href}' is not a YouTube video link!`); continue } // Checks URL for YouTube
        if (arr[1] == null) {console.log(`Error: Unable to get YouTube video ID from ${arr}`); continue }
        const youtubeId = arr[1]
        /* Apply  onclick attributes to elements */
        // See: https://superdevresources.com/open-links-popup/#:~:text=Open%20Link%20in%20a%20Popup%20Window&text=In%20order%20to%20open%20them,a%20inline%20JavaScript%20code%20window.
        const srcUrl = `https://youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&controls=1&origin=https://${window.location.hostname}` // Sets YouTube video to autoplay and sets origin to current domain
        link.setAttribute('onclick', `lightbox_open(event,'${srcUrl}')`);
        // link.removeAttribute('href'); // 03/21/2022 JT - Posterity: Not necessary to remove href when preventDefault is used on click event

        /* Apply class to element for hover styles */
        el.classList.add(hoverClass)
    }

    /* Create iframe for video player */
    if (!document.getElementById('iframePlayer')) {
        const iframePlayer = document.createElement('iframe')
        iframePlayer.setAttribute('allow', 'autoplay')
        iframePlayer.setAttribute('id', 'iframePlayer')
        document.getElementById('videoPlayer').append(iframePlayer)
    }
})(lightbox_selectors.queryMedia,lightbox_selectors.queryLink,lightbox_selectors.hoverClass); // Immediately invoked function because nothing else is needed in the global object scope

/* Open popup, source video URL to iframe, play video */
function lightbox_open(event, url) {
    event.preventDefault() // Stops the <a href="..."> tag from opening a new page
    iframePlayer.setAttribute('src', url) // Sets the iframe video link
    // iframePlayer.contentWindow.postMessage(JSON.stringify({ // 03/21/2022 JT - Posterity: Does not work
    //     event: 'command',
    //     func: 'playVideo'
    // }), '*');;
    document.getElementById('lightbox').style.display = 'flex'; // Shows the popup
    document.getElementById('fadeback').style.display = 'flex'; // Shows the popup background and centers the popup
    // return false; // 03/21/2022 JT - Posterity: Does not reliably prevent default click event action
}

/* Stop all iframes or HTML5 <video>'s from playing */
function stopVideos() {
    const videos = document.querySelectorAll('iframe, video');
    Array.prototype.forEach.call(videos, function (video) {
        if (video.tagName.toLowerCase() === 'video') {
            video.pause();
        } else { // Stops iframe YouTube video
            video.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: 'stopVideo'
            }), '*');;
        }
    });
};

/* Close popup and stop videos */
function lightbox_close() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('fadeback').style.display = 'none';
    stopVideos();
}