// DO NOT DELETE CONTROLS THE EVENT HANDELER DYNAMICALLY
let section = 'General';
$('#section-title').text(`${section}`);

// ********** Navigation **********
$('#menu').on('click', 'a', (e) => {
	let sectionName = e.target.getAttribute('data-section');
	section = sectionName;
	hideSections();

	if (section === 'General') {
		$('#modal-open').addClass('is-hidden');
	}
	else {
		$('#modal-open').removeClass('is-hidden');
	}

	$('#section-title').text(`${section}`);
	$(`#${section}`).removeClass('is-hidden');
});

const newForm = {
	Inspections : newInspectionForm
};

const editForm = {
	Inspections : editInspectionForm
};

const createRecord = {
	Inspections : createInspectionRecord
};

const updateRecord = {
	Inspections : updateInspectionRecord
};

const deleteRecord = {
	Inspections : deleteInspectionRecord
};

// Loads modal with form for new record
$('#modal-open').on('click', () => {
	newForm[`${section}`]();
	$('#modal').toggleClass('modal-visible');
});

// Loads modal with form for editing existing record
$('#section-data').on('click', 'button[data-btn="edit"]', function(e) {
	recordId = e.target.getAttribute('data-id');
	editForm[`${section}`](recordId);
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
	createRecord[`${section}`]();
	closeModal();
});

// Submits form and updates existing record
$('#modal').on('click', 'button[data-btn="update"]', (e) => {
	e.preventDefault();
	updateRecord[`${section}`]();
	closeModal();
});

// Deletes selected record
$('#section-data').on('click', 'button[data-btn="delete"]', function(e) {
	recordId = e.target.getAttribute('data-id');
	deleteRecord[`${section}`](recordId);
});
