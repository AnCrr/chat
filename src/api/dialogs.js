import { gql } from "../libs";

export const fetchDialogs = ({ userId, queryParams = { limit: [50] } }) => {
  return gql(
    `
        query chats($query:String) {
          ChatFind(query:$query) {
            owner{
              _id
            },
            _id,
            title,
            messages {
               text
             },
            members {
               _id nick
             }
             lastModified
          }
        }`,
    {
      query: JSON.stringify([{ "members._id": userId }, queryParams]),
    }
  );
};

export const fetchDialogsCount = ({ userId }) => {
  return gql(
    `
  query count($query:String){
    ChatCount(query:$query)
  }`,
    { query: JSON.stringify([{ "members._id": userId }]) }
  );
};

export const fetchCreateDialog = (params) => {
  return gql(
    `
        mutation createChat($members:[UserInput], $title:String){
          ChatUpsert(chat:{title:$title,
            members: $members}){
              _id
            }     
        }
      `,
    params
  );
};

export const fetchChangeDialog = () => {
  return gql(
    `
        mutation changeChat($id:ID, $title:String){
          ChatUpsert(chat:{title:$title,
            _id:$id
            }   ){
              _id title
            }

        }
      `,
    { title: "newTitle", id: "61ed5f11bdc4cc1a5f302174" }
  );
};

export const fetchFindUsers = () => {
  return gql(
    `
  query findUsers($query:String){
    UserFind(query:$query){
      nick _id login
    }
  }`,
    { query: JSON.stringify([{}, { skip: [400] }]) }
  );
};
