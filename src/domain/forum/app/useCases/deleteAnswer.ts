import { AnswersRepository } from '../repository/answersRepository'

export interface DeleteAnswerUseCaseRequest {
  authorId: string
  questionId: string
}

export interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const question = await this.answerRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('not allowed')
    }

    await this.answerRepository.delete(question)

    return {}
  }
}
