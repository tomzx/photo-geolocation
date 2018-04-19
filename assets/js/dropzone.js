(function() {
	var dropzoneContainer = document.querySelector('body');
	var dropzone = document.querySelector('.dropzone');

	let addEventListeners = function(element, events, callback) {
		events.split(' ').map(event => element.addEventListener(event, callback));
	};

	addEventListeners(dropzoneContainer, 'drag dragstart dragend dragover dragenter dragleave drop', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});

	addEventListeners(dropzoneContainer, 'dragover dragenter', function() {
		dropzoneContainer.classList.add('is-dragover');
	});

	addEventListeners(dropzone, 'dragleave dragend drop', function(e) {
		dropzoneContainer.classList.remove('is-dragover');
	});

	addEventListeners(dropzone, 'drop', function(event) {
		var files = event.dataTransfer.files;
		for (var i = 0; i < files.length; ++i) {
			var file = files.item(i);
			processFile(file);
		}
	});
})();