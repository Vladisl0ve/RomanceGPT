export interface MessageProps {
    sender: Senders;
    text: string;
  }

export enum Senders {
    User,
    Bot
}