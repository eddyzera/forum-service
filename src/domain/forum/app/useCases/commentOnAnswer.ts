import { Either, left, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { AnswerComment } from '../../enterprise/entities/answerComment'
import { AnswerCommentRepository } from '../repository/answerCommentRepository'
import { AnswersRepository } from '../repository/answersRepository'
import { NotAllowedError } from './errors/notAllowedError'

export interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

export type CommentOnAnswerUseCaseResponse = Either<
  NotAllowedError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new NotAllowedError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
