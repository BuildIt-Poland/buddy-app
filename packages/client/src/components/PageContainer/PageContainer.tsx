import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BackgroundShape from 'components/BackgroundShape';
import clsx from 'clsx';
import { PageContainerProps } from './types';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
}));

const PageContainer: React.FC<PageContainerProps> = props => {
  const classes = useStyles();
  const { children, backGroundShape, className, ...args } = props;
  return (
    <Container
      component={'main'}
      maxWidth={false}
      className={clsx(classes.container, className)}
      {...args}>
      {children}
      {backGroundShape && <BackgroundShape />}
    </Container>
  );
};

export default PageContainer;
