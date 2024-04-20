/* eslint-disable @typescript-eslint/ban-types */
import { Either, left, right } from '../../../../core/either'
import { QuestionCommentRepository } from '../repository/questionCommentRepository'
import { NotAllowedError } from './errors/notAllowedError'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

export interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

export type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }
    await this.questionCommentsRepository.delete(questionComment)

    return right({})
  }
}
