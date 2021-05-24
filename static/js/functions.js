// ********** GENERAL FUNCTIONS **********
function hideSections() {
	$('#general').addClass('is-hidden');
	$('#rfi').addClass('is-hidden');
	$('#inspection').addClass('is-hidden');
}

function projectMenu() {
	$('#menu-item-1').removeClass('side-nav__item--active');
	$('#menu-item-2').removeClass('side-nav__item--active');
	$('#menu-item-3').removeClass('side-nav__item--active');
	$('#menu-item-4').removeClass('side-nav__item--active');
	$('#menu-item-5').removeClass('side-nav__item--active');
}

function closeModal() {
	$('#modal').toggleClass('modal-visible');
	setTimeout(() => $('#modal-form').empty(), 500);
}
//////////////////////////////////////////////////////
//FUNCTION OBJECTS
const newRecordForm = {
	inspection : newInspectionForm,
	rfi        : newRFIForm,
	submittal  : newSubmittalForm
};

const editRecordForm = {
	inspection : editInspectionForm,
	rfi        : editRFIForm,
	submittal  : editSubmittalForm
};

const createRecord = {
	inspection : createInspectionRecord,
	rfi        : createRFIRecord,
	submittal  : createSubmittalRecord
};

const updateRecord = {
	inspection : editInspectionRecord,
	rfi        : editRFIRecord,
	submittal  : editSubmittalRecord
};

//////////////////////////////////////////////////////
//INSPECTION FUNCTIONS
function newInspectionForm() {
	$('#modal-form').append(
		`<h3 class="form__title">Inspection</h3>

		<div class="form__group">
			<label for="title" class="form__label">Title</label>
			<input id="title" type="text" class="form__field" autocomplete="off" value="">
		</div>

		<div class="form__group">
			<label for="inspector" class="form__label">Inspector</label>
			<input id="inspector" type="text" class="form__field" autocomplete="off" value="">
		</div>

		<div class="form__group">
			<label for="date" class="form__label">Inspection Date</label>
			<input id="date" type="date" class="form__field" autocomplete="off" value="">
		</div>

		<div class="form__group">
			<label for="description" class="form__label">Description</label>
			<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
		</div>
		
		<div class="modal__buttons">
			<button class="button btn-primary" data-action="close">Cancel</button>
			<button class="button btn-secondary" data-action="submit">Submit</button>
		</div>`
	);
}

async function editInspectionForm(id) {
	const response = await axios.get(`/project/inspection/${id}`);
	const record = response.data;

	$('#modal-form').append(
		`<h3 class="form__title">Inspection</h3>
		<input id="id" type="hidden" value="${record.id}">

		<div class="form__group">
			<label for="title" class="form__label">Title</label>
			<input id="title" type="text" class="form__field" autocomplete="off" value="${record.title}">
		</div>

		<div class="form__group">
			<label for="inspector" class="form__label">Inspector</label>
			<input id="inspector" type="text" class="form__field" autocomplete="off" value="${record.inspector}">
		</div>

		<div class="form__group">
			<label for="date" class="form__label">Inspection Date</label>
			<input id="date" type="date" class="form__field" autocomplete="off" value="${record.date}">
		</div>

		<div class="form__group">
			<label for="description" class="form__label">Description</label>
			<textarea id="description" class="form__textarea" cols="30" rows="10">${record.description}</textarea>
		</div>

		<div class="modal__buttons">
			<button class="button btn-primary" data-action="close">Cancel</button>
			<button class="button btn-secondary" data-action="update">Update</button>
		</div>`
	);
}

async function createInspectionRecord() {
	const title = $('#title').val();
	const inspector = $('#inspector').val();
	const date = $('#date').val();
	const description = $('#description').val();
	const projectID = $('#project-id').text();

	const response = await axios.post('/project/inspection', {
		title,
		inspector,
		date,
		description,
		projectID
	});

	const record = response.data;

	$('#inspection').append(
		`
		<div id="inspection-${record.id}" class="record">
			<div class="record__heading">
				<h4 id="inspection-title-${record.id}">${record.title}</h4>
				<a data-action="delete" data-id="${record.id}}">
					<svg class="icon icon-delete">
						<use xlink:href="/static/img/sprite.svg#icon-trash"></use>
					</svg>
				</a>
				<a data-action="edit" data-id="${record.id}">
					<svg class="icon icon-edit">
						<use xlink:href="/static/img/sprite.svg#icon-pencil"></use>
					</svg>
				</a>
			</div>
			<div class="record__summary">
				<div class="record__summary--data">
					<span>Date:</span> 
					<p id="inspection-date-${record.id}" >${record.date}</p>
				</div>
				<div class="record__summary--data">
					<span>Inspector:</span> 
					<p id="inspection-inspector-${record.id}" >${record.inspector}</p>
				</div>
			</div>
		</div>
		`
	);
}

