//Role
export const USER_ROLE_BUYER = "buyer"
export const USER_ROLE_MANAGER = "manager"
export const USER_ROLE_ADMIN = "admin"

export const USER_ROLES = [USER_ROLE_BUYER, USER_ROLE_MANAGER, USER_ROLE_ADMIN] //priority is ascending by order

//Permission
export const PERMISSION_BIT_MAP = USER_ROLES.reduce((accu, role, i) => {
  accu[role] = 1 << i

  return accu
}, {})

export const genPermission = (...roles) => {
  return roles.reduce((accu, role) => accu | PERMISSION_BIT_MAP[role], 0)
}

export const checkPermission = role => (permission = 0) =>
  PERMISSION_BIT_MAP[role] >= permission

//Emails
export const USER_EMAILS = [
  "jw512751@gmail.com",
  "elect5558@gmail.com",
  "protonh55@gmail.com",
  "bwolfman5555@gmail.com",
  "theman61321@gmail.com",
  "cc5342404@gmail.com",
  "msummer145@gmail.com",
  "solp83676@gmail.com",
  "arissal759@gmail.com",
  "buildingman445@gmail.com",
  "swishman2423@gmail.com",
  "jackmansam454@gmail.com",
  "hanmanman45@gmail.com",
  "paperclipman45@gmail.com",
  "solidghost911@gmail.com",
  "fireice9111@gmail.com",
  "murkywater75@gmail.com",
  "oceanwater991@gmail.com",
  "dpat98217@gmail.com",
  "notreally787@gmail.com",
  "sunshot45@gmail.com",
  "plantman1865@gmail.com",
  "hman7845@gmail.com",
  "pfloyd7894@gmail.com",
  "bjim07453@gmail.com",
  "bwiseman404@gmail.com",
  "coolwater758@gmail.com",
  "kevinhaddad456@gmail.com"
]
