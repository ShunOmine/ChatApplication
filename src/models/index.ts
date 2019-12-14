export interface MainProps {
  name: string,
  messages: {
    name: string,
    content: string,
    created_at: any,
  }[],
}
