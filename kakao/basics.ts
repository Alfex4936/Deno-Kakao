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

export interface BasicCardContent {
  thumbnail?: Thumbnail;
  buttons?: Button[];
  title?: string;
  description?: string;
}

export interface CommerceCard extends BasicCardContent {
  price: number;
  currency: string;
}

export interface CarouselContent {
  type?: string;
  items?: BasicCardContent[];
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
  carousel?: CarouselContent;
  listCard?: ListCard;
  basicCard?: BasicCardContent;
}

export interface QuickReply {
  action: string;
  label: string;
  messageText?: string;
  blockId?: string;
}

export interface Template {
  outputs: Output[];
  quickReplies?: QuickReply[];
}

export interface Root {
  template: Template;
  version: string;
}

export enum ButtonType {
  CALL,
  LINK,
  SHARE,
  TEXT,
}

export class BasicCard {
  private card: BasicCardContent;

  constructor() {
    this.card = { buttons: [] }; //TODO thumbnail: ThumbNail::new("".to_string()),
  }

  set_title(title: string) {
    this.card.title = title;
  }

  set_desc(desc: string) {
    this.card.description = desc;
  }

  new_button(btn_type: ButtonType, ...args: string[]) {
    let action = "message";
    const b: Button = { label: args[0], action: action };

    switch (btn_type) {
      case ButtonType.CALL:
        action = "phone";
        b.phoneNumber = args[1];
        break;
      case ButtonType.LINK:
        action = "webLink";
        b.webLinkUrl = args[1];
        break;
      case ButtonType.SHARE:
        action = "share";
        b.messageText = args[1];
        break;
      default: // TEXT
        // never approach
        break;
    }

    b.action = action;

    this.card.buttons?.push(b);
  }

  add_button(btn: Button): BasicCard {
    this.card.buttons?.push(btn);
    return this;
  }

  build(): Output {
    if (this.card.buttons?.length == 0) {
      this.card.buttons = undefined;
    }
    return { basicCard: this.card };
  }

  build_card(): BasicCardContent {
    if (this.card.buttons?.length == 0) {
      this.card.buttons = undefined;
    }
    return this.card;
  }
}

export class Carousel {
  private carousel: CarouselContent;

  constructor(type?: string) {
    this.carousel = {
      type: type === undefined ? "basicCard" : type,
      items: [],
    };
  }

  add_card(card: BasicCardContent) {
    this.carousel.items?.push(card);
  }

  build(): Output {
    if (this.carousel.items?.length == 0) {
      this.carousel.items = undefined;
    }
    return { carousel: this.carousel };
  }
}

export class Kakao {
  private kakao: Root;
  private temp: BasicCardContent; // BasicCard

  constructor() {
    this.kakao = {
      version: "2.0",
      template: { outputs: [], quickReplies: [] },
    };

    this.temp = {};
  }

  add_output(some_output: any) {
    this.kakao.template.outputs.push(some_output);
  }

  // SimpleText
  add_simple_text(text: string) {
    this.kakao.template.outputs.push({ simpleText: { text: text } });
  }

  // QuickReply
  add_qr(label: string, msg?: string) {
    this.kakao.template.quickReplies?.push({
      action: "message",
      label: label,
      messageText: msg,
    });
  }

  json(): string {
    if (this.kakao.template.quickReplies?.length == 0) {
      this.kakao.template.quickReplies = undefined;
    }
    return JSON.stringify(this.kakao);
  }
}
