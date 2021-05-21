// DO NOT DELETE CONTROLS THE EVENT HANDELER DYNAMICALLY
let section = 'general';
let sectionTitle = 'FIX ME SOON';

// ********** Navigation **********
$('#menu').on('click', 'a', (e) => {
	let menuItem = e.target.getAttribute('id');
	section = e.target.getAttribute('data-section');
	console.log(section);
	hideSections();
	projectMenu();

	if (section === 'general') {
		$('#modal-open').addClass('is-hidden');
	}
	else {
		$('#modal-open').removeClass('is-hidden');
	}

	$(`#${section}`).removeClass('is-hidden');
	$(`#${menuItem}`).addClass('is-active');
});

// Loads modal with form for new record
$('#modal-open').on('click', () => {
	newRecordForm();
	$('#modal').toggleClass('modal-visible');
});

// Loads modal with form for editing existing record
$('#content').on('click', 'button[data-btn="edit"]', function(e) {
	recordId = e.target.parentElement.getAttribute('data-id');
	console.log(recordId);
	editRecordForm(recordId);
	$('#modal').toggleClass('modal-visible');
});

// Exits the modal and removes loaded form
$('#modal').on('click', 'button[data-btn="close"]', function(e) {
	e.preventDefault();
	closeModal();
});

// Submits form and creates new record
$('#modal').on('click', 'button[data-btn="submit"]', (e) => {
	e.preventDefault();
	createRecord();
	closeModal();
});

// Submits form and updates existing record
$('#modal').on('click', 'button[data-btn="update"]', (e) => {
	e.preventDefault();
	updateRecord();
	closeModal();
});

// Deletes selected record
$('#content').on('click', 'button[data-btn="delete"]', function(e) {
	recordId = e.target.parentElement.getAttribute('data-id');
	deleteRecord(recordId);
});
