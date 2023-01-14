import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as controller from "./controller.js";

const app = new Application();

const router = new Router();

router.get("/getPosts", controller.getPosts);
router.get("/getSinglePost", controller.getSinglePost);
router.get("/getReplies", controller.getRepliesForPost);
router.post("/saveUser", controller.saveNewUser);
router.post("/saveNewPost", controller.saveNewPost);
router.post("/saveReplyToPost", controller.saveReplyToPost);
router.patch("/upvote", controller.updateUpvote);
router.patch("/downvote", controller.updateDownvote);

//Server Sent Events
router.get("/sseGetPosts", controller.sseGetPosts);
router.get("/sseGetReplies", controller.sseGetPostResponses);

app.use(router.routes());

app.listen({ port: 7778 });
