# About
## Description
Makes lightbox popups from an array of html elements (e.g. a gallery, bulleted list, slideshow). Works on any HTML web page or website page builder where custom scripts are accepted. No bloat, a few simple arguments.
## Author
Jon Tornetta  
https://github.com/jmtornetta  
Copywright 2022 by Jon Tornetta  
# Usage
## Setup
1. Configure variables at the top of the .js file to match the appropriate selectors  
```
/* Sample configuration */
const lightbox_selectors = {
   queryMedia : ".staff-gallery figure", // The media that contains the URL for the video iframe
   queryLink : "a", // The element that has the attribute (eg: href) that we want to grab
   hoverClass : "show-hover-effect" // The class to apply to the media to set hover styles
};
```
2. Copy or include the script and stylesheet in page HTML footer. Alternatively, include in the body below the element(s) that you will be pulling links from for the popup(s).  
## Development
Easily test using Chrome>DevTools>Console. Copy and paste the entire script into the console.  
# Plan
## Next  
4. [ ] Add functionality to embed videos using Google Drive per https://stackoverflow.com/questions/40951504/how-to-embed-videos-from-google-drive-to-webpage#40951643  
## Later  
5. [ ] Make into plugin, Gutenberg block, or shortcode to utilize elsewhere per https://www.wpbeginner.com/wp-tutorials/how-to-properly-add-javascripts-and-styles-in-wordpress/, https://github.com/ahmadawais/create-guten-block, https://www.wpbeginner.com/wp-tutorials/how-to-easily-add-javascript-in-wordpress-pages-or-posts/  
## Completed
### 03/23/2022  
1. [x] Modify configuration variable to object and pass object to immediately invoked function.  
### 03/21/2022  
1. [x] Create iframe and set attributes for new youtube video, per https://bobbyhadz.com/blog/javascript-create-element-with-attributes and https://www.w3schools.in/load-youtube-video-dynamically/  
1. [x] Test and update stop video code to pause and replay videos for YouTube and non-YouTube videos, per https://gist.github.com/cferdinandi/9044694  
3. [x] Create git repo and upload to GitHub  
