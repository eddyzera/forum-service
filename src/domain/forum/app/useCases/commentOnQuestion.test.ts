import { expect, it, describe, beforeEach } from 'vitest'
import { CommentOnQuestionUseCase } from './commentOnQuestion'
import { InMemoryQuestionCommentRepository } from '../../../../../test/repository/inMemoryQuestionCommentsRepository'
import { InMemoryQuestionRepository } from '../../../../../test/repository/inMemoryQuestionRepository'
import { makeQuestion } from '../../../../../test/factories/makeQuestion'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('CommentOnQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario test',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'Comentario test',
    )
  })
})
