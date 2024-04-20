import { Either, left, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { QuestionComment } from '../../enterprise/entities/questionComment'
import { QuestionCommentRepository } from '../repository/questionCommentRepository'
import { QuestionRepository } from '../repository/questionRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

export interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

export type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
