import {
  USER_ROLE_ADMIN,
  USER_ROLE_BUYER,
  USER_ROLE_MANAGER,
  genPermission,
  checkPermission,
  PERMISSION_BIT_MAP
} from "../users"

describe("User", () => {
  it("generate only admin permission", () => {
    const permission = genPermission(USER_ROLE_ADMIN) //component
    expect(permission).toEqual(PERMISSION_BIT_MAP[USER_ROLE_ADMIN])

    //user role
    expect(checkPermission(USER_ROLE_ADMIN)(permission)).toBeTruthy()
    expect(checkPermission(USER_ROLE_MANAGER)(permission)).toBeFalsy()
    expect(checkPermission(USER_ROLE_BUYER)(permission)).toBeFalsy()
  })

  it("generate only manager permission", () => {
    const permission = genPermission(USER_ROLE_MANAGER)

    expect(permission).toEqual(PERMISSION_BIT_MAP[USER_ROLE_MANAGER])
    expect(checkPermission(USER_ROLE_ADMIN)(permission)).toBeTruthy()
    expect(checkPermission(USER_ROLE_MANAGER)(permission)).toBeTruthy()
    expect(checkPermission(USER_ROLE_BUYER)(permission)).toBeFalsy()
  })

  it("generate only buyer permission", () => {
    const permission = genPermission(USER_ROLE_BUYER)

    expect(permission).toEqual(PERMISSION_BIT_MAP[USER_ROLE_BUYER])
    expect(checkPermission(USER_ROLE_ADMIN)(permission)).toBeTruthy()
    expect(checkPermission(USER_ROLE_MANAGER)(permission)).toBeTruthy()
    expect(checkPermission(USER_ROLE_BUYER)(permission)).toBeTruthy()
  })
})
