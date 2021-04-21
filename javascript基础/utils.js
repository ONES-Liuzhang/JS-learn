const isComplexObject = (obj) =>
	(typeof obj === "function" || typeof obj === "object") && obj !== null;

module.exports = {
	isComplexObject,
};
