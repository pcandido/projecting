import { AddIdeaUseCase } from 'src/usecase/add-idea-usecase'
import { RepositoryValidatorFactory } from './repository-validator/repository-validator-factory'

export class AddIdeaController {

  constructor(
    private addIdeaUseCase: AddIdeaUseCase,
    private repositoryValidatorFactory: RepositoryValidatorFactory,
  ) { }

  handle(request: any): any {

    const requiredParams = ['repository', 'title', 'description']
    const missingParams = requiredParams.filter(a => !request[a])

    if (missingParams.length) {
      return {
        statusCode: 400,
        body: `Missing param: ${missingParams.join(', ')}`,
      }
    }

    const repositoryValidator = this.repositoryValidatorFactory.make(request.repository)
    repositoryValidator.validate()

    this.addIdeaUseCase.addIdea(request)

    return { statusCode: 200 }
  }

}
