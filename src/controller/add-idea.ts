export class AddIdeaController {

  handle(request: any): any {

    const requiredParams = ['repository', 'title', 'description']
    const missingParams = requiredParams.filter(a => !request[a])

    if (missingParams.length) {
      return {
        statusCode: 400,
        body: `Missing param: ${missingParams.join(', ')}`,
      }
    }

    return { statusCode: 200 }
  }

}
