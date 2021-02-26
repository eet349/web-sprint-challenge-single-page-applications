describe('Form End to End tests', () => {
	beforeEach('Connect to localhost', () => {
		cy.visit('http://localhost:3000');
	});
	const testText = 'This is test text.';
	const pizzaButton = () => cy.get('button[class=hero-button]');
	const nameInput = () => cy.get('input[name=username]');
	const sizeSelect = () => cy.get('select');
	const radioSelect = () => cy.get('input[type=radio]');
	const checkboxSelect1 = () => cy.get('input[name=pepperoni]');
	const checkboxSelect2 = () => cy.get('input[name=sausage]');
	const checkboxSelect3 = () => cy.get('input[name=onions]');
	const checkboxSelect4 = () => cy.get('input[name=pineapple]');
	const specialInsInput = () => cy.get('input[name=specialIns]');
	const submitButton = () => cy.get('button');

	it('Sanity check', () => {
		expect(true).to.equal(true);
	});
	it('Text inputs test', () => {
		pizzaButton().should('exist');
		pizzaButton().click();
		nameInput()
			.should('have.value', '')
			.type(testText)
			.should('have.value', testText);
		specialInsInput()
			.should('have.value', '')
			.type(testText)
			.should('have.value', testText);
	});

	it('Testing checkbox multi-select', () => {
		pizzaButton().should('exist');
		pizzaButton().click();
		checkboxSelect1().should('not.be.checked').click().should('be.checked');
		checkboxSelect2().should('not.be.checked').click().should('be.checked');
		checkboxSelect3().should('not.be.checked').click().should('be.checked');
		checkboxSelect4().should('not.be.checked').click().should('be.checked');
	});

	it('Testing for successful submission of the form.', () => {
		pizzaButton().should('exist');
		pizzaButton().click();
		submitButton().should('be.disabled');
		nameInput()
			.should('have.value', '')
			.type(testText)
			.should('have.value', testText);
		specialInsInput()
			.should('have.value', '')
			.type(testText)
			.should('have.value', testText);
		sizeSelect().should('exist').select('small');
		radioSelect().should('exist').first().check();
		checkboxSelect1().should('not.be.checked').check().should('be.checked');
		checkboxSelect2().should('not.be.checked').check().should('be.checked');
		checkboxSelect3().should('not.be.checked').check().should('be.checked');
		checkboxSelect4().should('not.be.checked').check().should('be.checked');
		submitButton().should('not.be.disabled').click();
		cy.contains('Order successful!');
	});
});
