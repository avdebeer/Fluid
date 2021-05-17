// ********** GENERAL FUNCTIONS **********
function hideSections() {
	$('#Inspections').addClass('is-hidden');
	$('#General').addClass('is-hidden');
}

function closeModal() {
	$('#modal').toggleClass('modal-visible');
	setTimeout(() => $('#modal-form').empty(), 500);
}

// ********** INSPECTION RECORD FUNCTIONS **********
function newInspectionForm() {
	$('#modal-form').append(
		`<h3 class="form-title">Inspection Report</h3>

		<label for="inspection-date" class="form-label">Date</label>
		<input id="inspection-date" type="date" class="form-field" value="">

		<label for="inspection-title" class="form-label">Title</label>
		<input id="inspection-title" type="text" class="form-field" value="">
		
		<label for="inspection-description" class="form-label">Description</label>
		<textarea id="inspection-description" cols="30" rows="10"></textarea>
		
		<label for="inspection-inspector" class="form-label">Inspector</label>
		<input id="inspection-inspector" type="text" class="form-field" value="">
		
		<label for="inspection-status" class="form-label">Status</label>
		<input id="inspection-status" type="text" class="form-field" value="">
		<div class="modal__buttons">
            <button class="button btn-primary" data-btn="close">Cancel</button>
			<button class="button btn-secondary" data-btn="submit">Submit</button>
		</div>`
	);
}

function editInspectionForm(id) {
	let date = $(`#inspection-date-${id}`).text();
	let title = $(`#inspection-title-${id}`).text();
	let inspector = $(`#inspection-inspector-${id}`).text();
	let status = $(`#inspection-status-${id}`).text();
	let description = $(`#inspection-description-${id}`).text();

	$('#modal-form').append(
		`<h3 class="form-title">Inspection Report</h3>
		<input id="inspection-id" type="hidden"  value="${id}" >

		<label for="inspection-date" class="form-label">Date</label>
		<input id="inspection-date" type="date" class="form-field" value="${date}">

		<label for="inspection-title" class="form-label">Title</label>
		<input id="inspection-title" type="text" class="form-field" value="${title}">
		
		<label for="inspection-description" class="form-label">Description</label>
		<textarea id="inspection-description" cols="30" rows="10">${description}</textarea>
		
		<label for="inspection-inspector" class="form-label">Inspector</label>
		<input id="inspection-inspector" type="text" class="form-field" value="${inspector}">
		
		<label for="inspection-status" class="form-label">Status</label>
		<input id="inspection-status" type="text" class="form-field" value="${status}">
		<div class="modal__buttons">
			<button class="button btn-primary" data-btn="close">Cancel</button>
			<button class="button btn-secondary" data-btn="update">Update</button>
		</div> `
	);
}

async function createInspectionRecord() {
	let date = $('#inspection-date').val();
	let title = $('#inspection-title').val();
	let description = $('#inspection-description').val();
	let inspector = $('#inspection-inspector').val();
	let status = $('#inspection-status').val();
	let projectID = 1;
	// let projectID = $('#project-id').val;
	console.log(projectID);

	let response = await axios.post('/project/inspection', {
		date,
		title,
		description,
		inspector,
		status,
		projectID
	});

	let Z = response.data;

	$('#inspection-data').append(
		`<form id="inspection-${Z.id}" data-id="${Z.id}" class="section__data--row">
			<div class="section__data--row-summary results-form">
				<input class="results-form__field--diabeled" type="text" value="${Z.date}" disabled="disabeled">
				<input class="results-form__field--diabeled" type="text" value="${Z.title}" disabled="disabeled">
				<input class="results-form__field--diabeled" type="text" value="${Z.inspector}" disabled="disabeled">
				<input class="results-form__field--diabeled" type="text" value="${Z.status}" disabled="disabeled">
				<button class="button btn-primary" data-btn="edit">Edit</button>
                <button class="button btn-primary" data-btn="delete">Delete</button>
			</div>
			<div class="section__data--row-details">
				<textarea name="" id="" cols="10" rows="10" disabled="disabeled">${Z.description}</textarea>
			</div>
		</form>`
	);
	$('#modal-data').empty();
}

async function updateInspectionRecord() {
	let id = $('#inspection-id').val();
	let date = $('#inspection-date').val();
	let title = $('#inspection-title').val();
	let description = $('#inspection-description').val();
	let inspector = $('#inspection-inspector').val();
	let status = $('#inspection-status').val();
	let projectID = 1;
	// let projectID = $('#project-id').val;
	let response = await axios.patch('/project/inspection', {
		date,
		title,
		description,
		inspector,
		status,
		projectID,
		id
	});

	$(`#inspection-date-${id}`).text(`${date}`);
	$(`#inspection-title-${id}`).text(`${title}`);
	$(`#inspection-description-${id}`).text(`${description}`);
	$(`#inspection-inspector-${id}`).text(`${inspector}`);
	$(`#inspection-status-${id}`).text(`${status}`);

	$('#modal-data').empty();
}

async function deleteInspectionRecord(id) {
	let response = await axios.delete(`/project/inspection/${id}`);
	$(`#inspection-${id}`).remove();
}
