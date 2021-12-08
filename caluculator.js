class Calculator {
  constructor() {
    this.button = document.querySelectorAll('button');
    this.btnValue = '';
    this.formulaVal = '';
    this.calcForm = document.getElementById('calc-form');
    this.calcResultForm = document.getElementById('result');
    this.btnCount = 0;
  }

  Main() {
    this.button.forEach(element => {
      this.clickBtn(element);
    });
  }

  clickBtn(element) {
    element.addEventListener('click', () => {
      this.btnValue = element.textContent;

      if (this.calcForm.value == 0) {
        this.calcForm.value = '';
      }

      this.switchBtn();
    });
  }

  switchBtn() {
    switch (this.btnValue) {
      case 'C':
        this.calcForm.value = 0;
        this.calcResultForm.value = 0;
        break;

      case 'BS':
        this.formulaVal = this.BS(this.formulaVal);
        this.calcForm.value = this.BS(this.calcForm.value);

        if (this.calcForm.value == '') {
          this.calcForm.value = 0;
        }
        break;

      case '=':
        if (this.formulaVal == '') {
          this.calcForm.value = 0;
          this.calcResultForm.value = 0;
          return;
        }

        let resultNum = new Function('return ' + this.formulaVal)();
        this.calcResultForm.value = resultNum;
        this.formulaVal = '';
        this.calcForm.value = 0;
        break;

      case '':
        this.btnCount++;
        this.calcForm.value = '';
        this.calcResultForm.value = '';

        this.button.forEach(element => {
          if (!element.hasAttribute('id', 'power')) {
            if (this.hasWithPower()) {
              this.formulaVal = 0;
              element.disabled = true;
            } else {
              element.disabled = false;
              this.calcForm.value = 0;
              this.calcResultForm.value = 0;
            }
          }
        });
        break;

      default:
        this.calcForm.value += this.btnValue;
        this.formulaVal += this.conversion(this.btnValue);
        break;
    }
  }

  BS(value) {
    const sliceVal = value.slice(0, value.length - 1);
    return sliceVal;
  }

  conversion(value) {
    if (value == '×') {
      return '*';
    } else if (value == '−') {
      return '-';
    } else if (value == '÷') {
      return '/';
    } else {
      return value;
    }
  }

  hasWithPower() {
    if (this.btnCount % 2 == 0) {
      return false;
    } else {
      return true;
    }
  }

}

new Calculator().Main();
