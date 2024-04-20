import { Either, right } from '../../../../core/either'
import { QuestionComment } from '../../enterprise/entities/questionComment'
import { QuestionCommentRepository } from '../repository/questionCommentRepository'

export interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

export type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
