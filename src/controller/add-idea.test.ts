import { AddIdeaController } from './add-idea'

describe('AddIdeaController', () => {

  it.each([
    ['repository', { title: 'title', description: 'description' }],
    ['title', { repository: 'link', description: 'description' }],
    ['description', { repository: 'link', title: 'title' }],
    ['repository, title', { description: 'description' }],
    ['repository, title, description', {}],
  ])('should return 400 if no %s is provided', (expectedMissingParams, givenBody) => {
    const response = sut().handle(givenBody)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe(`Missing param: ${expectedMissingParams}`)
  })

  it('should return 200 if success', () => {
    const response = sut().handle({ repository: 'link', title: 'idea', description: 'short text' })
    expect(response.statusCode).toBe(200)
  })

  const sut = () => {
    return new AddIdeaController()
  }
})