async function editInspectionRecord() {
	const title = $('#title').val();
	const inspector = $('#inspector').val();
	const date = $('#date').val();
	const description = $('#description').val();
	const id = $('#id').val();

	const response = await axios.patch('/project/inspection', {
		title,
		inspector,
		date,
		description,
		id
	});

	$(`#inspection-title-${id}`).text(`${title}`);
	$(`#inspection-inspector-${id}`).text(`${inspector}`);
	$(`#inspection-date-${id}`).text(`${date}`);
}

async function deleteRecord(id) {
	let response = await axios.delete(`/project/${activeSection}/${id}`);
	$(`#${activeSection}-${id}`).remove();
}

//////////////////////////////////////////////////////
//RFI FUNCTIONS
function newRFIForm() {
	$('#modal-form').append(
		`<h3 class="form__title">RFI</h3>

		<div class="form__row">
			<div class="form__group form__item">
				<label for="title" class="form__label">Title</label>
				<input id="title" type="text" class="form__field" autocomplete="off">
			</div>
			<div class="form__group form__item--15">
				<label for="number" class="form__label">No.</label>
				<input id="number" type="text" class="form__field" autocomplete="off">
			</div>
		</div>

		<div class="form__row">
			<div class="form__group form__item--50">
				<label for="spec-section" class="form__label">Spec Section</label>
				<input id="spec-section" type="text" class="form__field" autocomplete="off">
			</div>

			<div class="form__group form__item">
				<label for="drawing-number" class="form__label">Drawing No.</label>
				<input id="drawing-number" type="text" class="form__field" autocomplete="off">
			</div>
		</div>
		
		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="submittal-person" class="form__label">Submitted By</label>
				<input id="submittal-person" type="text" class="form__field" autocomplete="off">
			</div>

			<div class="form__group form__item">
				<label for="submittal-date" class="form__label">Submittal Date</label>
				<input id="submittal-date" type="date" class="form__field" autocomplete="off">
			</div>
		</div>
		
		<div class="form__group">
			<label for="submittal-company" class="form__label">Company</label>
			<input id="submittal-company" type="text" class="form__field" autocomplete="off">
		</div>

		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="responsible-person" class="form__label">Assigned To</label>
				<input id="responsible-person" type="text" class="form__field" autocomplete="off">
			</div>
			<div class="form__group form__item">
				<label for="due_date" class="form__label">Due Date</label>
				<input id="due_date" type="date" class="form__field" autocomplete="off">
			</div>
		</div> 
		
		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="responsible-company" class="form__label">Company</label>
				<input id="responsible-company" type="text" class="form__field" autocomplete="off">
			</div>

			<div class="form__group form__item">
				<label for="status" class="form__label">Status</label>
				<input id="status" type="text" class="form__field" autocomplete="off">
			</div>
		</div>

		<div class="form__group">
			<label for="description" class="form__label">Description</label>
			<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
		</div>
		
		<div class="modal__buttons">
			<button class="button btn-primary" data-action="close">Cancel</button>
			<button class="button btn-secondary" data-action="submit">Submit</button>
		</div>`
	);
}

