import { Entity } from './entity'
import { UniqueEntityId } from './uniqueEntityId'

export interface CommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updateAt?: Date
}

/**
 * Comment<Props extends CommentProps> = Minha class vai ter propredades genericas e vai extender propriedades
 * já definida
 */
export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  private touch() {
    this.props.updateAt = new Date()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }
}
