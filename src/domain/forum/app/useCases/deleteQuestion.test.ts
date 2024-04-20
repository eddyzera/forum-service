import { expect, it, describe, beforeEach } from 'vitest'
import { DeleteQuestionUseCase } from './deleteQuestion'
import { InMemoryQuestionRepository } from '../../../../../test/repository/inMemoryQuestionRepository'

import { makeQuestion } from '../../../../../test/factories/makeQuestion'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { NotAllowedError } from './errors/notAllowedError'

// sut -> system under test
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('DeleteQuestion', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )
    inMemoryQuestionRepository.create(newQuestion)
    await sut.execute({
      questionId: 'question-01',
      authorId: 'author-01',
    })

    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )
    inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-01',
      authorId: 'author-02 ',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
