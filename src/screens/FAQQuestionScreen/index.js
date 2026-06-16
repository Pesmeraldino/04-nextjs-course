import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { Box, Text, theme } from "../../theme/components";
import { cmsService } from "../../infra/cms/cmsService";

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "f138c88d" } }, { params: { id: "h138c88d" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  //https://graphql.datocms.com/

  const contentQuery = `
  query {
  contentFaqQuestion {
		title
    content {
      value
    }
  }
}
`;

  const { data } = await cmsService({
    query: contentQuery,
  });

  console.log("Dados do cms", data);

  return {
    props: {
      id,
      title: data.contentFaqQuestion.title,
      content: data.contentFaqQuestion.content,
    },
  };
}

export default function FAQQuestionScreen({ title, content }) {
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            gap: theme.space.x4,
            flexDirection: "column",
            width: "100%",
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: "auto",
          }}
        >
          <Text tag="h1" variant="heading1">
            {title}
          </Text>

          {/* <Box dangerouslySetInnerHTML={{ __html: content }} /> */}
          <pre>{JSON.stringify(content, null, 4)}</pre>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
