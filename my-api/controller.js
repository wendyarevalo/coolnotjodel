import * as messagesService from "./messagesService.js";

const saveNewUser = async ({ request, response }) => {
  console.log("save user request");
  const body = request.body();
  const params = await body.value;
  await messagesService.saveUser(params.get("uuid"));
  response.body = { status: "success" };
  return response;
};

const getPosts = async ({ request, response }) => {
  console.log("get all posts");
  response.body = await messagesService.getPosts(
    request.url.searchParams.get("group"),
  );
};

const getSinglePost = async ({ request, response }) => {
  console.log("get one post");
  response.body = await messagesService.getSinglePost(
    request.url.searchParams.get("post_id"),
  );
};

const getRepliesForPost = async ({ request, response }) => {
  console.log("get replies for post");
  response.body = await messagesService.getRepliesForPost(
    request.url.searchParams.get("post_id"),
  );
};

const saveNewPost = async ({ request, response }) => {
  console.log("save a new post");
  const body = request.body();
  const json = await body.value;
  await messagesService.saveNewPost(
    json["uuid"],
    json["content"],
  );
  response.body = { status: "success" };
  return response;
};

const saveReplyToPost = async ({ request, response }) => {
  console.log("save a new reply to post");
  const body = request.body();
  const json = await body.value;
  await messagesService.saveReplyToPost(
    json["post_id"],
    json["content"],
  );
  response.body = { status: "success" };
  return response;
};

const updateUpvote = async ({ request, response }) => {
  console.log("upvote a post");
  const body = request.body();
  const json = await body.value;
  await messagesService.updateUpvote(json["post_id"]);
  response.body = { status: "success" };
  return response;
};

const updateDownvote = async ({ request, response }) => {
  console.log("downvote a post");
  const body = request.body();
  const json = await body.value;
  await messagesService.updateDownvote(json["post_id"]);
  response.body = { status: "success" };
  return response;
};

const sseGetPosts = async ({ request, response }) => {
  console.log("I received a sse connection");

  response.headers = new Headers({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  response.status = 200;

  const result = await messagesService.getPosts(
    request.url.searchParams.get("group"),
  );

  response.body = `data: ${JSON.stringify(result)}\n\n`;
  return response.body;
};

const sseGetPostResponses = async ({ request, response }) => {
  console.log("I received a sse connection");

  response.headers = new Headers({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  response.status = 200;

  const result = await messagesService.getRepliesForPost(
    request.url.searchParams.get("post_id"),
  );

  response.body = `data: ${JSON.stringify(result)}\n\n`;
  return response.body;
};

export {
  getPosts,
  getRepliesForPost,
  getSinglePost,
  saveNewPost,
  saveNewUser,
  saveReplyToPost,
  sseGetPostResponses,
  sseGetPosts,
  updateDownvote,
  updateUpvote,
};
