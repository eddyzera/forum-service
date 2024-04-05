import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { AnswerComment } from '../../enterprise/entities/answerComment'
import { AnswerCommentRepository } from '../repository/answerCommentRepository'
import { AnswersRepository } from '../repository/answersRepository'

export interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

export interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

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
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
