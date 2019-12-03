const readline = require('readline')
const { getOwnedPackages } = require('.')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Enter a read-only NPM token: ', async (token) => {
  let packages = []
  try {
    packages = await getOwnedPackages(token)
  } catch (e) {
    console.error('Failed to get owned packages:', e)
    rl.close()
    return
  }

  console.log('These are the packages the owner of that token has write-access to:')
  console.log(packages)

  rl.close()
})

