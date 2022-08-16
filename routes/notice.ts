import { Router } from "https://deno.land/x/oak/mod.ts";
import { load_people } from "../utils/parser.ts";

export const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Server is running!";
});

const pre_tel = "031-219-";

router.post("/info/prof", async (ctx) => {
  const kakao_json = await ctx.request.body().value;

  const body = await load_people(kakao_json.action.params.search);
  for (const people of body.phoneNumber) {
    const human_name = people.korNm;
    const human_email = people.email;
    const human_number = pre_tel + people.telNo;
    const dept_name = people.deptNm;
    console.log(
      "Hey: " + `${human_name} ${human_email} (${human_number}, ${dept_name})`,
    );
  }

  ctx.response.status = 200;
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = {
    data: "test",
  };
});
