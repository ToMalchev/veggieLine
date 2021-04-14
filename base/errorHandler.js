const baseCR = (err, data, type, operation) => {
	if (err) {
		return {status: 500, data: {message: err.message || "Some error occurred while " + operation + type+ "."}}
	};
	return {status: 200, data: data}
};

const baseRUD = (err, data, type, operation) => {
	if (err) {
		status = 404 ? err.kind==='not_found' : 500;
		message = err.message || "Not found " ? err.kind==='not_found' :  "Could not ";
		return {status: status, data: {message: message + operation + type + "."}}
	}
	return {status: 200, data: data}
};

module.exports = [baseCR, baseRUD]