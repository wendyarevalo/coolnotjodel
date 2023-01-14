import { executeQuery } from "./database.js";

const saveUser = async (uuid) => {
  await executeQuery(
    "INSERT INTO users (uuid) VALUES ($1)",
    uuid,
  );
  console.log("user saved");
};

const getPosts = async (group) => {
  const response = await executeQuery(
    "SELECT * FROM messages_by_user ORDER BY creation_date DESC",
  );

  const groupSize = 20;
  const rowsLength = response.rows.length;
  console.log(group);
  if (rowsLength < groupSize) {
    return response.rows;
  } else {
    const rows = [];
    let start = group * groupSize - groupSize;
    let end = 0;
    if (group * groupSize > rowsLength) {
      end = rowsLength;
    } else {
      end = group * groupSize - 1;
    }
    for (let index = start; index < end; index++) {
      rows.push(response.rows[index]);
    }
    return rows;
  }
};

const getSinglePost = async (postId) => {
  const response = await executeQuery(
    "SELECT * FROM messages_by_user WHERE id = $1",
    postId,
  );
  return response.rows;
};

const getRepliesForPost = async (postId) => {
  const response = await executeQuery(
    "SELECT * FROM replies WHERE post_id=$1 ORDER BY id DESC",
    postId,
  );
  return response.rows;
};

const saveNewPost = async (uuid, content) => {
  await executeQuery(
    "INSERT INTO messages_by_user (user_id, creation_date, content, votes) VALUES ((SELECT id FROM users WHERE uuid = $1), CURRENT_TIMESTAMP, $2, 0);",
    uuid,
    content,
  );
  console.log("post saved");
};

const saveReplyToPost = async (postId, reply) => {
  await executeQuery(
    "INSERT INTO replies (post_id, reply) VALUES ($1, $2);",
    postId,
    reply,
  );
  console.log("reply saved");
};

const updateUpvote = async (postId) => {
  await executeQuery(
    "UPDATE messages_by_user SET votes = (SELECT votes FROM messages_by_user WHERE id = $1)+1 WHERE id = $1",
    postId,
  );
  console.log("vote up");
};

const updateDownvote = async (postId) => {
  await executeQuery(
    "UPDATE messages_by_user SET votes = (SELECT votes FROM messages_by_user WHERE id = $1)-1 WHERE id = $1",
    postId,
  );
  console.log("vote down");
};

export {
  getPosts,
  getRepliesForPost,
  getSinglePost,
  saveNewPost,
  saveReplyToPost,
  saveUser,
  updateDownvote,
  updateUpvote,
};
