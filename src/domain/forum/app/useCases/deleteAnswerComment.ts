/* eslint-disable @typescript-eslint/ban-types */
import { Either, left, right } from '../../../../core/either'
import { AnswerCommentRepository } from '../repository/answerCommentRepository'
import { NotAllowedError } from './errors/notAllowedError'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

export interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

export type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }
    await this.answerCommentsRepository.delete(answerComment)

    return right('')
  }
}
