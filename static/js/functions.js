// ********** GENERAL FUNCTIONS **********
function hideSections() {
	$('#general').addClass('is-hidden');
	$('#rfi').addClass('is-hidden');
	$('#submittal').addClass('is-hidden');
	$('#change_order').addClass('is-hidden');
	$('#inspection').addClass('is-hidden');
	$('#details').empty();
	$('#details').append('<h3 class="details-message"> Select a record to view additional details.</h3>');
}

function projectMenu() {
	$('#menu-item-1').removeClass('side-nav__item--active');
	$('#menu-item-2').removeClass('side-nav__item--active');
	$('#menu-item-3').removeClass('side-nav__item--active');
	$('#menu-item-4').removeClass('side-nav__item--active');
	$('#menu-item-5').removeClass('side-nav__item--active');
	$('#menu-item-1m').removeClass('side-nav__item--active');
	$('#menu-item-2m').removeClass('side-nav__item--active');
	$('#menu-item-3m').removeClass('side-nav__item--active');
	$('#menu-item-4m').removeClass('side-nav__item--active');
	$('#menu-item-5m').removeClass('side-nav__item--active');
}

function closeModal() {
	$('#modal').toggleClass('modal-visible');
	setTimeout(() => $('#modal-form').empty(), 500);
}

function formatDate(Z) {
	const date = new Date(Z);
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	return year + '-' + pad(month + 1) + '-' + pad(day + 1);
}

function shortDate(Z) {
	const date = new Date(Z);
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	return year + '-' + pad(month + 1) + '-' + pad(day);
}

function pad(n) {
	return n < 10 ? '0' + n : n;
}
//////////////////////////////////////////////////////
//FUNCTION OBJECTS
const newRecordForm = {
	rfi          : newRFIForm,
	submittal    : newSubmittalForm,
	change_order : newChangeOrderForm,
	inspection   : newInspectionForm
};

const editRecordForm = {
	rfi          : editRFIForm,
	submittal    : editSubmittalForm,
	change_order : editChangeOrderForm,
	inspection   : editInspectionForm
};

const createRecord = {
	rfi          : createRFIRecord,
	submittal    : createSubmittalRecord,
	change_order : createChangeOrderRecord,
	inspection   : createInspectionRecord
};

const updateRecord = {
	rfi          : editRFIRecord,
	submittal    : editSubmittalRecord,
	change_order : editChangeOrderRecord,
	inspection   : editInspectionRecord
};

const viewRecord = {
	rfi          : viewRFIRecord,
	submittal    : viewSubmittalRecord,
	change_order : viewChangeOrderRecord,
	inspection   : viewInspectionRecord
};

//////////////////////////////////////////////////////
//INSPECTION FUNCTIONS
function newInspectionForm() {
	$('#modal-form').append(
		`<h3 class="form__title">Inspection</h3>
		<div class="form__main-content">
			<div class="form__row">
				<div class="form__group form__item--85">
					<label for="title" class="form__label">Title <span class="form__required">*</span></label>
					<input id="title" type="text" class="form__field" autocomplete="off" required>
				</div>
				<div class="form__group form__item--15">
					<label for="report_number" class="form__label">No. <span class="form__required">*</span></label>
					<input id="report_number" type="number" step="any" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="inspector" class="form__label">Inspector <span class="form__required">*</span></label>
					<input id="inspector" type="text" class="form__field" autocomplete="off" value="" required>
				</div>

				<div class="form__group form__item--25">
					<label for="date" class="form__label">Inspection Date <span class="form__required">*</span></label>
					<input id="date" type="date" class="form__field" value="" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="description" class="form__label">Description</label>
					<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="attachment" class="form__label">Attachment</label>
					<input id="attachment" type="file">
				</div>
			</div>

		</div>
		
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="submit">Submit</button>
		</div>`
	);
}

async function editInspectionForm(id) {
	const response = await axios.get(`/project/inspection/${id}`);
	const record = response.data;

	const inspectionDate = formatDate(record.date);

	$('#modal-form').append(
		`<h3 class="form__title">Inspection</h3>
		<input id="id" type="hidden" value="${record.id}">
		<div class="form__main-content">

			<div class="form__row">
				<div class="form__group form__item--85">
					<label for="title" class="form__label">Title <span class="form__required">*</span></label>
					<input id="title" type="text" class="form__field" autocomplete="off" value="${record.title}" required>
				</div>
				<div class="form__group form__item--15">
					<label for="report_number" class="form__label">No. <span class="form__required">*</span></label>
					<input id="report_number" type="number" step="any" class="form__field" autocomplete="off" value="${record.report_number}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="inspector" class="form__label">Inspector <span class="form__required">*</span></label>
					<input id="inspector" type="text" class="form__field" autocomplete="off" value="${record.inspector}" required>
				</div>

				<div class="form__group form__item--25">
					<label for="date" class="form__label">Inspection Date <span class="form__required">*</span></label>
					<input id="date" type="date" class="form__field" autocomplete="off" value="${inspectionDate}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="description" class="form__label">Description</label>
					<textarea id="description" class="form__textarea" cols="30" rows="10">${record.description}</textarea>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group">
					<label for="attachment" class="form__label">Attachment</label>
					<input id="attachment" type="file">
					${record.file_name
						? `<span class="form__help-text">Uploading a new file will overwrite the following document: <i class="file-name">${record.file_name}</i>.</span>`
						: ''}
				</div>
			</div>
		</div>

		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="update">Update</button>
		</div>`
	);
}

