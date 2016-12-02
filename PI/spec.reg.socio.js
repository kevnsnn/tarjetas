// spec.js
describe('Registro de un nuevo socio', () => {
  it('should add one and two', () => {
    browser.get('http://localhost:3000/accesos');
    browser.driver.manage().window().maximize();
    browser.sleep(2000);
    element(by.buttonText('Registro de socios')).click();
    browser.sleep(1000);
    element(by.model('$ctrl.nombre')).sendKeys('Roberto');
    browser.sleep(200);
    element(by.model('$ctrl.primerApellido')).sendKeys('Jiménez');
    browser.sleep(200);
    element(by.model('$ctrl.segundoApellido')).sendKeys('Aguilera');
    browser.sleep(200);
    element(by.model('$ctrl.direccion')).sendKeys('C/Palas de Rey');
    browser.sleep(200);
    element(by.model('$ctrl.telefono')).sendKeys('914561236');
    browser.sleep(200);
    element(by.model('$ctrl.email')).sendKeys('roberto@email.com');
    browser.sleep(1000);
    element(by.id('regTarjeta')).click();
    browser.sleep(2000);
    element(by.buttonText('Listo')).click();
    browser.sleep(1000);
    element(by.model('$ctrl.nombre')).sendKeys('Roberto');
    browser.sleep(200);
    element(by.model('$ctrl.primerApellido')).sendKeys('Jiménez');
    browser.sleep(200);
    element(by.model('$ctrl.segundoApellido')).sendKeys('Aguilera');
    browser.sleep(200);
    element(by.model('$ctrl.direccion')).sendKeys('C/Palas de Rey');
    browser.sleep(200);
    element(by.model('$ctrl.telefono')).sendKeys('914561236');
    browser.sleep(200);
    element(by.model('$ctrl.email')).sendKeys('roberto@email.com');
    browser.sleep(1000);
    element(by.id('regTarjeta')).click();
    browser.sleep(2000);
    element(by.buttonText('Corregir')).click();
    browser.sleep(2000);
  });
});
