import { Router } from "https://deno.land/x/oak/mod.ts";
import { load_people } from "../utils/parser.ts";
// import * as k from "../kakao/basics.ts";
import { BasicCard, ButtonType, Carousel, Kakao } from "../kakao/basics.ts";

export const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Server is running!";
});

const pre_tel = "031-219-";

router.post("/info/prof", async (ctx) => {
  const result = new Kakao();
  const carousel = new Carousel();
  const basic_card = new BasicCard();

  const kakao_json = await ctx.request.body().value;

  const body = await load_people(kakao_json.action.params.search);
  for (const people of body.phoneNumber) {
    const human_name = people.korNm;
    const human_email = people.email;
    const human_number = pre_tel + people.telNo;
    const dept_name = people.deptNm;

    const b = new BasicCard();
    b.set_title(`${human_name} (${human_email})`);
    b.set_desc(`전화번호: ${human_number}\n부서명: ${dept_name}`);
    b.new_button(ButtonType.CALL, "전화", human_number);
    b.new_button(
      ButtonType.LINK,
      "이메일",
      `mailto:${human_email}?subject=안녕하세요`,
    );

    carousel.add_card(b.build_card());
  }

  basic_card.set_title("titleee");
  basic_card.set_desc("dessccc");

  result.add_output(carousel.build());
  result.add_output(basic_card.build());

  ctx.response.status = 200;
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = result.json();
});
