import * as yup from 'yup'

import { isDate, transformValueToDate } from './helper.schema'

export const createRecordSchema = yup.object().shape({
  companySigDate: yup
    .string()
    .required('Обязательное поле')
    .test(
      'is-date',
      'Укажите дату в формате: DD.MM.YYYY, HH:mm:ss',
      (_, context) => isDate(context.originalValue)
    )
    .transform((_, val) => transformValueToDate(val)),

  companySignatureName: yup.string().required('Обязательное поле'),
  documentName: yup.string().required('Обязательное поле'),
  documentStatus: yup.string().required('Обязательное поле'),
  documentType: yup.string().required('Обязательное поле'),
  employeeNumber: yup.string().required('Обязательное поле'),

  employeeSigDate: yup
    .string()
    .required('Обязательное поле')
    .test(
      'is-date',
      'Укажите дату в формате: DD.MM.YYYY, HH:mm:ss',
      (_, context) => isDate(context.originalValue)
    )
    .transform((_, val) => transformValueToDate(val)),

  employeeSignatureName: yup.string().required('Обязательное поле')
})
