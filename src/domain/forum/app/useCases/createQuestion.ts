import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repository/questionRepository'

export interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

export interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}
