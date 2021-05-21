// ********** GENERAL FUNCTIONS **********
function hideSections() {
	$('#general').addClass('is-hidden');
	$('#rfi').addClass('is-hidden');
	$('#inspection').addClass('is-hidden');
}

function projectMenu() {
	$('#menu-item-1').removeClass('is-active');
	$('#menu-item-2').removeClass('is-active');
	$('#menu-item-3').removeClass('is-active');
	$('#menu-item-4').removeClass('is-active');
	$('#menu-item-5').removeClass('is-active');
}

function closeModal() {
	$('#modal').toggleClass('modal-visible');
	setTimeout(() => $('#modal-form').empty(), 500);
}

// ********** FINAL FUNCTIONS **********
function newRecordForm() {
	if (section === 'inspection') {
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
				<label for="date" class="form__label">Date</label>
				<input id="date" type="date" class="form__field" autocomplete="off" value="">
			</div>

			<div class="form__group">
				<label for="description" class="form__label">Description</label>
				<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
			</div>

			<div class="modal__buttons">
				<button class="button btn-primary" data-btn="close">Cancel</button>
				<button class="button btn-secondary" data-btn="submit">Submit</button>
			</div>
			`
		);
	}
	else {
		$('#modal-form').append(
			`<h3 class="form__title">${sectionTitle}</h3>

			<div class="form__group">
				<label for="number" class="form__label">Item #</label>
				<input id="number" type="text" class="form__field" autocomplete="off" value="">
			</div>

			<div class="form__group">
				<label for="title" class="form__label">Title</label>
				<input id="title" type="text" class="form__field" autocomplete="off" value="">
			</div>

			<div class="form__group">
				<label for="author" class="form__label">Author</label>
				<input id="author" type="text" class="form__field" autocomplete="off" value="">
			</div>

			<div class="form__group">
				<label for="company" class="form__label">Company</label>
				<input id="company" type="text" class="form__field" autocomplete="off" value="">
			</div>

			<div class="form__group">
				<label for="description" class="form__label">Description</label>
				<textarea id="description" class="form__textarea" cols="30" rows="10"></textarea>
			</div>

			<div class="form__group">
				<label for="date" class="form__label">Due Date</label>
				<input id="date" type="date" class="form__field" autocomplete="off" value="">
			</div>

			<div class="form__group">
				<label for="status" class="form__label">Status</label>
				<input id="status" type="text" class="form__field" autocomplete="off" value="">
			</div>

			<div class="modal__buttons">
				<button class="button btn-primary" data-btn="close">Cancel</button>
				<button class="button btn-secondary" data-btn="submit">Submit</button>
			</div>`
		);
	}
}

function editRecordForm(id) {
	let title = $(`#${section}-title-${id}`).text();
	let date = $(`#${section}-date-${id}`).text();
	let description = $(`#${section}-description-${id}`).text();

	if (section === 'inspection') {
		let inspector = $(`#${section}-inspector-${id}`).text();

		$('#modal-form').append(
			`<h3 class="form__title">${sectionTitle}</h3>
			<input id="id" type="hidden" value="${id}">

			<div class="form__group">
				<label for="title" class="form__label">Title</label>
				<input id="title" type="text" class="form__field" autocomplete="off" value="${title}">
			</div>
			
			<div class="form__group">
				<label for="inspector" class="form__label">Inspector</label>
				<input id="inspector" type="text" class="form__field" autocomplete="off" value="${inspector}">
			</div>

			<div class="form__group">
				<label for="date" class="form__label">Date</label>
				<input id="date" type="date" class="form__field" autocomplete="off" value="${date}">
			</div>

			<div class="form__group">
				<label for="description" class="form__label">Description</label>
				<textarea id="description" class="form__textarea" cols="30" rows="10">${description}</textarea>
			</div>

			<div class="modal__buttons">
				<button class="button btn-primary" data-btn="close">Cancel</button>
				<button class="button btn-secondary" data-btn="update">Update</button>
			</div>
			`
		);
	}
	else {
		let number = $(`#${section}-number-${id}`).text();
		let author = $(`#${section}-author-${id}`).text();
		let company = $(`#${section}-company-${id}`).text();
		let status = $(`#${section}-status-${id}`).text();

		$('#modal-form').append(
			`<h3 class="form__title">${sectionTitle}</h3>
			<input id="id" type="hidden" value="${id}">

			<div class="form__group">
				<label for="number" class="form__label">Item #</label>
				<input id="number" type="text" class="form__field" autocomplete="off" value="${number}">
			</div>

			<div class="form__group">
				<label for="title" class="form__label">Title</label>
				<input id="title" type="text" class="form__field" autocomplete="off" value="${title}">
			</div>

			<div class="form__group">
				<label for="author" class="form__label">Author</label>
				<input id="author" type="text" class="form__field" autocomplete="off" value="${author}">
			</div>

			<div class="form__group">
				<label for="company" class="form__label">Company</label>
				<input id="company" type="text" class="form__field" autocomplete="off" value="${company}">
			</div>

			<div class="form__group">
				<label for="description" class="form__label">Description</label>
				<textarea id="description" class="form__textarea" cols="30" rows="10">${description}</textarea>
			</div>

			<div class="form__group">
				<label for="date" class="form__label">Due Date</label>
				<input id="date" type="date" class="form__field" autocomplete="off" value="${date}">
			</div>

			<div class="form__group">
				<label for="status" class="form__label">Status</label>
				<input id="status" type="text" class="form__field" autocomplete="off" value="${status}">
			</div>

			<div class="modal__buttons">
				<button class="button btn-primary" data-btn="close">Cancel</button>
				<button class="button btn-secondary" data-btn="update">Update</button>
			</div>`
		);
	}
}

async function createRecord() {
	let title = $('#title').val();
	let date = $('#date').val();
	let description = $('#description').val();
	let projectID = $('#project-id').text();

	if (section === 'inspection') {
		let inspector = $('#inspector').val();

		let response = await axios.post(`/project/${section}`, {
			title,
			inspector,
			date,
			description,
			projectID
		});
	}
	else {
		let number = $('#number').val();
		let author = $('#author').val();
		let company = $('#company').val();
		let status = $('#status').val();

		let response = await axios.post(`/project/${section}`, {
			title,
			date,
			description,
			projectID,
			number,
			author,
			company,
			status
		});
	}

	let resp = response.data;

	$(`#${section}-data`).append();

	$('#modal-data').empty();
}

async function updateRecord() {
	let id = $('#id').val();
	let title = $('#title').val();
	let date = $('#date').val();
	let description = $('#description').val();

	if (section === 'inspection') {
		let inspector = $('#inspector').val();

		let response = await axios.patch(`/project/${section}`, {
			id,
			title,
			date,
			description,
			inspector
		});

		$(`#${section}-title-${id}`).text(`${title}`);
		$(`#${section}-date-${id}`).text(`${date}`);
		$(`#${section}-description-${id}`).text(`${description}`);
		$(`#${section}-inspector-${id}`).text(`${inspector}`);
	}
	else {
		let number = $('#number').val();
		let author = $('#author').val();
		let company = $('#company').val();
		let status = $('#status').val();

		let response = await axios.patch(`/project/${section}`, {
			id,
			title,
			date,
			description,
			number,
			author,
			company,
			status
		});

		$(`#${section}-title-${id}`).text(`${title}`);
		$(`#${section}-date-${id}`).text(`${date}`);
		$(`#${section}-description-${id}`).text(`${description}`);
		$(`#${section}-number-${id}`).text(`${number}`);
		$(`#${section}-author-${id}`).text(`${author}`);
		$(`#${section}-company-${id}`).text(`${company}`);
		$(`#${section}-status-${id}`).text(`${status}`);
	}

	$('#modal-data').empty();
}

async function deleteRecord(id) {
	let response = await axios.delete(`/project/${section}/${id}`);
	$(`#${section}-${id}`).remove();
}
