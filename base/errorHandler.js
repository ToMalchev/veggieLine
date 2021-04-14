const baseCR = (err, data, type, operation) => {
	if (err) {
		return {status: 500, data: {message: err.message || `Some error occurred while ${operation} ${type}.`}; 
	} else {
		return {status: 200, data: data};
	};

const baseRUD = (err, data, type, operation) => {
	if (err) {
		return {status: 404, data: {message: err.message || `Not found ${type}.`} ? err.kind==='not_found' : {status: 500, data: {message: err.message || `Could not ${operation} ${type}.`}};
	} else {
		return {status: 200, data: data};
	};
};

module.exports = [baseCR, baseRUD]