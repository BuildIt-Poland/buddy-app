import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BackgroundShape from 'components/BackgroundShape';
import { PageContainerProps } from './types';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
    },
  },
}));

const PageContainer: React.FC<PageContainerProps> = props => {
  const classes = useStyles();
  const { children, backGroundShape, ...args } = props;
  return (
    <Container component={'main'} className={classes.container} {...args}>
      {children}
      {backGroundShape && <BackgroundShape />}
    </Container>
  );
};

export default PageContainer;
