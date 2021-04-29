import { GitHubValidator } from './github-validator'
import { RepositoryValidatorFactory } from './repository-validator-factory'

const makeSut = () => new RepositoryValidatorFactory()

describe('ValidatorFactory', () => {

  it('should make a Github validator if url constains "github"', () => {
    const sut = makeSut()
    const givenUrl = 'github'
    const result = sut.make(givenUrl)
    expect(result).toBeInstanceOf(GitHubValidator)
  })

  it('should throw an exception if url is unknown', () => {
    const sut = makeSut()
    const givenUrl = 'https://google.com'
    expect(() => sut.make(givenUrl)).toThrow()
  })

})
