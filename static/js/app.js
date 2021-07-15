// CONTROLS THE EVENT HANDELER DYNAMICALLY
let activeSection = 'general';

// Controls the active side-nav section
$('.side-nav').on('click', (e) => {
	e.preventDefault();
	let menuItem = e.target.closest('li').getAttribute('id');
	activeSection = e.target.closest('li').getAttribute('data-section');
	hideSections();
	projectMenu();

	if (activeSection === 'general') {
		$('#modal-open').addClass('is-hidden');
		$('#details').addClass('is-hidden');
	}
	else {
		$('#modal-open').removeClass('is-hidden');
		$('#details').removeClass('is-hidden');
	}

	$(`#${activeSection}`).removeClass('is-hidden');
	$('.record').removeClass('selected');
	$(`#${menuItem}`).addClass('side-nav__item--active');
});

// Loads modal with form for new record
$('#modal-open').on('click', () => {
	newRecordForm[activeSection]();
	$('#modal').toggleClass('modal-visible');
});

// Loads modal with form for editing existing record
$('#content').on('click', 'a[data-action="edit"]', function(e) {
	recordId = e.target.closest('a').getAttribute('data-id');
	editRecordForm[activeSection](recordId);
	$('#modal').toggleClass('modal-visible');
});

// Exits the modal and removes loaded form
$('#modal').on('click', 'button[data-action="close"]', function(e) {
	e.preventDefault();
	closeModal();
});

// Submits form and creates new record
$('#modal').on('click', 'button[data-action="submit"]', (e) => {
	e.preventDefault();
	createRecord[activeSection]();
	closeModal();
});

// Submits form and updates existing record
$('#modal').on('click', 'button[data-action="update"]', (e) => {
	e.preventDefault();
	updateRecord[activeSection]();
	closeModal();
});

// Deletes selected record
$('#content').on('click', 'a[data-action="delete"]', function(e) {
	recordId = e.target.closest('a').getAttribute('data-id');
	deleteRecord(recordId);
});

// Displays full record details
$('#content').on('click', 'h4[data-record="details"]', function(e) {
	recordId = e.target.getAttribute('data-id');
	viewRecord[activeSection](recordId);
	$('.record').removeClass('selected');
	$(`#${activeSection}-${recordId}`).addClass('selected');
});
