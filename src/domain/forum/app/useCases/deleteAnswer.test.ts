import { expect, it, describe, beforeEach } from 'vitest'
import { DeleteAnswerUseCase } from './deleteAnswer'
import { InMemoryAnswerRepository } from '../../../../../test/repository/inMemoryAnswerRepository'

import { makeAnswer } from '../../../../../test/factories/makeAnswer'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('DeleteAnswer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a question', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )
    inMemoryAnswerRepository.create(newAnswer)
    await sut.execute({
      questionId: 'question-01',
      authorId: 'author-01',
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )
    inMemoryAnswerRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        questionId: 'question-01',
        authorId: 'author-02 ',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
