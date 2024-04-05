import { AnswerComment } from '../../enterprise/entities/answerComment'

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
}
