import { expect, it, describe, beforeEach } from 'vitest'
import { FetchQuestionAnswersUseCase } from './fetchQuestionAnswers'
import { InMemoryAnswerRepository } from '../../../../../test/repository/inMemoryAnswerRepository'

import { makeAnswer } from '../../../../../test/factories/makeAnswer'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'

// sut -> system under test
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersUseCase

describe('FetchQuestionAnswer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch question answers', async () => {
    inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const { answers } = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryAnswerRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const { answers } = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(answers).toHaveLength(2)
  })
})
