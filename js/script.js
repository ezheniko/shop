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