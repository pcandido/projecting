import { RepositoryValidator } from './repository-validator'

export class GitHubValidator implements RepositoryValidator {

  constructor(private url: string) { }

  validate(): boolean {
    return !!this.url.match(/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/g)
  }

}
