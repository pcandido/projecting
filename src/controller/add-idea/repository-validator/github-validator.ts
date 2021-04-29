export class GitHubValidator {

  validate(url: string): boolean {
    return !!url.match(/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/g)
  }

}
