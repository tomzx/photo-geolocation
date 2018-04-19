let map = L.map('map').setView([45.50, -73.56], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let gpsToNumber = function(coordinate, direction) {
	let value = coordinate[0] + coordinate[1]/60 + coordinate[2]/3600;
	let sign = (direction === 'N' || direction === 'E') ? 1 : -1;
	return sign * value;
};

let processFile = function(file) {
	EXIF.getData(file, function() {
		let helpDiv = document.querySelector('.help');
		helpDiv.style.display = 'none';

		let exifData = this.exifdata;
		let date = moment(exifData.DateTime, 'YYYY:MM:DD HH:mm:ss');

		if (!exifData.GPSLatitude || !exifData.GPSLongitude) {
			console.error('Missing GPS data from file ' + this.name);
			return;
		}

		let img = document.createElement('img');
		img.src = URL.createObjectURL(file);
		img.style.width = 500;

		let position = [
			gpsToNumber(exifData.GPSLatitude, exifData.GPSLatitudeRef),
			gpsToNumber(exifData.GPSLongitude, exifData.GPSLongitudeRef),
		];
		let popup = L.popup({
			maxWidth: 500,
		}).setContent(img);
		L.marker(position).addTo(map).bindPopup(popup);
	});
};