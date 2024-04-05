import { expect, it, describe, beforeEach } from 'vitest'
import { FetchRecentQuestionsUseCase } from './fetchRecentQuestions'
import { InMemoryQuestionRepository } from '../../../../../test/repository/inMemoryQuestionRepository'

import { makeQuestion } from '../../../../../test/factories/makeQuestion'

// sut -> system under test
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase

describe('FetchRecentQuestion', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent question', async () => {
    inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )

    inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )

    inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent question', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(2)
  })
})
