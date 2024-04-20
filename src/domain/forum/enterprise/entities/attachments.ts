import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'

export interface AttachmentsProps {
  title: string
  link: string
}

export class Attachments extends Entity<AttachmentsProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachmentsProps, id?: UniqueEntityId) {
    const attachments = new Attachments(props, id)

    return attachments
  }
}
