import { GitHubValidator } from './github-validator'

const makeSut = (url: string) => new GitHubValidator(url)

describe('GitHubValidator', () => {

  it('should return false if url is empty', async () => {
    const givenUrl = ''
    const sut = makeSut(givenUrl)
    const result = sut.validate()
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
    const sut = makeSut(givenUrl)
    const result = sut.validate()
    expect(result).toBeFalsy()
  })

  it('should return true if url is valid', async () => {
    const givenValidUrl = 'https://github.com/pcandido/projecting'
    const sut = makeSut(givenValidUrl)
    const result = sut.validate()
    expect(result).toBeTruthy()
  })

})
