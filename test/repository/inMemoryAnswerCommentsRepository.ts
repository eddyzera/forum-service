import { AnswerCommentRepository } from '../../src/domain/forum/app/repository/answerCommentRepository'
import { AnswerComment } from '../../src/domain/forum/enterprise/entities/answerComment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
