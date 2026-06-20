const TOKEN = process.env.DATOCMS_API_TOKEN;

const globalQuery = `
query {
  globalFooter{
    description
  }
}
`;

const BASE_ENDPOINT = "https://graphql.datocms.com/";
const PREVIEW_ENDPOINT = "https://graphql.datocms.com/preview";

export async function cmsService({ query, preview }) {
  const ENDPOINT = preview ? PREVIEW_ENDPOINT : BASE_ENDPOINT;
  try {
    const pageContentResponse = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify({ query }),
    }).then(async (respostaDoServer) => {
      const body = await respostaDoServer.json();
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    const globalContentResponse = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
        "X-Include-Drafts": "true",
      },
      body: JSON.stringify({ query: globalQuery }),
    }).then(async (respostaDoServer) => {
      const body = await respostaDoServer.json();
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    // console.log("Resposta do CMS", pageContentResponse);

    return {
      data: {
        ...pageContentResponse.data,
        globalContent: {
          ...globalContentResponse.data,
        },
      },
    };
  } catch (error) {
    throw new Error("Erro ao buscar dados do CMS: " + error.message);
  }
}
