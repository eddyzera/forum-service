import { expect, it, describe, beforeEach } from 'vitest'
import { EditAnswerUseCase } from './editAnswer'
import { InMemoryAnswerRepository } from '../../../../../test/repository/inMemoryAnswerRepository'

import { makeAnswer } from '../../../../../test/factories/makeAnswer'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { NotAllowedError } from './errors/notAllowedError'

// sut -> system under test
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('EditAnswer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a question', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )
    inMemoryAnswerRepository.create(newAnswer)
    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-01',
      content: 'content test',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'content test',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )
    inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-02',
      content: 'content test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
