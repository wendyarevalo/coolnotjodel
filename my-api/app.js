import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as controller from "./controller.js";

const app = new Application();

const router = new Router();

router.get("/api/getPosts", controller.getPosts);
router.get("/api/getSinglePost", controller.getSinglePost);
router.get("/api/getReplies", controller.getRepliesForPost);
router.post("/api/saveUser", controller.saveNewUser);
router.post("/api/saveNewPost", controller.saveNewPost);
router.post("/api/saveReplyToPost", controller.saveReplyToPost);
router.patch("/api/upvote", controller.updateUpvote);
router.patch("/api/downvote", controller.updateDownvote);

//Server Sent Events
router.get("/api/sseGetPosts", controller.sseGetPosts);
router.get("/api/sseGetReplies", controller.sseGetPostResponses);

app.use(router.routes());

app.listen({ port: 7778 });
