import sitemap from 'routes/sitemap';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CollapseListItem from './list-items/CollapseListItem';
import ListItem from './list-items/ListItem';
import Image from 'components/base/Image';
import LogoImg from 'assets/images/Logo.png';
// import FooterImg from 'assets/images/helpCenter.png';

const DrawerItems = () => {
  return (
    <>
      <Stack
        position="sticky"
        top={0}
        pt={4}
        pb={2.5}
        alignItems="center"
        bgcolor="info.lighter"
        zIndex={1000}
      >
        <ButtonBase component={Link} href="/" disableRipple>
          <Image src={LogoImg} alt="logo" height={40} width={40} sx={{ mr: 1.25 }} />
          <Typography variant="h3" color="text.primary" letterSpacing={1}>
            VinFast
          </Typography>
        </ButtonBase>
      </Stack>

      <List component="nav" sx={{ mt: 4, mb: 15, px: 0 }}>
        {sitemap.map((route) =>
          route.items ? (
            <CollapseListItem key={route.id} {...route} />
          ) : (
            <ListItem key={route.id} {...route} />
          ),
        )}
      </List>

      <Stack
        // position="relative"
        // mt="auto"
        // mb={4}
        // height={300}
        // width={1}
        // sx={{ userSelect: 'none' }}
      >
        {/* <Image src={FooterImg} height={1} width={1} sx={{ objectFit: 'cover' }} /> */}

        {/* <Stack px={1.75} direction="column" position="absolute" top={110} left={0} width={1}>
          <Typography
            variant="body1"
            color="info.lighter"
            align="center"
            fontWeight={600}
            width={1}
          >
            Help Center
          </Typography>
          <Typography
            mt={1}
            variant="caption"
            color="info.lighter"
            align="center"
            fontWeight={400}
            width={1}
          >
            Having Trouble in Learning? Please contact us for more questions.
          </Typography>
        </Stack> */}

        {/* <Stack
          position="absolute"
          bottom={16}
          left={0}
          width={1}
          px={1.75}
          justifyContent={'center'}
        >
          <Button variant="contained" color="secondary" size="small" fullWidth>
            Go To Help Center
          </Button>
        </Stack> */}
      </Stack>
    </>
  );
};

export default DrawerItems;
