document.addEventListener('keypress', (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});

function closeModal() {
	$('#modal').toggleClass('modal-visible');
	setTimeout(() => $('#modal-form').empty(), 500);
}

// Exits the modal and removes loaded form
$('#modal').on('click', 'button[data-action="close"]', function(e) {
	e.preventDefault();
	closeModal();
});

function newProjectForm() {
	$('#modal-form').append(`
		<h3 class="form__title">Project</h3>
		<div class="form__main-content">
			<div class="form__group">
				<label for="project-name" class="form__label">Project Name <span class="form__required">*</span></label>
				<input id="project-name" type="text" class="form__field" required>
			</div>

			<div class="form__group">
				<label for="project-id" class="form__label">ID <span class="form__required">*</span></label>
				<input id="project-id" type="text" class="form__field" required>
			</div>

			<div class="form__group">
					<label for="project-street" class="form__label">Street</label>
					<input id="project-street" type="text" class="form__field">
			</div>

			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="project-city" class="form__label">City <span class="form__required">*</span></label>
					<input id="project-city" type="text" class="form__field" required>
				</div>

				<div class="form__group form__item">
					<label for="project-zip-code" class="form__label">Zip Code <span class="form__required">*</span></label>
					<input id="project-zip-code" type="number" class="form__field" required>
				</div>
			</div>

			<div class="form__group">
				<label for="project-description" class="form__label">Description</label>
				<textarea id="project-description" class="form__textarea" cols="30" rows="10"></textarea>
			</div>
		</div>
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="submit">Create</button>
		</div>
	`);
}

async function editProjectForm(id) {
	const response = await axios.get(`/project/edit/${id}`);
	const project = response.data;
	$('#modal-form').append(`
		<h3 class="form__title">Project</h3>
		<input id="id" type="hidden" value="${project.id}">
		<div class="form__main-content">
			<div class="form__group">
				<label for="project-name" class="form__label">Project Name <span class="form__required">*</span></label>
				<input id="project-name" type="text" class="form__field" value="${project.name}" required>
			</div>

			<div class="form__group">
				<label for="project-id" class="form__label">ID <span class="form__required">*</span></label>
				<input id="project-id" type="text" class="form__field" value="${project.cip_id}" required>
			</div>


			<div class="form__group">
					<label for="project-street" class="form__label">Street</label>
					<input id="project-street" type="text" class="form__field" value="${project.street}">
			</div>

			<div class="form__row">
				<div class="form__group form__item--75">
					<label for="project-city" class="form__label">City <span class="form__required">*</span></label>
					<input id="project-city" type="text" class="form__field" value="${project.city}" required>
				</div>

				<div class="form__group form__item">
					<label for="project-zip-code" class="form__label">Zip Code< <span class="form__required">*</span></label>
					<input id="project-zip-code" type="number" class="form__field" value="${project.zip_code}" required>
				</div>
			</div>

			<div class="form__group">
				<label for="project-description" class="form__label">Description</label>
				<textarea id="project-description" class="form__textarea" cols="30" rows="10">${project.description}</textarea>
			</div>
		</div>
		<div class="modal__buttons">
			<button class="button btn-primary-clear" data-action="close">Cancel</button>
			<button class="button btn-primary-clear" data-action="update">Update</button>
		</div>
	`);
}

async function createProject() {
	const name = $('#project-name').val();
	const cip_id = $('#project-id').val();
	const street = $('#project-street').val();
	const city = $('#project-city').val();
	const zip_code = $('#project-zip-code').val();
	const description = $('#project-description').val();

	const inputs = {
		name,
		cip_id,
		street,
		city,
		zip_code,
		description
	};
	console.log(inputs);

	const inputData = new FormData();

	for (key in inputs) {
		inputData.append(key, inputs[key]);
	}

	const response = await axios({
		method  : 'post',
		url     : '/project',
		data    : inputData,
		headers : { 'Content-Type': 'multipart/form-data' }
	});

	const project = response.data;

	$('#project-owner').append(`
		<div id="${project.id}" class="project-details">
			<a id="${project.id}-title" class="project-details__title" href="/project/${project.id}">${project.name}</a>
			<a data-action="delete" data-id="${project.id}">
				<svg class="icon icon-delete">
					<use xlink:href="/static/img/sprite.svg#icon-trash"></use>
				</svg>
			</a>
			<a data-action="edit" data-id="${project.id}">
				<svg class="icon icon-edit">
					<use xlink:href="/static/img/sprite.svg#icon-pencil"></use>
				</svg>
			</a>
		</div>
	`);
}

async function editProject() {
	const name = $('#project-name').val();
	const cip_id = $('#project-id').val();
	const street = $('#project-street').val();
	const city = $('#project-city').val();
	const zip_code = $('#project-zip-code').val();
	const description = $('#project-description').val();
	const id = $('#id').val();

	await axios.patch('/project', {
		name,
		cip_id,
		street,
		city,
		zip_code,
		description,
		id
	});

	$(`#${id}-title`).text(name);
}

async function deleteProject(id) {
	const response = await axios.delete(`/project/${id}`);
}

// EVENT HANDLER FOR NEW PROJECT FORM
$('#new-project-btn').on('click', (e) => {
	e.preventDefault();
	newProjectForm();
	$('#modal').toggleClass('modal-visible');
});

// EVENT HANDLER FOR EDITING PROJECT FORM
$('#projects-list').on('click', 'a[data-action="edit"]', (e) => {
	e.preventDefault();
	const id = e.target.closest('a').getAttribute('data-id');
	editProjectForm(id);
	$('#modal').toggleClass('modal-visible');
});

let myForm = document.querySelector('#modal-form');

// EVENT HANDLER FOR CREATING NEW PROJECT
$('#modal-form').on('click', 'button[data-action="submit"]', (e) => {
	e.preventDefault();

	if (myForm.checkValidity() === false) {
		return myForm.reportValidity();
	}

	createProject();
	closeModal();
});

// EVENT HANDLER FOR UPDATING A PROJECT
$('#modal-form').on('click', 'button[data-action="update"]', (e) => {
	e.preventDefault();

	if (myForm.checkValidity() === false) {
		return myForm.reportValidity();
	}
	editProject();
	closeModal();
});

// EVENT HANDLER FOR DELETING A PROJECT
$('#projects-list').on('click', 'a[data-action="delete"]', (e) => {
	e.preventDefault();
	const id = e.target.closest('a').getAttribute('data-id');
	deleteProject(id);
	$(`#${id}`).remove();
});
