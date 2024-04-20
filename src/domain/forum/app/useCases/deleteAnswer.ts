/* eslint-disable @typescript-eslint/ban-types */
import { Either, left, right } from '../../../../core/either'
import { AnswersRepository } from '../repository/answersRepository'
import { NotAllowedError } from './errors/notAllowedError'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

export interface DeleteAnswerUseCaseRequest {
  authorId: string
  questionId: string
}

export type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const question = await this.answerRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerRepository.delete(question)

    return right({})
  }
}
