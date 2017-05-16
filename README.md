# icGallery.js
Simple web-based gallery without server-side scripting and database requirements.

## Features
* Displays single gallery, with thumbnails
* Navigation using overlayed buttons or arrow keys
* Written in [Vanilla JS](http://vanilla-js.com/)
* No server-side scripting or database used at all (file list is stored in data.json)

## Usage
1. Put your images in reasonable resolution and quality in photo/
2. Put images scalled down proportionally to around 450px-wide with the same names into thumb/
3. Copy data.json.example to data.json, fill it with image names in order you want them to be displayed
4. Update title and author in index.html
5. Upload it to server
That's all.

## Why?
I needed a simple gallery to share my photos from recent trip to my friends. I wanted a solution without server side backend, as for just "thumbnails + images", this would be a total overkill and waste of resources.

Code was written in less than a hour and verified to be working fine in Chrome 57, Firefox 53, Edge 40, Chrome Mobile 58 (Android).
It requires some polish on CSS/HTML side (thumbnails should scale down on smaller screens).

## License
Code: GNU GPL v3

Loader animation is based on FadingLines from [preloaders.net/en/free](https://preloaders.net/en/free). TOS is [HERE](https://preloaders.net/en/terms_of_use)
