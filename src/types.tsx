export interface MessageProps {
    sender: Senders;
    text: string;
    timeSent: Date;
  }

export enum Senders {
    User,
    Bot
}