async function editRFIForm(id) {
	const response = await axios.get(`/project/rfi/${id}`);
	const record = response.data;

	$('#modal-form').append(
		`<h3 class="form__title">RFI</h3>
		<input id="id" type="hidden" value="${record.id}">

		<div class="form__row">
			<div class="form__group form__item">
				<label for="title" class="form__label">Title</label>
				<input id="title" type="text" class="form__field" autocomplete="off" value="${record.title}">
			</div>
			<div class="form__group form__item--15">
				<label for="number" class="form__label">No.</label>
				<input id="number" type="text" class="form__field" autocomplete="off" value="${record.number}">
			</div>
		</div>

		<div class="form__row">
			<div class="form__group form__item--50">
				<label for="spec-section" class="form__label">Spec Section</label>
				<input id="spec-section" type="text" class="form__field" autocomplete="off" value="${record.spec_section}">
			</div>

			<div class="form__group form__item">
				<label for="drawing-number" class="form__label">Drawing No.</label>
				<input id="drawing-number" type="text" class="form__field" autocomplete="off" value="${record.drawing_number}">
			</div>
		</div>
		
		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="submittal-person" class="form__label">Submitted By</label>
				<input id="submittal-person" type="text" class="form__field" autocomplete="off" value="${record.submittal_person}">
			</div>

			<div class="form__group form__item">
				<label for="submittal-date" class="form__label">Submittal Date</label>
				<input id="submittal-date" type="date" class="form__field" autocomplete="off" value="${record.submittal_date}">
			</div>
		</div>
		
		<div class="form__group">
			<label for="submittal-company" class="form__label">Company</label>
			<input id="submittal-company" type="text" class="form__field" autocomplete="off" value="${record.submittal_company}">
		</div>

		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="responsible-person" class="form__label">Assigned To</label>
				<input id="responsible-person" type="text" class="form__field" autocomplete="off" value="${record.responsible_person}">
			</div>
			<div class="form__group form__item">
				<label for="due_date" class="form__label">Due Date</label>
				<input id="due_date" type="date" class="form__field" autocomplete="off" value="${record.due_date}">
			</div>
		</div> 
		
		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="responsible-company" class="form__label">Company</label>
				<input id="responsible-company" type="text" class="form__field" autocomplete="off" value="${record.responsible_company}">
			</div>

			<div class="form__group form__item">
				<label for="status" class="form__label">Status</label>
				<input id="status" type="text" class="form__field" autocomplete="off" value="${record.status}">
			</div>
		</div>

		<div class="form__group">
			<label for="description" class="form__label">Description</label>
			<textarea id="description" class="form__textarea" cols="30" rows="10">${record.description}</textarea>
		</div>
		
		<div class="modal__buttons">
			<button class="button btn-primary" data-action="close">Cancel</button>
			<button class="button btn-secondary" data-action="update">Update</button>
		</div>`
	);
}

async function createRFIRecord() {
	const title = $('#title').val();
	const number = $('#number').val();
	const spec_section = $('#spec-section').val();
	const drawing_number = $('#drawing-number').val();
	const submittal_person = $('#submittal-person').val();
	const submittal_date = $('#submittal-date').val();
	const submittal_company = $('#submittal-company').val();
	const responsible_person = $('#responsible-person').val();
	const due_date = $('#due_date').val();
	const responsible_company = $('#responsible-company').val();
	const status = $('#status').val();
	const description = $('#description').val();
	const projectID = $('#project-id').text();

	const response = await axios.post('/project/rfi', {
		title,
		number,
		spec_section,
		drawing_number,
		submittal_person,
		submittal_date,
		submittal_company,
		responsible_person,
		due_date,
		responsible_company,
		status,
		description,
		projectID
	});

	const record = response.data;

	$('#rfi').append(
		`<div id="rfi-${record.id}" class="record">
			<div class="record__heading">
				<h4 id="rfi-title-${record.id}">${record.title}</h4>
				<a data-action="delete" data-id="${record.id}">
					<svg class="icon icon-delete">
						<use xlink:href="/static/img/sprite.svg#icon-trash"></use>
					</svg>
				</a>
				<a data-action="edit" data-id="${record.id}">
					<svg class="icon icon-edit">
						<use xlink:href="/static/img/sprite.svg#icon-pencil"></use>
					</svg>
				</a>
			</div>
			<div class="record__summary">
				<div class="record__summary--data">
					<span>#</span> 
					<p id="rfi-number-${record.id}" >${record.number}</p>
				</div>
				<div class="record__summary--data">
					<span>Assigned:</span> 
					<p id="rfi-responsible_person-${record.id}" >${record.responsible_person}</p>
				</div>
				<div class="record__summary--data">
					<span>Due Date:</span> 
					<p id="rfi-due_date-${record.id}" >${record.due_date}</p>
				</div>
				<div class="record__summary--data">
					<span>Status:</span> 
					<p id="rfi-status-${record.id}" >${record.status}</p>
				</div>
			</div>
		</div>`
	);
}

async function editRFIRecord() {
	const title = $('#title').val();
	const number = $('#number').val();
	const spec_section = $('#spec-section').val();
	const drawing_number = $('#drawing-number').val();
	const submittal_person = $('#submittal-person').val();
	const submittal_date = $('#submittal-date').val();
	const submittal_company = $('#submittal-company').val();
	const responsible_person = $('#responsible-person').val();
	const due_date = $('#due_date').val();
	const responsible_company = $('#responsible-company').val();
	const status = $('#status').val();
	const description = $('#description').val();
	const id = $('#id').val();

	const response = await axios.patch('/project/rfi', {
		title,
		number,
		spec_section,
		drawing_number,
		submittal_person,
		submittal_date,
		submittal_company,
		responsible_person,
		due_date,
		responsible_company,
		status,
		description,
		id
	});

	$(`#rfi-title-${id}`).text(title);
	$(`#rfi-number-${id}`).text(number);
	$(`#rfi-responsible_person-${id}`).text(responsible_person);
	$(`#rfi-due_date-${id}`).text(due_date);
	$(`#rfi-status-${id}`).text(status);
}

