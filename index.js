const fetch = require('npm-registry-fetch')

const getUserEndpoint = () => '/-/npm/v1/user'
const getPackageEndpoint = (user) => `/-/user/${user}/package`

const defaultOpts = {
  // only prove ownership on main npm registry
  registry: 'https://registry.npmjs.org/'
}

// returns list of packages owned by owner of token
async function getOwnedPackages (token) {
  if (!token) throw new Error('token is required')
  const opts = Object.assign({}, defaultOpts, { token })
  const user = await fetch.json(getUserEndpoint(), opts)
  const { name } = user
  if (!name) throw new Error('failed to get user name from npm')
  const packages = await fetch.json(getPackageEndpoint(name))
  const output = []
  for (let package in packages) {
    if (packages[package] === 'write') output.push(package)
  }
  return output
}

module.exports = getOwnedPackages
