import { expect, it, describe, beforeEach } from 'vitest'
import { CommentOnAnswerUseCase } from './commentOnAnswer'
import { InMemoryAnswerCommentRepository } from '../../../../../test/repository/inMemoryAnswerCommentsRepository'
import { InMemoryAnswerRepository } from '../../../../../test/repository/inMemoryAnswerRepository'
import { makeAnswer } from '../../../../../test/factories/makeAnswer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('CommentOnAnswerUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentario test',
    })

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Comentario test',
    )
  })
})
