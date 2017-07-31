import Mock from 'mockjs'

export default Mock.mock({
  id: Mock.Random.guid(),
  name: Mock.Random.cname(),
  addr: Mock.mock('@county(true)'),
  'age|18-60': 1,
  birth: Mock.Random.date(),
  sex: Mock.Random.integer(0, 1)
})
