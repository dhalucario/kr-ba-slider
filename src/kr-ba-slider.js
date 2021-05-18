export default class KrBaSlider {
    constructor(elem, config = {}) {
        if (!elem instanceof HTMLElement) {
            throw new Error('First element parameter is invalid');
        }

        config = {...{
            orientation: 'horizontal'
        }, ...config};

        this.baseElem = elem;
        this.baseElem.classList.add('krba-slider', 'krba-' + config.orientation);

        this.beforeImage = elem.querySelector('.krba-before-image');
        this.afterImage = elem.querySelector('.krba-after-image');
        this.beforeWrapper = this.beforeImage.parentNode;
        this.beforeWrapper.classList.add('krba-before');

        this.knob = elem.querySelector('.krba-knob');
        this.afterImageWidth = 0;
        this.knobIsHeld = false;
        this.afterImageResObs = new ResizeObserver(() => {
            this.onBaseImageChange();
        });
        this.afterImageResObs.observe(this.afterImage);

        if (this.beforeImage === null) throw new Error('No before image is defined');
        if (this.afterImage === null) throw new Error('No after image is defined');

        this.knob.addEventListener('mousedown', this.onKnobHold.bind(this), {});
        document.addEventListener('mouseup', this.onKnobRelease.bind(this));
        document.addEventListener('mousemove', this.onKnobMove.bind(this));
    }

    onBaseImageChange() {
        this.afterImageWidth = parseFloat(getComputedStyle(this.afterImage).width);
        this.beforeImage.style.width = getComputedStyle(this.afterImage).width;
        this.beforeImage.style.height = getComputedStyle(this.afterImage).height;
        this.beforeWrapper.style.width = getComputedStyle(this.afterImage).width;
        this.beforeWrapper.style.height = getComputedStyle(this.afterImage).height;

        this.knob.style.left = (this.afterImageWidth / 2) + 'px';
        this.beforeWrapper.style.width = (this.afterImageWidth / 2) + 'px';
    }

    onKnobRelease() {
        this.knobIsHeld = false;
    }

    onKnobHold(e) {
        e.preventDefault();
        e.stopPropagation();
        this.knobIsHeld = true;
    }

    onKnobMove(e) {
        e.preventDefault();
        if (this.knobIsHeld) {
            let nextPos = (parseInt(getComputedStyle(this.knob).left) + e.movementX);
            if (nextPos < 0) nextPos = 0;
            if (nextPos > this.afterImageWidth) nextPos = this.afterImageWidth;
            this.knob.style.left = nextPos + 'px';
            this.beforeWrapper.style.width = nextPos + 'px';
        }
    }
}
