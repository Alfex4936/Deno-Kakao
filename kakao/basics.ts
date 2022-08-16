export interface SimpleText {
  text: string;
}

export interface SimpleImage {
  imageUrl: string;
  altText: string;
}

export interface Thumbnail {
  imageUrl: string;
  link?: Link;
  fixedRatio?: boolean;
  width?: number;
  height?: number;
}

export interface Button {
  label: string;
  action: string;
  phoneNumber?: string;
  webLinkUrl?: string;
  messageText?: string;
}

export interface ListItem {
  title: string;
  description: string;
  link: Link;
  imageUrl?: string;
}

export interface CarouselHeader {
  title: string;
  description: string;
  thumbnail: Thumbnail;
}

export interface BasicCard {
  thumbnail?: Thumbnail;
  buttons?: Button[];
  title?: string;
  description?: string;
}

export interface CommerceCard extends BasicCard {
  price: number;
  currency: string;
}

export interface Carousel {
  type: string;
  items?: BasicCard[];
  header?: CarouselHeader;
}

export interface Header {
  title: string;
}

export interface Link {
  web: string;
}

export interface ListCard {
  buttons?: Button[];
  header: Header;
  items: ListItem[];
}

export interface Output {
  simpleText?: SimpleText;
  carousel?: Carousel;
  listCard?: ListCard;
}

export interface QuickReply {
  action: string;
  label: string;
  messageText?: string;
  blockId?: string;
}

export interface Template {
  outputs: Output[];
  quickReplies: QuickReply[];
}

export interface Root {
  template: Template;
  version: string;
}

const j = `
{
    "template": {
        "outputs": [
            {
                "simpleText": {
                    "text": "심플 텍스트 테스트"
                }
            },
            {
                "listCard": {
                    "buttons": [
                        {
                            "action": "share",
                            "label": "공유하기"
                        },
                        {
                            "action": "webLink",
                            "label": "ajouLink",
                            "webLinkUrl": "https://"
                        }
                    ],
                    "header": {
                        "title": "21.07.20) 오늘 공지"
                    },
                    "items": [
                        {
                            "description": "교무팀 07.20",
                            "link": {
                                "web": "?mode=view&articleNo=111791&article.offset=0&articleLimit=30"
                            },
                            "title": "(학사과정)2021-2학기 국내대학 학점교류 신청 안내(2..."
                        },
                        {
                            "description": "대학일자리플러스센터 07.20",
                            "link": {
                                "web": "?mode=view&articleNo=111782&article.offset=0&articleLimit=30"
                            },
                            "title": "7월 3주차 이공계인력중개센터 채용 정보"
                        },
                        {
                            "description": "입학사정센터 07.20",
                            "link": {
                                "web": "?mode=view&articleNo=111780&article.offset=0&articleLimit=30"
                            },
                            "title": "2021년 아주 희망 기숙사비 지원 장학생 모집 ~7/23까지"
                        },
                        {
                            "description": "학생지원팀 07.20",
                            "link": {
                                "web": "?mode=view&articleNo=111779&article.offset=0&articleLimit=30"
                            },
                            "title": "[교외장학] 2021학년도 2학기 김수정장학 장학생 선발 공고"
                        }
                    ]
                }
            }
        ],
        "quickReplies": [
            {
                "action": "message",
                "label": "빠른 응답 1",
                "messageText": "빠른 응답 1"
            },
            {
                "action": "message",
                "label": "빠른 응답 1",
                "messageText": "빠른 응답 1"
            }
        ]
    },
    "version": "2.0"
}
`;

class Kakao {
  private kakao: Root;
  private temp: any;

  constructor() {
    this.kakao = {
      version: "2.0",
      template: { outputs: [], quickReplies: [] },
    };
  }

  add_output(some_output: any) {
    this.kakao.template.outputs.push(some_output);
  }

  // QuickReply
  add_qr(label: string, msg?: string) {
    this.kakao.template.quickReplies.push({
      action: "message",
      label: label,
      messageText: msg,
    });
  }

  add_button() {
  }

  //
  build_basic_card(title?: string, description?: string) {
    const b: BasicCard = {};
    if (title !== null) {
      b.title = title;
    }
    if (description !== null) {
      b.description = description;
    }

    this.temp = b;
  }

  json(): string {
    return JSON.stringify(this.kakao);
  }
}

function build_qr(label: string, msg?: string): QuickReply {
  return { action: "message", label: label, messageText: msg };
}

function build_simple_text(text: string): SimpleText {
  return {
    text: text,
  };
}

function build_carousel(type?: string) {
  //   let c: Carousel = { type: type === null ? "basicCard" : type };
  console.log(1);
}

function make() {
  //   const kakao: Kakao = {
  //     version: "2.0",
  //     template: { outputs: [], quickReplies: [] },
  //   };

  //   kakao.template.outputs.push({ simpleText: { text: "" } });
  //   kakao.template.quickReplies.push({ action: "message", label: "labell" });

  const kakao = new Kakao();

  kakao.add_qr("hello");
  kakao.add_output(build_simple_text("randomize"));

  console.log(kakao.json());
}

make();
