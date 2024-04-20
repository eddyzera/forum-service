import { PaginationParams } from '../../../../core/repository/paginationParams'
import { QuestionComment } from '../../enterprise/entities/questionComment'

export interface QuestionCommentRepository {
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
