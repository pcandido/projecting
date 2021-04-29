import { GitHubValidator } from './github-validator'
import { RepositoryValidator } from './repository-validator'

export class RepositoryValidatorFactory {

  make(url: string): RepositoryValidator {
    if (url.includes('github'))
      return new GitHubValidator(url)

    throw new Error('Unknown repository')
  }

}
