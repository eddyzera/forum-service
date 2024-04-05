import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '../../src/core/entities/uniqueEntityId'
import {
  AnswerComment,
  AnswerCommentProps,
} from '../../src/domain/forum/enterprise/entities/answerComment'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      answerId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}
