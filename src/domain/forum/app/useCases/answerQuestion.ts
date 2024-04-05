import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repository/answersRepository'

export interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

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
    return {
      answer,
    }
  }
}