async function createInspectionRecord() {
	const title = $('#title').val();
	const report_number = $('#report_number').val();
	const inspector = $('#inspector').val();
	const date = $('#date').val();
	const description = $('#description').val();
	const attachment = $('#attachment').prop('files')[0];
	const projectID = $('#project-id').text();

	const inputs = { title, report_number, inspector, date, description, attachment, projectID };

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	const response = await axios({
		method  : 'post',
		url     : '/project/inspection',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	const record = response.data;

	$('#inspection').append(
		`
		<div id="inspection-${record.id}" class="record">
			<div class="record__heading">
				<h4 id="inspection-title-${record.id}" data-id="${record.id}" data-record="details">${record.title}</h4>
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
	const report_number = $('#report_number').val();
	const inspector = $('#inspector').val();
	const date = $('#date').val();
	const description = $('#description').val();
	const id = $('#id').val();
	const attachment = $('#attachment').prop('files')[0];

	const inputs = { title, report_number, inspector, date, description, attachment, id };

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	await axios({
		method  : 'patch',
		url     : '/project/inspection',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	$(`#inspection-title-${id}`).text(`${title}`);
	$(`#inspection-number-${id}`).text(`${report_number}`);
	$(`#inspection-inspector-${id}`).text(`${inspector}`);
	$(`#inspection-date-${id}`).text(`${date}`);
	return id;
}

async function viewInspectionRecord(id) {
	const response = await axios.get(`/project/inspection/${id}`);
	const record = response.data;

	const createdDate = shortDate(record.created);
	const updatedDate = shortDate(record.updated);
	const inspectionDate = formatDate(record.date);

	$('#details').empty();
	$('#details').append(`
		<h3 class="details__title">${record.title}</h3>
		<div class="details__metadata">
			<div>
				<span class="details__field-name">Report No.:</span> 
				<span>${record.report_number}</span>
			</div>
			<div>
				<span class="details__field-name">Created By:</span> 
				<span>${record.author}</span>
			</div>
			<div>
				<span class="details__field-name">Created:</span> 
				<span>${createdDate}</span>
			</div>
			<div>
				<span class="details__field-name">Modified:</span> 
				<span>${updatedDate}</span>
			</div>
		</div>
		
		<div class="details__data">
			<h4 class="details__subheading">Details</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Inspector:</td>
					<td>${record.inspector} </td>
				</tr>
				<tr>
					<td class="details__field-name">Inspection Date:</td>
					<td>${inspectionDate} </td>
				</tr>
			</table>

			<h4 class="details__subheading">Attachment</h4>
			${record.file_name
				? `<a class="details__file-name" href="/project/inspection/document/${record.id}" target="_blank">${record.file_name}</a>`
				: '<span class="details__file-name">Record contains no attachment.</span>'}
			
			<h4 class="details__subheading">Description</h4>
    		<p class="details__description">${record.description}</p>
		</div>
		
	`);
}

async function deleteRecord(id) {
	await axios.delete(`/project/${activeSection}/${id}`);
	$(`#${activeSection}-${id}`).remove();
}

//////////////////////////////////////////////////////
//RFI FUNCTIONS
function newRFIForm() {
	$('#modal-form').append(
		`<h3 class="form__title">Request For Information</h3>
		<div class="form__main-content">

			<div class="form__row">
				<div class="form__group form__item--85">
					<label for="title" class="form__label">Title <span class="form__required">*</span></label>
					<input id="title" type="text" class="form__field" autocomplete="off" required>
				</div>
				<div class="form__group form__item--15">
					<label for="number" class="form__label">No. <span class="form__required">*</span></label>
					<input id="number" type="number" step="any" class="form__field" autocomplete="off"required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--50">
					<label for="spec-section" class="form__label">Spec Section</label>
					<input id="spec-section" type="text" class="form__field" autocomplete="off">
				</div>

				<div class="form__group form__item--50">
					<label for="drawing-number" class="form__label">Drawing No.</label>
					<input id="drawing-number" type="text" class="form__field" autocomplete="off">
				</div>
			</div>
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="submittal-person" class="form__label">Submitted By <span class="form__required">*</span></label>
					<input id="submittal-person" type="text" class="form__field" autocomplete="off" required>
				</div>

				<div class="form__group form__item--25">
					<label for="submittal-date" class="form__label">Submittal Date <span class="form__required">*</span></label>
					<input id="submittal-date" type="date" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="submittal-company" class="form__label">Company <span class="form__required">*</span></label>
					<input id="submittal-company" type="text" class="form__field" autocomplete="off" required>
				</div>
			</div>


			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="responsible-person" class="form__label">Assigned To</label>
					<input id="responsible-person" type="text" class="form__field" autocomplete="off">
				</div>
				<div class="form__group form__item--25">
					<label for="due_date" class="form__label">Due Date <span class="form__required">*</span></label>
					<input id="due_date" type="date" class="form__field" autocomplete="off" required>
				</div>
			</div> 
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="responsible-company" class="form__label">Company</label>
					<input id="responsible-company" type="text" class="form__field" autocomplete="off">
				</div>

				<div class="form__group form__item--25">
					<label for="status" class="form__label">Status <span class="form__required">*</span></label>
					<input id="status" type="text" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="description" class="form__label">Description</label>
					<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group">
					<label for="attachment" class="form__label">Attachment</label>
					<input id="attachment" type="file">
				</div>
			</div>
		</div>
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="submit">Submit</button>
		</div>`
	);
}

async function editRFIForm(id) {
	const response = await axios.get(`/project/rfi/${id}`);
	const record = response.data;

	const submittalDate = formatDate(record.submittal_date);
	const dueDate = formatDate(record.due_date);

	$('#modal-form').append(
		`<h3 class="form__title">Request For Information</h3>
		<input id="id" type="hidden" value="${record.id}">
		<div class="form__main-content">

			<div class="form__row">
				<div class="form__group form__item--85">
					<label for="title" class="form__label">Title <span class="form__required">*</span></label>
					<input id="title" type="text" class="form__field" autocomplete="off" value="${record.title}" required>
				</div>
				<div class="form__group form__item--15">
					<label for="number" class="form__label">No. <span class="form__required">*</span></label>
					<input id="number" type="number" step="any" class="form__field" autocomplete="off" value="${record.number}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--50">
					<label for="spec-section" class="form__label">Spec Section</label>
					<input id="spec-section" type="text" class="form__field" autocomplete="off" value="${record.spec_section}">
				</div>

				<div class="form__group form__item--50">
					<label for="drawing-number" class="form__label">Drawing No.</label>
					<input id="drawing-number" type="text" class="form__field" autocomplete="off" value="${record.drawing_number}">
				</div>
			</div>
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="submittal-person" class="form__label">Submitted By <span class="form__required">*</span></label>
					<input id="submittal-person" type="text" class="form__field" autocomplete="off" value="${record.submittal_person}" required>
				</div>

				<div class="form__group form__item--25">
					<label for="submittal-date" class="form__label">Submittal Date <span class="form__required">*</span></label>
					<input id="submittal-date" type="date" class="form__field" autocomplete="off" value="${submittalDate}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="submittal-company" class="form__label">Company <span class="form__required">*</span></label>
					<input id="submittal-company" type="text" class="form__field" autocomplete="off" value="${record.submittal_company}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="responsible-person" class="form__label">Assigned To</label>
					<input id="responsible-person" type="text" class="form__field" autocomplete="off" value="${record.responsible_person}">
				</div>
				<div class="form__group form__item--25">
					<label for="due_date" class="form__label">Due Date <span class="form__required">*</span></label>
					<input id="due_date" type="date" class="form__field" autocomplete="off" value="${dueDate}" required>
				</div>
			</div> 
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="responsible-company" class="form__label">Company</label>
					<input id="responsible-company" type="text" class="form__field" autocomplete="off" value="${record.responsible_company}">
				</div>

				<div class="form__group form__item--25">
					<label for="status" class="form__label">Status <span class="form__required">*</span></label>
					<input id="status" type="text" class="form__field" autocomplete="off" value="${record.status}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="description" class="form__label">Description</label>
					<textarea id="description" class="form__textarea" cols="30" rows="10">${record.description}</textarea>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="attachment" class="form__label">Attachment</label>
					<input id="attachment" type="file">
					${record.file_name
						? `<span class="form__help-text">Uploading a new file will overwrite the following document: <i class="file-name">${record.file_name}</i>.</span>`
						: ''}
				</div>	
			</div>	
		</div>	
		
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="update">Update</button>
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
	const attachment = $('#attachment').prop('files')[0];
	const projectID = $('#project-id').text();

	const inputs = {
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
		attachment,
		projectID
	};

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	const response = await axios({
		method  : 'post',
		url     : '/project/rfi',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	const record = response.data;

	$('#rfi').append(
		`<div id="rfi-${record.id}" class="record">
			<div class="record__heading">
				<h4 id="rfi-title-${record.id}" data-id="${record.id}" data-record="details">${record.title}</h4>
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
					<p id="rfi-responsible_company-${record.id}" >${record.responsible_company}</p>
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
	const attachment = $('#attachment').prop('files')[0];

	const inputs = {
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
		attachment,
		id
	};

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	await axios({
		method  : 'patch',
		url     : '/project/rfi',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	$(`#rfi-title-${id}`).text(title);
	$(`#rfi-number-${id}`).text(number);
	$(`#rfi-responsible_company-${id}`).text(responsible_company);
	$(`#rfi-due_date-${id}`).text(due_date);
	$(`#rfi-status-${id}`).text(status);

	return id;
}

async function viewRFIRecord(id) {
	const response = await axios.get(`/project/rfi/${id}`);
	const record = response.data;

	const createdDate = shortDate(record.created);
	const updatedDate = shortDate(record.updated);
	const submittalDate = formatDate(record.submittal_date);
	const dueDate = formatDate(record.due_date);

	$('#details').empty();
	$('#details').append(`
		<h3 class="details__title">${record.title}</h3>
		<div class="details__metadata">
			<div>
				<span class="details__field-name">RFI No.:</span> 
				<span>${record.number}</span>
			</div>
			<div>
				<span class="details__field-name">Created By:</span> 
				<span>${record.author}</span>
			</div>
			<div>
				<span class="details__field-name">Created:</span> 
				<span>${createdDate}</span>
			</div>
			<div>
				<span class="details__field-name">Modified:</span> 
				<span>${updatedDate}</span>
			</div>
		</div>
		
		<div class="details__data">
			<h4 class="details__subheading">Submission</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Submitted By:</td>
					<td>${record.submittal_person}</td>
				</tr>
				<tr>
					<td class="details__field-name">Company:</td>
					<td>${record.submittal_company}</td>
				</tr>
				<tr>
					<td class="details__field-name">Date:</td>
					<td>${submittalDate}</td>
				</tr>
			</table>

			<h4 class="details__subheading">Assignee</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Assigned To:</td>
					<td>${record.responsible_person}</td>
				</tr>
				<tr>
					<td class="details__field-name">Company:</td>
					<td>${record.responsible_company}</td>
				</tr>

				<tr>
					<td class="details__field-name">Due Date:</td>
					<td>${dueDate}</td>
				</tr>
			</table>

			<h4 class="details__subheading">Details</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Spec Section:</td>
					<td>${record.spec_section} </td>
				</tr>
				<tr>
					<td class="details__field-name">Drawing No.:</td>
					<td>${record.drawing_number} </td>
				</tr>
				<tr>
					<td class="details__field-name">Status:</td>
					<td>${record.status} </td>
				</tr>
			</table>

			<h4 class="details__subheading">Attachment</h4>
			${record.file_name
				? `<a class="details__file-name" href="/project/rfi/document/${record.id}" target="_blank">${record.file_name}</a>`
				: '<span class="details__file-name">Record contains no attachment.</span>'}
		
			<h4 class="details__subheading">Description</h4>
    		<p class="details__description">${record.description}</p>
		</div>
		
	`);
}

//////////////////////////////////////////////////////
//SUBMITTAL FUNCTIONS
function newSubmittalForm() {
	$('#modal-form').append(
		`<h3 class="form__title">Submittal</h3>
		<div class="form__main-content">
			
		<div class="form__row">
				<div class="form__group form__item--85">
					<label for="title" class="form__label">Title <span class="form__required">*</span></label>
					<input id="title" type="text" class="form__field" autocomplete="off" required>
				</div>

				<div class="form__group form__item--15">
					<label for="number" class="form__label">No. <span class="form__required">*</span></label>
					<input id="number" type="number" step="any" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
					<div class="form__group form__item--50">
					<label for="spec-section" class="form__label">Spec Section</label>
					<input id="spec-section" type="text" class="form__field" autocomplete="off">
				</div>

					<div class="form__group form__item--50">
					<label for="type" class="form__label">Type</label>
					<input id="type" type="text" class="form__field" autocomplete="off">
				</div>
			</div>
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="submittal-person" class="form__label">Submitted By <span class="form__required">*</span></label>
					<input id="submittal-person" type="text" class="form__field" autocomplete="off" required>
				</div>

				<div class="form__group form__item--25">
					<label for="submittal-date" class="form__label">Submittal Date <span class="form__required">*</span></label>
					<input id="submittal-date" type="date" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="submittal-company" class="form__label">Company <span class="form__required">*</span></label>
					<input id="submittal-company" type="text" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="responsible-person" class="form__label">Assigned To</label>
					<input id="responsible-person" type="text" class="form__field" autocomplete="off">
				</div>
				<div class="form__group form__item--25">
					<label for="due_date" class="form__label">Due Date <span class="form__required">*</span></label>
					<input id="due_date" type="date" class="form__field" autocomplete="off" required>
				</div>
			</div> 
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="responsible-company" class="form__label">Company</label>
					<input id="responsible-company" type="text" class="form__field" autocomplete="off">
				</div>

				<div class="form__group form__item--25">
					<label for="status" class="form__label">Status <span class="form__required">*</span></label>
					<input id="status" type="text" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__group">
				<div class="form__group form__item--100">
					<label for="description" class="form__label">Description</label>
					<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
				</div>
			</div>

			<div class="form__group">
				<div class="form__group form__item--100">
					<label for="attachment" class="form__label">Attachment</label>
					<input id="attachment" type="file">
				</div>	
			</div>	
		</div>	
		
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="submit">Submit</button>
		</div>`
	);
}

async function editSubmittalForm(id) {
	const response = await axios.get(`/project/submittal/${id}`);
	const record = response.data;
	const submittalDate = formatDate(record.submittal_date);
	const dueDate = formatDate(record.due_date);

	$('#modal-form').append(
		`<h3 class="form__title">Submittal</h3>
		<input id="id" type="hidden" value="${record.id}">
		<div class="form__main-content">
			<div class="form__row">
				<div class="form__group form__item--85">
					<label for="title" class="form__label">Title <span class="form__required">*</span></label>
					<input id="title" type="text" class="form__field" autocomplete="off" value="${record.title}" required>
				</div>
				<div class="form__group form__item--15">
					<label for="number" class="form__label">No. <span class="form__required">*</span></label>
					<input id="number" type="number" step="any" class="form__field" autocomplete="off" value="${record.number}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--50">
					<label for="spec-section" class="form__label">Spec Section</label>
					<input id="spec-section" type="text" class="form__field" autocomplete="off" value="${record.spec_section}">
				</div>

					<div class="form__group form__item--50">
					<label for="type" class="form__label">Type</label>
					<input id="type" type="text" class="form__field" autocomplete="off" value="${record.type}">
				</div>
			</div>
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="submittal-person" class="form__label">Submitted By <span class="form__required">*</span></label>
					<input id="submittal-person" type="text" class="form__field" autocomplete="off" value="${record.submittal_person}" required>
				</div>

				<div class="form__group form__item--25">
					<label for="submittal-date" class="form__label">Submittal Date <span class="form__required">*</span></label>
					<input id="submittal-date" type="date" class="form__field" autocomplete="off" value="${submittalDate}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="submittal-company" class="form__label">Company <span class="form__required">*</span></label>
					<input id="submittal-company" type="text" class="form__field" autocomplete="off" value="${record.submittal_company}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="responsible-person" class="form__label">Assigned To</label>
					<input id="responsible-person" type="text" class="form__field" autocomplete="off" value="${record.responsible_person}">
				</div>
				<div class="form__group form__item--25">
					<label for="due_date" class="form__label">Due Date <span class="form__required">*</span></label>
					<input id="due_date" type="date" class="form__field" autocomplete="off" value="${dueDate}" required>
				</div>
			</div> 
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="responsible-company" class="form__label">Company</label>
					<input id="responsible-company" type="text" class="form__field" autocomplete="off" value="${record.responsible_company}">
				</div>

				<div class="form__group form__item--25">
					<label for="status" class="form__label">Status <span class="form__required">*</span></label>
					<input id="status" type="text" class="form__field" autocomplete="off" value="${record.status}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="description" class="form__label">Description</label>
					<textarea id="description" class="form__textarea" cols="30" rows="10">${record.description}</textarea>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="attachment" class="form__label">Attachment</label>
					<input id="attachment" type="file">
					${record.file_name
						? `<span class="form__help-text">Uploading a new file will overwrite the following document: <i class="file-name">${record.file_name}</i>.</span>`
						: ''}
				</div>
			</div>
		</div>		
		
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="update">Update</button>
		</div>`
	);
}

async function createSubmittalRecord() {
	const title = $('#title').val();
	const number = $('#number').val();
	const spec_section = $('#spec-section').val();
	const type = $('#type').val();
	const submittal_person = $('#submittal-person').val();
	const submittal_date = $('#submittal-date').val();
	const submittal_company = $('#submittal-company').val();
	const responsible_person = $('#responsible-person').val();
	const due_date = $('#due_date').val();
	const responsible_company = $('#responsible-company').val();
	const status = $('#status').val();
	const description = $('#description').val();
	const attachment = $('#attachment').prop('files')[0];
	const projectID = $('#project-id').text();

	const inputs = {
		title,
		number,
		spec_section,
		type,
		submittal_person,
		submittal_date,
		submittal_company,
		responsible_person,
		due_date,
		responsible_company,
		status,
		description,
		attachment,
		projectID
	};

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	const response = await axios({
		method  : 'post',
		url     : '/project/submittal',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	const record = response.data;

	$('#submittal').append(
		`<div id="submittal-${record.id}" class="record">
			<div class="record__heading">
				<h4 id="submittal-title-${record.id}" data-id="${record.id}" data-record="details">${record.title}</h4>
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
					<p id="submittal-number-${record.id}" >${record.number}</p>
				</div>
				<div class="record__summary--data">
					<span>Type:</span> 
					<p id="submittal-type-${record.id}" >${record.type}</p>
				</div>
				<div class="record__summary--data">
					<span>Assigned:</span> 
					<p id="submittal-responsible_company-${record.id}" >${record.responsible_company}</p>
				</div>
				<div class="record__summary--data">
					<span>Due Date:</span> 
					<p id="submittal-due_date-${record.id}" >${record.due_date}</p>
				</div>
				<div class="record__summary--data">
					<span>Status:</span> 
					<p id="submittal-status-${record.id}" >${record.status}</p>
				</div>
			</div>
		</div>`
	);
}

async function editSubmittalRecord() {
	const title = $('#title').val();
	const number = $('#number').val();
	const spec_section = $('#spec-section').val();
	const type = $('#type').val();
	const submittal_person = $('#submittal-person').val();
	const submittal_date = $('#submittal-date').val();
	const submittal_company = $('#submittal-company').val();
	const responsible_person = $('#responsible-person').val();
	const due_date = $('#due_date').val();
	const responsible_company = $('#responsible-company').val();
	const status = $('#status').val();
	const description = $('#description').val();
	const id = $('#id').val();
	const attachment = $('#attachment').prop('files')[0];

	const inputs = {
		title,
		number,
		spec_section,
		type,
		submittal_person,
		submittal_date,
		submittal_company,
		responsible_person,
		due_date,
		responsible_company,
		status,
		description,
		attachment,
		id
	};

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	await axios({
		method  : 'patch',
		url     : '/project/submittal',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	$(`#submittal-title-${id}`).text(title);
	$(`#submittal-number-${id}`).text(number);
	$(`#submittal-type-${id}`).text(type);
	$(`#submittal-responsible_company-${id}`).text(responsible_company);
	$(`#submittal-due_date-${id}`).text(due_date);
	$(`#submittal-status-${id}`).text(status);

	return id;
}

async function viewSubmittalRecord(id) {
	const response = await axios.get(`/project/submittal/${id}`);
	const record = response.data;

	const createdDate = shortDate(record.created);
	const updatedDate = shortDate(record.updated);
	const submittalDate = formatDate(record.submittal_date);
	const dueDate = formatDate(record.due_date);

	$('#details').empty();
	$('#details').append(`
		<h3 class="details__title">${record.title}</h3>
		<div class="details__metadata">
			<div>
				<span class="details__field-name">Submittal No.:</span> 
				<span>${record.number}</span>
			</div>
			<div>
				<span class="details__field-name">Created By:</span> 
				<span>${record.author}</span>
			</div>
			<div>
				<span class="details__field-name">Created:</span> 
				<span>${createdDate}</span>
			</div>
			<div>
				<span class="details__field-name">Modified:</span> 
				<span>${updatedDate}</span>
			</div>
		</div>
		
		<div class="details__data">
			<h4 class="details__subheading">Submission</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Submitted By:</td>
					<td>${record.submittal_person}</td>
				</tr>
				<tr>
					<td class="details__field-name">Company:</td>
					<td>${record.submittal_company}</td>
				</tr>
				<tr>
					<td class="details__field-name">Date:</td>
					<td>${submittalDate}</td>
				</tr>
			</table>

			<h4 class="details__subheading">Assignee</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Assigned To:</td>
					<td>${record.responsible_person}</td>
				</tr>
				<tr>
					<td class="details__field-name">Company:</td>
					<td>${record.responsible_company}</td>
				</tr>

				<tr>
					<td class="details__field-name">Due Date:</td>
					<td>${dueDate}</td>
				</tr>
			</table>

			<h4 class="details__subheading">Details</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Submittal Type:</td>
					<td>${record.type} </td>
				</tr>
				<tr>
					<td class="details__field-name">Spec Section:</td>
					<td>${record.spec_section} </td>
				</tr>

				<tr>
					<td class="details__field-name">Status:</td>
					<td>${record.status} </td>
				</tr>
			</table>
			
			<h4 class="details__subheading">Attachment</h4>
			${record.file_name
				? `<a class="details__file-name" href="/project/submittal/document/${record.id}" target="_blank">${record.file_name}</a>`
				: '<span class="details__file-name">Record contains no attachment.</span>'}

			<h4 class="details__subheading">Description</h4>
    		<p class="details__description">${record.description}</p>
		</div>
		
	`);
}
//////////////////////////////////////////////////////
//CHANGE ORDER FUNCTIONS
function newChangeOrderForm() {
	$('#modal-form').append(
		`<h3 class="form__title">Change Order</h3>
		<div class="form__main-content">

			<div class="form__row">
				<div class="form__group form__item--85">
					<label for="title" class="form__label">Title <span class="form__required">*</span></label>
					<input id="title" type="text" class="form__field" autocomplete="off" required>
				</div>

				<div class="form__group form__item--15">
					<label for="number" class="form__label">No. <span class="form__required">*</span></label>
					<input id="number" type="number" step="any" class="form__field" autocomplete="off" required>
				</div>
			</div>
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="submittal-person" class="form__label">Submitted By <span class="form__required">*</span></label>
					<input id="submittal-person" type="text" class="form__field" autocomplete="off" required>
				</div>

				<div class="form__group form__item--25">
					<label for="submittal-date" class="form__label">Submittal Date <span class="form__required">*</span></label>
					<input id="submittal-date" type="date" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="submittal-company" class="form__label">Company <span class="form__required">*</span></label>
					<input id="submittal-company" type="text" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--50">
					<label for="responsible-person" class="form__label">Assigned To</label>
					<input id="responsible-person" type="text" class="form__field" autocomplete="off">
				</div>

				<div class="form__group form__item--50">
					<label for="responsible-company" class="form__label">Company</label>
					<input id="responsible-company" type="text" class="form__field" autocomplete="off">
				</div>
			</div> 
			
			<div class="form__row">
				<div class="form__group form__item--25">
					<label for="type" class="form__label">Type</label>
					<input id="type" type="text" class="form__field" autocomplete="off">
				</div>

				<div class="form__group form__item--25">
					<label for="cost" class="form__label">Cost <span class="form__required">*</span></label>
					<input id="cost" type="number" step="any" class="form__field" autocomplete="off" required>
				</div>

				<div class="form__group form__item--50">
					<label for="status" class="form__label">Status <span class="form__required">*</span></label>
					<input id="status" type="text" class="form__field" autocomplete="off" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="description" class="form__label">Description</label>
					<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="attachment" class="form__label">Attachment</label>
					<input id="attachment" type="file">
				</div>		
			</div>		
		</div>
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="submit">Submit</button>
		</div>`
	);
}

async function editChangeOrderForm(id) {
	const response = await axios.get(`/project/change_order/${id}`);
	const record = response.data;
	const submittalDate = formatDate(record.submittal_date);

	$('#modal-form').append(
		`<h3 class="form__title">Change Order</h3>
		<input id="id" type="hidden" value="${record.id}">
		<div class="form__main-content">

			<div class="form__row">
				<div class="form__group form__item--85">
					<label for="title" class="form__label">Title <span class="form__required">*</span></label>
					<input id="title" type="text" class="form__field" autocomplete="off" value="${record.title}" required>
				</div>

				<div class="form__group form__item--15">
					<label for="number" class="form__label">No. <span class="form__required">*</span></label>
					<input id="number" type="number" step="any" class="form__field" autocomplete="off" value="${record.number}" required>
				</div>
			</div>
			
			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="submittal-person" class="form__label">Submitted By <span class="form__required">*</span></label>
					<input id="submittal-person" type="text" class="form__field" autocomplete="off" value="${record.submittal_person}" required>
				</div>

				<div class="form__group form__item--25">
					<label for="submittal-date" class="form__label">Submittal Date <span class="form__required">*</span></label>
					<input id="submittal-date" type="date" class="form__field" autocomplete="off" value="${submittalDate}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--100">
					<label for="submittal-company" class="form__label">Company <span class="form__required">*</span></label>
					<input id="submittal-company" type="text" class="form__field" autocomplete="off" value="${record.submittal_company}" required>
				</div>
			</div>

			<div class="form__row">
				<div class="form__group form__item--50">
					<label for="responsible-person" class="form__label">Assigned To</label>
					<input id="responsible-person" type="text" class="form__field" autocomplete="off" value="${record.responsible_person}">
				</div>

				<div class="form__group form__item--50">
					<label for="responsible-company" class="form__label">Company</label>
					<input id="responsible-company" type="text" class="form__field" autocomplete="off" value="${record.responsible_company}">
				</div>
			</div> 
			
			<div class="form__row">
				<div class="form__group form__item--25">
					<label for="type" class="form__label">Type</label>
					<input id="type" type="text" class="form__field" autocomplete="off" value="${record.type}">
				</div>

				<div class="form__group form__item--25">
					<label for="cost" class="form__label">Cost <span class="form__required">*</span></label>
					<input id="cost" type="number" step="any" class="form__field" autocomplete="off" value="${record.cost}" required>
				</div>

				<div class="form__group form__item--50">
					<label for="status" class="form__label">Status <span class="form__required">*</span></label>
					<input id="status" type="text" class="form__field" autocomplete="off" value="${record.status}" required>
				</div>
			</div>

			<div class="form__group">
				<div class="form__group form__item--100">
					<label for="description" class="form__label">Description</label>
					<textarea id="description" class="form__textarea" cols="30" rows="10">${record.description}</textarea>
				</div>
			</div>

			<div class="form__group">
				<div class="form__group form__item--100">
					<label for="attachment" class="form__label">Attachment</label>
					<input id="attachment" type="file">
					${record.file_name
						? `<span class="form__help-text">Uploading a new file will overwrite the following document: <i class="file-name">${record.file_name}</i>.</span>`
						: ''}
				</div>	
			</div>	
		</div>	
		
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="update">Update</button>
		</div>`
	);
}

async function createChangeOrderRecord() {
	const title = $('#title').val();
	const number = $('#number').val();
	const submittal_person = $('#submittal-person').val();
	const submittal_date = $('#submittal-date').val();
	const submittal_company = $('#submittal-company').val();
	const responsible_person = $('#responsible-person').val();
	const responsible_company = $('#responsible-company').val();
	const type = $('#type').val();
	const cost = $('#cost').val();
	const status = $('#status').val();
	const description = $('#description').val();
	const attachment = $('#attachment').prop('files')[0];
	const projectID = $('#project-id').text();

	const inputs = {
		title,
		number,
		submittal_person,
		submittal_date,
		submittal_company,
		responsible_person,
		responsible_company,
		type,
		cost,
		status,
		description,
		attachment,
		projectID
	};

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	const response = await axios({
		method  : 'post',
		url     : '/project/change_order',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	const record = response.data;

	$('#change_order').append(
		`<div id="change_order-${record.id}" class="record">
			<div class="record__heading">
				<h4 id="change_order-title-${record.id}" data-id="${record.id}" data-record="details">${record.title}</h4>
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
					<p id="change_order-number-${record.id}" >${record.number}</p>
				</div>
				<div class="record__summary--data">
					<span>Type:</span> 
					<p id="change_order-type-${record.id}" >${record.type}</p>
				</div>
				<div class="record__summary--data">
					<span>Assigned:</span> 
					<p id="change_order-responsible_company-${record.id}" >${record.responsible_company}</p>
				</div>
				<div class="record__summary--data">
					<span>Status:</span> 
					<p id="change_order-status-${record.id}" >${record.status}</p>
				</div>
			</div>
		</div>`
	);
}

async function editChangeOrderRecord() {
	const title = $('#title').val();
	const number = $('#number').val();
	const submittal_person = $('#submittal-person').val();
	const submittal_date = $('#submittal-date').val();
	const submittal_company = $('#submittal-company').val();
	const responsible_person = $('#responsible-person').val();
	const responsible_company = $('#responsible-company').val();
	const type = $('#type').val();
	const cost = $('#cost').val();
	const status = $('#status').val();
	const description = $('#description').val();
	const id = $('#id').val();
	const attachment = $('#attachment').prop('files')[0];

	const inputs = {
		title,
		number,
		submittal_person,
		submittal_date,
		submittal_company,
		responsible_person,
		responsible_company,
		type,
		cost,
		status,
		description,
		attachment,
		id
	};

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	await axios({
		method  : 'patch',
		url     : '/project/change_order',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	$(`#change_order-title-${id}`).text(title);
	$(`#change_order-number-${id}`).text(number);
	$(`#change_order-type-${id}`).text(type);
	$(`#change_order-responsible_company-${id}`).text(responsible_company);
	$(`#change_order-status-${id}`).text(status);

	return id;
}

async function viewChangeOrderRecord(id) {
	const response = await axios.get(`/project/change_order/${id}`);
	const record = response.data;

	const createdDate = shortDate(record.created);
	const updatedDate = shortDate(record.updated);
	const submittalDate = formatDate(record.submittal_date);
	const dueDate = formatDate(record.due_date);

	$('#details').empty();
	$('#details').append(`
		<h3 class="details__title">${record.title}</h3>
		<div class="details__metadata">
			<div>
				<span class="details__field-name">Change Order No.:</span> 
				<span>${record.number}</span>
			</div>
			<div>
				<span class="details__field-name">Created By:</span> 
				<span>${record.author}</span>
			</div>
			<div>
				<span class="details__field-name">Created:</span> 
				<span>${createdDate}</span>
			</div>
			<div>
				<span class="details__field-name">Modified:</span> 
				<span>${updatedDate}</span>
			</div>
		</div>
		
		<div class="details__data">
			<h4 class="details__subheading">Submission</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Submitted By:</td>
					<td>${record.submittal_person}</td>
				</tr>
				<tr>
					<td class="details__field-name">Company:</td>
					<td>${record.submittal_company}</td>
				</tr>
				<tr>
					<td class="details__field-name">Date:</td>
					<td>${submittalDate}</td>
				</tr>
			</table>

			<h4 class="details__subheading">Assignee</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Assigned To:</td>
					<td>${record.responsible_person}</td>
				</tr>
				<tr>
					<td class="details__field-name">Company:</td>
					<td>${record.responsible_company}</td>
				</tr>
			</table>

			<h4 class="details__subheading">Details</h4>
			<table class="details__table">
				<tr>
					<td class="details__field-name">Type:</td>
					<td>${record.type} </td>
				</tr>
				<tr>
					<td class="details__field-name">Cost:</td>
					<td>${record.cost} </td>
				</tr>
				<tr>
					<td class="details__field-name">Status:</td>
					<td>${record.status} </td>
				</tr>
			</table>

			<h4 class="details__subheading">Attachment</h4>
			${record.file_name
				? `<a class="details__file-name" href="/project/change_order/document/${record.id}" target="_blank">${record.file_name}</a>`
				: '<span class="details__file-name">Record contains no attachment.</span>'}

			<h4 class="details__subheading">Description</h4>
    		<p class="details__description">${record.description}</p>
		</div>
		
	`);
}
