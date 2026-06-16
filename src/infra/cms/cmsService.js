const TOKEN = "3d6de33f2758497ba3a779c16df9e8";

export async function cmsService({ query }) {
  try {
    const pageContentResponse = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
        "X-Include-Drafts": "true",
      },
      body: JSON.stringify({ query }),
    }).then(async (respostaDoServer) => {
      const body = await respostaDoServer.json();
      console.log("body", body);
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    // console.log("Resposta do CMS", pageContentResponse);

    return {
      data: pageContentResponse.data,
    };
  } catch (error) {
    throw new Error("Erro ao buscar dados do CMS: " + error.message);
  }
}
