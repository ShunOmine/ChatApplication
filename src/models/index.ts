export interface MainProps {
  name: string,
  messages: {
    name: string,
    content: any,
    created_at: any,
  }[],
}
