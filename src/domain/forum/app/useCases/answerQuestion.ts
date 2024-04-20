import { Either, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repository/answersRepository'

export interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })
    await this.answersRepository.create(answer)
    return right({
      answer,
    })
  }
}
