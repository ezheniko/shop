class Slider {

  constructor (elem) {
    this.slider = elem.querySelector('.Promo-List');
    this.activeSlide = this.slider.firstElementChild;
    this.control = elem.querySelector('.Promo-Controls');
    this.activeButton = this.control.firstElementChild;
    this.length = this.slider.children.length;
    this.animate();
    elem.addEventListener('mouseenter', () => clearInterval(this._timer) );
    elem.addEventListener('mouseleave', () => this.animate() );
    this.control.addEventListener('click', (evt) => {
      let target = evt.target;
      if (target.tagName != 'BUTTON') return;

      this.changeSlide(target.textContent - 1);
    });
  }

  animate () {
    let index = this.activeButton.textContent - 1;
    this._timer = setInterval ( () => {
      if (index + 1 >= this.length) index = 0;
      else index++;
      this.changeSlide(index);
    }, 2500);
  }

  changeSlide (index) {
    this.activeSlide.classList.remove('Promo-Item_Current');
    this.activeButton.classList.remove('Promo-Button_Current');
    this.activeSlide = this.slider.children[index];
    this.activeSlide.classList.add('Promo-Item_Current');
    this.activeButton = this.control.children[index];
    this.activeButton.classList.add('Promo-Button_Current');
  }
}

new Slider(document.querySelector('.Promo'));

class Special {

  constructor (elem) {
    this.container = elem.querySelector('.Special-List');
    this.controlRight = elem.querySelector('.Special-Button-Right');
    this.controlLeft = elem.querySelector('.Special-Button-Left');
    this.controlLeft.addEventListener('click', () => this.move('left') );
    this.controlRight.addEventListener('click', () => this.move('right') );
    this.controlLeft.addEventListener('mousedown', () => this.transit('left') );
    this.controlRight.addEventListener('mousedown', () => this.transit('right') );
    this._forClick = true;
    document.addEventListener('mouseup', () => {
      if (this._isTransit) {
        this._isTransit = false;
        this._forClick = false;
      }
      clearInterval(this._timer);
    });
  }

  move (direction) {
    if (this._forClick === false) {
      this._forClick = true;
      return;
    }
    if (direction === 'right') {
      let y = this.container.getBoundingClientRect().top;
      let x = this.container.getBoundingClientRect().right;
      if (this.controlLeft.disabled === true) this.controlLeft.disabled = false;
      let elem = document.elementFromPoint(x - 1, y + 1).closest('.Special-Item');
      if (!elem) elem = document.elementFromPoint(x - 25, y + 1).closest('.Special-Item').nextElementSibling;
      if ((elem.getBoundingClientRect().right - x) < 25) elem = elem.nextElementSibling;
      this.container.firstElementChild.style.marginLeft = (parseInt(getComputedStyle(this.container.firstElementChild).marginLeft) - (elem.getBoundingClientRect().right - x)) + 'px';
      if (!elem.nextElementSibling) this.controlRight.disabled = true;
    }

    if (direction === 'left') {
      let y = this.container.getBoundingClientRect().top;
      let x = this.container.getBoundingClientRect().left;
      if (this.controlRight.disabled === true) this.controlRight.disabled = false;
      let elem = document.elementFromPoint(x + 1, y + 1).closest('.Special-Item');
      if (!elem) elem = document.elementFromPoint(x + 25, y + 1).closest('.Special-Item').previousElementSibling;
      if ((x - elem.getBoundingClientRect().left) < 25) elem = elem.previousElementSibling;
      this.container.firstElementChild.style.marginLeft = (parseInt(getComputedStyle(this.container.firstElementChild).marginLeft) + (x - elem.getBoundingClientRect().left)) + 'px';
      if (!elem.previousElementSibling) this.controlLeft.disabled = true;
    }

  }

  transit (direction) {
    this._timer = setTimeout(() => {
      this._isTransit = true;
      let elem = this.container.firstElementChild;
      let elemStyles = getComputedStyle(elem);
      let margin = parseInt(elemStyles.marginLeft);
      const marginMax = 0;
      const marginMin = parseInt(getComputedStyle(this.container).width) - this.container.children.length * (elem.offsetWidth + parseInt(elemStyles.marginRight)) + parseInt(elemStyles.marginRight);
      if (direction === 'right') {
        if (this.controlLeft.disabled === true) this.controlLeft.disabled = false;
      } else {
        if (this.controlRight.disabled === true) this.controlRight.disabled = false;
      }
      this._timer = setInterval(() => {
        if (direction === 'right') {
          margin--;
          if (margin < marginMin) {
            margin = marginMin;
            this.controlRight.disabled = true;
            this._isTransit = false;
            clearInterval(this._timer);
          }
        }
        else {
          margin++;
          if (margin > 0) {
            margin = 0;
            this.controlLeft.disabled = true;
            this._isTransit = false;
            clearInterval(this._timer);
          }
        }
        elem.style.marginLeft = margin + 'px';
      }, 0);
    }, 300);
  }

}

new Special(document.querySelector('.Special-Slider'));