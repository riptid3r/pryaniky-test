import moment from 'moment'

export const isDate = (value = '') => {
  return value ? moment(value, 'DD.MM.YYYY, HH:mm:ss', true).isValid() : true
}

export const transformValueToDate = (value = '') => {
  const d = moment(value, 'DD.MM.YYYY, HH:mm:ss', true)
  return d.isValid() ? d.format() : value
}
