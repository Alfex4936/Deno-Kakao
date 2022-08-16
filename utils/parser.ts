export async function load_people(keyword: string) {
  const response = await fetch(
    "https://mportal.ajou.ac.kr/system/phone/selectList.ajax",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: keyword }),
    },
  );

  const body = await response.json();

  return body;
}
