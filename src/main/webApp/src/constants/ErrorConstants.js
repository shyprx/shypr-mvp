const errors = {
  'REQUIRED': 'errorMessage.isRequired',
  'MOI': 'errorMessage.moiNotValid',
  'NIN': 'errorMessage.ninNotValid',
  'IQAMA': 'errorMessage.iqamaNotValid',
  'MOBILE': 'errorMessage.mobileNotValid',
  'PHONE_NUMBER': 'errorMessage.phoneNumberNotValid',
  'FAX_NUMBER': 'errorMessage.faxNotValid',
  'EMAIL_FORMAT': 'errorMessage.emailNotValid',
  'DATE_FORMAT': 'errorMessage.dateNotValid',
  'HIJRI_DATE_FORMAT':'errorMessage.HdateNotValid',
  'ARABIC_LETTERS': 'errorMessage.arabicLetters',
  'ENGLISH_LETTERS': 'errorMessage.englishLetters',
  'FIXED_LENGTH': 'errorMessage.fixedLength',
  'NUMERIC': 'errorMessage.numeric',
  'REQUIRED_OTP':'errorMessage.requiredOTP',
  'NIN_IQAMA_ERROR':'errorMessage.NinAndIqama',
  'FIXED_LENGTH_10_NUMBER':'errorMessage.TenFixedLength',
  'NIN_OR_IQAMA':'errorMessage.NinorIqama',
  'REQUIRED_OWNERS':'errorMessage.isRequiredOwners',
  'WASEL_REQUIRED':'errorMessage.RequiredWasel',
  'GOOGLE_MAP_REQUIRED':'errorMessage.RequiredGMaps',
  'BRANCH_REQUIRED':'errorMessage.RequiredBranch',
  'TERMS_REQUIRED': 'errorMessage.RequiredTermsAndCon',
}

export const THROW_ERROR = 'THROW_ERROR'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export default errors
