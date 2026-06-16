import { Box, Image, Link, theme } from "../../../theme/components";

export function Menu() {
  return (
    <Box
      tag="header"
      styleSheet={{
        position: "fixed",
        width: "100%",
        padding: theme.space.x4,
        backgroundImage:
          "linear-gradient(180deg,rgb(0 0 0 / 60%) 0%,rgba(0,212,255,0) 100%)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Box
        styleSheet={{
          maxWidth: theme.space.xcontainer_xl,
          marginHorizontal: "auto",
        }}
      >
        <Link href="/">
          <Image
            src="https://www.alura.com.br/assets/img/home/alura-logo.1647533643.svg"
            styleSheet={{ width: "120px" }}
          />
        </Link>
      </Box>
    </Box>
  );
}