//////////////////////////////////////////////////////
//SUBMITTAL FUNCTIONS NOTE THAT THESE ARE GOING TO BE VERY SIMILAR TO THE RFI FUNCTIONS
function newSubmittalForm() {
	$('#modal-form').append(
		`<h3 class="form__title">RFI</h3>

		<div class="form__row">
			<div class="form__group form__item">
				<label for="title" class="form__label">Title</label>
				<input id="title" type="text" class="form__field" autocomplete="off">
			</div>
			<div class="form__group form__item--15">
				<label for="number" class="form__label">No.</label>
				<input id="number" type="text" class="form__field" autocomplete="off">
			</div>
		</div>

		<div class="form__row">
			<div class="form__group form__item--50">
				<label for="spec-section" class="form__label">Spec Section</label>
				<input id="spec-section" type="text" class="form__field" autocomplete="off">
			</div>

			<div class="form__group form__item">
				<label for="drawing-number" class="form__label">Drawing No.</label>
				<input id="drawing-number" type="text" class="form__field" autocomplete="off">
			</div>
		</div>
		
		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="submittal-person" class="form__label">Submitted By</label>
				<input id="submittal-person" type="text" class="form__field" autocomplete="off">
			</div>

			<div class="form__group form__item">
				<label for="submittal-date" class="form__label">Submittal Date</label>
				<input id="submittal-date" type="date" class="form__field" autocomplete="off">
			</div>
		</div>
		
		<div class="form__group">
			<label for="submittal-company" class="form__label">Company</label>
			<input id="submittal-company" type="text" class="form__field" autocomplete="off">
		</div>

		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="responsible-person" class="form__label">Assigned To</label>
				<input id="responsible-person" type="text" class="form__field" autocomplete="off">
			</div>
			<div class="form__group form__item">
				<label for="due_date" class="form__label">Due Date</label>
				<input id="due_date" type="date" class="form__field" autocomplete="off">
			</div>
		</div> 
		
		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="responsible-company" class="form__label">Company</label>
				<input id="responsible-company" type="text" class="form__field" autocomplete="off">
			</div>

			<div class="form__group form__item">
				<label for="status" class="form__label">Status</label>
				<input id="status" type="text" class="form__field" autocomplete="off">
			</div>
		</div>

		<div class="form__group">
			<label for="description" class="form__label">Description</label>
			<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
		</div>
		
		<div class="modal__buttons">
			<button class="button btn-primary" data-action="close">Cancel</button>
			<button class="button btn-secondary" data-action="submit">Submit</button>
		</div>`
	);
}

async function editSubmittalForm(id) {
	const response = await axios.get(`/project/rfi/${id}`);
	const record = response.data;

	$('#modal-form').append(
		`<h3 class="form__title">RFI</h3>
		<input id="id" type="hidden" value="${record.id}">

		<div class="form__row">
			<div class="form__group form__item">
				<label for="title" class="form__label">Title</label>
				<input id="title" type="text" class="form__field" autocomplete="off" value="${record.title}">
			</div>
			<div class="form__group form__item--15">
				<label for="number" class="form__label">No.</label>
				<input id="number" type="text" class="form__field" autocomplete="off" value="${record.number}">
			</div>
		</div>

		<div class="form__row">
			<div class="form__group form__item--50">
				<label for="spec-section" class="form__label">Spec Section</label>
				<input id="spec-section" type="text" class="form__field" autocomplete="off" value="${record.spec_section}">
			</div>

			<div class="form__group form__item">
				<label for="drawing-number" class="form__label">Drawing No.</label>
				<input id="drawing-number" type="text" class="form__field" autocomplete="off" value="${record.drawing_number}">
			</div>
		</div>
		
		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="submittal-person" class="form__label">Submitted By</label>
				<input id="submittal-person" type="text" class="form__field" autocomplete="off" value="${record.submittal_person}">
			</div>

			<div class="form__group form__item">
				<label for="submittal-date" class="form__label">Submittal Date</label>
				<input id="submittal-date" type="date" class="form__field" autocomplete="off" value="${record.submittal_date}">
			</div>
		</div>
		
		<div class="form__group">
			<label for="submittal-company" class="form__label">Company</label>
			<input id="submittal-company" type="text" class="form__field" autocomplete="off" value="${record.submittal_company}">
		</div>

		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="responsible-person" class="form__label">Assigned To</label>
				<input id="responsible-person" type="text" class="form__field" autocomplete="off" value="${record.responsible_person}">
			</div>
			<div class="form__group form__item">
				<label for="due_date" class="form__label">Due Date</label>
				<input id="due_date" type="date" class="form__field" autocomplete="off" value="${record.due_date}">
			</div>
		</div> 
		
		<div class="form__row">
			<div class="form__group form__item--75">
				<label for="responsible-company" class="form__label">Company</label>
				<input id="responsible-company" type="text" class="form__field" autocomplete="off" value="${record.responsible_company}">
			</div>

			<div class="form__group form__item">
				<label for="status" class="form__label">Status</label>
				<input id="status" type="text" class="form__field" autocomplete="off" value="${record.status}">
			</div>
		</div>

		<div class="form__group">
			<label for="description" class="form__label">Description</label>
			<textarea id="description" class="form__textarea" cols="30" rows="10">${record.description}</textarea>
		</div>
		
		<div class="modal__buttons">
			<button class="button btn-primary" data-action="close">Cancel</button>
			<button class="button btn-secondary" data-action="update">Update</button>
		</div>`
	);
}

