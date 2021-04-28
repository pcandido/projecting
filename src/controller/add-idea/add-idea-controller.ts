import { AddIdeaUseCase } from 'src/usecase/add-idea-usecase'

export class AddIdeaController {

  constructor(
    private addIdeaUseCase: AddIdeaUseCase,
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

    this.addIdeaUseCase.addIdea(request)

    return { statusCode: 200 }
  }

}
