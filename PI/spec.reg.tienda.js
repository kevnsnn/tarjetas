// spec.js
describe('Registro de un nuevo socio', () => {
  it('should add one and two', () => {
    browser.get('http://localhost:3000/accesos');
    browser.driver.manage().window().maximize();
    browser.sleep(4000);
    element(by.buttonText('Registro de tiendas')).click();
    browser.sleep(1000);
    element(by.model('$ctrl.nombreTienda')).sendKeys('Zara');
    browser.sleep(500);
    element(by.model('$ctrl.direccionTienda')).sendKeys('C/Galicia');
    browser.sleep(500);
    element(by.model('$ctrl.telefonoTienda')).sendKeys('910003322');
    browser.sleep(1000);
    element(by.id('regTienda')).click();
    browser.sleep(2000);
    element(by.buttonText('Listo')).click();
    browser.sleep(1000);
    element(by.model('$ctrl.nombreTienda')).sendKeys('Zara');
    browser.sleep(500);
    element(by.model('$ctrl.direccionTienda')).sendKeys('C/Galicia');
    browser.sleep(500);
    element(by.model('$ctrl.telefonoTienda')).sendKeys('910003322');
    browser.sleep(1000);
    element(by.id('regTienda')).click();
    browser.sleep(2000);
    element(by.buttonText('Corregir')).click();
    browser.sleep(2000);
  });
});
