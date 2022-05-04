import { gql } from "../libs";

export const fetchSendMessage = ({ chatId, text }) => {
  return gql(
    `
          mutation sendMessage($text:String,$id:ID){
            MessageUpsert(message:{text: $text, chat: 
              { _id : $id}}){
              _id
            }
          }
        `,
    {
      text,
      id: chatId,
    }
  );
};

export const fetchMessages = ({ chatId, queryParams }) => {
  const { limit, skip } = queryParams;
  return gql(
    `
 query messages($query:String){
     MessageFind(query:$query){          
           _id text owner{_id} createdAt
     }
 }`,
    {
      query: JSON.stringify([
        { "chat._id": chatId },
        { sort: [{ _id: -1 }], limit: [limit], skip: [skip] },
      ]),
    }
  );
};

export const fetchMessagesCount = ({ chatId }) => {
  return gql(
    `
  query count($query:String){
    MessageCount(query:$query)
  }`,
    { query: JSON.stringify([{ "chat._id": chatId }]) }
  );
};
