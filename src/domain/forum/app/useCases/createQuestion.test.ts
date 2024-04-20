import { expect, it, describe, beforeEach } from 'vitest'
import { CreateQuestionUseCase } from './createQuestion'
import { InMemoryQuestionRepository } from '../../../../../test/repository/inMemoryQuestionRepository'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'

// sut -> system under test
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('CreateQuestionAnswer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'New question',
      title: 'Content question',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
