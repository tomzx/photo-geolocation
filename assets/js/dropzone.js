$(document).ready(function() {
	var dropzoneContainer = $('body');
	var dropzone = $('.dropzone');

	dropzoneContainer.on('drag dragstart dragend dragover dragenter dragleave drop', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});

	dropzoneContainer.on('dragover dragenter', function() {
		dropzoneContainer.addClass('is-dragover');
	});

	dropzone.on('dragleave dragend drop', function(e) {
		dropzoneContainer.removeClass('is-dragover');
	});

	dropzone.on('drop', function(event) {
		var files = event.originalEvent.dataTransfer.files;
		for (var i = 0; i < files.length; ++i) {
			var file = files.item(i);
			processFile(file);
		}
	});
});