import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repository/answersRepository'

export interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

export interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Question not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('not allowed')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
