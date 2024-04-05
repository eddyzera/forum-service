import { AnswerComment } from '../../enterprise/entities/answerComment'

export interface AnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
