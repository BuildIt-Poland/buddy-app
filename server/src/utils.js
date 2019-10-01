const jwt = require('jsonwebtoken')
const APP_SECRET = 'BUDDY-APP-GraphQL-1s-aw3some'

const STATUS = {
  COMPLETED: 'COMPLETED',
  UNCOMPLETED: 'UNCOMPLETED',
};

function auth(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

async function isBuddyAuth(context) {
  const userId = auth(context);
  const isBuddy = await context.prisma.$exists.buddy({ id: userId });

  if (!isBuddy) {
    throw new Error(`Access denied`);
  }
  return isBuddy
}

module.exports = {
  APP_SECRET,
  STATUS,
  auth,
  isBuddyAuth,
}