async function createSubmittalRecord() {
	const title = $('#title').val();
	const number = $('#number').val();
	const spec_section = $('#spec-section').val();
	const drawing_number = $('#drawing-number').val();
	const submittal_person = $('#submittal-person').val();
	const submittal_date = $('#submittal-date').val();
	const submittal_company = $('#submittal-company').val();
	const responsible_person = $('#responsible-person').val();
	const due_date = $('#due_date').val();
	const responsible_company = $('#responsible-company').val();
	const status = $('#status').val();
	const description = $('#description').val();
	const projectID = $('#project-id').text();

	const response = await axios.post('/project/rfi', {
		title,
		number,
		spec_section,
		drawing_number,
		submittal_person,
		submittal_date,
		submittal_company,
		responsible_person,
		due_date,
		responsible_company,
		status,
		description,
		projectID
	});

	const record = response.data;

	$('#rfi').append(
		`<div id="rfi-${record.id}" class="record">
			<div class="record__heading">
				<h4 id="rfi-title-${record.id}">${record.title}</h4>
				<a data-action="delete" data-id="${record.id}">
					<svg class="icon icon-delete">
						<use xlink:href="/static/img/sprite.svg#icon-trash"></use>
					</svg>
				</a>
				<a data-action="edit" data-id="${record.id}">
					<svg class="icon icon-edit">
						<use xlink:href="/static/img/sprite.svg#icon-pencil"></use>
					</svg>
				</a>
			</div>
			<div class="record__summary">
				<div class="record__summary--data">
					<span>#</span> 
					<p id="rfi-number-${record.id}" >${record.number}</p>
				</div>
				<div class="record__summary--data">
					<span>Assigned:</span> 
					<p id="rfi-responsible_person-${record.id}" >${record.responsible_person}</p>
				</div>
				<div class="record__summary--data">
					<span>Due Date:</span> 
					<p id="rfi-due_date-${record.id}" >${record.due_date}</p>
				</div>
				<div class="record__summary--data">
					<span>Status:</span> 
					<p id="rfi-status-${record.id}" >${record.status}</p>
				</div>
			</div>
		</div>`
	);
}

async function editSubmittalRecord() {
	const title = $('#title').val();
	const number = $('#number').val();
	const spec_section = $('#spec-section').val();
	const drawing_number = $('#drawing-number').val();
	const submittal_person = $('#submittal-person').val();
	const submittal_date = $('#submittal-date').val();
	const submittal_company = $('#submittal-company').val();
	const responsible_person = $('#responsible-person').val();
	const due_date = $('#due_date').val();
	const responsible_company = $('#responsible-company').val();
	const status = $('#status').val();
	const description = $('#description').val();
	const id = $('#id').val();

	const response = await axios.patch('/project/rfi', {
		title,
		number,
		spec_section,
		drawing_number,
		submittal_person,
		submittal_date,
		submittal_company,
		responsible_person,
		due_date,
		responsible_company,
		status,
		description,
		id
	});

	$(`#rfi-title-${id}`).text(title);
	$(`#rfi-number-${id}`).text(number);
	$(`#rfi-responsible_person-${id}`).text(responsible_person);
	$(`#rfi-due_date-${id}`).text(due_date);
	$(`#rfi-status-${id}`).text(status);
}
