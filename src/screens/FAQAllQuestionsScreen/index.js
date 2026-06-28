import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { Box, Text, Link, Image, theme } from "../../theme/components";
import { cmsService } from "../../infra/cms/cmsService";
import { pageHOC } from "../../components/wrappers/pageHOC";

export async function getStaticProps({ preview }) {
  const { data: cmsContent } = await cmsService({
    query: `
      query {
        __typename
      }   
      `,
    preview,
  });

  return {
    props: {
      cmsContent,
      categories: [
        {
          id: "b4bb5090",
          name: "Por onde começar",
          questions: [
            {
              id: "f138c88d",
              name: "Consigo entrar no mercado de trabalho com os cursos da Alura?",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            },
          ],
        },
        {
          id: "c4bb5090",
          name: "Formações e Projetos",
          questions: [
            {
              id: "h138c88d",
              name: "Qual é a diferença do certificado de participação para o certificado de conclusão de formação?",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            },
          ],
        },
      ],
    },
  };
}

function FAQAllQuestionsScreen({ categories }) {
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
            flexDirection: {
              xs: "column",
              md: "row",
            },
            width: "100%",
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: "auto",
          }}
        >
          {/* Block: Title Questions */}
          <Box
            styleSheet={{
              flex: 2,
              color: theme.colors.neutral.x900,
            }}
          >
            <Text tag="h1" variant="heading3">
              FAQ: Perguntas e <br />
              Dúvidas Frequentes
            </Text>
            <Text
              styleSheet={{
                color: theme.colors.neutral.x500,
              }}
            >
              Confira aqui respostas para as principais dúvidas de nossos alunos
            </Text>

            <Image
              src="https://www.alura.com.br/assets/img/home/homeNova/ilustra-alura-escafandro.1647533643.svg"
              styleSheet={{
                maxWidth: "200px",
                marginVertical: theme.space.x10,
                marginHorizontal: "auto",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            />
          </Box>

          {/* Block: Questions */}
          <Box
            styleSheet={{
              flex: 3,
            }}
          >
            {categories.map(({ id, name, questions }) => {
              return (
                <Box key={id} tag="article">
                  <h1>{name}</h1>
                  <Box tag="ul">
                    {questions.map((question) => (
                      <Box key={question.id} tag="li">
                        <Box tag="article">
                          <Link href={`/faq/${question.id}`}>
                            <Text>{question.name}</Text>
                          </Link>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default pageHOC(FAQAllQuestionsScreen);
