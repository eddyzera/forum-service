import { expect, it, describe, beforeEach } from 'vitest'
import { GetQuestionBySlugUseCase } from './getQuestionBySlug'
import { InMemoryQuestionRepository } from '../../../../../test/repository/inMemoryQuestionRepository'

import { makeQuestion } from '../../../../../test/factories/makeQuestion'

// sut -> system under test
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('GetQuestionBySlug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion()
    inMemoryQuestionRepository.create(newQuestion)
    const result = await sut.execute({
      slug: 'example-question',
    })

    if (result.isRight()) {
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
