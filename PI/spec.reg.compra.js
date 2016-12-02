// spec.js
describe('Registro de un nuevo socio', () => {
  it('should add one and two', () => {
    browser.get('http://localhost:3000/tiendas');
    browser.driver.manage().window().maximize();
    browser.sleep(4000);
    element(by.buttonText('Historial de compras')).click();
    browser.sleep(4000);
    element(by.buttonText('Registro de compras')).click();
    browser.sleep(500);
    element(by.model('$ctrl.numTarjeta')).sendKeys('1234');
    browser.sleep(500);
    element(by.model('$ctrl.importe')).sendKeys('47.50');
    browser.sleep(1000);
    element(by.buttonText('Registrar')).click();
    browser.sleep(2000);
    element(by.buttonText('Corregir')).click();
    browser.pause();
  });
});
