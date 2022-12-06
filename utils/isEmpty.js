const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);


exports.isBoolean = value => (
    (typeof value === 'boolean' && (value === true || value === false)) ||
    (typeof value === 'string' && (value === 'true' || value === 'false'))
)

module.exports = isEmpty