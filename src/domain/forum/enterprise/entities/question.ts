import { Slug } from './valueObject/slug'
import dayjs from 'dayjs'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Optional } from '../../../../core/types/optional'
import { AggregateRoot } from '../../../../core/entities/aggregateRoot'
import { QuestionAttachment } from './questionAttachment'

export interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  attachments: QuestionAttachment[]
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updateAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  private touch() {
    this.props.updateAt = new Date()
  }

  get content() {
    return this.props.content
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  get attachments() {
    return this.props.attachments
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
