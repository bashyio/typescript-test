import { MockFetch } from "../global/types";

const autoCompleteResponse = [
  {
    userId: 1,
    id: 1,
    title: "dol",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: 2,
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    userId: 2,
    id: 3,
    title: "dolorum ut in voluptas mollitia et saepe quo animi",
    body: "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam",
  },
  {
    userId: 2,
    id: 4,
    title: "doloribus ad provident suscipit at",
    body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo",
  },
  {
    userId: 3,
    id: 5,
    title: "dolor sint quo a velit explicabo quia nam",
    body: "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse",
  },
  {
    userId: 4,
    id: 6,
    title: "doloremque illum aliquid sunt",
    body: "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime",
  },
  {
    userId: 8,
    id: 7,
    title: "doloremque officiis ad et non perferendis",
    body: "ut animi facere\ntotam iusto tempore\nmolestiae eum aut et dolorem aperiam\nquaerat recusandae totam odio",
  },
  {
    userId: 9,
    id: 8,
    title: "dolore veritatis porro provident adipisci blanditiis et sunt",
    body: "similique sed nisi voluptas iusto omnis\nmollitia et quo\nassumenda suscipit officia magnam sint sed tempora\nenim provident pariatur praesentium atque animi amet ratione",
  },
];

const mockFetch: MockFetch = async (url) => {
  if (
    /^https:\/\/jsonplaceholder\.typicode\.com\/posts\?title_like=\^dol*/i.test(
      url,
    )
  ) {
    return {
      ok: true,
      status: 200,
      json: async () => autoCompleteResponse,
    };
  }

  throw new Error(`Unhandled request: ${url}`);
};

export default mockFetch;
