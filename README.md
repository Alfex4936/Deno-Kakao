<div align="center">
<p>
    <img width="350" src="https://deno.land/logo.svg?__frsh_c=txcyk2k676hg">
</p>

# 카카오톡 챗봇 with deno

`deno` (oak webframework) + Typescript

# JSON 결과
</div>

```ts
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
```

## Result

```json
{
  "version": "2.0",
  "template": {
    "outputs": [
      {
        "carousel": {
          "type": "basicCard",
          "items": [
            {
              "buttons": [
                {
                  "label": "전화",
                  "action": "phone",
                  "phoneNumber": "031-219-3548"
                },
                {
                  "label": "이메일",
                  "action": "webLink",
                  "webLinkUrl": "mailto:example@gg.gg?subject=안녕하세요"
                }
              ],
              "title": "name (leesw@ajou.ac.kr)",
              "description": "전화번호: 031-\n부서명: "
            },
            {
              "buttons": [
                {
                  "label": "전화",
                  "action": "phone",
                  "phoneNumber": "031-219-1648"
                },
                {
                  "label": "이메일",
                  "action": "webLink",
                  "webLinkUrl": "mailto:example@gg.gg?subject=안녕하세요"
                }
              ],
              "title": "name (ajoutop@ajou.ac.kr)",
              "description": "전화번호: 031-\n부서명: "
            }
          ]
        }
      },
      {
        "basicCard": {
          "title": "titleee",
          "description": "dessccc"
        }
      }
    ],
    "quickReplies": []
  }
}
```
