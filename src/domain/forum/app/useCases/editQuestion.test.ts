import { expect, it, describe, beforeEach } from 'vitest'
import { EditQuestionUseCase } from './editQuestion'
import { InMemoryQuestionRepository } from '../../../../../test/repository/inMemoryQuestionRepository'

import { makeQuestion } from '../../../../../test/factories/makeQuestion'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { NotAllowedError } from './errors/notAllowedError'

// sut -> system under test
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('EditQuestion', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )
    inMemoryQuestionRepository.create(newQuestion)
    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-01',
      title: 'pergunta test',
      content: 'content test',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'pergunta test',
      content: 'content test',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('question-01'),
    )
    inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-02',
      title: 'pergunta test',
      content: 'content test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
