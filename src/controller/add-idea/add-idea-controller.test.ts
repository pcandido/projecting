import { AddIdeaController } from './add-idea-controller'
import { AddIdeaRequest, AddIdeaUseCase } from '../../usecase/add-idea-usecase'
import { RepositoryValidatorFactory } from './repository-validator/repository-validator-factory'
import { RepositoryValidator } from './repository-validator/repository-validator'

const makeAddIdeaUseCaseStub = () => {
  class AddIdeaUseCaseStub extends AddIdeaUseCase {
    addIdea(addIdeaRequest: AddIdeaRequest): any {
      return {}
    }
  }

  return new AddIdeaUseCaseStub()
}

const makeRepositoryValidatorStub = () => {
  class RepositoryValidatorFactoryStub extends RepositoryValidatorFactory {
    validate(): boolean {
      return true
    }
  }

  return new RepositoryValidatorFactoryStub()
}

const makeRepositoryValidatorFactoryStub = (repositoryValidator: RepositoryValidator) => {
  class RepositoryValidatorFactoryStub extends RepositoryValidatorFactory {
    make(): RepositoryValidator {
      return repositoryValidator
    }
  }

  return new RepositoryValidatorFactoryStub()
}

const makeSut = () => {
  const addIdeaUseCaseStub = makeAddIdeaUseCaseStub()
  const repositoryValidatorStub = makeRepositoryValidatorStub()
  const repositoryValidatorFactoryStub = makeRepositoryValidatorFactoryStub(repositoryValidatorStub)
  const sut = new AddIdeaController(addIdeaUseCaseStub, repositoryValidatorFactoryStub)
  return { sut, addIdeaUseCaseStub, repositoryValidatorStub, repositoryValidatorFactoryStub }
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

  it('should call RepositoryValidatorFactory with correct params', async () => {
    const { sut, repositoryValidatorFactoryStub } = makeSut()
    const makeSpy = jest.spyOn(repositoryValidatorFactoryStub, 'make')
    sut.handle({ repository: 'link', title: 'idea', description: 'short text' })
    expect(makeSpy).toBeCalledWith('link')
  })

  it('should call RepositoryValidator.validate', async () => {
    const { sut, repositoryValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(repositoryValidatorStub, 'validate')
    sut.handle({ repository: 'link', title: 'idea', description: 'short text' })
    expect(validateSpy).toBeCalled()
  })

  it('should return 400 if RepositoryValidator returns false', async () => {
    const { sut, repositoryValidatorStub } = makeSut()
    jest.spyOn(repositoryValidatorStub, 'validate').mockReturnValueOnce(false)
    const response = sut.handle({ repository: 'link', title: 'idea', description: 'short text' })
    expect(response.statusCode).toBe(400)
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

  it('should return 200 if success', () => {
    const { sut } = makeSut()
    const response = sut.handle({ repository: 'link', title: 'idea', description: 'short text' })
    expect(response.statusCode).toBe(200)
  })
})
