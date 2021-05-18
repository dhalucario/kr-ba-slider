# Kreativrudel Before After Slider

## Installation
NPM: `npm install --save @kreativrudel/kr-ba-slider`

## Usage

HTML skeleton:

```HTML
<div class="krba-slider">
    <div class="krba-knob">
        <img src="" alt="" />
    </div>
    <img class="krba-after-image" src="" alt="" />
    <div>
        <img class="krba-before-image" src="" alt="" />
    </div>
</div>
```

JS (Webpack):

```js
import KrBaSlider from '~@kreativrudel/kr-ba-slider.js';

let slider = document.getElementById('slider');
new KrBaSlider(slider);
```
