import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '../../src/core/entities/uniqueEntityId'
import {
  Question,
  QuestionProps,
} from '../../src/domain/forum/enterprise/entities/question'
import { Slug } from '../../src/domain/forum/enterprise/entities/valueObject/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.createFromText('example-question'),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
