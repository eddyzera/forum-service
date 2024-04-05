import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryAnswerRepository } from '../../../../../test/repository/inMemoryAnswerRepository'
import { AnswerQuestionUseCase } from './answerQuestion'

// sut -> system under test
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('AnswerUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Answer Content',
    })

    expect(answer.id).toBeTruthy()
  })
})
