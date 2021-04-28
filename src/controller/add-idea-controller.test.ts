import { AddIdeaController } from './add-idea-controller'
import { AddIdeaRequest, AddIdeaUseCase } from '../usecase/add-idea-usecase'

const makeAddIdeaUseCaseStub = () => {
  class AddIdeaUseCaseStub extends AddIdeaUseCase {
    addIdea(addIdeaRequest: AddIdeaRequest): any {
      return {}
    }
  }

  return new AddIdeaUseCaseStub()
}

const makeSut = () => {
  const addIdeaUseCaseStub = makeAddIdeaUseCaseStub()
  const sut = new AddIdeaController(addIdeaUseCaseStub)
  return { sut, addIdeaUseCaseStub }
}

describe('AddIdeaController', () => {

  it.each([
    ['repository', { title: 'title', description: 'description' }],
    ['title', { repository: 'link', description: 'description' }],
    ['description', { repository: 'link', title: 'title' }],
    ['repository, title', { description: 'description' }],
    ['repository, title, description', {}],
    ['title, description', { repository: 'link' }],
    ['repository, description', { title: 'title' }],
  ])('should return 400 if no %s is provided', (expectedMissingParams, givenBody) => {
    const { sut } = makeSut()
    const response = sut.handle(givenBody)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe(`Missing param: ${expectedMissingParams}`)
  })

  it('should return 200 if success', () => {
    const { sut } = makeSut()
    const response = sut.handle({ repository: 'link', title: 'idea', description: 'short text' })
    expect(response.statusCode).toBe(200)
  })

  it('should call AddIdeaUseCase with correct params', async () => {
    const givenBody = {
      repository: 'link',
      title: 'idea',
      description: 'short text',
    }

    const { sut, addIdeaUseCaseStub } = makeSut()
    const addIdeaSpy = jest.spyOn(addIdeaUseCaseStub, 'addIdea')

    sut.handle(givenBody)

    expect(addIdeaSpy).toBeCalledWith(givenBody)
  })
})
