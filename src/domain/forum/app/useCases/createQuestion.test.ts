import { expect, it, describe, beforeEach } from 'vitest'
import { CreateQuestionUseCase } from './createQuestion'
import { InMemoryQuestionRepository } from '../../../../../test/repository/inMemoryQuestionRepository'

// sut -> system under test
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('CreateQuestionAnswer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      content: 'New question',
      title: 'Content question',
    })

    expect(question.id).toBeTruthy()
  })
})
