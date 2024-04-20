import { Either, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Question } from '../../enterprise/entities/question'
import { QuestionAttachment } from '../../enterprise/entities/questionAttachment'
import { QuestionAttachmentList } from '../../enterprise/entities/questionAttachmentsList'
import { QuestionRepository } from '../repository/questionRepository'

export interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: Array<string>
}

export type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentsId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentsId),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
