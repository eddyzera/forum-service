import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '../../src/core/entities/uniqueEntityId'
import {
  Answer,
  AnswerProps,
} from '../../src/domain/forum/enterprise/entities/answer'
export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
