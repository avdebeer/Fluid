function closeModal() {
	$('#modal').toggleClass('modal-visible');
	setTimeout(() => $('#modal-form').empty(), 500);
}

$('#new-project-btn').on('click', (e) => {
	e.preventDefault();
	$('#modal').toggleClass('modal-visible');
	$('#modal-form').append(
		`<h3 class="form__title">Project</h3>
        <div class="form__group">
            <label for="project_id" class="form__label">ID</label>
            <input id="project_id" type="text" class="form__field">
        </div>
        <div class="form__group">
            <label for="project_name" class="form__label">Name</label>
            <input id="project_name" type="text" class="form__field">
        </div>
        <div class="form__group">
            <label for="project_budget" class="form__label">Construction Budget</label>
            <input id="project_budget" type="text" class="form__field">
        </div>
        <div class="form__group">
            <label for="project_description" class="form__label">Description</label>
            <textarea id="project_description" class="form__textarea" cols="30" rows="10"></textarea>
        </div>
        <button class="button btn-primary">Create</button>`
	);
});

async function createNewProject() {
	const cip_id = $('#project_id').val();
	const name = $('#project_name').val();
	const budget = $('#project_budget').val();
	const description = $('#project_description').val();

	const response = await axios.post('/project', {
		cip_id,
		name,
		budget,
		description
	});

	closeModal();
}

$('#modal-form').on('click', 'button', (e) => {
	e.preventDefault();
	createNewProject();
});
