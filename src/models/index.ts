export interface MainProps {
  addName: Function,
  getMessages: Function,
  name: string,
  messages: {
    name: string,
    content: string,
    created_at: any,
  }[],
}
