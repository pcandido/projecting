import { GitHubValidator } from './github-validator'

const makeSut = () => new GitHubValidator()

describe('GitHubValidator', () => {

  it('should return false if url is empty', async () => {
    const sut = makeSut()
    const givenUrl = ''
    const result = sut.validate(givenUrl)
    expect(result).toBeFalsy()
  })

  it.each([
    'invalid_url',
    'http://invalid_url',
    'https://invalid_url',
    'https://github',
    'https://github.com',
    'https://github.com/pcandido',
  ])('should return false for "%s" since it does not match an GitHub url', async givenUrl => {
    const sut = makeSut()
    const result = sut.validate(givenUrl)
    expect(result).toBeFalsy()
  })

  it('should return true if url is valid', async () => {
    const sut = makeSut()
    const givenValidUrl = 'https://github.com/pcandido/projecting'
    const result = sut.validate(givenValidUrl)
    expect(result).toBeTruthy()
  })

})
