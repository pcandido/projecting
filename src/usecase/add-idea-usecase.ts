import { Idea } from 'src/entity/idea'

export interface AddIdeaRequest{
  title: string
  repository: string
  description: string
}

export class AddIdeaUseCase {

  addIdea(addIdeaRequest: AddIdeaRequest): Idea {
    throw new Error('nem sei o que tem que fazer')
  }

}
